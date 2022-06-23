const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controller/auth');

router.route('/login').get(loginUser);
router.route('/register').get(registerUser);

module.exports = router;
