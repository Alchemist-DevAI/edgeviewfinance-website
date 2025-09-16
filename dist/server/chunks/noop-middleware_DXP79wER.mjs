!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c6b0692e-e5c0-46a3-8f38-34398d7694c0",e._sentryDebugIdIdentifier="sentry-dbid-c6b0692e-e5c0-46a3-8f38-34398d7694c0");})();}catch(e){}};import { a4 as NOOP_MIDDLEWARE_HEADER } from './astro/server_Djx-43IL.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

export { NOOP_MIDDLEWARE_FN as N };
