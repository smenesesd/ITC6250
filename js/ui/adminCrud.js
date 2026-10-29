
import { supabase } from "../services/supabaseClient.js";
import { getCampusData } from "../services/apiService.js";
import { displayCampusData } from "./campusData.js";

const ADMIN_UID = "49342608-406a-4af8-a674-44f73a8e71f4";

let initialized = false;

export function setupAdminCrud() {
    if (initialized) return;

    const panel = document.getElementById("admin-events-panel");
    const form = document.getElementById("admin-event-form");
    const eventIdInput = document.getElementById("admin-event-id");
    const titleInput = document.getElementById("admin-event-title");
    const descriptionInput = document.getElementById("admin-event-description");
    const categoryInput = document.getElementById("admin-event-category");
    const dateInput = document.getElementById("admin-event-date");
    const locationInput = document.getElementById("admin-event-location");
    const saveButton = document.getElementById("admin-event-save-button");
    const cancelButton = document.getElementById("admin-event-cancel-button");
    const status = document.getElementById("admin-event-form-status");
    const list = document.getElementById("admin-events-management-list");

    if (
        !panel || !form || !eventIdInput || !titleInput ||
        !descriptionInput || !categoryInput || !dateInput ||
        !locationInput || !saveButton || !cancelButton ||
        !status || !list
    ) {
        console.warn("Administrator event management form was not found.");
        return;
    }

    initialized = true;

    function setStatus(message, type = "info") {
        status.textContent = message;
        status.style.color =
            type === "error" ? "#b91c1c" :
            type === "success" ? "#15803d" : "";
    }

    async function requireAdmin() {
        const { data, error } = await supabase.auth.getUser();

        if (error) throw error;

        if (data.user?.id !== ADMIN_UID) {
            throw new Error("Administrator authentication is required.");
        }
    }

    async function loadLocations() {
        const { data, error } = await supabase
            .from("locations")
            .select("id, name, building")
            .order("name");

        if (error) throw error;

        locationInput.replaceChildren();

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Select a location";
        locationInput.appendChild(placeholder);

        (data || []).forEach((location) => {
            const option = document.createElement("option");
            option.value = location.id;
            option.textContent = `${location.name} — ${location.building}`;
            locationInput.appendChild(option);
        });
    }

    async function refreshViews() {
        await loadEvents();

        const campusData = await getCampusData();

        if (!campusData) {
            throw new Error("Unable to refresh the campus dashboard.");
        }

        displayCampusData(campusData);
    }

    async function loadEvents() {
        const { data, error } = await supabase
            .from("events")
            .select(`
                id,
                title,
                description,
                category,
                event_date,
                location_id,
                locations (name, building)
            `)
            .order("event_date", { ascending: true });

        if (error) throw error;

        list.replaceChildren();

        if (!data || data.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "No campus events found.";
            list.appendChild(emptyMessage);
            return;
        }

        data.forEach((event) => {
            const card = document.createElement("article");
            card.className = "admin-event-card";

            const title = document.createElement("h4");
            title.textContent = event.title;

            const details = document.createElement("p");
            details.textContent =
                `${event.event_date} · ${event.locations?.name || "Location unavailable"}`;

            const description = document.createElement("p");
            description.textContent = event.description;

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.textContent = "Edit";

            editButton.addEventListener("click", () => {
                eventIdInput.value = event.id;
                titleInput.value = event.title;
                descriptionInput.value = event.description;
                categoryInput.value = event.category;
                dateInput.value = event.event_date;
                locationInput.value = event.location_id;

                saveButton.textContent = "Update Event";
                cancelButton.hidden = false;

                setStatus(`Editing: ${event.title}`);
                form.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", async () => {
                if (!window.confirm(`Delete "${event.title}"?`)) return;

                deleteButton.disabled = true;

                try {
                    await requireAdmin();

                    const { error: deleteError } = await supabase
                        .from("events")
                        .delete()
                        .eq("id", event.id);

                    if (deleteError) throw deleteError;

                    if (eventIdInput.value === event.id) {
                        resetForm();
                    }

                    setStatus("Event deleted successfully.", "success");
                    await refreshViews();
                } catch (error) {
                    setStatus(`Delete failed: ${error.message}`, "error");
                } finally {
                    deleteButton.disabled = false;
                }
            });

            card.append(title, details, description, editButton, deleteButton);
            list.appendChild(card);
        });
    }

    function resetForm() {
        form.reset();
        eventIdInput.value = "";
        saveButton.textContent = "Create Event";
        cancelButton.hidden = true;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        saveButton.disabled = true;

        try {
            await requireAdmin();

            const payload = {
                title: titleInput.value.trim(),
                description: descriptionInput.value.trim(),
                category: categoryInput.value,
                event_date: dateInput.value,
                location_id: locationInput.value
            };

            const eventId = eventIdInput.value;
            let error;

            if (eventId) {
                ({ error } = await supabase
                    .from("events")
                    .update(payload)
                    .eq("id", eventId));
            } else {
                ({ error } = await supabase
                    .from("events")
                    .insert(payload));
            }

            if (error) throw error;

            resetForm();

            setStatus(
                eventId
                    ? "Event updated successfully."
                    : "Event created successfully.",
                "success"
            );

            await refreshViews();
        } catch (error) {
            setStatus(`Save failed: ${error.message}`, "error");
        } finally {
            saveButton.disabled = false;
        }
    });

    cancelButton.addEventListener("click", () => {
        resetForm();
        setStatus("Edit cancelled.");
    });

    async function initialize() {
        try {
            await loadLocations();
            await refreshViews();
        } catch (error) {
            setStatus(`Unable to load events: ${error.message}`, "error");
        }
    }

    initialize();
}
