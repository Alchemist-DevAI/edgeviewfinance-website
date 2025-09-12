export const prerender = false; // Mark this endpoint as server-side

export async function GET({ request }) {
  return new Response(JSON.stringify({
    success: true,
    message: 'Test API endpoint is working',
    timestamp: new Date().toISOString(),
    method: 'GET'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function POST({ request }) {
  return new Response(JSON.stringify({
    success: true,
    message: 'Test API endpoint is working',
    timestamp: new Date().toISOString(),
    method: 'POST'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function OPTIONS({ request }) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}