function formatDate() {
  let date = new Date();
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

  return `${day} ${hours}:${minutes}`;
}
document.querySelector("#currentTime").innerHTML = formatDate();

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="forecast-weekday">${formatForecastDay(
          forecastDay.time
        )}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          id="forecastWeatherIcon"
          class="forecast-weather-icon"
        />
        <div class="forecast-temperature">
        <span class="forecast-temp-max" id="forecastTempMax">${Math.round(
          forecastDay.temperature.maximum
        )}° </span
        ><span class="forecast-temp-min" id="forecastTempMin">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
        </div>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "96t803cd7offb2bbdf19a4c07431dacc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.city;

  celsiusTemp = response.data.temperature.current;
  tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(celsiusTemp);

  document.querySelector("#feelsLikeTemp").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.condition.description;
  document.querySelector("#currentHumidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#currentWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#currentPressure").innerHTML =
    response.data.temperature.pressure;
  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#weatherIcon")
    .setAttribute("alt", `${response.data.condition.description}`);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "96t803cd7offb2bbdf19a4c07431dacc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

document.querySelector("#searchForm").addEventListener("submit", handleSubmit);
document
  .querySelector("#button-addon2")
  .addEventListener("click", handleSubmit);

search("Kyiv");
