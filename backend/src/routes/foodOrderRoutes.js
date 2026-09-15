const express = require('express');
const router = express.Router();
const foodOrderController = require('../controllers/foodOrderController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/menu', foodOrderController.getMenuItems);
router.post('/', foodOrderController.createFoodOrder);
router.get('/kitchen', verifyToken, foodOrderController.getKitchenOrders);
router.patch('/:id/status', verifyToken, foodOrderController.updateFoodOrderStatus);

module.exports = router;

