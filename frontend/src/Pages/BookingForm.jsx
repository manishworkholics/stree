import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import AutoCompleteInput from "../Components/AutoCompleteInput";
import PersonTable from "../Components/PersonTable";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const BookingForm = () => {
    // Customer Info
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    // Payment
    const [totalAmount, setTotalAmount] = useState(0);
    const [advance, setAdvance] = useState(0);
    const [due, setDue] = useState(0);

    // Remarks
    const [remark, setRemark] = useState("");

    // All items (flat list)
    const [itemsData, setItemsData] = useState([]);

    // Invoice modal
    const [showInvoice, setShowInvoice] = useState(false);

    // Ref for invoice print
    const invoiceRef = useRef();

    // Example lists
    const existingCustomers = ["Rahul Sharma", "Priya Singh", "Ankit Kumar", "Neha Verma", "Amit Patel"];
    const mobileList = ["9876543210", "9123456789", "9988776655", "9012345678", "8899776655"];
    const dressList = [{ id: 1, name: "Lehenga" }, { id: 2, name: "Saree" }];
    const jewelleryList = [{ id: 1, name: "Necklace" }, { id: 2, name: "Earrings" }];

    // Auto-calculate total and due
    useEffect(() => {
        const total = itemsData.reduce((sum, item) => sum + (item.amount || 0), 0);
        setTotalAmount(total);
        setDue(total - advance);
    }, [itemsData, advance]);

    // Handle form submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (itemsData.length === 0) {
            toast.error("Please add at least one person with item before booking!");
            return;
        }
        toast.success("Booking saved successfully!");
        setShowInvoice(true); // show invoice after save
    };

    // Print invoice
    const handlePrintInvoice = () => {
        const input = invoiceRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Invoice_${customerName}.pdf`);
        });
    };

    // Share invoice on WhatsApp
    const handleShareInvoice = () => {
        let message = `Invoice for ${customerName}\n\nItems:\n`;
        itemsData.forEach((item, idx) => {
            message += `${idx + 1}. ${item.category} - ${item.name} - Qty: ${item.quantity} - Rate: ${item.rate} - Amount: ${item.amount.toFixed(2)}\n`;
        });
        message += `\nTotal: ${totalAmount}\nAdvance: ${advance}\nDue: ${due}\nRemarks: ${remark}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="pb-25">
            <form onSubmit={handleFormSubmit}>
                {/* Customer Info */}
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 mb-15 singel__input-field" style={{ position: "relative" }}>
                        <AutoCompleteInput
                            label="Mobile Number"
                            value={mobileNumber}
                            onChange={setMobileNumber}
                            suggestionList={mobileList}
                            onSelect={setMobileNumber}
                            placeholder="Type or select mobile number..."
                        />
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 mb-15 singel__input-field" style={{ position: "relative" }}>
                        <AutoCompleteInput
                            label="Customer Name"
                            value={customerName}
                            onChange={setCustomerName}
                            suggestionList={existingCustomers}
                            onSelect={setCustomerName}
                            placeholder="Type or select customer..."
                        />
                    </div>

                    <div className="col-12 col-lg-4 mb-15">
                        <label className="mb-1">Address</label>
                        <input
                            type="text"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>

                <hr style={{ border: "1px solid red" }} />

                {/* Persons & Items Table */}
                <PersonTable
                    dressList={dressList}
                    jewelleryList={jewelleryList}
                    onItemsChange={setItemsData}
                />

                <hr style={{ border: "1px solid red" }} />

                {/* Payment */}
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-2 mb-15">
                        <label className="mb-1">Total Amount</label>
                        <input type="number" value={totalAmount} readOnly className="form-control" />
                    </div>
                    <div className="col-12 col-md-4 col-lg-2 mb-15">
                        <label className="mb-1">Advance</label>
                        <input
                            type="number"
                            value={advance}
                            onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)}
                            className="form-control"
                        />
                    </div>
                    <div className="col-12 col-md-4 col-lg-2 mb-15">
                        <label className="mb-1">Due</label>
                        <input type="number" value={due} readOnly className="form-control" />
                    </div>
                </div>

                {/* Remarks */}
                <div className="row">
                    <div className="col-12 mb-15">
                        <label className="mb-1">Remarks</label>
                        <textarea
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="form-control"
                            placeholder="Please enter any remarks..."
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn text-white fw-semibold px-3"
                    style={{
                        height: "40px",
                        background: "linear-gradient(91.11deg, #F7426F -2.47%, #F87A58 91.34%)",
                    }}
                >
                    Save Booking
                </button>
            </form>

            {/* Invoice Modal */}
            {showInvoice && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content" style={{ marginTop: "100px" }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Invoice</h5>
                                <button type="button" className="btn-close" onClick={() => setShowInvoice(false)}></button>
                            </div>
                            <div className="modal-body" ref={invoiceRef}>
                                <h4>Invoice</h4>
                                <p><strong>Customer:</strong> {customerName}</p>
                                <p><strong>Mobile:</strong> {mobileNumber}</p>
                                <p><strong>Address:</strong> {customerAddress}</p>

                                <div className="table-responsive mt-2">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th>Product</th>
                                                <th>Code</th>
                                                <th>Size</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemsData.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{item.category}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.code}</td>
                                                    <td>{item.size}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.rate}</td>
                                                    <td>{item.amount.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <p><strong>Total:</strong> {totalAmount}</p>
                                <p><strong>Advance:</strong> {advance}</p>
                                <p><strong>Due:</strong> {due}</p>
                                <p><strong>Remarks:</strong> {remark}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowInvoice(false)}>Close</button>
                                <button className="btn btn-success" onClick={handlePrintInvoice}>Print Invoice</button>
                                <button className="btn btn-primary" onClick={handleShareInvoice}>Share Invoice</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingForm;
