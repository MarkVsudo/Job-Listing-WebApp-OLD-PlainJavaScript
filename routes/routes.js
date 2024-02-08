const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Middleware and Controllers
const { authenticateToken } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const nodemailerConfig = require("../config/nodemailer-config");
const dbConnection = require("../config/db-config");
const User = require("../models/user");

// Authentication Routes
router.use("/", authController);

// Home Page
router.get("/", authenticateToken, (req, res) => {
  res.render("index", { title: "JobConqueror - Homepage", user: req.user });
});

// Other Pages
router.get("/who-we-are", authenticateToken, (req, res) => {
  res.render("who-we-are", {
    title: "JobConqueror - Who We Are",
    user: req.user,
  });
});

router.get("/recommendations", authenticateToken, (req, res) => {
  // Read the JSON file
  const jsonPath = path.join(
    __dirname,
    "..",
    "public",
    "json",
    "articles.json"
  );
  const articleData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  res.render("recommendations", {
    title: "JobConqueror - Recommendations",
    user: req.user,
    articleData,
  });
});

router.get("/contact-us", authenticateToken, (req, res) => {
  res.render("contact-us", {
    title: "JobConqueror - Contact us",
    user: req.user,
  });
});

// Contact Us Form Submission
router.post("/contact-us-form", authenticateToken, (req, res) => {
  const { contactLastName, contactEmail, contactMessage } = req.body;

  const mailOptions = {
    from: contactEmail,
    to: process.env.EMAIL_EMAIL,
    subject: "User form submission in contact us page",
    text: `Name: ${contactLastName}\nEmail: ${contactEmail}\nMessage: ${contactMessage}`,
  };

  nodemailerConfig.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Email sent:", info.response);
  });

  res.send("Email sent successfully!");
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
  dbConnection.query("SELECT * FROM companies", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    res.render("company-overview", {
      title: "JobConqueror - Company Overview",
      user: req.user,
      companies: results,
    });
  });
});

router.get("/company/:companyName", authenticateToken, (req, res) => {
  const companyName = req.params.companyName;
  const currentUrl = req.originalUrl;

  dbConnection.query("SELECT * FROM companies", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    res.render("company", {
      title: `${companyName} | Company Overview`,
      companyName: companyName,
      currentUrl: currentUrl,
      user: req.user,
      companies: results,
    });
  });
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

router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email;

    // Find the user by email to get the user ID
    const user = await User.findByEmail(userEmail);

    if (!user) {
      // Handle case where user is not found (you might redirect or show an error message)
      console.error("User not found");
      res.status(404).send("User not found");
      return;
    }

    const userId = user.user_id;

    // Check if the user is a recruiter
    if (req.user.role === "recruiter") {
      // Check if the recruiter is verified
      const isVerified = await User.isRecruiterVerified(userId);

      console.log("isVerified:", isVerified);
      console.log("userId:", userId);

      if (!isVerified) {
        res.redirect("/verify-employer");
        return; // Add a return statement to prevent further execution
      }
    }

    // If the user is not a recruiter or is a verified recruiter, render the dashboard
    res.render("dashboard", {
      title: "JobConqueror - Dashboard",
      user: req.user,
    });
  } catch (error) {
    // Handle error appropriately (e.g., log it, send an error response)
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/verify-employer", authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findByEmail(userEmail);
    const userId = user.user_id;
    const isVerified = await User.isRecruiterVerified(userId);

    if (req.user.role !== "recruiter" || isVerified) {
      res.redirect("/dashboard");
    } else {
      res.render("verify-employer", {
        title: "JobConqueror - Verify Employer",
        user: req.user,
      });
    }
  } catch (error) {
    console.error("Error in /verify-employer route:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/verify-employer", authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findByEmail(userEmail);

    // Extract company-related data from the form
    const {
      name,
      industry,
      size,
      headquarters,
      website,
      logo,
      banner,
      description,
      company_perks,
      company_images,
      founded_year,
      contact_email,
      contact_phone,
      linkedIn_url,
      num_employees,
    } = req.body;

    // Call the handleCompanyVerification method
    await User.handleCompanyVerification(user, {
      name,
      industry,
      size,
      headquarters,
      website,
      logo,
      banner,
      description,
      company_perks,
      company_images,
      founded_year,
      contact_email,
      contact_phone,
      linkedIn_url,
      num_employees,
    });

    const companyName = req.body.name;
    const companyUrl = companyName.toLowerCase().replace(/\s+/g, "-");

    // res.redirect("/dashboard");
    res.redirect(`/company/${companyUrl}`);
  } catch (error) {
    console.error("Error in /verify-employer POST route:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy", { title: "JobConqueror - Privacy Policy" });
});

router.get("/profile", (req, res) => {
  res.render("profile", { title: "JobConqueror - Profile" });
});

// Error Pages
router.get("/not-found", (req, res) => {
  res.render("/not-found", { title: "JobConqueror - 404 Not Found" });
});

router.get("*", (req, res) => {
  res
    .status(404)
    .render("not-found", { title: "JobConqueror - 404 Not Found" });
});

module.exports = router;
