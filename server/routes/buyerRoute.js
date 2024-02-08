const { register, login, getProfile, updateProfile, deleteProfile, getOtp, getOtpToResetPassword } = require('../controllers/buyerController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/register', register);

router.post('/otp/email-verification', getOtp);

router.post('/otp/password-reset', getOtpToResetPassword);

router.put('/password/reset', resetPassword);

router.post('/login', login);

router.get('/profile', protectRoute, getProfile);

router.put('/profile', protectRoute, updateProfile);

router.delete('/profile', protectRoute, deleteProfile);

module.exports = router;