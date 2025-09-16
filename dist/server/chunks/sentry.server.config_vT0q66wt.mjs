!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2281dbe3-d161-4aa8-8c9a-54d26094d6a8",e._sentryDebugIdIdentifier="sentry-dbid-2281dbe3-d161-4aa8-8c9a-54d26094d6a8");})();}catch(e){}};import * as Sentry from '@sentry/node';

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
