# Website Monitoring & Tracking Setup Guide

This document outlines the comprehensive monitoring and tracking setup implemented for the Edgeview Finance website.

## 🎯 Overview

Three critical monitoring systems have been implemented:

1. **Sentry Error Tracking** - Real-time error monitoring with source maps
2. **Uptime Monitoring** - Automated website availability monitoring
3. **Google Search Console** - International targeting for Australia

## 🚨 1. Sentry Error Tracking

### Features Implemented

- **Client-side error tracking** with session replay
- **Server-side error monitoring** for API routes
- **Performance monitoring** with Web Vitals
- **React Error Boundaries** for graceful error handling
- **Source map uploads** for better debugging

### Configuration Files

```
sentry.client.config.js     # Client-side Sentry configuration
sentry.server.config.js     # Server-side Sentry configuration
src/components/ErrorBoundary.tsx  # React error boundary component
astro.config.mjs            # Sentry integration in Astro
```

### Environment Variables Required

```bash
# Sentry Configuration
PUBLIC_SENTRY_DSN=https://your_key@your_org.ingest.us.sentry.io/your_project_id
SENTRY_DSN=https://your_key@your_org.ingest.us.sentry.io/your_project_id
SENTRY_AUTH_TOKEN=your_auth_token_here
```

### Setup Instructions

