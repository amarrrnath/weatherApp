
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    fetch('http://amarrrnath-weather-application.herokuapp.com/weather?address=' + location).then((response) => {
        response.json().then((forecast) => {
            if(forecast.error) {
                messageOne.textContent = forecast.error;
            } else {
                messageOne.textContent = forecast.location;
                messageTwo.textContent = forecast.forecastData;
            }
        })
    })
})