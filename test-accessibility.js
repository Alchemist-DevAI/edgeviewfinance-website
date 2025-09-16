import { chromium } from 'playwright';

async function testAccessibility() {
  console.log('🔍 Testing accessibility improvements...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to the page
    console.log('📍 Navigating to homepage...');
    await page.goto('http://localhost:4002', { waitUntil: 'networkidle' });
    
    // Test Logo accessibility
    console.log('🏷️  Testing Logo accessibility...');
    const logoLink = await page.locator('a[aria-label="Edgeview Finance - Home"]').first();
    const logoAriaLabel = await logoLink.getAttribute('aria-label');
    const logoSrText = await logoLink.locator('.sr-only').textContent();
    const logoImg = await logoLink.locator('img').first();
    const logoAlt = await logoImg.getAttribute('alt');
    
    console.log(`   ✓ Logo aria-label: "${logoAriaLabel}"`);
    console.log(`   ✓ Logo sr-only text: "${logoSrText}"`);
    console.log(`   ✓ Logo alt text: "${logoAlt}"`);
    
    // Test Navigation dropdown buttons
    console.log('\n🧭 Testing Navigation dropdown buttons...');
    const dropdownButtons = await page.locator('.dropdown-toggle-btn, .nav-dropdown-btn-combined').all();
    
    for (let i = 0; i < dropdownButtons.length; i++) {
      const button = dropdownButtons[i];
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaExpanded = await button.getAttribute('aria-expanded');
      const ariaControls = await button.getAttribute('aria-controls');
      
      // Handle different button types
      let visibleText = '';
      let srText = '';
      
      try {
        // Try to get sr-only text if it exists
        srText = await button.locator('.sr-only').textContent() || '';
      } catch (e) {
        srText = 'None';
      }
      
      try {
        // Get visible text from nav-text span or direct text content
        const navText = button.locator('.nav-text');
        if (await navText.count() > 0) {
          visibleText = await navText.textContent();
        } else {
          visibleText = await button.textContent();
        }
      } catch (e) {
        visibleText = 'Unable to read';
      }
      
      console.log(`   ✓ Dropdown ${i + 1}:`);
      console.log(`     - Visible text: "${visibleText}"`);
      console.log(`     - Aria-label: "${ariaLabel}"`);
      console.log(`     - Aria-expanded: "${ariaExpanded}"`);
      console.log(`     - Aria-controls: "${ariaControls}"`);
      console.log(`     - Screen reader text: "${srText}"`);
    }
    
    // Test Mobile menu button
    console.log('\n📱 Testing Mobile menu button...');
    const mobileMenuButton = await page.locator('#openBtn').first();
    const mobileAriaLabel = await mobileMenuButton.getAttribute('aria-label');
    const mobileAriaExpanded = await mobileMenuButton.getAttribute('aria-expanded');
    const mobileAriaControls = await mobileMenuButton.getAttribute('aria-controls');
    const mobileSrText = await mobileMenuButton.locator('.sr-only').textContent();
    
    console.log(`   ✓ Mobile menu aria-label: "${mobileAriaLabel}"`);
    console.log(`   ✓ Mobile menu aria-expanded: "${mobileAriaExpanded}"`);
    console.log(`   ✓ Mobile menu aria-controls: "${mobileAriaControls}"`);
    console.log(`   ✓ Mobile menu sr-only text: "${mobileSrText}"`);
    
    // Test Mobile close button
    console.log('\n❌ Testing Mobile close button...');
    const closeButton = await page.locator('#closeBtn').first();
    const closeAriaLabel = await closeButton.getAttribute('aria-label');
    const closeAriaControls = await closeButton.getAttribute('aria-controls');
    const closeSrText = await closeButton.locator('.sr-only').textContent();
    
    console.log(`   ✓ Close button aria-label: "${closeAriaLabel}"`);
    console.log(`   ✓ Close button aria-controls: "${closeAriaControls}"`);
    console.log(`   ✓ Close button sr-only text: "${closeSrText}"`);
    
    // Test for invalid href attributes
    console.log('\n🔗 Testing for invalid href attributes...');
    const allLinks = await page.locator('a').all();
    let invalidLinksCount = 0;
    
    for (const link of allLinks) {
      const href = await link.getAttribute('href');
      if (!href || href === '#' || href === '' || href.startsWith('javascript:')) {
        invalidLinksCount++;
        const linkText = await link.textContent();
        console.log(`   ⚠️  Invalid href "${href}" on link: "${linkText?.trim()}"`);
      }
    }
    
    if (invalidLinksCount === 0) {
      console.log('   ✅ No invalid href attributes found!');
    } else {
      console.log(`   ❗ Found ${invalidLinksCount} links with invalid href attributes`);
    }
    
    // Test accessibility tree
    console.log('\n🌳 Testing accessibility tree...');
    const accessibilityTree = await page.accessibility.snapshot();
    
    // Count elements with missing names in the navigation area
    function countMissingNames(node, area = 'all') {
      let count = 0;
      if (node.role === 'link' || node.role === 'button') {
        if (!node.name || node.name.trim() === '') {
          count++;
          console.log(`   ⚠️  ${node.role} with missing name found`);
        }
      }
      if (node.children) {
        for (const child of node.children) {
          count += countMissingNames(child, area);
        }
      }
      return count;
    }
    
    const missingNamesCount = countMissingNames(accessibilityTree);
    
    if (missingNamesCount === 0) {
      console.log('   ✅ No links or buttons with missing names found!');
    } else {
      console.log(`   ❗ Found ${missingNamesCount} elements with missing names`);
    }
    
    console.log('\n🎉 Accessibility test completed!');
    
  } catch (error) {
    console.error('❌ Error during accessibility test:', error);
  } finally {
    await browser.close();
  }
}

testAccessibility();