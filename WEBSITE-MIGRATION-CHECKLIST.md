# Website Migration Checklist: Wix to Vercel
**Document Version**: 1.1  
**Created**: 2025-09-12  
**Last Updated**: 2025-09-12  
**Status**: READY FOR DNS MIGRATION  
**Current Production**: www.edgeviewfinance.com.au (Wix)  
**New Production**: edgeviewfinance-website.vercel.app → www.edgeviewfinance.com.au

---

## 🎯 IMMEDIATE NEXT STEPS

### ✅ Completed
- [x] Google API Setup (All credentials configured)
- [x] Vercel Environment Variables (Added and deployed)
- [x] OAuth Configuration (Refresh token generated)

### 📌 Ready to Do Now
1. **Update Google OAuth Redirect URI** (5 minutes)
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - APIs & Services → Credentials → Edit OAuth client
   - Add production URI: `https://www.edgeviewfinance.com.au/api/auth/callback`
   - Keep localhost for testing: `http://localhost:4003/api/auth/callback`

2. **Test Deployment on Vercel** (10 minutes)
   - Visit: https://edgeviewfinance-website.vercel.app
   - Test all forms and contact methods
   - Verify all pages load correctly
   - Check mobile responsiveness

3. **Prepare DNS Records** (15 minutes)
   - Login to your domain registrar
   - Document current DNS records
   - Reduce TTL to 300 seconds (do this 24 hours before migration)

### 🚀 When Ready for Full Migration
- Choose migration time (weekend recommended)
- Follow DNS Migration Steps section below
- Monitor for 24-48 hours post-migration

---

## 🔴 CRITICAL - DNS & Domain Configuration

### Pre-Migration Preparation
- [ ] **Backup current DNS records** from domain registrar
- [ ] **Note current TTL values** (reduce to 300 seconds 24 hours before migration)
- [ ] **Document Wix nameservers** for potential rollback

