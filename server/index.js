const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const msgRoutes = require("./routes/msgRoutes");
const app = express();

const dbURL =
   "mongodb+srv://habibmustafa:hebib24589@chat-app.uibf8p5.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/msg", msgRoutes);

// listening
const server = app.listen("5000", () => {
   console.log("Listening...");
});

// socket.io connect react
const io = socket(server, {
   cors: {
      origin: "http://localhost:3000",
      credentials: true,
   },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
   global.chatSocket = socket;
   socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
   });

   socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
         socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
   });
});

// let clients = [];

// socket.io connection
// io.on("connection", (socket) => {
//    console.log("a user connected:", socket.id);

//    socket.on("storeClientInfo", (data) => {
//       let clientInfo = new Object();

//       clientInfo.customId = data.customId;
//       clientInfo.clientId = socket.id;
//       clients.push(clientInfo);
//    });

//    socket.on("disconnect", (data) => {
//       for (let i = 0, len = clients.length; i < len; i++) {
//          let c = clients[i];
//          if (c.clientId == socket.id) {
//             clients.splice(i, 1);
//             break;
//          }
//       }
//    });

// socket.on("chat", (data) => {
//    io.sockets.emit("chat", data);
// });
// });
