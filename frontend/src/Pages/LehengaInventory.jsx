import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const API_BASE = "http://206.189.130.102:4545/api/lehengas";

const LehengaInventory = ({ sizeList }) => {
    const [lehengaList, setLehengaList] = useState([]);
    const [newLehenga, setNewLehenga] = useState({
        name: "",
        photo: null,
        size: "",
        rentPrice: "",
        code: "",
        status: "Available",
    });



    const [preview, setPreview] = useState("");
    const [counters, setCounters] = useState({ out: 0, in: 0 });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔹 Fetch lehenga list from API
    const fetchLehengas = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_BASE);
            if (res.data?.success) {
                setLehengaList(res.data.data || []);
                updateCounters(res.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching lehengas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLehengas();// eslint-disable-next-line
    }, []);

    // 🔹 For text, number, select inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLehenga((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 For file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewLehenga((prev) => ({ ...prev, photo: file }));
            setPreview(URL.createObjectURL(file)); // show preview
        }
    };

    // 🔹 Add Lehenga API Call
    const handleAddLehenga = async (e) => {
        e.preventDefault();
        if (!newLehenga.name || !newLehenga.size || !newLehenga.rentPrice || !newLehenga.code) {
            alert("Please fill all required fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", newLehenga.name);
        formData.append("size", newLehenga.size);
        formData.append("rentPrice", newLehenga.rentPrice);
        formData.append("code", newLehenga.code);
        if (newLehenga.photo) {
            formData.append("photo", newLehenga.photo);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${API_BASE}/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 201 || 200) {
                toast.success("lehenga added successfully!");
                fetchLehengas();; // refresh list
                setNewLehenga({
                    name: "",
                    photo: null,
                    size: "",
                    rentPrice: "",
                    code: "",
                    status: "Available",
                });
            } else {
                alert(res.data?.message || "Failed to add lehenga");
            }
        } catch (error) {
            console.error("Error adding lehenga:", error);
            alert("Error while adding lehenga");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Update status locally (you may need API support for real status update)
    const handleStatusChange = (id, status) => {
        const updatedList = lehengaList.map((item) =>
            item._id === id ? { ...item, status } : item
        );
        setLehengaList(updatedList);
        updateCounters(updatedList);
    };

    // 🔹 Update rented / returned counts
    const updateCounters = (list) => {
        const outCount = list.filter((l) => l.status === "Booked").length;
        const inCount = list.filter((l) => l.status === "Returned").length;
        setCounters({ out: outCount, in: inCount });
    };

    // 🔹 Delete lehenga (if API exists, otherwise local)
    const handleDelete = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`${API_BASE}/${id}`);
            const updatedList = lehengaList.filter((item) => item._id !== id);
            setLehengaList(updatedList);
            updateCounters(updatedList);
        } catch (error) {
            console.error("Error deleting lehenga:", error);
        }
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
                                                <form onSubmit={handleAddLehenga}>
                                                    <div className="row mb-4">
                                                        <div className="col-12 col-lg-3 singel__input-field mb-15">
                                                            <label>Lehenga Name</label>
                                                            <input type="text" name="name" value={newLehenga.name} onChange={handleInputChange} />
                                                        </div>

                                                        <div className="col-12 col-lg-3 singel__input-field mb-15">
                                                            <label>Photo <span className="text-danger">*</span>(only jpeg or jpg)</label>


                                                            <input
                                                                type="file"
                                                                name="photo"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                            />

                                                            {preview && (
                                                                <img
                                                                    src={preview}
                                                                    alt="preview"
                                                                    width="80"
                                                                    className="mt-2 rounded"
                                                                />
                                                            )}

                                                        </div>

                                                        <div className="col-12 col-lg-2 singel__input-field mb-15">
                                                            <label>Size</label>
                                                            <select name="size" value={newLehenga.size} onChange={handleInputChange}>
                                                                <option value="">Select Size</option>
                                                                <option value="S">S</option>
                                                                <option value="M">M</option>
                                                                <option value="L">L</option>
                                                                <option value="XL">XL</option>
                                                                {(sizeList || []).map(size => (
                                                                    <option key={size.id} value={size.name}>{size.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="col-12 col-lg-2 singel__input-field mb-15">
                                                            <label>Rent Price</label>
                                                            <input type="number" name="rentPrice" value={newLehenga.rentPrice} onChange={handleInputChange} />
                                                        </div>

                                                        <div className="col-12 col-lg-2 singel__input-field mb-15">
                                                            <label>Code</label>
                                                            <input type="text" name="code" value={newLehenga.code} onChange={handleInputChange} />
                                                        </div>

                                                        <div className="col-12 col-lg-2 d-flex align-items-end mb-15">
                                                            <button type="submit" className="btn btn-success w-100" disabled={loading}>
                                                                {loading ? "Saving..." : "Add Lehenga"}
                                                            </button>
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

                                        {/* 🔹 Lehenga List Tab */}
                                        <div
                                            className="tab-pane fade"
                                            id="tab-2-pane"
                                            role="tabpanel"
                                        >
                                            <div className="body__card-wrapper">
                                                <div className="attendant__wrapper mb-35">
                                                    {loading ? (
                                                        <p>Loading...</p>
                                                    ) : (
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>S.No</th>
                                                                    <th>Name</th>
                                                                    <th>Photo</th>
                                                                    <th>Size</th>
                                                                    <th>Rent Price</th>
                                                                    <th>Code</th>
                                                                    <th>Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {lehengaList.length > 0 ? lehengaList.map((val, index) => (
                                                                    <tr key={val._id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{val.name}</td>
                                                                        <td>{val.photo ? <img src={val.photo} alt={val.name} width="50" /> : "No Image"}</td>
                                                                        <td>{val.size}</td>
                                                                        <td>₹{val.rentPrice}</td>
                                                                        <td>{val.code}</td>
                                                                        <td>
                                                                            <select value={val.status || "Available"} onChange={e => handleStatusChange(val._id, e.target.value)}>
                                                                                <option value="Available">Available</option>
                                                                                <option value="Booked">Booked</option>
                                                                                <option value="Returned">Returned</option>
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            <button onClick={() => handleDelete(val._id)} type="button" className="btn border-0">
                                                                                <i className="fa-solid fa-trash-can text-danger"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )) : (
                                                                    <tr>
                                                                        <td colSpan="8" className="text-center">No lehengas found.</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    )}
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
