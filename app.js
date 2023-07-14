import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";

config({
  path: "./config/config.env",
});

const app = express();

// Importing Routes
import course from "./routes/courseRoute.js";
import user from "./routes/userRoute.js";

app.use("/api/v1", course);
app.use("/api/v1", user);


export default app;
app.use(ErrorMiddleware);
