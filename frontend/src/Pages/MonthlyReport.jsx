import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const MonthlyReport = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-08");

  const dummyBookings = [
    { id: 1, customer: "John Doe", item: "Red Lehenga", date: "2025-08-12", dress: "D-101", price: 5000 },
    { id: 2, customer: "Jane Smith", item: "Bride Lehenga", date: "2025-08-15", dress: "D-205", price: 3500 },
    { id: 3, customer: "Mark Wilson", item: "Pink Lehenga", date: "2025-08-20", dress: "D-309", price: 7000 },
  ];

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
                  className=""
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
                        {dummyBookings.map((b, index) => (
                          <tr key={b.id}>
                            <td><span>{index + 1}</span></td>
                            <td><span>{b.customer}</span></td>
                            <td><span>{b.item}</span></td>
                            <td><span>{b.date}</span></td>
                            <td><span>{b.dress}</span></td>
                            <td><span>${b.price}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary */}
                  <div className="px-3 d-flex justify-content-end">
                    <h5>Total Bookings: {dummyBookings.length} | Total Revenue: ${dummyBookings.reduce((acc, b) => acc + b.price, 0)}</h5>
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
