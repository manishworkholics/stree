const Jewellery = require("../models/jewelleryModel");

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
