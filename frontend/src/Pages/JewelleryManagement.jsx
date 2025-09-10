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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 🔹 Get jewellery list on mount
  useEffect(() => {
    fetchJewelleries();
  }, []);

  const fetchJewelleries = async () => {
    try {
      const data = await callApi("/get-jewellery", "GET");
      setJewelleryList(data);
    } catch (err) {
      toast.error(err.message || "Failed to fetch jewelleries");
    }
  };

  // 🔹 Fetch all jewellery from API
  const fetchJewelleryList = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get-jewellery`);
      if (res.data?.success) {
        setJewelleryList(res.data.data || []);
      } else {
        toast.error(res.data?.message || "Failed to fetch jewellery list");
      }
    } catch (error) {
      console.error("Error fetching jewellery:", error);
      toast.error("Something went wrong while fetching jewellery");
    }
  };

  useEffect(() => {
    fetchJewelleryList();
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // 🔹 Delete from API
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE}/delete-jewellery/${id}`);
      if (res.status===200) {
        toast.success("Jewellery deleted successfully!");
        fetchJewelleryList(); // refresh list
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

  const handleEditClick = (item) => {
    setEditData(item);       // selected jewellery
    setIsEditModalOpen(true);
  };

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
                                className="nav-link active"
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
                                className="nav-link"
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
                      className="tab-pane fade show active"
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
                    <div
                      className="tab-pane fade"
                      id="tab-2-pane"
                      role="tabpanel"
                    >
                      <div className="body__card-wrapper">
                        <div className="attendant__wrapper mb-35">
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
                              {jewelleryList.length > 0 ? (
                                jewelleryList.map((val, index) => (
                                  <tr key={val._id || val.id}>
                                    <td>
                                      <span>{index + 1}</span>
                                    </td>
                                    <td>
                                      <span>{val.name}</span>
                                    </td>
                                    <td>
                                      <img
                                        src={val.photo}
                                        alt={val.name}
                                        width="50"
                                      />
                                    </td>
                                    <td>
                                      <span>
                                        <i className="fa-solid fa-indian-rupee-sign me-2"></i>
                                        {val.price}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        {val.isAvailable ? "Available" : "Not Available"}
                                      </span>
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn border-0"
                                      >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDelete(val._id || val.id)
                                        }
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
                                  <td colSpan="6" className="text-center">
                                    No jewellery found.
                                  </td>
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

      {isEditModalOpen && (
        <div className="modal show" style={{ display: "block", background: "#0000008e" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary py-3">
                <h4 className="modal-title text-white">Edit Jewellery</h4>
                <button type="button" className="close" onClick={() => setIsEditModalOpen(false)}>
                  <i className="fa-solid fa-xmark fs-3 text-white"></i>
                </button>
              </div>
              <div className="modal-body">
                <EditJewelleryForm
                  editData={editData}
                  setJewelleryList={setJewelleryList}
                  onClose={() => setIsEditModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
                <img
                  src="images/deleteWarning.png"
                  alt=""
                  className="w-100 m-auto"
                />
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
    </>
  );
};

export default JewelleryManagement;
