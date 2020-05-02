const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const massageOne = document.querySelector("#massage-1");
const massageTow = document.querySelector("#massage-2");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = search.value;
	massageOne.textContent = "Laoding...";
	massageTow.textContent = "";

	fetch(
		"https://rezaei-weather-app.herokuapp.com/weather?address=" + location
	).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				massageOne.textContent = data.error;
			} else {
				massageOne.textContent = data.location;
				massageTow.textContent = data.forecast;
			}
		});
	});
});

console.log(location);
