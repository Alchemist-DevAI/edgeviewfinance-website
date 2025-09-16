# Edgeview Finance Website - Testing Protocol

## Overview
This document defines the mandatory testing procedures for all changes to the Edgeview Finance website. Testing MUST be performed locally before deployment, with verification of actual functionality rather than just code review.

---

## 🎯 Testing Categories

### 1. Visual Changes Testing
**Tool**: Playwright MCP (Browser automation)
**When**: Any UI/UX changes, CSS modifications, layout adjustments

#### Setup Requirements
```bash
# Install Playwright locally in project
cd /tmp/edgeviewfinance-website
npm install --save-dev @playwright/test playwright
npx playwright install chromium

# If MCP browser errors occur, restart the browser:
# Use mcp__microsoft-playwright__browser_close
# Then mcp__microsoft-playwright__browser_navigate
```

#### Visual Testing Checklist
- [ ] Start local dev server: `npm run dev`
- [ ] Navigate to changed pages using Playwright
- [ ] Take before/after screenshots
- [ ] Verify responsive design at breakpoints (mobile: 375px, tablet: 768px, desktop: 1440px)
- [ ] Check cross-browser compatibility
- [ ] Validate accessibility (color contrast, font sizes)

### 2. Functional Changes Testing
**Tool**: Database logs, API monitoring, Email service logs
**When**: Form submissions, API endpoints, database operations, email sending

#### Functional Testing Checklist
- [ ] Start local dev server with environment variables
- [ ] Test the actual functionality (not just code review)
- [ ] Verify database operations:
  ```sql
  -- Check Supabase for new entries
  SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;
  ```
- [ ] Monitor API responses in browser DevTools Network tab
- [ ] Check email service logs (Resend dashboard)
- [ ] Test error scenarios (duplicate entries, validation failures)

### 3. Build & Deployment Testing
**Tool**: Local build commands, Vercel deployment logs
**When**: Before every deployment

#### Build Testing Checklist
- [ ] Run TypeScript check: `npm run typecheck` (or `npm run build:fast` if TypeScript errors exist)
- [ ] Run full build: `npm run build`
- [ ] Check for build warnings/errors
- [ ] Preview production build: `npm run preview`
- [ ] Verify all environment variables are set in Vercel

---

## 📋 Standard Testing Workflow

### For Every Change:

1. **Local Development Testing**
   ```bash
   # Start development server
   cd /tmp/edgeviewfinance-website
   npm run dev
   ```

2. **Visual Verification** (if UI changes)
   ```javascript
   // Using Playwright MCP
   mcp__microsoft-playwright__browser_navigate({ url: "http://localhost:4321" })
   mcp__microsoft-playwright__browser_snapshot()
   mcp__microsoft-playwright__browser_take_screenshot({ filename: "after-fix.png" })
   ```

3. **Functional Verification** (if backend changes)
   ```javascript
   // Test form submission
   mcp__microsoft-playwright__browser_fill_form({
     fields: [{
       name: "Email",
       ref: "email-input",
       type: "textbox",
       value: "test@example.com"
     }]
   })

   // Check database
   mcp__supabase-voice-discovery__execute_sql({
     project_id: "paduvnvocacqnmlfuvyn",
     query: "SELECT * FROM contacts WHERE email = 'test@example.com'"
   })
   ```

4. **Build Verification**
   ```bash
   npm run build:fast  # Quick build without TypeScript
   npm run preview     # Test production build locally
   ```

---

## 🔍 Specific Test Scenarios

### Newsletter Signup Testing
1. Submit valid email → Check for:
   - Success message displayed
   - Entry in Supabase `contacts` table
   - Welcome email sent (check Resend logs)
   - Notification email to admin
2. Submit duplicate email → Check for:
   - Appropriate error message
   - No duplicate database entry
3. Submit invalid email → Check for:
   - Validation error message
   - No database entry

### Contact Form Testing
1. Submit complete form → Verify:
   - Database entry created
   - Confirmation email sent
   - Admin notification sent
   - Success message shown
