const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");

// Get Monthly Report (query params: ?month=8&year=2025)
router.get("/monthly", reportController.getMonthlyReport);

module.exports = router;
