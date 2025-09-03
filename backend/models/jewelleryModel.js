const mongoose = require('mongoose');



const jewellerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String },
    pricePerDay: { type: Number, required: true },  
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});



const jewellery = mongoose.model('jewellery',jewellerySchema);
module.exports = jewellery