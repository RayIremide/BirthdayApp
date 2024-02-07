const User = require("../Database/UserModel");
require("dotenv").config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//Get Employee Date of Birth

const RegisterDob = async ({ username, email, dob }) => {
  const employeeDob = { username, email, dob };
  try {
    const dob = await User.userModel.create(employeeDob);
    return {
      message: "Employee Dob Registered successfully",
      code: 201,
      data: { employeeDob: dob },
    };
  } catch (error) {
    console.error(error);
    return {
      message: "DOB Registration failed",
      code: 500,
    };
  }
};



const getEmployeeEmail = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    // Fetch all employee emails from the database
    const allEmployeeEmails = await User.userModel.find(
      { dob: { $gte: startOfDay, $lt: endOfDay } }, 
      { email: 1 }
    );

    console.log(allEmployeeEmails);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    // Define email options
    const mailOptions = {
      from: {
        name: "IREMIDE DAELITES",
        address: process.env.USER,
      },
      to: allEmployeeEmails,
      subject: "Happy Birthday to you",
      text: `Happy Birthday! Wishing you a fantabulous year. 🎉🎂`,
      html: "<b>Happy Birthday! Wishing you a fantabulous year</b>",
    };

    // Send email to each employee
    // Send email to each employee
    for (const employee of allEmployeeEmails) {
      const { email } = employee;
      mailOptions.to = email;
      // Send email
      await transporter.sendMail(mailOptions);
    }

    return {
      code: 200,
      success: true,
      message: "Email sent to all employees successfully",
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: "Error sending email to employees",
      error: error.message,
    };
  }
};

module.exports = {
  RegisterDob,
  getEmployeeEmail,
};
