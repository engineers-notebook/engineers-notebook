const db = require('../models/taskModel');

const appConfigController = {};

appConfigController.getAppConfig = (req, res, next) => {
  const query = 'SELECT * FROM AppConfig';
  db.query(query).then((data) => {
    res.locals.appConfig = data.rows;
    next();
  });
};

appConfigController.postAppConfig = (req, res, next) => {
  const { title, description } = req.body;
  const vals = [title, description];
  const sqlQuery =
    'INSERT INTO Appconfig (id, title, description) VALUES ($1, $2)';
  db.query(sqlQuery, vals).then((data) => {
    res.locals.newAppConfig = data;
    next();
  });
};

module.exports = appConfigController;
