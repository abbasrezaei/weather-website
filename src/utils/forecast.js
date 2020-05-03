const requset = require("request");

const forecast = (latitude, logtiude, callback) => {
	const url =
		"https://api.darksky.net/forecast/f8228a4f2761e1771ca38d5986a6e3bc/" +
		latitude +
		"," +
		logtiude +
		"?units=si";
	requset({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback("unable to conect weather service", undefined);
		} else if (body.error) {
			callback("unable to find location", undefined);
		} else {
			callback(
				undefined,
				body.daily.data[0].summary +
					"It is currently " +
					body.currently.temperature +
					" degrees out.This high today is " +
					body.daily.data[0].temperatureHigh +
					" with a low of "+
					body.daily.data[0].temperatureLow+
					". There is a " +
					body.currently.precipProbability +
					"% chance of rain"
			);
		}
	});
};

module.exports = forecast;
