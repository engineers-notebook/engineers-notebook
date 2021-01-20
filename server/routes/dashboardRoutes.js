const { Router } = require('express');
const express = require('express');
const dashboardController = require('../controller/dashboardController.js');
const router = express.Router();

router.get('/getCookie', dashboardController.getCookie, (req, res) => {
  res.status(200).json(res.locals.cookie);
});

module.exports = router;
