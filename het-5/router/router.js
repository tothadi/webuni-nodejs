const express = require('express');
const router = express.Router();
const increaseMW = require('./increase');
const resetMW = require('./reset');

router.get('/increase', increaseMW());
router.get('/reset', resetMW());

module.exports = router;