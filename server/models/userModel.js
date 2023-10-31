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
 * =========== Follower User Routes and Operations ==============
 * Below are the routes for the followers table and operations
 *
 *
 */

/**
 *
 * @param {number} user_id
 */

//TODO:
const getAllFollowersByUser = async (user_id) => {
  const client = req.app.locals.redisClient;

  try {
  } catch (err) {}
};

/**
 * creates a connetion between the loggined in user and teh user they are following
 * @param {string} user_id
 * @param {string} follower_id
 */
const createNewFollower = async (user_id, follower_id) => {
  console.log("creating new follower...");

  //TODO:
};

//TODO:
const unFollowUser = async (user_id, follower_id) => {
  console.log("unfollowing user...");
};

module.exports = {
  createUser,
  findUserByUsername,
  createNewFollower,
  getAllFollowersByUser,
};
