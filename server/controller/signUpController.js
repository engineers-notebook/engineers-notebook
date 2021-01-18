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

signUpController.login = (req, res, next) => {
  res.cookie('username', req.body.name);
  const values = [req.body.username, req.body.values]
  const sqlQuery = `SELECT username, password FROM Login WHERE username = $1 AND password = $2`
  db.query(sqlQuery, values).then((data) => {
    console.log(data)
    res.redirect('/dashboard');
  })
  .catch((err) => {
    console.log(err);
    res.redirect('/login')
  })
}

module.exports = signUpController;
