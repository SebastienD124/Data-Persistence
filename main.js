const form = document.getElementById('weather-form');
        const cityInput = document.getElementById('city-input');
        const resultsDiv = document.getElementById('weather-results');
        let lastCitySearched = localStorage.getItem('lastCitySearched');
 
        if (lastCitySearched) {
            getWeatherData(lastCitySearched);
        }
 
        form.addEventListener('submit', (event) => {
            event.preventDefault();
           
            const city = cityInput.value;
            getWeatherData(city);
        });
 
        function getWeatherData(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ae804a057977b40d8f6030aed63fcfa&units=imperial`)
                .then(response => response.json())
                .then(data => {
                    lastCitySearched = city;
                    localStorage.setItem('lastCitySearched', lastCitySearched);
                    displayWeatherData(data);
                })
                .catch(error => console.log(error));
        }
 
        function displayWeatherData(data) {
            const city = data.name;
            const country = data.sys.country;
            const currentTemp = data.main.temp;
            const lowTemp = data.main.temp_min;
            const highTemp = data.main.temp_max;
            const weatherDesc = data.weather[0].description;
 
            resultsDiv.innerHTML = `
                <p>Location: ${city}, ${country}</p>
                <p>Current Temperature: ${currentTemp}&deg;F</p>
                <p>Low Temperature: ${lowTemp}&deg;F</p>
                <p>High Temperature: ${highTemp}&deg;F</p>
                <p>Weather: ${weatherDesc}</p>
            `;
        }