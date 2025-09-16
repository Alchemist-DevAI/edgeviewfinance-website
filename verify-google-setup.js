#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load and verify environment variables
async function verifySetup() {
  console.log('🔍 Google API Setup Verification\n');
  console.log('=' .repeat(50));
  
  try {
    // Read .env file
    const envPath = path.join(__dirname, '.env');
    const envContent = await fs.readFile(envPath, 'utf-8');
    
    // Parse environment variables
    const envVars = {};
    envContent.split('\n').forEach(line => {
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    
    // Check required variables
    const checks = {
      'GOOGLE_CLIENT_ID': envVars.GOOGLE_CLIENT_ID,
      'GOOGLE_CLIENT_SECRET': envVars.GOOGLE_CLIENT_SECRET,
      'GOOGLE_REFRESH_TOKEN': envVars.GOOGLE_REFRESH_TOKEN,
      'GOOGLE_ANALYTICS_PROPERTY_ID': envVars.GOOGLE_ANALYTICS_PROPERTY_ID,
      'GOOGLE_MY_BUSINESS_ACCOUNT_ID': envVars.GOOGLE_MY_BUSINESS_ACCOUNT_ID,
      'GOOGLE_MY_BUSINESS_LOCATION_ID': envVars.GOOGLE_MY_BUSINESS_LOCATION_ID,
    };
    
    console.log('\n✅ Environment Variables:\n');
    
    for (const [key, value] of Object.entries(checks)) {
      if (value) {
        const displayValue = value.length > 40 ? value.substring(0, 40) + '...' : value;
        console.log(`  ✓ ${key}: ${displayValue}`);
      } else {
        console.log(`  ✗ ${key}: NOT SET`);
      }
    }
    
    // Summary
    const setCount = Object.values(checks).filter(v => v).length;
    const totalCount = Object.keys(checks).length;
    
    console.log('\n' + '=' .repeat(50));
    console.log(`📊 Summary: ${setCount}/${totalCount} variables configured`);
    
    if (setCount === totalCount) {
      console.log('✅ All Google API credentials are configured!');
      console.log('\nNext steps:');
      console.log('1. Add these to Vercel environment variables');
      console.log('2. Deploy the website');
      console.log('3. Update redirect URI to production URL');
      console.log('4. Add and verify site in Search Console');
    } else {
      console.log('⚠️  Some credentials are missing');
      console.log('\nMissing credentials:');
      for (const [key, value] of Object.entries(checks)) {
        if (!value) {
          console.log(`  - ${key}`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error reading .env file:', error.message);
  }
}

// Run verification
verifySetup();