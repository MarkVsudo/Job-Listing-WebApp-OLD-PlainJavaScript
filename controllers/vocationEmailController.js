require("dotenv").config();
const nodemailerConfig = require("../config/nodemailer-config");
const path = require("path");

exports.renderForm = (req, res) => {
  res.render("index");
};

exports.processForm = (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_EMAIL,
    subject: "Job Application Submission",
    text: "Please find the attached resume and cover letter.",
    attachments: [
      {
        filename: "resume.pdf",
        content: req.file.buffer,
        encoding: "base64",
      },
    ],
  };

  // Send email
  nodemailerConfig.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
};
