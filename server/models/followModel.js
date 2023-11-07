const pool = require("../db");
const socket = require("../socket");

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
    return followers.rows;
  } catch (err) {
    console.log(err);
  }
};

const checkFollowingForGuestandUser = async (host_id, user_id) => {
  try {
    const followers = await pool.query(
      "SELECT * FROM followers WHERE followee_id = $1 AND follower_id = $2",
      [host_id, user_id],
    );

    if (followers.rows.length === 0) {
      console.log("the current user is not following the host user");
      return false;
    } else {
      console.log("the current user is following the host user");
      return true;
    }
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

    //TODO: send socket event to all users that the user has a new follower

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

  try {
    const deletedFollow = await pool.query(
      "DELETE FROM followers WHERE follower_id = $1 AND followee_id = $2 RETURNING *",
      [user_id, follower_id],
    );

    console.log("deleted follower: ", deletedFollow.rows[0]);

    return deletedFollow.rows[0];
  } catch (error) {
    console.log("error unfollowing user: ", error);
  }
};

module.exports = {
  getAllFollowersByUser,
  addFollowRelationship,
  deleteFollowRelationship,
  checkFollowingForGuestandUser,
};
