import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE = "http://206.189.130.102:4545/api/jewelleries";

const JewelleryForm = ({ fetchJewelleryList }) => {
  const [name, setName] = useState("");
  const [jewelleryCode, setJewelleryCode] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("true"); // backend expects boolean string
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !jewelleryCode) {
      toast.error("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", jewelleryCode);
    formData.append("rentPrice", price);
    formData.append("category", "68c13ec4bb96998e91450cca");
    formData.append("isAvailable", availability); // "true" or "false"
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/add-jewellery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success("Jewellery added successfully!");
        fetchJewelleryList(); // refresh list after adding
        setName("");
        setJewelleryCode("");
        setPrice("");
        setAvailability("true");
        setPhoto(null);
        setPreview("");
      } else {
        toast.error(res.data?.message || "Failed to add jewellery");
      }
    } catch (error) {
      console.error("Error adding jewellery:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
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
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <div className="col-12 col-lg-4 singel__input-field mb-15">
          <label className="input__field-text">Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {preview && (
            <img
              src={preview}
              alt="preview"
              width="80"
              className="mt-2 rounded"
            />
          )}
        </div>
      </div>
      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Saving..." : "Save Jewellery"}
      </button>
    </form>
  );
};

export default JewelleryForm;
