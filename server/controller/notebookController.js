const db = require('../models/taskModel');

//get Notebook
const notebookController = {};
notebookController.getNotebooks = (req, res, next) => {
  const query = `SELECT n.name, n.notebook_id from notebooks n LEFT JOIN groups g ON n.group_id = g.group_id WHERE g.group_id = $1`;
  const queryParams = [1];
  db.query(query, queryParams).then((data) => {
    res.locals.notebooks = data.rows;
    next();
  });
};

module.exports = notebookController;