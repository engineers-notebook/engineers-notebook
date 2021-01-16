const db = require('../models/taskModel');

const frontendController = {};

frontendController.getFrontEnd = (req, res, next) => {
  const query = 'SELECT * FROM frontend';
  db.query(query).then((data) => {
    res.locals.frontEnd = data.rows;
    next();
  });
};

frontendController.postFrontend = (req, res, next) => {
  const { title, description, resources, iscompleted } = req.body;
  const vals = [title, description, resources, iscompleted];
  const sqlQuery =
    'INSERT INTO Frontend (title, description, resources, iscompleted) VALUES ($1, $2, $3, $4)';
  db.query(sqlQuery, vals).then((data) => {
    res.locals.newFrontend = data;
    next();
  });
};

module.exports = frontendController;
