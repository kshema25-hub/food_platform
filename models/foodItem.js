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
    },
description: {
    type: String,
    required: true,
    },
ratings: {
    type: Number,
    default: 0
    },
images: [
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
],
menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu"
},
stock: {
    type: Number,
    required: [true, "Please enter food item stock"],
    maxlength: [5, "Food item stock cannot exceed 5 characters"],
    default: 0
},
restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
},
numberOfReviews: {
    type: Number,
    default: 0
},
reviews: [
    {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
     name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
createdAt: {
    type: Date,
    default: Date.now()
  }



})
module.exports = mongoose.model("FoodItem", foodItemSchema);
//fooditems