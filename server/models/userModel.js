const pool = require("../db");

const createUser = async (user) => {
  console.log("creating new user...")
  const { username, email, password } = user;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    return newUser.rows[0];
  } catch (err) {
    console.log(err.message)
    return err.message;
  }
};

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
* 
* Below are the routes for the followers table and operations
* 
* 
*/

// this is the search hook on the timeline page to lookup new followers or friends

const searchForUsername= () => {

  //TODO:


};


/**
 * creates a connetion between the loggined in user and teh user they are following
 * @param {string} user_id 
 * @param {string} follower_id 
 */
const createNewFollower = async(user_id, follower_id) => {

  //TODO: 


};





module.exports = {
  createUser,
  findUserByUsername,
  searchForUsername,
  createNewFollower,
};
