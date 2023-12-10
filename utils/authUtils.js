const jwt = require("jsonwebtoken");

// Secret key for signing tokens
const JWT_SECRET = process.env.JWT_SECRET;

function createAuthToken(user, expiresIn = "1d") {
  return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn,
  });
}

module.exports = { createAuthToken };
