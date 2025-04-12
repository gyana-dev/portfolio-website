const apiKey = '52f18c9c4cb69a8b4415ea2df5c40574';  // Your actual API key

function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Show loading spinner
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('error-message').innerText = '';  // Clear any previous error message

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Hide loading spinner
            document.getElementById('loading-spinner').style.display = 'none';

            if (data.cod === 200) {
                const cityName = data.name;
                const temperature = data.main.temp;
                const description = data.weather[0].description;

                document.getElementById('city-name').innerText = `Weather in ${cityName}`;
                document.getElementById('temperature').innerText = `Temperature: ${temperature}°C 🌡️`;
                document.getElementById('description').innerText = `Description: ${description} 🌤️`;
            } else if (data.cod === "404") {
                document.getElementById('error-message').innerText = 'City not found! Please try again.';
            } else {
                document.getElementById('error-message').innerText = 'An error occurred. Please try again later.';
            }
        })
        .catch(error => {
            // Hide loading spinner and show error
            document.getElementById('loading-spinner').style.display = 'none';
            console.error('Error fetching data: ', error);
            document.getElementById('error-message').innerText = 'Something went wrong. Please try again later.';
        });
}

function toggleDarkMode() {
    const body = document.body;
    const weatherContainer = document.querySelector('.weather-container');
    const button = document.querySelector('#dark-mode-toggle');

    body.classList.toggle('dark-mode');
    weatherContainer.classList.toggle('dark-mode');
    button.classList.toggle('dark-mode');

    const isDarkMode = body.classList.contains('dark-mode');
    if (isDarkMode) {
        button.innerText = '🌙 Light Mode';
    } else {
        button.innerText = '🌙 Dark Mode';
    }
}
