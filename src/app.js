function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  console.log(temp);

  let heading = document.querySelector("#tempC");
  heading.innerHTML = `${temp}`;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let humidity = document.querySelector("#humi");
  humidity.innerHTML = response.data.main.humidity;

  let description = document.querySelector("#desc");
  description.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(position.coords.latitude);
  console.log(postion.coords.longitude);
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiEndpoint = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function currentTemp(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function showForcast(response) {
  console.log(response.data);
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "cf0f1f173fb62dd2bd98180f65a77eaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  let currentCity = document.querySelector("current-city");
  currentCity.innerHTML = cityInput.value;
}

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", enterCity);

function tempConvert() {
  let tc = document.querySelector("#tempC").textContent;
  let fahrenheitTemperature = Math.round((tc * 9) / 5) + 32;
  document.querySelector("#tmpF").tempContent = fahrenheitTemperature;
}

let temp = document.querySelector("#tempF");
temp.addEventListener("click", tempConvert);

let button = document.querySelector("#currrentButton");
button.addEventListener("click", currentTemp);
