// Main XML Sitemap for EVFBS Core Pages
// High priority pages for Australian commercial finance

export async function GET() {
  const baseUrl = 'https://edgeviewfinance.com.au';
  const today = new Date().toISOString().split('T')[0];
  
  const mainPages = [
    {
      url: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/services`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/equipment-finance`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/working-capital`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/business-loans`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${baseUrl}/calculator`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/get-quote`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=3600'
    }
  });
}