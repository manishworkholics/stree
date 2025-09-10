const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.post("/add", customerController.addCustomer);
router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
