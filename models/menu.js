const mongoose = require("mongoose");
const foodItemSchema = new mongoose.Schema({
    menu: [
        {
            category: {
                type: String,
                required: [true, "Please provide a category for the menu item"],
            },
            items: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "FoodItem",
                    required: true,
        }
    ]
}
],
restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
},
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
)
    module.exports = mongoose.model("FoodItem", foodItemSchema);
    module.exports = menu