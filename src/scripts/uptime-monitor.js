// Client-side uptime monitoring initialization
import { UptimeMonitor } from '../utils/uptime-monitor.ts';

// Initialize uptime monitoring when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Only run in production
  if (import.meta.env.MODE !== 'production') {
    return;
  }

  const config = {
    url: 'https://www.edgeviewfinance.com.au',
    interval: 5 * 60 * 1000, // 5 minutes
    timeout: 30 * 1000, // 30 seconds
    retries: 2,
    alertWebhook: import.meta.env.UPTIME_ALERT_WEBHOOK,
    emailAlert: import.meta.env.EMAIL_TO
  };

  const monitor = new UptimeMonitor(config);

  // Start monitoring
  monitor.start();

  // Stop monitoring when page unloads
  window.addEventListener('beforeunload', () => {
    monitor.stop();
  });

  // Expose monitor to global scope for debugging
  window.uptimeMonitor = monitor;

  console.log('Uptime monitoring initialized for www.edgeviewfinance.com.au');
});

// Export for use in other modules
export { UptimeMonitor };