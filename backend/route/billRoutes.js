const express = require("express");
const router = express.Router();
const billController = require("../controller/billController");

// Generate Bill
router.post("/generate", billController.generateBill);

// Get all Bills
router.get("/", billController.getBills);

// Get Bill by ID
router.get("/:id", billController.getBillById);

// Delete Bill
router.delete("/:id", billController.deleteBill);

module.exports = router;
