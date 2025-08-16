import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: '/tmp/playwright-browsers/chromium-1181/chrome-linux/chrome'
  });
  
  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();
    
    console.log('Navigating to site...');
    const response = await page.goto('https://edgeviewfinance-website.vercel.app', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    console.log('Response status:', response.status());
    
    // Check if we hit a challenge page
    const title = await page.title();
    console.log('Page title:', title);
    
    // Try to detect Agency11 theme elements
    const hasHeroSection = await page.locator('.hero-section, [class*="hero"]').count() > 0;
    const hasAgency11Classes = await page.locator('[class*="jos"], [class*="agency"]').count() > 0;
    
    // Check for EVFBS content
    const pageContent = await page.content();
    const hasEVFBSContent = pageContent.includes('Edgeview Finance') || pageContent.includes('Commercial Finance');
    
    // Check color scheme
    const primaryColor = await page.evaluate(() => {
      const el = document.querySelector('body');
      if (el) {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      }
      return null;
    });
    
    console.log('\n=== Verification Results ===');
    console.log('Site accessible:', response.status() === 200);
    console.log('Has hero section:', hasHeroSection);
    console.log('Has Agency11 theme classes:', hasAgency11Classes);
    console.log('Has EVFBS content:', hasEVFBSContent);
    console.log('Color scheme:', primaryColor);
    
    // Take screenshot
    await page.screenshot({ 
      path: '/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-website/deployment-screenshot.png',
      fullPage: false
    });
    console.log('\nScreenshot saved as deployment-screenshot.png');
    
  } catch (error) {
    console.error('Error during verification:', error.message);
  } finally {
    await browser.close();
  }
})();