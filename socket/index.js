import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// Add user if not already present
const addUser = (userData, socketId) => {
  if (!users.some((user) => user.sub === userData.sub)) {
    users.push({ ...userData, socketId });
  }
};

// Remove user on disconnect
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Get user by receiver ID
const getUser = (userId) => {
  return users.find((user) => user.sub === userId);
};

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // Add user to list
  socket.on("addUser", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  // Send message to recipient
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);

    if (user && user.socketId) {
      io.to(user.socketId).emit("getMessage", data);
    } else {
      console.warn(`❌ User with ID ${data.receiverId} is not connected`);
    }
  });

  // Remove user from list on disconnect
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
