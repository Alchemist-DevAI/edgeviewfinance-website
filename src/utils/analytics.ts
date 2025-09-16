/**
 * Analytics Utility Functions
 * Enhanced tracking for Edgeview Finance website
 * Includes GA4, Microsoft Clarity, UTM tracking, and call tracking
 */

// Type definitions for GA4 events
interface GAEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean>;
}

interface GAEcommerceItem {
  item_id: string;
  item_name: string;
  category?: string;
  quantity?: number;
  price?: number;
}

interface GAEcommerce {
  transaction_id: string;
  value: number;
  currency?: string;
  items: GAEcommerceItem[];
}

// UTM Parameter interface
interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
}

// Call tracking configuration
interface CallTrackingConfig {
  default: string;
  sources: {
    [key: string]: string;
  };
}

// Check if Google Analytics is available
const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Check if Microsoft Clarity is available
const isClarityAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.clarity === 'function';
};

// UTM Parameter Tracking
export const utmTracking = {
  // Extract UTM parameters from URL
  getUTMParameters(): UTMParameters {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      gclid: urlParams.get('gclid') || undefined,
      fbclid: urlParams.get('fbclid') || undefined,
    };
  },

  // Store UTM parameters in sessionStorage for attribution
  storeUTMParameters(): void {
    if (typeof window === 'undefined') return;

    const utmParams = this.getUTMParameters();
    const hasUTMParams = Object.values(utmParams).some(value => value !== undefined);

    if (hasUTMParams) {
      sessionStorage.setItem('utm_attribution', JSON.stringify(utmParams));
      sessionStorage.setItem('utm_timestamp', Date.now().toString());
    }
  },

  // Get stored UTM parameters for attribution
  getStoredUTMParameters(): UTMParameters | null {
    if (typeof window === 'undefined') return null;

    const storedUTM = sessionStorage.getItem('utm_attribution');
    return storedUTM ? JSON.parse(storedUTM) : null;
  },

  // Get traffic source based on referrer and UTM
  getTrafficSource(): string {
    if (typeof window === 'undefined') return 'direct';

    const utmParams = this.getStoredUTMParameters() || this.getUTMParameters();

    // Check UTM source first
    if (utmParams.utm_source) {
      return utmParams.utm_source.toLowerCase();
    }

    // Check Google Ads
    if (utmParams.gclid) {
      return 'google_ads';
    }

    // Check Facebook Ads
    if (utmParams.fbclid) {
      return 'facebook_ads';
    }

    // Check referrer
    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('google')) return 'google_organic';
    if (referrer.includes('facebook')) return 'facebook_organic';
    if (referrer.includes('linkedin')) return 'linkedin';
    if (referrer.includes('twitter') || referrer.includes('t.co')) return 'twitter';
    if (referrer.includes('youtube')) return 'youtube';
    if (referrer.includes('bing')) return 'bing';
    if (referrer && !referrer.includes(window.location.hostname)) return 'referral';

    return 'direct';
  }
};

// Call Tracking Configuration
const callTrackingConfig: CallTrackingConfig = {
  default: '1300 280 895', // Default phone number
  sources: {
    'google_ads': '1300 280 895', // Same number for now - can be updated with tracking numbers later
    'facebook_ads': '1300 280 895', // Same number for now - can be updated with tracking numbers later
    'google_organic': '1300 280 895', // Same number for now - can be updated with tracking numbers later
    'referral': '1300 280 895', // Same number for now - can be updated with tracking numbers later
  }
};

