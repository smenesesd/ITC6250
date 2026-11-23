const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/syh9bhjy1xpaeybtptw91w2lvj8f6ueo";

export async function summarizeCampusUpdates(updates) {
    if (!Array.isArray(updates) || updates.length === 0) {
        throw new Error("There are no campus updates to summarize.");
    }

    const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        // URL-encoded form data avoids a browser CORS preflight request.
        body: new URLSearchParams({ updates: updates.join("\n") })
    });

    if (!response.ok) {
        throw new Error(`Make returned HTTP ${response.status}.`);
    }

    const summary = (await response.text()).trim();
    if (!summary) {
        throw new Error("Make returned an empty summary.");
    }

    return summary;
}
