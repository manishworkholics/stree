import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import JewelleryForm from "./JewelleryForm";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = "http://206.189.130.102:4545/api/jewelleries";

const JewelleryManagement = () => {
  const [jewelleryList, setJewelleryList] = useState([]);
  const [loading, setLoading] = useState(true);


  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Edit modal
  const [editingJewellery, setEditingJewellery] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Search
  const [search, setSearch] = useState("");

  // 🔹 Fetch all jewellery
  const fetchJewelleryList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/get-jewellery`);
      if (res.data?.success) {
        setJewelleryList(res.data.data || []);
      } else {
        toast.error(res.data?.message || "Failed to fetch jewellery list");
      }
    } catch (error) {
      console.error("Error fetching jewellery:", error);
      toast.error("Something went wrong while fetching jewellery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJewelleryList();
  }, []);

  // 🔹 Delete
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE}/delete-jewellery/${id}`);
      if (res.status === 200) {
        toast.success("Jewellery deleted successfully!");
        fetchJewelleryList();
      } else {
        toast.error(res.data?.message || "Failed to delete jewellery");
      }
    } catch (error) {
      console.error("Error deleting jewellery:", error);
      toast.error("Something went wrong while deleting jewellery");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // 🔹 Update (Edit Jewellery)
  const handleUpdateJewellery = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editingJewellery.name);
      formData.append("code", editingJewellery.code);
      formData.append("rentPrice", editingJewellery.rentPrice);

      // ✅ Only send if it's a new file
      if (editingJewellery.photo instanceof File) {
        formData.append("photo", editingJewellery.photo);
      }

      const res = await axios.put(
        `${API_BASE}/update-jewellery/${editingJewellery._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data?.success) {
        toast.success("Jewellery updated successfully!");
        setShowEditModal(false);
        fetchJewelleryList();
      } else {
        toast.error(res.data?.message || "Failed to update jewellery");
      }
    } catch (error) {
      console.error("Error updating jewellery:", error);
      toast.error("Something went wrong while updating");
    }
  };




  // 🔹 Search filter
  const filteredData = jewelleryList.filter(
    (j) =>
      j.name.toLowerCase().includes(search.toLowerCase()) ||
      j.code.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage);

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
                                  <span>
                                    <Link to="/dashboard">Home</Link>
                                  </span>
                                </li>
                                <li className="active">
                                  <span>Jewellery</span>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div className="breadcrumb__tab">
                          <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link "
                                id="tab-1"
                                data-bs-toggle="tab"
                                data-bs-target="#tab-1-pane"
                                type="button"
                              >
                                Add Jewellery
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="tab-2"
                                data-bs-toggle="tab"
                                data-bs-target="#tab-2-pane"
                                type="button"
                              >
                                Jewellery List
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
                    {/* 🔹 Add Jewellery Tab */}
                    <div
                      className="tab-pane fade "
                      id="tab-1-pane"
                      role="tabpanel"
                    >
                      <div className="body__card-wrapper">
                        <div className="row">
                          <div className="col-xxl-12">
                            <div className="create__event-area create-quotation-area">
                              <div className="">
                                <div className="card__header-top mb-3 pb-2">
                                  <div className="card__title-inner">
                                    <h4 className="event__information-title quotation-information-title">
                                      Add New Jewellery
                                    </h4>
                                  </div>
                                </div>
                                <JewelleryForm fetchJewelleryList={fetchJewelleryList} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 🔹 Jewellery List Tab */}
                    <div className="tab-pane fade show active" id="tab-2-pane" role="tabpanel">
                      <div className="body__card-wrapper">
                        {/* Search */}
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name or code..."
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value);
                              setCurrentPage(1);
                            }}
                          />
                        </div>

                        <div className="attendant__wrapper mb-35">
                          {loading ? (
                            <p>Loading jewellery...</p>
                          ) : (
                            <table>
                              <thead>
                                <tr>
                                  <th>S.No</th>
                                  <th>Name</th>
                                  <th>Jewellery Code</th>
                                  <th>Photo</th>
                                  <th>Price</th>
                                  <th>Availability</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {paginatedData.length > 0 ? (
                                  paginatedData.map((val, index) => (
                                    <tr key={val._id || val.id}>
                                      <td>{startIdx + index + 1}</td>
                                      <td>{val.name}</td>
                                      <td>{val.code}</td>
                                      <td>
                                        <img
                                          src={val.photo}
                                          alt={val.name}
                                          width="50"
                                        />
                                      </td>
                                      <td>
                                        <i className="fa-solid fa-indian-rupee-sign me-2"></i>
                                        {val.rentPrice}
                                      </td>
                                      <td>
                                        {val.isAvailable ? "Available" : "Not Available"}
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn border-0"
                                          onClick={() => {
                                            setEditingJewellery({ ...val });
                                            setShowEditModal(true);
                                          }}
                                        >
                                          <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                          onClick={() => handleDelete(val._id || val.id)}
                                          type="button"
                                          className="btn border-0"
                                        >
                                          <i className="fa-solid fa-trash-can text-danger"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="7" className="text-center">
                                      No jewellery found.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          )}
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-center mt-3">
                          <button
                            className="btn btn-secondary me-2"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Prev
                          </button>
                          <span className="align-self-center">
                            Page {currentPage} of {totalPages}
                          </span>
                          <button
                            className="btn btn-secondary ms-2"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Next
                          </button>
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
        <div
          className="modal show"
          style={{ display: "block", background: "#0000008e" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-ffe2e5 py-3">
                <h4 className="modal-title text-danger">Warning!</h4>
                <button
                  type="button"
                  className="close"
                  onClick={closeDeleteModal}
                >
                  <i className="fa-solid fa-xmark fs-3 text-danger"></i>
                </button>
              </div>
              <div className="modal-body text-center">
                <h5 className="text-danger">
                  Do you want to permanently delete?
                </h5>
                <img src="images/deleteWarning.png" alt="" className="w-100 m-auto" />
                <div className="d-flex align-items-center justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-danger px-4 me-3"
                    onClick={() => deleteItem(deleteId)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger px-4"
                    onClick={closeDeleteModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}

      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Jewellery</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={editingJewellery?.name || ""}
                  onChange={(e) =>
                    setEditingJewellery({ ...editingJewellery, name: e.target.value })
                  }
                />

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Code"
                  value={editingJewellery?.code || ""}
                  onChange={(e) =>
                    setEditingJewellery({ ...editingJewellery, code: e.target.value })
                  }
                />

                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Price"
                  value={editingJewellery?.rentPrice || ""}
                  onChange={(e) =>
                    setEditingJewellery({
                      ...editingJewellery,
                      rentPrice: e.target.value,
                    })
                  }
                />

                {/* 🔹 Image Input */}
                <label className="form-label">Photo</label>
                <input
                  type="file"
                  className="form-control mb-2"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setEditingJewellery({
                        ...editingJewellery,
                        photo: file,
                        preview: URL.createObjectURL(file), // ✅ temporary preview
                      });
                    }
                  }}
                />

                {/* ✅ If a new file was picked, show preview, otherwise show existing photo */}
                {editingJewellery?.preview ? (
                  <img
                    src={editingJewellery.preview}
                    alt="New Preview"
                    className="mt-2 rounded"
                    width="80"
                  />
                ) : editingJewellery?.photo && typeof editingJewellery.photo === "string" ? (
                  <img
                    src={`${editingJewellery.photo}`}
                    alt="Existing"
                    className="mt-2 rounded"
                    width="80"
                  />
                ) : null}

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateJewellery}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default JewelleryManagement;
