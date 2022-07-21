function displayDateTime(timestamp) {
  let date = new Date(timestamp);
  let actualDate = date.getDate();
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
  return `${day} ${hours}:${minutes} <br> ${actualDate} ${month} ${year}`;
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

  if (iconActualElementAPI === "01d") {
    iconActualElement.setAttribute("src", `icons/01d.png`);
  } else if (iconActualElementAPI === "02d") {
    iconActualElement.setAttribute("src", `icons/02d.png`);
  } else if (iconActualElementAPI === "03d") {
    iconActualElement.setAttribute("src", `icons/03d.png`);
  } else if (iconActualElementAPI === "04d") {
    iconActualElement.setAttribute("src", `icons/03d.png`);
  } else if (iconActualElementAPI === "09d") {
    iconActualElement.setAttribute("src", `icons/09d.png`);
  } else if (iconActualElementAPI === "10d") {
    iconActualElement.setAttribute("src", `icons/10d.png`);
  } else if (iconActualElementAPI === "11d") {
    iconActualElement.setAttribute("src", `icons/11d.png`);
  } else if (iconActualElementAPI === "13d") {
    iconActualElement.setAttribute("src", `icons/13d.png`);
  } else if (iconActualElementAPI === "50d") {
    iconActualElement.setAttribute("src", `icons/50d.png`);
  } else if (iconActualElementAPI === "01n") {
    iconActualElement.setAttribute("src", `icons/01n.png`);
  } else if (iconActualElementAPI === "02n") {
    iconActualElement.setAttribute("src", `icons/02n.png`);
  } else if (iconActualElementAPI === "03n") {
    iconActualElement.setAttribute("src", `icons/03d.png`);
  } else if (iconActualElementAPI === "04n") {
    iconActualElement.setAttribute("src", `icons/03d.png`);
  } else if (iconActualElementAPI === "09n") {
    iconActualElement.setAttribute("src", `icons/09d.png`);
  } else if (iconActualElementAPI === "10n") {
    iconActualElement.setAttribute("src", `icons/10d.png`);
  } else if (iconActualElementAPI === "11n") {
    iconActualElement.setAttribute("src", `icons/11d.png`);
  } else if (iconActualElementAPI === "13n") {
    iconActualElement.setAttribute("src", `icons/13d.png`);
  } else if (iconActualElementAPI === "50n") {
    iconActualElement.setAttribute("src", `icons/50d.png`);
  } else {
    iconActualElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${iconActualElementAPI}@2x.png`
    );
  }

  iconActualElement.setAttribute("src", `icons/${iconActualElementAPI}.png`);
  iconActualElement.setAttribute("alt", response.data.weather[0].description);
}

function userSearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let userCity = document.querySelector("#city-input").value;
  cityElement.innerHTML = userCity.toUpperCase();

  findCity(userCity);
}
let searchCityForm = document.querySelector("#city-search");
searchCityForm.addEventListener("submit", userSearch);

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
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

findCity("Kyiv");

// function changeToCelcius(event) {
//   event.preventDefault();
//   let tempCelciusDay = document.querySelector("#temp-day");
//   let tempCelciusNight = document.querySelector("#temp-night");
//   tempCelciusDay.innerHTML = "21";
//   tempCelciusNight.innerHTML = "15";
// }

// let celciusLink = document.querySelector("#celcius-link");
// celciusLink.addEventListener("click", changeToCelcius);

// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let tempFahrenheitDay = document.querySelector("#temp-day");
//   let tempFahrenheitNight = document.querySelector("#temp-night");
//   tempFahrenheitDay.innerHTML = "70";
//   tempFahrenheitNight.innerHTML = "59";

// let fahrenheitDay = tempFahrenheitDay.innerHTML;
// let fahrenheitNight = tempFahrenheitNight.innerHTML;
// tempFahrenheitDay.innerHTML = Math.round((fahrenheitDay * 9) / 5 + 32);
//   // tempFahrenheitNight.innerHTML = Math.round((fahrenheitNight * 9) / 5 + 32;
// }
// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", changeToFahrenheit);

// let convertDegree =
// let celciusTemperature = Math.round(temperature);
// let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32); }
