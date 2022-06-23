const express = require('express');
const router = express.Router();
const passport = require('passport');
const { loginUser, registerUser } = require('../controller/auth');

router.route('/login').get(loginUser);
router.route('/register').get(registerUser);

// @desc Auth with Google
// @route GET /auth/google

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile'] }));
router
  .route('/google/callback')
  .get(
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/api/v1/dashboard');
    }
  );

module.exports = router;
