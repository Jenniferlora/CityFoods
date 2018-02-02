const router = require("express").Router();
const restaurantsModel = require("../models/restaurants.js");
var moment = require("moment");

//This is rendering the restaurants page.
router.get(
	"/restaurants",
	restaurantsModel.city,
	restaurantsModel.comments,
	(req, res, next) => {
		console.log("hitting restaurants/");
		res.render("restaurants", {
			cityData: res.locals.cityData,
			allRestaurantsData: res.locals.allRestaurantsData
		});
	}
);

//This is rendering the main page.
router.get("/", (req, res, next) => {
	res.render("main");
});

//This is adding the restaurant to the dinelist. It does not render any page.
router.post("/restaurants", restaurantsModel.create, (req, res, next) => {
	console.log("Hitting /restaurants", res.locals.listitem);
});

//This is the dinelist that's rendering.
router.get("/dinelist", restaurantsModel.addedlist, (req, res, next) => {
	var currentTime = moment().format("LLL");
	console.log("hitting dinelist/", res.locals.allFromList);
	res.render("dinelist", {
		listdata: res.locals.allFromList,
		time: currentTime
	});
});

//This is to delete an item.
router.delete("/dinelist/:id", restaurantsModel.destroy, (req, res, next) => {
	// res.json({ id: req.params.id });
	res.render("dinelist", { id: req.params.id });
});

router.get(
	"/dinelist/:id/comments",
	restaurantsModel.comments,
	(req, res, next) => {
		res.json({ comments: res.locals.comments });
		// res.render("dinelist", { id: req.params.id });
	}
);

//This is to make a comment to the database.
router.post("/dinelist/:id", restaurantsModel.makeComment, (req, res, next) => {
	console.log("in post at routerpost. res.locals:", res.params);
	res.render("dinelist", {
		id: req.params.id,
		res_id: req.params.res_id,
		new_comment: req.params.new_comment,
		author: req.params.author
	});
});

router.put("/dinelist/:id", restaurantsModel.update, (req, res, next) => {
	console.log("in router.put", req.locals.newcomment);
	res.redirect("dinelist/:id", {
		newcomment: req.params.newcomment
	});
});

module.exports = router;
