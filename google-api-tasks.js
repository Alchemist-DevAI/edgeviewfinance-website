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
const searchConsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

// Site URL from environment
const SITE_URL = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'https://www.edgeviewfinance.com.au';
const SITEMAP_URL = `${SITE_URL}/sitemap-index.xml`;

async function submitSitemap() {
  console.log('📤 Submitting sitemap to Google Search Console...');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Sitemap: ${SITEMAP_URL}`);
  
  try {
    const response = await searchConsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL
    });
    
    console.log('✅ Sitemap submitted successfully!');
    console.log('Response:', response.data || 'OK');
    
    // List existing sitemaps
    const listResponse = await searchConsole.sitemaps.list({
      siteUrl: SITE_URL
    });
    
    console.log('\n📋 Current sitemaps:');
    if (listResponse.data.sitemap) {
      listResponse.data.sitemap.forEach(sitemap => {
        console.log(`  - ${sitemap.path}`);
        console.log(`    Status: ${sitemap.isPending ? 'Pending' : 'Processed'}`);
        console.log(`    Last submitted: ${sitemap.lastSubmitted}`);
        console.log(`    Last downloaded: ${sitemap.lastDownloaded}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error submitting sitemap:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

async function requestIndexing(urls) {
  console.log('\n🔍 Requesting indexing for priority pages...');
  
  const indexingAPI = google.indexing({ version: 'v3', auth: oauth2Client });
  
  for (const url of urls) {
    try {
      console.log(`  Requesting indexing for: ${url}`);
      
      const response = await indexingAPI.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED'
        }
      });
      
      console.log(`  ✅ Indexing requested for ${url}`);
      if (response.data) {
        console.log(`     Notification time: ${response.data.notifyTime}`);
      }
    } catch (error) {
      console.error(`  ❌ Error requesting indexing for ${url}:`, error.message);
    }
  }
}

async function getSearchConsoleStats() {
  console.log('\n📊 Getting Search Console stats...');
  
  try {
    // Get search analytics data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Last 7 days
    
    const response = await searchConsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 10
      }
    });
    
    if (response.data.rows) {
      console.log('\nTop search queries (last 7 days):');
      response.data.rows.forEach((row, index) => {
        console.log(`  ${index + 1}. "${row.keys[0]}" - ${row.clicks} clicks, ${row.impressions} impressions`);
      });
    } else {
      console.log('No search data available yet.');
    }
    
  } catch (error) {
    console.error('❌ Error getting Search Console stats:', error.message);
  }
}

async function updateBusinessProfile() {
  console.log('\n🏢 Updating Google Business Profile...');
  
  try {
    const mybusiness = google.mybusinessaccountmanagement({ version: 'v1', auth: oauth2Client });
    
    // First, list accounts to confirm access
    const accountsResponse = await mybusiness.accounts.list();
    console.log('Available accounts:', accountsResponse.data);
    
    // Note: The actual Business Profile API requires additional setup
    // This is a placeholder for the actual implementation
    console.log('⚠️  Google Business Profile API requires additional configuration.');
    console.log('   Please update manually via: https://business.google.com');
    
  } catch (error) {
    console.error('❌ Error accessing Business Profile:', error.message);
    console.log('⚠️  Please update Business Profile manually via: https://business.google.com');
  }
}

async function main() {
  console.log('🚀 Starting Google API Migration Tasks\n');
  console.log('=' .repeat(50));
  
  // 1. Submit sitemap
  await submitSitemap();
  
  // 2. Request indexing for priority pages
  const priorityPages = [
    'https://www.edgeviewfinance.com.au/',
    'https://www.edgeviewfinance.com.au/equipment-finance',
    'https://www.edgeviewfinance.com.au/services',
    'https://www.edgeviewfinance.com.au/contact',
    'https://www.edgeviewfinance.com.au/finance-ready-assessment',
    'https://www.edgeviewfinance.com.au/about',
    'https://www.edgeviewfinance.com.au/success-stories'
  ];
  
  await requestIndexing(priorityPages);
  
  // 3. Get Search Console stats
  await getSearchConsoleStats();
  
  // 4. Update Business Profile (manual for now)
  await updateBusinessProfile();
  
  console.log('\n=' .repeat(50));
  console.log('✅ Google API migration tasks completed!');
  console.log('\n📝 Next steps:');
  console.log('  1. Monitor Search Console for indexing status');
  console.log('  2. Update Google Business Profile website URL manually');
  console.log('  3. Check Core Web Vitals in Search Console');
  console.log('  4. Submit any additional sitemaps as needed');
}

// Run the main function
main().catch(console.error);