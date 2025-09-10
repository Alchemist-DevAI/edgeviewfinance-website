# Edgeview Finance Website Deployment Checklist

## Current Status
- **Repository**: https://github.com/Alchemist-DevAI/evfbs-v2-supabase
- **Current Domain**: www.edgeviewfinance.com.au (hosted on Wix)
- **New Site Location**: `/4-development-infrastructure/evfbs-agency11-pure`
- **Framework**: Astro with Node.js adapter
- **Uncommitted Changes**: 14 commits ahead + Header.astro modification

## Pre-Deployment Tasks

### 1. Code Preparation ✅
- [ ] Commit Header.astro changes
- [ ] Push all 14 pending commits to GitHub
- [ ] Test build locally: `npm run build`
- [ ] Verify all environment variables are configured

### 2. Vercel Setup
- [ ] Create new Vercel project linked to GitHub repo
- [ ] Set root directory to: `4-development-infrastructure/evfbs-agency11-pure`
- [ ] Configure build settings:
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- [ ] Add environment variables in Vercel:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `RESEND_API_KEY`
  - `EMAIL_FROM`
  - `EMAIL_TO`

### 3. Create Required Files
- [ ] Create `vercel.json` for deployment configuration
- [ ] Create `robots.txt` for search engines
- [ ] Create `sitemap.xml` or implement dynamic sitemap generation
- [ ] Add security headers configuration

### 4. SEO Preparation
- [ ] Verify all meta tags on each page
- [ ] Implement Open Graph tags
- [ ] Add structured data (JSON-LD)
- [ ] Ensure all images have alt text
- [ ] Optimize page titles and descriptions

## DNS Migration Strategy

### Phase 1: Staging Deployment (Day 1)
1. [ ] Deploy to Vercel with automatic URL (*.vercel.app)
2. [ ] Test all functionality on staging
3. [ ] Run performance tests
4. [ ] Check mobile responsiveness

### Phase 2: Domain Setup (Day 2-3)
1. [ ] Add custom domain in Vercel settings
2. [ ] Update DNS records at your domain registrar:
   - [ ] A Record: Point to Vercel IP (76.76.21.21)
   - [ ] AAAA Record: Point to Vercel IPv6 (2606:4700::6810:84e5)
   - [ ] CNAME for www: cname.vercel-dns.com
3. [ ] Enable SSL certificate in Vercel
4. [ ] Set up redirects (non-www to www, HTTP to HTTPS)

### Phase 3: Gradual Migration (Day 4-5)
1. [ ] Lower TTL on DNS records (5 minutes)
2. [ ] Switch DNS during low traffic period
3. [ ] Monitor for any issues
4. [ ] Keep Wix site as backup for 48 hours

### Phase 4: Cleanup (Day 6-7)
1. [ ] Verify all traffic routing correctly
2. [ ] Cancel Wix hosting (after confirmation)
3. [ ] Update TTL back to normal (3600)

## SEO & Search Console Setup

### Google Search Console
1. [ ] Verify domain ownership via DNS TXT record
2. [ ] Submit new sitemap.xml
3. [ ] Set up URL inspection for key pages
4. [ ] Configure international targeting (Australia)
5. [ ] Monitor for crawl errors

### Google Analytics 4
1. [ ] Create new GA4 property
2. [ ] Add tracking code to website
3. [ ] Set up conversion tracking:
   - [ ] Contact form submissions
   - [ ] Phone clicks
   - [ ] Email clicks
   - [ ] Calculator usage
4. [ ] Configure audience segments

### Local SEO
1. [ ] Update Google Business Profile with new website
2. [ ] Ensure NAP consistency (Name, Address, Phone)
3. [ ] Add schema markup for local business
4. [ ] Submit to Australian business directories

### LLM & AI Search Optimization
1. [ ] Implement comprehensive FAQ schema
2. [ ] Add detailed service descriptions
3. [ ] Create content hubs for key topics
4. [ ] Ensure clear information architecture
5. [ ] Add breadcrumb navigation with schema

## Performance Optimization

### Pre-Launch
1. [ ] Run Lighthouse audit
2. [ ] Optimize images (WebP format, lazy loading)
3. [ ] Minify CSS/JS
4. [ ] Enable compression
5. [ ] Set up CDN (Vercel Edge Network)

### Monitoring
1. [ ] Set up uptime monitoring (UptimeRobot/Pingdom)
2. [ ] Configure error tracking (Sentry)
3. [ ] Set up performance monitoring
4. [ ] Create backup strategy

## Security Checklist

1. [ ] Enable HTTPS only
2. [ ] Set security headers:
   - [ ] Content Security Policy
   - [ ] X-Frame-Options
   - [ ] X-Content-Type-Options
3. [ ] Implement rate limiting on forms
4. [ ] Set up CAPTCHA on contact forms
5. [ ] Regular security updates schedule

## Testing Protocol

### Functional Testing
- [ ] All forms submit correctly
- [ ] Email notifications work
- [ ] All links functional
- [ ] Mobile menu works
- [ ] Calculator tools function

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance Benchmarks
- [ ] Page load < 3 seconds
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass

## Post-Launch Tasks

### Week 1
- [ ] Monitor 404 errors
- [ ] Check search console for issues
- [ ] Review analytics data
- [ ] Gather user feedback
- [ ] Fix any critical bugs

### Month 1
- [ ] Analyze traffic patterns
- [ ] Optimize based on user behavior
- [ ] A/B testing implementation
- [ ] Content updates based on search queries
- [ ] Review and optimize conversion funnels

## Emergency Rollback Plan

If critical issues arise:
1. [ ] Document the issue
2. [ ] Revert DNS to Wix (if within 48 hours)
3. [ ] Or rollback to previous Vercel deployment
4. [ ] Communicate with stakeholders
5. [ ] Fix issues on staging
6. [ ] Re-deploy when resolved

## Contact & Support

- **Vercel Support**: https://vercel.com/support
- **GitHub Issues**: Repository issues page
- **DNS Provider**: [Your DNS provider support]
- **Domain Registrar**: [Your registrar support]

## Notes

- Keep Wix site active for at least 1 week after migration
- Document all configuration changes
- Take screenshots of current Wix analytics for comparison
- Backup all form submissions during transition