/**
 * Analytics Initialization Script
 * Initialize Google Analytics utilities after page load
 */

// Import analytics utilities (this will be bundled by Astro/Vite)
import { initAnalytics, trackFinanceEvents, callTracking, utmTracking } from '../utils/analytics.ts';

// Initialize analytics when browser is idle (better for LCP/TBT)
document.addEventListener('DOMContentLoaded', function() {
  // Defer analytics initialization to idle time to avoid blocking main thread
  const initializeAnalytics = () => {
    // Initialize core analytics features
    initAnalytics();

    // Set up automatic tracking for common interactions
    setupAutomaticTracking();
  };

  // Use requestIdleCallback for better performance, fallback to setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initializeAnalytics, { timeout: 3000 });
  } else {
    setTimeout(initializeAnalytics, 3000);
  }
});

function setupAutomaticTracking() {
  // Track external links
  document.addEventListener('click', function(event) {
    const target = event.target.closest('a');
    if (!target) return;

    const href = target.href;
    if (!href) return;

    // Track external links
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      trackFinanceEvents.externalLinkClick(href, target.textContent?.trim());
    }

    // Track phone clicks with source attribution
    if (href.startsWith('tel:')) {
      const phoneNumber = href.replace('tel:', '');
      callTracking.trackPhoneClick(phoneNumber);
      trackFinanceEvents.phoneClick(phoneNumber);
    }

    // Track email clicks
    if (href.startsWith('mailto:')) {
      trackFinanceEvents.emailClick(href.replace('mailto:', ''));
    }
  });

  // Track form submissions
  document.addEventListener('submit', function(event) {
    const form = event.target;
    if (!form.tagName || form.tagName.toLowerCase() !== 'form') return;

    const formId = form.id || form.className || 'unknown_form';
    
    // Determine form type
    let formType = 'general';
    if (formId.includes('contact')) formType = 'contact';
    else if (formId.includes('assessment')) formType = 'assessment';
    else if (formId.includes('newsletter')) formType = 'newsletter';
    else if (formId.includes('quote')) formType = 'quote';

    trackFinanceEvents.contactFormSubmitted(formType);
  });

  // Track Calendly widget interactions
  window.addEventListener('message', function(event) {
    if (event.data.type && event.data.type === 'calendly_widget_event') {
      if (event.data.event === 'widget_opened') {
        trackFinanceEvents.calendlyOpened();
      }
    }
  });

  // Track video play events (for any video elements)
  document.querySelectorAll('video').forEach(function(video) {
    video.addEventListener('play', function() {
      const videoTitle = video.title || video.getAttribute('data-title') || 'Unknown Video';
      trackFinanceEvents.videoPlay(videoTitle);
    });
  });

  // Track newsletter signups (look for common patterns)
  document.addEventListener('submit', function(event) {
    const form = event.target;
    if (form && (form.classList.contains('newsletter') || 
                 form.id.includes('newsletter') ||
                 form.querySelector('input[type="email"][placeholder*="newsletter" i]'))) {
      trackFinanceEvents.newsletterSubscribe();
    }
  });

  // Track brochure/PDF downloads
  document.addEventListener('click', function(event) {
    const target = event.target.closest('a');
    if (!target || !target.href) return;

    const href = target.href.toLowerCase();
    if (href.includes('.pdf') || 
        href.includes('brochure') || 
        href.includes('download')) {
      const brochureName = target.textContent?.trim() || target.getAttribute('download') || 'Unknown Document';
      trackFinanceEvents.brochureDownload(brochureName);
    }
  });

  // Track scroll to important sections (like testimonials)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const section = entry.target;
        
        // Track testimonial views
        if (section.classList.contains('testimonial') || 
            section.querySelector('.testimonial')) {
          const testimonialId = section.id || 'testimonial_section';
          trackFinanceEvents.testimonialViewed(testimonialId);
        }

        // Track service section views
        if (section.classList.contains('service') || 
            section.querySelector('.service')) {
          const serviceName = section.querySelector('h1, h2, h3')?.textContent?.trim() || 'Unknown Service';
          trackFinanceEvents.serviceViewed(serviceName);
        }
      }
    });
  }, observerOptions);

  // Observe relevant sections
  document.querySelectorAll('.testimonial, .service, [data-track-section]').forEach(function(section) {
    sectionObserver.observe(section);
  });
}

// Export for manual usage if needed
if (typeof window !== 'undefined') {
  window.EdgeviewAnalytics = {
    track: trackFinanceEvents,
    init: initAnalytics
  };
}