const dashboard = async (req, res) => {
  if (!req.user) {
    res.status(400).json({ msg: 'User Not Authenticated', user: null });
  }
  res.json({ msg: 'User Authenticated', user: req.user });
  res.send('Dashboard');
};

module.exports = { dashboard };
