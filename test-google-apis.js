#!/usr/bin/env node

/**
 * Google API Integration Test Script
 * Tests Google Sheets, Search Console, Analytics, and Business Profile APIs
 * Run: node test-google-apis.js
 */

import { google } from 'googleapis';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Test results tracking
const testResults = {
  sheets: { status: 'pending', message: '' },
  searchConsole: { status: 'pending', message: '' },
  analytics: { status: 'pending', message: '' },
  businessProfile: { status: 'pending', message: '' }
};

// Load environment variables
async function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env');
    const envContent = await fs.readFile(envPath, 'utf-8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    
    return envVars;
  } catch (error) {
    console.error(`${colors.red}Error loading .env file:${colors.reset}`, error.message);
    return {};
  }
}

// Test Google Sheets API
async function testGoogleSheets() {
  console.log(`\n${colors.blue}Testing Google Sheets API...${colors.reset}`);
  
  try {
    // Check for service account JSON in MCP config
    const mcpConfigPath = '/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/config/.mcp.json';
    const mcpConfig = JSON.parse(await fs.readFile(mcpConfigPath, 'utf-8'));
    
    if (mcpConfig.mcpServers.sheets) {
      console.log(`${colors.green}✓ Google Sheets MCP server configured${colors.reset}`);
      console.log(`  Spreadsheet ID: ${mcpConfig.mcpServers.sheets.env.GOOGLE_SHEETS_SPREADSHEET_ID}`);
      testResults.sheets.status = 'success';
      testResults.sheets.message = 'MCP server configured with service account';
    } else {
      throw new Error('Google Sheets MCP server not found in config');
    }
  } catch (error) {
    console.log(`${colors.red}✗ Google Sheets API test failed${colors.reset}`);
    console.log(`  Error: ${error.message}`);
    testResults.sheets.status = 'failed';
    testResults.sheets.message = error.message;
  }
}

// Test Google Search Console API
async function testSearchConsole(env) {
  console.log(`\n${colors.blue}Testing Google Search Console API...${colors.reset}`);
  
  try {
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REFRESH_TOKEN) {
      throw new Error('Google OAuth credentials incomplete in .env');
    }
    
    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      'https://www.edgeviewfinance.com.au/api/auth/callback'
    );
    
    oauth2Client.setCredentials({
      refresh_token: env.GOOGLE_REFRESH_TOKEN
    });
    
    // Test the API
    const searchconsole = google.searchconsole({ version: 'v1', auth: oauth2Client });
    const siteList = await searchconsole.sites.list();
    
    console.log(`${colors.green}✓ Search Console API working${colors.reset}`);
    if (siteList.data.siteEntry && siteList.data.siteEntry.length > 0) {
      console.log(`  Sites found: ${siteList.data.siteEntry.length}`);
      siteList.data.siteEntry.forEach(site => {
        console.log(`    - ${site.siteUrl}`);
      });
    } else {
      console.log(`  No sites found (need to add site after deployment)`);
    }
    
    testResults.searchConsole.status = 'success';
    testResults.searchConsole.message = 'API connected successfully';
  } catch (error) {
    console.log(`${colors.red}✗ Search Console API test failed${colors.reset}`);
    console.log(`  Error: ${error.message}`);
    testResults.searchConsole.status = 'failed';
    testResults.searchConsole.message = error.message;
  }
}

// Test Google Analytics API
async function testAnalytics(env) {
  console.log(`\n${colors.blue}Testing Google Analytics API...${colors.reset}`);
  
  try {
    if (!env.GOOGLE_ANALYTICS_PROPERTY_ID || !env.GOOGLE_REFRESH_TOKEN) {
      throw new Error('Google Analytics Property ID or OAuth token missing');
    }
    
    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      'https://www.edgeviewfinance.com.au/api/auth/callback'
    );
    
    oauth2Client.setCredentials({
      refresh_token: env.GOOGLE_REFRESH_TOKEN
    });
    
    // Test the API
    const analyticsdata = google.analyticsdata({ version: 'v1beta', auth: oauth2Client });
    
    try {
      const response = await analyticsdata.properties.getMetadata({
        name: `properties/${env.GOOGLE_ANALYTICS_PROPERTY_ID}/metadata`
      });
      
      console.log(`${colors.green}✓ Analytics API working${colors.reset}`);
      console.log(`  Property ID: ${env.GOOGLE_ANALYTICS_PROPERTY_ID}`);
      console.log(`  Access: Verified`);
      
      testResults.analytics.status = 'success';
      testResults.analytics.message = 'API connected successfully';
    } catch (apiError) {
      if (apiError.message.includes('403')) {
        console.log(`${colors.yellow}⚠ Analytics API connected but no access to property${colors.reset}`);
        console.log(`  Property ID: ${env.GOOGLE_ANALYTICS_PROPERTY_ID}`);
        console.log(`  Note: May need to grant access to edgeviewfinance@gmail.com in GA4`);
        testResults.analytics.status = 'partial';
        testResults.analytics.message = 'Need GA4 access permissions';
      } else {
        throw apiError;
      }
    }
  } catch (error) {
    console.log(`${colors.red}✗ Analytics API test failed${colors.reset}`);
    console.log(`  Error: ${error.message}`);
    testResults.analytics.status = 'failed';
    testResults.analytics.message = error.message;
  }
}

