const express = require('express')
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require('../controller/bookingController')
const bookings = express.Router()





bookings.post('/generate', createBooking)
bookings.get('/', getAllBookings)
bookings.get('/:id', getBookingById)
bookings.put('/:id', updateBooking)
bookings.delete('/:id', deleteBooking)




module.exports = bookings