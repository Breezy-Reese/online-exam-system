const express = require('express');
const { register, login, forgotPassword, googleAuth, googleAuthCallback, facebookAuth, facebookAuthCallback, oauthSuccess } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, oauthSuccess);
router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookAuthCallback, oauthSuccess);

module.exports = router;
