import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/msg.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

export default app;
