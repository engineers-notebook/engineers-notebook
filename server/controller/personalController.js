const db = require('../models/taskModel');

const personalController = {};

personalController.getPersonal = (req, res, next) => {
  const query = 'SELECT * FROM Personal';
  db.query(query).then((data) => {
    res.locals.personal = data.rows;
    next();
  });
};

personalController.postPersonal = (req, res, next) => {
  const {title, description } = req.body;
  const vals = [id, title, description];
  const sqlQuery =
    'INSERT INTO Webpack (title, description) VALUES ($1, $2)';
  db.query(sqlQuery, vals).then((data) => {
    res.locals.newPersonal = data;
    next();
  });
};

module.exports = personalController;
