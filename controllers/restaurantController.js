const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Restaurant = require("../models/restaurent");
const APIFeatures = require("../utils/apiFeatures");

// get all restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Restaurant.find(), req.query).search().filter();
    const restaurants = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: restaurants.length,
        restaurants,
    })
});
