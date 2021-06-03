const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5000", "https://admin.socket.io"],
  },
});

const userIO = io.of("/user");

userIO.on("connection", (socket) => {
  console.log("connected to user namespace", socket.username);
});

userIO.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next("Please sent Token");
  }
});

const getUsernameFromToken = (token) => {
  return token;
};

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("sent-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb("Joined Room ", room);
  });

  socket.on("ping", (number) => {
    console.log(number);
  });
});

instrument(io, { auth: false });
