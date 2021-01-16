const db = require('../models/taskModel');

const backendController = {};

backendController.getBackEnd = (req, res, next) => {
  const query = 'SELECT * FROM BackEnd';
  db.query(query).then((data) => {
    res.locals.backEnd = data.rows;
    next();
  });
};

backendController.postBackend = (req, res, next) => {
  const { id, title, description, resources, iscompleted } = req.body;
  const vals = [id, title, description, resources, iscompleted];
  const sqlQuery =
    'INSERT INTO Backend (id, title, description, resources, iscompleted) VALUES ($1, $2, $3, $4, $5)';
  db.query(sqlQuery, vals).then((data) => {
    res.locals.newBackend = data;
    next();
  });
};

module.exports = backendController;
