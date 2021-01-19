const { Router } = require('express');
const express = require('express');
const router = express.Router();

const signUpController = require('../controller/signUpController.js');

router.post('/signup', signUpController.signUp, (req, res) => {
  res.status(200).send('Successful sign up');
});

router.post('/login', signUpController.login, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = router;
