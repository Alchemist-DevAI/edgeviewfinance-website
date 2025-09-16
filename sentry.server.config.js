import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://3002f70b9e6ddd7e45b0638c0ae5c7a6@o4510027874172928.ingest.us.sentry.io/4510027902287872",
  environment: process.env.NODE_ENV || "production",
  integrations: [
    // Server-side integrations for Astro
  ],
  tracesSampleRate: 1.0,
  sendDefaultPii: true, // Adds request headers and IP for users
  beforeSend(event) {
    // Filter out noise in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    return event;
  },
});