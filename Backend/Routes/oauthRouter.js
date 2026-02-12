const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Google callback → JWT
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`http://localhost:5000/get_started?token=${token}`);
  }
);

module.exports = router;