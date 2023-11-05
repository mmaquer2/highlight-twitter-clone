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

    socket.on("user_notif_join", (room) => {
      console.log("joining notification for user room:", room);
      socket.join(room);
    });

    socket.on("new_follow", (data) => {
      console.log("new follower data: ", data);
      const { followedUserId } = data;
      socket
        .to(followedUserId)
        .emit("notify_new_follower", { message: "You have a new follower!" });
    });

    socket.on("new_post", (data) => {
      console.log("on socket: new post data: ", data);
      const { userId } = data;
      socket
        .to(userId)
        .emit("notify_new_post", { message: "You have a new post!" });
    });

    socket.on("message", (data) => {
      console.log("message received: ", data);
    });

    socket.on("test", (data) => {
      console.log("test emit received: ", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected from Socket.io");
    });
  });

  console.log("Socket.io server initialized!");
  return io;
};

exports.getIO = () => {
  console.log("get IO called!");
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  console.log("socket io is initialized!, returning instance...");
  return io;
};
