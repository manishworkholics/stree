const Booking = require("../models/BookingModel");
const moment = require("moment");

// Create booking
// exports.createBooking = async (req, res) => {
//     try {
//         const bookingData = req.body;

//         // auto calculate due
//         bookingData.due = (bookingData.totalAmount || 0) - (bookingData.advance || 0);

//         const booking = new Booking(bookingData);
//         await booking.save();

//         res.status(201).json({
//             success: true,
//             message: "Booking created successfully",
//             data: booking,
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


exports.createBooking = async (req, res) => {
    try {
        const {
            customerName,
            mobileNumber,
            customerAddress,
            items,
            totalAmount,
            advance,
            remark
        } = req.body;

        // Auto-calc due
        const due = totalAmount - advance;

        const booking = new Booking({
            customerName,
            mobileNumber,
            customerAddress,
            items,
            totalAmount,
            advance,
            due,
            remark
        });

        await booking.save();
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};




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

exports.getMonthlyReport = async (req, res) => {
    try {
        const { month, year } = req.query;

        // default to current month/year
        const selectedMonth = month ? parseInt(month) : moment().month() + 1; // 1-12
        const selectedYear = year ? parseInt(year) : moment().year();

        // Pad month and build ISO string
        const monthStr = String(selectedMonth).padStart(2, "0");

        const startDate = moment(`${selectedYear}-${monthStr}-01`, "YYYY-MM-DD").startOf("month").toDate();
        const endDate = moment(startDate).endOf("month").toDate();

        // Fetch bookings for the month
        const bookings = await Booking.find({
            createdAt: { $gte: startDate, $lte: endDate }
        });

        // Prepare report
        let report = [];
        let counter = 1;

        bookings.forEach((booking) => {
            booking.items.forEach((item) => {
                report.push({
                    "S.No": counter++,
                    "Customer": booking.customerName,
                    "Item": item.name || "N/A",
                    "Date": moment(booking.createdAt).format("DD-MM-YYYY"),
                    "Dress Code": item.code || "N/A",
                    "Price": item.amount || 0
                });
            });
        });

        res.status(200).json({
            success: true,
            month: selectedMonth,
            year: selectedYear,
            report
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};