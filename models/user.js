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
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,

 
},
{timestamps: true}
);
// hash password
// pre("save") => runs before data is saved
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmation = undefined;
});
// pass compare
userSchema.methods.comparePassword = async function (candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// check if password is changed after token is issued
// if yes,the old token is invalid and must log in again to get a new token
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
// custom method to generate jwt token
userSchema.methods.generateJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};
module.exports = mongoose.model("User", userSchema);
