#!/usr/bin/env node

import { google } from 'googleapis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

// Google OAuth2 configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials with refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Google Search Console client
const webmasters = google.webmasters({ version: 'v3', auth: oauth2Client });

// Site URL from environment
const SITE_URL = 'https://www.edgeviewfinance.com.au/';
const SITEMAP_URL = 'https://www.edgeviewfinance.com.au/sitemap-index.xml';

async function submitSitemap() {
  console.log('📤 Submitting sitemap to Google Search Console...');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Sitemap: ${SITEMAP_URL}`);
  
  try {
    // Submit the sitemap
    await webmasters.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL
    });
    
    console.log('✅ Sitemap submitted successfully!');
    
    // List existing sitemaps to confirm
    const listResponse = await webmasters.sitemaps.list({
      siteUrl: SITE_URL
    });
    
    console.log('\n📋 Current sitemaps:');
    if (listResponse.data.sitemap && listResponse.data.sitemap.length > 0) {
      listResponse.data.sitemap.forEach(sitemap => {
        console.log(`  - ${sitemap.path}`);
        console.log(`    Status: ${sitemap.isPending ? 'Pending' : 'Processed'}`);
        if (sitemap.lastSubmitted) {
          console.log(`    Last submitted: ${sitemap.lastSubmitted}`);
        }
        if (sitemap.lastDownloaded) {
          console.log(`    Last downloaded: ${sitemap.lastDownloaded}`);
        }
      });
    } else {
      console.log('  No sitemaps found yet. The submission may take a few minutes to appear.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response && error.response.data) {
      console.error('Details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Run the function
submitSitemap().catch(console.error);