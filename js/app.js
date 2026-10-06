import { showWeather } from "./ui/weather.js";

import {
    showAll,
    showSports,
    showEvents
} from "./ui/filters.js";


// Make functions available to buttons in index.html
window.showWeather = showWeather;
window.showAll = showAll;
window.showSports = showSports;
window.showEvents = showEvents;