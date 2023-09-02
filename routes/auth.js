const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  loginUser,
  registerUser,
  logoutUser,
  googleCallback,
  googleLogin,
} = require("../controller/auth");
const { ensureGuest } = require("../middleware/authentication");

router.route("/login").get(ensureGuest, loginUser);
router.route("/register").post(registerUser);

// @desc Auth with Google
// @route GET /auth/google

router.route("/google").get(googleLogin);
router.route("/google/callback").get(googleCallback);

//@desc logout user
// @route /auth/logout

router.route("/logout").get(logoutUser);

module.exports = router;
