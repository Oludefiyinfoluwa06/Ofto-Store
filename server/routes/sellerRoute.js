const { register, login, getProfile, updateProfile, deleteProfile } = require('../controllers/sellerController');
const { protectSellerRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/register', register);

router.post('/otp/email-verification', getOtp);

router.post('/otp/password-reset', getOtpToResetPassword);

router.put('/password/reset', resetPassword);

router.post('/login', login);

router.get('/profile', protectSellerRoute, getProfile);

router.put('/profile', protectSellerRoute, updateProfile);

router.delete('/profile', protectSellerRoute, deleteProfile);

module.exports = router;