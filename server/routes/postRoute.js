const router = require("express").Router();
const Post = require("../models/postModel.js");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/test-redis", async (req, res) => {
  const client = req.app.locals.redisClient;

  try {
    await client.set("testKey", "Hello, Redis!", "EX", 10);
    const value = await client.get("testKey");

    if (value === "Hello, Redis!") {
      res.status(200).send("Redis connection is working!");
    } else {
      res.status(500).send("Redis value mismatch.");
    }
  } catch (error) {
    console.error("Redis test failed:", error);
    res.status(500).send("Redis connection failed.");
  }
});

router.get("/get", authenticateToken, async (req, res) => {
  console.log("fetching posts...");

  try {
    const client = req.app.locals.redisClient;
    const user_id = req.user.id;
    console.log("fetching posts for user id", user_id);

    const value = await client.get(`user_posts_${user_id}`);

    if (value) {
      console.log("redis cache hit, returning cached posts...");
      console.log("cached posts: ", JSON.parse(value));
      res.status(200).json(JSON.parse(value));
      return;
    } else {
      console.log("redis cache miss, fetching posts from db...");

      const posts = await Post.fetchPosts(user_id);
      await client.set(
        `user_posts_${user_id}`,
        JSON.stringify(posts),
        "EX",
        1000,
      );
      res.status(200).json(posts);
    }
  } catch (err) {
    console.log("error fetching posts: ", err);
    res.status(500).json(err);
  }
});

router.post("/create", authenticateToken, async (req, res) => {
    console.log("creating a new post...");
    const client = req.app.locals.redisClient;
    try {
      const user_id = req.user.id;
      const content = req.body.content;
      const newPost = await Post.createPost(user_id, content);
      await client.del(`user_posts_${user_id}`); // Invalidate the cache for this user's posts
  
      res.status(201).json(newPost);
    } catch (err) {
      console.log("Error creating a new post: ", err);
      res.status(500).json(err);
    }
  });

router.delete("/delete", authenticateToken, async (req, res) => {
  console.log("deleting a post...");
  try {
    const client = req.app.locals.redisClient;
    const { post_id } = req.body;
    const user_id = req.user.id;
    const deletedPost = await Post.deletePost(post_id);
    await client.del(`user_posts_${user_id}`); // Invalidate the cache for this user's posts
    res.status(200).json(deletedPost);
  } catch (err) {
    console.log("Error deleting a post: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
