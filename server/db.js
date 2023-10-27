const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:1220105Maq!9bz@db.khqsigzoysrpnljdzvsi.supabase.co:5432/postgres",
});

module.exports = pool;