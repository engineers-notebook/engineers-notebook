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
  const { id, title, description, resources, iscompleted } = req.body;
  const vals = [id, title, description, resources, iscompleted];
  const sqlQuery =
    'INSERT INTO Webpack (id, title, description, resources, iscompleted) VALUES ($1, $2, $3, $4, $5)';
  db.query(sqlQuery, vals).then((data) => {
    res.locals.newWebpack = data;
    next();
  });
};

module.exports = webpackController;
