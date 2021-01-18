const db = require('../models/taskModel');

const signUpController = {};


signUpController.signUp = (req, res, next) => {
  res.cookie('name', req.body.name);
  // create a table with the cookie
  const values = [req.body.name, req.body.password]
  const createQuery = `
    CREATE TABLE ${req.body.name} 
    (
      "id" serial NOT NULL,
      "name" varchar,
      "password" varchar,
      "type" varchar,
      "title" varchar,
      "description" varchar,
      "resources" varchar,
      "iscompleted" boolean
    )`
  const insertQuery = `INSERT INTO Login ("username", "password") VALUES ($1, $2)`

  
  db.query(createQuery)
  .then(data => {
    db.query(insertQuery, values).then((data) => {
      next();
    })
  })
};

module.exports = signUpController;
