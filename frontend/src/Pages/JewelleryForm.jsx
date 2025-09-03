import React, { useState } from "react";
import { toast } from "react-toastify";

const JewelleryForm = ({ setJewelleryList }) => {
  const [name, setName] = useState("");
  const [jewelleryCode, setJewelleryCode] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [photo, setPhoto] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      toast.error("Please fill all required fields!");
      return;
    }

    const newJewellery = {
      id: Date.now(),
      name,
      jewelleryCode,
      price,
      availability,
      photo: photo || "https://via.placeholder.com/80",
    };

    setJewelleryList((prev) => [...prev, newJewellery]);
    toast.success("Jewellery added successfully!");

    setName("");
    setPrice("");
    setAvailability("Available");
    setPhoto("");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {photo && <img src={photo} alt="preview" width="80" className="mt-2 rounded" />}
        </div>
      </div>
      <button type="submit" className="btn btn-success">Save Jewellery</button>
    </form>
  );
};

export default JewelleryForm;
