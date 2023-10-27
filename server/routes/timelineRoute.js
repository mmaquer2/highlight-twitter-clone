const router = require('express').Router();
const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');
const authenticateToken = require("../middleware/authenticateToken"); 


/**
 * 
 * 
 */

router.get('/generate', authenticateToken, async (req, res) => {
    console.log("generating user timeline...")
    
    // get cache of users following list

    // get posts from users in following list

    // order posts by date and time

    // cache posts in redis

    // return posts to client




});


router.get('/update', authenticateToken, async (req, res) => {
    console.log("generating user timeline...")
    


});

module.exports = router;