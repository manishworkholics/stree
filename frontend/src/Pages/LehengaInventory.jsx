import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const LehengaInventory = ({ sizeList }) => {
    const [lehengaList, setLehengaList] = useState([]);
    const [newLehenga, setNewLehenga] = useState({
        name: "",
        photo: null,
        size: "",
        rentPrice: "",
        status: "Available",
    });

    const [counters, setCounters] = useState({
        out: 0, // Gaye Hue
        in: 0, // Aaye Hue
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLehenga({ ...newLehenga, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewLehenga({ ...newLehenga, photo: e.target.files[0] });
    };

    const handleAddLehenga = (e) => {
        e.preventDefault();
        if (!newLehenga.name || !newLehenga.size || !newLehenga.rentPrice) {
            alert("Please fill all required fields!");
            return;
        }

        const addedLehenga = {
            ...newLehenga,
            id: Date.now(),
            photoURL: newLehenga.photo ? URL.createObjectURL(newLehenga.photo) : null,
        };

        const updatedList = [...lehengaList, addedLehenga];
        setLehengaList(updatedList);

        // Update counters
        updateCounters(updatedList);

        // Reset form
        setNewLehenga({
            name: "",
            photo: null,
            size: "",
            rentPrice: "",
            status: "Available",
        });
    };

    const handleStatusChange = (id, status) => {
        const updatedList = lehengaList.map((item) =>
            item.id === id ? { ...item, status } : item
        );
        setLehengaList(updatedList);
        updateCounters(updatedList);
    };

    const updateCounters = (list) => {
        const outCount = list.filter((l) => l.status === "Booked").length;
        const inCount = list.filter((l) => l.status === "Returned").length;
        setCounters({ out: outCount, in: inCount });
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const deleteItem = (id) => {
        const updatedList = lehengaList.filter((item) => item.id !== id);
        setLehengaList(updatedList);
        updateCounters(updatedList);
        setIsDeleteModalOpen(false);
    };

    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    return (
        <>
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
                                                                <li className="active"><span>Lehenga Inventory</span></li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </div>
                                                <div className="breadcrumb__tab">
                                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="tab-1" data-bs-toggle="tab" data-bs-target="#tab-1-pane" type="button">
                                                                Add Lehenga
                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="tab-2" data-bs-toggle="tab" data-bs-target="#tab-2-pane" type="button">
                                                                Lehenga List
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

                                        {/* 🔹 Add Lehenga Tab */}
                                        <div className="tab-pane fade show active" id="tab-1-pane" role="tabpanel">
                                            <div className="body__card-wrapper">
                                                <div className="row">
                                                    <div className="col-xxl-12">
                                                        <div className="create__event-area create-quotation-area">
                                                            <div className="">
                                                                <div className="card__header-top mb-3 pb-2">
                                                                    <div className="card__title-inner">
                                                                        <h4 className="event__information-title quotation-information-title">Add New Lehenga</h4>
                                                                    </div>
                                                                </div>
                                                                <form onSubmit={handleAddLehenga}>
                                                                    <div className="row mb-4">
                                                                        <div className="col-12 col-lg-3 singel__input-field mb-15">
                                                                            <label className="input__field-text">Lehenga Name</label>
                                                                            <input type="text" name="name" value={newLehenga.name} onChange={handleInputChange} />
                                                                        </div>

                                                                        <div className="col-12 col-lg-3 singel__input-field mb-15">
                                                                            <label className="input__field-text">Photo</label>
                                                                            <input type="file" onChange={handleFileChange} />
                                                                        </div>

                                                                        <div className="col-12 col-lg-2 singel__input-field mb-15">
                                                                            <label className="input__field-text">Size</label>
                                                                            <div className="contact__select">
                                                                                <select name="size" value={newLehenga.size} onChange={handleInputChange}>
                                                                                    <option value="">Select Size</option>
                                                                                    {(sizeList || []).map(size => (
                                                                                        <option key={size.id} value={size.id}>{size.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-12 col-lg-2 singel__input-field mb-15">
                                                                            <label className="input__field-text">Rent Price</label>
                                                                            <input type="number" name="rentPrice" value={newLehenga.rentPrice} onChange={handleInputChange} />
                                                                        </div>

                                                                        <div className="col-12 col-lg-2 d-flex align-items-end mb-15">
                                                                            <button type="submit" className="btn btn-success w-100">Add Lehenga</button>
                                                                        </div>
                                                                    </div>
                                                                </form>

                                                                {/* Counters */}
                                                                <div className="row mb-4">
                                                                    <div className="col-6">
                                                                        <div className="alert alert-warning">Total Rented: {counters.out}</div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="alert alert-info">Total Returned: {counters.in}</div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 🔹 Lehenga List Tab */}
                                        <div className="tab-pane fade" id="tab-2-pane" role="tabpanel">
                                            <div className="body__card-wrapper">
                                                <div className="attendant__wrapper mb-35">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>S.No</th>
                                                                <th>Name</th>
                                                                <th>Photo</th>
                                                                <th>Size</th>
                                                                <th>Rent Price</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lehengaList.length > 0 ? lehengaList.map((val, index) => (
                                                                <tr key={val.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{val.name}</td>
                                                                    <td>{val.photoURL ? <img src={val.photoURL} alt={val.name} width="50" /> : "No Image"}</td>
                                                                    <td>{(sizeList.find(s => s.id === val.size)?.name) || "-"}</td>
                                                                    <td>₹{val.rentPrice}</td>
                                                                    <td>
                                                                        <select value={val.status} onChange={e => handleStatusChange(val.id, e.target.value)}>
                                                                            <option value="Available">Available</option>
                                                                            <option value="Booked">Booked</option>
                                                                            <option value="Returned">Returned</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => handleDelete(val.id)} type="button" className="btn border-0">
                                                                            <i className="fa-solid fa-trash-can text-danger"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )) : (
                                                                <tr>
                                                                    <td colSpan="7" className="text-center">No lehengas added yet.</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
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

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="modal show" style={{ display: "block", background: "#0000008e" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-ffe2e5 py-3">
                                <h4 className="modal-title text-danger">Warning!</h4>
                                <button type="button" className="close" onClick={closeDeleteModal}>
                                    <i className="fa-solid fa-xmark fs-3 text-danger"></i>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <h5 className="text-danger">Do you want to permanently delete?</h5>
                                <img src="images/deleteWarning.png" alt="" className="w-100 m-auto" />
                                <div className="d-flex align-items-center justify-content-center mt-3">
                                    <button type="button" className="btn btn-danger px-4 me-3" onClick={() => deleteItem(deleteId)}>Yes</button>
                                    <button type="button" className="btn btn-outline-danger px-4" onClick={closeDeleteModal}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default LehengaInventory;
