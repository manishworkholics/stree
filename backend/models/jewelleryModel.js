const mongoose = require("mongoose");

const jewellerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  rentPrice: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  photo: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Jewellery", jewellerySchema);
