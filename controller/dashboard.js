const dashboard = async (req, res) => {
  res.send(`Welcome ${req.user.email}`);
};

module.exports = { dashboard };
