const db = require('../models/taskModel');

const groupController = {};

groupController.getCards = (req, res, next) => {
  if (!req.params.groupId) return next({ log: 'groupController.getCards: no groupId in url' });
  if (!req.user.id) {
    // if user is not logged in, redirect to login
    res.redirect('/');
    return next({ log: 'groupController.getCards: user is not logged in' });
  }

  const query = `SELECT c.*, n.name as notebook_name, n.notebook_id, g.name as group_name, g.group_id
FROM user_groups ug
  LEFT JOIN groups g ON ug.group_id = g.group_id
  LEFT JOIN notebooks n ON n.group_id = g.group_id
  LEFT JOIN cards c ON c.notebook_id = n.notebook_id
WHERE ug.user_id = $1 AND ug.group_id = $2;`;
  const queryParams = [req.user.id, req.params.groupId];

  db.query(query, queryParams).then(({ rows }) => {
    res.locals.cards = rows;
    return next();
  });
};

module.exports = groupController;
