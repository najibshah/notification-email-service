const { default: accessEnv } = require("../src/helpers/accessEnv");
var Mailgun = require("mailgun-js");

//API key for mailgun
const apiKey = accessEnv("MAILGUN_API_KEY");
//Domain for mailgun
const domainUrl = accessEnv("MAILGUN_DOMAIN_URL");
//From-Who address for mailgun
const fromWho = accessEnv("FROM_WHO");
//Admin email address for mailgun
const adminEmail = accessEnv("ADMIN_EMAIL");

export function sendEmails(req, res) {
  const mailgun = new Mailgun({ apiKey: apiKey, domain: domainUrl });
  // Email data for user email
  const userMessageData = {
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

  // Email data for admin email
  const adminMessageData = {
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

  // Sends email to User
  mailgun.messages().send(userMessageData, function (err, body) {
    if (err) {
      res.status(400).json(err);
      console.log("got an error: ", err);
    } else {
      res.status(200).json({ email: req.body.mail });
      console.log(body);
    }
  });

  // Sends mail to Admin
  mailgun.messages().send(adminMessageData, function (err, body) {
    if (err) {
      console.log("got an error: ", err);
    } else {
      console.log(body);
    }
  });
}