2. Submit with missing fields → Verify:
   - Validation errors displayed
   - No submission processed

### Navigation Testing
1. Test all menu items → Verify:
   - Correct page loads
   - Active state highlighting
   - Mobile menu functionality
   - Dropdown menus work

---

## 🚨 Common Issues & Solutions

### Playwright MCP Browser Issues
**Problem**: "Browser in use" error
**Solution**:
1. Close existing browser: `mcp__microsoft-playwright__browser_close`
2. If persists, kill process: `pkill chromium`
3. Reinstall if needed: `mcp__microsoft-playwright__browser_install`

### Environment Variable Issues
**Problem**: Features work locally but not in production
**Solution**:
1. Verify all env vars in `.env.local`
2. Check Vercel environment settings
3. Ensure env vars are added to all environments (Production, Preview, Development)

### Build Failures
**Problem**: TypeScript errors blocking deployment
**Solution**:
1. Use `npm run build:fast` to bypass TypeScript checking
2. Document errors in DEVELOPMENT-GUIDE.md for future fixing
3. Create task to resolve TypeScript issues properly

---

## 📊 Testing Documentation

After testing, update the following:

1. **DEVELOPMENT-GUIDE.md** - Add any new fixes or patterns discovered
2. **Test Results** - Document in commit message:
   ```
   fix: Newsletter signup functionality

   - Tested locally with valid/invalid emails
   - Verified database entries created
   - Confirmed email sending (dev mode)
   - Screenshots taken before/after
   ```

3. **Known Issues** - If issues found but not fixed:
   - Add to DEVELOPMENT-GUIDE.md under "Known Issues"
   - Create GitHub issue for tracking
   - Add workaround if available

---

## ✅ Testing Checklist Template

Copy this for each feature/fix:

```markdown
### Feature: [Feature Name]
Date: [YYYY-MM-DD]
Tested by: [Name/Agent]

#### Pre-Testing
- [ ] Local environment setup complete
- [ ] All dependencies installed
- [ ] Environment variables configured

#### Visual Testing
- [ ] Desktop view (1440px): ✅/❌
- [ ] Tablet view (768px): ✅/❌
- [ ] Mobile view (375px): ✅/❌
- [ ] Screenshots captured: ✅/❌

#### Functional Testing
- [ ] Happy path tested: ✅/❌
- [ ] Error scenarios tested: ✅/❌
- [ ] Database verified: ✅/❌
- [ ] API responses checked: ✅/❌
- [ ] Email sending verified: ✅/❌

#### Build Testing
- [ ] Local build successful: ✅/❌
- [ ] No console errors: ✅/❌
- [ ] Performance acceptable: ✅/❌

#### Notes
[Any issues, workarounds, or observations]
```

---

## 🔧 Testing Tools Configuration

### Required Tools
- **Playwright MCP**: Visual and interaction testing
- **Supabase MCP**: Database verification
- **Vercel MCP**: Deployment monitoring
- **Browser DevTools**: Network and console monitoring

### Environment Setup
```bash
# Required environment variables for testing
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
RESEND_API_KEY=your_resend_key
EMAIL_FROM=noreply@edgeviewfinance.com.au
EMAIL_TO=dan.peters@edgeviewfinance.com.au
```

---

## 📝 Testing Priority

### High Priority (Must Test)
1. Payment/financial calculators
2. Contact forms
3. Newsletter signups
4. Navigation and routing
5. Mobile responsiveness

### Medium Priority (Should Test)
1. Blog functionality
2. Service pages
3. SEO meta tags
4. Social sharing

### Low Priority (Can Test)
1. Footer links
2. Static content pages
3. Legal pages

---

## 🎯 Success Criteria

A change is considered successfully tested when:
1. All relevant test scenarios pass
2. No regression in existing functionality
3. Screenshots/recordings document the changes
4. Database/API logs confirm backend operations
5. Build completes without errors
6. Deployment to Vercel succeeds

---

*Last Updated: 2025-09-14*
*Version: 1.0.0*