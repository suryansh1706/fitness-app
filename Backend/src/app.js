const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const authRoutes = require("./routes/auth.routes");
const mealRoutes = require("./routes/meal.routes");
const workoutRoutes = require("./routes/workout.routes");
const mailRoutes = require("./routes/mail.routes");
const userRoutes = require("./routes/user.routes");
const ensureAuth = require("./middlewares/auth.middleware");
require("./config/passport");

const app = express();

// CORS configuration (must come first)
const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5000",
  "https://yourfitnessguide.vercel.app",
  process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : null,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const cleanOrigin = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(cleanOrigin) || cleanOrigin.endsWith(".vercel.app") || cleanOrigin.endsWith(".onrender.com")) {
      return callback(null, true);
    }
    
    return callback(null, true);
  },
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
app.use("/workouts", workoutRoutes);
app.use("/mail", mailRoutes);
app.use("/user", userRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;
