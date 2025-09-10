const express = require("express");
const { signup, login, deleteAdmin } = require("../controller/adminController");
const protect = require("../middleware/adminMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete", deleteAdmin);

// Protected route example
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Admin profile accessed", admin: req.admin });
});

module.exports = router;
