const passport = require("passport");
const User = require("../models/Users");

const loginUser = async (req, res) => {
  res.json("User logged in");
};

const googleLogin = async (req, res) => {
  passport.authenticate("google", { scope: ["profile"] });
};

const googleCallback = async (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
    function (req, res) {
      res.redirect("/api/v1/dashboard");
    };
};
const registerUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({ user });
};

const logoutUser = async (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  googleLogin,
  googleCallback,
};
