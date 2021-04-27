const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },

  super_user: {
    type: Boolean,
    required: true,
    default: false,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

//create model
const User = mongoose.model("user", UserSchema);

module.exports = User;
