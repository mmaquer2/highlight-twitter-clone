const router = require("express").Router();
const Follow = require("../models/followModel.js");
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

    //TODO: check if user is already following the user they are trying to follow

    const follows = await Follow.addFollowRelationship(
      req.user.id,
      req.body.follow_id,
    );
    const client = req.app.locals.redisClient;
    await client.del(`user_follows_${req.user.id}`); // invalidate cache after creating new follow relationship

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

router.get("/check", authenticateToken, async (req, res) => {
  try {
    console.log("get follower route called...");

    const look_upprofile_onwer = req.query.host_id;
    const look_upprofile_visitor = req.user.id;
    const isFollowing = await Follow.checkFollowingForGuestandUser(
      look_upprofile_onwer,
      look_upprofile_visitor,
    );
    return res.status(200).json(isFollowing);
  } catch (err) {
    console.log("error getting followers: ", err);
  }
});

router.delete("/delete", authenticateToken, async (req, res) => {
  try {
    console.log("delete follower route called...");
    console.log(
      "deleting follower for user: ",
      req.user.id,
      " and follower: ",
      req.query.follow_id,
    );
    const deletedFollow = await Follow.deleteFollowRelationship(
      req.user.id,
      req.query.follow_id,
    );

    console.log("deleted follower: ", deletedFollow);

    return res.status(200).json(deletedFollow);
  } catch (err) {
    console.log("error deleting follower: ", err);
  }
});

module.exports = router;
