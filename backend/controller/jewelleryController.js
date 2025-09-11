const Jewellery = require("../models/jewelleryModel");
const asyncHandler = require("express-async-handler");

exports.addJewellery = async (req, res) => {
  try {
    const { name, code, rentPrice, isAvailable, category } = req.body;

    const jewellery = new Jewellery({
      name,
      code,
      rentPrice,
      isAvailable,
      category,
      photo: req.file ? `uploads/jewellery/${req.file.filename}` : null,
    });

    await jewellery.save();
    res.status(201).json({ success: true, data: jewellery });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getJewellery = async (req, res) => {
  try {
    const jewelleries = await Jewellery.find().sort({ createdAt: -1 });

    // Build full URL for photo
    const host = `${req.protocol}://${req.get("host")}`;
    const data = jewelleries.map(j => ({
      ...j.toObject(),
      photo: j.photo ? `${host}/${j.photo}` : null
    }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Update Lehenga
exports.updateJewellery = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Build update object
    const updateData = {
      name: req.body.name,
      code: req.body.code,
      rentPrice: req.body.rentPrice,
      isAvailable: req.body.isAvailable,
    };

    // If new file uploaded, save new photo path
    if (req.file) {
      updateData.photo = `uploads/jewellery/${req.file.filename}`;
    }

    const updatedJewellery = await Jewellery.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedJewellery) {
      return res.status(404).json({ success: false, message: "Jewellery not found" });
    }

    res.json({ success: true, data: updatedJewellery });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Error updating jewellery" });
  }
});

// Delete Lehenga
exports.deleteJewellery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Jewellery.findByIdAndDelete(id);
  res.json({ message: "Jewellery deleted" });
});