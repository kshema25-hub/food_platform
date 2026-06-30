const mongoose = require("mongoose");
const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"plse enter food item name"],
        trim: true,
        maxlength: [100, "food item name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true,"plse enter food item price"],
        maxlength: [5, "food item price cannot exceed 5 characters"],
        default: 0.0
    }
})
    module.exports = mongoose.model("FoodItem", foodItemSchema);