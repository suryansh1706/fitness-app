const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  signupController,
  loginController,
  verifyTokenController,
  verifyController,
  logoutController,
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
router.post("/logout", ensureAuth, logoutController);

// OAuth Routes (Google)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
      const isProduction = process.env.NODE_ENV === "production";
      const frontendUrl = process.env.FRONTEND_URL || (isProduction ? "https://yourfitnessguide.vercel.app" : "http://localhost:5500");
      const cleanFrontendUrl = frontendUrl.replace(/\/$/, "");

      if (err || !user) {
        console.error("Google OAuth error:", err || info);
        const loginPage = isProduction ? `${cleanFrontendUrl}/login.html?error=auth_failed` : `${cleanFrontendUrl}/Frontend/public/login.html?error=auth_failed`;
        return res.redirect(loginPage);
      }

      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.cookie("jwtToken", jwtToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const targetUrl = isProduction ? `${cleanFrontendUrl}/dashboard.html?token=${jwtToken}` : `${cleanFrontendUrl}/Frontend/public/dashboard.html?token=${jwtToken}`;
      res.redirect(targetUrl);
    })(req, res, next);
  },
);

module.exports = router;
