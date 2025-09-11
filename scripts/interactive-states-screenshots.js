import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:4002';
const OUTPUT_DIR = './styling-baseline/after-phase-1/interactive-states';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureInteractiveStates() {
  console.log('🎨 Starting Interactive States Screenshot Capture...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport for desktop screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    console.log('📱 Capturing Navigation States...');
    await captureNavigationStates(page);
    
    console.log('🔘 Capturing Button States...');
    await captureButtonStates(page);
    
    console.log('📝 Capturing Form States...');
    await captureFormStates(page);
    
    console.log('🃏 Capturing Card States...');
    await captureCardStates(page);
    
  } catch (error) {
    console.error('❌ Error during screenshot capture:', error);
  } finally {
    await browser.close();
  }
  
  console.log('✅ Interactive states screenshot capture completed!');
}

async function captureNavigationStates(page) {
  // Navigate to homepage for navigation states
  await page.goto(`${BASE_URL}/`, { waitUntil: 'load', timeout: 60000 });
  
  // 1. Default header state
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'navigation-header-default.png'),
    clip: { x: 0, y: 0, width: 1920, height: 120 }
  });
  console.log('   ✓ Default header state captured');
  
  // 2. Scroll down to trigger sticky header
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'navigation-header-sticky.png'),
    clip: { x: 0, y: 0, width: 1920, height: 120 }
  });
  console.log('   ✓ Sticky header state captured');
  
  // 3. Navigation hover states - hover over first main nav item
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  
  try {
    const navLink = await page.$('nav a[href*="service"], .nav-link, .navigation a');
    if (navLink) {
      await navLink.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'navigation-hover-state.png'),
        clip: { x: 0, y: 0, width: 1920, height: 300 }
      });
      console.log('   ✓ Navigation hover state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture navigation hover state:', error.message);
  }
  
  // 4. Mobile menu states
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'load', timeout: 60000 });
  
  // Mobile menu closed
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'navigation-mobile-menu-closed.png'),
    clip: { x: 0, y: 0, width: 375, height: 120 }
  });
  console.log('   ✓ Mobile menu closed state captured');
  
  // Try to open mobile menu
  try {
    const hamburger = await page.$('.hamburger, .mobile-menu-toggle, [aria-label*="menu"], .menu-toggle, button[type="button"]');
    if (hamburger) {
      await hamburger.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'navigation-mobile-menu-open.png'),
        fullPage: true
      });
      console.log('   ✓ Mobile menu open state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture mobile menu open state:', error.message);
  }
  
  // Reset to desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
}

async function captureButtonStates(page) {
  await page.goto(`${BASE_URL}/`, { waitUntil: 'load', timeout: 60000 });
  
  // Find primary buttons
  const primaryButtonSelectors = [
    'button[type="submit"]',
    '.btn-primary',
    '.button-primary',
    'button.primary',
    '.cta-button',
    'a[href*="contact"]',
    'button.orange',
    '.bg-orange-500',
    '.bg-orange-600'
  ];
  
  let primaryButton = null;
  for (const selector of primaryButtonSelectors) {
    try {
      primaryButton = await page.$(selector);
      if (primaryButton) break;
    } catch (error) {
      continue;
    }
  }
  
  if (primaryButton) {
    // Primary button default state
    await primaryButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const boundingBox = await primaryButton.boundingBox();
    if (boundingBox) {
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-primary-default.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 20),
          y: Math.max(0, boundingBox.y - 20),
          width: Math.min(1920, boundingBox.width + 40),
          height: Math.min(1080, boundingBox.height + 40)
        }
      });
      console.log('   ✓ Primary button default state captured');
      
      // Primary button hover state
      await primaryButton.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-primary-hover.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 20),
          y: Math.max(0, boundingBox.y - 20),
          width: Math.min(1920, boundingBox.width + 40),
          height: Math.min(1080, boundingBox.height + 40)
        }
      });
      console.log('   ✓ Primary button hover state captured');
    }
  }
  
  // Find secondary buttons
  const secondaryButtonSelectors = [
    '.btn-secondary',
    '.button-secondary',
    'button.secondary',
    '.btn-outline',
    'button[class*="outline"]',
    'a.button',
    '.border'
  ];
  
  let secondaryButton = null;
  for (const selector of secondaryButtonSelectors) {
    try {
      const buttons = await page.$$(selector);
      if (buttons.length > 0) {
        secondaryButton = buttons[0];
        break;
      }
    } catch (error) {
      continue;
    }
  }
  
  if (secondaryButton) {
    await secondaryButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const boundingBox = await secondaryButton.boundingBox();
    if (boundingBox) {
      // Secondary button default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-secondary-default.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 20),
          y: Math.max(0, boundingBox.y - 20),
          width: Math.min(1920, boundingBox.width + 40),
          height: Math.min(1080, boundingBox.height + 40)
        }
      });
      console.log('   ✓ Secondary button default state captured');
      
      // Secondary button hover state
      await secondaryButton.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-secondary-hover.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 20),
          y: Math.max(0, boundingBox.y - 20),
          width: Math.min(1920, boundingBox.width + 40),
          height: Math.min(1080, boundingBox.height + 40)
        }
      });
      console.log('   ✓ Secondary button hover state captured');
    }
  }
}

