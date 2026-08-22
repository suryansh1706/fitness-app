const { signup, login, logout, verifyEmailToken } = require("../services/auth.service");

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
  const isProduction = process.env.NODE_ENV === "production";
  const pathPrefix = isProduction ? "" : "/Frontend/public";
  try {
    await verifyEmailToken(req.query.token);
    return res.redirect(`${frontendUrl}${pathPrefix}/login.html`);
  } catch (error) {
    return res.redirect(`${frontendUrl}${pathPrefix}/error.html`);
  }
};

const verifyController = (req, res) => {
  res.status(200).json({ authenticated: true });
};

const logoutController = async (req, res) => {
  try {
    const jwtToken = req.jwtToken || (req.cookies ? req.cookies.jwtToken : null);
    if (jwtToken) {
      await logout(jwtToken);
    }
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("jwtToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Logout failed" });
  }
};

module.exports = {
  signupController,
  loginController,
  verifyTokenController,
  verifyController,
  logoutController,
};
