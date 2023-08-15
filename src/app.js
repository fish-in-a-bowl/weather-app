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

function displayCurrentWeather(response) {
  document.querySelector("#cityName").innerHTML = response.data.city;

  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.temperature.current
  );
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
  console.log(response);
}

let apiKey = "96t803cd7offb2bbdf19a4c07431dacc";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lviv&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentWeather);
