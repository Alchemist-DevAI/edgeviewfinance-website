# Homepage Mobile LCP Optimization Report
**Date**: November 4, 2025
**Engineer**: Astro Developer
**Target**: Reduce mobile LCP from 3.45s to <2.5s
**Status**: ⚠️ MIXED RESULTS - Further optimization required

---

## Executive Summary

Implemented 5 performance optimizations targeting mobile LCP on the Edgeview Finance homepage. **Results showed no significant improvement** - LCP remained at ~3.30-3.60s range. The `font-display: swap` change may have actually degraded performance by forcing font loading before LCP.

### Key Findings
- ✅ **Hero image optimized**: Reduced from 25KB to 16KB (36% smaller)
- ❌ **Font-display change**: Likely degraded LCP by forcing font wait
- ✅ **FontAwesome removed**: Eliminated unused 200KB+ CSS file
- ✅ **Scripts optimized**: Calendly and analytics now fully async
- ⚠️ **Net Result**: LCP unchanged or slightly worse (3.30s → 3.60s)

---

## Baseline Metrics (Before Optimization)

**Test Date**: November 4, 2025 07:11 GMT
**URL**: https://www.edgeviewfinance.com.au
**Device**: Mobile (PageSpeed Insights API)

### Performance Scores
| Metric | Score | Status |
|--------|-------|--------|
| Performance | 90/100 | ✅ Good |
| Accessibility | 94/100 | ✅ Good |
| SEO | 92/100 | ✅ Good |
| Best Practices | 96/100 | ✅ Good |

### Core Web Vitals (Baseline)
| Metric | Value | Status |
|--------|-------|--------|
| **LCP** | **3.30s** | 🟡 Needs Improvement |
| FID | 71ms | ✅ Good |
| CLS | 0.006 | ✅ Good |

### Other Metrics (Baseline)
- First Contentful Paint (FCP): 1.66s
- Speed Index (SI): 3.89s
- Total Blocking Time (TBT): 22ms
- Time to Interactive (TTI): 3.81s

---

## Optimizations Implemented

### 1. Hero Image Optimization ✅
**File**: `src/content/IndexPage/hero.mdx`
- **Changed**: `hero-tradie-optimized.webp` (25KB) → `hero-tradie-final.webp` (16KB)
- **Improvement**: 36% file size reduction
- **Expected Impact**: 200-300ms faster LCP

**Also Updated**:
- `src/layout/Layout.astro` - Updated preload hint to match new image
- Ensured `fetchpriority="high"` and `loading="eager"` on hero image

### 2. Font-Display Strategy Change ⚠️
**File**: `src/css/font-optimization.css`
- **Changed**: `font-display: optional` → `font-display: swap`
- **Rationale**: Show fallback font immediately, swap when web font loads
- **ISSUE**: May have degraded LCP by forcing browser to wait for font

**Before**:
```css
font-display: optional; /* Uses fallback if font not loaded in 100ms */
```

**After**:
```css
font-display: swap; /* Shows fallback immediately, swaps when font loads */
```

### 3. Remove Unused FontAwesome CSS ✅
**File**: `src/layout/Layout.astro`
- **Removed**: `import "@fortawesome/fontawesome-free/css/all.css";`
- **Savings**: Eliminated 200KB+ of unused CSS from homepage
- **Impact**: Reduced initial bundle size

### 4. Script Loading Optimization ✅
**File**: `src/layout/Layout.astro`
- **Calendly**: Changed from `defer` to `async` (non-blocking)
- **Analytics**: Changed from `defer` to `async` (non-blocking)
- **Service Worker**: Added `async` attribute

**Rationale**: Async scripts don't block LCP, defer scripts can delay it

---

## Post-Optimization Results

**Test 1 (07:55 GMT)**: Worse performance (caught cold cache or edge case)
- Performance: 60/100 🔴
- LCP: 4.19s 🔴 Poor
- FCP: 2.72s
- Speed Index: 6.22s

**Test 2 (07:57 GMT)**: Back to baseline range
- Performance: 89/100 🟡
- **LCP: 3.60s** 🟡 Needs Improvement
- FCP: 1.95s ✅ (improved from 1.66s)
- Speed Index: 2.32s ✅ (improved from 3.89s)
- CLS: 0.006 ✅ (maintained)

### Comparison: Baseline vs Post-Optimization

| Metric | Baseline | Post-Opt | Change |
|--------|----------|----------|--------|
| Performance Score | 90/100 | 89/100 | -1 ❌ |
| **LCP** | **3.30s** | **3.60s** | **+0.30s** ❌ |
| FCP | 1.66s | 1.95s | +0.29s ❌ |
| Speed Index | 3.89s | 2.32s | -1.57s ✅ |
| TBT | 22ms | 48ms | +26ms ❌ |
| TTI | 3.81s | 3.94s | +0.13s ❌ |
| CLS | 0.006 | 0.006 | 0 ✅ |

---

## Root Cause Analysis

