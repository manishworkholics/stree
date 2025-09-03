import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import BookingForm from './BookingForm';

const BookingManagement = () => {
    // 🔹 Static dummy data
    const customerList = [
        { id: 1, name: 'Amit Sharma' },
        { id: 2, name: 'Priya Verma' }
    ];

    const dressList = [
        { id: 1, name: 'Red Lehenga' },
        { id: 2, name: 'Blue Saree' }
    ];

    const sizeList = [
        { id: 1, name: 'M (38-30-42)' },
        { id: 2, name: 'L (40-32-44)' }
    ];

    const [bookingList, setBookingList] = useState([
        {
            id: 1,
            customer: { name: 'Amit Sharma' },
            dress: { name: 'Red Lehenga' },
            booking_date_from: '27-08-2025',
            booking_date_to: '30-08-2025',
            size: { name: 'M (38-30-42)' },
            advance: 2000,
            due: 1000
        },
        {
            id: 2,
            customer: { name: 'Priya Verma' },
            dress: { name: 'Blue Saree' },
            booking_date_from: '01-09-2025',
            booking_date_to: '02-09-2025',
            size: { name: 'L (40-32-44)' },
            advance: 1500,
            due: 500
        }
    ]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteid, setDeleteid] = useState(null);

    const rowsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1; // since dummy data is small

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDelete = (id) => {
        setDeleteid(id);
        setIsDeleteModalOpen(true);
    };

    const deleteItem = (id) => {
        setBookingList(bookingList.filter((item) => item.id !== id));
        setIsDeleteModalOpen(false);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="dashboard-page">
                    <div className="page__full-wrapper">
                        <Sidebar />
                        <div className="page__body-wrapper">
                            <Header />

                            <div className="app__slide-wrapper">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="breadcrumb__wrapper mb-35">
                                            <div className="breadcrumb__main d-flex justify-content-between">
                                                <div className="breadcrumb__inner">
                                                    <div className="breadcrumb__icon">
                                                        <i className="flaticon-home"></i>
                                                    </div>
                                                    <div className="breadcrumb__menu">
                                                        <nav>
                                                            <ul>
                                                                <li>
                                                                    <span><Link to="/dashboard">Home</Link></span>
                                                                </li>
                                                                <li className="active"><span>Bookings</span></li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </div>
                                                <div className="breadcrumb__tab">
                                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="tab-1" data-bs-toggle="tab" data-bs-target="#tab-1-pane" type="button">
                                                                New Booking
                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="tab-2" data-bs-toggle="tab" data-bs-target="#tab-2-pane" type="button">
                                                                Booking List
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pb-20">
                                    <div className="tab-content" id="myTabContent">
                                        {/* 🔹 New Booking Tab */}
                                        <div className="tab-pane fade" id="tab-1-pane" role="tabpanel">
                                            <div className="body__card-wrapper">
                                                <div className="row">
                                                    <div className="col-xxl-12">
                                                        <div className="create__event-area create-quotation-area">
                                                            <div className="">
                                                                <div className="card__header-top mb-3 pb-2">
                                                                    <div className="card__title-inner">
                                                                        <h4 className="event__information-title quotation-information-title">Customer & Booking Info</h4>
                                                                    </div>
                                                                </div>
                                                                <BookingForm
                                                                    customerList={customerList}
                                                                    dressList={dressList}
                                                                    sizeList={sizeList}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 🔹 Booking List Tab */}
                                        <div className="tab-pane fade show active" id="tab-2-pane" role="tabpanel">
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
                                                                    <td><span><Link to="/customer-details">{val.customer.name}</Link></span></td>
                                                                    <td><span>{val.dress.name}</span></td>
                                                                    <td><span>{val.booking_date_from}</span></td>
                                                                    <td><span>{val.booking_date_to}</span></td>
                                                                    <td><span>{val.size.name}</span></td>
                                                                    <td><span><i className="fa-solid fa-indian-rupee-sign me-2"></i>{val.advance}</span></td>
                                                                    <td><span><i className="fa-solid fa-indian-rupee-sign me-2"></i>{val.due}</span></td>
                                                                    <td>
                                                                        <button type="button" className="btn border-0">
                                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                                        </button>
                                                                        <button onClick={() => handleDelete(val.id)} type="button" className="btn border-0">
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
                                                    <ul className="">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="modal show" style={{ display: 'block', background: '#0000008e' }}>
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
                                    <button type="button" className="btn btn-danger px-4 me-3" onClick={() => deleteItem(deleteid)}>Yes</button>
                                    <button type="button" className="btn btn-outline-danger px-4" onClick={closeDeleteModal}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingManagement;
