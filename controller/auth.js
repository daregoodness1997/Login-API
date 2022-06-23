const loginUser = async (req, res) => {
  res.json('User logged in');
};

const googleLogin = async (req, res) => {
  res.json('User logged in with Google');
};

const registerUser = async (req, res) => {
  res.send('User logged in');
};

module.exports = { loginUser, registerUser };
