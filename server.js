import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app, io } from "./socket/socket.js";
dotenv.config();
// mongoose connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB ");
  })
  .catch((e) => {
    console.log("Error in MongoDB ");
  });

// server start
// const app = express();



app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://rapid-backend-wkyh.vercel.app/",
  methods: "PUT,GET,UPDATE,POST,PATCH,DELETE,HEAD",
  credentials: true,
}));


const PORT = process.env.PORT || 3000;

// server response
app.get("/", (req, res) => {
  res.send("hello");
});

// import routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// port listen
server.listen(PORT, () => {
  console.log("Server running at " + PORT);
});
// erorr handle
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
