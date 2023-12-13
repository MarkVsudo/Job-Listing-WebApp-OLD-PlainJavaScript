require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
