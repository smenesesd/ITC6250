import { showWeather } from "./ui/weather.js";

import {
    showAll,
    showSports,
    showEvents
} from "./ui/filters.js";

import { setupNavigation } from "./ui/navigation.js";

import { getCampusData } from "./services/apiService.js";

import { displayCampusData } from "./ui/campusData.js";

import { setupAdminAuth } from "./ui/admin.js";
import { summarizeCampusUpdates } from "./services/aiSummaryService.js";


document.addEventListener("DOMContentLoaded", async () => {

    const weatherButton = document.getElementById("weatherButton");
    const allButton = document.getElementById("allButton");
    const sportsButton = document.getElementById("sportsButton");
    const eventsButton = document.getElementById("eventsButton");
    const summaryButton = document.getElementById("ai-summary-button");
    const summaryStatus = document.getElementById("ai-summary-status");
    const summaryResult = document.getElementById("ai-summary-result");

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

    if (summaryButton) {
        summaryButton.addEventListener("click", async () => {
            const updates = Array.from(
                document.querySelectorAll("#updates-list .update-item")
            ).map((item) => {
                const title = item.querySelector("strong")?.textContent?.trim() || "Campus update";
                const message = item.querySelector("p")?.textContent?.trim() || "";
                return message ? `${title}: ${message}` : title;
            }).filter(Boolean);

            if (updates.length === 0) {
                summaryStatus.textContent = "There are no campus updates to summarize.";
                summaryResult.hidden = true;
                return;
            }

            summaryButton.disabled = true;
            summaryStatus.textContent = "Creating an AI summary...";
            summaryResult.hidden = true;
            summaryResult.textContent = "";

            try {
                const summary = await summarizeCampusUpdates(updates);
                summaryResult.textContent = summary;
                summaryResult.hidden = false;
                summaryStatus.textContent = "AI summary is ready.";
            } catch (error) {
                console.error("Campus update summary failed:", error);
                summaryStatus.textContent = "The summary could not be created. Please try again.";
            } finally {
                summaryButton.disabled = false;
            }
        });
    }

    // COnfigure navigation and admin auth

    setupNavigation();
    setupAdminAuth();


    // Load and display campus data
    
    // Version 8: Improved API Error Handling
    const campusStatus = document.getElementById(
        "campus-data-status"
    );
    const campusRetry = document.getElementById(
        "campus-data-retry"
    );

    let isLoadingCampusData = false;

    async function loadCampusData() {
        if (isLoadingCampusData) return;

        isLoadingCampusData = true;
        campusRetry.hidden = true;
        campusRetry.disabled = true;
        campusStatus.textContent = "Loading campus data...";

        try {
            const campusData = await getCampusData();

            if (campusData === null) {
                throw new Error("Campus data request failed.");
            }

            displayCampusData(campusData);

            const totalItems =
                campusData.events.length +
                campusData.sports.length +
                campusData.updates.length;

            campusStatus.textContent = totalItems === 0
                ? "No campus information is available yet."
                : "Campus data loaded successfully.";

        } catch (error) {
            console.error("Campus data loading failed:", error);

            campusStatus.textContent =
                "Unable to load campus information. Please try again.";

            campusRetry.hidden = false;

        } finally {
            isLoadingCampusData = false;
            campusRetry.disabled = false;
        }
    }

    campusRetry.addEventListener("click", loadCampusData);

    await loadCampusData();

});
