const express = require("express");
// const connection = require("./config/db-config");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "JobConqueror - Homepage" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "JobConqueror - Sign in" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "JobConqueror - Sign up" });
});

router.get("/blog", (req, res) => {
  res.render("blog", { title: "JobConqueror - Blog" });
});

router.get("/about-us", (req, res) => {
  res.render("about-us", { title: "JobConqueror - About us" });
});

router.get("/company-overview", (req, res) => {
  res.render("company-overview", { title: "JobConqueror - Company Overview" });
});

router.get("/contact-us", (req, res) => {
  res.render("contact-us", { title: "JobConqueror - Contact us" });
});

router.get("/customer-support", (req, res) => {
  res.render("customer-support", { title: "JobConqueror - FAQ" });
});

router.get("/job-listings", (req, res) => {
  res.render("job-listings", { title: "JobConqueror - Job Board" });
});

router.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy", { title: "JobConqueror - Privacy Policy" });
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "JobConqueror - Profile" });
});

module.exports = router;
