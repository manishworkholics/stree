import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = "http://206.189.130.102:4545/api";

const BookingList = ({ bookingList, setBookingList, handlePageChange, currentPage, totalPages }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

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
            await axios.delete(`${API_BASE}/bookings/${deleteId}`);
            setBookingList(bookingList.filter((item) => item._id !== deleteId));
            toast.success("Booking deleted successfully!");
            closeDeleteModal();
        } catch (error) {
            console.error("Error deleting booking:", error);
            toast.error("Failed to delete booking");
        }
    };

    const formatDate = (isoDate) => {
        const d = new Date(isoDate);
        return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${d.getFullYear()}`;
    };

    return (
        <div className="body__card-wrapper">
            <div className="attendant__wrapper mb-35">
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
                        {bookingList.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center">No bookings found</td>
                            </tr>
                        ) : (
                            bookingList.map((booking, index) => {
                                const itemNames = booking.items.map((i) => i.name).join(", ");
                                const fromDate = booking.items.length > 0 ? formatDate(booking.items[0].bookingDate) : "-";
                                const toDate = booking.items.length > 0 ? formatDate(booking.items[0].returnDate) : "-";
                                const size = booking.items.length > 0 ? booking.items[0].size || "-" : "-";
                                return (
                                    <tr key={booking._id}>
                                        <td>{index + 1}</td>
                                        <td>{booking.customerName}</td>
                                        <td>{itemNames}</td>
                                        <td>{fromDate}</td>
                                        <td>{toDate}</td>
                                        <td>{size}</td>
                                        <td>{booking.advance}</td>
                                        <td>{booking.due}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(booking._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="basic__pagination d-flex align-items-center justify-content-end">
                <ul>
                    <li>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                    </li>
                    <li className="d-flex">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? "active me-1" : "me-1"}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </li>
                    <li>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="modal show" style={{ display: "block", background: "#0000008e" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-ffe2e5 py-3">
                                <h4 className="modal-title text-danger">Warning!</h4>
                                <button type="button" className="close" onClick={closeDeleteModal}>
                                    <i className="fa-solid fa-xmark fs-3 text-danger"></i>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <h5 className="text-danger">Do you want to permanently delete?</h5>
                                <img src="images/deleteWarning.png" alt="" className="w-100 m-auto" />
                                <div className="d-flex align-items-center justify-content-center mt-3">
                                    <button type="button" className="btn btn-danger px-4 me-3" onClick={deleteBooking}>
                                        Yes
                                    </button>
                                    <button type="button" className="btn btn-outline-danger px-4" onClick={closeDeleteModal}>
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingList;
