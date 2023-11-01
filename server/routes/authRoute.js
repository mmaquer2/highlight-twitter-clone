const router = require("express").Router();
const User = require("../models/userModel");
const Posts = require("../models/postModel");
const Follows = require("../models/followModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const socket = require("../socket");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/register", async (req, res) => {
  console.log("register route called");

  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("login route called");
    const { username, password } = req.body;

    const user = await User.findUserByUsername(username);

    console.log("attempting to login user... ", username);

    if (user === null) {
      return res.status(400).send("User not found");
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
        expiresIn: "1h",
      });

      res.cookie("token", token, { sameSite: "none", secure: true });

      // Caching data in Redis post login
      Posts.fetchPosts(user.id);
      const followData = await Follows.getAllFollowersByUser(user.id);

      // TODO: prepare timelien data for caching
      // const timelineData = await Posts.fetchTimelinePosts(user.id);

      console.log("follower data post login:", followData);

      const followSummary = {
        followers: 0,
        following: 0,
      };

      //TODO: clean this up... should the return data be processed here or the route/model?
      if (followData.length !== 0) {
        followData.forEach((follow) => {
          if (follow.follower_id === user.id) {
            followSummary.followers += 1;
          } else {
            followSummary.following += 1;
          }
        });
      }

      const client = req.app.locals.redisClient;

      const loggedInUserData = {
        user: user.id,
        username: user.username,
        avatar_url: user.avatar_url || "",
        follow_summary: followSummary,
      };

      await client.set(
        `loggedin_user_${user.id}`,
        JSON.stringify(loggedInUserData),
        "EX",
        1000,
      );

      console.log("login successful for user: ", username);

      return res.status(200).json({ login: "success" });
    }

    return res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log("There was an error logging in: ", err);
    return res.status(500).send(err.message);
  }
});

router.post("/logout", async (req, res) => {
  console.log("logout route called");
  res.clearCookie("token");
  const client = req.app.locals.redisClient;
  await client.del("loggedin_user"); // clear logged in user cache
  res.json({ message: "User logged out" });
});

router.get("/check-auth", authenticateToken, (req, res) => {
  res.sendStatus(200);
});

router.get("/get-user-cache", authenticateToken, async (req, res) => {
  const client = req.app.locals.redisClient;
  const user_id = req.user.id;

  try {
    const loggedInUserData = await client.get(`loggedin_user_${user_id}`);

    if (!loggedInUserData) {
      return res
        .status(404)
        .json({ message: "No cache data found for the user." });
    }

    return res.status(200).json(JSON.parse(loggedInUserData));
  } catch (err) {
    console.error("Error getting user cache:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//TODO: server event update for get-user-cached data ...

router.get("/get-profile-owner-data", authenticateToken, async (req, res) => {
  console.log("get profile owner data route called");
  const profileOwner = req.query.owner_id;
  console.log("profile owner: ", profileOwner);

  try {
    //TODO: how to set up cache for a profile owner...is complex becasue someone else could be looking at the same profile owner
    // and the data could be different or have changed since the last time the user looked at it
    //const client = req.app.locals.redisClient;

    const profile = await User.findUserByUserID(profileOwner);
    const followData = await Follows.getAllFollowersByUser(profileOwner);

    const followSummary = {
      followers: 0,
      following: 0,
    };

    if (followData !== undefined && followData.length !== 0) {
      followData.forEach((follow) => {
        if (follow.follower_id === profileOwner) {
          followSummary.followers += 1;
        } else {
          followSummary.following += 1;
        }
      });
    }
    const profileOwnerData = {
      user: profileOwner,
      username: profile.username,
      avatar_url: profile.avatar_url || "",
      follow_summary: followSummary,
    };

    res.status(200).json(profileOwnerData);
  } catch (err) {
    console.log("error getting profile owner data: ", err);
  }
});

module.exports = router;
