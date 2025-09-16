#!/usr/bin/env node

import { google } from 'googleapis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

async function main() {
  // Create OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // Set credentials with refresh token
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  // Create Search Console client (using webmasters v3 API)
  const webmasters = google.webmasters({ version: 'v3', auth: oauth2Client });
  
  const siteUrl = 'https://www.edgeviewfinance.com.au/';
  const sitemapPath = 'https://www.edgeviewfinance.com.au/sitemap-index.xml';

  console.log('🚀 Google Search Console Operations\n');
  console.log('=' .repeat(50));

  try {
    // 1. List verified sites
    console.log('\n📋 Listing verified sites...');
    const sitesResponse = await webmasters.sites.list();
    
    if (sitesResponse.data.siteEntry) {
      console.log('Verified sites:');
      sitesResponse.data.siteEntry.forEach(site => {
        console.log(`  - ${site.siteUrl} (Permission: ${site.permissionLevel})`);
      });
    }

    // 2. Submit sitemap
    console.log('\n📤 Submitting sitemap...');
    await webmasters.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: sitemapPath
    });
    console.log('✅ Sitemap submitted successfully!');

    // 3. Get sitemap status
    console.log('\n📊 Getting sitemap status...');
    const sitemapsResponse = await webmasters.sitemaps.list({
      siteUrl: siteUrl
    });
    
    if (sitemapsResponse.data.sitemap) {
      console.log('Sitemaps for this site:');
      sitemapsResponse.data.sitemap.forEach(sitemap => {
        console.log(`  - ${sitemap.path}`);
        console.log(`    Type: ${sitemap.type || 'SITEMAP'}`);
        console.log(`    Last submitted: ${sitemap.lastSubmitted || 'Just submitted'}`);
        console.log(`    Last downloaded: ${sitemap.lastDownloaded || 'Not yet'}`);
        console.log(`    Errors: ${sitemap.errors || 0}`);
        console.log(`    Warnings: ${sitemap.warnings || 0}`);
      });
    }

    // 4. Get search analytics (last 7 days)
    console.log('\n📈 Getting search analytics (last 7 days)...');
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    
    const analyticsResponse = await webmasters.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['page'],
        rowLimit: 5
      }
    });
    
    if (analyticsResponse.data.rows && analyticsResponse.data.rows.length > 0) {
      console.log('Top pages by impressions:');
      analyticsResponse.data.rows.forEach((row, i) => {
        console.log(`  ${i + 1}. ${row.keys[0]}`);
        console.log(`     Clicks: ${row.clicks}, Impressions: ${row.impressions}`);
      });
    } else {
      console.log('No search data available yet (site may be newly added).');
    }

    console.log('\n✅ All operations completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('  1. Monitor indexing in Search Console: https://search.google.com/search-console');
    console.log('  2. Use URL Inspection tool for priority pages');
    console.log('  3. Check Core Web Vitals reports');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.code === 403) {
      console.log('\n⚠️  Permission issue. Please ensure:');
      console.log('  1. The site is verified in Search Console');
      console.log('  2. You have owner/full permissions');
      console.log('  3. The OAuth token has proper scopes');
    } else if (error.code === 404) {
      console.log('\n⚠️  Site not found. Please ensure:');
      console.log('  1. The site URL is exactly as shown in Search Console');
      console.log('  2. Include trailing slash if needed');
      console.log('  3. Use https:// protocol');
    }
    
    if (error.response && error.response.data) {
      console.log('\nAPI Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Run the script
main().catch(console.error);