function displayDateTime(timestamp) {
  let date = new Date(timestamp);
  // let actualDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${hours}:${minutes} <br> ${month} ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturdy",
  ];

  return days[day];
}

function userSearch(event) {
  event.preventDefault();
  // let cityElement = document.querySelector("#city");
  let userCity = document.querySelector("#city-input").value;
  // cityElement.innerHTML = userCity.toUpperCase();

  findCity(userCity);
}

function findCity(city) {
  let apiKey = "8d79b9c9164b585fda7fb4641293c93a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function retrievePosition(position) {
  let apiKey = "8d79b9c9164b585fda7fb4641293c93a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempDay = document.querySelector("#temp-day");
  let tempNight = document.querySelector("#temp-night");
  let tempFahrenheitDay = (tempDay.innerHTML * 9) / 5 + 32;
  let tempFahrenheitNight = (tempNight.innerHTML * 9) / 5 + 32;
  tempDay.innerHTML = Math.round(tempFahrenheitDay);
  tempNight.innerHTML = Math.round(tempFahrenheitNight);
}

function changeToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempDay = document.querySelector("#temp-day");
  let tempNight = document.querySelector("#temp-night");
  tempDay.innerHTML = Math.round(tempCelciusDay);
  tempNight.innerHTML = Math.round(tempCelciusNight);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2">
<div class="card">
<div class = "forecast-date"> <b>${formatDay(forecastDay.dt)}</b></div>
<img 
 src="icons/${forecastDay.weather[0].icon}.png"
          alt=""
class="card-img-top" id="iconForecast"
/>
<div class="forecast-temp">
<span class="forecast-temp-max"><b>${Math.round(
          forecastDay.temp.max
        )}°/</b></span>
<span class="forecast-temp-min"><b>${Math.round(
          forecastDay.temp.min
        )}°C</b></span>
</div>
</div>
</div>

`;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function retrieveForecast(coordinates) {
  let apiKey = "8d79b9c9164b585fda7fb4641293c93a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let cityRequest = document.querySelector("#city");
  cityRequest.innerHTML = response.data.name;
  let cityDayTemp = document.querySelector("#temp-day");
  let cityNightTemp = document.querySelector("#temp-night");
  cityDayTemp.innerHTML = Math.round(response.data.main.temp_max);
  cityNightTemp.innerHTML = Math.round(response.data.main.temp_min);
  let skyConditions = document.querySelector("#sky");
  skyConditions.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#precipation");
  humidity.innerHTML = response.data.main.humidity;

  let dateNow = document.querySelector("#date");
  dateNow.innerHTML = displayDateTime(response.data.dt * 1000);

  let iconActualElement = document.querySelector("#icon-actual");
  // let description = document.querySelector("#description");
  // description.innerHTML = response.data.weather[0].main;
  let iconActualElementAPI = response.data.weather[0].icon;

  tempCelciusDay = response.data.main.temp_max;
  tempCelciusNight = response.data.main.temp_min;

  iconActualElement.setAttribute("src", `icons/${iconActualElementAPI}.png`);
  iconActualElement.setAttribute("alt", response.data.weather[0].description);

  retrieveForecast(response.data.coord);
}

let tempCelciusDay = null;
let tempCelciusNight = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", changeToCelcius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchCityForm = document.querySelector("#city-search");
searchCityForm.addEventListener("submit", userSearch);

findCity("Kyiv");
