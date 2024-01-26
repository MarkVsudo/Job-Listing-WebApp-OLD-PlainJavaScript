const jwt = require("jsonwebtoken");
require("dotenv").config();

// Secret key for signing tokens
const JWT_SECRET = process.env.JWT_SECRET;

function createAuthToken(user, remember) {
  // Default JWT expiration
  let expiresIn = "1d";

  // If the "remember" checkbox is checked, set expiration to 30 days
  if (remember) {
    expiresIn = "30d";
  }

  return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn,
  });
}

module.exports = { createAuthToken };
