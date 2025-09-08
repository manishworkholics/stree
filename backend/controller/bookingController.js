const Booking = require("../models/BookingModel");


// Create booking
exports.createBooking = async (req, res) => {
    try {
        const bookingData = req.body;

        // auto calculate due
        bookingData.due = (bookingData.totalAmount || 0) - (bookingData.advance || 0);

        const booking = new Booking(bookingData);
        await booking.save();

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update booking
exports.updateBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        bookingData.due = (bookingData.totalAmount || 0) - (bookingData.advance || 0);

        const booking = await Booking.findByIdAndUpdate(req.params.id, bookingData, { new: true });

        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

        res.status(200).json({ success: true, message: "Booking updated", data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

        res.status(200).json({ success: true, message: "Booking deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
