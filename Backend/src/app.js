const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const mealRoutes = require("./routes/meal.routes");
const ensureAuth = require("./middlewares/auth.middleware");

require("./config/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// CORS configuration
app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true,
}));

// Routes
app.use("/auth", authRoutes);
app.use("/oauth", authRoutes);
app.use("/meals", mealRoutes);

// Basic health check route
app.get('/', ensureAuth, (req, res) => {
  res.send('Server is running');
});

module.exports = app;
