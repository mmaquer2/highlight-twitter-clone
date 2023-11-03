const router = require("express").Router();
const Follow = require("../models/followModel.js");
const socket = require("../socket");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * Rotues for the follow data model
 *
 */

router.post("/create", authenticateToken, async (req, res) => {
  try {
    console.log("creating new follower route called...");
    console.log(
      "creating new follower for user: ",
      req.user.id,
      " and follower: ",
      req.body.follow_id,
    );

    const follows = await Follow.addFollowRelationship(
      req.user.id,
      req.body.follow_id,
    );
    const client = req.app.locals.redisClient;
    await client.del(`user_follows_${req.user.id}`); // invalidate cache after creating new follow relationship

      const io = socket.getIO();
      io.emit("test", {message: "test message from follow model"})
      

    res.status(200);
  } catch (err) {
    console.log("error creating new follower: ", err);
  }
});

router.get("/get", authenticateToken, async (req, res) => {
  try {
    console.log("get follower route called...");
    const follows = await Follow.getAllFollowersByUser(req.user.id);

    const client = req.app.locals.redisClient;

    await client.set(
      `user_follows_${user_id}`,
      JSON.stringify(follows),
      "EX",
      3000,
    );
  } catch (err) {
    console.log("error getting followers: ", err);
  }
});

router.post("/delete", authenticateToken, async (req, res) => {
  try {
    console.log("delete follower route called...");
  } catch (err) {}
});

module.exports = router;
