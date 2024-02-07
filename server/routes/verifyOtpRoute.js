const { verifyOtp } = require('../controllers/otpController');

const router = require('express').Router();

router.post('/verify', verifyOtp);

module.exports = router;