/**
 * Google Analytics 4 Utility Functions
 * Enhanced tracking for Edgeview Finance website
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

// Check if Google Analytics is available
const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
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

// Scroll tracking for engagement
export const initScrollTracking = (): void => {
  if (!isGAAvailable()) return;

  let scrollPoints = [25, 50, 75, 90];
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
        trackEvent('scroll_depth', {
          event_category: 'engagement',
          event_label: `${point}%`,
          value: point
        });
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

  // Initialize scroll tracking
  initScrollTracking();
  
  // Initialize performance tracking
  trackPerformance();
  
  // Track initial page load
  window.addEventListener('load', () => {
    trackEvent('page_load_complete', {
      event_category: 'performance',
      value: Math.round(performance.now())
    });
  });
};

// Export types for use in components
export type { GAEvent, GAEcommerceItem, GAEcommerce };