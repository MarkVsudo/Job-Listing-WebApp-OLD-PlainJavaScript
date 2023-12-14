require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    // No token found, but continue to the next middleware or route
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Invalid token, but continue to the next middleware or route
      return next();
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
