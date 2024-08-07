
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verify } = require('../middlewares/auth');

router.get('/login', adminController.getLoginPage);
router.get('/signup', adminController.getSignupPage);
router.post('/login', adminController.login);
router.post('/signup', adminController.signup);
router.get('/protected', verify, adminController.protectedRoute);

module.exports = router;
