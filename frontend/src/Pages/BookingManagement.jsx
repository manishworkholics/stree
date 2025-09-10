import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import BookingForm from './BookingForm';
import BookingList from '../Components/BookingList';

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
    
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1; // since dummy data is small

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
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
                                                            <button className="nav-link active" id="tab-1" data-bs-toggle="tab" data-bs-target="#tab-1-pane" type="button">
                                                                New Booking
                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="tab-2" data-bs-toggle="tab" data-bs-target="#tab-2-pane" type="button">
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
                                        <div className="tab-pane fade show active" id="tab-1-pane" role="tabpanel">
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
                                        <div className="tab-pane fade" id="tab-2-pane" role="tabpanel">
                                            <BookingList
                                                bookingList={bookingList}
                                                setBookingList={setBookingList} // ✅ pass setter
                                                handlePageChange={handlePageChange}
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingManagement;
