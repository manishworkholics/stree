import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { callApi } from "../utils/api";

const EditJewelleryForm = ({ editData, setJewelleryList, onClose }) => {
    const [name, setName] = useState("");
    const [jewelleryCode, setJewelleryCode] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("Available");
    // const [photo, setPhoto] = useState("");

    // ✅ Fill form when editData changes
    useEffect(() => {
        if (editData) {
            setName(editData.name || "");
            setJewelleryCode(editData.code || "");
            setPrice(editData.pricePerDay || "");
            setAvailability(editData.isAvailable ? "Available" : "Not Available");
            // setPhoto(editData.photo || "");
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price) {
            toast.error("Please fill all required fields!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("code", jewelleryCode);
            formData.append("pricePerDay", price);
            formData.append("isAvailable", availability === "Available");
            // if (photo instanceof File) {
            //     formData.append("photo", photo);
            // }

            const updated = await callApi(`/update-jewellery/${editData._id}`, "PUT", formData);

            // Update local state
            setJewelleryList((prev) =>
                prev.map((item) => (item._id === editData._id ? updated : item))
            );

            toast.success("Jewellery updated successfully!");
            onClose(); // close modal
        } catch (error) {
            toast.error(error.message || "Failed to update jewellery!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-4">
                <div className="col-12 col-lg-4 singel__input-field mb-15">
                    <label className="input__field-text">Jewellery Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter jewellery name"
                    />
                </div>
                <div className="col-12 col-lg-4 singel__input-field mb-15">
                    <label className="input__field-text">Jewellery Code</label>
                    <input
                        type="text"
                        value={jewelleryCode}
                        onChange={(e) => setJewelleryCode(e.target.value)}
                        placeholder="Enter jewellery code"
                    />
                </div>
                <div className="col-12 col-lg-4 singel__input-field mb-15">
                    <label className="input__field-text">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                </div>
                <div className="col-12 col-lg-4 singel__input-field mb-15">
                    <label className="input__field-text">Availability</label>
                    <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="form-select"
                    >
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                </div>
                <div className="col-12 col-lg-4 singel__input-field mb-15">
                    <label className="input__field-text">Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        // onChange={(e) => setPhoto(e.target.files[0])}
                    />
                    {/* {photo && !(photo instanceof File) && (
                        <img
                            src={photo}
                            alt="preview"
                            width="80"
                            className="mt-2 rounded"
                        />
                    )} */}
                </div>
            </div>
            <button type="submit" className="btn btn-success">Update Jewellery</button>
        </form>
    );
};

export default EditJewelleryForm;
