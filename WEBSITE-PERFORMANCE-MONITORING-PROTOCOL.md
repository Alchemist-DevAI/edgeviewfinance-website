# Website Performance Monitoring Protocol
**Project:** Edgeview Finance Website
**Last Updated:** September 2025
**Purpose:** Maintain optimal website performance and SEO rankings through systematic monitoring

## Executive Summary

This protocol ensures the Edgeview Finance website maintains:
- Performance score: 95+ (mobile), 99+ (desktop)
- All Core Web Vitals in "Good" range
- Top SEO rankings through technical excellence
- Optimal user experience across all devices

## Understanding Performance Metrics

### Synthetic vs Real-World Data

| Type | Tool | Purpose | Limitations |
|------|------|---------|-------------|
| **Synthetic** | Lighthouse, PageSpeed Insights | Consistent benchmarking, catch regressions | Simulated conditions, not real users |
| **Real-World** | Vercel Analytics, CrUX | Actual user experience | Variable, needs volume |
| **Hybrid** | Chrome DevTools | Deep debugging | Manual process |

**Strategy:** Use synthetic for testing, real-world for validation

## Core Web Vitals Targets

### Required Thresholds for SEO Success
| Metric | Good | Needs Improvement | Poor | Our Target |
|--------|------|-------------------|------|------------|
| **LCP** | <2.5s | 2.5s-4s | >4s | <2.0s |
| **INP/FID** | <200ms | 200ms-500ms | >500ms | <100ms |
| **CLS** | <0.1 | 0.1-0.25 | >0.25 | <0.05 |

**Note:** Google uses Core Web Vitals as a ranking signal. Meeting "Good" thresholds is essential for SEO.

## Automated Testing Schedule

### Daily Checks (Automated via CI/CD)
```bash
# Run every morning at 6 AM AEST
npm run perf:daily
```

### Weekly Comprehensive Audit
```bash
# Run every Monday at 9 AM AEST
npm run perf:weekly
```

### Pre-Deployment Testing
```bash
# Must pass before any deployment
npm run perf:pre-deploy
```

## Testing Commands for Claude Code

### 1. Quick Performance Check
```bash
# Mobile performance check
npx lighthouse https://www.edgeviewfinance.com.au \
  --form-factor=mobile \
  --only-categories=performance \
  --view

# Desktop performance check
npx lighthouse https://www.edgeviewfinance.com.au \
  --form-factor=desktop \
  --only-categories=performance \
  --view
```

### 2. Full Audit (Performance + SEO + Accessibility)
```bash
# Complete mobile audit
npx lighthouse https://www.edgeviewfinance.com.au \
  --form-factor=mobile \
  --view

# Complete desktop audit
npx lighthouse https://www.edgeviewfinance.com.au \
  --form-factor=desktop \
  --view
```

### 3. JSON Output for Tracking
```bash
# Generate JSON report for historical tracking
npx lighthouse https://www.edgeviewfinance.com.au \
  --output=json \
  --output-path=./reports/lighthouse-$(date +%Y%m%d-%H%M%S).json \
  --form-factor=mobile
```

### 4. Performance Budget Check
```bash
# Check against performance budget
npx lighthouse https://www.edgeviewfinance.com.au \
  --budget-path=./performance-budget.json \
  --form-factor=mobile
```

## Performance Budget Configuration

Create `performance-budget.json`:
```json
[
  {
    "path": "/*",
    "timings": [
      {
        "metric": "first-contentful-paint",
        "budget": 2000
      },
      {
        "metric": "largest-contentful-paint",
        "budget": 2500
      },
      {
        "metric": "cumulative-layout-shift",
        "budget": 0.1
      },
      {
        "metric": "total-blocking-time",
        "budget": 200
      }
    ],
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 300
      },
      {
        "resourceType": "stylesheet",
        "budget": 150
      },
      {
        "resourceType": "image",
        "budget": 500
      },
      {
        "resourceType": "total",
        "budget": 1024
      }
    ],
    "resourceCounts": [
      {
        "resourceType": "third-party",
        "budget": 5
      }
    ]
  }
]
```

## Automated Testing Script

