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



// notebookController.postNotebook = (req, res, next) => {
//   const { notebook_id, group_id, name } = req.body;
//   const query  = `INSERT INTO notebooks n (notebook_id, title, description, resources, status) VALUES ($1,$2,$3) RETURNING *`
//   const vals = [notebook_id, group_id, name ];
//   db.query (query,vals) .then(() => {
//     res.locals.newNotebook = data.rows;
//     next();
//   })
// }



module.exports = notebookController;