const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('./Database/UserModel'); 
require("dotenv").config();


cron.schedule('* * * * *', async () => {
  
  console.log("Task running every minutes")

  // Fetch employees with birthdays today
  const today = new Date();
  const employeesWithBirthday = await User.userModel.find({ dob: { $eq: today } });
  

  // Send birthday emails
  employeesWithBirthday.forEach((employee) => {
    sendBirthdayEmail(employee.email, employee.username);
  });
});



async function sendBirthdayEmail(toEmail, username) {
  // Set up your nodemailer transporter (provide your email configuration)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  // Set up your email content
  const mailOptions = {
    from: process.env.USER,
    to: toEmail,
    subject: 'Happy Birthday!',
    text: `Dear ${username},\n\nHappy Birthday! Wishing you a fantabulous year. 🎉🎂`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
