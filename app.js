function formatDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let fullCurrentDate = `${currentDay} - ${currentMonth}${currentDate} - ${currentYear}-
${currentHour}:${currentMinute}`;

  return fullCurrentDate;
}

let dateElement = document.querySelector("#date-and-time");
let cuurentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

///

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  console.log(temp);

  let heading = document.querySelector("#tempC");
  heading.innerHTML = ` ${temp} `;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
  console.log(position.coords.longitude);
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentTemp(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showForecast(response) {
  console.log(response.data);
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "cf0f1f173fb62dd2bd98180f65a77eaf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  let currentCity = document.querySelector("#current-city");
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
