const { Router } = require('express');
const express = require('express');
const frontendController = require('../controller/frontendController.js');
const router = express.Router();

router.get('/frontend', frontendController.getFrontEnd, (req, res) =>
  res.status(200).json(res.locals.frontEnd)
);

router.post('/frontend', frontendController.postFrontend, (req, res, next) => {
  res.status(200).send('Posted Successful on Frontend');
});
module.exports = router;
