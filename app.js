import express from "express";
// import userRouter from "/routes/user.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


export const app = express();

config({
  path: "./data/config.env",
});

// using Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  method:["GET","POST","PUT","DELETE"],
  credentials:true,
}));



//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Index page");
});
app.use((err,req,res,next)=>{
 return res.status(404).json({
  success:false,
  message:"Invalid Id"
});
});