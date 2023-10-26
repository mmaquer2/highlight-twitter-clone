const pool = require("../db");

const createUser = async (user) => {
  const { username, email, password } = user;
  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    return newUser.rows[0];
  } catch (err) {
    return err.message;
  }
};

const findUserByUsername = async (username) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      // if the user does not exist, return null
      return null;
    }

    return user.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

const loginUsers = async (user) => {
  console.log("trying to login user in database and application");

  try {
  } catch (err) {
    console.log("From Server: Could Not Login User");
    console.error(err.message);
  }
};

module.exports = {
  createUser,
  findUserByUsername,
};
