const { Router } = require('express');
const express = require('express');
const appConfigController = require('../controller/appConfigController.js');
const router = express.Router();

router.get('/AppConfig', appConfigController.getAppConfig, (req, res) =>
  res.status(200).json(res.locals.appConfig)
);

router.post(
  '/AppConfig',
  appConfigController.postAppConfig,
  (req, res, next) => {
    res.status(200).send('Posted Successful on App Config');
  }
);

module.exports = router;