// Call Tracking Functions
export const callTracking = {
  // Get appropriate phone number based on traffic source
  getTrackingNumber(): string {
    const source = utmTracking.getTrafficSource();
    return callTrackingConfig.sources[source] || callTrackingConfig.default;
  },

  // Update all phone numbers on the page
  updatePhoneNumbers(): void {
    if (typeof window === 'undefined') return;

    const trackingNumber = this.getTrackingNumber();
    const source = utmTracking.getTrafficSource();

    // Update all phone number elements
    document.querySelectorAll('[data-phone="dynamic"]').forEach((element) => {
      if (element instanceof HTMLElement) {
        element.textContent = trackingNumber;
      }
      if (element instanceof HTMLAnchorElement && element.href.startsWith('tel:')) {
        element.href = `tel:${trackingNumber.replace(/[^\d]/g, '')}`;
      }
    });

    // Track the phone number assignment
    if (isGAAvailable()) {
      trackEvent('phone_number_assigned', {
        event_category: 'call_tracking',
        event_label: source,
        custom_parameters: {
          tracking_number: trackingNumber,
          traffic_source: source
        }
      });
    }
  },

  // Track phone click with source attribution
  trackPhoneClick(phoneNumber: string): void {
    const source = utmTracking.getTrafficSource();
    const utmParams = utmTracking.getStoredUTMParameters();

    if (isGAAvailable()) {
      trackEvent('phone_click_with_source', {
        event_category: 'lead_generation',
        event_label: 'phone_click',
        custom_parameters: {
          phone_number: phoneNumber,
          traffic_source: source,
          utm_source: utmParams?.utm_source,
          utm_medium: utmParams?.utm_medium,
          utm_campaign: utmParams?.utm_campaign
        }
      });
    }

    // Track in Clarity if available
    if (isClarityAvailable()) {
      window.clarity('event', 'phone_click', {
        phone_number: phoneNumber,
        traffic_source: source
      });
    }
  }
};

// Generic event tracking
export const trackEvent = (
  eventName: string,
  parameters: GAEvent = {}
): void => {
  if (!isGAAvailable()) {
    console.warn('[Analytics] GA4 not available');
    return;
  }

  window.gtag('event', eventName, {
    event_category: parameters.event_category || 'general',
    event_label: parameters.event_label,
    value: parameters.value,
    ...parameters.custom_parameters
  });
};

// Page view tracking (for SPA navigation)
export const trackPageView = (
  page_title?: string,
  page_location?: string
): void => {
  if (!isGAAvailable()) return;

  window.gtag('config', window.GA_MEASUREMENT_ID || import.meta.env.PUBLIC_GA4_MEASUREMENT_ID, {
    page_title: page_title || document.title,
    page_location: page_location || window.location.href,
  });
};

// Finance-specific tracking functions
export const trackFinanceEvents = {
  // Assessment form interactions
  assessmentStarted: () => trackEvent('assessment_started', {
    event_category: 'finance_assessment',
    event_label: 'form_started'
  }),

  assessmentCompleted: (score?: number) => trackEvent('assessment_completed', {
    event_category: 'finance_assessment',
    event_label: 'form_completed',
    value: score
  }),

  // Contact form interactions
  contactFormSubmitted: (formType: string) => trackEvent('contact_form_submit', {
    event_category: 'lead_generation',
    event_label: formType,
    custom_parameters: { form_type: formType }
  }),

  // Calendly booking interactions
  calendlyOpened: () => trackEvent('calendly_widget_opened', {
    event_category: 'appointment_booking',
    event_label: 'widget_opened'
  }),

  // Service page interactions
  serviceViewed: (serviceName: string) => trackEvent('service_page_view', {
    event_category: 'service_interest',
    event_label: serviceName,
    custom_parameters: { service_name: serviceName }
  }),

  // Download tracking
  brochureDownload: (brochureName: string) => trackEvent('brochure_download', {
    event_category: 'content_download',
    event_label: brochureName,
    custom_parameters: { content_type: 'brochure' }
  }),

  // Phone call tracking
  phoneClick: (phoneNumber: string) => trackEvent('phone_click', {
    event_category: 'lead_generation',
    event_label: 'phone_click',
    custom_parameters: { phone_number: phoneNumber }
  }),

  // Email click tracking
  emailClick: (emailAddress: string) => trackEvent('email_click', {
    event_category: 'lead_generation',
    event_label: 'email_click',
    custom_parameters: { email_address: emailAddress }
  }),

  // External link tracking
  externalLinkClick: (url: string, linkText?: string) => trackEvent('external_link_click', {
    event_category: 'outbound_link',
    event_label: linkText || url,
    custom_parameters: { 
      destination_url: url,
      link_text: linkText 
    }
  }),

  // Video interactions
  videoPlay: (videoTitle: string) => trackEvent('video_play', {
    event_category: 'video_engagement',
    event_label: videoTitle,
    custom_parameters: { video_title: videoTitle }
  }),

  // Testimonial interactions
  testimonialViewed: (testimonialId: string) => trackEvent('testimonial_viewed', {
    event_category: 'social_proof',
    event_label: testimonialId,
    custom_parameters: { testimonial_id: testimonialId }
  }),

  // Newsletter subscription
  newsletterSubscribe: () => trackEvent('newsletter_subscribe', {
    event_category: 'lead_generation',
    event_label: 'newsletter_signup'
  })
};

