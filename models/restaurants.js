// To talk to the database we need a connection
const db = require("../db/index.js");
// We're going to be calling out to an external API using axios
const axios = require("axios");

const restaurantsModel = {};
// -----------------------------------------------------

// from the trains example
// fetch all the trains data from the mta API:  http://www.mtastat.us/api/trains
restaurantsModel.allRestaurants = (req, res, next) => {
	axios({
		headers: { "user-key": "a3659cdf82849e643754187ab2abd25c" },
		url: `https://developers.zomato.com/api/v2.1/search?entity_id=${
			req.query.cityId
		}&entity_type=city&sort=rating`,

		method: "get"
	})
		.then(response => {
			// store the data we got back from the
			// server in res.locals, and then
			// call next()
			res.locals.allRestaurantsData = response.data;
			next();
		})
		.catch(err => {
			console.log(
				"error encountered in restaurantsModel.allRestaurants. error: ",
				err
			);
		});
};

restaurantsModel.allCities = (req, res, next) => {
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
			res.locals.allCitiesData = response.data;
			cityId: res.locals.allCitiesData.location_suggestions.id;

			next();
		})
		.catch(err => {
			console.log(
				"error encountered in restaurantsModel.allCities. error: ",
				err
			);
		});
};

// fetch a single train's data from the mta API: http://www.mtastat.us/api/trains/${name}
// Trains.showTrain = (req, res, next) => {
// 	const name = req.params.name;
// 	axios({
// 		url: `http://www.mtastat.us/api/trains/${name}`,
// 		method: "get"
// 	})
// 		.then(response => {
// 			res.locals.trainData = response.data;
// 			next();
// 		})
// 		.catch(err => {
// 			console.log("error encountered in Trains.showTrain. error: ", err);
// 		});
// };
module.exports = restaurantsModel;
