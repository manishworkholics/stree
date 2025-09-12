import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable"; // for tables


import headerImage from "../Images/logo/logo.png"; // adjust path

const API_BASE = "http://206.189.130.102:4545/api";

const BookingList = ({ bookingList, setBookingList }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [loading, setLoading] = useState(false);

    // 🔍 Search
    const [search, setSearch] = useState("");

    // 📑 Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // 👁 View Details Modal
    const [viewBooking, setViewBooking] = useState(null);

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    };

    const deleteBooking = async () => {
        try {
            setLoading(true);
            await axios.delete(`${API_BASE}/bookings/${deleteId}`);
            setBookingList(bookingList.filter((item) => item._id !== deleteId));
            toast.success("Booking deleted successfully!");
            closeDeleteModal();
        } catch (error) {
            console.error("Error deleting booking:", error);
            toast.error("Failed to delete booking");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (isoDate) => {
        const d = new Date(isoDate);
        return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${d.getFullYear()}`;
    };

    // 🔍 Filtered Data
    const filteredBookings = bookingList.filter(
        (b) =>
            b.customerName.toLowerCase().includes(search.toLowerCase()) ||
            b.mobileNumber.includes(search) ||
            b.items.some((i) =>
                i.name.toLowerCase().includes(search.toLowerCase())
            )
    );

    // 📑 Pagination
    const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
    const startIdx = (currentPage - 1) * rowsPerPage;
    const paginatedBookings = filteredBookings.slice(
        startIdx,
        startIdx + rowsPerPage
    );

    const handlePrint = () => {
        const printContent = document.getElementById("receipt-section").innerHTML;
        const win = window.open("", "", "height=700,width=900");
        win.document.write(`
            <html>
                <head>
                    <title>Customer Receipt</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                        h2, h4 { text-align: center; margin: 5px 0; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        table, th, td { border: 1px solid #ddd; }
                        th, td { padding: 10px; text-align: center; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .totals { margin-top: 20px; float: right; }
                        .totals p { margin: 5px 0; font-weight: bold; }
                        .remark { margin-top: 20px; }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
            </html>
        `);
        win.document.close();
        win.print();
    };



    const handleSendWhatsAppPDF = (booking) => {
        if (!booking) return;

        const doc = new jsPDF({ unit: "mm", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 12;
        let cursorY = 10;

        // ===== HEADER with Logo + Shop Info =====
        if (headerImage) {
            try {
                const imgProps = doc.getImageProperties(headerImage);
                const imgWidth = 40;
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                doc.addImage(headerImage, "PNG", margin, cursorY, imgWidth, imgHeight);
            } catch { }
        }

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Dress on Rent", pageWidth / 2, cursorY + 5, { align: "center" });

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(
            "Nr. Mobizze Mobile Showroom, Banti Chouraha, Sahakari Bazar Road,\nNai Abadi, Mandsaur (M.P) Contact: 7697326666, 7999102389",
            pageWidth / 2,
            cursorY + 12,
            { align: "center" }
        );

        cursorY += 20;

        // ===== Booking Info =====
        doc.setFontSize(10);
        //   doc.text(`No.: ${booking._id || "-"}`, margin, cursorY);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 40, cursorY);
        cursorY += 6;
        doc.text(`Shri: ${booking.customerName || "-"}`, margin, cursorY);
        cursorY += 6;
        doc.text(`Mobile: ${booking.mobileNumber || "-"}`, margin, cursorY);
        cursorY += 8;

        // ===== ITEMS TABLE (S.No, Particulars, Qty, Rate, Amount) =====
        const tableData = (booking.items || []).map((i, idx) => {
            const qty = i.quantity ?? 1;
            const rate = i.rate ?? 0;
            const amount = i.amount ?? qty * rate;
            return [idx + 1, i.name || "-", qty, rate, amount];
        });

        doc.autoTable({
            startY: cursorY,
            head: [["S.No", "Particulars", "Qty", "Rate", "Amount"]],
            body: tableData,
            theme: "grid",
            headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: "bold" },
            styles: { fontSize: 10, halign: "center" },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 80, halign: "left" },
                2: { cellWidth: 20 },
                3: { cellWidth: 30 },
                4: { cellWidth: 30 }
            }
        });

        const afterTableY = doc.lastAutoTable.finalY + 8;

        // ===== Totals Section =====
        doc.setFontSize(11);
        doc.text(`Advance: Rs ${booking.advance ?? 0}`, margin, afterTableY);
        doc.text(`Total: Rs ${booking.totalAmount ?? 0}`, pageWidth - margin - 40, afterTableY);
        doc.text(`Due: Rs ${booking.due ?? 0}`, margin, afterTableY + 8);

        // ===== Terms & Conditions =====
        const termsY = afterTableY + 20;
        doc.setFontSize(8);
        doc.text("Niyam evam Shartein:", margin, termsY);

        const terms = [
            "1) Ek baar dress book karne ke baad cancel nahi hoga aur na hi dress change ki jaayegi.",
            "2) Dress ka kiraya advance me jama karna hoga.",
            "3) Dress katne ya jalne ki sthiti me dress ka poora paisa jama karna hoga.",
            "4) Dress samay par jama karne me vilamb hone par pratidin ka atirikt shulk dena hoga.",
            "5) Dress jyada gandi hone par extra charge lagega.",
            "6) Nyay kshetra Mandsaur rahega. Mool - Chook Sevi Devi."
        ];

        // loop only once
        terms.forEach((line, i) => {
            doc.text(line, margin, termsY + 8 + i * 6);
        });

        // ===== Signature Area =====
        doc.setFontSize(9);
        doc.text("Signature", margin, 280);
        doc.text("Auth Sign\nStri The Designer Studio", pageWidth - margin - 40, 275);

        // ===== Save PDF =====
        const safeName = (booking.customerName || "booking")
            .replace(/\s+/g, "_")
            .replace(/[^\w\-_.]/g, "");
        doc.save(`Booking_${safeName}.pdf`);

        // ===== WhatsApp Link =====
        const phoneWithCountryCode = (booking.mobileNumber || "").replace(/\D/g, "");
        const phone = phoneWithCountryCode.startsWith("91")
            ? phoneWithCountryCode
            : `91${phoneWithCountryCode}`;
        const text = `कृपया अपना बुकिंग रिसीट PDF संलग्न देखें।`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };


    return (
        <div className="body__card-wrapper">
            {/* 🔍 Search Box */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, mobile, or item..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="attendant__wrapper mb-35">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Size</th>
                                <th>Advance</th>
                                <th>Due</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                paginatedBookings.map((booking, index) => {
                                    const itemNames = booking.items.map((i) => i.name).join(", ");
                                    const fromDate =
                                        booking.items.length > 0
                                            ? formatDate(booking.items[0].bookingDate)
                                            : "-";
                                    const toDate =
                                        booking.items.length > 0
                                            ? formatDate(booking.items[0].returnDate)
                                            : "-";
                                    const size =
                                        booking.items.length > 0
                                            ? booking.items[0].size || "-"
                                            : "-";

                                    return (
                                        <tr key={booking._id}>
                                            <td>{startIdx + index + 1}</td>
                                            <td>{booking.customerName}</td>
                                            <td>{itemNames}</td>
                                            <td>{fromDate}</td>
                                            <td>{toDate}</td>
                                            <td>{size}</td>
                                            <td>{booking.advance}</td>
                                            <td>{booking.due}</td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => setViewBooking(booking)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => openDeleteModal(booking._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* 📑 Pagination Controls */}
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-secondary me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </button>
                <span className="align-self-center">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-secondary ms-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            {/* ❌ Delete Modal */}
            {isDeleteModalOpen && (
                <div
                    className="modal show"
                    style={{ display: "block", background: "#0000008e", marginTop: '100px' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-ffe2e5 py-3">
                                <h4 className="modal-title text-danger">Warning!</h4>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={closeDeleteModal}
                                >
                                    <i className="fa-solid fa-xmark fs-3 text-danger"></i>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <h5 className="text-danger">
                                    Do you want to permanently delete?
                                </h5>
                                <img
                                    src="images/deleteWarning.png"
                                    alt=""
                                    className="w-100 m-auto"
                                />
                                <div className="d-flex align-items-center justify-content-center mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-danger px-4 me-3"
                                        onClick={deleteBooking}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger px-4"
                                        onClick={closeDeleteModal}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 👁 View Details Modal */}
            {viewBooking && (
                <div
                    className="modal show"
                    style={{ display: "block", background: "#0000008e", marginTop: "100px" }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Booking Receipt</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setViewBooking(null)}
                                ></button>
                            </div>

                            {/* Printable Section */}
                            <div className="modal-body" id="receipt-section">
                                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                                    <h2 style={{ margin: "0", fontWeight: "bold" }}>STREE COLLECTIONS</h2>

                                    <h4 style={{ marginTop: "10px" }}>Customer Receipt</h4>
                                </div>

                                <p><strong>Customer:</strong> {viewBooking.customerName}</p>
                                <p><strong>Mobile:</strong> {viewBooking.mobileNumber}</p>
                                <p><strong>Address:</strong> {viewBooking.customerAddress}</p>
                                <p><strong>Remark:</strong> {viewBooking.remark}</p>

                                <h6>Items</h6>
                                <table className="table table-sm table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Code</th>
                                            <th>Name</th>
                                            <th>Size</th>
                                            <th>Qty</th>
                                            <th>Rate</th>
                                            <th>Amount</th>
                                            <th>From</th>
                                            <th>To</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewBooking.items.map((i) => (
                                            <tr key={i._id}>
                                                <td>{i.category}</td>
                                                <td>{i.code}</td>
                                                <td>{i.name}</td>
                                                <td>{i.size || "-"}</td>
                                                <td>{i.quantity}</td>
                                                <td>{i.rate}</td>
                                                <td>{i.amount}</td>
                                                <td>{formatDate(i.bookingDate)}</td>
                                                <td>{formatDate(i.returnDate)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div style={{ textAlign: "right", marginTop: "20px" }}>
                                    <p><strong>Total:</strong> ₹{viewBooking.totalAmount}</p>
                                    <p><strong>Advance:</strong> ₹{viewBooking.advance}</p>
                                    <p><strong>Due:</strong> ₹{viewBooking.due}</p>
                                </div>
                            </div>



                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={handlePrint}>
                                    Print Receipt
                                </button>

                                <button
                                    className="btn btn-success"
                                    style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
                                    onClick={() => handleSendWhatsAppPDF(viewBooking)}
                                >
                                    <i className="fa-brands fa-whatsapp me-2"></i> Send WhatsApp (PDF)
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setViewBooking(null)}
                                >
                                    Close
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BookingList;

