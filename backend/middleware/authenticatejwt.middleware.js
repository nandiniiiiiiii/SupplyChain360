const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token is invalid (logged out)' });
  }

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user; // Attach decoded user info to request object
    next();
  });
};

module.exports = { authenticateJWT };
