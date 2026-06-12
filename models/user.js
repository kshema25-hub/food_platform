// schema
const mongoose = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// step 2 create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
    minLength: [4, "Your name must have at least 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Your password must have at least 8 characters"],
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: [true, "Please confirm your password"],
    minLength: [
      8,
      "Your password confirmation must have at least 8 characters",
    ],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  phonenumber: {
    type: String,
    required: [true, "Please enter your phone number"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
