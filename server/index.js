const express = require("express");
// const cors = require("cors");
const socket = require("socket.io");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

app.use(express.json())
const dbURL =
   "mongodb+srv://habibmustafa:hebib24589@chat-app.dxp6hh7.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

const server = app.listen("5000", () => {
   console.log("Listening...");
});

app.get("/", async (req, res) => {
   const user = new User({
      email: "habibmustafa@gmail.com",
      username: "habibmustafa",
      password: "hebib24589",
   });

   try {
      await user.save();
   } catch (err) {
      console.log(err.message);
   }
});

// socket.io connect react
const io = socket(server, {
   cors: {
      origin: "http://localhost:3000",
      credentials: true,
   },
});

// socket.io connection
io.on("connection", (socket) => {
   console.log("a user connected:", socket.id);
   socket.join("clock-room");

   socket.on("disconnect", (reason) => {
      console.log(reason);
   });

   socket.on("chat", (data) => {
      io.sockets.emit("chat", data);
   });
});
