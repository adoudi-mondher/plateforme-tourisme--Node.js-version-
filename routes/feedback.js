const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// --- Multer config ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Feedback page
router.get("/feedback", feedbackController.getFeedbackPage);

// Submit feedback
router.post("/submit_feedback", upload.single("visitorMedia"), feedbackController.submitFeedback);

// My feedback
router.get("/my_feedback", feedbackController.getMyFeedback);

module.exports = router;
