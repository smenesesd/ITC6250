import { showWeather } from "./ui/weather.js";

import {
    showAll,
    showSports,
    showEvents
} from "./ui/filters.js";

import { setupNavigation } from "./ui/navigation.js";


document.addEventListener("DOMContentLoaded", () => {

    const weatherButton = document.getElementById("weatherButton");
    const allButton = document.getElementById("allButton");
    const sportsButton = document.getElementById("sportsButton");
    const eventsButton = document.getElementById("eventsButton");

    if (weatherButton) {
        weatherButton.addEventListener("click", showWeather);
    }

    if (allButton) {
        allButton.addEventListener("click", showAll);
    }

    if (sportsButton) {
        sportsButton.addEventListener("click", showSports);
    }

    if (eventsButton) {
        eventsButton.addEventListener("click", showEvents);
    }

    setupNavigation();
});