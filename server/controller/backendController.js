const db = require('../models/taskModel');

const backendController = {};

backendController.getBackEnd = (req, res, next) => {
  const query = 'SELECT * FROM BackEnd';
  db.query(query).then((data) => {
    res.locals.backEnd = data.rows;
    next();
  });
};

backendController.getUser = (req, res, next) => {
  const user = req.params.username;
  const userQuery = `SELECT * FROM ${user} WHERE type='Backend'`;
  db.query(userQuery).then((user) => {
    res.locals.user = user.rows;
    next();
  });
};

backendController.postBackend = (req, res, next) => {
  console.log('Here!')
  const { title, description, resources, iscompleted, type, name } = req.body;
  const vals = [title, description, resources, iscompleted, type, name];
  const sqlQuery = `INSERT INTO ${name} (title, description, resources, iscompleted, type, name) VALUES ($1, $2, $3, $4, $5, $6)`;
  db.query(sqlQuery, vals).then((data) => {
    res.locals.newBackend = data;
    next();
  });
};

module.exports = backendController;
