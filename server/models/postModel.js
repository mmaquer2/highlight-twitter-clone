const pool = require("../db");

/**
 * @param {number} user_id id of user to fetch posts for
 * @returns {object[]} object array of posts for user
*/

const fetchPosts = async (user_id) => {
    try {    
        const result = await pool.query(`select * from posts where user_id = ${user_id}`);
        console.log(result.rows)
        return result.rows;
    
    } catch(err){
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
        console.log("creating post for user id", user_id, "with content", content)

        const result = await pool.query(
            `INSERT INTO posts(user_id, content) VALUES($1, $2) RETURNING *`,
            [user_id, content]
          );


        console.log(result.rows)
        return result.rows;
    } catch(err){
        console.log(err);
        return err;
    }
};

module.exports = { fetchPosts, createPost }