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

      // Caching data in Redis post login

      Posts.fetchPosts(user.id);
      
      const client = req.app.locals.redisClient;
            
      const loggedInUserData = {
        user: user.id,
        username: user.username,
        avatar_url: user.avatar_url || "",
      }

      console.log("caching logged in user data: ", loggedInUserData);

      await client.set("loggedin_user", JSON.stringify(loggedInUserData), "EX", 1000);

      //TODO:
      // User.fetchFollowing(user.id);
      // Timeline.generateTimeline(user.id);

      console.log("login successful for user: ", username);

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


  //TODO: clear user cache

  res.json({ message: "User logged out" });
});

router.get("/check-auth", authenticateToken, (req, res) => {
  res.sendStatus(200);
});


router.get('/get-user-cache', authenticateToken, async (req, res) => {
  const client = req.app.locals.redisClient;

  try {
  
    console.log("getting logged in user cache...");
    const loggedInUserData = await client.get("loggedin_user");
    console.log("logged in user data: ", loggedInUserData);

    res.status(200).json(JSON.parse(loggedInUserData));
   
  
  } catch (err) {
  
    console.log("error getting logged in user cache: ", err);
  
  }

})


module.exports = router;
