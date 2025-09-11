import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import BookingForm from './BookingForm';
import BookingList from '../Components/BookingList';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE = "http://206.189.130.102:4545/api";

const BookingManagement = () => {
    const [bookingList, setBookingList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [dressList, setDressList] = useState([]);
    const [sizeList, setSizeList] = useState([]);

    // Fetch bookings from API
    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${API_BASE}/bookings`);
            if (res.data?.success) {
                const data = res.data.data || [];
                setBookingList(data);
            } else {
                toast.error(res.data?.message || "Failed to fetch bookings");
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("Something went wrong while fetching bookings");
        }
    };

    // Fetch customers, dresses, and sizes
    const fetchCustomers = async () => {
        try {
            const res = await axios.get(`${API_BASE}/customers`);
            if (res.data?.success) setCustomerList(res.data.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDresses = async () => {
        try {
            const res = await axios.get(`${API_BASE}/lehengas`);
            if (res.data?.success) setDressList(res.data.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSizes = async () => {
        // Example size list, replace with API if available
        setSizeList([
            { id: 1, name: 'M (38-30-42)' },
            { id: 2, name: 'L (40-32-44)' }
        ]);
    };

    useEffect(() => {
        fetchBookings();
        fetchCustomers();
        fetchDresses();
        fetchSizes();
    }, []);



    const handlereload = () => {
        fetchBookings();
    }

    return (
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
                                                        <button onClick={handlereload} className="nav-link" id="tab-2" data-bs-toggle="tab" data-bs-target="#tab-2-pane" type="button">
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
                                                                onBookingSaved={fetchBookings} // refresh after new booking
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
                                            setBookingList={setBookingList}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingManagement;
