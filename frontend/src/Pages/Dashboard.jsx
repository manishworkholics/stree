import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [dashboardDetail] = useState({
    total_bookings: 25,
    total_pending: 8,
    total_returned: 15,
    pending_payments: 6,
    upcoming_bookings: [
      {
        id: 1,
        name: 'Lehenga Booking - Riya Sharma',
        user_id: 'Riya Sharma',
        event_date: '2025-09-15',
        location: 'Ahmedabad',
        mobile: '1234567890',
      },
      {
        id: 2,
        name: 'Jewellery Rental - Wedding',
        user_id: 'Arjun Patel',
        event_date: '2025-10-01',
        location: 'Surat',
        mobile: '1234567890',
      },
      {
        id: 3,
        name: 'Bridal Lehenga - Reception',
        user_id: 'Priya Verma',
        event_date: '2025-11-05',
        location: 'Vadodara',
        mobile: '1234567890',
      },
    ],
  });

  return (
    <>
      <div className="container-fluid p-0">
        <div className="dashboard-page">
          <div className="page__full-wrapper">
            <Sidebar />
            <div className="page__body-wrapper">
              <Header />

              <div className="app__slide-wrapper">
                {/* Breadcrumb */}
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
                              <li>
                                <span><Link to="/dashboard">Home</Link></span>
                              </li>
                              <li className="active"><span>Dashboard</span></li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="row g-20">
                  <div className="col-xl-3 col-lg-6 col-md-6">
                    <Link  to="/dashboard">
                      <div className="Expovent__count-item mb-20">
                        <div
                          className="Expovent__count-thumb include__bg transition-3"
                          style={{
                            backgroundImage: `url(assets/img/bg/count-bg.png)`,
                          }}
                        ></div>
                        <div className="Expovent__count-content">
                          <h3 className="Expovent__count-number">{dashboardDetail.total_bookings}</h3>
                          <span className="Expovent__count-text">Total Bookings</span>
                        </div>
                        <div className="Expovent__count-icon">
                          <i className="fa-solid fa-calendar-days"></i>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-xl-3 col-lg-6 col-md-6">
                    <Link  to="/dashboard">
                      <div className="Expovent__count-item mb-20">
                        <div
                          className="Expovent__count-thumb include__bg transition-3"
                          style={{
                            backgroundImage: `url(assets/img/bg/count-bg.png)`,
                          }}
                        ></div>
                        <div className="Expovent__count-content">
                          <h3 className="Expovent__count-number">{dashboardDetail.total_pending}</h3>
                          <span className="Expovent__count-text">Pending</span>
                        </div>
                        <div className="Expovent__count-icon">
                          <i className="fa-solid fa-clock"></i>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-xl-3 col-lg-6 col-md-6">
                    <Link  to="/dashboard">
                      <div className="Expovent__count-item mb-20">
                        <div
                          className="Expovent__count-thumb include__bg transition-3"
                          style={{
                            backgroundImage: `url(assets/img/bg/count-bg.png)`,
                          }}
                        ></div>
                        <div className="Expovent__count-content">
                          <h3 className="Expovent__count-number">{dashboardDetail.total_returned}</h3>
                          <span className="Expovent__count-text">Returned</span>
                        </div>
                        <div className="Expovent__count-icon">
                          <i className="fa-solid fa-rotate-left"></i>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-xl-3 col-lg-6 col-md-6">
                    <Link  to="/dashboard">
                      <div className="Expovent__count-item mb-20">
                        <div
                          className="Expovent__count-thumb include__bg transition-3"
                          style={{
                            backgroundImage: `url(assets/img/bg/count-bg.png)`,
                          }}
                        ></div>
                        <div className="Expovent__count-content">
                          <h3 className="Expovent__count-number">{dashboardDetail.pending_payments}</h3>
                          <span className="Expovent__count-text">Pending Payments</span>
                        </div>
                        <div className="Expovent__count-icon">
                          <i className="fa-solid fa-credit-card"></i>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="row g-20">
                  <div className="col-xxl-6 col-xl-6">
                    <div className="card__wrapper">
                      <div className="card__header">
                        <div className="card__header-top">
                          <div className="card__title-inner">
                            <div className="card__header-icon">
                              <i className="flaticon-calendar-3"></i>
                            </div>
                            <div className="card__header-title">
                              <h4>Upcoming Bookings</h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="scroll-w-1 card__scroll overflow-auto">
                          <div className="card__inner">
                            {dashboardDetail?.upcoming_bookings?.map(event => (
                              <div key={event.id} className="news__item">
                                <div className="news__item-inner">
                                  <div className="news__thumb">
                                    <Link  to="/dashboard">
                                      <img src="assets/img/blog/meta/01.png" alt="" />
                                    </Link>
                                  </div>
                                  <div className="news__content">
                                    <h4 className="news__title">
                                      <Link  to="/dashboard">{event.name}</Link>
                                    </h4>
                                    <div className="news__meta">
                                      <div className="news__meta-status">
                                        <span><i class="fa-solid fa-user"></i></span>
                                        <span>{event.user_id}</span>
                                      </div>
                                      <div className="news__meta-status">
                                        <span><i class="fa-solid fa-calendar-days"></i></span>
                                        <span>{event.event_date}</span>
                                      </div>
                                      <div className="news__meta-status">
                                        <span><i class="fa-solid fa-location-dot"></i></span>
                                        <span>{event.location}</span>
                                      </div>
                                      <div className="news__meta-status">
                                        <span><i class="fa-solid fa-phone"></i></span>
                                        <span>{event.mobile}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              {/* App side area end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
