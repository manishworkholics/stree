const mongoose = require("mongoose");

// const dressSchema = new mongoose.Schema({
//     dressId: { type: mongoose.Schema.Types.ObjectId, ref: "Dress" },
//     dressCode: { type: String },
//     dressSize: { type: String },
//     price: { type: Number, default: 0 },
// });

// const jewellerySchema = new mongoose.Schema({
//     jewelleryId: { type: mongoose.Schema.Types.ObjectId, ref: "Jewellery" },
//     jewelleryCode: { type: String },
//     price: { type: Number, default: 0 },
// });

// const bookingSchema = new mongoose.Schema(
//     {
//         customerName: { type: String, required: true },
//         mobileNumber: { type: String, required: true },
//         address: { type: String },

//         category: { type: String }, // e.g. Wedding, Party, etc.
//         name: { type: String }, // sub-category or extra name

//         dresses: [dressSchema],
//         jewelleries: [jewellerySchema],

//         bookingDate: { type: Date, required: true },
//         returnDate: { type: Date, required: true },

//         totalAmount: { type: String, default: 0 },
//         advance: { type: String, default: 0 },
//         due: { type: String, default: 0 },

//         remarks: { type: String },
//     },
//     { timestamps: true }
// );



const itemSchema = new mongoose.Schema({
    category: { type: String, required: true }, // Jewellery / Dress / Lehenga
    code: { type: String },                     // Item code
    name: { type: String },                     // Item name
    size: { type: String },                     // For dresses
    quantity: { type: Number, default: 1 },     // How many items
    rate: { type: Number, default: 0 },         // Price per item
    amount: { type: Number, default: 0 },       // rate * quantity
    bookingDate: { type: Date },
    returnDate: { type: Date }
});

const bookingSchema = new mongoose.Schema(
    {
        customerName: { type: String, required: true },
        mobileNumber: { type: String, required: true },
        customerAddress: { type: String },

        items: [itemSchema],  // <-- All items (dresses / jewellery) in one array

        totalAmount: { type: Number, default: 0 },
        advance: { type: Number, default: 0 },
        due: { type: Number, default: 0 },

        remark: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
