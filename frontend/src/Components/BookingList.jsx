// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const API_BASE = "http://206.189.130.102:4545/api";

// const BookingList = ({ bookingList, setBookingList }) => {
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [deleteId, setDeleteId] = useState(null);

//     const openDeleteModal = (id) => {
//         setDeleteId(id);
//         setIsDeleteModalOpen(true);
//     };

//     const closeDeleteModal = () => {
//         setIsDeleteModalOpen(false);
//         setDeleteId(null);
//     };

//     const deleteBooking = async () => {
//         try {
//             await axios.delete(`${API_BASE}/bookings/${deleteId}`);
//             setBookingList(bookingList.filter((item) => item._id !== deleteId));
//             toast.success("Booking deleted successfully!");
//             closeDeleteModal();
//         } catch (error) {
//             console.error("Error deleting booking:", error);
//             toast.error("Failed to delete booking");
//         }
//     };

//     const formatDate = (isoDate) => {
//         const d = new Date(isoDate);
//         return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
//             .toString()
//             .padStart(2, "0")}-${d.getFullYear()}`;
//     };

//     return (
//         <div className="body__card-wrapper">
//             <div className="attendant__wrapper mb-35">
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>S.No</th>
//                             <th>Customer</th>
//                             <th>Items</th>
//                             <th>From Date</th>
//                             <th>To Date</th>
//                             <th>Size</th>
//                             <th>Advance</th>
//                             <th>Due</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookingList.length === 0 ? (
//                             <tr>
//                                 <td colSpan="9" className="text-center">No bookings found</td>
//                             </tr>
//                         ) : (
//                             bookingList.map((booking, index) => {
//                                 const itemNames = booking.items.map((i) => i.name).join(", ");
//                                 const fromDate = booking.items.length > 0 ? formatDate(booking.items[0].bookingDate) : "-";
//                                 const toDate = booking.items.length > 0 ? formatDate(booking.items[0].returnDate) : "-";
//                                 const size = booking.items.length > 0 ? booking.items[0].size || "-" : "-";
//                                 return (
//                                     <tr key={booking._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{booking.customerName}</td>
//                                         <td>{itemNames}</td>
//                                         <td>{fromDate}</td>
//                                         <td>{toDate}</td>
//                                         <td>{size}</td>
//                                         <td>{booking.advance}</td>
//                                         <td>{booking.due}</td>
//                                         <td>
//                                             <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(booking._id)}>
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })
//                         )}
//                     </tbody>
//                 </table>
//             </div>



//             {/* Delete Modal */}
//             {isDeleteModalOpen && (
//                 <div className="modal show" style={{ display: "block", background: "#0000008e" }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header bg-ffe2e5 py-3">
//                                 <h4 className="modal-title text-danger">Warning!</h4>
//                                 <button type="button" className="close" onClick={closeDeleteModal}>
//                                     <i className="fa-solid fa-xmark fs-3 text-danger"></i>
//                                 </button>
//                             </div>
//                             <div className="modal-body text-center">
//                                 <h5 className="text-danger">Do you want to permanently delete?</h5>
//                                 <img src="images/deleteWarning.png" alt="" className="w-100 m-auto" />
//                                 <div className="d-flex align-items-center justify-content-center mt-3">
//                                     <button type="button" className="btn btn-danger px-4 me-3" onClick={deleteBooking}>
//                                         Yes
//                                     </button>
//                                     <button type="button" className="btn btn-outline-danger px-4" onClick={closeDeleteModal}>
//                                         No
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookingList;


import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

