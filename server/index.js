const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const avatarRoutes = require("./routes/avatarRoutes");
const messageRoute = require("./routes/messageRoute");
const app = express();
const socket = require("socket.io");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/auth", avatarRoutes);
app.use("/api/message", messageRoute);

mongoose
  .connect(process.env.MONGODO_URL)
  .then(() => {
    console.log("database is connected successfully");
  })
  .catch(() => {
    console.log("some error in database connection");
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`app is listening on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
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
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
