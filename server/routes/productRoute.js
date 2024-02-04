const { allProducts, sellerProducts, addProducts, productDetails } = require('../controllers/productController');
const { protectSellerRoute, protectRoute } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/productMiddleware');

const router = require('express').Router();

router.get('/all', protectRoute, allProducts);

router.get('/:id', protectRoute, productDetails);

router.get('/seller', protectSellerRoute, sellerProducts);

router.post('/create', protectSellerRoute, upload.single('productImage'), addProducts);

module.exports = router;