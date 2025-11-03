#!/usr/bin/env node

/**
 * Google Search Console International Targeting Setup
 *
 * This script configures international targeting for Australia
 * and submits sitemaps to Google Search Console
 *
 * Requirements:
 * 1. Google Cloud Console project with Search Console API enabled
 * 2. Service account with Search Console permissions
 * 3. Website verified in Google Search Console
 *
 * Usage:
 * node scripts/google-search-console-setup.js
 */

import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
try {
  const envPath = join(__dirname, '..', '.env');
  const envContent = readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

  Object.assign(process.env, envVars);
} catch (error) {
  console.warn('Could not load .env file, using existing environment variables');
}

class GoogleSearchConsoleSetup {
  constructor() {
    this.siteUrl = 'https://www.edgeviewfinance.com.au/';
    this.targetCountry = 'AU'; // Australia

    // Initialize Google Auth
    this.auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/webmasters.readonly'
      ]
    });

    this.searchconsole = google.searchconsole({ version: 'v1', auth: this.auth });
  }

  async verifySiteOwnership() {
    try {
      console.log('🔍 Checking site verification status...');

      const response = await this.searchconsole.sites.list();
      const sites = response.data.siteEntry || [];

      const site = sites.find(s => s.siteUrl === this.siteUrl);

      if (site) {
        console.log('✅ Site is verified:', site.siteUrl);
        console.log('📋 Verification method:', site.permissionLevel);
        return true;
      } else {
        console.error('❌ Site is not verified in Google Search Console');
        console.log('📝 Please verify your site at: https://search.google.com/search-console');
        return false;
      }
    } catch (error) {
      console.error('❌ Error checking site verification:', error.message);
      return false;
    }
  }

  async setInternationalTargeting() {
    try {
      console.log(`🌍 Setting international targeting to: ${this.targetCountry}`);

      // Note: International targeting is typically set through the Search Console web interface
      // The API doesn't directly support setting international targeting
      // However, we can check current settings and provide guidance

      console.log('📝 International targeting must be set manually in Google Search Console:');
      console.log('1. Go to: https://search.google.com/search-console');
      console.log(`2. Select your property: ${this.siteUrl}`);
      console.log('3. Navigate to: Legacy tools and reports > International Targeting');
      console.log(`4. Set Country to: Australia (${this.targetCountry})`);
      console.log('5. Ensure hreflang tags are properly implemented on pages');

      return true;
    } catch (error) {
      console.error('❌ Error with international targeting setup:', error.message);
      return false;
    }
  }

  async submitSitemap() {
    try {
      console.log('🗺️ Submitting sitemap to Google Search Console...');

      const sitemapUrl = `${this.siteUrl}sitemap.xml`;

      await this.searchconsole.sitemaps.submit({
        siteUrl: this.siteUrl,
        feedpath: sitemapUrl
      });

      console.log('✅ Sitemap submitted successfully:', sitemapUrl);
      return true;
    } catch (error) {
      if (error.message.includes('already submitted')) {
        console.log('ℹ️ Sitemap already submitted');
        return true;
      }
      console.error('❌ Error submitting sitemap:', error.message);
      return false;
    }
  }

  async getSitemapStatus() {
    try {
      console.log('📊 Checking sitemap status...');

      const response = await this.searchconsole.sitemaps.list({
        siteUrl: this.siteUrl
      });

      const sitemaps = response.data.sitemap || [];

      if (sitemaps.length === 0) {
        console.log('📝 No sitemaps found');
        return false;
      }

      console.log('📋 Sitemap Status:');
      sitemaps.forEach(sitemap => {
        console.log(`   📄 ${sitemap.feedpath}`);
        console.log(`      Status: ${sitemap.isPending ? 'Pending' : 'Processed'}`);
        console.log(`      Last submitted: ${sitemap.lastSubmitted || 'Unknown'}`);
        console.log(`      URLs submitted: ${sitemap.contents?.[0]?.submitted || 0}`);
        console.log(`      URLs indexed: ${sitemap.contents?.[0]?.indexed || 0}`);
        console.log('');
      });

      return true;
    } catch (error) {
      console.error('❌ Error getting sitemap status:', error.message);
      return false;
    }
  }

  async checkIndexingStatus() {
    try {
      console.log('🔍 Checking indexing status for key pages...');

      const keyPages = [
        this.siteUrl,
        `${this.siteUrl}about/`,
        `${this.siteUrl}services/`,
        `${this.siteUrl}contact/`,
        `${this.siteUrl}blog/`
      ];

      for (const url of keyPages) {
        try {
          const response = await this.searchconsole.urlInspection.index.inspect({
            siteUrl: this.siteUrl,
            requestBody: {
              inspectionUrl: url,
              siteUrl: this.siteUrl
            }
          });

          const result = response.data.inspectionResult;
          const indexStatus = result?.indexStatusResult?.verdict || 'Unknown';

          console.log(`   📄 ${url}: ${indexStatus}`);
        } catch (error) {
          console.log(`   ❌ ${url}: Error checking status`);
        }
      }

      return true;
    } catch (error) {
      console.error('❌ Error checking indexing status:', error.message);
      return false;
    }
  }

  async generateHreflangTags() {
    console.log('🏷️ Generating hreflang implementation guidance...');
    console.log('');
    console.log('Add the following hreflang tags to your HTML head:');
    console.log('```html');
    console.log(`<link rel="alternate" hreflang="en-au" href="${this.siteUrl}" />`);
    console.log(`<link rel="alternate" hreflang="en" href="${this.siteUrl}" />`);
    console.log(`<link rel="alternate" hreflang="x-default" href="${this.siteUrl}" />`);
    console.log('```');
    console.log('');
    console.log('For Astro, add this to your Layout.astro component:');
    console.log('```astro');
    console.log('<link rel="alternate" hreflang="en-au" href={Astro.url.href} />');
    console.log('<link rel="alternate" hreflang="en" href={Astro.url.href} />');
    console.log('<link rel="alternate" hreflang="x-default" href={Astro.url.href} />');
    console.log('```');
  }

  async run() {
    console.log('🚀 Starting Google Search Console setup for international targeting...');
    console.log(`🌐 Site: ${this.siteUrl}`);
    console.log(`🇦🇺 Target Country: ${this.targetCountry} (Australia)`);
    console.log('---');

    // Check authentication
    try {
      await this.auth.getClient();
      console.log('✅ Google API authentication successful');
    } catch (error) {
      console.error('❌ Google API authentication failed:', error.message);
      console.log('📝 Please ensure GOOGLE_SERVICE_ACCOUNT_KEY_FILE is set and valid');
      return false;
    }

    // Verify site ownership
    const isVerified = await this.verifySiteOwnership();
    if (!isVerified) {
      return false;
    }

    // Set international targeting (guidance)
    await this.setInternationalTargeting();

    // Submit sitemap
    await this.submitSitemap();

    // Check sitemap status
    await this.getSitemapStatus();

    // Check indexing status
    await this.checkIndexingStatus();

    // Generate hreflang guidance
    await this.generateHreflangTags();

    console.log('');
    console.log('✅ Google Search Console setup completed!');
    console.log('');
    console.log('📋 Next Steps:');
    console.log('1. Manually set international targeting to Australia in Search Console');
    console.log('2. Implement hreflang tags in your HTML');
    console.log('3. Monitor indexing status regularly');
    console.log('4. Submit URL for indexing for new pages');

    return true;
  }
}

// Run the setup
if (import.meta.url === `file://${__filename}`) {
  const setup = new GoogleSearchConsoleSetup();
  setup.run().catch(console.error);
}

export { GoogleSearchConsoleSetup };