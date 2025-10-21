#!/usr/bin/env node

/**
 * Server-side uptime monitoring script
 * Can be run independently or as a cron job
 *
 * Usage:
 * node scripts/uptime-server.js
 *
 * Environment variables required:
 * - EMAIL_TO: Email address for alerts
 * - UPTIME_ALERT_WEBHOOK: Webhook URL for alerts (optional)
 * - RESEND_API_KEY: Resend API key for email alerts (optional)
 */

import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
try {
  const envPath = join(__dirname, '..', '.env');
  const envContent = readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

  Object.assign(process.env, envVars);
} catch (error) {
  console.warn('Could not load .env file, using existing environment variables');
}

class ServerUptimeMonitor {
  constructor(config) {
    this.config = config;
    this.consecutiveFailures = 0;
    this.lastStatus = true;
  }

  async checkStatus() {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.url, {
        signal: controller.signal,
        method: 'HEAD',
        headers: {
          'User-Agent': 'EdgeviewFinance-UptimeMonitor/1.0'
        }
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      const isUp = response.ok;

      return {
        url: this.config.url,
        status: response.status,
        responseTime,
        timestamp,
        isUp
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      return {
        url: this.config.url,
        status: 0,
        responseTime,
        timestamp,
        isUp: false
      };
    }
  }

  async sendAlert(check) {
    const alertMessage = {
      type: 'downtime_alert',
      website: this.config.url,
      status: check.status,
      responseTime: check.responseTime,
      timestamp: check.timestamp,
      consecutiveFailures: this.consecutiveFailures,
      to: this.config.emailAlert,
      message: `Website ${this.config.url} is down. Status: ${check.status}, Response time: ${check.responseTime}ms`
    };

    console.error(`🚨 ALERT: Website down - ${this.config.url} (${check.status}) - ${this.consecutiveFailures} consecutive failures`);

    // Send webhook alert
    if (this.config.alertWebhook) {
      try {
        const response = await fetch(this.config.alertWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alertMessage)
        });

        if (response.ok) {
          console.log('✅ Webhook alert sent successfully');
        } else {
          console.error('❌ Failed to send webhook alert:', response.statusText);
        }
      } catch (error) {
        console.error('❌ Failed to send webhook alert:', error.message);
      }
    }

    // Send email alert via API endpoint
    if (this.config.emailAlert && this.config.apiBaseUrl) {
      try {
        const response = await fetch(`${this.config.apiBaseUrl}/api/send-uptime-alert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alertMessage)
        });

        if (response.ok) {
          console.log('✅ Email alert sent successfully');
        } else {
          console.error('❌ Failed to send email alert:', response.statusText);
        }
      } catch (error) {
        console.error('❌ Failed to send email alert:', error.message);
      }
    }
  }

  async sendRecoveryAlert() {
    const recoveryMessage = {
      type: 'recovery_alert',
      website: this.config.url,
      timestamp: new Date().toISOString(),
      downtime_duration: this.consecutiveFailures * (this.config.interval / 1000) + ' seconds',
      to: this.config.emailAlert,
      message: `Website ${this.config.url} is back online after ${this.consecutiveFailures} failed checks.`
    };

    console.log(`✅ RECOVERY: Website back online - ${this.config.url}`);

    if (this.config.alertWebhook) {
      try {
        await fetch(this.config.alertWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recoveryMessage)
        });
        console.log('✅ Recovery webhook sent successfully');
      } catch (error) {
        console.error('❌ Failed to send recovery webhook:', error.message);
      }
    }

    if (this.config.emailAlert && this.config.apiBaseUrl) {
      try {
        await fetch(`${this.config.apiBaseUrl}/api/send-uptime-alert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recoveryMessage)
        });
        console.log('✅ Recovery email sent successfully');
      } catch (error) {
        console.error('❌ Failed to send recovery email:', error.message);
      }
    }
  }

  async runCheck() {
    const check = await this.checkStatus();

    if (!check.isUp) {
      this.consecutiveFailures++;

      // Send alert after 2 consecutive failures
      if (this.consecutiveFailures === 2) {
        await this.sendAlert(check);
      }

      this.lastStatus = false;
    } else {
      // If we're recovering from downtime
      if (!this.lastStatus && this.consecutiveFailures >= 2) {
        await this.sendRecoveryAlert();
      }

      this.consecutiveFailures = 0;
      this.lastStatus = true;
    }

    // Log the check result
    const status = check.isUp ? '✅ UP' : '❌ DOWN';
    console.log(`${new Date().toISOString()} - ${check.url} - ${status} (${check.status}) - ${check.responseTime}ms`);

    return check;
  }
}

// Configuration
const config = {
  url: 'https://www.edgeviewfinance.com.au',
  interval: 5 * 60 * 1000, // 5 minutes
  timeout: 30 * 1000, // 30 seconds
  alertWebhook: process.env.UPTIME_ALERT_WEBHOOK,
  emailAlert: process.env.EMAIL_TO,
  apiBaseUrl: 'https://www.edgeviewfinance.com.au'
};

// Initialize monitor
const monitor = new ServerUptimeMonitor(config);

// Run a single check or start continuous monitoring
if (process.argv.includes('--once')) {
  // Run once and exit
  monitor.runCheck().then(() => {
    console.log('Single uptime check completed');
    process.exit(0);
  }).catch((error) => {
    console.error('Uptime check failed:', error);
    process.exit(1);
  });
} else {
  // Continuous monitoring
  console.log(`🚀 Starting uptime monitoring for ${config.url}`);
  console.log(`📊 Checking every ${config.interval / 1000} seconds`);
  console.log(`⏰ Alert after 2 consecutive failures`);
  console.log(`📧 Email alerts: ${config.emailAlert || 'Not configured'}`);
  console.log(`🪝 Webhook alerts: ${config.alertWebhook ? 'Configured' : 'Not configured'}`);
  console.log('---');

  // Run initial check
  monitor.runCheck();

  // Schedule recurring checks
  setInterval(() => {
    monitor.runCheck();
  }, config.interval);

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping uptime monitoring...');
    process.exit(0);
  });
}