const express = require("express");
const connection = require("../config/db-config");
const { authenticateToken } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const router = express.Router();

router.use("/", authController);

router.get("/", authenticateToken, (req, res) => {
  res.render("index", { title: "JobConqueror - Homepage", user: req.user });
});

router.get("/blog", authenticateToken, (req, res) => {
  res.render("blog", { title: "JobConqueror - Blog", user: req.user });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "JobConqueror - Sign in" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "JobConqueror - Sign up" });
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

router.get("/job-listings", authenticateToken, (req, res) => {
  res.render("job-listings", {
    title: "JobConqueror - Job Board",
    user: req.user,
  });
});

router.get("/dashboard", authenticateToken, (req, res) => {
  res.render("dashboard", {
    title: "JobConqueror - Dashboard",
    user: req.user,
  });
});

router.get("/verify-employer", authenticateToken, (req, res) => {
  res.render("verify-employer", {
    title: "JobConqueror - Verify Employer",
    user: req.user,
  });
});

// router.post("/verify-employer", authenticateToken, (req, res) => {
//   const formData = req.body;

//   // Insert the form data into the 'companies' table
//   const query = `
//     INSERT INTO companies
//     (name, industry, size, headquarters, website, logo, banner, description, founded_year, contact_email, contact_phone)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     formData.name,
//     formData.industry,
//     formData.size,
//     formData.headquarters,
//     formData.website,
//     formData.logo,
//     formData.banner,
//     formData.description,
//     formData.founded_year,
//     formData.contact_email,
//     formData.contact_phone,
//   ];

//   // Use the connection to execute the query
//   connection.query(query, values, (err, results) => {
//     if (err) {
//       console.error("Error inserting data into MySQL:", err);
//       res.status(500).send("Internal Server Error");
//     } else {
//       console.log("Data inserted into MySQL:", results);
//       res.status(200).send("Form submitted successfully");
//     }
//   });
// });

router.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy", { title: "JobConqueror - Privacy Policy" });
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "JobConqueror - Profile" });
});

// Route handler for 404 errors
router.get("/not-found", (req, res) => {
  res.render("/not-found", { title: "JobConqueror - 404 Not Found" });
});

router.get("*", (req, res) => {
  res
    .status(404)
    .render("not-found", { title: "JobConqueror - 404 Not Found" });
});

module.exports = router;
