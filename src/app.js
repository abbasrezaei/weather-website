const path = require("path");
const express = require("express");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const hbs = require("hbs");

const app = express();

const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));
app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Abbas Rezaei",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Abbas Rezaei",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is help Text.",
		title: "Help",
		name: "Abbas Rezaei",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "Erorr 404",
		errorMassage: "Help article not found!",
		name: "Abbas Rezaei",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must enter address",
		});
	}

	geocode(req.query.address, (error, { latitude, logtiude, location }={}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, logtiude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address,
			});
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provid a search term!",
		});
	}

	console.log(req.query.search);
	res.send({ products: [] });
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "Erorr 404",
		errorMassage: "Page not found!",
		name: "Abbas Rezaei",
	});
});
app.listen(8000, () => {
	console.log("Server is up on port 8000");
});
