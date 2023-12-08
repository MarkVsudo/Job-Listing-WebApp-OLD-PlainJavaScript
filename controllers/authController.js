const express = require("express");
const jwt = require("jsonwebtoken");
const { comparePasswords } = require("../utils/bcryptUtils");
const User = require("../models/user");
require("dotenv").config();
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      "process.env.JWT_SECRET"
    );
    res.cookie("token", token);
    res.redirect("/blog"); // Change this to your actual dashboard route
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
      return res.status(400).send("Email is already registered");
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

    // Redirect to the login page after successful registration
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
