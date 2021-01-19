const db = require('../models/taskModel');

const webpackController = {};

webpackController.getWepack = (req, res, next) => {
  const webpackQuery = `SELECT * FROM Webpack`;
  db.query(webpackQuery).then((data) => {
    res.locals.webpack = data.rows;
    next();
  });
};
webpackController.getUser = (req, res, next) => {
  const user = req.params.username;
  const userQuery = `SELECT * FROM ${user} WHERE type='Webpack'`;
  db.query(userQuery).then((user) => {
    res.locals.user = user.rows;
    next();
  });
};

webpackController.postWebpack = (req, res, next) => {
  const { title, description, resources, iscompleted, type, name } = req.body;
  const vals = [title, description, resources, iscompleted, type, name];
  const sqlQuery = `INSERT INTO ${name} (title, description, resources, iscompleted, type, name) VALUES ($1, $2, $3, $4, $5, $6)`;
  db.query(sqlQuery, vals).then((data) => {
    res.locals.newWebpack = data;
    next();
  });
};

module.exports = webpackController;
