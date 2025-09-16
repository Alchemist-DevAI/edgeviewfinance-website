import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://3002f70b9e6ddd7e45b0638c0ae5c7a6@o4510027874172928.ingest.us.sentry.io/4510027902287872",
  environment: import.meta.env.MODE || "production",
  integrations: [
    // Client-side integrations for Astro
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Session Replay - only in production to avoid noise
  replaysSessionSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 0,
  replaysOnErrorSampleRate: 1.0,

  beforeSend(event) {
    // Filter out noise in development
    if (import.meta.env.MODE === 'development') {
      return null;
    }
    return event;
  },

  // Additional Sentry configuration for production
  debug: import.meta.env.MODE === 'development',
  release: import.meta.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
});