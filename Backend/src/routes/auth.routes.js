const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { signupController, loginController } = require("../controllers/auth.controller");
const { signupValidation, loginValidation } = require("../middlewares/validation.middleware");
const { verifyTokenController } = require("../controllers/auth.controller");

// Local Authentication Routes
router.post("/login", loginValidation, loginController);
router.post("/signup", signupValidation, signupController);
router.get("/verify-email", verifyTokenController);

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
      secure: true,
      sameSite: "Strict",
    });
    res.redirect("http://127.0.0.1:5500/Frontend/public/dashboard.html");
  }
);

module.exports = router;
