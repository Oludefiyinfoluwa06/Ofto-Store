const { register, login, getProfile, updateProfile, deleteProfile } = require('../controllers/sellerController');
const { protectSellerRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', protectSellerRoute, getProfile);

router.put('/profile', protectSellerRoute, updateProfile);

router.delete('/profile', protectSellerRoute, deleteProfile);

module.exports = router;