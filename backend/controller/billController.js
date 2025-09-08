const Bill = require("../models/BillModel");
const asyncHandler = require("express-async-handler");

// Generate Bill
exports.generateBill = asyncHandler(async (req, res) => {
  const { customer, phone, dress, jewellery, total, advance } = req.body;
  const due = total - advance;

  const bill = new Bill({ customer, phone, dress, jewellery, total, advance, due });
  await bill.save();

  res.status(201).json({ message: "Bill generated successfully", bill });
});

// Get All Bills
exports.getBills = asyncHandler(async (req, res) => {
  const bills = await Bill.find().sort({ createdAt: -1 });
  res.json(bills);
});

// Get Single Bill
exports.getBillById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bill = await Bill.findById(id);
  if (!bill) {
    res.status(404);
    throw new Error("Bill not found");
  }
  res.json(bill);
});

// Delete Bill
exports.deleteBill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Bill.findByIdAndDelete(id);
  res.json({ message: "Bill deleted" });
});
