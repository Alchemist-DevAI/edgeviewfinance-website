#!/usr/bin/env node

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:4002',
  outputDir: '/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/styling-baseline/after-phase-1',
  viewports: {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 375, height: 812 }
  },
  pages: [
    { name: 'homepage', url: '/' },
    { name: 'about', url: '/about' },
    { name: 'contact', url: '/contact' },
    { name: 'services-overview', url: '/service' },
    { name: 'success-stories', url: '/success-stories' },
    { name: 'blog', url: '/blog' },
    // Services pages
    { name: 'equipment-finance', url: '/equipment-finance' },
    { name: 'working-capital-finance', url: '/working-capital-finance' },
    { name: 'commercial-property-finance', url: '/commercial-property-finance' },
    { name: 'vehicle-finance', url: '/vehicle-finance' },
    { name: 'invoice-trade-finance', url: '/invoice-trade-finance' },
    { name: 'business-acquisition-finance', url: '/business-acquisition-finance' },
    { name: 'home-loans', url: '/home-loans' },
    // Assessment tool (if exists)
    { name: 'assessment', url: '/assessment', optional: true }
  ]
};

class ScreenshotAutomationPhase1 {
  constructor() {
    this.browser = null;
    this.results = {
      successful: [],
      failed: [],
      skipped: []
    };
  }

  async init() {
    console.log('🚀 Initializing Phase 1 Visual Regression Testing...');
    console.log('📂 Output directory: styling-baseline/after-phase-1/');
    
    // Ensure output directories exist
    await this.ensureDirectories();
    
    // Launch browser
    this.browser = await chromium.launch({
      headless: true,
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });
    
    console.log('✅ Browser launched successfully');
  }

  async ensureDirectories() {
    const directories = [
      path.join(CONFIG.outputDir, 'desktop'),
      path.join(CONFIG.outputDir, 'mobile')
    ];
    
    for (const dir of directories) {
      try {
        await fs.mkdir(dir, { recursive: true });
        console.log(`📁 Directory ensured: ${dir}`);
      } catch (error) {
        console.error(`❌ Failed to create directory ${dir}:`, error.message);
        throw error;
      }
    }
  }

  async capturePageScreenshots(page, pageConfig) {
    const results = [];
    
    for (const [viewportName, viewport] of Object.entries(CONFIG.viewports)) {
      try {
        console.log(`  📱 ${viewportName} (${viewport.width}x${viewport.height})`);
        
        // Set viewport
        await page.setViewportSize(viewport);
        
        // Wait for content to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Additional wait for any animations
        
        // Take screenshot
        const filename = `${pageConfig.name}-${viewportName}.png`;
        const filepath = path.join(CONFIG.outputDir, viewportName, filename);
        
        await page.screenshot({
          path: filepath,
          fullPage: true,
          type: 'png'
        });
        
        results.push({
          viewport: viewportName,
          filename,
          filepath,
          success: true
        });
        
        console.log(`    ✅ Screenshot saved: ${filename}`);
        
      } catch (error) {
        console.error(`    ❌ Failed ${viewportName} screenshot:`, error.message);
        results.push({
          viewport: viewportName,
          filename: `${pageConfig.name}-${viewportName}.png`,
          success: false,
          error: error.message
        });
      }
    }
    
    return results;
  }

  async processPage(pageConfig) {
    const page = await this.browser.newPage();
    const url = `${CONFIG.baseUrl}${pageConfig.url}`;
    
    console.log(`\n🔍 Processing: ${pageConfig.name}`);
    console.log(`   URL: ${url}`);
    
    try {
      // Navigate to page
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      if (!response || response.status() >= 400) {
        if (pageConfig.optional) {
          console.log(`   ⏭️  Optional page not found (${response?.status()}), skipping`);
          this.results.skipped.push({
            name: pageConfig.name,
            url,
            reason: `HTTP ${response?.status() || 'No response'}`
          });
          return;
        } else {
          throw new Error(`HTTP ${response?.status() || 'No response'}`);
        }
      }
      
      // Capture screenshots for all viewports
      const screenshots = await this.capturePageScreenshots(page, pageConfig);
      
      this.results.successful.push({
        name: pageConfig.name,
        url,
        screenshots
      });
      
    } catch (error) {
      console.error(`   ❌ Failed to process ${pageConfig.name}:`, error.message);
      
      if (pageConfig.optional) {
        this.results.skipped.push({
          name: pageConfig.name,
          url,
          reason: error.message
        });
      } else {
        this.results.failed.push({
          name: pageConfig.name,
          url,
          error: error.message
        });
      }
    } finally {
      await page.close();
    }
  }

  async run() {
    try {
      await this.init();
      
      console.log(`\n🎯 Starting Phase 1 screenshot capture for ${CONFIG.pages.length} pages...`);
      console.log(`📂 Output directory: ${CONFIG.outputDir}`);
      
      // Process all pages
      for (const pageConfig of CONFIG.pages) {
        await this.processPage(pageConfig);
      }
      
      // Generate summary report
      this.generateReport();
      
    } catch (error) {
      console.error('\n💥 Critical error:', error.message);
      throw error;
    } finally {
      if (this.browser) {
        await this.browser.close();
        console.log('\n🔒 Browser closed');
      }
    }
  }

  generateReport() {
    console.log('\n📊 PHASE 1 VISUAL REGRESSION TEST RESULTS');
    console.log('==========================================');
    console.log(`✅ Successful: ${this.results.successful.length} pages`);
    console.log(`❌ Failed: ${this.results.failed.length} pages`);
    console.log(`⏭️  Skipped: ${this.results.skipped.length} pages`);
    
    if (this.results.successful.length > 0) {
      console.log('\n✅ SUCCESSFUL PAGES:');
      this.results.successful.forEach(result => {
        const screenshotCount = result.screenshots.filter(s => s.success).length;
        console.log(`   ${result.name}: ${screenshotCount} screenshots`);
      });
    }
    
    if (this.results.failed.length > 0) {
      console.log('\n❌ FAILED PAGES:');
      this.results.failed.forEach(result => {
        console.log(`   ${result.name}: ${result.error}`);
      });
    }
    
    if (this.results.skipped.length > 0) {
      console.log('\n⏭️  SKIPPED PAGES:');
      this.results.skipped.forEach(result => {
        console.log(`   ${result.name}: ${result.reason}`);
      });
    }
    
    const totalScreenshots = this.results.successful.reduce((acc, result) => {
      return acc + result.screenshots.filter(s => s.success).length;
    }, 0);
    
    console.log('\n🎉 Phase 1 screenshot capture completed!');
    console.log(`📁 Screenshots saved to: ${CONFIG.outputDir}`);
    console.log(`📷 Total screenshots captured: ${totalScreenshots}`);
  }
}

// Main execution
async function main() {
  const automation = new ScreenshotAutomationPhase1();
  
  try {
    await automation.run();
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Script failed:', error.message);
    process.exit(1);
  }
}

// Handle process interruption
process.on('SIGINT', async () => {
  console.log('\n🛑 Script interrupted by user');
  process.exit(1);
});

// Always run when script is executed directly
main();

export default ScreenshotAutomationPhase1;