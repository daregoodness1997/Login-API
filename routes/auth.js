const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controller/auth');

router.route('/').get(loginUser);
router.route('/register').get(registerUser);

module.exports = router;
