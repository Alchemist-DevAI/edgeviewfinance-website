# SEO & Search Console Implementation Guide

## Immediate Actions Required

### 1. Google Search Console Setup

#### Step 1: Verify Domain Ownership
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property → Domain → Enter `edgeviewfinance.com.au`
3. Choose DNS verification method
4. Add TXT record to your DNS:
   ```
   Type: TXT
   Name: @ (or leave blank)
   Value: google-site-verification=YOUR_VERIFICATION_CODE
   TTL: 3600
   ```
5. Click Verify (may take up to 48 hours)

#### Step 2: Submit Sitemap
Once verified:
1. Go to Sitemaps in left menu
2. Enter: `sitemap.xml`
3. Submit and monitor for errors

### 2. Essential Meta Tags Implementation

Add to your layout or individual pages:

```astro
---
// In your Layout.astro or page frontmatter
const seoData = {
  title: "Commercial Finance Broker Brisbane | Edgeview Finance",
  description: "Leading commercial finance broker in Brisbane. Specialising in equipment finance, business loans, and cashflow solutions for Queensland businesses.",
  image: "https://www.edgeviewfinance.com.au/og-image.jpg",
  url: "https://www.edgeviewfinance.com.au"
}
---

<head>
  <!-- Primary Meta Tags -->
  <title>{seoData.title}</title>
  <meta name="title" content={seoData.title} />
  <meta name="description" content={seoData.description} />
  <meta name="keywords" content="commercial finance broker, equipment finance, business loans, Brisbane, Queensland" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={seoData.url} />
  <meta property="og:title" content={seoData.title} />
  <meta property="og:description" content={seoData.description} />
  <meta property="og:image" content={seoData.image} />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={seoData.url} />
  <meta property="twitter:title" content={seoData.title} />
  <meta property="twitter:description" content={seoData.description} />
  <meta property="twitter:image" content={seoData.image} />
  
  <!-- Canonical URL -->
  <link rel="canonical" href={seoData.url} />
</head>
```

### 3. Structured Data (JSON-LD)

Add to your homepage:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Edgeview Finance",
  "description": "Commercial finance broker specialising in equipment finance and business loans",
  "url": "https://www.edgeviewfinance.com.au",
  "telephone": "+61-7-XXXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Brisbane",
    "addressRegion": "QLD",
    "postalCode": "4000",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -27.4698,
    "longitude": 153.0251
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.linkedin.com/company/edgeview-finance",
    "https://www.facebook.com/edgeviewfinance"
  ],
  "priceRange": "$$"
}
</script>
```

### 4. Dynamic Sitemap Generation

Create `src/pages/sitemap.xml.ts`:

```typescript
export async function GET() {
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/services', priority: 0.9, changefreq: 'weekly' },
    { url: '/services/equipment-finance', priority: 0.9, changefreq: 'weekly' },
    { url: '/services/business-loans', priority: 0.9, changefreq: 'weekly' },
    { url: '/services/cashflow-finance', priority: 0.9, changefreq: 'weekly' },
    { url: '/calculator', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/blog', priority: 0.7, changefreq: 'daily' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>https://www.edgeviewfinance.com.au${page.url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

### 5. Google Analytics 4 Setup

1. Create GA4 property at [Google Analytics](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to your Layout.astro:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 6. LLM/AI Search Optimization

#### FAQ Schema for Better AI Understanding

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of commercial finance does Edgeview Finance offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Edgeview Finance specialises in equipment finance, business loans, invoice financing, and cashflow solutions for Queensland businesses. We work with over 30 lenders to find the best rates and terms for your specific needs."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can I get equipment finance approved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most equipment finance applications receive conditional approval within 24-48 hours. Final approval and settlement typically occur within 3-5 business days, depending on the complexity and documentation requirements."
      }
    }
  ]
}
</script>
```

#### Service Schema for Each Service Page

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Equipment Finance",
  "provider": {
    "@type": "FinancialService",
    "name": "Edgeview Finance"
  },
  "areaServed": {
    "@type": "State",
    "name": "Queensland",
    "containedIn": {
      "@type": "Country",
      "name": "Australia"
    }
  },
  "description": "Fast equipment finance solutions for Queensland businesses. Finance new or used equipment with competitive rates and flexible terms.",
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "From 4.99% p.a.",
      "priceCurrency": "AUD"
    }
  }
}
</script>
```

### 7. Core Web Vitals Optimization

#### Image Optimization
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image 
  src={heroImage}
  alt="Commercial finance solutions"
  width={1920}
  height={1080}
  format="webp"
  quality={80}
  loading="lazy"
/>
```

#### Font Optimization
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="font" href="/fonts/main-font.woff2" type="font/woff2" crossorigin>
```

### 8. Local SEO Setup

#### Google Business Profile
1. Claim/verify your business at [Google Business](https://business.google.com)
2. Complete all information:
   - Business hours
   - Services
   - Service areas
   - Photos
   - Regular posts

#### Local Directories
Submit to:
- True Local
- Yellow Pages
- Yelp Australia
- HotFrog
- Australian Business Directory
- Brisbane Business Directory

### 9. Performance Monitoring Tools

Set up accounts for:
1. [Google PageSpeed Insights](https://pagespeed.web.dev/)
2. [GTmetrix](https://gtmetrix.com/)
3. [Pingdom](https://www.pingdom.com/)
4. [UptimeRobot](https://uptimerobot.com/) - Free uptime monitoring

### 10. Content Strategy for SEO

#### Target Keywords
Primary:
- "commercial finance broker Brisbane"
- "equipment finance Queensland"
- "business loans Brisbane"

Long-tail:
- "excavator finance Brisbane"
- "truck finance for small business Queensland"
- "invoice financing solutions Brisbane"

#### Content Calendar
- Weekly blog posts targeting specific equipment/industry combinations
- Monthly case studies
- Quarterly industry reports
- Regular FAQ updates

## Testing Checklist

### Pre-Launch SEO Audit
- [ ] All pages have unique titles (50-60 chars)
- [ ] All pages have unique descriptions (150-160 chars)
- [ ] All images have descriptive alt text
- [ ] URLs are clean and descriptive
- [ ] Internal linking structure is logical
- [ ] 404 page exists and is helpful
- [ ] XML sitemap generates correctly
- [ ] Robots.txt is properly configured

### Technical SEO
- [ ] HTTPS is enforced
- [ ] WWW vs non-WWW redirect is consistent
- [ ] Page load speed < 3 seconds
- [ ] Mobile responsive design verified
- [ ] Structured data validates (use Google's tool)
- [ ] Canonical URLs are set
- [ ] Hreflang tags (if multi-language)

### Post-Launch Monitoring
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Monitor crawl errors daily for first week
- [ ] Check index coverage
- [ ] Review search performance weekly
- [ ] Monitor Core Web Vitals

## Quick Wins for Immediate Impact

1. **Title Tag Optimization**: Include location + service + "Commercial Finance Broker"
2. **Local Content**: Create area-specific landing pages for major Queensland cities
3. **Speed Optimization**: Implement lazy loading for all images
4. **Mobile First**: Ensure touch targets are at least 48x48 pixels
5. **Schema Markup**: Implement on all pages, not just homepage
6. **Internal Linking**: Link from high-authority pages to important service pages
7. **Content Depth**: Aim for 800+ words on service pages with comprehensive information
8. **FAQ Section**: Add to every service page with 5-10 common questions

## Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Core Web Vitals Report](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Structured Data Testing Tool](https://developers.google.com/search/docs/advanced/structured-data)