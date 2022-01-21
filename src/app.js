let heading = document.querySelector("#tempC");
heading.innerHTML = `${temp}`;

let currentCity = document.querySelector("#current-city");
currentCity.innerHTML = response.data.name;

let icon = document.querySelector("#icon");
icon.setAttribute(
  "src",
  "https://openweathermap.orgimg/wn/${response.data.weather[0].icon}@2x.png"
);

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "cf0f1f173fb62dd2bd98180f65a77eaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  // axios.get(apiUrl).then()
}

let currentCity = document.querySelector("current-city");
currentCity.innerHTML = cityInput.value;

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", enterCity);
