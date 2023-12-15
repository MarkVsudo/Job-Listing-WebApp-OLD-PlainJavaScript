const express = require("express");
const router = express.Router();
const formController = require("../controllers/vocationEmailController");
const forgotPasswordController = require("../controllers/forgotPasswordController");
const multer = require("multer");
const { authenticateToken } = require("../middleware/authMiddleware");

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define form-related routes
router.get("/form", authenticateToken, formController.renderForm);
router.post(
  "/process",
  authenticateToken,
  upload.single("resume"),
  formController.processForm
);

// Define forgot password-related routes
router.get(
  "/forgot-password",
  authenticateToken,
  forgotPasswordController.renderForgotPasswordForm
);
router.post(
  "/forgot-password",
  authenticateToken,
  forgotPasswordController.processForgotPasswordForm
);
module.exports = router;
