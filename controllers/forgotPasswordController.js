// controllers/forgotPasswordController.js
const nodemailerConfig = require("../config/nodemailer-config");
const bcrypt = require("bcrypt");
const path = require("path");

exports.renderForgotPasswordForm = (req, res) => {
  res.render("forgot-password-popup");
};

exports.processForgotPasswordForm = (req, res) => {
  const { email } = req.body;

  // Generate a unique reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = Date.now() + 3600000; // Token expires in 1 hour

  // Update the user's record in the database with the reset token and expiration time
  const updateQuery = `
    UPDATE Users
    SET reset_token = ?, reset_token_expires_at = ?
    WHERE email = ?
  `;

  db.query(
    updateQuery,
    [resetToken, new Date(resetTokenExpiresAt), email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      // Send an email with the reset link
      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      const mailOptions = {
        from: "your_email@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: ${resetLink}`,
      };

      nodemailerConfig.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Internal Server Error");
        }

        console.log("Email sent: " + info.response);
        res.render("forgot-password-popup", {
          successMessage: "Reset link sent successfully!",
        });
      });
    }
  );
};
