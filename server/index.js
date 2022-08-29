const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const msgRoutes = require("./routes/msgRoutes");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
   res.header(
      "Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
      "Origin, X-Requested-with, Content_Type,Accept,Authorization",
      "http://localhost:3000"
   );
   if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
   }
   next();
});

mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("Succesfull"))
   .catch((err) => console.log(err.message));

app.use("/auth", authRoutes);
app.use("/msg", msgRoutes);

// listening
const server = app.listen(process.env.PORT || 5000, () => {
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
         socket.to(sendUserSocket).emit("msg-recieve", data);
      }
   });
});