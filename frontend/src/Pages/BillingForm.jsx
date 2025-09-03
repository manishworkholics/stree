import React, { useState } from "react";
import { toast } from "react-toastify";

const BillingForm = ({ setBillList }) => {
  const [formData, setFormData] = useState({
    customerName: "Rahul Sharma", // Auto-fill (demo)
    address: "Delhi, India",
    mobile: "919876543210",
    bookingStart: "2024-09-01",
    bookingEnd: "2024-09-05",
    dress: "Bridal Lehenga",
    jewellery: "Gold Necklace",
    size: "M",
    total: 20000,
    advance: 5000,
    due: 15000,
    remarks: "Handle with care",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveBill = (e) => {
    e.preventDefault();
    setBillList((prev) => [...prev, { id: Date.now(), ...formData }]);
    toast.success("Bill generated successfully!");
  };

  return (
    <form onSubmit={saveBill}>
      <div className="row mb-3">
        <div className="col-lg-6 mb-2">
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-12 mb-2">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Booking Start</label>
          <input
            type="date"
            name="bookingStart"
            value={formData.bookingStart}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Booking End</label>
          <input
            type="date"
            name="bookingEnd"
            value={formData.bookingEnd}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Dress</label>
          <input
            type="text"
            name="dress"
            value={formData.dress}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Jewellery</label>
          <input
            type="text"
            name="jewellery"
            value={formData.jewellery}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Size</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Total</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Advance</label>
          <input
            type="number"
            name="advance"
            value={formData.advance}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <label>Due</label>
          <input
            type="number"
            name="due"
            value={formData.due}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-12 mb-2">
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-success">
        Generate Bill
      </button>
    </form>
  );
};

export default BillingForm;
