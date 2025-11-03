export { renderers } from '../../renderers.mjs';

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
