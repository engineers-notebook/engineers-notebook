const db = require('../models/taskModel');

const userController = {};

userController.getGroups = (req, res, next) => {
  const query = `SELECT g.name, g.group_id FROM groups g LEFT JOIN user_groups ug ON g.group_id = ug.group_id WHERE ug.user_id = $1`;
  const queryParams = [req.user.id];

  console.log('user: ',req.user.id)

  db.query(query, queryParams).then((data) => {
    console.log('rows', data.rows);
    res.locals.userGroups = data.rows;
    next();
  });
};

module.exports = userController;