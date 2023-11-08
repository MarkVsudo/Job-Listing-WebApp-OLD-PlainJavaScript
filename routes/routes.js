const express = require("express");
// const connection = require("./config/db-config");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "JobConqueror - Homepage" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "JobConqueror - Sign In" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "JobConqueror - Sign Up" });
});

module.exports = router;
