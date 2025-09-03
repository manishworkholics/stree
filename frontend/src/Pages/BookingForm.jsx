import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BookingForm = ({ dressList, jewelleryList }) => {
    // Customer Info
    const [customerName, setCustomerName] = useState("");
    const [customerNumber, setCustomerNumber] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [category, setCategory] = useState("");

    // Dress & Jewellery
    const [dresses, setDresses] = useState([
        { name: "", code: "", size: "", price: 0 }
    ]);
    const [jewellery, setJewellery] = useState([
        { name: "", code: "", price: 0 }
    ]);

    // Booking
    const [bookingDateFrom, setBookingDateFrom] = useState("");
    const [bookingDateTo, setBookingDateTo] = useState("");

    // Payment
    const [totalAmount, setTotalAmount] = useState(0);
    const [advance, setAdvance] = useState(0);
    const [due, setDue] = useState(0);

    // Remarks
    const [remark, setRemark] = useState("");

    // Auto calculate due
    useEffect(() => {
        setDue(totalAmount - advance);
    }, [totalAmount, advance]);

    // Dress handlers
    const addDress = () => {
        setDresses([...dresses, { name: "", code: "", size: "", price: 0 }]);
    };
    const updateDress = (index, field, value) => {
        const updated = [...dresses];
        updated[index][field] = value;
        setDresses(updated);
    };
    const removeDress = (index) => {
        setDresses(dresses.filter((_, i) => i !== index));
    };

    // Jewellery handlers
    const addJewellery = () => {
        setJewellery([...jewellery, { name: "", code: "", price: 0 }]);
    };
    const updateJewellery = (index, field, value) => {
        const updated = [...jewellery];
        updated[index][field] = value;
        setJewellery(updated);
    };
    const removeJewellery = (index) => {
        setJewellery(jewellery.filter((_, i) => i !== index));
    };

    // Submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            customerName,
            customerNumber,
            customerAddress,
            category,
            dresses,
            jewellery,
            bookingDateFrom,
            bookingDateTo,
            totalAmount,
            advance,
            due,
            remark,
        };
        console.log("Booking Saved:", formData);
        toast.success("Booking saved successfully!");
    };

    return (
        <div className="pb-25">
            <form onSubmit={handleFormSubmit}>
                {/* Customer Info */}
                <div className="row mb-4">
                    <div className="col-12 col-lg-4 singel__input-field mb-15">
                        <label className="input__field-text">Customer Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-lg-4 singel__input-field mb-15">
                        <label className="input__field-text">Mobile Number</label>
                        <input
                            type="text"
                            value={customerNumber}
                            onChange={(e) => setCustomerNumber(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-lg-4 singel__input-field mb-15">
                        <label className="input__field-text">Address</label>
                        <input
                            type="text"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                        />
                    </div>
                </div>

                <hr />

                {/* Category + Name */}
                <div className="row mb-4">
                    <div className="col-12 col-lg-4 singel__input-field mb-15">
                        <label className="input__field-text">Select Category</label>
                        <div className="contact__select">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Woman">Woman</option>
                                <option value="Man">Man</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 singel__input-field mb-15">
                        <label className="input__field-text">Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-lg-4 singel__input-field d-flex align-items-end gap-3 mb-15">
                        <button
                            type="button"
                            className="btn text-white fw-semibold w-100"
                            style={{ height: "55px", background: "linear-gradient(91.11deg, #F7426F -2.47%, #F87A58 91.34%)" }}
                            onClick={addDress}
                        >
                            + Add Dress
                        </button>
                        <button
                            type="button"
                            className="btn text-white fw-semibold w-100"
                            style={{ height: "55px", background: "linear-gradient(91.11deg, #F7426F -2.47%, #F87A58 91.34%)" }}
                            onClick={addJewellery}
                        >
                            + Add Jewellery
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded-circle"
                            style={{ height: "55px", minWidth: "55px" }}
                            onClick={addJewellery}
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>

                <hr />

                {/* Dress Section */}
                <div className="row">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-2">Dress</h5>
                    </div>
                    <div className="col-12">
                        {dresses.map((dress, index) => (
                            <div className="row mb-3" key={index}>
                                <div className="col-12 col-lg-3 singel__input-field mb-15">
                                    <label className="input__field-text">Select Dress</label>
                                    <div className="contact__select">
                                        <select
                                            value={dress.name}
                                            onChange={(e) =>
                                                updateDress(index, "name", e.target.value)
                                            }
                                        >
                                            <option value="">Select Dress</option>
                                            {dressList?.map((d) => (
                                                <option key={d.id} value={d.name}>
                                                    {d.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 singel__input-field mb-15">
                                    <label className="input__field-text">Dress Code</label>
                                    <input
                                        type="text"
                                        value={dress.code}
                                        onChange={(e) => updateDress(index, "code", e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-lg-3 singel__input-field mb-15">
                                    <label className="input__field-text">Dress Size</label>
                                    <input
                                        type="text"
                                        value={dress.size}
                                        onChange={(e) => updateDress(index, "size", e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-lg-2 singel__input-field mb-15">
                                    <label className="input__field-text">Price</label>
                                    <input
                                        type="number"
                                        value={dress.price}
                                        onChange={(e) =>
                                            updateDress(index, "price", parseInt(e.target.value) || 0)
                                        }
                                    />
                                </div>
                                <div className="col-12 col-lg-1 d-flex align-items-end mb-15">
                                    <button
                                        type="button"
                                        className="btn btn-light rounded-circle"
                                        style={{ height: "55px", minWidth: "55px" }}
                                        onClick={() => removeDress(index)}
                                    >
                                        <i class="fa-solid fa-trash text-danger"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Jewellery Section */}
                <div className="row">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-2">Jewellery</h5>

                    </div>
                    {jewellery.map((j, index) => (
                        <div className="row mb-3" key={index}>
                            <div className="col-12 col-lg-4 singel__input-field mb-15">
                                <label className="input__field-text">Select Jewellery</label>
                                <div className="contact__select">
                                    <select
                                        value={j.name}
                                        onChange={(e) =>
                                            updateJewellery(index, "name", e.target.value)
                                        }
                                    >
                                        <option value="">Select Jewellery</option>
                                        {jewelleryList?.map((item) => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 singel__input-field mb-15">
                                <label className="input__field-text">Jewellery Code</label>
                                <input
                                    type="text"
                                    value={j.code}
                                    onChange={(e) =>
                                        updateJewellery(index, "code", e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-12 col-lg-3 singel__input-field mb-15">
                                <label className="input__field-text">Price</label>
                                <input
                                    type="number"
                                    value={j.price}
                                    onChange={(e) =>
                                        updateJewellery(index, "price", parseInt(e.target.value) || 0)
                                    }
                                />
                            </div>
                            <div className="col-12 col-lg-1 d-flex align-items-end mb-15">
                                <button
                                    type="button"
                                    className="btn btn-light rounded-circle"
                                    style={{ height: "55px", minWidth: "55px" }}
                                    onClick={() => removeJewellery(index)}
                                >
                                    <i class="fa-solid fa-trash text-danger"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <hr />

                {/* Booking Date + Payment */}
                <div className="row mb-4">
                    <div className="col-12 col-lg-3 singel__input-field mb-15">
                        <label className="input__field-text">Booking Date</label>
                        <input
                            type="date"
                            value={bookingDateFrom}
                            onChange={(e) => setBookingDateFrom(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-lg-3 singel__input-field mb-15">
                        <label className="input__field-text">Return Date</label>
                        <input
                            type="date"
                            value={bookingDateTo}
                            onChange={(e) => setBookingDateTo(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-lg-2 singel__input-field mb-15">
                        <label className="input__field-text">Total Amount</label>
                        <input
                            type="number"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="col-12 col-lg-2 singel__input-field mb-15">
                        <label className="input__field-text">Advance</label>
                        <input
                            type="number"
                            value={advance}
                            onChange={(e) => setAdvance(parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="col-12 col-lg-2 singel__input-field mb-15">
                        <label className="input__field-text">Due</label>
                        <input type="number" value={due} readOnly />
                    </div>
                </div>

                {/* Remarks */}
                <div className="row mb-4">
                    <div className="col-12 singel__input-field mb-15">
                        <label className="input__field-text">Remarks</label>
                        <input
                            type="text"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                        />
                    </div>
                </div>
                <div className="d-flex gap-4">
                    <button
                        type="button"
                        className="btn text-white fw-semibold px-3"
                        style={{ height: "55px", background: "linear-gradient(91.11deg, #F7426F -2.47%, #F87A58 91.34%)" }}
                    >
                        Save Booking
                    </button>
                    <button
                        type="button"
                        className="btn text-white fw-semibold px-4"
                        style={{ height: "55px", background: "linear-gradient(91.11deg, #F7426F -2.47%, #F87A58 91.34%)" }}
                    >
                        + Add Person
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
