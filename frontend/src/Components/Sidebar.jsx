import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div
                className="Expovent__sidebar"
                style={{ backgroundImage: 'url(assets/img/bg/dropdown-bg.png)' }}
            >
                <div className="logo-details">
                    <span>
                        <Link to="/dashboard">
                            <img
                                className="logo__white w-100 h-100 py-2"
                                src="assets/img/logo/logo.png"
                                alt="logo not found"
                            />
                        </Link>
                    </span>
                    <span>
                        <Link to="/dashboard">
                            <img
                                className="log__smnall w-100 h-100 py-2"
                                src="assets/img/logo/logo.png"
                                alt="logo not found"
                                style={{ objectFit: 'contain' }}
                            />
                        </Link>
                    </span>
                </div>
                <div className="sidebar__inner simple-bar">
                    <div className="dlabnav">
                        <ul className="metismenu" id="menu">
                            <li>
                                <Link to="/dashboard" aria-expanded="false">
                                    <i className="fa-solid fa-house"></i>
                                    <span className="nav-text">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/booking-management" aria-expanded="false">
                                    <i className="fa-solid fa-book"></i>
                                    <span className="nav-text">Booking Management</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/jewellery-management" aria-expanded="false">
                                    <i className="fa-solid fa-gem"></i>
                                    <span className="nav-text">Jewellery Management</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/monthly-report" aria-expanded="false">
                                    <i className="fa-solid fa-calendar-alt"></i>
                                    <span className="nav-text">Monthly Report</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/billing" aria-expanded="false">
                                    <i className="fa-solid fa-file-invoice-dollar"></i>
                                    <span className="nav-text">Billing</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/lehenga-inventory" aria-expanded="false">
                                    <i className="fa-solid fa-tshirt"></i>
                                    <span className="nav-text">Lehenga Inventory</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/master" aria-expanded="false">
                                    <i className="fa-solid fa-cogs"></i>
                                    <span className="nav-text">Master</span>
                                </Link>
                            </li>
                        </ul>

                        <div className="sidebar__copyright position-absolute bottom-0 mb-2">
                            <p>Copyright @ 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar