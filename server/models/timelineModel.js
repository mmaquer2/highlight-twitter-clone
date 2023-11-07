const pool = require("../db");
const socket = require("../socket");

/**
 * generate timeline for a given user
 * @param {number} user_id
  
 */

const createUserTimeline = async (user_id) => {
  console.log("generating user timeline...");

  // TODO: parse timeline data to only include the data we need from a certain time period

  // TODO: also include posts from the user themselves

  try {
    const timeline = await pool.query(
      "SELECT posts.*, users.* FROM posts JOIN users ON posts.user_id = users.id JOIN followers ON followers.followee_id = users.id WHERE followers.follower_id = $1",
      [user_id],
    );

    console.log("timeline: ", timeline.rows);
    return timeline.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUserTimeline,
};
