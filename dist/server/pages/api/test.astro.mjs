!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="89fa4f60-0d45-467c-83d3-85b1de96ff96",e._sentryDebugIdIdentifier="sentry-dbid-89fa4f60-0d45-467c-83d3-85b1de96ff96");})();}catch(e){}};export { renderers } from '../../renderers.mjs';

const prerender = false;
async function GET({ request }) {
  return new Response(JSON.stringify({
    success: true,
    message: "Test API endpoint is working",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    method: "GET"
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
async function POST({ request }) {
  return new Response(JSON.stringify({
    success: true,
    message: "Test API endpoint is working",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    method: "POST"
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
async function OPTIONS({ request }) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
