const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  signupController,
  loginController,
  verifyTokenController,
  verifyController,
} = require("../controllers/auth.controller");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/validation.middleware");
const ensureAuth = require("../middlewares/auth.middleware");

// Local Authentication Routes
router.post("/login", loginValidation, loginController);
router.post("/signup", signupValidation, signupController);
router.get("/verify-email", verifyTokenController);
router.get("/verify", ensureAuth, verifyController);

// OAuth Routes (Google)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const jwtToken = jwt.sign(
      { email: req.user.email, _id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.redirect("http://127.0.0.1:5500/Frontend/public/dashboard.html");
  },
);

module.exports = router;
