const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./server/routes/authRoute");
const postRoutes = require("./server/routes/postRoute");
const timelineRoutes = require("./server/routes/timelineRoute");
const cookieParser = require("cookie-parser");
const path = require("path");
const redis = require("redis");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  console.log("dev mode... using dotenv config...");
}

const PORT = process.env.PORT || 3001;
console.log("starting server on port " + PORT);

const client = redis.createClient({
  //host: 'your_redis_host',
  port: 6379,
  retry_strategy: (options) => {
    if (options.total_retry_time > 1000 * 60 * 60) {
      // Retry for 1 hour
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // Max attempts
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000); // Increase delay but max out at 3s
  },
});

client.connect(); // Connect to Redis

client.on("error", (err) => {
  console.error("Redis error:", err);
});

app.locals.redisClient = client;

app.use(cookieParser());
app.use(express.json());

// TODO: for some reason cors only works in dev mode if I set origin to true,
// does not function correctly when in the NODE_ENV dev mode
app.use(cors({ credentials: true, origin: true }));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/timeline", timelineRoutes);

if (process.env.NODE_ENV === "dev") {
  app.get("/", (req, res) => {
    res.send("hello from the dev highlights server!!");
  });
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`server started successfully on port ${PORT}`),
);

module.exports = app;
