import React, { useState, useEffect } from "react";
import PersonTable from "./PersonTable";

const ParentPersonTable = ({ dressList, jewelleryList, onChange }) => {
    const [persons, setPersons] = useState([
        { id: Date.now(), category: "", name: "", items: [], isSaved: false },
    ]);
    const [expandedPersonId, setExpandedPersonId] = useState(null);

    const addPerson = () => {
        setPersons([
            ...persons,
            { id: Date.now(), category: "", name: "", items: [], isSaved: false },
        ]);
    };

    const removePerson = (id) => {
        setPersons(persons.filter((p) => p.id !== id));
        if (expandedPersonId === id) setExpandedPersonId(null);
        notifyParent();
    };

    const handlePersonChange = (id, field, value) => {
        setPersons(
            persons.map((p) => (p.id === id ? { ...p, [field]: value, isSaved: false } : p))
        );
    };

    const handleItemsChange = (id, items) => {
        setPersons(
            persons.map((p) => (p.id === id ? { ...p, items, isSaved: false } : p))
        );
    };

    const toggleItems = (id) => {
        setExpandedPersonId(expandedPersonId === id ? null : id);
    };

    const savePerson = (id) => {
        setPersons(
            persons.map((p) => (p.id === id ? { ...p, isSaved: true } : p))
        );
        notifyParent();
    };

    const notifyParent = () => {
        if (onChange) {
            onChange(persons.filter((p) => p.isSaved)); // only send saved persons
        }
    };

    useEffect(() => {
        if (onChange) {
            onChange(persons);   // jaise hi persons update hoga, BookingForm ko update bhej do
        }
    }, [persons, onChange]);

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Person Name</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((person) => {
                            const totalAmount = person.items?.reduce(
                                (sum, item) => sum + (item.amount || 0),
                                0
                            );

                            return (
                                <React.Fragment key={person.id}>
                                    <tr>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={person.category}
                                                onChange={(e) =>
                                                    handlePersonChange(person.id, "category", e.target.value)
                                                }
                                            >
                                                <option selected value="Women">Women</option>
                                                <option value="Men">Men</option>
                                                <option value="Child Boy">Child - Boy</option>
                                                <option value="Child Girl">Child - Girl</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={person.name}
                                                onChange={(e) =>
                                                    handlePersonChange(person.id, "name", e.target.value)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <span className="ms-2 fw-bold text-success">
                                                ₹{totalAmount}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-info btn-sm me-2 mb-2 mb-lg-0"
                                                onClick={() => toggleItems(person.id)}
                                            >
                                                {expandedPersonId === person.id ?
                                                    <i className="fa-solid fa-eye-slash"></i>
                                                    : <i className="fa-solid fa-eye"></i>}
                                            </button>

                                            <button
                                                type="button"
                                                className={`btn ${person.isSaved ? "btn-success" : "btn-primary"
                                                    } btn-sm me-2 mb-2 mb-lg-0`}
                                                onClick={() => savePerson(person.id)}
                                            >
                                                {person.isSaved ? "Saved" : "Save"}
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm mb-2 mb-lg-0"
                                                onClick={() => removePerson(person.id)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedPersonId === person.id && (
                                        <tr>
                                            <td colSpan="4">
                                                <PersonTable
                                                    dressList={dressList}
                                                    jewelleryList={jewelleryList}
                                                    onItemsChange={(items) =>
                                                        handleItemsChange(person.id, items)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}

                    </tbody>
                </table>
            </div>
            <button type="button" className="btn btn-primary " onClick={addPerson}>
                + Add Person
            </button>
        </div>
    );
};


export default ParentPersonTable;
