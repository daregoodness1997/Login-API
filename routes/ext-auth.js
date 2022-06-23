const express = require('express');
const router = express.Router();

// @desc Auth with Google
// @route GET /auth/google

router.route('/google').get(loginUser);
router.route('/register').get(registerUser);

module.exports = router;