Save as `performance-test.js`:
```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.edgeviewfinance.com.au';
const THRESHOLDS = {
  performance: { mobile: 91, desktop: 99 },
  accessibility: 94,
  'best-practices': 96,
  seo: 92
};

async function runPerformanceTest() {
  const timestamp = new Date().toISOString().split('T')[0];
  const reportDir = path.join(__dirname, 'performance-reports');

  // Ensure report directory exists
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  console.log('🚀 Starting Performance Tests...\n');

  // Test configurations
  const tests = [
    { name: 'Mobile', formFactor: 'mobile' },
    { name: 'Desktop', formFactor: 'desktop' }
  ];

  const results = [];

  for (const test of tests) {
    console.log(`📱 Testing ${test.name}...`);

    const outputPath = path.join(reportDir, `${timestamp}-${test.formFactor}.json`);

    try {
      // Run Lighthouse
      execSync(`npx lighthouse ${SITE_URL} \
        --output=json \
        --output-path=${outputPath} \
        --form-factor=${test.formFactor} \
        --quiet \
        --chrome-flags="--headless"`,
        { stdio: 'pipe' }
      );

      // Read and parse results
      const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      const scores = {
        performance: Math.round(report.categories.performance.score * 100),
        accessibility: Math.round(report.categories.accessibility.score * 100),
        'best-practices': Math.round(report.categories['best-practices'].score * 100),
        seo: Math.round(report.categories.seo.score * 100)
      };

      // Core Web Vitals
      const metrics = {
        FCP: report.audits['first-contentful-paint'].numericValue,
        LCP: report.audits['largest-contentful-paint'].numericValue,
        TBT: report.audits['total-blocking-time'].numericValue,
        CLS: report.audits['cumulative-layout-shift'].numericValue,
        SI: report.audits['speed-index'].numericValue
      };

      results.push({
        test: test.name,
        scores,
        metrics,
        timestamp: new Date().toISOString()
      });

      // Check thresholds
      console.log(`\n✅ ${test.name} Results:`);
      console.log(`   Performance: ${scores.performance}/100 (threshold: ${THRESHOLDS.performance[test.formFactor]})`);
      console.log(`   Accessibility: ${scores.accessibility}/100`);
      console.log(`   Best Practices: ${scores['best-practices']}/100`);
      console.log(`   SEO: ${scores.seo}/100`);
      console.log(`\n   Core Web Vitals:`);
      console.log(`   FCP: ${(metrics.FCP/1000).toFixed(2)}s`);
      console.log(`   LCP: ${(metrics.LCP/1000).toFixed(2)}s`);
      console.log(`   TBT: ${metrics.TBT}ms`);
      console.log(`   CLS: ${metrics.CLS.toFixed(3)}`);

      // Alert if below threshold
      if (scores.performance < THRESHOLDS.performance[test.formFactor]) {
        console.warn(`\n⚠️  WARNING: ${test.name} performance below threshold!`);
      }

    } catch (error) {
      console.error(`❌ Error testing ${test.name}:`, error.message);
    }
  }

  // Save summary
  const summaryPath = path.join(reportDir, `${timestamp}-summary.json`);
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

  console.log(`\n📊 Reports saved to: ${reportDir}`);
  return results;
}

// Run if called directly
if (require.main === module) {
  runPerformanceTest().catch(console.error);
}

module.exports = { runPerformanceTest };
```

## Package.json Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "perf:mobile": "lighthouse https://www.edgeviewfinance.com.au --form-factor=mobile --view",
    "perf:desktop": "lighthouse https://www.edgeviewfinance.com.au --form-factor=desktop --view",
    "perf:mobile:json": "lighthouse https://www.edgeviewfinance.com.au --form-factor=mobile --output=json --output-path=./reports/mobile.json",
    "perf:desktop:json": "lighthouse https://www.edgeviewfinance.com.au --form-factor=desktop --output=json --output-path=./reports/desktop.json",
    "perf:test": "node performance-test.js",
    "perf:daily": "npm run perf:test",
    "perf:weekly": "npm run perf:test && npm run perf:analyze",
    "perf:pre-deploy": "npm run perf:test -- --strict",
    "perf:analyze": "node analyze-performance.js"
  }
}
```

## Regular Maintenance Checklist

### Weekly Tasks
- [ ] Run full performance audit
- [ ] Check Core Web Vitals trends
- [ ] Review third-party script impact
- [ ] Validate image optimization
- [ ] Check for new unused CSS/JS

### Monthly Tasks
- [ ] Review real user metrics (Vercel Analytics)
- [ ] Analyze Google Search Console data
- [ ] Update performance budget if needed
- [ ] Review and update dependencies
- [ ] Check security headers

### Quarterly Tasks
- [ ] Comprehensive SEO audit
- [ ] Competitive performance analysis
- [ ] Review hosting/CDN performance
- [ ] Update this protocol document

## Performance Optimization Checklist

### Before Each Deployment
- [ ] **Images**
  - [ ] All images optimized (WebP/AVIF)
  - [ ] Proper sizing with srcset
  - [ ] Lazy loading implemented
  - [ ] Alt text for SEO

- [ ] **Code**
  - [ ] CSS/JS minified
  - [ ] Unused code removed
  - [ ] Code splitting implemented
  - [ ] Critical CSS inlined

- [ ] **Caching**
  - [ ] Static assets have long cache
  - [ ] CDN configured properly
  - [ ] Service worker updated

- [ ] **SEO Technical**
  - [ ] Meta tags complete
  - [ ] Structured data valid
  - [ ] Sitemap updated
  - [ ] Robots.txt correct

## SEO Performance Integration

### Critical SEO Factors Affected by Performance

1. **Page Experience Signals**
   - Core Web Vitals (LCP, INP, CLS)
   - Mobile-friendliness
   - HTTPS security
   - No intrusive interstitials

2. **Crawlability**
   - Fast server response (<600ms)
   - Optimized crawl budget
   - No render-blocking resources
   - Proper internal linking

3. **User Signals**
   - Low bounce rate (fast loads)
   - High engagement (smooth UX)
   - Good session duration

### SEO Monitoring Tools Integration

```bash
# Google Search Console API check
curl -X GET \
  "https://searchconsole.googleapis.com/v1/sites/https://www.edgeviewfinance.com.au/searchAnalytics/query" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Check indexed pages