// Test Google Business Profile API
async function testBusinessProfile(env) {
  console.log(`\n${colors.blue}Testing Google Business Profile API...${colors.reset}`);
  
  try {
    if (!env.GOOGLE_MY_BUSINESS_ACCOUNT_ID || !env.GOOGLE_REFRESH_TOKEN) {
      throw new Error('Google My Business Account ID or OAuth token missing');
    }
    
    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      'https://www.edgeviewfinance.com.au/api/auth/callback'
    );
    
    oauth2Client.setCredentials({
      refresh_token: env.GOOGLE_REFRESH_TOKEN
    });
    
    // Test the API
    const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2Client });
    
    try {
      // Try to list locations
      const locations = await mybusiness.accounts.locations.list({
        parent: `accounts/${env.GOOGLE_MY_BUSINESS_ACCOUNT_ID}`,
        pageSize: 10
      });
      
      console.log(`${colors.green}✓ Business Profile API working${colors.reset}`);
      console.log(`  Account ID: ${env.GOOGLE_MY_BUSINESS_ACCOUNT_ID}`);
      if (env.GOOGLE_MY_BUSINESS_LOCATION_ID) {
        console.log(`  Location ID: ${env.GOOGLE_MY_BUSINESS_LOCATION_ID}`);
      }
      
      testResults.businessProfile.status = 'success';
      testResults.businessProfile.message = 'API connected successfully';
    } catch (apiError) {
      if (apiError.message.includes('403') || apiError.message.includes('404')) {
        console.log(`${colors.yellow}⚠ Business Profile API connected but access issues${colors.reset}`);
        console.log(`  Account ID: ${env.GOOGLE_MY_BUSINESS_ACCOUNT_ID}`);
        console.log(`  Note: May need to verify account access`);
        testResults.businessProfile.status = 'partial';
        testResults.businessProfile.message = 'Need account verification';
      } else {
        throw apiError;
      }
    }
  } catch (error) {
    console.log(`${colors.red}✗ Business Profile API test failed${colors.reset}`);
    console.log(`  Error: ${error.message}`);
    testResults.businessProfile.status = 'failed';
    testResults.businessProfile.message = error.message;
  }
}

// Generate .env template
async function generateEnvTemplate() {
  const template = `
# ============================================
# Google API Configuration Template
# Add these to your .env file
# ============================================

# Google OAuth 2.0 Credentials
# Get from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=https://www.edgeviewfinance.com.au/api/auth/callback

# Google OAuth Refresh Token
# Generated after initial OAuth flow
GOOGLE_REFRESH_TOKEN=

# Google Search Console
# Site URL format: https://www.edgeviewfinance.com.au
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://www.edgeviewfinance.com.au

# Google Analytics 4
# Find in: GA4 Admin → Property Settings
GOOGLE_ANALYTICS_PROPERTY_ID=

# Google My Business
# Find in: Business Profile Manager → Settings
GOOGLE_MY_BUSINESS_ACCOUNT_ID=
GOOGLE_MY_BUSINESS_LOCATION_ID=

# Optional: Google Sheets (if not using service account)
# GOOGLE_SHEETS_SPREADSHEET_ID=
`;

  const templatePath = path.join(__dirname, '.env.google.template');
  await fs.writeFile(templatePath, template);
  console.log(`\n${colors.cyan}📄 Generated .env template: ${templatePath}${colors.reset}`);
}

// Main test runner
async function runTests() {
  console.log(`${colors.bright}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}Google API Integration Test Suite${colors.reset}`);
  console.log(`${colors.bright}${'='.repeat(60)}${colors.reset}`);
  
  // Load environment variables
  const env = await loadEnv();
  
  // Run tests
  await testGoogleSheets();
  await testSearchConsole(env);
  await testAnalytics(env);
  await testBusinessProfile(env);
  
  // Generate template if needed
  await generateEnvTemplate();
  
  // Summary
  console.log(`\n${colors.bright}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}Test Summary${colors.reset}`);
  console.log(`${colors.bright}${'='.repeat(60)}${colors.reset}\n`);
  
  const statusSymbols = {
    success: `${colors.green}✓${colors.reset}`,
    partial: `${colors.yellow}⚠${colors.reset}`,
    failed: `${colors.red}✗${colors.reset}`,
    'needs-auth': `${colors.yellow}🔐${colors.reset}`,
    'needs-config': `${colors.yellow}⚙${colors.reset}`,
    pending: '⏳'
  };
  
  Object.entries(testResults).forEach(([api, result]) => {
    const apiName = api.replace(/([A-Z])/g, ' $1').trim();
    const formattedName = apiName.charAt(0).toUpperCase() + apiName.slice(1);
    console.log(`${statusSymbols[result.status]} ${formattedName}: ${result.message || result.status}`);
  });
  
  // Next steps
  console.log(`\n${colors.bright}Next Steps:${colors.reset}`);
  console.log('1. Copy the Google API variables from .env.google.template to your .env file');
  console.log('2. Fill in the Client ID and Client Secret from Google Cloud Console');
  console.log('3. Set up OAuth flow to get refresh token');
  console.log('4. Add Analytics Property ID and Business Profile Account ID');
  console.log('5. Configure these in Vercel dashboard for production');
}

// Run the tests
runTests().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});