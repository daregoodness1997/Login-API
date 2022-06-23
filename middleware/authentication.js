const ensureAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/api/v1/auth/google');
  }
};

const ensureGuest = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/api/v1/dashboard');
  } else {
    return next();
  }
};

module.exports = { ensureGuest, ensureAuth };
