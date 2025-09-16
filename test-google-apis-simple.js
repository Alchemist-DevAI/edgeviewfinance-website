#!/usr/bin/env node

import { google } from 'googleapis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

// Configuration from environment
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GA_PROPERTY_ID = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
const GMB_ACCOUNT_ID = process.env.GOOGLE_MY_BUSINESS_ACCOUNT_ID;
const GMB_LOCATION_ID = process.env.GOOGLE_MY_BUSINESS_LOCATION_ID;

console.log('🔍 Google API Credentials Check\n');
console.log('================================');

// Check credentials
console.log('✅ Client ID:', CLIENT_ID ? CLIENT_ID.substring(0, 30) + '...' : '❌ MISSING');
console.log('✅ Client Secret:', CLIENT_SECRET ? CLIENT_SECRET.substring(0, 15) + '...' : '❌ MISSING');
console.log('✅ Refresh Token:', REFRESH_TOKEN ? REFRESH_TOKEN.substring(0, 15) + '...' : '❌ MISSING');
console.log('✅ Analytics Property ID:', GA_PROPERTY_ID || '❌ MISSING');
console.log('✅ Business Account ID:', GMB_ACCOUNT_ID || '❌ MISSING');
console.log('✅ Business Location ID:', GMB_LOCATION_ID || '❌ MISSING');

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.log('\n❌ Missing required OAuth credentials. Cannot test API connections.');
  process.exit(1);
}

console.log('\n🔗 Testing API Connections\n');
console.log('================================');

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'https://www.edgeviewfinance.com.au/api/auth/callback'
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});

// Test Search Console
console.log('\n1. Search Console API:');
try {
  const searchconsole = google.searchconsole({ version: 'v1', auth: oauth2Client });
  const siteList = await searchconsole.sites.list();
  
  if (siteList.data.siteEntry && siteList.data.siteEntry.length > 0) {
    console.log('   ✅ Connected - Sites found:', siteList.data.siteEntry.length);
    siteList.data.siteEntry.forEach(site => {
      console.log('      -', site.siteUrl);
    });
  } else {
    console.log('   ✅ Connected - No sites yet (add after deployment)');
  }
} catch (error) {
  console.log('   ❌ Failed:', error.message.substring(0, 100));
}

// Test Analytics
if (GA_PROPERTY_ID) {
  console.log('\n2. Analytics Data API:');
  try {
    const analyticsdata = google.analyticsdata({ version: 'v1beta', auth: oauth2Client });
    const response = await analyticsdata.properties.getMetadata({
      name: `properties/${GA_PROPERTY_ID}/metadata`
    });
    console.log('   ✅ Connected - Property', GA_PROPERTY_ID, 'accessible');
  } catch (error) {
    if (error.message.includes('403')) {
      console.log('   ⚠️  Connected but no access to property');
      console.log('      (Grant access to edgeviewfinance@gmail.com in GA4)');
    } else {
      console.log('   ❌ Failed:', error.message.substring(0, 100));
    }
  }
} else {
  console.log('\n2. Analytics Data API: ⏭️  Skipped (no property ID)');
}

// Test My Business
if (GMB_ACCOUNT_ID) {
  console.log('\n3. My Business API:');
  try {
    const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2Client });
    // Just try to get the account - simpler test
    const account = await mybusiness.accounts.get({
      name: `accounts/${GMB_ACCOUNT_ID}`
    });
    console.log('   ✅ Connected - Account accessible');
  } catch (error) {
    if (error.message.includes('403') || error.message.includes('404')) {
      console.log('   ⚠️  Connected but account access issues');
    } else {
      console.log('   ❌ Failed:', error.message.substring(0, 100));
    }
  }
} else {
  console.log('\n3. My Business API: ⏭️  Skipped (no account ID)');
}

console.log('\n================================');
console.log('✅ Test Complete!\n');
console.log('Next steps:');
console.log('1. Add these environment variables to Vercel dashboard');
console.log('2. Deploy the website to Vercel');
console.log('3. Add and verify domain in Search Console');
console.log('4. Update OAuth redirect URI to production URL');