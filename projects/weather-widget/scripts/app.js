const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI();

const getWeather = () => {
  weather
    .getWeather()
    .then((results) => {
      console.log(results);
      ui.paint(results);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", getWeather);
document.querySelector("#w-change-btn").addEventListener("click", (e) => {
  const city = document.querySelector("#city").value;
  const state = document.querySelector("#state").value;

  weather.changeLocation(city, state);
  storage.setLocationData(city, state);

  getWeather();

  $("#locModal").modal("hide");
});
