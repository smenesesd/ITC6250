const WEATHER_API_URL =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=42.3601" +
    "&longitude=-71.0589" +
    "&current=temperature_2m,weather_code,wind_speed_10m" +
    "&temperature_unit=fahrenheit" +
    "&wind_speed_unit=mph" +
    "&timezone=America%2FNew_York";

function getWeatherDescription(code) {
    if (code === 0) return "Clear";
    if (code === 1 || code === 2) return "Partly cloudy";
    if (code === 3) return "Cloudy";
    if (code === 45 || code === 48) return "Foggy";
    if (code >= 51 && code <= 67) return "Rainy";
    if (code >= 71 && code <= 77) return "Snowy";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code >= 95) return "Thunderstorm";

    return "Weather information available";
}

export async function showWeather() {
    const weatherElement = document.getElementById("weather");
    const weatherButton = document.getElementById("weatherButton");

    if (!weatherElement) {
        return;
    }

    weatherElement.textContent = "Loading Boston weather...";

    if (weatherButton) {
        weatherButton.disabled = true;
    }

    try {
        const response = await fetch(WEATHER_API_URL);

        if (!response.ok) {
            throw new Error(`Weather API returned ${response.status}`);
        }

        const data = await response.json();
        const current = data.current;

        if (!current) {
            throw new Error("Current weather data is unavailable.");
        }

        const description = getWeatherDescription(current.weather_code);

        weatherElement.textContent =
            `Boston: ${Math.round(current.temperature_2m)}°F, ` +
            `${description}, Wind: ${Math.round(current.wind_speed_10m)} mph`;

    } catch (error) {
        console.error("Weather API error:", error);
        weatherElement.textContent =
            "Unable to load the weather. Please try again.";
    } finally {
        if (weatherButton) {
            weatherButton.disabled = false;
        }
    }
}