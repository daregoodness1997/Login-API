const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  loginUser,
  registerUser,
  logoutUser,
  googleLoginSuccess,
} = require('../controller/auth');
const { ensureGuest } = require('../middleware/authentication');

router.route('/login').get(ensureGuest, loginUser);
router.route('/login/success').get(googleLoginSuccess);

router.route('/register').post(registerUser);

// @desc Auth with Google
// @route GET /auth/google

router
  .route('/google')
  .get(
    passport.authenticate('google', { scope: ['openid ', 'email', 'profile'] })
  );

router.route('/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: '/',
    // successRedirect: '/dashboard',
  }),
  async (req, res) => {
    res.redirect('http://localhost:3000/dashboard');

    res.status(200).json(req.user).then();
  }
);

//@desc logout user
// @route /auth/logout

router.route('/logout').get(logoutUser);

module.exports = router;
