import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "production",
  integrations: [
    Sentry.nodeIntegrations.http(),
    Sentry.nodeIntegrations.httpIntegration(),
  ],
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter out noise in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    return event;
  },
});