const Bill = require("../models/BillModel");
const asyncHandler = require("express-async-handler");

// Get Monthly Report
exports.getMonthlyReport = asyncHandler(async (req, res) => {
  const { month, year } = req.query; // e.g. ?month=8&year=2025

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const bills = await Bill.find({
    createdAt: { $gte: startDate, $lte: endDate }
  });

  const totalBookings = bills.length;
  const totalRevenue = bills.reduce((sum, bill) => sum + bill.total, 0);

  res.json({ totalBookings, totalRevenue, bills });
});
