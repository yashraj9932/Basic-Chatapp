const express = require("express");
const app = express();
const http = require("http");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");

const server = http.createServer(app);
const io = socketio(server);

dotenv.config({ path: "./config/config.env" });
connectDB();

const auth = require("./routes/auth");
const room = require("./routes/room");
const errorHandler = require("./middleware/error");
const User = require("./models/User");

app.use(express.json());
app.use(cors());

console.log();

console.log("roomswala,databse2 times,localhost:5000 in context");
console.log();

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    // console.log(room);
    socket.join(room);

    // console.log("User has joined the chat");
  });

  socket.on("sendMessage", async (message, room, id, callback) => {
    // socket.join(room);
    io.to(room).emit("message", { from: id, text: message, Date: Date.now() });
    const user = await User.findById(id);

    // io.to(user.room).emit("roomData", {
    //   room: user.room,
    //   users: getUsersInRoom(user.room),
    // });

    callback();
  });
  socket.on("disconnect", () => {
    // console.log("User has left the chat");
  });
});

app.use("/auth", auth);
app.use("/room", room);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    msg: "Server is up and running",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
