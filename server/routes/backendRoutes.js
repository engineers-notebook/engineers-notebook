const { Router } = require('express');
const express = require('express');
const backendController = require('../controller/backendController.js');
const router = express.Router();

router.get('/backend', backendController.getBackEnd, (req, res) =>
  res.status(200).json(res.locals.backEnd)
);

router.post('/backend', backendController.postBackend, (req, res, next) => {
  res.status(200).send('Posted Successful on Backend');
});

module.exports = router;
