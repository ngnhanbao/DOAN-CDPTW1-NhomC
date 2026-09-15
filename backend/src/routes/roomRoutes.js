const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Public routes cho Cổng khách hàng (Guest Portal)
router.get('/types', roomController.getRoomTypes);

// Quản trị buồng phòng & Lễ tân
router.get('/', verifyToken, roomController.getRooms);
router.patch('/:id/status', verifyToken, roomController.updateRoomStatus);

module.exports = router;

