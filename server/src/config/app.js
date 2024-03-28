import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { URL_CLIENT } from "./config.js";
import userRouter from "../routes/user.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: URL_CLIENT,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", userRouter);

app.get("ping", (req, res) => {
  res.send("pong");
});

export default app;
