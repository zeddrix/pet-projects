class UI {
  constructor() {
    this.location = document.querySelector("#w-location");
    this.desc = document.querySelector("#w-desc");
    this.string = document.querySelector("#w-string");
    this.details = document.querySelector("#w-details");
    this.icon = document.querySelector("#w-icon");
    this.humidity = document.querySelector("#w-humidity");
    this.feelsLike = document.querySelector("#w-feels-like");
    this.pressure = document.querySelector("#w-pressure");
    this.wind = document.querySelector("#w-wind");
  }

  paint(weather) {
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = `${weather.main.temp} F`;
    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    );
    this.humidity.innerHTML = `<strong>Relative Humidity:</strong> ${weather.main.humidity}%`;
    this.feelsLike.innerHTML = `<strong>Feels Like:</strong> ${weather.main.feels_like} F`;
    this.pressure.innerHTML = `<strong>Pressure:</strong> ${weather.main.pressure} Pa`;
    this.wind.innerHTML = `<strong>Wind Speed:</strong> ${weather.wind.speed} MPH`;
  }
}
