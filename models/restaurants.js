// To talk to the database we need a connection
const db = require("../db/index.js");
// We're going to be calling out to an external API using axios
const axios = require("axios");

const restaurantsModel = {};
//----------------------------------------------------

// from the trains example
// fetch all the trains data from the mta API:  http://www.mtastat.us/api/trains
restaurantsModel.city = (req, res, next) => {
	console.log(req.query.city + "hey from restuarantModel.city!!!!!");
	axios({
		headers: { "user-key": "a3659cdf82849e643754187ab2abd25c" },
		url: `https://developers.zomato.com/api/v2.1/locations?query=${
			req.query.city
		}`,

		method: "get"
	})
		.then(response => {
			// store the data we got back from the
			// server in res.locals, and then
			// call next()
			res.locals.cityData = response.data;

			secondCall(response);
		})
		.catch(err => {
			console.log("error encountered in restaurantsModel.city. error: ", err);
		});
	// nested api call for entity --> url + response.data.location_suggestion.entity_id
	function secondCall(response) {
		// console.log(res.locals.allRestaurantsData);
		// console.log(response.data);
		axios({
			headers: { "user-key": "a3659cdf82849e643754187ab2abd25c" },
			url: `https://developers.zomato.com/api/v2.1/search?entity_id=${
				response.data.location_suggestions[0].entity_id
			}&entity_type=city`,
			method: "get"
		})
			.then(response => {
				// store the data we got back from the
				// server in res.locals, and then
				res.locals.allRestaurantsData = response.data.restaurants;
				// console.log(res.locals.allRestaurantsData);

				//nested object
				next();
			})
			.catch(err => {
				console.log("error encountered in restaurantsModel.city. error: ", err);
			}); //closes nested API
	}
}; //close entire API call

restaurantsModel.create = (req, res, next) => {
	console.log("from restaurants.Model", req.body);
	db
		.manyOrNone(
			"INSERT INTO restaurants (res_id, name, city) VALUES ($1, $2, $3) RETURNING *;",
			[
				req.body.restaurant_id,
				req.body.restaurant_name,
				req.body.restaurant_city
			]
		)
		.then(data => {
			res.locals.listitem = data;
			// console.log("DATA IS IN RESTAURANTSMODEL.CREATE PROMISE", data);

			next();
		})
		.catch(error => {
			console.log(
				"error encountered in restaurantsModel.create. Error:",
				error
			);
			next(error);
		});
};

restaurantsModel.addedlist = (req, res, next) => {
	console.log(res.locals.allFromList);
	db
		.manyOrNone("SELECT id,res_id,name,city FROM restaurants")
		// .manyOrNone(
		// 	"SELECT restaurants.id, restaurants.res_id, name, city , comment, author from restaurants JOIN comments ON restaurants.res_id=comments.res_id"
		// )

		.then(data => {
			res.locals.allFromList = data;
			next();
		})
		.catch(error => {
			console.log(
				"error encountered in restaurantsModel.dinelist Error:",
				error
			);
			next(error);
		});
};

restaurantsModel.destroy = (req, res, next) => {
	console.log(req.params.id);
	db
		.none("DELETE FROM restaurants comments WHERE id = $1", [req.params.id])
		.then(() => {
			next();
		})
		.catch(error => {
			console.log(
				"error encountered in restaurantsModel.destroy Error:",
				error
			);
			next(error);
		});
};

restaurantsModel.findById = (req, res, next) => {
	console.log(req.params);
	db
		.one("SELECT * FROM restaurants WHERE id = $1;", [req.params.id])
		.then(data => {
			res.locals.allFromList = data;
			next();
		})
		.catch(error => {
			console.log("error in places.findById. Error:", error);
			next(error);
		});
};

restaurantsModel.comments = (req, res, next) => {
	console.log(req.params);
	db
		.manyOrNone("SELECT * FROM comments WHERE res_id=$1", [req.params.id])
		.then(data => {
			res.locals.comments = data;
			next();
		})
		.catch(error => {
			console.log("error in places.findById. Error:", error);
			next(error);
		});
};

// this is used in the 'users/trains' POST route in controllers/users.js
restaurantsModel.makeComment = (req, res, next) => {
	console.log("----------------------");
	console.log("in restaurantsModel.makeComment. req.body:", req.params);

	const res_id = req.params.id;
	const comment = req.body.comment;
	const author = req.body.author;
	db
		.one(
			"INSERT INTO comments (res_id, comment, author) VALUES ($1, $2, $3) RETURNING id;",
			[res_id, comment, author]
		)
		.then(result => {
			res.locals.comment = result;
			next();
		})
		.catch(err => {
			console.log(
				"Error encountered in restaurantsModel.makeComment. error:",
				err
			);
			next(err);
		});
};

module.exports = restaurantsModel;
