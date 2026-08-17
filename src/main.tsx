import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

const root = createRoot(rootElement);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const renderFallback = (title: string, message: string, details?: string) => {
  root.render(
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
        <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        {details ? (
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-xs text-muted-foreground whitespace-pre-wrap">
            {details}
          </pre>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Reload page
          </button>
          <button
            type="button"
            onClick={() => window.location.assign("/login")}
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Go to sign in
          </button>
        </div>
      </div>
    </div>
  );
};

if (!supabaseUrl || !supabasePublishableKey) {
  const details = [
    !supabaseUrl ? "Missing VITE_SUPABASE_URL" : null,
    !supabasePublishableKey ? "Missing VITE_SUPABASE_PUBLISHABLE_KEY" : null,
  ]
    .filter(Boolean)
    .join("\n");

  console.error("Missing backend configuration.", {
    hasSupabaseUrl: Boolean(supabaseUrl),
    hasSupabasePublishableKey: Boolean(supabasePublishableKey),
  });

  renderFallback(
    "Sign in is temporarily unavailable",
    "This deployment is missing required backend configuration. Please republish from Lovable or restore the missing environment variables.",
    details
  );
} else {
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
      renderFallback(
        "App failed to start",
        "The deployment loaded, but the application could not initialize.",
        message
      );
    });
}

