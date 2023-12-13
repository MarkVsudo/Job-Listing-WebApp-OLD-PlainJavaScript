const express = require("express");
const router = express.Router();
const formController = require("../controllers/vocationEmailController");
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

module.exports = router;
