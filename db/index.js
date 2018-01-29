// Setup for pg promise
const pgp = require("pg-promise")();
const axios = require("axios")();
// configuration object
const cn = {
	host: "localhost",
	port: 5432,
	database: "restaurants_db"
};

const db = pgp(cn);

module.exports = db;
