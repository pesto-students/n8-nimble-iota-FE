import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./components/App/App";

Sentry.init({
    dsn: "https://2d10f589cb6e4cabb6c3b9440dffc49c@o1015448.ingest.sentry.io/5981037",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
