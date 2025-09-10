import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const PersonTable = ({ dressList = [], jewelleryList = [], onItemsChange }) => {
    const [persons, setPersons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("newPerson"); // "newPerson" | "addItem"
    const [currentPersonIndex, setCurrentPersonIndex] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);

    const [personName, setPersonName] = useState("");
    const [modalItems, setModalItems] = useState([]);
    const [newItem, setNewItem] = useState({
        category: "",
        name: "",
        code: "",
        size: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        bookingDate: "",
        returnDate: "",
    });

    // Dummy Existing Bookings
    const existingBookings = [
        { product: "Red Lehenga", bookingDate: "2025-09-10T10:00", returnDate: "2025-09-12T18:00" },
        { product: "Gold Necklace", bookingDate: "2025-09-11T09:00", returnDate: "2025-09-11T22:00" },
    ];

    const formatDateTime = (val) => (val ? dayjs(val).format("DD-MM-YYYY hh:mm A") : "");

    // Handle item field changes with availability check
    const handleItemChange = (field, value) => {
        const updatedItem = { ...newItem, [field]: value };

        if (field === "quantity" || field === "rate") {
            updatedItem.amount = (updatedItem.quantity || 0) * (updatedItem.rate || 0);
        }

        setNewItem(updatedItem);

        // Trigger availability check only if product and both dates are filled
        if (updatedItem.name && updatedItem.bookingDate && updatedItem.returnDate) {
            if (!isAvailable(updatedItem)) {
                // Reset product if unavailable
                updatedItem.name = "";
                setNewItem(updatedItem);
            }
        }
    };

    const isAvailable = (item) => {
        const itemStart = new Date(item.bookingDate);
        const itemEnd = new Date(item.returnDate);

        if (itemStart >= itemEnd) {
            alert("Return date/time must be after booking date/time");
            return false;
        }

        for (let booking of existingBookings) {
            if (booking.product === item.name) {
                const bookedStart = new Date(booking.bookingDate);
                const bookedEnd = new Date(booking.returnDate);

                if (itemStart < bookedEnd && itemEnd > bookedStart) {
                    alert(`${item.name} is not available in the selected dates/times`);
                    return false;
                }
            }
        }
        return true;
    };

    const addItemToModal = () => {
        if (!newItem.category || !newItem.name) return alert("Select category and product");
        if (!newItem.bookingDate || !newItem.returnDate) return alert("Select booking & return date/time");
        if (!isAvailable(newItem)) return;

        if (editingIndex !== null) {
            const updated = [...modalItems];
            updated[editingIndex] = newItem;
            setModalItems(updated);
            setEditingIndex(null);
        } else {
            setModalItems([...modalItems, newItem]);
        }

        setNewItem({
            category: "",
            name: "",
            code: "",
            size: "",
            quantity: 1,
            rate: 0,
            amount: 0,
            bookingDate: "",
            returnDate: "",
        });
    };

    const editItemInModal = (index) => {
        setNewItem(modalItems[index]);
        setEditingIndex(index);
    };

    const removeItemFromModal = (index) => {
        setModalItems(modalItems.filter((_, i) => i !== index));
        if (editingIndex === index) setEditingIndex(null);
    };

    const openAddItemModal = (personIndex) => {
        setCurrentPersonIndex(personIndex);
        setModalMode("addItem");
        setModalItems([]);
        setNewItem({
            category: "",
            name: "",
            code: "",
            size: "",
            quantity: 1,
            rate: 0,
            amount: 0,
            bookingDate: "",
            returnDate: "",
        });
        setShowModal(true);
    };

    const savePersonOrItem = () => {
        if (modalMode === "newPerson") {
            if (!personName) return alert("Enter person name");
            if (modalItems.length === 0) return alert("Add at least one item");

            const personData = { name: personName, items: modalItems };
            setPersons([...persons, personData]);
        } else if (modalMode === "addItem") {
            const updatedPersons = [...persons];

            // If editing an item from main table
            if (editingIndex !== null) {
                updatedPersons[currentPersonIndex].items[editingIndex] = newItem;
                setEditingIndex(null);
            } else {
                // Add new items from modal
                updatedPersons[currentPersonIndex].items.push(...modalItems);
            }

            setPersons(updatedPersons);
        }

        setPersonName("");
        setModalItems([]);
        setNewItem({
            category: "",
            name: "",
            code: "",
            size: "",
            quantity: 1,
            rate: 0,
            amount: 0,
            bookingDate: "",
            returnDate: "",
        });
        setShowModal(false);
    };

    useEffect(() => {
        if (onItemsChange) {
            const allItems = persons.flatMap((p) => p.items);
            onItemsChange(allItems);
        }
    }, [persons, onItemsChange]);

    return (
        <div className="mb-2 ms-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold">Persons & Items</h5>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setModalMode("newPerson");
                        setModalItems([]);
                        setPersonName("");
                        setShowModal(true);
                    }}
                >
                    + Add Person
                </button>
            </div>

            {persons.map((p, idx) => (
                <div key={idx} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold">{p.name}</h6>
                        <button className="btn btn-sm btn-secondary" onClick={() => openAddItemModal(idx)}>
                            + Add Item
                        </button>
                    </div>

                    <div className="table-responsive mt-2">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Product</th>
                                    <th>Code</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Rate</th>
                                    <th>Amount</th>
                                    <th>Booking Date</th>
                                    <th>Return Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {p.items.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.category}</td>
                                        <td>{item.name}</td>
                                        <td>{item.code}</td>
                                        <td>{item.size}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.rate}</td>
                                        <td>{item.amount.toFixed(2)}</td>
                                        <td>{formatDateTime(item.bookingDate)}</td>
                                        <td>{formatDateTime(item.returnDate)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info me-2"
                                                onClick={() => {
                                                    setCurrentPersonIndex(idx);
                                                    setEditingIndex(i);
                                                    setNewItem(item);
                                                    setModalMode("addItem");
                                                    setShowModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => {
                                                    const updatedPersons = [...persons];
                                                    updatedPersons[idx].items = updatedPersons[idx].items.filter((_, j) => j !== i);

                                                    // अगर last item delete, तो person भी delete
                                                    if (updatedPersons[idx].items.length === 0) {
                                                        updatedPersons.splice(idx, 1);
                                                    }

                                                    setPersons(updatedPersons);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content" style={{ marginTop: "100px" }}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {modalMode === "newPerson" ? "Add Person & Items" : "Add/Edit Items"}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {modalMode === "newPerson" && (
                                    <div className="mb-2">
                                        <label>Person Name</label>
                                        <input type="text" className="form-control" value={personName} onChange={(e) => setPersonName(e.target.value)} />
                                    </div>
                                )}

                                <h5 className="mt-3 text-danger mb-2">Item Details</h5>

                                <div className="row">
                                    {/* Category */}
                                    <div className="col-md-6 mb-2">
                                        <label>Category</label>
                                        <select
                                            className="form-select"
                                            value={newItem.category}
                                            onChange={(e) => {
                                                const category = e.target.value;
                                                handleItemChange("category", category);

                                                // Reset only product-related fields
                                                setNewItem((prev) => ({
                                                    ...prev,
                                                    category,
                                                    id: "",
                                                    name: "",
                                                    code: "",
                                                    size: "",
                                                    rate: 0,
                                                    amount: 0,
                                                }));
                                            }}
                                        >
                                            <option value="">Select</option>
                                            <option value="Dress">Dress</option>
                                            <option value="Jewellery">Jewellery</option>
                                        </select>
                                    </div>

                                    {/* Product */}
                                    <div className="col-md-6 mb-2">
                                        <label>Product</label>
                                        <select
                                            className="form-select"
                                            value={newItem.id ? String(newItem.id) : ""}
                                            onChange={(e) => {
                                                const selectedId = e.target.value;
                                                let selectedItem = null;

                                                if (newItem.category === "Dress") {
                                                    selectedItem = dressList.find((d) => String(d.id) === selectedId);
                                                } else if (newItem.category === "Jewellery") {
                                                    selectedItem = jewelleryList.find((j) => String(j.id) === selectedId);
                                                }

                                                if (selectedItem) {
                                                    setNewItem((prev) => ({
                                                        ...prev,
                                                        id: selectedItem.id,
                                                        name: selectedItem.name,
                                                        code: selectedItem.code || "",
                                                        size: selectedItem.size || "",
                                                        rate: selectedItem.rentPrice || 0,
                                                        amount: (selectedItem.rentPrice || 0) * (prev.quantity || 1),
                                                    }));
                                                }
                                            }}
                                        >
                                            <option value="">Select</option>
                                            {newItem.category === "Dress" &&
                                                dressList.map((d) => (
                                                    <option key={d.id} value={String(d.id)}>
                                                        {d.code} - {d.name}
                                                    </option>
                                                ))}
                                            {newItem.category === "Jewellery" &&
                                                jewelleryList.map((j) => (
                                                    <option key={j.id} value={String(j.id)}>
                                                        {j.code} - {j.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    {/* Code */}
                                    <div className="col-md-6 mb-2">
                                        <label>Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={newItem.code || ""}
                                            onChange={(e) => {
                                                const code = e.target.value;
                                                handleItemChange("code", code);

                                                // Auto-check the code in both lists
                                                let foundItem = dressList.find((d) => d.code === code);
                                                let categoryFound = "Dress";

                                                if (!foundItem) {
                                                    foundItem = jewelleryList.find((j) => j.code === code);
                                                    categoryFound = "Jewellery";
                                                }

                                                if (foundItem) {
                                                    // Update the state based on found item
                                                    setNewItem((prev) => ({
                                                        ...prev,
                                                        category: categoryFound,
                                                        id: foundItem.id,
                                                        name: foundItem.name,
                                                        size: foundItem.size || "",
                                                        rate: foundItem.rentPrice || 0,
                                                        amount: (foundItem.rentPrice || 0) * (prev.quantity || 1),
                                                    }));
                                                } else {
                                                    // Reset product fields if code not found
                                                    setNewItem((prev) => ({
                                                        ...prev,
                                                        id: "",
                                                        name: "",
                                                        size: "",
                                                        rate: 0,
                                                        amount: 0,
                                                    }));
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Size */}
                                    <div className="col-md-6 mb-2">
                                        <label>Size</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={newItem.size || ""}
                                            onChange={(e) => handleItemChange("size", e.target.value)}
                                        />
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-md-4 mb-2">
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            value={newItem.quantity || 1}
                                            onChange={(e) => {
                                                const qty = parseInt(e.target.value) || 1;
                                                handleItemChange("quantity", qty);
                                                handleItemChange("amount", qty * (newItem.rate || 0));
                                            }}
                                        />
                                    </div>

                                    {/* Rate */}
                                    <div className="col-md-4 mb-2">
                                        <label>Rate</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={newItem.rate || 0}
                                            onChange={(e) => {
                                                const rate = parseFloat(e.target.value) || 0;
                                                handleItemChange("rate", rate);
                                                handleItemChange("amount", rate * (newItem.quantity || 1));
                                            }}
                                        />
                                    </div>

                                    {/* Amount */}
                                    <div className="col-md-4 mb-2">
                                        <label>Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={(newItem.amount || 0).toFixed(2)}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-2">
                                        <label>Booking Date & Time</label>
                                        <input type="datetime-local" className="form-control" value={newItem.bookingDate} onChange={(e) => handleItemChange("bookingDate", e.target.value)} />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <label>Return Date & Time</label>
                                        <input type="datetime-local" className="form-control" value={newItem.returnDate} onChange={(e) => handleItemChange("returnDate", e.target.value)} />
                                    </div>
                                </div>




                                <button className="btn btn-secondary mt-2" onClick={addItemToModal}>
                                    {editingIndex !== null ? "Update Item" : "+ Add Item"}
                                </button>

                                {modalItems.length > 0 && (
                                    <div className="table-responsive mt-3">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Category</th>
                                                    <th>Product</th>
                                                    <th>Code</th>
                                                    <th>Size</th>
                                                    <th>Quantity</th>
                                                    <th>Rate</th>
                                                    <th>Amount</th>
                                                    <th>Booking Date</th>
                                                    <th>Return Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {modalItems.map((item, i) => (
                                                    <tr key={i}>
                                                        <td>{item.category}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.code}</td>
                                                        <td>{item.size}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.rate}</td>
                                                        <td>{item.amount.toFixed(2)}</td>
                                                        <td>{formatDateTime(item.bookingDate)}</td>
                                                        <td>{formatDateTime(item.returnDate)}</td>
                                                        <td>
                                                            <button className="btn btn-sm btn-info me-2" onClick={() => editItemInModal(i)}>Edit</button>
                                                            <button className="btn btn-sm btn-danger" onClick={() => removeItemFromModal(i)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={savePersonOrItem}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonTable;
