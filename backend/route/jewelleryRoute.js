const express = require('express')
const { addJewellery, getJewellery } = require('../controller/jewelleryController')
const upload = require("../middleware/upload");
const jewelleries = express.Router()





jewelleries.post('/add-jewellery', upload.single("photo"), addJewellery)
jewelleries.get('/get-jewellery', getJewellery)




module.exports = jewelleries