const express = require("express");
const router = express.Router();
const { sendEmails } = require("../functions/send-emails");

// @route   GET /test
// @desc    Tests notification email get route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Notification get works" }));

// @route   POST /test
// @desc    Tests notification email post route
// @access  Public
router.post("/test", (req, res) =>
  res.json({ msg: "Notification Post works" })
);

// @route   POST /submit
// @desc    Send a message to the specified email address
// @access  Public
router.post("/submit/", (req, res) => sendEmails(req, res));

module.exports = router;
