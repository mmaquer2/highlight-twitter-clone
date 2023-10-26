const { Pool } = require("pg");

/**
 * @param {string} connectionString
 */
const pool = new Pool({
  connectionString: process.env.DEV_DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


module.exports = pool;