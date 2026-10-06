function showInfo() {
    let info = document.getElementById("info");

    if (info.innerHTML == "") {
        info.innerHTML =
            "Campus Life Hub is a website designed to help students find useful information about campus events, sports, recreation, and other services.";
    } else {
        info.innerHTML = "";
    }
}


function showWeather() {
    let weather = document.getElementById("weather");

    if (weather.innerHTML == "Check today's weather.") {
        weather.innerHTML = "Boston: 72°F - Partly Cloudy";
    } else {
        weather.innerHTML = "Check today's weather.";
    }
}


function showAll() {
    document.getElementById("sports").style.display = "flex";
    document.getElementById("events").style.display = "flex";
}


function showSports() {
    document.getElementById("sports").style.display = "flex";
    document.getElementById("events").style.display = "none";
}


function showEvents() {
    document.getElementById("sports").style.display = "none";
    document.getElementById("events").style.display = "flex";
}