import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
config({
  path: "./config/config.env",
});

const app = express();
//Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended:true,
}))
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"],
}))
app.use(cookieParser())
// Importing Routes
import course from "./routes/courseRoute.js";
import user from "./routes/userRoute.js";
import payment from "./routes/paymentRoute.js";
import other from "./routes/otherRoute.js";
import cors from "cors"


app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

app.get("/",(req,res)=>res.send(`<h1> Site is Working. Click <a href=${process.env,FRONTEND_URL}> here </a> to visit frontend</h1>`))


export default app;
app.use(ErrorMiddleware);
