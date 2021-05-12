const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User schema
const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

// Encrypt password
User.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = mongoose.model("userTable", User);
