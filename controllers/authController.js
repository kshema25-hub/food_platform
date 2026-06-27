// import required packages,files
const user = require("../models/user");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const cloudinary = require("cloudinary");
const crypto = require("crypto");

//signup
exports.signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, passwordConfirmation, phonenumber } = req.body;
  let avatar = {};
  // avator not provided during regisration
  if (!req.body.avatar || req.body.avatar === "/images/images.png") {
    avatar = {
      public_id: "default",
      url: "/images/images.png",
    };
  } else {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  const User = await user.create({
    name,
    email,
    password,
    passwordConfirmation,
    phonenumber,
    avatar,
  });
  sendToken(User, 200, res);
});

//login
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler("Please enter email and password", 400));
  }
  const User = await user.findOne({ email }).select("+password");
  if (!User) {
    return next(new errorHandler("Invalid email or password", 401));
  }
  const ispasswordMatched = await User.comparePassword(password, User.password);
  if (!ispasswordMatched) {
    return next(new errorHandler("Invalid email or password", 401));
  }
  sendToken(User, 200, res);
});
