const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
router.route("/").get(restaurantController.getAllRestaurants);
router.route("/:id").get(restaurantController.getRestaurantById);
module.exports = router;
