const { getCartItems, addItem, updateCartItem, deleteCartItem, clearCart } = require('../controllers/cartController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', protectRoute, getCartItems);

router.post('/add', protectRoute, addItem);

router.put('/update/:id', protectRoute, updateCartItem);

router.delete('/delete/:id', protectRoute, deleteCartItem);

router.delete('/clear', protectRoute, clearCart);

module.exports = router;