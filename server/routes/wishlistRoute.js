const { getWishlistItems, addItem, deleteWishlistItem, clearWishlist } = require('../controllers/wishlistController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', protectRoute, getWishlistItems);

router.post('/add', protectRoute, addItem);

router.delete('/delete/:id', protectRoute, deleteWishlistItem);

router.delete('/clear', protectRoute, clearWishlist);

module.exports = router;