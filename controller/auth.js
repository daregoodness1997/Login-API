const passport = require('passport');
const loginUser = async (req, res) => {
  res.json('User logged in');
};

const googleLogin = async (req, res) => {
  passport.authenticate('google', { scope: ['profile'] });
};

const googleCallback = async (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' });
  next();
};
const registerUser = async (req, res) => {
  res.send('User logged in');
};

const logoutUser = async (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = { loginUser, logoutUser, registerUser, googleLogin };
