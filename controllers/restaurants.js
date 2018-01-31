const router = require("express").Router();
const restaurantsModel = require("../models/restaurants.js");

router.get("/restaurants", restaurantsModel.city, (req, res, next) => {
	console.log("hitting restaurants/");
	res.render("restaurants", {
		cityData: res.locals.cityData,
		allRestaurantsData: res.locals.allRestaurantsData
	});
});

router.get("/", (req, res, next) => {
	res.render("main");
});

router.post("/restaurants", restaurantsModel.create, (req, res, next) => {
	console.log("From post controller");
});

router.get("/dinelist", restaurantsModel.addedlist, (req, res, next) => {
	console.log("hitting dinelist/");
	res.render("dinelist", { listdata: res.locals.allFromList });
});

router.delete("/dinelist/:id", restaurantsModel.destroy, (req, res, next) => {
	res.json({ id: req.params.id });
});
// put  - update
// destroy - delete
module.exports = router;
