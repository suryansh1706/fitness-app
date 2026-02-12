const express = require("express");
const app = express();

require("dotenv").config();
const passport = require("passport");
const connectDB = require("./Models/db");
require("./Authentication/passport");
const ensureAuth = require("./Middlewares/authMiddleware");
const oauthRouter = require("./Routes/oauthRouter");
const authRouter = require("./Routes/authRouter");


app.use(express.json());
app.use(passport.initialize());

app.use("/oauth", oauthRouter);
app.use("/auth", authRouter);


// basic route
app.get('/', (req, res) => {
  res.send('<a href="/oauth/google">Authenticate with Google</a>')
})

app.get('/get_started', ensureAuth, (req, res) => {
  res.send('Get Started Page');
});


connectDB(app, 5000);