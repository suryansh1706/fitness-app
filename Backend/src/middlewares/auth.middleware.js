const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const jwtToken = req.cookies.jwtToken;

  if (!jwtToken) {
    console.log('❌ No token found in cookies');
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
