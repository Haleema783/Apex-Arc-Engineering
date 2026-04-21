import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Top-level error boundary. Guarantees the app never renders a blank screen
 * — if React (or a synchronous module like the Supabase client) throws, we
 * show a recoverable fallback instead of an empty document body.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface the failure for Lovable / browser console diagnostics.
    console.error("App crashed:", error, info);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoLogin = () => {
    window.location.assign("/login");
  };

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
            <h1 className="font-display text-xl font-bold text-foreground">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The app failed to load. This is usually caused by a bad deployment
              or a missing configuration value. Please try again, or contact
              your administrator.
            </p>
            <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-xs text-muted-foreground">
              {this.state.error.message}
            </pre>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Reload page
              </button>
              <button
                type="button"
                onClick={this.handleGoLogin}
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Go to sign in
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
