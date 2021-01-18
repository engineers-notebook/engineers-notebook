const db = require('../models/taskModel');

const webpackController = {};

webpackController.getWepack = (req, res, next) => {
  const query = 'SELECT * FROM Webpack';
  db.query(query).then((data) => {
    res.locals.webpack = data.rows;
    next();
  });
};

webpackController.postWebpack = (req, res, next) => {
  const { cookieName, title, description, resources, iscompleted, type } = req.body;
  const vals = [title, description, resources, iscompleted, type];
  const sqlQuery =
    `INSERT INTO ${cookieName} (title, description, resources, iscompleted, type) VALUES ($1, $2, $3, $4, $5)`;
  db.query(sqlQuery, vals).then((data) => {
    res.locals.newWebpack = data;
    next();
  });
};

module.exports = webpackController;
