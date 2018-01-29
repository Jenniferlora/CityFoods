const router = require("express").Router();
const restaurantsModel = require("../models/restaurants.js");

router.get(
	"/restaurants",
	restaurantsModel.allRestaurants,
	(req, res, next) => {
		console.log("hitting restaurants/");
		res.render("restaurants", res.locals.allRestaurantsData);
	}
);

router.get("/", (req, res, next) => {
	res.render("main");
});

module.exports = router;
