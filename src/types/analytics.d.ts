/**
 * TypeScript declarations for analytics functionality
 * Includes GA4, Microsoft Clarity, and custom tracking
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    GA_MEASUREMENT_ID: string;
    clarity: (...args: any[]) => void;
    EdgeviewAnalytics: {
      track: typeof import('../utils/analytics').trackFinanceEvents;
      init: typeof import('../utils/analytics').initAnalytics;
    };
  }
}

export {};