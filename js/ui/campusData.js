
export function displayCampusData(data) {
    if (!data) {
        console.error("No campus data available.");
        return;
    }

    displayEvents(data.events || []);
    displaySports(data.sports || []);
    displayUpdates(data.updates || []);
}

function showEmptyState(container, message) {
    const text = document.createElement("p");
    text.textContent = message;
    container.appendChild(text);
}

function displayEvents(events) {
    const container = document.getElementById("events-list");

    if (!container) return;

    container.replaceChildren();

    if (events.length === 0) {
        showEmptyState(container, "No campus events available.");
        return;
    }

    events.forEach((event) => {
        const card = document.createElement("div");
        card.className = "dynamic-card";

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = "EVENT";

        const title = document.createElement("h3");
        title.textContent = event.title;

        const description = document.createElement("p");
        description.textContent = event.description;

        const location = document.createElement("small");
        location.textContent = `📍 ${event.location}`;

        card.append(category, title, description, location);
        container.appendChild(card);
    });
}

function displaySports(sports) {
    const container = document.getElementById("sports-list");

    if (!container) return;

    container.replaceChildren();

    if (sports.length === 0) {
        showEmptyState(container, "No sports games available.");
        return;
    }

    sports.forEach((sport) => {
        const card = document.createElement("div");
        card.className = "dynamic-card";

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = "SPORTS";

        const title = document.createElement("h3");
        title.textContent = sport.title;

        const description = document.createElement("p");
        description.textContent = sport.description;

        const location = document.createElement("small");
        location.textContent = `📍 ${sport.location}`;

        card.append(category, title, description, location);
        container.appendChild(card);
    });
}

function displayUpdates(updates) {
    const container = document.getElementById("updates-list");

    if (!container) return;

    container.replaceChildren();

    if (updates.length === 0) {
        showEmptyState(container, "No campus updates available.");
        return;
    }

    updates.forEach((update) => {
        const item = document.createElement("div");
        item.className = "update-item";

        const title = document.createElement("strong");
        title.textContent = update.title;

        const message = document.createElement("p");
        message.textContent = update.message;

        item.append(title, message);
        container.appendChild(item);
    });
}
