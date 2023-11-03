const socket = require("socket.io").Server;
let io = null;

class Socket{
    server;

    setServer(server){
        this.server = server; 
    }

    createConnection(){
        io = new socket(this.server,{cors:true}); 

        io.on("connection", (socket) => {
          console.log("client connected via socket.io");

          socket.on("post_created", (data) => { 
            console.log("post has been created succesfully")
          })


            socket.on("disconnect", (reason) => {
                
            });


            socket.on("message", (data) => {
                console.log("message received: ", data);
            });
        });

    }

    getIo(){
      console.log("get IO called!");
        return io;
    }
}

module.exports.socket = new Socket();