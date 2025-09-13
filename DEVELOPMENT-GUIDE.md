# Edgeview Finance Development Guide

## Quick Reference
⚠️ **ALWAYS CHECK THIS GUIDE BEFORE MAKING CHANGES** ⚠️

- Check page-specific guides in `/docs/page-fixes/` for detailed solutions
- Test all changes locally before committing
- Update this guide when new issues are resolved
- Use `npm run build:fast` to skip TypeScript checking during development

## Project Structure
```
evfbs-agency11-pure/
├── src/
│   ├── components/     # Reusable Astro components
│   ├── content/        # MDX content files
│   ├── css/           # Global CSS and component styles
│   ├── layouts/       # Page layouts
│   ├── pages/         # Route pages
│   └── scripts/       # Client-side JavaScript
├── public/            # Static assets
└── docs/
    └── page-fixes/    # Page-specific documentation
```

## Known Fixes Database

### 🔧 Navigation Bar Issues

#### Dropdown Menu Items Not Bold
- **Issue**: JavaScript dropdown menu items appear with normal weight while static items are bold
- **Root Cause**: CSS specificity conflict with dropdown styles
- **Solution**: 
  ```css
  /* In /src/css/navbar.css */
  .navbar-dropdown-link {
    font-weight: 700 !important;
  }
  ```
- **Files Affected**: 
  - `/src/css/navbar.css`
  - `/src/components/Nav/Navbar.astro`
- **Verified**: 2025-09-13
- **Attempts Before Success**: 6

---

### 📝 Heading Styles

#### H1 Not Displaying Correctly on Finance Assessment
- **Issue**: H1 heading on assessment start page not matching site style
- **Root Cause**: Missing Tailwind classes for consistent heading style
- **Solution**:
  ```html
  <h1 class="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
    Your Heading Text
  </h1>
  ```
- **Files Affected**: 
  - `/src/pages/finance-assessment/index.astro`
  - `/src/pages/finance-assessment/start.astro`
- **Verified**: 2025-09-12
- **Attempts Before Success**: 4

---

### 🏠 Homepage Components

#### Value Stack Section Excessive Spacing
- **Issue**: Too much vertical padding making section too tall
- **Root Cause**: Desktop padding values too large
- **Solution**:
  ```html
  <!-- Change from -->
  <section class="py-8 lg:py-12">
  <!-- To -->
  <section class="py-4 lg:py-6">
  ```
- **Files Affected**: 
  - `/src/components/Index/ValueStackSection.astro`
- **Related**: Also update disclaimer text positioning
- **Verified**: 2025-09-13

#### Hero Section Whitespace
- **Issue**: Too much top padding cutting off text on mobile
- **Root Cause**: CSS padding-top value too high
- **Solution**:
  ```css
  /* In /src/css/hero-section.css */
  @media (min-width: 768px) {
    .hero-section {
      padding-top: 2rem; /* Was 5rem */
    }
  }
  ```
- **Files Affected**: 
  - `/src/css/hero-section.css`
- **Verified**: 2025-09-13

#### Value Stack Total Calculation
- **Issue**: Total showing $49,500+ when individual values sum to $28,500+
- **Root Cause**: MDX content file not updated when values changed
- **Solution**: Update `/src/content/IndexPage/value-stack.mdx`
- **Verified**: 2025-09-13

---

### 📧 Contact Form

#### 405 Method Not Allowed Error
- **Issue**: Contact form submission fails with 405 error
- **Root Cause**: API endpoint missing POST handler
- **Solution**:
  ```javascript
  // In /src/pages/api/contact.ts
  export async function POST(context) {
    // Handle form submission
  }
  export async function GET() {
    return new Response('Method not allowed', { status: 405 });
  }
  ```
- **Configuration Required**: 
  - Set `output: 'server'` in `astro.config.mjs`
- **Files Affected**: 
  - `/src/pages/api/contact.ts`
  - `astro.config.mjs`
- **Verified**: 2025-09-13

---

### 🎨 CSS and Styling Patterns

#### Font Weight Issues
- **Pattern**: Use `!important` when overriding framework styles
- **Example**: `font-weight: 700 !important;`

#### Responsive Spacing
- **Pattern**: Always use both mobile and desktop values
- **Example**: `py-4 lg:py-6` (mobile: 1rem, desktop: 1.5rem)

#### Color Consistency
- **Primary Blue**: `#0EA5E9` (sky-500)
- **Dark Blue**: `#0C4A6E` (sky-900)
- **Success Green**: `#10B981` (emerald-500)

---

## Component Patterns

### Form Components
```astro
<!-- Standard form field structure -->
<div class="mb-6">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Label Text
  </label>
  <input 
    type="text"
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
  />
</div>
```

### Button Styles
```html
<!-- Primary Button -->
<button class="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors">
  Button Text
</button>

<!-- Secondary Button -->
<button class="border-2 border-sky-500 text-sky-500 px-6 py-3 rounded-lg hover:bg-sky-50 transition-colors">
  Button Text
</button>
```

---

## Testing Checklist

### Before Making Changes
1. Read relevant page-fixes documentation
2. Check this guide for known patterns
3. Create a git branch for your changes

### After Making Changes
1. Test locally with `npm run dev`
2. Check browser console for errors
3. Test on mobile viewport
4. Run `npm run build:fast` to verify build
5. Update this guide if you discovered new patterns

### Before Deploying
1. Review DEPLOYMENT-PROCESS.md
2. Test all affected pages
3. Verify API endpoints if changed
4. Check forms still submit

---

## Common Pitfalls to Avoid

### ❌ DON'T
- Change `output` mode in astro.config.mjs without testing API routes
- Use `npm run build` if TypeScript errors exist (use `build:fast`)
- Deploy directly with Vercel CLI
- Forget to test mobile responsiveness
- Hardcode URLs (use environment variables)

### ✅ DO
- Always check this guide first
- Test locally before committing
- Update documentation when fixing issues
- Use consistent spacing patterns
- Follow existing code conventions

---

## File-Specific Notes

### `/src/layouts/Layout.astro`
- Main layout file for all pages
- Contains global CSS imports
- Manages meta tags and SEO

### `/src/components/Nav/Navbar.astro`
- Complex component with dropdown logic
- Requires `!important` for style overrides
- Mobile menu handled separately

### `/src/pages/api/contact.ts`
- Must export both GET and POST functions
- Requires server mode in Astro config
- Uses Resend for email sending

---

## Debugging Tips

### Check Build Output
```bash
npm run build:fast 2>&1 | grep -i error
```

### View TypeScript Errors
```bash
npx astro check
```

### Test API Endpoints
```bash
curl -X POST http://localhost:4002/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### Clear Cache
```bash
rm -rf .astro dist node_modules/.cache
```

---

## Update Log

| Date | Issue | Solution | Verified By |
|------|-------|----------|-------------|
| 2025-09-13 | Nav dropdowns not bold | Added !important to font-weight | Development Team |
| 2025-09-13 | Value stack spacing | Reduced padding values | Development Team |
| 2025-09-13 | Hero whitespace | Adjusted top padding | Development Team |
| 2025-09-13 | Contact form 405 | Added POST handler | Development Team |
| 2025-09-12 | H1 assessment style | Added proper classes | Development Team |

---

## Contributing to This Guide

When you resolve a new issue:
1. Add it to the Known Fixes Database section
2. Include the exact solution that worked
3. Note how many attempts it took
4. Update the Update Log
5. Create a page-specific guide if needed

---

*This is a living document. Update it every time you learn something new.*

*Last Updated: 2025-09-13*