const pool = require("../db");


/**
 * @param {number} user_id
 * @returns 
 * 
 * 
 */


const fetchPosts = async (user_id) => {
    try {    
        const result = await pool.query(`select * from posts where user_id = ${user_id}`);
        return result.rows;
    
    } catch(err){
        console.log(err);
        return err;
    }
};

module.exports ={fetchPosts}