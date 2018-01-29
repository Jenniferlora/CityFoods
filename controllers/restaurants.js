const router = require("express").Router();
const restaurantsModel = require("../models/restaurants.js");

router.get(
	"/restaurants",
	restaurantsModel.allCities,
	restaurantsModel.allRestaurants,
	(req, res, next) => {
		console.log("hitting restaurants/");
		res.render("restaurants", {
			cityId: res.locals.allCitiesData.location_suggestions.id,
			allRestaurantsData: res.locals.allRestaurantsData,
			allCitiesData: res.locals.allCitiesData
		});
	}
);

// router.get("/restaurants", restaurantsModel.allCities, (req, res, next) => {
// 	console.log("hitting cities/");
// 	res.send(res.locals.allCitiesData);
// });

// router.get(
// 	"/restaurants",
// 	restaurantsModel.allRestaurants,
// 	(req, res, next) => {
// 		console.log("hitting restaurants/");
// 		res.render("restaurants", res.locals.allRestaurantsData);
// 	}
// );

router.get("/", (req, res, next) => {
	res.render("main");
});

module.exports = router;
