const express = require("express");
const { comparePasswords, hashPassword } = require("../utils/bcryptUtils");
const { createAuthToken } = require("../utils/authUtils");
const nodemailerConfig = require("../config/nodemailer-config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const crypto = require("crypto");
require("dotenv").config();
const router = express.Router();
const flash = require("express-flash");

router.use(flash());

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user || !(await comparePasswords(password, user.password))) {
      // Use flash for error message
      req.flash("error", "Invalid email or password");
      return res.redirect("/login");
    }

    // Create authentication token
    const token = createAuthToken(user);

    // Set the token as a cookie
    res.cookie("token", token);

    // Flash success message
    req.flash("success", "You successfully logged in.");

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  const { email, password, fullName, role, subscribe } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      // Use flash for error message
      req.flash("error", "Email is already registered");
      return res.redirect("/register");
    }

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Create a new user object
    const newUser = {
      email,
      password: hashedPassword,
      fullName,
      role: role === "on" ? "recruiter" : "applicant",
      subscribed: subscribe === "on" ? 1 : 0,
    };

    // Save the new user to the database
    await User.createUser(newUser);

    // Use flash for success message
    req.flash("success", "Registration successful! Please log in.");
    // Redirect to the login page after successful registration
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/logout", (req, res) => {
  // Clear the authentication token by removing the cookie
  res.clearCookie("token");
  // Redirect to the home page or any other desired page
  res.redirect("/");
});

// Function to generate a unique reset token
function generateResetToken(email) {
  return new Promise((resolve, reject) => {
    const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes
    const payload = { email, exp: expirationTime };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        reject(err);
      } else {
        console.log("Generated Token:", token);
        resolve(token);
      }
    });
  });
}

router.post("/forgot-password", async (req, res) => {
  const { "reset-email": email } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      req.flash("error", "No user found with that email address");
      return res.redirect("/login");
    }

    // Generate a unique reset token
    const resetToken = await generateResetToken(email);

    // Update the user with the reset token
    await User.updateResetToken(email, resetToken);

    // Send the reset email
    sendResetEmail(email, resetToken);

    // Flash success message
    req.flash("success", "Password reset email sent successfully.");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Include the reset password route
router.get("/reset-password", async (req, res) => {
  const { email, token } = req.query;

  try {
    // Verify the token and check if it's still valid
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token matches the expected email
    if (decodedToken.email !== email) {
      console.error("Invalid token for the specified email");
      throw new Error("Invalid token for the specified email");
    }

    // Check if the token has expired
    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      console.error("Reset token has expired");
      throw new Error("Reset token has expired");
    }

    // Render the reset password page with the email and token
    res.render("reset-password", {
      title: "Reset Password",
      email,
      resetToken: token,
    });
  } catch (error) {
    console.error("Error in /reset-password route:", error);
    res.status(400).send(error.message);
  }
});

// Add a new route to handle the password reset form submission
router.post("/reset-password", async (req, res) => {
  const { email, resetToken, password, confirmPassword } = req.body;

  try {
    // Check if the passwords match
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect(`/reset-password?email=${email}&token=${resetToken}`);
    }

    // Verify the reset token and retrieve user
    const user = await User.findByEmail(email);

    if (!user || user.reset_token !== resetToken) {
      req.flash("error", "Invalid reset token");
      return res.redirect(`/reset-password?email=${email}&token=${resetToken}`);
    }

    // Add your logic to handle password update
    // For example, hash the new password and update the database
    const hashedPassword = await hashPassword(password);
    await User.updatePasswordAndResetToken(email, hashedPassword, null);

    // Flash success message
    req.flash("success", "Password reset successfully.");
    res.redirect("/login");
  } catch (error) {
    console.error("Error in /reset-password route:", error);
    req.flash("error", "Error resetting password");
    res.redirect(`/reset-password?email=${email}&token=${resetToken}`);
  }
});

function sendResetEmail(email, resetToken) {
  const mailOptions = {
    from: process.env.EMAIL_EMAIL,
    to: email,
    subject: "Password Reset (valid 15 minutes)",
    html: `Click the following link to reset your password: <a href="http://localhost:5000/reset-password?email=${email}&token=${resetToken}">Reset Password</a>`,
  };

  nodemailerConfig.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = router;
