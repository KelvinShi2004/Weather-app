async function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();

    if (!city) {
        alert("Please enter a valid city name.");
        return;
    }

    const apiKey = '727fa0736f7267408e0a6806408cb992';
    //const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("API Response:", data); // Log the API response to the console

        const weatherInfo = document.getElementById("weatherInfo");
        weatherInfo.innerHTML = ""; // Clear previous weather info

        if (response.ok) {
            const { name, weather, main } = data;
            const weatherDescription = weather[0].description;
            const temperature = main.temp;
            const humidity = main.humidity;

            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <p>${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
            `;
        } else {
            weatherInfo.innerHTML = "<p>City not found</p>";
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
}