1. **Create Sentry Project**
   - Go to [Sentry.io](https://sentry.io/)
   - Create new project for Astro/JavaScript
   - Copy the DSN from project settings

2. **Configure Environment Variables**
   - Add DSN to both `.env` and Vercel environment variables
   - Generate auth token for source map uploads

3. **Deploy and Test**
   - Deploy to Vercel
   - Test error tracking by triggering a test error
   - Verify errors appear in Sentry dashboard

### Usage

```bash
# Upload source maps after build
npm run sentry:sourcemaps

# Test error tracking
console.error('Test error for Sentry');
```

## ⏱️ 2. Uptime Monitoring

### Features Implemented

- **5-minute interval checks** (as requested)
- **Alert after 2 consecutive failures** (as requested)
- **Email notifications** via Resend API
- **Webhook alerts** support
- **Recovery notifications** when site comes back online
- **Client-side and server-side monitoring**

### Configuration Files

```
src/utils/uptime-monitor.ts           # Core monitoring utility
src/pages/api/send-uptime-alert.ts    # Email alert API endpoint
src/scripts/uptime-monitor.js         # Client-side initialization
scripts/uptime-server.js              # Server-side monitoring script
```

### Environment Variables Required

```bash
# Uptime Monitoring
UPTIME_ALERT_WEBHOOK=https://your-webhook-url.com/alerts  # Optional
EMAIL_TO=dan.peters@edgeviewfinance.com.au               # For alerts
RESEND_API_KEY=re_YOUR_API_KEY_HERE                      # For email alerts
```

### Setup Instructions

1. **Configure Email Alerts**
   - Ensure `RESEND_API_KEY` is set in environment
   - Set `EMAIL_TO` to the alert recipient email
   - Configure `EMAIL_FROM` if needed

2. **Optional: Webhook Alerts**
   - Set `UPTIME_ALERT_WEBHOOK` for Slack/Discord notifications
   - Test webhook endpoint receives POST requests

3. **Deploy and Test**
   - Deploy to Vercel
   - Run manual check: `npm run monitor:uptime:once`
   - Verify alerts work by temporarily breaking the site

### Usage

```bash
# Run continuous monitoring (server)
npm run monitor:uptime

# Run single check
npm run monitor:uptime:once

# View monitoring dashboard (client-side)
# Access the MonitoringDashboard component
```

### Monitoring Schedule

- **Check Interval**: Every 5 minutes
- **Alert Threshold**: 2 consecutive failures
- **Recovery Notification**: When site comes back online
- **Data Retention**: Last 100 checks in localStorage

## 🌍 3. Google Search Console International Targeting

### Features Implemented

- **hreflang tags** for Australian English (`en-au`)
- **Geographic meta tags** for Australia
- **Open Graph localization** (`og:locale="en_AU"`)
- **Canonical URLs** for SEO
- **Sitemap submission** automation
- **International targeting guidance**

### Configuration Files

```
scripts/google-search-console-setup.js  # GSC automation script
src/layout/Layout.astro                  # hreflang and geo tags
```

### Environment Variables Required

```bash
# Google Search Console API
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=/path/to/service-account-key.json
```

### Setup Instructions

1. **Google Cloud Console Setup**
   - Create Google Cloud project
   - Enable Search Console API
   - Create service account with Search Console permissions
   - Download service account key file

2. **Search Console Verification**
   - Verify website ownership in Google Search Console
   - Add service account email as a user with "Full" permissions

3. **Configure International Targeting**
   ```bash
   # Run the setup script
   npm run monitor:gsc
   ```

4. **Manual Configuration**
   - Go to Google Search Console
   - Navigate to: Legacy tools → International Targeting
   - Set target country to "Australia"

### Implementation Details

#### hreflang Tags
```html
<!-- Implemented in Layout.astro -->
<link rel="alternate" hreflang="en-au" href={Astro.url.href} />
<link rel="alternate" hreflang="en" href={Astro.url.href} />
<link rel="alternate" hreflang="x-default" href={Astro.url.href} />
```

#### Geographic Targeting
```html
<!-- Geographic meta tags -->
<meta name="geo.region" content="AU" />
<meta name="geo.country" content="Australia" />
<meta name="geo.placename" content="Australia" />
```

#### Open Graph Localization
```html
<!-- Localized Open Graph -->
<meta property="og:locale" content="en_AU" />
```

### Usage

```bash
# Run Google Search Console setup
npm run monitor:gsc

# Check sitemap status
# Script will show submission status and indexing statistics
```

## 🎛️ 4. Monitoring Dashboard

### Features

- **Real-time uptime statistics**
- **Response time monitoring**
- **Error log visualization**
- **Quick access to monitoring tools**
- **Status indicators**

### Usage

```tsx
import MonitoringDashboard from '../components/MonitoringDashboard';

// Add to any page for monitoring overview
<MonitoringDashboard />
```

## 🔧 Installation & Deployment

### 1. Install Dependencies

```bash
# Core monitoring packages
npm install @sentry/astro @sentry/node

# Development tools
npm install --save-dev @sentry/cli node-fetch
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
# Edit .env with your actual values
```

### 3. Deploy to Vercel

Ensure all environment variables are set in Vercel:

```bash
# Deploy using the standard process
npm run build
# Deploy via GitHub integration or Vercel CLI
```

### 4. Verify Setup

```bash
# Test uptime monitoring
npm run monitor:uptime:once

# Test Google Search Console
npm run monitor:gsc

# Check Sentry configuration
# Deploy and trigger a test error
```

## 📊 Monitoring Schedule

### Automated Monitoring

- **Uptime Checks**: Every 5 minutes (24/7)
- **Error Tracking**: Real-time (24/7)
- **Performance Monitoring**: Continuous (Sentry)
- **Search Console**: Daily sitemap checks

### Manual Monitoring

- **Weekly**: Review Sentry error trends
- **Monthly**: Check Search Console performance
- **Quarterly**: Review monitoring configuration

## 🚨 Alert Configuration

### Uptime Alerts

- **Trigger**: 2 consecutive failures (10 minutes downtime)
- **Email**: Sent to `EMAIL_TO` address
- **Webhook**: Optional Slack/Discord integration
- **Recovery**: Notification when site recovers

### Error Alerts

- **Critical Errors**: Immediate Sentry notification
- **Performance Issues**: Sentry performance monitoring
- **Custom Alerts**: Configure in Sentry dashboard

### Search Console Alerts

- **Indexing Issues**: Monitor via GSC dashboard
- **Search Performance**: Weekly GSC reports
- **Crawl Errors**: GSC automatic notifications

## 🎯 Performance Targets

### Uptime
- **Target**: 99.9% uptime
- **Alert Threshold**: 2 consecutive failures
- **Recovery Time**: Under 15 minutes

### Response Time
- **Target**: Under 500ms average
- **Warning**: Over 1000ms
- **Critical**: Over 2000ms

### Error Rate
- **Target**: Under 0.1% error rate
- **Warning**: Over 1% error rate
- **Critical**: Over 5% error rate

## 🔍 Troubleshooting

### Sentry Issues

1. **No errors appearing**: Check DSN configuration
2. **Source maps not working**: Verify auth token and upload process
3. **Performance data missing**: Ensure performance monitoring is enabled

### Uptime Monitoring Issues

1. **No alerts received**: Check email configuration and RESEND_API_KEY
2. **False positives**: Adjust timeout settings in monitor configuration
3. **Webhook not working**: Verify webhook URL and test endpoint

### Google Search Console Issues

1. **API errors**: Verify service account permissions
2. **Site not verified**: Complete verification in GSC dashboard
3. **Indexing issues**: Check robots.txt and sitemap.xml

## 📝 Maintenance

### Weekly Tasks
- Review error logs in Sentry
- Check uptime statistics
- Monitor search performance in GSC

### Monthly Tasks
- Update monitoring configurations
- Review alert thresholds
- Audit monitoring tool performance

### Quarterly Tasks
- Review and update documentation
- Test all alert mechanisms
- Optimize monitoring configurations

## 🔐 Security Considerations

- **API Keys**: Store securely in environment variables
- **Service Accounts**: Use least-privilege permissions
- **Webhook Security**: Validate webhook signatures if possible
- **Data Privacy**: Ensure monitoring complies with privacy requirements

## 📞 Support

For issues with monitoring setup:

1. Check this documentation first
2. Review environment variable configuration
3. Test individual components (Sentry, uptime, GSC)
4. Verify Vercel deployment environment variables
5. Check service status for third-party tools

---

**Last Updated**: September 16, 2025
**Version**: 1.0.0
**Author**: Claude Code (Astro/Vercel Specialist)