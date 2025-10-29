!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ed475568-743b-4ca3-8c8e-865465df70b6",e._sentryDebugIdIdentifier="sentry-dbid-ed475568-743b-4ca3-8c8e-865465df70b6");})();}catch(e){}};import * as Sentry from '@sentry/astro';

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
  // Additional Sentry configuration for production
  debug: process.env.NODE_ENV === 'development',
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
});
