const { signup, login, verifyEmailToken } = require("../services/auth.service");

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await signup(username, email, password);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwtToken", result.jwtToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json(result);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const verifyTokenController = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5500";
  try {
    await verifyEmailToken(req.query.token);
    return res.redirect(`${frontendUrl}/Frontend/public/login.html`);
  } catch (error) {
    return res.redirect(`${frontendUrl}/Frontend/public/error.html`);
  }
};

const verifyController = (req, res) => {
  res.status(200).json({ authenticated: true });
};

module.exports = {
  signupController,
  loginController,
  verifyTokenController,
  verifyController,
};
