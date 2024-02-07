const express = require('express');
const controller = require('../Controller/birthday.controller')

const userRouter = express.Router();


// // Employee DOB Registration

// userRouter.get('/index', (req, res) => {
//   res.render('index'); 
// });


// userRouter.get('/dob', (req, res) => {
//     res.render('birthday'); 
//   });



  
//   userRouter.get('/thankyou', (req, res) => {
//     res.render('thankyou'); 
//   });



//   userRouter.post('/dob', async (req, res) => {
//     const dobData = {
//         username: req.body.username,
//         email: req.body.email,
//         dob: req.body.dob
//     }

//     console.log(dobData)

//     const response = await controller.RegisterDob (dobData)

//     if (response.code === 201) {
//         res.redirect("thankyou"); 
//     } else {
//         res.render('birthday', { error: response.message});
//     }
// });


// Define middleware functions
const renderIndex = (req, res, next) => {
  res.render('index');
};

const renderBirthday = (req, res, next) => {
  res.render('birthday');
};

const renderThankyou = (req, res, next) => {
  res.render('thankyou');
};

const handleDobRegistration = async (req, res, next) => {
  const dobData = {
    username: req.body.username,
    email: req.body.email,
    dob: req.body.dob
  };

  console.log(dobData);

  const response = await controller.RegisterDob(dobData);

  if (response.code === 201) {
    res.redirect("thankyou");
  } else {
    res.render('birthday', { error: response.message });
  }
};

// Route definitions using middleware functions
userRouter.get('/index', renderIndex);
userRouter.get('/dob', renderBirthday);
userRouter.get('/thankyou', renderThankyou);
userRouter.post('/dob', handleDobRegistration);



  

module.exports = {userRouter}