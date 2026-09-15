const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const roomRoutes = require('./roomRoutes');
const bookingRoutes = require('./bookingRoutes');
const foodOrderRoutes = require('./foodOrderRoutes');

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/food-orders', foodOrderRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Hotel Management API',
    time: new Date().toISOString()
  });
});

module.exports = router;

