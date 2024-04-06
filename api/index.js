import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import courseRouter from "./routes/course.route.js"
import materialRouter from "./routes/material.route.js"
dotenv.config();

// Database connected
mongoose.connect("mongodb://127.0.0.1:27017/studentPortal")
.then(()=>{
    console.log("success")
}).catch((err)=>{
    console.log(err);
})


const app = express();
const port = 3001;
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true // Allow credentials (e.g., cookies) to be sent with requests
  }));
  
  
app.use(express.json());
app.use("/api/user",userRouter)
app.use("/api/user",authRouter)
app.use("/api/user",courseRouter)
app.use("/api/user",materialRouter)

// This middle ware is created to specially handle the error part and must be kept at end of all middlewares
app.use((error,req,res,next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";
    res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

app.listen(port,()=>{
    console.log(`Hello at port ${port}`)
})