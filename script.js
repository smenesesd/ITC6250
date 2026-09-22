function showInfo(){
    let info = document.getElementById("info");

    if (info.innerHTML == "") {
        info.innerHTML = "Campus Life Hub is a website designed to help students find useful information about campus events, sports, recreation, and other services.";
    } else {
        info.innerHTML = "";
    }
    
}

function showWeather(){
    let weather = document.getElementById("weather");

    if(weather.innerHTML == "") {
        weather.innerHTML = "Boston: 72°F - Party Cloudy";
    } else {
        weather.innerHTML = "";
    }
}

function showAll(){
    document.getElementById("sports").style.display = "block";
    document.getElementById("events").style.display = "block";
}

function showSports(){
    document.getElementById("sports").style.display = "block";
    document.getElementById("events").style.display = "none";
}

function showEvents(){
    document.getElementById("sports").style.display = "none";
    document.getElementById("events").style.display = "block";
}