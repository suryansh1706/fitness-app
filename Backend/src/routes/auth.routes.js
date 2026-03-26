const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { signupController, loginController, verifyTokenController, verifyController } = require("../controllers/auth.controller");
const { signupValidation, loginValidation } = require("../middlewares/validation.middleware");
const ensureAuth = require("../middlewares/auth.middleware");

// Local Authentication Routes
router.post("/login", loginValidation, loginController);
router.post("/signup", signupValidation, signupController);
router.get("/verify-email", verifyTokenController);
router.get("/verify", ensureAuth, verifyController);

// OAuth Routes (Google)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const jwtToken = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      path: "/"
    });
    res.redirect("http://localhost:5500/Frontend/public/dashboard.html");
  }
);

module.exports = router;
