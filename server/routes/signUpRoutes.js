const { Router } = require('express');
const express = require('express');
const personalController = require('../controller/personalController.js');
const router = express.Router();

const signUpController = require('../controller/signUpController.js')

router.post('/signup', signUpController.signUp, (req, res) => {
  res.status(200).send("Successful sign up")
})

router.post('/login', signUpController.login)

module.exports = router;