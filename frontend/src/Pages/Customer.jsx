import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://206.189.130.102:4545/api/customers";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Search
  const [search, setSearch] = useState("");

  // Fetch customers (once)
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setCustomers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Delete
  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Update
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingCustomer._id}`, editingCustomer);
      setShowModal(false);
      fetchCustomers();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Export CSV
  const handleExport = () => {
    const csvRows = [];
    const headers = ["S.No", "Name", "Mobile", "Address", "Created At"];
    csvRows.push(headers.join(","));

    filteredData.forEach((c, index) => {
      const row = [
        index + 1,
        c.name,
        c.mobile,
        c.adress,
        new Date(c.createdAt).toLocaleString(),
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
  };

  // Search filter
  const filteredData = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      c.adress.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage);

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
                              <span>Customer Report</span>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="breadcrum__button d-flex gap-2">
                    <button className="breadcrum__btn" onClick={handleExport}>
                      <i className="fa-solid fa-file-export me-2"></i> Export
                    </button>
                    <button className="breadcrum__btn" onClick={handlePrint}>
                      <i className="fa-solid fa-print me-2"></i> Print
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="px-4 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, mobile, or address..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // reset to first page on search
                }}
              />
            </div>

            {/* Report Table */}
            <div className="attendant__list-area pb-20 px-4">
              <div className="attendan__content">
                <div className="body__card-wrapper">
                  <div className="attendant__wrapper mb-35">
                    {loading ? (
                      <p>Loading customers...</p>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Created At</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedData.length > 0 ? (
                            paginatedData.map((customer, index) => (
                              <tr key={customer._id}>
                                <td>{startIdx + index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.mobile}</td>
                                <td>{customer.adress}</td>
                                <td>
                                  {new Date(customer.createdAt).toLocaleString()}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => {
                                      setEditingCustomer({ ...customer });
                                      setShowModal(true);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteCustomer(customer._id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No customers found
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

            {/* Edit Modal */}
            {showModal && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Customer</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Name"
                        value={editingCustomer?.name || ""}
                        onChange={(e) =>
                          setEditingCustomer({
                            ...editingCustomer,
                            name: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Mobile"
                        value={editingCustomer?.mobile || ""}
                        onChange={(e) =>
                          setEditingCustomer({
                            ...editingCustomer,
                            mobile: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Address"
                        value={editingCustomer?.adress || ""}
                        onChange={(e) =>
                          setEditingCustomer({
                            ...editingCustomer,
                            adress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button className="btn btn-primary" onClick={handleUpdate}>
                        Update
                      </button>
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

export default Customer;
