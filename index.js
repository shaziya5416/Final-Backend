import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected",()=>{
  console.log("MongoDB disconnected")
})

// mongoose.connection.on("connected",()=>{
//   console.log("MongoDB connected")
// })

//middlewares
app.use(
  cors({
      origin: true,
      credentials: true,
  })
);
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/hotels",hotelsRoute);

const port = process.env.PORT || 3004

app.listen(port, () => {
    connect()
  console.log('Connected to backend');
});
