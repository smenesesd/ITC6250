import { showWeather } from "./ui/weather.js";

import {
    showAll,
    showSports,
    showEvents
} from "./ui/filters.js";


document.addEventListener("DOMContentLoaded", () => {

    // Weather button
    const weatherButton = document.getElementById("weatherButton");

    if (weatherButton) {
        weatherButton.addEventListener("click", showWeather);
    }


    // Filter buttons
    const allButton = document.getElementById("allButton");
    const sportsButton = document.getElementById("sportsButton");
    const eventsButton = document.getElementById("eventsButton");


    if (allButton) {
        allButton.addEventListener("click", showAll);
    }

    if (sportsButton) {
        sportsButton.addEventListener("click", showSports);
    }

    if (eventsButton) {
        eventsButton.addEventListener("click", showEvents);
    }

});