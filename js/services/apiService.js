
import { supabase } from "./supabaseClient.js";

export async function getCampusData() {
    try {
        // Retrieve events, sports games, and campus updates.
        const [eventsResult, sportsResult, updatesResult] =
            await Promise.all([
                supabase
                    .from("events")
                    .select(`
                        id,
                        title,
                        description,
                        category,
                        event_date,
                        locations (
                            name,
                            building,
                            address
                        )
                    `)
                    .order("event_date", { ascending: true }),

                supabase
                    .from("sports_games")
                    .select(`
                        id,
                        sport_name,
                        opponent,
                        game_date,
                        start_time,
                        status,
                        locations (
                            name,
                            building,
                            address
                        )
                    `)
                    .order("game_date", { ascending: true }),

                supabase
                    .from("campus_updates")
                    .select(`
                        id,
                        title,
                        message,
                        category,
                        published_at
                    `)
                    .order("published_at", { ascending: false })
            ]);

        // Stop if any database query fails.
        const error =
            eventsResult.error ||
            sportsResult.error ||
            updatesResult.error;

        if (error) {
            throw error;
        }

        // Format the location information for display.
        function formatLocation(location) {
            if (!location) {
                return "Location unavailable";
            }

            return location.name;
        }

        // Convert database events to the existing UI format.
        const events = (eventsResult.data || []).map((event) => ({
            id: event.id,
            title: event.title,
            description: event.description,
            category: event.category,
            date: event.event_date,
            location: formatLocation(event.locations)
        }));

        // Convert sports games to the format used by the UI.
        const sports = (sportsResult.data || []).map((game) => ({
            id: game.id,
            title: game.sport_name,
            description:
                `Opponent: ${game.opponent} | ` +
                `Date: ${game.game_date} | ` +
                `Time: ${String(game.start_time).slice(0, 5)} | ` +
                `Status: ${game.status}`,
            location: formatLocation(game.locations),
            date: game.game_date,
            status: game.status
        }));

        // Convert campus updates to the existing UI format.
        const updates = (updatesResult.data || []).map((update) => ({
            id: update.id,
            title: update.title,
            message: update.message,
            category: update.category,
            published_at: update.published_at
        }));

        return { events, sports, updates };

    } catch (error) {
        console.error("Error loading data from Supabase:", error);
        return null;
    }
}
