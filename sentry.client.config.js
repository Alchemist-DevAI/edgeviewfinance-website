import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://3002f70b9e6ddd7e45b0638c0ae5c7a6@o4510027874172928.ingest.us.sentry.io/4510027902287872",
  environment: import.meta.env.MODE || "production",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // Adds request headers and IP for users
  sendDefaultPii: true,
  // Additional options
  beforeSend(event) {
    // Filter out noise in development
    if (import.meta.env.MODE === 'development') {
      return null;
    }
    return event;
  },
});