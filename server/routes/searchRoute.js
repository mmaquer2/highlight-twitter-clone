const router = require("express").Router();
const User = require("../models/userModel");
const Posts = require("../models/postModel");
const Search = require("../models/searchModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");


/** 
 * 
 */


router.get('/general', authenticateToken, async (req, res) => {
    try {

        console.log("search route hit");
    
        const { user_id } = req.user;
        const { searchString } = req.query;
            
        console.log("searching for", searchString)

        const results = await Search.generalSearch(user_id, searchString);
        console.log("results from general serach: ", results);

        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;