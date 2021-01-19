const { Router } = require('express');
const express = require('express');
const backendController = require('../controller/backendController.js');
const router = express.Router();

router.get(
  '/Backend/:username',
  backendController.getBackEnd,
  backendController.getUser,
  (req, res) => res.status(200).json([res.locals.backEnd, res.locals.user])
);

router.post('/Backend', backendController.postBackend, (req, res, next) => {
  res.status(200).send('Posted Successful on Backend');
});

module.exports = router;
