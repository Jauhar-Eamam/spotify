const express = require("express");
require("dotenv").config();
const authRouter = require("./routers/auth.route");
const musicRouter = require("./routers/music.route");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/music", musicRouter);

module.exports = app;
