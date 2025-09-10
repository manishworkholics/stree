import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const Billing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [billData, setBillData] = useState(null);

  // 🔹 Dummy static booking data
  const bookingList = [
    {
      id: 1,
      customer: "Rahul Sharma",
      address: "Delhi, India",
      phone: "9876543210",
      from: "2024-09-01",
      to: "2024-09-05",
      dress: "Lehenga - Code 101",
      jewellery: "Gold Necklace",
      size: "Chest: 36, Waist: 30, Length: 55, Sleeves: 22",
      price: 15000,
      advance: 5000,
      due: 10000,
      remarks: "Handle with care",
    },
    {
      id: 2,
      customer: "Anjali Gupta",
      address: "Mumbai, India",
      phone: "9876501234",
      from: "2024-10-10",
      to: "2024-10-12",
      dress: "Saree - Code 202",
      jewellery: "Diamond Earrings",
      size: "Chest: 34, Waist: 28, Length: 52, Sleeves: 20",
      price: 20000,
      advance: 8000,
      due: 12000,
      remarks: "Dry clean only",
    },
  ];

  const [billList, setBillList] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const saveBill = () => {
    if (selectedBooking) {
      setBillList([...billList, selectedBooking]);
      setIsModalOpen(false);
    }
  };

  const sendWhatsApp = (booking) => {
    const message = `Hello ${booking.customer},\nHere is your booking bill:\nDress: ${booking.dress}\nJewellery: ${booking.jewellery}\nTotal: ₹${booking.price}\nAdvance: ₹${booking.advance}\nDue: ₹${booking.due}`;
    const url = `https://wa.me/${booking.phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container-fluid p-0">
      <div className="dashboard-page">
        <div className="page__full-wrapper">
          <Sidebar />

          <div className="page__body-wrapper">
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
                              <span>
                                <Link to="/dashboard">Home</Link>
                              </span>
                            </li>
                            <li className="active">
                              <span>Billing</span>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="breadcrum__button">
                    <button
                      className="breadcrum__btn"
                      onClick={() => openModal(bookingList[0])}
                    >
                      Generate Bill
                      <i className="fa-regular fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Table */}
            <div className="attendant__list-area pb-20 px-4">
              <div className="attendan__content">
                <div className="body__card-wrapper">
                  <div className="attendant__wrapper mb-35">
                    <table>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Customer</th>
                          <th>Phone</th>
                          <th>Dress</th>
                          <th>Jewellery</th>
                          <th>Total</th>
                          <th>Advance</th>
                          <th>Due</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billList.length > 0 ? (
                          billList.map((bill, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{bill.customer}</td>
                              <td>{bill.phone}</td>
                              <td>{bill.dress}</td>
                              <td>{bill.jewellery}</td>
                              <td>₹{bill.price}</td>
                              <td>₹{bill.advance}</td>
                              <td>₹{bill.due}</td>
                              <td>
                                <button
                                  className="btn border-0"
                                  onClick={() => sendWhatsApp(bill)}
                                >
                                  <i className="fa-brands fa-whatsapp text-success fs-5"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              No bills generated yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Bill Modal */}
            {isModalOpen && selectedBooking && (
              <div
                className="modal show"
                style={{ display: "block", background: "#0000008e" }}
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header popup__title-wrapper py-3">
                      <h1 className="modal-title fs-5 text-white">
                        Generate Bill
                      </h1>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn-close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row">
                          <div className="col-md-6 singel__input-field mb-15">
                            <label>Customer Name</label>
                            <input
                              type="text"
                              value={selectedBooking.customer}
                              readOnly
                            />
                          </div>
                          <div className="col-md-6 singel__input-field mb-15">
                            <label>Phone</label>
                            <input
                              type="text"
                              value={selectedBooking.phone}
                              readOnly
                            />
                          </div>
                          <div className="col-md-6 singel__input-field mb-15">
                            <label>Address</label>
                            <input
                              type="text"
                              value={selectedBooking.address}
                              readOnly
                            />
                          </div>
                          <div className="col-md-6 singel__input-field mb-15">
                            <label>Booking Dates</label>
                            <input
                              type="text"
                              value={`${selectedBooking.from} - ${selectedBooking.to}`}
                              readOnly
                            />
                          </div>
                          <div className="col-md-6 singel__input-field mb-15">
                            <label>Dress</label>
                            <input
                              type="text"
                              value={selectedBooking.dress}
                              readOnly
                            />
                          </div>
                          <div className="col-md-6 singel__input-field mb-15">
                            <label>Jewellery</label>
                            <input
                              type="text"
                              value={selectedBooking.jewellery}
                              readOnly
                            />
                          </div>
                          <div className="col-md-6 singel__input-field mb-15">
                            <label>Size</label>
                            <input
                              type="text"
                              value={selectedBooking.size}
                              readOnly
                            />
                          </div>
                          <div className="col-md-3 singel__input-field mb-15">
                            <label>Price</label>
                            <input
                              type="text"
                              value={`₹${selectedBooking.price}`}
                              readOnly
                            />
                          </div>
                          <div className="col-md-3 singel__input-field mb-15">
                            <label>Advance</label>
                            <input
                              type="text"
                              value={`₹${selectedBooking.advance}`}
                              readOnly
                            />
                          </div>
                          <div className="col-md-3 singel__input-field mb-15">
                            <label>Due</label>
                            <input
                              type="text"
                              value={`₹${selectedBooking.due}`}
                              readOnly
                            />
                          </div>
                          <div className="col-md-12 singel__input-field mb-15">
                            <label>Remarks</label>
                            <input
                              type="text"
                              value={selectedBooking.remarks}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={saveBill}
                          >
                            Save Bill
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => sendWhatsApp(selectedBooking)}
                          >
                            Send via WhatsApp
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
