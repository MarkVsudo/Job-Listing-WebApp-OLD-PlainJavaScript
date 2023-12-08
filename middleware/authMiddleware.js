const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  jwt.verify(token, "process.env.JWT_SECRET", (err, user) => {
    if (err) {
      return res.redirect("/login");
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