// Enhanced scroll tracking for engagement
export const initScrollTracking = (): void => {
  if (!isGAAvailable()) return;

  let scrollPoints = [25, 50, 75, 100]; // Updated to include 100%
  let scrollTracked: number[] = [];

  const trackScroll = () => {
    const scrollPercent = Math.round(
      ((document.documentElement.scrollTop + document.body.scrollTop) /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
        100
    );

    scrollPoints.forEach(point => {
      if (scrollPercent >= point && !scrollTracked.includes(point)) {
        scrollTracked.push(point);

        const utmParams = utmTracking.getStoredUTMParameters();

        trackEvent('scroll_depth', {
          event_category: 'engagement',
          event_label: `${point}%`,
          value: point,
          custom_parameters: {
            traffic_source: utmTracking.getTrafficSource(),
            utm_source: utmParams?.utm_source,
            utm_campaign: utmParams?.utm_campaign
          }
        });

        // Track in Clarity if available
        if (isClarityAvailable()) {
          window.clarity('event', 'scroll_depth', {
            percentage: point,
            traffic_source: utmTracking.getTrafficSource()
          });
        }
      }
    });
  };

  // Throttled scroll listener
  let scrollTimeout: number;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(trackScroll, 100);
  });
};

// Error tracking
export const trackError = (
  errorMessage: string,
  errorStack?: string,
  fatal: boolean = false
): void => {
  if (!isGAAvailable()) return;

  window.gtag('event', 'exception', {
    description: errorMessage,
    fatal: fatal,
    custom_parameters: {
      error_stack: errorStack?.substring(0, 500) // Limit stack trace length
    }
  });
};

// Performance tracking
export const trackPerformance = (): void => {
  if (!isGAAvailable() || typeof PerformanceObserver === 'undefined') return;

  // Track Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        trackEvent('web_vitals_lcp', {
          event_category: 'performance',
          value: Math.round(entry.startTime)
        });
      }
      
      if (entry.entryType === 'first-input') {
        trackEvent('web_vitals_fid', {
          event_category: 'performance',
          value: Math.round(entry.processingStart - entry.startTime)
        });
      }
      
      if (entry.entryType === 'layout-shift') {
        trackEvent('web_vitals_cls', {
          event_category: 'performance',
          value: Math.round(entry.value * 1000)
        });
      }
    }
  });

  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
};

// Initialize analytics utilities
export const initAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  // Store UTM parameters on page load
  utmTracking.storeUTMParameters();

  // Initialize call tracking
  callTracking.updatePhoneNumbers();

  // Initialize scroll tracking
  initScrollTracking();

  // Initialize performance tracking
  trackPerformance();

  // Track initial page load with attribution
  window.addEventListener('load', () => {
    const utmParams = utmTracking.getStoredUTMParameters();

    trackEvent('page_load_complete', {
      event_category: 'performance',
      value: Math.round(performance.now()),
      custom_parameters: {
        traffic_source: utmTracking.getTrafficSource(),
        utm_source: utmParams?.utm_source,
        utm_medium: utmParams?.utm_medium,
        utm_campaign: utmParams?.utm_campaign
      }
    });

    // Track page view with attribution in Clarity
    if (isClarityAvailable()) {
      window.clarity('set', 'traffic_source', utmTracking.getTrafficSource());
      if (utmParams?.utm_campaign) {
        window.clarity('set', 'utm_campaign', utmParams.utm_campaign);
      }
    }
  });
};

// Export types for use in components
export type { GAEvent, GAEcommerceItem, GAEcommerce, UTMParameters, CallTrackingConfig };