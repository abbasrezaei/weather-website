const request = require("request");
const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1IjoiYWJiYXNyZXphaTY5IiwiYSI6ImNrOW05NnBrMjAyM3EzZW50ZHNqZWlsMnoifQ.2CqQE7btyUumbMcjjd81tQ&limt=1";

	request({ url, json: true }, (error, {body}={}) => {
		if (error) {
			callback("unable to connect location services", undefined);
		} else if (body.features.length === 0) {
			callback("unable to find location. Try aonther search", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				logtiude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
