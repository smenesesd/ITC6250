export function showAll() {
    const sports = document.getElementById("sports");
    const events = document.getElementById("events");

    if (sports) {
        sports.style.display = "flex";
    }

    if (events) {
        events.style.display = "flex";
    }
}


export function showSports() {
    const sports = document.getElementById("sports");
    const events = document.getElementById("events");

    if (sports) {
        sports.style.display = "flex";
    }

    if (events) {
        events.style.display = "none";
    }
}


export function showEvents() {
    const sports = document.getElementById("sports");
    const events = document.getElementById("events");

    if (sports) {
        sports.style.display = "none";
    }

    if (events) {
        events.style.display = "flex";
    }
}