const pool = require("../db");
const socket = require("../socket");
/**
 * @param {number} user_id id of user to fetch posts for
 * @returns {object[]} object array of posts for user
 */

const fetchPosts = async (user_id) => {
  try {
    const result = await pool.query(
      `select * from posts where user_id = ${user_id}`,
    );
    return result.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * @param {number} user_id id of user to fetch posts for
 * @param {string} content content of post
 * @returns {object[]} object array of posts for user
 */

const createPost = async (user_id, content) => {
  try {
    console.log("creating post for user id", user_id, "with content", content);

    const result = await pool.query(
      `INSERT INTO posts(user_id, content) VALUES($1, $2) RETURNING *`,
      [user_id, content],
    );

    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 * deletes a post from the database
 * @param {number} post_id id of post to delete
 */

const deletePost = async (post_id) => {
  try {
    console.log("deleting post with id", post_id);
    const result = await pool.query(
      `DELETE FROM posts WHERE post_id = $1 RETURNING *`,
      [post_id],
    );
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log("error deleting post: ", err);
  }
};

module.exports = { fetchPosts, createPost, deletePost };
