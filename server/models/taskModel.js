const { Pool } = require('pg');
const { pg_uri } = require('../settings');

const pool = new Pool({
  connectionString: pg_uri,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
