const pool = require("../db");

/**
 * Get all followers for a given user
 * @param {number} user_id
 */

const getAllFollowersByUser = async (user_id) => {
  try {
    const followers = await pool.query(
      "SELECT * FROM followers WHERE followee_id = $1 OR follower_id = $1",
      [user_id],
    );

    console.log("follows data: ", followers.rows);
    return followers.rows;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Creates a connetion between the loggined in user and the user they are following
 * @param {string} user_id
 * @param {string} follower_id
 */
const addFollowRelationship = async (user_id, follower_id) => {
  console.log("creating new follower...");
  try {
    const newFollow = await pool.query(
      "INSERT INTO followers (follower_id, followee_id) VALUES ($1, $2) RETURNING *",
      [user_id, follower_id],
    );

    console.log("new follower created: ", newFollow.rows[0]);

    return newFollow.rows[0];
  } catch (err) {
    console.log("error creating new follower in follow model: ", err);
  }
};

/**
 * Deletes a connetion between the loggined in user and the user they are following
 * @param {*} user_id
 * @param {*} follower_id
 */

const deleteFollowRelationship = async (user_id, follower_id) => {
  console.log("unfollowing user...");
};

module.exports = {
  getAllFollowersByUser,
  addFollowRelationship,
  deleteFollowRelationship,
};
