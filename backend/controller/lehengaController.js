const Lehenga = require("../models/LehengaModel");
const asyncHandler = require("express-async-handler");

// Add New Lehenga
exports.addLehenga = asyncHandler(async (req, res) => {
  const { name, code, size, rentPrice } = req.body;
  const photo = req.file ? `uploads/jewellery/${req.file.filename}` : null;

  const lehenga = new Lehenga({ name, code, size, rentPrice, photo });
  await lehenga.save();
  res.status(201).json({ message: "Lehenga added successfully", lehenga });
});

// Get Lehenga List
exports.getLehengas = asyncHandler(async (req, res) => {
  try {
    const lehengas = await Lehenga.find().sort({ createdAt: -1 });
    const host = `${req.protocol}://${req.get("host")}`;
    const data = lehengas.map(j => ({
      ...j.toObject(),
      photo: j.photo ? `${host}/${j.photo}` : null
    }));
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update Lehenga
exports.updateLehenga = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const lehenga = await Lehenga.findByIdAndUpdate(id, updateData, { new: true });
  res.json(lehenga);
});

// Delete Lehenga
exports.deleteLehenga = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Lehenga.findByIdAndDelete(id);
  res.json({ message: "Lehenga deleted" });
});
