const router = require("express").Router();
const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const Timeline = require("../models/timelineModel.js");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * 
 * Routes for the timeline data model
 */



/**
 * 
 * 
 * Get a users timeline ->

 * 
 */

router.get("/timeline", authenticateToken, async (req, res) => {
    console.log('generating user timeline...');

    try {

      const user_id = req.user.id;
      const timeline = await Timeline.createTimeline(user_id);
      console.log("timeline: ", timeline);

      res.status(200).json(timeline);

    } catch(error) {
        console.log("error fetching posts: ", err);
        res.status(500).json(err);
    }

  })


module.exports = router;
