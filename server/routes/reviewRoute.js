const { addReview, getAllReviews, getSellerReviews } = require('../controllers/reviewController');
const { protectRoute, protectSellerRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/:id/add', protectRoute, addReview);

router.post('/:id/all', getAllReviews);

router.post('/:id/product-reviews', protectSellerRoute, getSellerReviews);

module.exports = router;