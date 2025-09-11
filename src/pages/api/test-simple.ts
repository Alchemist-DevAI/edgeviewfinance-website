import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ 
    message: 'API is working - test deployment',
    timestamp: new Date().toISOString(),
    status: 'active'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  
  return new Response(JSON.stringify({ 
    message: 'POST received',
    received: data,
    timestamp: new Date().toISOString() 
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};