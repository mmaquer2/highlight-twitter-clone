const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./server/routes/authRoute");
const postRoutes = require("./server/routes/postRoute");
const cookieParser = require("cookie-parser");
const path = require("path");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log("dev mode... using dotenv config...") 
}

const PORT = process.env.PORT || 3001;
console.log("starting server on port " + PORT);

app.use(cookieParser());
app.use(express.json());

// TODO: for some reason cors only works in dev mode if I set origin to true,
// does not function correctly when in the NODE_ENV dev mode
app.use(cors({ credentials: true, origin: true }));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


if(process.env.NODE_ENV === 'dev') {    
    app.get('/', (req, res) => {
        res.send('hello from the dev highlights server!!');
    });
}

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build", "index.html"));
    });
}

app.listen(PORT, () => console.log(`server started successfully on port ${PORT}`));

module.exports = app;
