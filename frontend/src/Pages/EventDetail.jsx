import React from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';

const EventDetail = () => {
    // Static event details
    const eventDetail = {
        name: 'Annual Tech Conference 2025',
        description: 'This event focuses on the latest trends in technology, bringing together industry experts and innovators.',
        email: 'info@techconf.com',
        phone: '+91 9876543210',
        supervisor: 'Rahul Sharma',
        event_date: '27-Aug-2025',
        location: 'Mumbai Convention Center',
        event_category_id: 'Conference',
        totalPerson: 250,
        quotation_ref: 'QTN-2025-001',
        status: 'Confirmed'
    };

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
                                        <div className="breadcrumb__inner">
                                            <div className="breadcrumb__icon">
                                                <i className="flaticon-home"></i>
                                            </div>
                                            <div className="breadcrumb__menu">
                                                <nav>
                                                    <ul>
                                                        <li><span><Link to="/dashboard">Home</Link></span></li>
                                                        <li><span><Link to="/events">Events</Link></span></li>
                                                        <li className="active"><span>Event Details</span></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="event__details-area">
                                <div className="row">
                                    {/* Left Section */}
                                    <div className="col-xxl-7 col-xl-6">
                                        <div className="event__details-left">
                                            <div className="body__card-wrapper mb-20">
                                                <div className="card__header-top">
                                                    <div className="card__title-inner">
                                                        <h4 className="event__information-title">
                                                            {eventDetail.name}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="review__main-wrapper pt-25">
                                                    <div className="review__author-meta mb-15">
                                                        <div className="review__author-thumb">
                                                            <img src="assets/img/meta/01.png" alt="" />
                                                        </div>
                                                        <div className="review__author-name">
                                                            <h4>{eventDetail.supervisor}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="about__content mt-30">
                                                        <h4>About This Event</h4>
                                                        <p>{eventDetail.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Section */}
                                    <div className="col-xxl-5 col-xl-6">
                                        <div className="event__details-right">
                                            <div className="body__card-wrapper mb-20">
                                                <div className="event__meta-time">
                                                    <ul>
                                                        <li><span>Email :</span> {eventDetail.email}</li>
                                                        <li><span>Phone :</span> {eventDetail.phone}</li>
                                                        <li><span>Supervisor :</span> {eventDetail.supervisor}</li>
                                                        <li><span>Date :</span> {eventDetail.event_date}</li>
                                                        <li><span>Venue :</span> {eventDetail.location}</li>
                                                        <li><span>Event Type :</span> {eventDetail.event_category_id}</li>
                                                        <li><span>Total Person :</span> {eventDetail.totalPerson}</li>
                                                        <li><span>Quotation Ref No. :</span> {eventDetail.quotation_ref}</li>
                                                        <li><span>Event Status :</span> {eventDetail.status}</li>
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
        </div>
    );
};

export default EventDetail;
