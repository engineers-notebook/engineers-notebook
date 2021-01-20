const { Router } = require('express');
const express = require('express');
const frontendController = require('../controller/frontendController.js');
const router = express.Router();

router.get(
  '/Frontend/:username',
  frontendController.getFrontEnd,
  frontendController.getUser,
  (req, res) => res.status(200).json([res.locals.frontEnd, res.locals.user])
);

router.post('/Frontend', frontendController.postFrontend, (req, res, next) => {
  res.status(200).send('Posted Successful on Frontend');
});
module.exports = router;
