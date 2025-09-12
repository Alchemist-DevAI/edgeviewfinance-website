#!/usr/bin/env node

import { google } from 'googleapis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

async function requestIndexing() {
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

  // Create Indexing API client
  const indexing = google.indexing({ version: 'v3', auth: oauth2Client });
  
  // Priority URLs to index
  const urls = [
    'https://www.edgeviewfinance.com.au/',
    'https://www.edgeviewfinance.com.au/equipment-finance',
    'https://www.edgeviewfinance.com.au/services',
    'https://www.edgeviewfinance.com.au/contact',
    'https://www.edgeviewfinance.com.au/finance-ready-assessment',
    'https://www.edgeviewfinance.com.au/about',
    'https://www.edgeviewfinance.com.au/success-stories'
  ];

  console.log('🚀 Requesting Google Indexing for Priority Pages\n');
  console.log('=' .repeat(50));

  for (const url of urls) {
    try {
      console.log(`\n📍 Requesting indexing for: ${url}`);
      
      const response = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED'
        }
      });
      
      if (response.data) {
        console.log(`✅ Success! Notification time: ${response.data.notifyTime}`);
        if (response.data.urlNotificationMetadata) {
          console.log(`   Latest update: ${response.data.urlNotificationMetadata.latestUpdate?.notifyTime}`);
        }
      } else {
        console.log('✅ Request sent successfully');
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error for ${url}:`, error.message);
      
      if (error.code === 403) {
        console.log('   Note: Indexing API requires site ownership verification');
        console.log('   Alternative: Use Search Console URL Inspection tool');
        break; // Stop trying other URLs if permission denied
      }
    }
  }

  console.log('\n' + '=' .repeat(50));
  console.log('📝 Indexing requests completed!');
  console.log('\nNote: The Indexing API has quotas:');
  console.log('  - 200 URLs per day');
  console.log('  - 10 URLs per minute');
  console.log('\nFor best results, also:');
  console.log('  1. Submit sitemap in Search Console');
  console.log('  2. Use URL Inspection tool for immediate indexing');
  console.log('  3. Monitor coverage reports');
}

// Run the script
requestIndexing().catch(error => {
  console.error('Script error:', error.message);
  process.exit(1);
});