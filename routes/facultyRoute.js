const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const { verify } = require('../middlewares/auth');

router.get('/login', facultyController.getLoginPage);
router.get('/signup', facultyController.getSignupPage);
router.post('/login', facultyController.login);
router.post('/signup', facultyController.signup);
router.get('/protected', verify, facultyController.protectedRoute);

module.exports = router;
