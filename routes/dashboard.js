const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authentication');

const { dashboard } = require('../controller/dashboard');

router.route('/').get(ensureAuth, dashboard);

module.exports = router;
