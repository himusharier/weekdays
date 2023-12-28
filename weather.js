const weather = document.querySelector('.weather');

function updateWeather(){
    weather.textContent = '...°C';
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=23.71&longitude=90.41&current_weather=true`)
      .then(response => response.json())
      .then(data => {
        const temp = data.current_weather.temperature;
        weather.textContent = `${temp}°C`
      })
      .catch(error => {
        console.error(error);
      });
}
// Updating weather every five minutes
setInterval(updateWeather, 300000);

// Calling once at first to load initially
updateWeather();

weather.addEventListener('click', () => {
    updateWeather();
});