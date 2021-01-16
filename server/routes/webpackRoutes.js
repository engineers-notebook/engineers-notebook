const { Router } = require('express');
const express = require('express');
const webpackController = require('../controller/webpackController.js');
const router = express.Router();

router.get('/webpack', webpackController.getWepack, (req, res) =>
  res.status(200).json(res.locals.webpack)
);

router.post('/webpack', webpackController.postWebpack, (req, res, next) => {
  res.status(200).send('Posted Successful on Webpack');
});

module.exports = router;
