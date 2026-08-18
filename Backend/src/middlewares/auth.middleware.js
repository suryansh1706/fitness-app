const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let jwtToken = req.cookies ? req.cookies.jwtToken : null;

  if (!jwtToken && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      jwtToken = authHeader.split(" ")[1];
    } else {
      jwtToken = authHeader;
    }
  }

  if (!jwtToken) {
    console.log('No token found in cookies or authorization header');
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
