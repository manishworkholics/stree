const mongoose = require("mongoose");

const lehengaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String }, // image filename or URL
  code: { type: String, required: true, unique: true },
  size: { type: String, required: true, enum: ["S", "M", "L", "XL"] },
  rentPrice: { type: Number, required: true },
  totalRented: { type: Number, default: 0 },
  totalReturned: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lehenga", lehengaSchema);
