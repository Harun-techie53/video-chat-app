const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { registerSocketServer } = require('./socketServer');
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require('./routes/friendInvitationRoute');

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

// register the routes
app.use("/api/auth", authRoutes);
app.use('/api/friend-invitation', friendInvitationRoutes);

const server = http.createServer(app);

registerSocketServer(server);

const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });
