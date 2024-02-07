const express = require('express');
const controller = require('../Controller/birthday.controller')

const userRouter = express.Router();


// Employee DOB Registration

userRouter.get('/dob', (req, res) => {
    res.render('birthday'); 
  });

  
  userRouter.get('/thankyou', (req, res) => {
    res.render('thankyou'); 
  });



  userRouter.post('/dob', async (req, res) => {
    const dobData = {
        username: req.body.username,
        email: req.body.email,
        dob: req.body.dob
    }

    console.log(dobData)

    const response = await controller.RegisterDob (dobData)

    if (response.code === 201) {
        res.redirect("thankyou"); 
    } else {
        res.render('birthday', { error: response.message});
    }
});





  

module.exports = {userRouter}