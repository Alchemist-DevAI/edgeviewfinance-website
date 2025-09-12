import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.edgeviewfinance.com.au/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemapContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};

export const prerender = true;