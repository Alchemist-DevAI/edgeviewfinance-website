const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://www.edgeviewfinance.com.au';
const THRESHOLDS = {
  performance: {
    mobile: parseInt(process.env.PERF_THRESHOLD_MOBILE) || 91,
    desktop: parseInt(process.env.PERF_THRESHOLD_DESKTOP) || 99
  },
  accessibility: parseInt(process.env.PERF_THRESHOLD_A11Y) || 94,
  'best-practices': parseInt(process.env.PERF_THRESHOLD_BP) || 96,
  seo: parseInt(process.env.PERF_THRESHOLD_SEO) || 92
};

// Core Web Vitals thresholds (in milliseconds)
const WEB_VITALS_THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TBT: { good: 200, poor: 600 },
  CLS: { good: 0.1, poor: 0.25 },
  SI: { good: 3400, poor: 5800 }
};

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function getVitalStatus(metric, value) {
  const threshold = WEB_VITALS_THRESHOLDS[metric];
  if (!threshold) return '❓';

  if (metric === 'CLS') {
    if (value <= threshold.good) return '✅';
    if (value <= threshold.poor) return '⚠️';
    return '❌';
  }

  if (value <= threshold.good) return '✅';
  if (value <= threshold.poor) return '⚠️';
  return '❌';
}

function formatTime(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

async function runPerformanceTest(options = {}) {
  const timestamp = new Date().toISOString().split('T')[0];
  const reportDir = path.join(__dirname, 'performance-reports');
  const isStrict = options.strict || process.argv.includes('--strict');

  // Ensure report directory exists
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  console.log(`${colors.bright}${colors.blue}🚀 Edgeview Finance Performance Testing${colors.reset}`);
  console.log(`${colors.bright}URL: ${SITE_URL}${colors.reset}`);
  console.log(`Mode: ${isStrict ? 'STRICT (Pre-deployment)' : 'Standard'}\n`);

  // Test configurations
  const tests = [
    { name: 'Mobile', formFactor: 'mobile' },
    { name: 'Desktop', formFactor: 'desktop' }
  ];

  const results = [];
  let hasFailures = false;

  for (const test of tests) {
    console.log(`${colors.bright}${colors.blue}📱 Testing ${test.name}...${colors.reset}`);

    const outputPath = path.join(reportDir, `${timestamp}-${test.formFactor}.json`);
    const htmlPath = path.join(reportDir, `${timestamp}-${test.formFactor}.html`);

    try {
      // Run Lighthouse with both JSON and HTML output
      const command = `npx lighthouse ${SITE_URL} \
        --output=json \
        --output=html \
        --output-path=${outputPath.replace('.json', '')} \
        --form-factor=${test.formFactor} \
        --quiet \
        --chrome-flags="--headless --no-sandbox"`;

      execSync(command, { stdio: 'pipe' });

      // Read and parse results
      const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));

      // Extract scores
      const scores = {
        performance: Math.round(report.categories.performance.score * 100),
        accessibility: Math.round(report.categories.accessibility.score * 100),
        'best-practices': Math.round(report.categories['best-practices'].score * 100),
        seo: Math.round(report.categories.seo.score * 100)
      };

      // Extract Core Web Vitals
      const metrics = {
        FCP: report.audits['first-contentful-paint'].numericValue,
        LCP: report.audits['largest-contentful-paint'].numericValue,
        TBT: report.audits['total-blocking-time'].numericValue,
        CLS: report.audits['cumulative-layout-shift'].numericValue,
        SI: report.audits['speed-index'].numericValue
      };

      // Extract opportunities
      const opportunities = [];
      for (const [key, audit] of Object.entries(report.audits)) {
        if (audit.details && audit.details.type === 'opportunity' && audit.numericValue > 0) {
          opportunities.push({
            title: audit.title,
            savings: formatTime(audit.numericValue)
          });
        }
      }

      results.push({
        test: test.name,
        scores,
        metrics,
        opportunities,
        timestamp: new Date().toISOString(),
        url: SITE_URL
      });

      // Display results
      console.log(`\n${colors.bright}✅ ${test.name} Results:${colors.reset}`);

      // Scores with threshold checking
      const perfScore = scores.performance;
      const perfThreshold = THRESHOLDS.performance[test.formFactor];
      const perfColor = perfScore >= perfThreshold ? colors.green : colors.red;

      console.log(`   Performance: ${perfColor}${perfScore}/100${colors.reset} (threshold: ${perfThreshold})`);
      console.log(`   Accessibility: ${scores.accessibility >= THRESHOLDS.accessibility ? colors.green : colors.yellow}${scores.accessibility}/100${colors.reset}`);
      console.log(`   Best Practices: ${scores['best-practices'] >= THRESHOLDS['best-practices'] ? colors.green : colors.yellow}${scores['best-practices']}/100${colors.reset}`);
      console.log(`   SEO: ${scores.seo >= THRESHOLDS.seo ? colors.green : colors.yellow}${scores.seo}/100${colors.reset}`);

      // Core Web Vitals
      console.log(`\n   ${colors.bright}Core Web Vitals:${colors.reset}`);
      console.log(`   FCP: ${formatTime(metrics.FCP)} ${getVitalStatus('FCP', metrics.FCP)}`);
      console.log(`   LCP: ${formatTime(metrics.LCP)} ${getVitalStatus('LCP', metrics.LCP)}`);
      console.log(`   TBT: ${formatTime(metrics.TBT)} ${getVitalStatus('TBT', metrics.TBT)}`);
      console.log(`   CLS: ${metrics.CLS.toFixed(3)} ${getVitalStatus('CLS', metrics.CLS)}`);
      console.log(`   SI:  ${formatTime(metrics.SI)} ${getVitalStatus('SI', metrics.SI)}`);

      // Show top opportunities
      if (opportunities.length > 0) {
        console.log(`\n   ${colors.bright}Top Optimization Opportunities:${colors.reset}`);
        opportunities.slice(0, 3).forEach(opp => {
          console.log(`   • ${opp.title}: ${colors.yellow}${opp.savings}${colors.reset}`);
        });
      }

      // Check for failures
      if (perfScore < perfThreshold) {
        console.log(`\n${colors.red}⚠️  WARNING: ${test.name} performance below threshold!${colors.reset}`);
        hasFailures = true;
      }

      // Check Core Web Vitals
      if (metrics.LCP > WEB_VITALS_THRESHOLDS.LCP.good) {
        console.log(`${colors.yellow}⚠️  LCP needs improvement for SEO${colors.reset}`);
      }
      if (metrics.CLS > WEB_VITALS_THRESHOLDS.CLS.good) {
        console.log(`${colors.yellow}⚠️  CLS needs improvement for SEO${colors.reset}`);
      }

    } catch (error) {
      console.error(`${colors.red}❌ Error testing ${test.name}:${colors.reset}`, error.message);
      hasFailures = true;
    }

    console.log('\n' + '─'.repeat(60) + '\n');
  }

  // Save summary report
  const summaryPath = path.join(reportDir, `${timestamp}-summary.json`);
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

  // Generate markdown report
  generateMarkdownReport(results, reportDir, timestamp);

  console.log(`${colors.bright}${colors.green}📊 Reports saved to: ${reportDir}${colors.reset}`);
  console.log(`   • JSON reports: ${timestamp}-*.json`);
  console.log(`   • HTML reports: ${timestamp}-*.html`);
  console.log(`   • Summary: ${timestamp}-summary.json`);
  console.log(`   • Markdown: ${timestamp}-report.md\n`);

  // Exit with error code if strict mode and failures
  if (isStrict && hasFailures) {
    console.log(`${colors.red}${colors.bright}❌ DEPLOYMENT BLOCKED: Performance thresholds not met${colors.reset}`);
    process.exit(1);
  }

  return results;
}

