import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const MonthlyReport = () => {
  const today = new Date();
  const defaultMonth = today.toISOString().slice(0, 7); // "YYYY-MM"
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch report
  const fetchReport = async () => {
    try {
      setLoading(true);

      const [year, month] = selectedMonth.split("-");
      const res = await fetch(`http://localhost:4545/api/bookings/get-monthly-report?month=${month}&year=${year}`);

      const data = await res.json();

      if (data.success) {
        setBookings(data.report);
      } else {
        setBookings([]);
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Call on month change
  useEffect(() => {
    fetchReport();// eslint-disable-next-line
  }, [selectedMonth]);

  return (
    <div className="container-fluid p-0">
      <div className="dashboard-page">
        <div className="page__full-wrapper">
          {/* Sidebar */}
          <Sidebar />

          <div className="page__body-wrapper">
            {/* Header */}
            <Header />

            {/* Breadcrumb */}
            <div className="app__slide-wrapper">
              <div className="breadcrumb__area">
                <div className="breadcrumb__wrapper mb-35 d-flex justify-content-between">
                  <div className="breadcrumb__main">
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
                            <li className="active"><span>Monthly Report</span></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="breadcrum__button d-flex gap-2">
                    <button className="breadcrum__btn">
                      <i className="fa-solid fa-file-export me-2"></i> Export
                    </button>
                    <button className="breadcrum__btn">
                      <i className="fa-solid fa-print me-2"></i> Print
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Month Selector */}
            <div className="px-4 mb-4">
              <div className="singel__input-field mb-15 w-25">
                <label className="input__field-text">Select Month</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>
            </div>

            {/* Report Table */}
            <div className="attendant__list-area pb-20 px-4">
              <div className="attendan__content">
                <div className="body__card-wrapper">
                  <div className="attendant__wrapper mb-35">
                    {loading ? (
                      <p>Loading...</p>
                    ) : bookings.length > 0 ? (
                      <table>
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Customer</th>
                            <th>Item</th>
                            <th>Date</th>
                            <th>Dress Code</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((b, index) => (
                            <tr key={index}>
                              <td><span>{b["S.No"]}</span></td>
                              <td><span>{b.Customer}</span></td>
                              <td><span>{b.Item}</span></td>
                              <td><span>{b.Date}</span></td>
                              <td><span>{b["Dress Code"]}</span></td>
                              <td><span>₹{b.Price}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No data found for this month.</p>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="px-3 d-flex justify-content-end">
                    <h5>
                      Total Bookings: {bookings.length} | Total Revenue: ₹
                      {bookings.reduce((acc, b) => acc + (b.Price || 0), 0)}
                    </h5>
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

export default MonthlyReport;
