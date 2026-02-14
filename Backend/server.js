const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const connectDB = require("./Models/db");
require("./Authentication/passport");
const ensureAuth = require("./Middlewares/authMiddleware");
const oauthRouter = require("./Routes/oauthRouter");
const authRouter = require("./Routes/authRouter");


app.use(express.json());
app.use(passport.initialize());

// using cors to allow requests from the frontend
app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true,
}));

app.use("/oauth", oauthRouter);
app.use("/auth", authRouter);


// basic route
app.get('/', ensureAuth, (req, res) => {
  res.send('hi')
})


connectDB(app, 5000);