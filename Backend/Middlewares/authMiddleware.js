const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const jwtToken = req.headers.authorization?.split(" ")[1];

  if (!jwtToken) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};