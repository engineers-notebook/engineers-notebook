const { Pool } = require('pg');

const pg_uri =
  'postgres://lxxozvls:aUwFdSeTd67p3Z5ldGqG-vcJV9PNVz1q@lallah.db.elephantsql.com:5432/lxxozvls';

const pool = new Pool({
  connectionString: pg_uri,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
