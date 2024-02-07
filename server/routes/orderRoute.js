const { createOrder, getBuyerOrder, getSellerOrder } = require('../controllers/orderController');
const { protectRoute, protectSellerRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/create', protectRoute, createOrder);

router.get('/buyer/all', protectRoute, getBuyerOrder);

router.get('seller/all', protectSellerRoute, getSellerOrder);

module.exports = router;