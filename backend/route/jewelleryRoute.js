const express = require('express')
const { addJewellery, getJewellery, updateJewellery, deleteJewellery } = require('../controller/jewelleryController')
const upload = require("../middleware/upload");
const jewelleries = express.Router()





jewelleries.post('/add-jewellery', upload.single("photo"), addJewellery)
jewelleries.get('/get-jewellery', getJewellery)

// Update Lehenga
jewelleries.put("/update-jewellery/:id", updateJewellery);

// Delete Lehenga
jewelleries.delete("/delete-jewellery/:id", deleteJewellery);




module.exports = jewelleries