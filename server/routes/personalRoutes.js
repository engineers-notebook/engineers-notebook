const { Router } = require('express');
const express = require('express');
const personalController = require('../controller/personalController.js');
const router = express.Router();

router.get('/personal', personalController.getPersonal, (req, res) =>
  res.status(200).json(res.locals.personal)
);

router.post('/personal', personalController.postPersonal, (req, res, next) => {
  res.status(200).send('Posted Successful on Personal');
});

module.exports = router;
