const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const avatarRoutes = require("./routes/avatarRoutes");
const messageRoute = require("./routes/messageRoute");
const app = express();
const socket = require("socket.io");

require("dotenv").config();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://chat-app-two-gold-68.vercel.app",
      "https://chat-app-git-main-abdul-basits-projects-01e2f589.vercel.app",
      "https://chat-d5i0yk4o2-abdul-basits-projects-01e2f589.vercel.app",
    ],
    credentials: true,
  })
);

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

// Also update Socket.IO CORS:
const io = socket(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://chat-app-two-gold-68.vercel.app",
      "https://chat-app-git-main-abdul-basits-projects-01e2f589.vercel.app",
      "https://chat-d5i0yk4o2-abdul-basits-projects-01e2f589.vercel.app",
    ],
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
