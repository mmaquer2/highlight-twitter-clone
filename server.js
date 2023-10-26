const express = require("express");
const app = express();
//const cors = require("cors");
// const authRoutes = require("./server/routes/authRoute");
const postRoutes = require("./server/routes/postRoute");
// const followerRoutes = require("./server/routes/followerRoute");
// const likeRoutes = require("./server/routes/likeRoute");
// const cookieParser = require("cookie-parser");
const path = require("path");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log("dev mode... using dotenv config...") 
}

const PORT = process.env.PORT || 3001;


console.log("starting server on port " + PORT);

//app.use(cookieParser());
app.use(express.json());

//app.use("/auth", authRoutes);
app.use("/post", postRoutes);
//app.use("/follower", followerRoutes);
//app.use("/like", likeRoutes);
if(process.env.NODE_ENV === 'dev') {
    
    app.get('/', (req, res) => {
        res.send('Hello World from Dev!');
    });
}

if(process.env.NODE_ENV === 'production') {
    // Serve any static files from react app here
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build", "index.html"));
    });

}



app.listen(PORT, () => console.log(`server started successfully on port ${PORT}`));



module.exports = app;
