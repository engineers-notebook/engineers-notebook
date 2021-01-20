const db = require('../models/taskModel');

const cardController = {};
cardController.postCard = (req, res, next) => {
  const { notebook_id, title, description, resources, status } = req.body;
  const query = `INSERT INTO cards (notebook_id, title, description, resources, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`
  const vals = [notebook_id, title, description, resources, status];
  db.query(query, vals).then((data) => {
    res.locals.newCard = data.rows[0];
    next();
  })
};

module.exports = cardController;