function generateMarkdownReport(results, reportDir, timestamp) {
  let markdown = `# Performance Report - ${timestamp}\n\n`;
  markdown += `**URL:** ${SITE_URL}\n`;
  markdown += `**Date:** ${new Date().toLocaleString()}\n\n`;

  markdown += `## Summary\n\n`;
  markdown += `| Platform | Performance | Accessibility | Best Practices | SEO |\n`;
  markdown += `|----------|------------|---------------|----------------|-----|\n`;

  results.forEach(result => {
    const p = result.scores.performance;
    const a = result.scores.accessibility;
    const bp = result.scores['best-practices'];
    const s = result.scores.seo;

    markdown += `| ${result.test} | ${p >= THRESHOLDS.performance[result.test.toLowerCase()] ? '✅' : '❌'} ${p}/100 | `;
    markdown += `${a >= THRESHOLDS.accessibility ? '✅' : '⚠️'} ${a}/100 | `;
    markdown += `${bp >= THRESHOLDS['best-practices'] ? '✅' : '⚠️'} ${bp}/100 | `;
    markdown += `${s >= THRESHOLDS.seo ? '✅' : '⚠️'} ${s}/100 |\n`;
  });

  markdown += `\n## Core Web Vitals\n\n`;
  markdown += `| Platform | FCP | LCP | TBT | CLS | SI |\n`;
  markdown += `|----------|-----|-----|-----|-----|----||\n`;

  results.forEach(result => {
    const m = result.metrics;
    markdown += `| ${result.test} | `;
    markdown += `${getVitalStatus('FCP', m.FCP)} ${formatTime(m.FCP)} | `;
    markdown += `${getVitalStatus('LCP', m.LCP)} ${formatTime(m.LCP)} | `;
    markdown += `${getVitalStatus('TBT', m.TBT)} ${formatTime(m.TBT)} | `;
    markdown += `${getVitalStatus('CLS', m.CLS)} ${m.CLS.toFixed(3)} | `;
    markdown += `${getVitalStatus('SI', m.SI)} ${formatTime(m.SI)} |\n`;
  });

  markdown += `\n## Optimization Opportunities\n\n`;
  results.forEach(result => {
    if (result.opportunities && result.opportunities.length > 0) {
      markdown += `### ${result.test}\n\n`;
      result.opportunities.forEach((opp, index) => {
        markdown += `${index + 1}. ${opp.title} - Potential savings: ${opp.savings}\n`;
      });
      markdown += '\n';
    }
  });

  markdown += `## Thresholds\n\n`;
  markdown += `- Mobile Performance: ${THRESHOLDS.performance.mobile}+\n`;
  markdown += `- Desktop Performance: ${THRESHOLDS.performance.desktop}+\n`;
  markdown += `- Accessibility: ${THRESHOLDS.accessibility}+\n`;
  markdown += `- Best Practices: ${THRESHOLDS['best-practices']}+\n`;
  markdown += `- SEO: ${THRESHOLDS.seo}+\n`;

  const reportPath = path.join(reportDir, `${timestamp}-report.md`);
  fs.writeFileSync(reportPath, markdown);
}

// CLI interface
if (require.main === module) {
  console.log(`${colors.bright}${colors.blue}
╔═══════════════════════════════════════╗
║   Edgeview Finance Performance Test   ║
╚═══════════════════════════════════════╝
${colors.reset}`);

  runPerformanceTest()
    .then(() => {
      console.log(`${colors.green}✅ Performance testing complete!${colors.reset}`);
    })
    .catch(error => {
      console.error(`${colors.red}❌ Fatal error:${colors.reset}`, error);
      process.exit(1);
    });
}

module.exports = { runPerformanceTest };