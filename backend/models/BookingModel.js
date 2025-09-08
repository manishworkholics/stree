const mongoose = require("mongoose");

const dressSchema = new mongoose.Schema({
    dressId: { type: mongoose.Schema.Types.ObjectId, ref: "Dress" },
    dressCode: { type: String },
    dressSize: { type: String },
    price: { type: Number, default: 0 },
});

const jewellerySchema = new mongoose.Schema({
    jewelleryId: { type: mongoose.Schema.Types.ObjectId, ref: "Jewellery" },
    jewelleryCode: { type: String },
    price: { type: Number, default: 0 },
});

const bookingSchema = new mongoose.Schema(
    {
        customerName: { type: String, required: true },
        mobileNumber: { type: String, required: true },
        address: { type: String },

        category: { type: String }, // e.g. Wedding, Party, etc.
        name: { type: String }, // sub-category or extra name

        dresses: [dressSchema],
        jewelleries: [jewellerySchema],

        bookingDate: { type: Date, required: true },
        returnDate: { type: Date, required: true },

        totalAmount: { type: String, default: 0 },
        advance: { type: String, default: 0 },
        due: { type: String, default: 0 },

        remarks: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
