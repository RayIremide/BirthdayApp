const express = require("express");
require("dotenv").config();
const mongoDB = require("./Database/connect.db");
const employeeEmail = require("./Controller/birthday.controller");
const router = require("./Router/userRoute");
const cron = require("node-cron");
const path = require("path");



const app = express();
const PORT = process.env.PORT;

// Connecting to mongoDB
mongoDB.connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("Views", path.join(__dirname, "Views"));
app.use("/employee", router.userRouter);

// home route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "success", status: true });
});

app.get("/sendemail", employeeEmail.getEmployeeEmail);

// Set up cron job to send email every minute
cron.schedule("* 7 * * *", async () => {
  try {
    console.log("Sending email to employees...");
    await employeeEmail.getEmployeeEmail();
    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
