const express = require("express");
// const connection = require("./config/db-config");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "JobConqueror - Homepage" });
});

module.exports = router;
