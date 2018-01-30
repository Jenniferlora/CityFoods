// To talk to the database we need a connection
const db = require("../db/index.js");
// We're going to be calling out to an external API using axios
const axios = require("axios");

const restaurantsModel = {};
// -----------------------------------------------------
// -----------------------------------------------------
// seed the database

// Helper function for seeding the pokemon data.
function restaurantsNameSeedStep(restaurantData) {
	// Deal with the array of pokemon information in pokemonData.
	// Strictly speaking we should use map rather than forEach
	// and the Promise.all method to move on to the next step,
	// but since we don't care about getting data back from the DB
	// after each query we can get away with .forEach for now.
	restaurantData.forEach(restaurant => {
		// const name = req.params.name;
		// const locality = req.params.locality;
		console.log(restaurantData[0].restaurant.name);
		db
			.manyOrNone("INSERT INTO restaurants (name) VALUES ($1);", [
				restaurant.name
			])
			.catch(err => {
				console.log(
					"Error encounted in restaurantsNameSeedStep pgpromise call, error:",
					err
				);
			});
	});
}
// If there's a link to more pokemon information, recursively follow it
// 	if (pokemonData.next) {
// 		axios({
// 			method: "get",
// 			url: pokemonData.next
// 		})
// 			.then(response => {
// 				// recursively call pokemonNameSeedStep
// 				pokemonNameSeedStep(response.data);
// 			})
// 			.catch(err => {
// 				console.log(
// 					"Error encountered in axios call in pokemonNameSeedStep, error:",
// 					err
// 				);
// 			});
// 	}
// }

// Note that this is *NOT MIDDLEWARE*. It's just
// a function we'll use in db/seed.js to set up
// the database.
// restaurantsModel.seedAllRestaurantsNames = function() {
// 	// see https://github.com/axios/axios#user-content-axios-api for axios docs
// 	axios({
// 		method: "get",
// 		url: "http://pokeapi.co/api/v2/pokemon"
// 	})
// 		.then(response => {
// 			console.log(response.data);
// 			restaurantsNameSeedStep(response.data);
// 		})
// 		.catch(err => {
// 			console.log(
// 				"Error encountered in pokemonModel.seedAllPokemonNames:",
// 				err
// 			);
// 		});
// };

// -----------------------------------------------------
// from the trains example
// fetch all the trains data from the mta API:  http://www.mtastat.us/api/trains
restaurantsModel.city = (req, res, next) => {
	// console.log(req.query.city + "hey from restuarantModel.city!!!!!");
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
			restaurantsNameSeedStep(response.data.restaurants);
			//next();
		})
		.catch(err => {
			console.log("error encountered in restaurantsModel.city. error: ", err);
		});
	// nested api call for entity --> url + response.data.location_suggestion.entity_id
	function secondCall(response) {
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
				// call next()
				// console.log(response.data);
				res.locals.allRestaurantsData = response.data.restaurants;

				//nested object
				next();
				restaurantsNameSeedStep(response.data.restaurants);
			})
			.catch(err => {
				console.log("error encountered in restaurantsModel.city. error: ", err);
			}); //closes nested API
	}
}; //close entire API call

// restaurantsModel.allRestaurants = (req, res, next) => {
// 	axios({
// 		headers: { "user-key": "a3659cdf82849e643754187ab2abd25c" },
// 		url: `https://developers.zomato.com/api/v2.1/locations?query=${
// 			req.query.city
// 		}`,
// 		method: "get"
// 	})
// 		.then(response => {
// 			// store the data we got back from the
// 			// server in res.locals, and then
// 			// call next()
// 			res.locals.allRestaurantsData = response.data;
// 			cityId: res.locals.allCitiesData.location_suggestions.id;

// 			next();
// 		})
// 		.catch(err => {
// 			console.log(
// 				"error encountered in restaurantsModel.allCities. error: ",
// 				err
// 			);
// 		});
// };
module.exports = restaurantsModel;
