# Analytics Implementation - Edgeview Finance Website

## Overview

This document outlines the comprehensive analytics implementation for the Edgeview Finance website, including tracking for conversions, user behavior, and attribution.

## Implemented Features

### 1. Microsoft Clarity Integration
- **Status**: ✅ Implemented
- **Project ID**: `tbgyvsfiaq`
- **Features**:
  - Heatmaps and session recordings
  - User behavior analytics
  - Custom event tracking
  - Traffic source segmentation

**Files**:
- `/src/components/analytics/MicrosoftClarity.astro`
- Added to `/src/layout/Layout.astro`

### 2. Call Tracking by Source
- **Status**: ✅ Implemented
- **Features**:
  - Dynamic phone number display based on traffic source
  - Source attribution tracking
  - Phone click tracking with UTM parameters

**Phone Numbers**:
- Default: `(07) 3102 2154`
- Google Ads: `(07) 3102 2155`
- Facebook Ads: `(07) 3102 2156`
- Google Organic: `(07) 3102 2157`
- Referral: `(07) 3102 2158`

**Implementation**:
```typescript
// Update phone numbers based on traffic source
callTracking.updatePhoneNumbers();

// Track phone clicks with attribution
callTracking.trackPhoneClick(phoneNumber);
```

### 3. UTM Parameter Tracking
- **Status**: ✅ Implemented
- **Features**:
  - Automatic UTM parameter capture
  - SessionStorage persistence for attribution
  - Traffic source classification
  - GA4 and Clarity integration

**Supported Parameters**:
- `utm_source`, `utm_medium`, `utm_campaign`
- `utm_term`, `utm_content`
- `gclid` (Google Ads), `fbclid` (Facebook Ads)

**Usage**:
```typescript
// Store UTM parameters on page load
utmTracking.storeUTMParameters();

// Get traffic source
const source = utmTracking.getTrafficSource();

// Get stored UTM parameters
const params = utmTracking.getStoredUTMParameters();
```

### 4. Enhanced Scroll Depth Tracking
- **Status**: ✅ Implemented
- **Milestones**: 25%, 50%, 75%, 100%
- **Features**:
  - GA4 event tracking
  - Microsoft Clarity event tracking
  - UTM attribution included
  - Performance optimized with throttling

## File Structure

```
src/
├── components/analytics/
│   ├── MicrosoftClarity.astro      # Clarity integration
│   └── DynamicPhone.astro          # Dynamic phone component
├── utils/
│   └── analytics.ts                # Core analytics utilities
├── scripts/
│   └── analytics-init.js           # Analytics initialization
└── types/
    └── analytics.d.ts              # TypeScript declarations
```

## Core Analytics Functions

### UTM Tracking
```typescript
utmTracking.getUTMParameters()       // Extract current URL parameters
utmTracking.storeUTMParameters()     // Store in sessionStorage
utmTracking.getStoredUTMParameters() // Retrieve stored parameters
utmTracking.getTrafficSource()       // Classify traffic source
```

### Call Tracking
```typescript
callTracking.getTrackingNumber()     // Get appropriate phone number
callTracking.updatePhoneNumbers()    // Update DOM elements
callTracking.trackPhoneClick()       // Track phone clicks with attribution
```

### Enhanced Events
All existing `trackFinanceEvents` functions now include:
- Traffic source attribution
- UTM parameter data
- Microsoft Clarity event mirroring

## Environment Variables

Add these to your environment configuration:

```env
# Microsoft Clarity
PUBLIC_CLARITY_PROJECT_ID=tbgyvsfiaq
PUBLIC_CLARITY_ENABLED=true

# Google Analytics (existing)
PUBLIC_GA4_MEASUREMENT_ID=your-ga4-id
```

## HTML Implementation

### Dynamic Phone Numbers
To enable dynamic phone number tracking, update HTML elements:

```html
<!-- Before -->
<a href="tel:0731022154">(07) 3102 2154</a>

<!-- After -->
<span data-phone="dynamic">(07) 3102 2154</span>
<a href="tel:0731022154" data-phone="dynamic">(07) 3102 2154</a>
```

### Custom Event Tracking
Track custom events with full attribution:

```javascript
// Phone clicks
callTracking.trackPhoneClick(phoneNumber);

// Form submissions with attribution
trackEvent('form_submit', {
  event_category: 'lead_generation',
  custom_parameters: {
    traffic_source: utmTracking.getTrafficSource(),
    utm_campaign: utmParams?.utm_campaign
  }
});
```

## Analytics Data Flow

1. **Page Load**: UTM parameters captured and stored
2. **Traffic Source**: Classified based on UTM/referrer
3. **Phone Numbers**: Updated dynamically based on source
4. **User Actions**: Tracked with full attribution chain
5. **GA4 Events**: Include traffic source and UTM data
6. **Clarity Events**: Mirror important conversions

## Performance Optimization

- **Throttled Scroll Tracking**: 100ms throttle to prevent performance impact
- **Conditional Loading**: Clarity only loads in production
- **Lazy Initialization**: Analytics initialize after DOM ready
- **Minimal Payload**: Only essential data sent to tracking services

## Testing

### Local Testing
```bash
# Build and test
npm run build:fast
npm run dev

# Test UTM tracking
http://localhost:4002/?utm_source=google&utm_campaign=test

# Check console for analytics events
# Verify phone numbers update based on source
```

### Verification Checklist
- [ ] Microsoft Clarity dashboard shows data
- [ ] GA4 events include traffic source parameters
- [ ] Phone numbers change based on UTM parameters
- [ ] Scroll depth events fire at correct percentages
- [ ] Form submissions include attribution data

## Troubleshooting

### Common Issues

1. **Clarity not loading**: Check `PUBLIC_CLARITY_ENABLED` environment variable
2. **Phone numbers not updating**: Verify `data-phone="dynamic"` attribute
3. **UTM not persisting**: Check sessionStorage in browser dev tools
4. **Events not firing**: Verify GA4 measurement ID is correct

### Debug Tools
```javascript
// Access analytics utilities in browser console
window.EdgeviewAnalytics.track.phoneClick('1234567890');

// Check stored UTM data
sessionStorage.getItem('utm_attribution');

// Verify traffic source classification
utmTracking.getTrafficSource();
```

## Future Enhancements

### Potential Additions
- [ ] Heat map click tracking for specific CTAs
- [ ] Form field analytics (time spent, drop-off points)
- [ ] Cross-device attribution
- [ ] Advanced funnel analysis
- [ ] Real-time conversion notifications

### Analytics Platform Integration
- [ ] Google Tag Manager integration
- [ ] Facebook Pixel enhancement
- [ ] LinkedIn Insight Tag
- [ ] Microsoft Advertising UET

## Compliance & Privacy

### Data Collection
- All tracking respects user privacy preferences
- No personally identifiable information is collected
- Session-based attribution only
- Compliant with Australian privacy laws

### User Consent
- Analytics respect browser Do Not Track settings
- Consider implementing cookie consent banner
- Provide opt-out mechanisms where required

## Support

For technical support or questions about this implementation:
- Review analytics console for debugging information
- Check browser network tab for failed requests
- Verify environment variables are properly set
- Test with browser developer tools console

---

**Implementation Date**: 2025-01-16
**Last Updated**: 2025-01-16
**Version**: 1.0.0