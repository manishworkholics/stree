const express = require('express')
const { addjewellery, getjewellery } = require('../controller/jewelleryController')
const jewelleries = express.Router()





jewelleries.post('/add-jewellery', addjewellery)
jewelleries.get('/get-jewellery', getjewellery)




module.exports = jewelleries