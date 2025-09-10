const mongoose = require('mongoose')


const customerSchema = new mongoose.Schema({
    name: { type: String },
    mobile: { type: String },
    adress: { type: String },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Customer", customerSchema)
