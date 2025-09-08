const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // your multer config
const lehengaController = require("../controller/lehengaController");

// Add Lehenga (with photo upload)
router.post("/add", upload.single("photo"), lehengaController.addLehenga);

// Get all Lehengas
router.get("/", lehengaController.getLehengas);

// Update Lehenga
router.put("/:id", lehengaController.updateLehenga);

// Delete Lehenga
router.delete("/:id", lehengaController.deleteLehenga);

module.exports = router;
