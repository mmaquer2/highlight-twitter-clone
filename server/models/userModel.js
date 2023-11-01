const pool = require("../db");

/**
 * function to create a new user in the database
 * @param {object} user (username,email,password)
 * @returns
 */
const createUser = async (user) => {
  console.log("creating new user...");
  const { username, email, password } = user;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password],
    );
    return newUser.rows[0];
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

/**
 * looks up a user by their username
 * @param {string} username
 * @returns user object || null
 */

const findUserByUsername = async (username) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      console.log("could not find user");
      return null;
    }

    return user.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * looks up a user by their username
 * @param {string} username
 * @returns user object || null
 */

const findUserByUserID = async (user_id) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      user_id,
    ]);

    if (user.rows.length === 0) {
      console.log("could not find user");
      return null;
    }

    return user.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserByUserID,
};
