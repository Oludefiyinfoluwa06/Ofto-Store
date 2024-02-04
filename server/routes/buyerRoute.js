const { register, login, getProfile, updateProfile, deleteProfile } = require('../controllers/BuyerController');
const { protectRoute } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', protectRoute, getProfile);

router.put('/profile', protectRoute, updateProfile);

router.delete('/profile', protectRoute, deleteProfile);

module.exports = router;