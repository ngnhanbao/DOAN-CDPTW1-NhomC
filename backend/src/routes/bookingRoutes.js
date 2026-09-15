const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', bookingController.createBooking);
router.get('/', verifyToken, bookingController.getBookings);
router.post('/checkin', verifyToken, bookingController.checkIn);
router.post('/checkout', verifyToken, bookingController.checkOut);

module.exports = router;

