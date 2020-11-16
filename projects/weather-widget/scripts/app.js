const weather = new Weather("Tanza", "Cavite");
const ui = new UI();
// weather.changeLocation()

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
