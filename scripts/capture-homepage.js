#!/usr/bin/env node

import { chromium } from 'playwright';
import path from 'path';

const CONFIG = {
  baseUrl: 'http://localhost:4002',
  outputDir: '/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/styling-baseline/before-refactor',
  viewports: {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 375, height: 812 }
  }
};

async function captureHomepage() {
  console.log('🏠 Capturing homepage screenshots...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
  });
  
  try {
    const page = await browser.newPage();
    
    console.log('Navigating to homepage...');
    await page.goto(CONFIG.baseUrl, { 
      waitUntil: 'domcontentloaded',  // Use less strict wait condition
      timeout: 60000  // Increase timeout
    });
    
    // Wait for page to be ready
    await page.waitForTimeout(3000);
    
    for (const [viewportName, viewport] of Object.entries(CONFIG.viewports)) {
      console.log(`📱 Capturing ${viewportName} (${viewport.width}x${viewport.height})`);
      
      await page.setViewportSize(viewport);
      await page.waitForTimeout(1000);
      
      const filename = `homepage-${viewportName}.png`;
      const filepath = path.join(CONFIG.outputDir, viewportName, filename);
      
      await page.screenshot({
        path: filepath,
        fullPage: true,
        type: 'png'
      });
      
      console.log(`✅ Screenshot saved: ${filename}`);
    }
    
    console.log('🎉 Homepage screenshots completed successfully!');
    
  } catch (error) {
    console.error('❌ Error capturing homepage:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

captureHomepage();