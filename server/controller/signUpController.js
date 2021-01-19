const db = require('../models/taskModel');

const signUpController = {};

signUpController.signUp = (req, res, next) => {
  res.cookie('name', req.body.name);
  // create a table with the cookie
  const values = [req.body.name, req.body.password];
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
    )`;
  const insertQuery = `INSERT INTO Login ("username", "password") VALUES ($1, $2)`;

  db.query(createQuery).then((data) => {
    db.query(insertQuery, values).then((data) => {
      next();
    });
  });
};

signUpController.login = (req, res, next) => {
  res.cookie('username', req.body.name);
  // const values = [req.body.name, req.body.password];
  const sqlQuery = `SELECT * FROM Login WHERE username = '${req.body.name}' AND password = '${req.body.password}'`;
  db.query(sqlQuery)
    .then((data) => {
      res.locals.user = data.rows[0].username;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/login');
    });
};

module.exports = signUpController;
