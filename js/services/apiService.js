// External API communication will be implemented here.
// This module will handle requests to services such as weather, events, sports, and maps

export async function getCampusData() {
    try {
        const response = await fetch("./data/campusData.json");

        if (!response.ok) {
            throw new Error("Unable to load campus data.");
        }

        return await response.json();

    } catch (error) {
        console.error("Data access error:", error);
        return null;
    }
}