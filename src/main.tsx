import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

const root = createRoot(rootElement);

import("./App.tsx")
  .then(({ default: App }) => {
    root.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
  })
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Unknown startup error";
    console.error("App bootstrap failed:", error);
    root.render(
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
          <h1 className="font-display text-xl font-bold text-foreground">App failed to start</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The deployment loaded, but the application could not initialize.
          </p>
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-xs text-muted-foreground whitespace-pre-wrap">
            {message}
          </pre>
        </div>
      </div>
    );
  });