async function captureFormStates(page) {
  // Go to contact page for form states
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'load', timeout: 60000 });
  
  const formSelectors = [
    'form input[type="text"]',
    'form input[type="email"]',
    'form textarea',
    'input[name="name"]',
    'input[name="email"]',
    'textarea[name="message"]'
  ];
  
  let formField = null;
  for (const selector of formSelectors) {
    try {
      formField = await page.$(selector);
      if (formField) break;
    } catch (error) {
      continue;
    }
  }
  
  if (formField) {
    await formField.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const boundingBox = await formField.boundingBox();
    
    if (boundingBox) {
      // Form field default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'form-field-default.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 20),
          y: Math.max(0, boundingBox.y - 20),
          width: Math.min(1920, boundingBox.width + 40),
          height: Math.min(1080, boundingBox.height + 40)
        }
      });
      console.log('   ✓ Form field default state captured');
      
      // Form field focused state
      await formField.click();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'form-field-focused.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 20),
          y: Math.max(0, boundingBox.y - 20),
          width: Math.min(1920, boundingBox.width + 40),
          height: Math.min(1080, boundingBox.height + 40)
        }
      });
      console.log('   ✓ Form field focused state captured');
    }
    
    // Form validation error state - try to submit empty form
    try {
      const submitButton = await page.$('form button[type="submit"], form input[type="submit"]');
      if (submitButton) {
        await submitButton.click();
        await page.waitForTimeout(1000);
        
        // Look for validation message
        const errorMessage = await page.$('.error, .invalid, [aria-invalid="true"], .field-error');
        if (errorMessage) {
          const errorBoundingBox = await errorMessage.boundingBox();
          if (errorBoundingBox) {
            await page.screenshot({
              path: path.join(OUTPUT_DIR, 'form-validation-error.png'),
              clip: {
                x: Math.max(0, errorBoundingBox.x - 20),
                y: Math.max(0, errorBoundingBox.y - 60),
                width: Math.min(1920, errorBoundingBox.width + 40),
                height: Math.min(1080, errorBoundingBox.height + 80)
              }
            });
            console.log('   ✓ Form validation error state captured');
          }
        }
      }
    } catch (error) {
      console.log('   ⚠️ Could not capture form validation error:', error.message);
    }
  }
}

async function captureCardStates(page) {
  // Service cards on homepage
  await page.goto(`${BASE_URL}/`, { waitUntil: 'load', timeout: 60000 });
  
  const serviceCardSelectors = [
    '.service-card',
    '.services .card',
    '[class*="service"] .card',
    '.grid .card',
    '.services-grid > div',
    '.service-item'
  ];
  
  let serviceCard = null;
  for (const selector of serviceCardSelectors) {
    try {
      serviceCard = await page.$(selector);
      if (serviceCard) break;
    } catch (error) {
      continue;
    }
  }
  
  if (serviceCard) {
    await serviceCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const boundingBox = await serviceCard.boundingBox();
    
    if (boundingBox) {
      // Service card default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-service-default.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 10),
          y: Math.max(0, boundingBox.y - 10),
          width: Math.min(1920, boundingBox.width + 20),
          height: Math.min(1080, boundingBox.height + 20)
        }
      });
      console.log('   ✓ Service card default state captured');
      
      // Service card hover state
      await serviceCard.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-service-hover.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 10),
          y: Math.max(0, boundingBox.y - 10),
          width: Math.min(1920, boundingBox.width + 20),
          height: Math.min(1080, boundingBox.height + 20)
        }
      });
      console.log('   ✓ Service card hover state captured');
    }
  }
  
  // Blog cards
  await page.goto(`${BASE_URL}/blog`, { waitUntil: 'load', timeout: 60000 });
  
  const blogCardSelectors = [
    '.blog-card',
    '.post-card',
    '.blog .card',
    '.posts .card',
    '.grid .card'
  ];
  
  let blogCard = null;
  for (const selector of blogCardSelectors) {
    try {
      blogCard = await page.$(selector);
      if (blogCard) break;
    } catch (error) {
      continue;
    }
  }
  
  if (blogCard) {
    await blogCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const boundingBox = await blogCard.boundingBox();
    
    if (boundingBox) {
      // Blog card default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-blog-default.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 10),
          y: Math.max(0, boundingBox.y - 10),
          width: Math.min(1920, boundingBox.width + 20),
          height: Math.min(1080, boundingBox.height + 20)
        }
      });
      console.log('   ✓ Blog card default state captured');
      
      // Blog card hover state
      await blogCard.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-blog-hover.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 10),
          y: Math.max(0, boundingBox.y - 10),
          width: Math.min(1920, boundingBox.width + 20),
          height: Math.min(1080, boundingBox.height + 20)
        }
      });
      console.log('   ✓ Blog card hover state captured');
    }
  }
  
  // Success story cards
  await page.goto(`${BASE_URL}/success-stories`, { waitUntil: 'load', timeout: 60000 });
  
  const successCardSelectors = [
    '.success-card',
    '.story-card',
    '.success-stories .card',
    '.testimonial-card',
    '.case-study-card'
  ];
  
  let successCard = null;
  for (const selector of successCardSelectors) {
    try {
      successCard = await page.$(selector);
      if (successCard) break;
    } catch (error) {
      continue;
    }
  }
  
  if (successCard) {
    await successCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const boundingBox = await successCard.boundingBox();
    
    if (boundingBox) {
      // Success story card default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-success-story-default.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 10),
          y: Math.max(0, boundingBox.y - 10),
          width: Math.min(1920, boundingBox.width + 20),
          height: Math.min(1080, boundingBox.height + 20)
        }
      });
      console.log('   ✓ Success story card default state captured');
      
      // Success story card hover state
      await successCard.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-success-story-hover.png'),
        clip: {
          x: Math.max(0, boundingBox.x - 10),
          y: Math.max(0, boundingBox.y - 10),
          width: Math.min(1920, boundingBox.width + 20),
          height: Math.min(1080, boundingBox.height + 20)
        }
      });
      console.log('   ✓ Success story card hover state captured');
    }
  }
}


// Run the script
captureInteractiveStates().catch(console.error);

export { captureInteractiveStates };