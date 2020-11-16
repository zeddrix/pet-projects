const weather = new Weather("Tanza", "Cavite");
// weather.changeLocation()

const getWeather = () => {
  weather
    .getWeather()
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", getWeather);
