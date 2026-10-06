export function displayCampusData(data) {
    if (!data) {
        console.error("No campus data available.");
        return;
    }

    displayEvents(data.events);
    displaySports(data.sports);
    displayUpdates(data.updates);
}


function displayEvents(events) {
    const eventsContainer = document.getElementById("events-list");

    if (!eventsContainer) {
        return;
    }

    eventsContainer.innerHTML = "";

    events.forEach((event) => {
        const card = document.createElement("div");

        card.className = "dynamic-card";

        card.innerHTML = `
            <span class="category">EVENT</span>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <small>📍 ${event.location}</small>
        `;

        eventsContainer.appendChild(card);
    });
}


function displaySports(sports) {
    const sportsContainer = document.getElementById("sports-list");

    if (!sportsContainer) {
        return;
    }

    sportsContainer.innerHTML = "";

    sports.forEach((sport) => {
        const card = document.createElement("div");

        card.className = "dynamic-card";

        card.innerHTML = `
            <span class="category">SPORTS</span>
            <h3>${sport.title}</h3>
            <p>${sport.description}</p>
            <small>📍 ${sport.location}</small>
        `;

        sportsContainer.appendChild(card);
    });
}


function displayUpdates(updates) {
    const updatesContainer = document.getElementById("updates-list");

    if (!updatesContainer) {
        return;
    }

    updatesContainer.innerHTML = "";

    updates.forEach((update) => {
        const item = document.createElement("div");

        item.className = "update-item";

        item.innerHTML = `
            <strong>${update.title}</strong>
            <p>${update.message}</p>
        `;

        updatesContainer.appendChild(item);
    });
}