export function showWeather() {
    const weather = document.getElementById("weather");

    if (!weather) {
        return;
    }

    if (weather.textContent === "Check today's weather.") {
        weather.textContent = "Boston: 72°F - Partly Cloudy";
    } else {
        weather.textContent = "Check today's weather.";
    }
}