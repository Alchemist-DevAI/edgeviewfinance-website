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
  console.log('🎨 Starting Phase 1 Interactive States Screenshot Capture...');
  
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
  
  console.log('✅ Phase 1 interactive states screenshot capture completed!');
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
    const menuToggle = await page.$('button[aria-label*="menu"], .menu-toggle, .hamburger, button:has-text("Menu")');
    if (menuToggle) {
      await menuToggle.click();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'navigation-mobile-menu-open.png'),
        fullPage: true
      });
      console.log('   ✓ Mobile menu open state captured');
    } else {
      console.log('   ⚠️ Mobile menu toggle not found');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture mobile menu open state:', error.message);
  }
}

async function captureButtonStates(page) {
  // Reset to desktop view
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'load', timeout: 60000 });
  
  // 1. Primary button states
  try {
    const primaryBtn = await page.$('button.btn-primary, .btn-primary, button:has-text("Book Discovery Call"), button:has-text("Get Started")');
    if (primaryBtn) {
      // Normal state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-primary-default.png'),
        clip: await primaryBtn.boundingBox()
      });
      console.log('   ✓ Primary button default state captured');
      
      // Hover state
      await primaryBtn.hover();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-primary-hover.png'),
        clip: await primaryBtn.boundingBox()
      });
      console.log('   ✓ Primary button hover state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture primary button states:', error.message);
  }
  
  // 2. Secondary button states
  try {
    const secondaryBtn = await page.$('button.btn-secondary, .btn-secondary, button:has-text("Call"), a[href*="tel:"]');
    if (secondaryBtn) {
      // Normal state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-secondary-default.png'),
        clip: await secondaryBtn.boundingBox()
      });
      console.log('   ✓ Secondary button default state captured');
      
      // Hover state
      await secondaryBtn.hover();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-secondary-hover.png'),
        clip: await secondaryBtn.boundingBox()
      });
      console.log('   ✓ Secondary button hover state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture secondary button states:', error.message);
  }
  
  // 3. Link button states
  try {
    const linkBtn = await page.$('a.btn, .btn-link, nav a:first-child');
    if (linkBtn) {
      // Normal state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-link-default.png'),
        clip: await linkBtn.boundingBox()
      });
      console.log('   ✓ Link button default state captured');
      
      // Hover state
      await linkBtn.hover();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'button-link-hover.png'),
        clip: await linkBtn.boundingBox()
      });
      console.log('   ✓ Link button hover state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture link button states:', error.message);
  }
}

async function captureFormStates(page) {
  // Navigate to contact page for form elements
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'load', timeout: 60000 });
  
  // 1. Input field states
  try {
    const inputField = await page.$('input[type="text"], input[type="email"], input[name="name"], input[name="email"]');
    if (inputField) {
      // Default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'form-input-default.png'),
        clip: await inputField.boundingBox()
      });
      console.log('   ✓ Input field default state captured');
      
      // Focus state
      await inputField.click();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'form-input-focus.png'),
        clip: await inputField.boundingBox()
      });
      console.log('   ✓ Input field focus state captured');
      
      // Filled state
      await inputField.fill('Test Value');
      await page.waitForTimeout(200);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'form-input-filled.png'),
        clip: await inputField.boundingBox()
      });
      console.log('   ✓ Input field filled state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture input field states:', error.message);
  }
  
  // 2. Textarea states
  try {
    const textarea = await page.$('textarea, textarea[name="message"]');
    if (textarea) {
      // Clear any existing content
      await textarea.fill('');
      
      // Default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'form-textarea-default.png'),
        clip: await textarea.boundingBox()
      });
      console.log('   ✓ Textarea default state captured');
      
      // Focus state
      await textarea.click();
      await page.waitForTimeout(200);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'form-textarea-focus.png'),
        clip: await textarea.boundingBox()
      });
      console.log('   ✓ Textarea focus state captured');
      
      // Filled state
      await textarea.fill('This is a test message with multiple lines.\nSecond line of text.');
      await page.waitForTimeout(200);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'form-textarea-filled.png'),
        clip: await textarea.boundingBox()
      });
      console.log('   ✓ Textarea filled state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture textarea states:', error.message);
  }
  
  // 3. Form validation states (if any)
  try {
    const submitBtn = await page.$('button[type="submit"], input[type="submit"], .btn-submit');
    if (submitBtn) {
      // Clear all form fields to trigger validation
      await page.fill('input[type="text"]', '');
      await page.fill('input[type="email"]', '');
      await page.fill('textarea', '');
      
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      // Capture any validation messages
      const form = await page.$('form');
      if (form) {
        await page.screenshot({
          path: path.join(OUTPUT_DIR, 'form-validation-error.png'),
          clip: await form.boundingBox()
        });
        console.log('   ✓ Form validation error state captured');
      }
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture form validation states:', error.message);
  }
}

async function captureCardStates(page) {
  // Navigate to services page for card elements
  await page.goto(`${BASE_URL}/service`, { waitUntil: 'load', timeout: 60000 });
  
  // 1. Service card states
  try {
    const serviceCard = await page.$('.service-card, .card, .service-item');
    if (serviceCard) {
      // Default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-service-default.png'),
        clip: await serviceCard.boundingBox()
      });
      console.log('   ✓ Service card default state captured');
      
      // Hover state
      await serviceCard.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-service-hover.png'),
        clip: await serviceCard.boundingBox()
      });
      console.log('   ✓ Service card hover state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture service card states:', error.message);
  }
  
  // 2. Success story cards (if available)
  try {
    await page.goto(`${BASE_URL}/success-stories`, { waitUntil: 'load', timeout: 60000 });
    
    const storyCard = await page.$('.success-story, .story-card, .case-study');
    if (storyCard) {
      // Default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-story-default.png'),
        clip: await storyCard.boundingBox()
      });
      console.log('   ✓ Success story card default state captured');
      
      // Hover state
      await storyCard.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-story-hover.png'),
        clip: await storyCard.boundingBox()
      });
      console.log('   ✓ Success story card hover state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture success story card states:', error.message);
  }
  
  // 3. Blog post cards (if available)
  try {
    await page.goto(`${BASE_URL}/blog`, { waitUntil: 'load', timeout: 60000 });
    
    const blogCard = await page.$('.blog-post, .post-card, .article-card');
    if (blogCard) {
      // Default state
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-blog-default.png'),
        clip: await blogCard.boundingBox()
      });
      console.log('   ✓ Blog card default state captured');
      
      // Hover state
      await blogCard.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'card-blog-hover.png'),
        clip: await blogCard.boundingBox()
      });
      console.log('   ✓ Blog card hover state captured');
    }
  } catch (error) {
    console.log('   ⚠️ Could not capture blog card states:', error.message);
  }
}

// Run the capture process
captureInteractiveStates().catch(console.error);