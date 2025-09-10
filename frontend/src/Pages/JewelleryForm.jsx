import React, { useState } from "react";
import { toast } from "react-toastify";
import { callApi } from "../utils/api";

const JewelleryForm = ({ setJewelleryList }) => {
  const [name, setName] = useState("");
  const [jewelleryCode, setJewelleryCode] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [photo, setPhoto] = useState("");

  // const handlePhotoUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPhoto(file); // store the file for uploading
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      // Prepare form data (to handle file upload)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", jewelleryCode);
      formData.append("pricePerDay", price);
      formData.append("isAvailable", availability);
      if (photo) formData.append("photo", photo);

      // Call backend API
      const savedJewellery = await callApi("/add-jewellery", "POST", formData);

      // Update local state
      setJewelleryList((prev) => [...prev, savedJewellery]);
      toast.success("Jewellery added successfully!");

      // Reset form
      setName("");
      setJewelleryCode("");
      setPrice("");
      setAvailability("Available");
      setPhoto("");

    } catch (error) {
      toast.error(error.message || "Failed to add jewellery!");
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
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div className="col-12 col-lg-4 singel__input-field mb-15">
          <label className="input__field-text">Photo</label>
          <input type="file" accept="image/*" />
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="preview"
              width="80"
              className="mt-2 rounded"
            />
          )}
        </div>
      </div>
      <button type="submit" className="btn btn-success">Save Jewellery</button>
    </form>
  );
};

export default JewelleryForm;
