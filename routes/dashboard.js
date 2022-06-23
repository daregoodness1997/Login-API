const express = require('express');
const router = express.Router();

const { dashboard } = require('../controller/dashboard');

router.route('/').get(dashboard);

module.exports = router;
