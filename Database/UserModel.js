const mongoose = require("mongoose");
const shortid =require("shortid")


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define the user Schema
const userSchema = new Schema({
  user_id: {
    type: String,
    default:shortid.generate,
    required: true,
  },
  username: {
    type: String,
    required: true,
    max: [30, "username must not exceed 30 characters"]
  },

  email: {
    type: String,
    required: true,
    unique: false
  },
  dob:{
    type: Date,
    required: true
  },

  createdAt:{
    type:Date,
    default: new Date()}
});



const userModel = mongoose.model('User', userSchema);


module.exports = { userModel };
