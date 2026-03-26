const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const mealRoutes = require("./routes/meal.routes");
const mailRoutes = require("./routes/mail.routes");
const userRoutes = require("./routes/user.routes");
const ensureAuth = require("./middlewares/auth.middleware");
require("./config/passport");

const app = express();

// CORS configuration (must come first)
app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/oauth", authRoutes);
app.use("/meals", mealRoutes);
app.use("/mail", mailRoutes);
app.use("/user", userRoutes);

// Basic health check route
app.get('/', ensureAuth, (req, res) => {
  res.send('Server is running');
});

module.exports = app;
