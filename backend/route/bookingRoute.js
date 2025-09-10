const express = require('express')
const router = express.Router()
const bookings = require('../controller/bookingController')





router.post('/generate', bookings.createBooking)
router.get('/', bookings.getAllBookings)
router.get('/:id', bookings.getBookingById)
router.put('/:id', bookings.updateBooking)
router.delete('/:id', bookings.deleteBooking)




module.exports = router