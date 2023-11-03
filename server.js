const express = require("express");
const cors = require("cors");
const authRoutes = require("./server/routes/authRoute");
const postRoutes = require("./server/routes/postRoute");
const timelineRoutes = require("./server/routes/timelineRoute");
const searchRoutes = require("./server/routes/searchRoute");
const followRoutes = require("./server/routes/followRoute");
const cookieParser = require("cookie-parser");
const path = require("path");
const redis = require("redis");

const socketio = require("socket.io");
const http = require("http"); 


const app = express();
const PORT = process.env.PORT || 3001;
console.log("starting server on port " + PORT);

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server , {cors:{
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true,
}});


app.set("io", io); // Make socket.io accessible to our express application


io.on('connection', function (socket) {
    console.log("New Socket Connection on" + PORT);

    socket.on('disconnect', function () {
        console.log("Socket disconnected");
    });

    socket.on('message', function (data) {
        console.log("message received: ", data);
    });

    socket.on('newPost', function (data) {
        console.log("new post received: ", data);

    });

    socket.on('newFollow', function (data) {
        console.log("new follow received: ", data);
    });

});

// setInterval(() => {
//   io.emit('message', { message: 'Hello from server interval' });
// }, 5000);




if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  console.log("dev mode... using dotenv config...");
}



const client = redis.createClient({
  port: 6379,
  retry_strategy: (options) => {
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
});

client.connect(); // Connect to Redis

client.on("error", (err) => {
  console.error("Redis error:", err);
});

app.locals.redisClient = client; // Make Redis client accessible to our node.js routers

app.use(cookieParser());
app.use(express.json());

// TODO: for some reason cors only works in dev mode if I set origin to true,
// does not function correctly when in the NODE_ENV dev mode
app.use(cors({ credentials: true, origin: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/search", searchRoutes);

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

server.listen(PORT, () => {
  console.log(`server started successfully on port ${PORT}`)
  //socket.setServer(appConn)
 // socket.createConnection()
});



module.exports = app;
