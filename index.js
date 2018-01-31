const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require("mustache-express");

const app = express();

const PORT = process.env.PORT || 3000;

const debug = require("debug")("http"),
	http = require("http"),
	name = app;

//Setting up engine
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"));

// morgan setup
app.use(morgan("dev"));

// body-parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//starts the app
app.listen(PORT, () => {
	console.log("Server started on " + PORT);
});

// ----------------------------------------------
// set up routes

const restaurantsRouter = require("./controllers/restaurants.js");
app.use("/", restaurantsRouter);

// ----------------------------------------------
// set up error handling middleware (notice that this is the LAST thing we do)
//error handling
app.use((err, req, res, next) => {
	console.log("Error encountered: ", err);
	res.status(500);
	res.send(err);
});
