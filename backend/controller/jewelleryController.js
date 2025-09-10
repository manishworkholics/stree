const Jewellery = require("../models/jewelleryModel");
const asyncHandler = require("express-async-handler");

exports.addJewellery = async (req, res) => {
  try {
    const { name, code, price, isAvailable } = req.body;

    const jewellery = new Jewellery({
      name,
      code,
      price,
      isAvailable,
      photo: req.file ? `uploads/jewellery/${req.file.filename}` : null,
    });

    await jewellery.save();
    res.status(201).json({ success: true, data: jewellery });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// exports.getJewellery = async (req, res) => {
//   try {
//     const jewelleries = await Jewellery.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: jewelleries });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

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
  const { id } = req.params;
  const updateData = req.body;

  const jewelleries= await Jewellery.findByIdAndUpdate(id, updateData, { new: true });
  res.json(jewelleries);
});

// Delete Lehenga
exports.deleteJewellery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Jewellery.findByIdAndDelete(id);
  res.json({ message: "Jewellery deleted" });
});