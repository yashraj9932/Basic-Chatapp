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
const errorHandler = require("./middleware/error");
const User = require("./models/User");

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  socket.on("join", () => {
    console.log("User has joined the chat");
    // console.log(msg);
  });

  socket.on("sendMessage", async (message, room, email, callback) => {
    const user = await User.findOne({ email });
    // console.log(user);
    // io.to(socket.id).emit("message", message);
    io.to(room).emit("message", { user: user.name, text: message });
    // io.to(user.room).emit("roomData", {
    //   room: user.room,
    //   users: getUsersInRoom(user.room),
    // });

    callback();
  });
  // socket.on("disconnect", () => {
  //   console.log("User has left the chat");
  // });
});

app.use("/auth", auth);

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
