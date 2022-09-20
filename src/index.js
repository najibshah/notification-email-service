require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const notificationEmail = require("../routes/notification-email");
const bodyParser = require("body-parser");
const { default: accessEnv } = require("./helpers/accessEnv");

const app = express();
const port = accessEnv("PORT") || 4535;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use("/", notificationEmail);

// test routes
app.get("/", (req, res) => {
  res.send("You've reached the notification-email service");
});
app.post("/", (req, res) => {
  res.send("You've reached the notification-email service");
});
app.listen(port, () => {
  console.log(`Notification Email service is now running at port: ${port}`);
});
