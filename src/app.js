import express from "express";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome!");
});

import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/auth", authRouter);

export default app;
