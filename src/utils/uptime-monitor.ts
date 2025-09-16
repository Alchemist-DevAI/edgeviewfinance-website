interface UptimeCheck {
  url: string;
  status: number;
  responseTime: number;
  timestamp: string;
  isUp: boolean;
}

interface UptimeConfig {
  url: string;
  interval: number; // in milliseconds
  timeout: number; // in milliseconds
  retries: number;
  alertWebhook?: string;
  emailAlert?: string;
}

class UptimeMonitor {
  private config: UptimeConfig;
  private intervalId?: NodeJS.Timeout;
  private consecutiveFailures = 0;
  private lastStatus = true;

  constructor(config: UptimeConfig) {
    this.config = config;
  }

  async checkStatus(): Promise<UptimeCheck> {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.url, {
        signal: controller.signal,
        method: 'HEAD', // Use HEAD to reduce bandwidth
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

  async sendAlert(check: UptimeCheck): Promise<void> {
    const alertMessage = {
      type: 'downtime_alert',
      website: this.config.url,
      status: check.status,
      responseTime: check.responseTime,
      timestamp: check.timestamp,
      consecutiveFailures: this.consecutiveFailures,
      message: `Website ${this.config.url} is down. Status: ${check.status}, Response time: ${check.responseTime}ms`
    };

    // Send webhook alert
    if (this.config.alertWebhook) {
      try {
        await fetch(this.config.alertWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alertMessage)
        });
      } catch (error) {
        console.error('Failed to send webhook alert:', error);
      }
    }

    // Send email alert (if configured)
    if (this.config.emailAlert) {
      try {
        await fetch('/api/send-uptime-alert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...alertMessage,
            to: this.config.emailAlert
          })
        });
      } catch (error) {
        console.error('Failed to send email alert:', error);
      }
    }
  }

  async sendRecoveryAlert(): Promise<void> {
    const recoveryMessage = {
      type: 'recovery_alert',
      website: this.config.url,
      timestamp: new Date().toISOString(),
      downtime_duration: this.consecutiveFailures * (this.config.interval / 1000) + ' seconds',
      message: `Website ${this.config.url} is back online after ${this.consecutiveFailures} failed checks.`
    };

    if (this.config.alertWebhook) {
      try {
        await fetch(this.config.alertWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recoveryMessage)
        });
      } catch (error) {
        console.error('Failed to send recovery webhook:', error);
      }
    }
  }

  start(): void {
    if (this.intervalId) {
      this.stop();
    }

    this.intervalId = setInterval(async () => {
      const check = await this.checkStatus();

      if (!check.isUp) {
        this.consecutiveFailures++;

        // Send alert after 2 consecutive failures (as requested)
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
      console.log(`Uptime check: ${check.url} - ${check.isUp ? 'UP' : 'DOWN'} (${check.status}) - ${check.responseTime}ms`);

      // Store result (you could save to database here)
      this.storeResult(check);
    }, this.config.interval);

    console.log(`Uptime monitoring started for ${this.config.url} - checking every ${this.config.interval / 1000} seconds`);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      console.log(`Uptime monitoring stopped for ${this.config.url}`);
    }
  }

  private storeResult(check: UptimeCheck): void {
    // Store in localStorage for client-side monitoring
    if (typeof window !== 'undefined') {
      const key = 'uptime_checks';
      const stored = localStorage.getItem(key);
      const checks = stored ? JSON.parse(stored) : [];

      checks.push(check);

      // Keep only last 100 checks
      if (checks.length > 100) {
        checks.splice(0, checks.length - 100);
      }

      localStorage.setItem(key, JSON.stringify(checks));
    }
  }

  getStats(): { uptime: number; avgResponseTime: number; totalChecks: number } {
    if (typeof window === 'undefined') {
      return { uptime: 0, avgResponseTime: 0, totalChecks: 0 };
    }

    const stored = localStorage.getItem('uptime_checks');
    if (!stored) {
      return { uptime: 0, avgResponseTime: 0, totalChecks: 0 };
    }

    const checks: UptimeCheck[] = JSON.parse(stored);
    const totalChecks = checks.length;
    const upChecks = checks.filter(check => check.isUp).length;
    const uptime = totalChecks > 0 ? (upChecks / totalChecks) * 100 : 0;
    const avgResponseTime = totalChecks > 0
      ? checks.reduce((sum, check) => sum + check.responseTime, 0) / totalChecks
      : 0;

    return { uptime, avgResponseTime, totalChecks };
  }
}

export { UptimeMonitor, type UptimeCheck, type UptimeConfig };