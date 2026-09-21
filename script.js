function showInfo(){
    let info = document.getElementById("info");

    if (info.innerHTML == "") {
        info.innerHTML = "Campus Life Hub is a website designed to help students find useful information about campus events, sports, recreation, and other services.";
    } else {
        info.innerHTML = "";
    }
    
}