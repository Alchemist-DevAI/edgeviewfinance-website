import { test, expect } from '@playwright/test';

test.describe('Figma Design Colors Verification', () => {
  const figmaColors = {
    primaryOrange: 'rgb(255, 158, 16)', // #FF9E10
    secondaryDark: 'rgb(28, 44, 59)',   // #1C2C3B
    neutralLight: 'rgb(247, 247, 247)',  // #F7F7F7
    pureWhite: 'rgb(255, 255, 255)'      // #FFFFFF
  };

  test.beforeEach(async ({ page }) => {
    // Run against local build
    await page.goto('http://localhost:4321/index-agency11');
  });

  test('Primary CTA button should use Primary Orange', async ({ page }) => {
    const primaryCTA = page.locator('a.bg-primary-orange').first();
    await expect(primaryCTA).toBeVisible();
    
    const backgroundColor = await primaryCTA.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    expect(backgroundColor).toBe(figmaColors.primaryOrange);
  });

  test('Headers should use Secondary Dark', async ({ page }) => {
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();
    
    const textColor = await mainHeading.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    expect(textColor).toBe(figmaColors.secondaryDark);
  });

  test('Service section background should use Neutral Light', async ({ page }) => {
    const serviceSection = page.locator('.bg-neutral-light').first();
    
    if (await serviceSection.count() > 0) {
      const backgroundColor = await serviceSection.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      expect(backgroundColor).toBe(figmaColors.neutralLight);
    }
  });

  test('Trust signals should display Primary Orange values', async ({ page }) => {
    const trustValues = page.locator('.text-primary-orange');
    const count = await trustValues.count();
    
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const element = trustValues.nth(i);
        const textColor = await element.evaluate((el) => {
          return window.getComputedStyle(el).color;
        });
        
        expect(textColor).toBe(figmaColors.primaryOrange);
      }
    }
  });

  test('Service card icons should use correct colors', async ({ page }) => {
    // Check Primary Orange icons
    const orangeIcons = page.locator('.bg-primary-orange.rounded-full');
    const orangeCount = await orangeIcons.count();
    
    if (orangeCount > 0) {
      const firstOrangeIcon = orangeIcons.first();
      const backgroundColor = await firstOrangeIcon.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      expect(backgroundColor).toBe(figmaColors.primaryOrange);
    }

    // Check Secondary Dark icons
    const darkIcons = page.locator('.bg-secondary-dark.rounded-full');
    const darkCount = await darkIcons.count();
    
    if (darkCount > 0) {
      const firstDarkIcon = darkIcons.first();
      const backgroundColor = await firstDarkIcon.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      expect(backgroundColor).toBe(figmaColors.secondaryDark);
    }
  });

  test('Take full page screenshot for manual comparison', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'tests/screenshots/figma-colors-test.png',
      fullPage: true 
    });
  });

  test('Take hero section screenshot', async ({ page }) => {
    const heroSection = page.locator('.section-hero').first();
    if (await heroSection.count() > 0) {
      await heroSection.screenshot({ 
        path: 'tests/screenshots/hero-section.png' 
      });
    }
  });

  test('Take services section screenshot', async ({ page }) => {
    const servicesSection = page.locator('.bg-neutral-light').first();
    if (await servicesSection.count() > 0) {
      await servicesSection.screenshot({ 
        path: 'tests/screenshots/services-section.png' 
      });
    }
  });
});