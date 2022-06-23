const loginUser = async (req, res) => {
  res.json('User logged in');
};

const googleLogin = async (req, res) => {
  res.json('User logged in with Google');
};

const googleCallback = async (req, res) => {};
const registerUser = async (req, res) => {
  res.send('User logged in');
};

const logoutUser = async (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = { loginUser, logoutUser, registerUser };
