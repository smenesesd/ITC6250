# Campus Life Hub

Campus Life Hub is a web application designed to bring useful student-life and recreation information together in one place.

## Features

- Campus dashboard
- Quick links to useful resources
- Campus events and sports information
- Weather section
- Interactive elements using JavaScript

## Technologies

- HTML
- CSS
- JavaScript

## Project Goal

The goal of this project is to create a simple and interactive campus resource that can be expanded in future versions with additional features and APIs.

## Version 7: Make AI announcement summary

Version 7 adds a **Summarize Campus Updates with AI** button. The page sends the currently displayed campus updates to a Make custom webhook. A Make AI Agent creates a short summary, and the Webhook Response module returns the summary to the page.

### Make scenario setup

Use this module order:

1. **Webhooks → Custom webhook** (receives the `updates` form field).
2. **Make AI Agent → Run an agent** (map the incoming `updates` field into Input).
3. **Webhooks → Webhook response** (Status `200`; Body mapped to the AI Agent's `Response`).

In the Webhook Response module's advanced settings, add the header `Access-Control-Allow-Origin` with value `*` so the local browser app can read the response. The page sends URL-encoded form data to avoid a browser preflight request.

### Run the application

Open `index.html` with VS Code Live Server. Make sure the scenario is active, then select **Summarize Campus Updates with AI**. The page shows a loading message, displays the returned summary, and shows a friendly error if the request fails. Make's scenario execution history provides run details for monitoring and troubleshooting.

The Make webhook URL is stored in `js/services/aiSummaryService.js` for this local class demonstration. Treat it as private; do not publish the source code or the webhook URL publicly. If the URL is exposed, replace it in Make and update this file.

For the assignment reflection, disclose that generative AI was used to help create and refine the integration code and documentation.

## Authors

Samuel Meneses
Fanjie Fu
Xuewei Yin
