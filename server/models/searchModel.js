const pool = require("../db");

const fetchUsersMatching = async (user_id) => {
  try {
    const result = await pool.query(
      `select * from users where user_id = ${user_id}`,
    );
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const generalSearch = async (user_id, searchString) => {
  try {
    console.log("searching for: ", searchString);
    const result = await pool.query(
      `select * from users where username like '%${searchString}%'`,
    );
    console.log(result.rows);

    //TODO: lookup follower connections

    //TODO: search for trends and posts as well

    const resultData = [];

    //TODO: parse data on search return to include is_following, is_followed_by, is_self
    result.rows.forEach((user) => {
      if (user.id !== user_id) {
        // don't include the loggedin user in the search results
        resultData.push({
          user_id: user.id,
          username: user.username,
          avatar: "",
          is_following: false,
          is_followed_by: false,
        });
      }
    });

    console.log("result data after search and parsing...");
    console.log(resultData);

    return resultData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { fetchUsersMatching, generalSearch };
