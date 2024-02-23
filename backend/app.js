global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express=require("express");
const fileUpload = require("express-fileupload");
const vacationController=require("./controllers/vacation-controller")
const cors = require("cors");
const authController=require("./controllers/auth-controller")
const followController=require("./controllers/follow-controller")
const io=require("socket.io")

const server=express()
server.use(cors())

server.use(express.json());
server.use(fileUpload());
server.use("/api/vacation", vacationController);
server.use("/api/auth", authController);
server.use("/api/followers",followController)


const listener= server.listen(3001, () => console.log("Listening..."));


const socketsManager = io(listener, { cors: { origin: "*"}}); // Allow react front
const s =[]
socketsManager.sockets.on("connection", socket => {
     s.push(socket)
    
    console.log("A client has been connected.");

    socket.on("admin-update", () => {
        console.log("admin update some thing");
        socketsManager.sockets.emit("refresh-your-data");

    });

    socket.on("disconnect", () => {
        console.log("A client has been disconnected");
    });

});

module.exports=s

