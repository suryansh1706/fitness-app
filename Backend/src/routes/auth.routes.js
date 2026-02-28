const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { signupController, loginController } = require("../controllers/auth.controller");
const { signupValidation, loginValidation } = require("../middlewares/validation.middleware");

// Local Authentication Routes
router.post("/login", loginValidation, loginController);
router.post("/signup", signupValidation, signupController);

// OAuth Routes (Google)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`http://127.0.0.1:5500/Frontend/landing.html?token=${token}`);
  }
);

module.exports = router;
