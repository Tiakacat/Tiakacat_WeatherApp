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
  let iconActual = document.querySelector("#icon-actual");
  iconActual.innerHTML = 
  
  let dateNow = document.querySelector("#date");
  dateNow.innerHTML = displayDateTime(response.data.dt * 1000);
}

function userSearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let userCity = document.querySelector("#city-input").value;
  cityElement.innerHTML = userCity.toUpperCase();
  // let h2 = document.querySelector("h2");
  // h2.innerHTML = userCity.toUpperCase();
  findCity(userCity);
}
let searchCityForm = document.querySelector("#city-search");
searchCityForm.addEventListener("submit", userSearch);

function findCity(city) {
  let apiKey = "8d79b9c9164b585fda7fb4641293c93a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // let userCity = document.querySelector("#city-input").value;
  axios.get(apiUrl).then(showWeather);
}

function retrievePosition(position) {
  let apiKey = "8d79b9c9164b585fda7fb4641293c93a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
// navigator.geolocation.getCurrentPosition(retrievePosition);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

findCity("Kyiv");

// class="tempmax">16</span>
//       <span class="tempmin">8</span>
//       </div>
//       </div>
//     `;
//   });

//   forecastHTML = forecastHTML + `</div>`;
//   forecastElement.innerHTML = forecastHTML;
// }
// // displayForecast();

// function getForecast(coordinates) {
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=eadaf9d564268a9d29e613879a48803e`;
//   axios.get(apiUrl).then(displayForecast);
// }

// //SEARCH TEMPERATURE
// function showWeather(response) {
//   console.log(response.data);

//   let temperature = Math.round(response.data.main.temp);
//   let tempElment = document.querySelector("#temperature");
//   tempElment.innerHTML = `${temperature}°C`;

//   let feelsLike = Math.round(response.data.main.feels_like);
//   let feelsElment = document.querySelector("#feelsLike");
//   feelsElment.innerHTML = `${feelsLike} °C`;

//   let humidity = response.data.main.humidity;
//   let humidityElment = document.querySelector("#humidity");
//   humidityElment.innerHTML = `${humidity} %`;

//   let pressure = response.data.main.pressure;
//   let pressureElment = document.querySelector("#pressure");
//   pressureElment.innerHTML = `${pressure} hPa`;

//   let wind = Math.round(response.data.wind.speed);
//   let windElment = document.querySelector("#wind");
//   windElment.innerHTML = `${wind} m/s`;

//   let description = response.data.weather[0].description;
//   let descriptionElment = document.querySelector("#description");
//   descriptionElment.innerHTML = `${description}`;

//   let sunrise = response.data.sys.sunrise;
//   let sunriseCal = new Date((sunrise + response.data.timezone) * 1000);
//   let h = "0" + sunriseCal.getHours();
//   let m = "0" + sunriseCal.getMinutes();
//   let t = h + ":" + m.substr(-2);
//   let sunriseElment = document.querySelector("#sunrise");
//   sunriseElment.innerHTML = `${t}`;

//   let sunset = response.data.sys.sunset;
//   let sunsetCal = new Date((sunset + response.data.timezone) * 1000);
//   let hour = sunsetCal.getHours();
//   let min = "0" + sunsetCal.getMinutes();
//   let time = hour + ":" + min.substr(-2);

//   let sunsetElment = document.querySelector("#sunset");
//   sunsetElment.innerHTML = `${time}`;

//   //ICON
//   // let description = response.data.weather[0].description;
//   let iconElment = document.querySelector("#icon");
//   if (description === "clear sky") {
//     iconElment.setAttribute(
//       "src",
//       `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/168/original/01d.png?1656677804`
//     );
//   } else if (description === "few clouds") {
//     iconElment.setAttribute(
//       "src",
//       `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/169/original/02d.png?1656677813`
//     );
//   } else if (description === "scattered clouds") {
//     iconElment.setAttribute(
//       "src",
//       `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/170/original/03d.png?1656677822`
//     );
//   } else if (
//     description === "broken clouds" ||
//     description === "overcast clouds"
//   ) {
//     iconElment.setAttribute(
//       "src",
//       `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/171/original/04d.png?1656677838`
//     );
//   } else if (
//     description === "shower rain" ||
//     description === "light intensity drizzle" ||
//     description === "drizzle" ||
//     description === "heavy intensity drizzle" ||
//     description === "light intensity drizzle rain" ||
//     description === "drizzle rain" ||
//     description === "heavy intensity drizzle rain" ||
//     description === "shower rain and drizzle" ||
//     description === "heavy shower rain and drizzle" ||
//     description === "shower drizzle" ||
//     description === "heavy intensity shower rain" ||
//     "ragged shower rain"
//   ) {
//     iconElment.setAttribute(
//       "src",
//       `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/172/original/09d.png?1656677847`
//     );
//   } else if (
//     description === "rain" ||
//     description === "light rain	" ||
//     description === "moderate rain" ||
//     description === "heavy intensity rain" ||
//     description === "very heavy rain" ||
//     description === "extreme rain"
//   ) {
//     iconElment.setAttribute(
//       "src",
//       `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/173/original/10d.png?1656677854`
//     );
//   } else if (
//     description === "thunderstorm" ||
//     description === "thunderstorm with light rain" ||
//     description === "thunderstorm with rain" ||
//     description === "thunderstorm with heavy rain" ||
//     description === "light thunderstorm" ||
//     description === "heavy thunderstorm" ||
//     description === "ragged thunderstorm	" ||
//     description === "thunderstorm with light drizzle" ||
//     description === "thunderstorm with drizzle" ||
//     description === "thunderstorm with heavy drizzle"
//   ) {
//     iconElment.setAttribute(
//       "src",
//       `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/174/original/11d.png?1656677860`
//     );
//   } else if (
//     description === "snow" ||
//     description === "light snow" ||
//     description === "Snow" ||
//     description === "Heavy snow" ||
//     description === "Sleet" ||
//     description === "Light shower sleet" ||
//     description === "Shower sleet" ||
//     description === "freezing rain" ||
//     description === "Light rain and snow" ||
//     description === "Rain and snow" ||
//     description === "Light shower sleet" ||
//     description === "Shower snow" ||
//     description === "Heavy shower snow"
//   ) {
//     iconElment.setAttribute(
//       "src",
//       ` https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/175/original/13d.png?1656677869`
//     );
//   } else if (
//     description === "mist" ||
//     description === "tornado" ||
//     description === "squalls" ||
//     description === "volcanic ash" ||
//     description === "dust" ||
//     description === "sand" ||
//     description === "fog" ||
//     description === "sand/ dust whirls" ||
//     description === "Haze" ||
//     description === "Smoke"
//   ) {
//     iconElment.setAttribute(
//       "src",
//       `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/316/original/50d.png?1656854718`
//     );
//   } else {
//     iconElment.innerHTML = null;
//   }

//   getForecast(response.data.coord);
// }

function changeToCelcius(event) {
  event.preventDefault();
  let tempCelciusDay = document.querySelector("#temp-day");
  let tempCelciusNight = document.querySelector("#temp-night");
  tempCelciusDay.innerHTML = "21";
  tempCelciusNight.innerHTML = "15";
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", changeToCelcius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheitDay = document.querySelector("#temp-day");
  let tempFahrenheitNight = document.querySelector("#temp-night");
  tempFahrenheitDay.innerHTML = "70";
  tempFahrenheitNight.innerHTML = "59";

  // let fahrenheitDay = tempFahrenheitDay.innerHTML;
  // let fahrenheitNight = tempFahrenheitNight.innerHTML;
  // tempFahrenheitDay.innerHTML = Math.round((fahrenheitDay * 9) / 5 + 32);
  // tempFahrenheitNight.innerHTML = Math.round((fahrenheitNight * 9) / 5 + 32;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

// let convertDegree =
// let celciusTemperature = Math.round(temperature);
// let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
