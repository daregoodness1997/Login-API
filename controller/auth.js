const passport = require('passport');
const User = require('../models/Users');

const loginUser = async (req, res) => {
  res.json({ msg: 'User Authenticated', user: req.user });
};

const googleLogin = async (req, res) => {
  passport.authenticate('google', { scope: ['email', 'profile'] });
};

const googleLoginSuccess = async (req, res) => {
  if (!req.user) {
    res.status(400).json({ msg: 'User Not Authenticated', user: null });
  }
  res.json({ msg: 'User Authenticated', user: req.user });
};

const googleCallback = async (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' });
  next();
};
const registerUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({ user });
};

const logoutUser = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  googleLogin,
  googleLoginSuccess,
};