curl -X GET \
  "https://searchconsole.googleapis.com/v1/sites/https://www.edgeviewfinance.com.au/sitemaps"
```

## Emergency Response Procedures

### If Performance Drops Below Threshold

1. **Immediate Actions**
   ```bash
   # Quick diagnostic
   npm run perf:mobile

   # Check recent changes
   git log --oneline -10

   # Rollback if needed
   vercel rollback
   ```

2. **Investigation**
   - Check for new third-party scripts
   - Review recent image additions
   - Look for CSS/JS bloat
   - Verify CDN functioning

3. **Quick Fixes**
   - Enable emergency caching
   - Disable non-critical features
   - Optimize largest images
   - Remove problematic scripts

## Reporting Template

### Weekly Performance Report
```markdown
## Performance Report - [DATE]

### Summary
- Mobile Score: XX/100 (Target: 95+)
- Desktop Score: XX/100 (Target: 99+)
- Status: ✅ PASSING / ⚠️ WARNING / ❌ FAILING

### Core Web Vitals
| Metric | Mobile | Desktop | Status |
|--------|--------|---------|--------|
| LCP | X.Xs | X.Xs | ✅/⚠️/❌ |
| INP | Xms | Xms | ✅/⚠️/❌ |
| CLS | X.XXX | X.XXX | ✅/⚠️/❌ |

### Action Items
1. [Issue found] - [Priority]
2. [Issue found] - [Priority]

### Recommendations
- [Optimization suggestion]
- [Preventive measure]
```

## Advanced Monitoring with Puppeteer

```javascript
// advanced-metrics.js
const puppeteer = require('puppeteer');

async function captureMetrics(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Enable performance tracking
  await page.evaluateOnNewDocument(() => {
    window.performanceMetrics = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.performanceMetrics.push(entry);
      }
    }).observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift'] });
  });

  await page.goto(url, { waitUntil: 'networkidle0' });

  // Get all metrics
  const metrics = await page.evaluate(() => ({
    navigation: performance.getEntriesByType('navigation')[0],
    paint: performance.getEntriesByType('paint'),
    lcp: window.performanceMetrics.filter(e => e.entryType === 'largest-contentful-paint'),
    cls: window.performanceMetrics.filter(e => e.entryType === 'layout-shift')
  }));

  await browser.close();
  return metrics;
}
```

## Best Practices for Sustained Performance

### Development Practices
1. **Performance-First Development**
   - Set performance budgets early
   - Test on slow devices
   - Use performance CI/CD gates

2. **Image Management**
   - Automate optimization pipeline
   - Use responsive images always
   - Implement lazy loading by default

3. **Code Quality**
   - Regular dependency updates
   - Tree-shaking enabled
   - Dead code elimination

4. **Monitoring Culture**
   - Weekly performance reviews
   - Share metrics with team
   - Celebrate improvements

## Integration with CI/CD

### Vercel Deployment Checks
```yaml
# vercel.json
{
  "github": {
    "enabled": true,
    "checks": {
      "lighthouse": {
        "enabled": true,
        "url": "https://www.edgeviewfinance.com.au",
        "thresholds": {
          "performance": 91,
          "accessibility": 94,
          "best-practices": 96,
          "seo": 92
        }
      }
    }
  }
}
```

## Conclusion

This protocol ensures:
- Consistent high performance (95+ mobile, 99+ desktop)
- Excellent Core Web Vitals for SEO
- Proactive issue detection
- Systematic optimization approach

**Remember:** Performance is not a one-time fix but an ongoing commitment. Regular monitoring and optimization are essential for maintaining competitive advantage in search rankings and user experience.

## Quick Reference Commands

```bash
# Most common commands for Claude Code/Cursor
npm run perf:mobile          # Quick mobile check
npm run perf:desktop         # Quick desktop check
npm run perf:test           # Full automated test
npm run perf:pre-deploy     # Pre-deployment validation

# Direct Lighthouse commands
npx lighthouse https://www.edgeviewfinance.com.au --view
npx lighthouse https://www.edgeviewfinance.com.au --form-factor=mobile --only-categories=performance,seo
```

## Contact & Support

- **Performance Issues:** Run `npm run perf:test` first
- **SEO Concerns:** Check Core Web Vitals and Search Console
- **Emergency:** Follow Emergency Response Procedures above

Last reviewed: September 2025
Next review due: December 2025