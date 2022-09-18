const express = require("express");
const router = express.Router();

var Mailgun = require("mailgun-js");
//API key for mailgun
var apiKey = process.env.MAILGUN_API_KEY;
//Domain for mailgun
var domainUrl = process.env.MAILGUN_DOMAIN_URL;
//From-Who address for mailgun
var fromWho = process.env.FROM_WHO;
//Admin email address for mailgun
var adminEmail = process.env.ADMIN_EMAIL;

// @route   GET /test
// @desc    Tests notification email get route
// @access  Public
router.get("/test", (req, res) => {
  console.log("moti works");
  res.json({ msg: "Notification get works" });
});

// @route   POST /test
// @desc    Tests notification email post route
// @access  Public
router.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ msg: "Notification Post works" });
});

// @route   POST /test
// @desc    Send a message to the specified email address
// @access  Public
router.post("/submit/", function (req, res) {
  var mailgun = new Mailgun({ apiKey: apiKey, domain: domainUrl });
  // Email data for user email
  var data = {
    from: fromWho,
    // User email data
    to: req.body.mail,
    // Subject and text data
    subject: "Greetings Earthling!",
    text:
      "Greetings " +
      req.body.mail +
      ", your form was successfully sent to and saved in our application",
  };

  // Sends email to User
  mailgun.messages().send(data, function (err, body) {
    if (err) {
      res.status(400).json(err);
      console.log("got an error: ", err);
    } else {
      res.status(200).json({ email: req.body.mail });
      console.log(body);
    }
  });

  // Email data for admin email
  var data2 = {
    from: fromWho,
    // Admin email data
    to: adminEmail,
    // Subject and text data
    subject: "Greetings Admin!",
    text:
      "Hello Admin, There's been a new form submission to our database by " +
      req.body.mail +
      ". Go check it out as soon as you can.",
  };
  // Sends mail to Admin
  mailgun.messages().send(data2, function (err, body) {
    if (err) {
      console.log("got an error: ", err);
    } else {
      console.log(body);
    }
  });
});

module.exports = router;
