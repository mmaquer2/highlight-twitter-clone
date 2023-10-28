const router = require("express").Router();
const User = require("../models/userModel");
const Posts = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

      Posts.fetchPosts(user.id);

      //TODO:
      // User.fetchFollowing(user.id);
      // Timeline.generateTimeline(user.id);

      return res.status(200).json({ login: "success" });
    }

    return res.status(400).send("Invalid credentials");
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/logout", (req, res) => {
  console.log("logout route called");
  res.clearCookie("token");
  res.json({ message: "User logged out" });
});

router.get("/check-auth", authenticateToken, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
