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

app.use(cors())
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/msg", msgRoutes);



// listening
const server = app.listen("5000", () => {
   console.log("Listening...");
});

// socket.io connect react
// const io = socket(server, {
//    cors: {
//       origin: "http://localhost:3000",
//       credentials: true,
//    },
// });

// socket.io connection
// io.on("connection", (socket) => {
//    console.log("a user connected:", socket.id);
//    socket.join("clock-room");

//    socket.on("disconnect", (reason) => {
//       console.log(reason);
//    });

//    socket.on("chat", (data) => {
//       io.sockets.emit("chat", data);
//    });
// });
