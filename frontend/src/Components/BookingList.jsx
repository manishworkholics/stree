import React, { useState } from "react";
import { Link } from "react-router-dom";

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

    const deleteItem = () => {
        setBookingList(bookingList.filter((item) => item.id !== deleteId));
        closeDeleteModal();
    };

    return (
        <div className="body__card-wrapper">
            <div className="attendant__wrapper mb-35">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Customer</th>
                            <th>Dress</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Size</th>
                            <th>Advance</th>
                            <th>Due</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingList.map((val, index) => (
                            <tr key={val.id}>
                                <td><span>{index + 1}</span></td>
                                <td>
                                    <span>
                                        <Link to="/customer-details">{val.customer.name}</Link>
                                    </span>
                                </td>
                                <td><span>{val.dress.name}</span></td>
                                <td><span>{val.booking_date_from}</span></td>
                                <td><span>{val.booking_date_to}</span></td>
                                <td><span>{val.size.name}</span></td>
                                <td>
                                    <span>
                                        <i className="fa-solid fa-indian-rupee-sign me-2"></i>
                                        {val.advance}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        <i className="fa-solid fa-indian-rupee-sign me-2"></i>
                                        {val.due}
                                    </span>
                                </td>
                                <td>
                                    <button type="button" className="btn border-0">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(val.id)}
                                        type="button"
                                        className="btn border-0"
                                    >
                                        <i className="fa-solid fa-trash-can text-danger"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="basic__pagination d-flex align-items-center justify-content-end">
                <ul>
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
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
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
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
                                    <button
                                        type="button"
                                        className="btn btn-danger px-4 me-3"
                                        onClick={deleteItem}
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
        </div>
    );
};

export default BookingList;
