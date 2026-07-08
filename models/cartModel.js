const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    items: [
        {
            foodItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FoodItem",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: [1, "Quantity cannot be less than 1"]
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
const cart = mongoose.model("Cart", cartSchema);
module.exports = cart;
