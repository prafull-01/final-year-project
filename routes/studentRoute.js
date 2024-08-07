
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verify } = require('../middlewares/auth');

router.get('/login', studentController.getLoginPage);
router.get('/signup', studentController.getSignupPage);
router.post('/login', studentController.login);
router.post('/signup', studentController.signup);
router.get('/protected', verify, studentController.protectedRoute);

module.exports = router;
