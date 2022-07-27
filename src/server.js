// @ts-ignore
import express, { json, response } from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

var users = [];

io.on("connection", (socket) => {
    socket.on("login", (userName) => {

        const user = users.find((user) => user.userName === userName)

        if(user){
            user.socket_id = socket.id
        }else{
            const newUser = {
                userName: userName,
                socket_id: socket.id
            }
            users.push(newUser)
            console.log(users)
        }
        socket.emit("login", users)
    })
    socket.join("message");
    socket.on("message", (data) => {
        socket.to("message").emit("message", data)
    });
});

server.listen(3000, () => {
    console.log("Server running on port: 3000")
});

