import express from "express";
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
var messages = [];
var rooms = ["Geral", "Fun", "Work"];

io.on("connection", (socket) => {
    socket.emit("rooms", rooms);
    socket.emit("users", users);

    socket.on("users", (users) => {
        socket.emit(users)
    })

    socket.on("rooms", (room) => {
        if (room) {
            rooms.push(room)
        }
        socket.broadcast.emit("rooms", rooms)
    });

    socket.on("select_room", (data, callback) => {
        socket.join(data.room);

        socket.to(data.room).emit(data.user);

        const user = users.find(user => user.userName === data.user && user.room === data.room)

        if (user) {
            user.socket_id = socket.id
        } else {
            users.push({
                room: data.room,
                userName: data.user,
                socket_id: socket.id
            })
        }

        const roomUsers = users.filter(user => user.room === data.room)
        socket.to(data.room).emit("select_room", {
            roomUsers,
        });

        const roomData = getRoomData(data.room);
        callback(roomData);

        socket.on("disconnect", () => {
            users = users.filter(user => user.socket_id != socket.id)
            socket.to(data.room).emit("newuserlist", users);
        })

        socket.on("message", (data) => {
            messages.push(data);
            socket.to(data.room).emit("message", data)
        });
    })
});

const getRoomData = (room) => {
    const messagesRoom = messages.filter(message => message.room === room);
    const usersRoom = users.filter(user => user.room === room);

    return { messages: messagesRoom, users: usersRoom }
}

server.listen(3000, () => {
    console.log("Server running on port: 3000")
});