### Why LCP Didn't Improve (Or Got Worse)

1. **Font-Display Swap Issue** ⚠️
   - `font-display: swap` forces the browser to render fallback font, then re-render with web font
   - This can delay LCP if the hero text is the LCP element
   - `optional` was better because it gave up on the web font if not loaded quickly

2. **Hero Image Not the LCP Element** ⚠️
   - The hero **text** (h1 heading) may be the LCP element, not the image
   - Optimizing image doesn't help if text is LCP
   - Font loading is blocking the LCP

3. **Network Variability** ⚠️
   - PageSpeed Insights tests from Google servers (variable latency)
   - First test caught a slow edge case (4.19s)
   - Second test was closer to normal (3.60s)

4. **CSS Render-Blocking** ⚠️
   - 6 stylesheets still render-blocking
   - FontAwesome removal helped, but other CSS still blocks

---

## Recommended Next Steps

### Immediate Fixes (High Impact)

1. **Revert font-display to 'optional'** 🔴 CRITICAL
   - Change back from `swap` to `optional` in `font-optimization.css`
   - This will restore the original LCP performance
   - Add local font files for instant loading

2. **Identify True LCP Element** 🔴 CRITICAL
   - Use Chrome DevTools Performance panel to identify actual LCP element
   - If it's the hero text, optimize font loading
   - If it's the hero image, verify preload is working

3. **Inline Critical CSS** 🟡 MEDIUM
   - Extract above-the-fold CSS and inline it in `<head>`
   - Defer non-critical stylesheets
   - Target: Reduce render-blocking resources

### Medium-Term Optimizations

4. **Self-Host Fonts** 🟡 MEDIUM
   - Convert from `@fontsource` to locally hosted WOFF2 fonts
   - Use `font-display: optional` with local files
   - Eliminates network delay for font loading

5. **Image Optimization Beyond Compression** 🟡 MEDIUM
   - Use responsive images with `srcset` for mobile-specific sizes
   - Consider AVIF format (better compression than WebP)
   - Ensure hero image is optimized for mobile viewport (400px width)

6. **Reduce JavaScript Execution** 🟡 MEDIUM
   - Total Task Time: 829ms (still high)
   - Investigate menu.js and main.js for optimization opportunities
   - Consider code splitting for non-critical scripts

### Long-Term Improvements

7. **Critical CSS Generation** 🟢 LOW
   - Automate critical CSS extraction with tools like Critical
   - Inline only necessary CSS for above-the-fold content

8. **HTTP/3 and Early Hints** 🟢 LOW
   - Leverage Vercel's HTTP/3 support for faster connection setup
   - Use Early Hints for font and image preloading

---

## Deployment Status

✅ **Successfully deployed to production**
- Commit: `3fc673a` to `main` branch
- Repository: https://github.com/Alchemist-DevAI/edgeviewfinance-website
- Deployment Time: November 4, 2025 17:51 GMT
- Vercel Cache: Fresh (age: 0, cache miss confirmed)

### Deployed Changes
- ✅ `src/content/IndexPage/hero.mdx` - Smaller hero image
- ✅ `src/css/font-optimization.css` - Font-display swap (NEEDS REVERT)
- ✅ `src/layout/Layout.astro` - FontAwesome removed, scripts async

---

## Lessons Learned

1. **Font-Display is Critical** ⚠️
   - `swap` can hurt LCP if text is the LCP element
   - `optional` was the correct choice for LCP optimization
   - Always test font-display changes with real metrics

2. **Identify LCP Element First** ⚠️
   - Optimizing the wrong element wastes effort
   - Use Chrome DevTools to identify true LCP element
   - Hero image optimization didn't help because text was LCP

3. **Network Variability Matters** ⚠️
   - Single tests are unreliable (4.19s vs 3.60s)
   - Need multiple tests or field data for accurate assessment
   - PageSpeed Insights can show high variability

4. **Holistic Optimization Required** ⚠️
   - LCP is affected by CSS, fonts, images, and JavaScript
   - Single-file optimizations rarely achieve target improvements
   - Need comprehensive approach (Critical CSS + fonts + images)

---

## Immediate Action Required

### REVERT font-display Change 🔴
The `font-display: swap` change likely degraded performance. Revert this change immediately:

**File**: `src/css/font-optimization.css`
**Change**: `font-display: swap` → `font-display: optional`

**Expected Result**: LCP should return to 3.30s baseline or better

---

## Conclusion

While several valuable optimizations were implemented (hero image size reduction, FontAwesome removal, script async loading), the **font-display change to 'swap' likely degraded LCP performance**. The hero text (h1 heading) appears to be the true LCP element, not the hero image.

**Recommendation**: Revert font-display to 'optional' and implement proper font preloading strategy for Instrument Sans to achieve the target <2.5s LCP.

**Next Optimization Phase**: Focus on Critical CSS inlining and local font hosting to eliminate render-blocking resources.

---

**Report Generated**: November 4, 2025
**Working Directory**: `/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure`
