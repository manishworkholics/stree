const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  phone: { type: String, required: true },
  dress: { type: String },
  jewellery: { type: String },
  total: { type: Number, required: true },
  advance: { type: Number, default: 0 },
  due: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", billSchema);
