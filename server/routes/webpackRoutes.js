const { Router } = require('express');
const express = require('express');
const webpackController = require('../controller/webpackController.js');
const router = express.Router();

router.get(
  '/Webpack/:username',
  webpackController.getWepack,
  webpackController.getUser,
  (req, res) => res.status(200).json([res.locals.webpack, res.locals.user])
);

router.post('/Webpack', webpackController.postWebpack, (req, res, next) => {
  res.status(200).send('Posted Successful on Webpack');
});

module.exports = router;