### DNS Migration Steps
1. [ ] **Update DNS Records at Domain Registrar**
   - A Record: `@` → `76.76.21.21` (Vercel's IP)
   - CNAME: `www` → `cname.vercel-dns.com`
   - Remove Wix-specific records
   - Keep MX records for email unchanged

2. [ ] **Vercel Configuration**
   - [ ] Add domain in Vercel Dashboard: Project Settings → Domains
   - [ ] Add both: `edgeviewfinance.com.au` and `www.edgeviewfinance.com.au`
   - [ ] Set `www.edgeviewfinance.com.au` as primary
   - [ ] Verify SSL certificate auto-provisioned
   - [ ] Confirm redirects working (non-www to www)

3. [ ] **Verify Configuration**
   ```bash
   # Check DNS propagation
   nslookup www.edgeviewfinance.com.au
   dig www.edgeviewfinance.com.au
   
   # Test SSL
   curl -I https://www.edgeviewfinance.com.au
   ```

---

## 📊 Google Search Console Migration

### Pre-Migration Data Export
- [ ] **Export Performance Data** (last 16 months)
  - Search Analytics → Performance → Export
  - Save as: `wix-search-performance-[date].csv`
- [ ] **Download Current Sitemap**
  - Save copy of `sitemap.xml` from Wix
- [ ] **Document Top Pages**
  - Top 50 pages by impressions
  - Top 50 pages by clicks
  - Top keywords driving traffic

### Migration Process
1. [ ] **Property Setup**
   - [ ] Keep existing property for historical data
   - [ ] Add new property: `https://www.edgeviewfinance.com.au`
   - [ ] Verify via DNS TXT record: `google-site-verification=[code]`

2. [ ] **Submit New Sitemap**
   - [ ] URL: `https://www.edgeviewfinance.com.au/sitemap.xml`
   - [ ] Monitor indexing status daily for first week

3. [ ] **Request Indexing** (Priority Pages)
   - [ ] Homepage
   - [ ] Equipment Finance page
   - [ ] All service pages
   - [ ] Contact page
   - [ ] Finance Ready Assessment

4. [ ] **Monitor & Fix**
   - [ ] Check Coverage report daily
   - [ ] Fix any crawl errors immediately
   - [ ] Monitor Core Web Vitals
   - [ ] Review Mobile Usability

---

## 🗺️ Google Business Profile Updates

### Immediate Updates Required
- [ ] **Update Website URL**
  - Business Profile Manager → Info → Website
  - Change to: `https://www.edgeviewfinance.com.au`
  
- [ ] **Update Special URLs**
  - [ ] Appointment URL: `https://www.edgeviewfinance.com.au/contact`
  - [ ] Service URLs for each service category
  - [ ] Update any COVID-19 info links

- [ ] **Create Announcement Post**
  - "New website launched! Faster approvals, easier applications"
  - Include new website link
  - Add call-to-action button

### Verification Steps
- [ ] Test "Website" button from Google Maps
- [ ] Verify booking links work
- [ ] Check all service links active

---

## 📈 Google Analytics Setup

### GA4 Configuration
- [ ] **Tracking Code Installation**
  - [ ] Add GA4 measurement ID to site
  - [ ] Location: `src/layouts/Layout.astro`
  - [ ] Verify in GA4 Realtime

- [ ] **Essential Configuration**
  - [ ] Enable Enhanced Measurement
  - [ ] Set up Conversions:
    - Form submissions
    - Phone clicks
    - PDF downloads
    - Assessment completions
  - [ ] Configure Site Search tracking
  - [ ] Set up Custom Dimensions for services

- [ ] **Integrations**
  - [ ] Link Google Search Console
  - [ ] Link Google Ads (if applicable)
  - [ ] Configure Google Signals

---

## 🔄 301 Redirect Mapping

### Critical URL Mappings
```javascript
// Add to vercel.json redirects section
{
  "redirects": [
    // Service Pages
    { "source": "/equipment-finance-solutions", "destination": "/equipment-finance", "permanent": true },
    { "source": "/commercial-loans", "destination": "/working-capital-finance", "permanent": true },
    { "source": "/property-finance", "destination": "/commercial-property-finance", "permanent": true },
    
    // Common Wix URLs
    { "source": "/home", "destination": "/", "permanent": true },
    { "source": "/about-us", "destination": "/about", "permanent": true },
    { "source": "/contact-us", "destination": "/contact", "permanent": true },
    
    // Blog redirects (if URLs changed)
    { "source": "/post/*", "destination": "/blog/$1", "permanent": true }
  ]
}
```

### Testing Redirects
- [ ] Test each old URL manually
- [ ] Use redirect checker tool
- [ ] Monitor 404 errors in Vercel dashboard

---

## ✅ Pre-Launch Testing Checklist

### Functionality Testing
- [ ] **Forms Testing**
  - [ ] Contact form submission → email received
  - [ ] Finance Assessment form → data saved
  - [ ] Newsletter signup → confirmation
  - [ ] All CTAs clickable

- [ ] **Contact Methods**
  - [ ] Phone numbers clickable on mobile
  - [ ] Email links working
  - [ ] Calendly integration active
  - [ ] Office address links to Google Maps

### Performance Testing
- [ ] **Page Speed** (Target: 90+ score)
  - [ ] Test on PageSpeed Insights
  - [ ] Mobile score acceptable
  - [ ] Desktop score acceptable
  
- [ ] **Cross-Browser Testing**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
  - [ ] Mobile browsers

### SEO Verification
- [ ] **Technical SEO**
  - [ ] Robots.txt accessible
  - [ ] Sitemap.xml generating correctly
  - [ ] Meta tags on all pages
  - [ ] Open Graph tags for social
  - [ ] Schema markup present

---

## 📱 Local SEO & Directory Updates

### Priority 1 - Update Immediately
- [ ] Google Business Profile
- [ ] LinkedIn Company Page
- [ ] Facebook Business Page
- [ ] Yellow Pages
- [ ] True Local
- [ ] Yelp

### Priority 2 - Update Within 7 Days
- [ ] Industry directories:
  - [ ] MFAA member directory
  - [ ] FBAA directory
  - [ ] Commercial broker directories
- [ ] Local chambers of commerce
- [ ] Partner websites that link to you

### Notification List
- [ ] Email key referral partners
- [ ] Notify aggregator about website change
- [ ] Update email signatures company-wide
- [ ] Update business cards (next print run)

---

## 🚀 Launch Day Procedure

### T-24 Hours
- [ ] Reduce DNS TTL to 300 seconds
- [ ] Final testing on staging
- [ ] Backup current analytics data
- [ ] Team notification

### T-0 Launch Time
1. [ ] Update DNS records
2. [ ] Clear CDN caches
3. [ ] Submit sitemap to Google
4. [ ] Start monitoring

### T+1 Hour
- [ ] Verify DNS propagation started
- [ ] Test critical user paths
- [ ] Check forms working
- [ ] Monitor error logs

### T+24 Hours
- [ ] Full functionality audit
- [ ] Review analytics data
- [ ] Check Search Console for errors
- [ ] Address any 404s

---

## 📊 Post-Launch Monitoring

### Daily Checks (First Week)
- [ ] Google Search Console errors
- [ ] 404 errors in Vercel
- [ ] Form submission success
- [ ] Site uptime monitoring
- [ ] Page load speeds

### Weekly Checks (First Month)
- [ ] Search ranking changes
- [ ] Traffic patterns
- [ ] Conversion rates
- [ ] User behavior flow
- [ ] Technical errors

### Success Metrics
- [ ] No significant traffic drop
- [ ] Improved page speeds
- [ ] Lower bounce rate
- [ ] Higher conversion rate
- [ ] Better mobile experience

---

## 📝 Legal & Compliance

### Document Updates Required
- [ ] **Credit Guide**
  - [ ] PDF accessible at `/public/documents/credit-guide.pdf`
  - [ ] Download button working
  - [ ] Version current

- [ ] **Privacy Policy**
  - [ ] Updated with new domain
  - [ ] Cookie policy included
  - [ ] Data collection accurate

- [ ] **Terms of Use**
  - [ ] Domain references updated
  - [ ] Service terms current

- [ ] **Compliance Display**
  - [ ] ACL 459287 visible in footer
  - [ ] ABN displayed
  - [ ] Regulatory disclaimers present

---

## 🔧 Google API Integration Status

### ✅ COMPLETED - All Google APIs Configured
- ✅ **Google Sheets API**: Configured via service account in MCP
- ✅ **Google Search Console**: OAuth credentials configured
- ✅ **Google Analytics**: Property ID and OAuth configured
- ✅ **Google Business Profile**: Account ID and OAuth configured
- ✅ **Vercel Environment Variables**: All added and deployed

### Configuration Complete (.env & Vercel)
```bash
# Google OAuth 2.0 Credentials - ✅ CONFIGURED
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
GOOGLE_REDIRECT_URI=https://www.edgeviewfinance.com.au/api/auth/callback
GOOGLE_REFRESH_TOKEN=✅ Generated and configured

# Service-specific IDs - ✅ CONFIGURED
GOOGLE_ANALYTICS_PROPERTY_ID=312098291
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://www.edgeviewfinance.com.au
GOOGLE_MY_BUSINESS_ACCOUNT_ID=3103415427088433217
GOOGLE_MY_BUSINESS_LOCATION_ID=ChIJRWQVMo0PkWsRhO6qyH13r8c
```

### 📋 ✅ COMPLETED - Google API Setup

#### Step 1: Create Google Cloud Project & OAuth Credentials
1. [x] **Access Google Cloud Console**
   - Go to: https://console.cloud.google.com
   - Sign in with dan.peters@edgeviewfinance.com.au

2. [ ] **Create or Select Project**
   - Click project dropdown (top left)
   - Click "New Project"
   - Name: "Edgeview Finance Website"
   - Click "Create"
   - Wait for creation, then select the project

3. [ ] **Create OAuth Consent Screen**
   - Navigate to: APIs & Services → OAuth consent screen
   - Choose "External" user type
   - Click "Create"
   - Fill in:
     - App name: "Edgeview Finance Website"
     - User support email: dan.peters@edgeviewfinance.com.au
     - App domain: edgeviewfinance.com.au
     - Developer contact: dan.peters@edgeviewfinance.com.au
   - Click "Save and Continue"
   - Scopes: Click "Add or Remove Scopes"
     - Search and add:
       - `https://www.googleapis.com/auth/webmasters`
       - `https://www.googleapis.com/auth/analytics.readonly`
       - `https://www.googleapis.com/auth/business.manage`
   - Click "Update" → "Save and Continue"
   - Test users: Add dan.peters@edgeviewfinance.com.au
   - Click "Save and Continue"

4. [ ] **Create OAuth 2.0 Client ID**
   - Go to: APIs & Services → Credentials
   - Click "+ Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Edgeview Finance Web Client"
   - Authorized redirect URIs, add:
     - `https://www.edgeviewfinance.com.au/api/auth/callback`
     - `http://localhost:4321/api/auth/callback` (for testing)
   - Click "Create"
   - **SAVE THESE** (popup will show):
     - Client ID: Copy to .env `GOOGLE_CLIENT_ID=`
     - Client Secret: Copy to .env `GOOGLE_CLIENT_SECRET=`

#### Step 2: Enable Required Google APIs
1. [ ] **Enable APIs**
   - Go to: APIs & Services → Library
   - Search and enable each:
   
   a. [ ] **Google Search Console API**
      - Search: "Search Console API"
      - Click on it → Click "Enable"
   
   b. [ ] **Google Analytics Data API**
      - Search: "Google Analytics Data API"
      - Click on it → Click "Enable"
   
   c. [ ] **Google My Business API**
      - Search: "My Business Business Information API"
      - Click on it → Click "Enable"
      - Also enable: "My Business Account Management API"

#### Step 3: Get Service-Specific IDs

##### Google Analytics 4 Property ID
1. [ ] **Access Google Analytics**
   - Go to: https://analytics.google.com
   - Sign in with dan.peters@edgeviewfinance.com.au

2. [ ] **Find Property ID**
   - Click Admin (gear icon, bottom left)
   - In "Property" column → Property Settings
   - Copy "Property ID" (format: 123456789)
   - Add to .env: `GOOGLE_ANALYTICS_PROPERTY_ID=123456789`

##### Google My Business Account & Location IDs
1. [ ] **Access Business Profile Manager**
   - Go to: https://business.google.com
   - Sign in with dan.peters@edgeviewfinance.com.au

2. [ ] **Get Account ID**
   - Click on business name
   - URL will contain: `/accounts/XXXXX/`
   - Copy the XXXXX number
   - Add to .env: `GOOGLE_MY_BUSINESS_ACCOUNT_ID=XXXXX`

3. [ ] **Get Location ID**
   - In Business Profile, go to Info
   - Click "Advanced Information"
   - Look for "Place ID" or use:
   - Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
   - Search for "Edgeview Finance Gold Coast"
   - Copy Place ID
   - Add to .env: `GOOGLE_MY_BUSINESS_LOCATION_ID=ChIJ...`

#### Step 4: Generate OAuth Refresh Token

1. [ ] **Create OAuth Helper Script**
   - Create file: `get-google-refresh-token.html`
   ```html
   <!DOCTYPE html>
   <html>
   <head><title>Get Google Refresh Token</title></head>
   <body>
   <h1>Get Google OAuth Refresh Token</h1>
   <button onclick="authenticate()">Authenticate with Google</button>
   <pre id="result"></pre>
   <script>
   // Replace with your actual values from .env
   const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
   const REDIRECT_URI = 'http://localhost:4321/api/auth/callback';
   const SCOPES = [
     'https://www.googleapis.com/auth/webmasters',
     'https://www.googleapis.com/auth/analytics.readonly', 
     'https://www.googleapis.com/auth/business.manage'
   ].join(' ');

   function authenticate() {
     const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
       'client_id=' + CLIENT_ID +
       '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
       '&response_type=code' +
       '&scope=' + encodeURIComponent(SCOPES) +
       '&access_type=offline' +
       '&prompt=consent';
     
     window.location.href = authUrl;
   }
   </script>
   </body>
   </html>
   ```

2. [ ] **Get Authorization Code**
   - Open the HTML file in browser
   - Click "Authenticate with Google"
   - Sign in and approve permissions
   - You'll be redirected to callback URL
   - Copy the `code` parameter from URL

3. [ ] **Exchange Code for Refresh Token**
   - Run this curl command (replace values):
   ```bash
   curl -X POST https://oauth2.googleapis.com/token \
     -d "code=YOUR_AUTH_CODE" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "redirect_uri=http://localhost:4321/api/auth/callback" \
     -d "grant_type=authorization_code"
   ```
   - Copy the `refresh_token` from response
   - Add to .env: `GOOGLE_REFRESH_TOKEN=1//...`

#### Step 5: Add to Vercel Environment Variables

1. [ ] **Access Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Select: "edgeviewfinance-website" project

2. [ ] **Add Environment Variables**
   - Go to: Settings → Environment Variables
   - Add each variable (for all environments):
   ```
   GOOGLE_CLIENT_ID = [your-client-id]
   GOOGLE_CLIENT_SECRET = [your-client-secret]
   GOOGLE_REFRESH_TOKEN = [your-refresh-token]
   GOOGLE_ANALYTICS_PROPERTY_ID = [your-property-id]
   GOOGLE_SEARCH_CONSOLE_SITE_URL = https://www.edgeviewfinance.com.au
   GOOGLE_MY_BUSINESS_ACCOUNT_ID = [your-account-id]
   GOOGLE_MY_BUSINESS_LOCATION_ID = [your-location-id]
   ```
   - Click "Save" for each

3. [ ] **Redeploy to Apply Variables**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - Wait for completion

#### Step 6: Verify Everything Works
1. [ ] **Test Locally**
   ```bash
   cd /4-development-infrastructure/evfbs-agency11-pure
   node test-google-apis.js
   ```
   - All should show ✓ green checkmarks

2. [ ] **Test on Vercel**
   - Create API endpoint: `/api/test-google`
   - Deploy and check logs

### Testing Tool Available
```bash
# Test script created: test-google-apis.js
cd /4-development-infrastructure/evfbs-agency11-pure
node test-google-apis.js

# Current test results:
✓ Google Sheets - Working (via service account)
✗ Search Console - Needs OAuth credentials
✗ Analytics - Needs Property ID and OAuth
✗ Business Profile - Needs Account ID and OAuth
```

---

## 🚦 Migration Risk Management

### Rollback Plan
If critical issues arise:
1. Revert DNS to Wix nameservers
2. Document issues encountered
3. Fix on staging
4. Reattempt in 24-48 hours

### Known Risks
- **DNS Propagation**: Can take 24-48 hours globally
- **Email Disruption**: Keep MX records unchanged
- **SEO Impact**: Temporary ranking flux expected
- **Cache Issues**: CDN and browser caches

### Support Contacts
- **Vercel Support**: support.vercel.com
- **Domain Registrar**: [Your registrar support]
- **Google Support**: Business Profile Help Center

---

## 📅 Recommended Migration Schedule

### Option 1: Weekend Migration (Recommended)
- **Friday Evening**: Reduce TTL, final tests
- **Saturday Morning**: Execute DNS change
- **Saturday-Sunday**: Monitor and fix issues
- **Monday**: Full production verification

### Option 2: Overnight Migration
- **Day 1, 6 PM**: Reduce TTL
- **Day 2, 12 AM**: Execute DNS change
- **Day 2, 6 AM**: Initial verification
- **Day 2, 9 AM**: Business hours monitoring

---

## ✔️ Sign-Off Checklist

### Technical Approval
- [ ] Development team sign-off
- [ ] Staging environment tested
- [ ] Performance benchmarks met

### Business Approval
- [ ] Content reviewed and approved
- [ ] Legal/compliance verified
- [ ] Management approval to proceed

### Go-Live Authorization
- [ ] Date: _______________
- [ ] Time: _______________
- [ ] Authorized by: _______________

---

## 📞 Emergency Contacts

- **Technical Issues**: Dan Peters
- **DNS/Domain**: [Registrar support]
- **Vercel Issues**: support.vercel.com
- **Google Issues**: Each product's help center

---

**Document Status**: Ready for migration execution
**Next Update**: Post-migration review