const express = require('express')
const upload = require("../middleware/upload");
const router = express.Router()
const jewelleries = require('../controller/jewelleryController')





router.post('/add-jewellery', upload.single("photo"), jewelleries.addJewellery)
router.get('/get-jewellery', jewelleries.getJewellery)

// Update Lehenga

router.put("/update-jewellery/:id", upload.single("photo"), jewelleries.updateJewellery);

// Delete Lehenga
router.delete("/delete-jewellery/:id", jewelleries.deleteJewellery);




module.exports = router