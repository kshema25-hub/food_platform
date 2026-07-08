const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name for the restaurant"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: [true, "please provide an address for the restaurant"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
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
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

restaurantSchema.index({ location: "2dsphere" });
restaurantSchema.index({ name: "text", address: "text" });

module.exports = mongoose.model("Restaurant", restaurantSchema);
