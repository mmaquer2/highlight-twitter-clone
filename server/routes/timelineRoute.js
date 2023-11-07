const router = require("express").Router();
const Timeline = require("../models/timelineModel.js");
const authenticateToken = require("../middleware/authenticateToken");

/**
 *
 * Get a users timeline:
 *
 */

router.get("/get", authenticateToken, async (req, res) => {
  console.log("generating user timeline...");

  try {
    const user_id = req.user.id;

    // TODO: when to invalidate cache for the timeline? how often to refresh and check for new posts?
    const client = req.app.locals.redisClient;
    const cachedTimeline = await client.get(`user_timeline_${user_id}`); // check cache for timeline data

    if (cachedTimeline) {
      console.log("timeline data found in cache");
      return res.status(200).json(JSON.parse(cachedTimeline));
    } else {
      const timeline = await Timeline.createUserTimeline(user_id);

      // reset cache to new timeline data
      await client.set(
        `user_timeline_${user_id}`,
        JSON.stringify(timeline),
        "EX",
        3000,
      );
      console.log("timeline: ", timeline);
    }

    res.status(200).json(timeline);
  } catch (err) {
    console.log("error fetching posts: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
