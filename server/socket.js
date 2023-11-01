const socketIO = require("socket.io");

let io;

exports.init = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected via Socket.io");

    socket.on("join", (room) => {});

    socket.on("user_logged_in", (data) => {
      console.log("a new user has logged in", data.username);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected from Socket.io");
    });
  });

  console.log("Socket.io server initialized!");
  return io;
};

exports.getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
