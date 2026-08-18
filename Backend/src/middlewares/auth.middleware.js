const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis");

module.exports = async (req, res, next) => {
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
    // Check if token has been revoked/blacklisted in Redis
    if (redisClient.isOpen) {
      const isBlacklisted = await redisClient.get(`bl:${jwtToken}`);
      if (isBlacklisted) {
        return res.status(401).json({ message: "Token revoked" });
      }
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.userId = decoded._id;
    req.jwtToken = jwtToken;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
