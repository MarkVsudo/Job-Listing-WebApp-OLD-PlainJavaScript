const express = require("express");
const dbConnection = require("../config/db-config");
const { authenticateToken } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const User = require("../models/user");
const router = express.Router();

router.use("/", authController);

router.get("/", authenticateToken, (req, res) => {
  res.render("index", { title: "JobConqueror - Homepage", user: req.user });
});

router.get("/blog", authenticateToken, (req, res) => {
  res.render("blog", { title: "JobConqueror - Blog", user: req.user });
});

router.get("/recommendations", authenticateToken, (req, res) => {
  res.render("recommendations", {
    title: "JobConqueror - Recommendations",
    user: req.user,
  });
});

router.get("/contact-us", authenticateToken, (req, res) => {
  res.render("contact-us", {
    title: "JobConqueror - Contact us",
    user: req.user,
  });
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
  // Perform a database query to retrieve company data
  dbConnection.query("SELECT * FROM companies", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Pass the retrieved data to the rendering function
    res.render("company-overview", {
      title: "JobConqueror - Company Overview",
      user: req.user,
      companies: results,
    });
  });
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
      founded_year,
      contact_email,
      contact_phone,
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
      founded_year,
      contact_email,
      contact_phone,
    });

    res.redirect("/dashboard");
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
