import { test, expect } from '@playwright/test';

test.describe('Deployed Site Color Verification', () => {
  const figmaColors = {
    primaryOrange: 'rgb(255, 158, 16)', // #FF9E10
    secondaryDark: 'rgb(28, 44, 59)',   // #1C2C3B
    neutralLight: 'rgb(247, 247, 247)',  // #F7F7F7
    pureWhite: 'rgb(255, 255, 255)'      // #FFFFFF
  };

  test('Verify deployed site at edgeviewfinance-website.vercel.app', async ({ page }) => {
    // Navigate to deployed site
    await page.goto('https://edgeviewfinance-website.vercel.app/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of deployed site
    await page.screenshot({ 
      path: 'tests/screenshots/deployed-site.png',
      fullPage: true 
    });
    
    // Check if main heading exists
    const mainHeading = page.locator('h1').first();
    const headingExists = await mainHeading.count() > 0;
    
    if (headingExists) {
      // Get computed styles
      const headingColor = await mainHeading.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      console.log('Main heading color:', headingColor);
      
      // Check for primary CTA buttons
      const ctaButtons = page.locator('a[href*="quote"], a[href*="contact"]');
      const buttonCount = await ctaButtons.count();
      
      if (buttonCount > 0) {
        const firstButton = ctaButtons.first();
        const buttonBgColor = await firstButton.evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });
        
        console.log('CTA button background color:', buttonBgColor);
      }
    }
    
    // Check for orange elements
    const orangeElements = await page.$$eval('*', (elements) => {
      return elements.filter(el => {
        const styles = window.getComputedStyle(el);
        return styles.backgroundColor === 'rgb(255, 158, 16)' || 
               styles.color === 'rgb(255, 158, 16)';
      }).length;
    });
    
    console.log('Elements with Primary Orange color:', orangeElements);
    
    // Check for dark blue elements
    const darkElements = await page.$$eval('*', (elements) => {
      return elements.filter(el => {
        const styles = window.getComputedStyle(el);
        return styles.backgroundColor === 'rgb(28, 44, 59)' || 
               styles.color === 'rgb(28, 44, 59)';
      }).length;
    });
    
    console.log('Elements with Secondary Dark color:', darkElements);
    
    // Assert that we have some elements with our colors
    expect(orangeElements + darkElements).toBeGreaterThan(0);
  });
});