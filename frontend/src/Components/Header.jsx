import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const handleLogout = () => {
        // Remove token
        localStorage.removeItem("token");

        // Redirect to login page
        window.location.href = "/rental-system/";
    };

    return (
        <>
            <div className="app__header__area shadow">
                <div className="app__header-inner">
                    {/* Left Logo */}
                    <div className="app__header-left">
                        <span className="d-block d-lg-none">
                            <Link to="/dashboard">
                                <img
                                    className="log__smnall py-0 object-fit-contain"
                                    src="assets/img/logo/logo.png"
                                    alt="logo not found"
                                    style={{ width: '70px' }}
                                />
                            </Link>
                        </span>
                    </div>

                    {/* Right Section */}
                    <div className="app__header-right">
                        <div className="nav-item">
                            {/* Logout Button (static) */}
                            <button onClick={handleLogout} className="btn btn-outline-danger d-none d-lg-block">Logout</button>

                            {/* Mobile Menu Button */}
                            <button
                                className="btn border-0 d-block d-lg-none"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasScrolling"
                                aria-controls="offcanvasScrolling"
                            >
                                <i className="fa-solid fa-bars text-danger"></i>
                            </button>

                            {/* Offcanvas Sidebar */}
                            <div
                                className="offcanvas offcanvas-start w-75 w-md-50 w-lg-25"
                                data-bs-scroll="true"
                                data-bs-backdrop="false"
                                tabIndex="-1"
                                id="offcanvasScrolling"
                                aria-labelledby="offcanvasScrollingLabel"
                            >
                                <div className="offcanvas-header py-2 shadow">
                                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                                        <span>
                                            <Link to="/dashboard">
                                                <img
                                                    className="log__smnall py-2 object-fit-contain"
                                                    src="assets/img/logo/logo.png"
                                                    alt="logo not found"
                                                    style={{ width: '100px' }}
                                                />
                                            </Link>
                                        </span>
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div
                                    className="offcanvas-body"
                                    style={{
                                        backgroundImage: 'url(assets/img/bg/dropdown-bg.png)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover'
                                    }}
                                >
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
                                                <li>
                                                    <Link onClick={handleLogout}>
                                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                        <span className="nav-text">Logout</span>
                                                    </Link>
                                                </li>
                                            </ul>

                                            {/* Footer */}
                                            <div className="sidebar__copyright position-absolute bottom-0 mb-2">
                                                <p>Copyright @ Rahul Events 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Offcanvas */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
