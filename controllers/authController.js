const express = require("express");
const { comparePasswords, hashPassword } = require("../utils/bcryptUtils");
const { createAuthToken } = require("../utils/authUtils");
const User = require("../models/user");
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

module.exports = router;
