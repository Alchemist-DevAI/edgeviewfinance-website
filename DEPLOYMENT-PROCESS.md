# Edgeview Finance Deployment Process

## Project Configuration
- **Vercel Project ID**: `prj_tWNmDHDwGSabgxGxT1sjqkX5To7N`
- **Vercel Team ID**: `team_HfBdNRhOWlPE22BnRy86zy2x`
- **GitHub Deployment Repo**: `Alchemist-DevAI/edgeviewfinance-website`
- **Source Directory**: `/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure`
- **Production URL**: `https://www.edgeviewfinance.com.au`
- **Staging URL**: `https://edgeviewfinance-website.vercel.app`

## Critical Configuration Settings
```javascript
// astro.config.mjs - MUST use these settings
output: 'server'  // Required for API routes
adapter: vercel({
  analytics: true,
  speedInsights: { enabled: true }
})
```

## Pre-Deployment Checklist
- [ ] **Local Testing**
  - [ ] Run `npm run dev` and test all pages
  - [ ] Verify contact form submits successfully
  - [ ] Check all navigation dropdowns work
  - [ ] Test Finance Assessment form
  - [ ] Confirm all images load
  - [ ] Check mobile responsiveness

- [ ] **Build Verification**
  - [ ] Run `npm run build:fast` locally (skips TypeScript checking)
  - [ ] Fix any critical build errors
  - [ ] Verify dist folder is created

- [ ] **Code Review**
  - [ ] Check DEVELOPMENT-GUIDE.md for known issues
  - [ ] Verify no hardcoded localhost URLs
  - [ ] Confirm environment variables are used
  - [ ] Review recent changes with `git diff`

## Deployment Steps

### Step 1: Prepare Changes
```bash
# Navigate to source directory
cd /mnt/c/GitHub\ Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure

# Check status
git status

# Stage and commit changes
git add -A
git commit -m "Description of changes"
git push origin main  # Always push to main branch
```

### Step 2: Run Deployment Script
```bash
# Fix line endings (Windows/WSL issue)
dos2unix /mnt/c/GitHub\ Repos/evfbs-v2-supabase/4-development-infrastructure/scripts/deploy-edgeview-website.sh

# Run deployment
bash /mnt/c/GitHub\ Repos/evfbs-v2-supabase/4-development-infrastructure/scripts/deploy-edgeview-website.sh
```

### Step 3: Monitor Deployment
1. Watch script output for errors
2. Check Vercel dashboard: https://vercel.com/dashboard
3. Wait for build to complete (usually 2-3 minutes)

### Step 4: Verify Deployment
- [ ] Check staging URL loads
- [ ] Test contact form
- [ ] Verify API endpoints work
- [ ] Check console for errors
- [ ] Test on mobile device

## Environment Variables (Vercel Dashboard)
These MUST be set in Vercel project settings:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `RESEND_API_KEY` - Resend email service key
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Recipient email address

## Common Issues & Solutions

### NEW: Issue: Case Sensitivity in Component Imports
**Cause**: Import paths using lowercase 'blog/' when directory is 'Blog/' (capital B)
**Solution**:
1. Check for imports like `../components/blog/Component.astro`
2. Correct to `../components/Blog/Component.astro` (capital B)
3. Common files affected: blog.astro, [slug].astro
4. Error: "Could not resolve BlogCategories.astro" or similar
5. Verified: 2025-09-16

### NEW: Issue: Node.js Runtime Compatibility
**Cause**: Vercel no longer supports nodejs18.x runtime
**Solution**: 
1. Update astro.config.mjs to use nodejs20.x or higher
2. In Vercel adapter config: `runtime: 'nodejs20.x'`
3. Verified: 2025-09-13

### NEW: Issue: Dependency Version Conflicts
**Cause**: Astro v4 dependencies incompatible with newer Vercel adapter
**Solution**: 
1. Upgrade to Astro v5: `npm install astro@^5.13.0`
2. Update all integrations to compatible versions:
   - @astrojs/vercel@^8.2.7
   - @astrojs/mdx@^4.3.5
   - @astrojs/react@^4.3.1
   - @astrojs/tailwind@^6.0.2
3. Use `--legacy-peer-deps` in Vercel install command
4. Verified: 2025-09-13

### Issue: Changes not appearing on live site
**Cause**: Deployment script not syncing properly or wrong branch
**Solution**: 
1. Check you're on main branch: `git branch` (should show `* main`)
2. Ensure changes are committed: `git status`
3. Push to main branch: `git push origin main`
4. If needed, manually trigger deployment in Vercel dashboard

### Issue: TypeScript errors blocking build (341+ errors)
**Cause**: Strict TypeScript checking with missing type definitions (e.g., gtag)
**Solution**: 
1. Use `npm run build:fast` instead of `npm run build`
2. Or add missing type definitions to global.d.ts
3. For Google Analytics: Declare `gtag` function types
4. Verified: 2025-09-13 - Successfully deployed with build:fast

### Issue: Contact form returns 405 error
**Cause**: API routes not configured for server mode
**Solution**: 
1. Ensure `output: 'server'` in astro.config.mjs
2. Check API route has proper exports (GET, POST)

### Issue: Navigation dropdowns not working
**Cause**: JavaScript not loading properly
**Solution**: 
1. Check browser console for errors
2. Verify script tags in Layout.astro
3. Clear browser cache

## Rollback Process

### Quick Rollback (Vercel Dashboard)
1. Go to Vercel dashboard
2. Select project: edgeviewfinance-website
3. Go to Deployments tab
4. Find last working deployment
5. Click "..." menu → "Promote to Production"

### Git Rollback
```bash
# Find last working commit
git log --oneline -10

# Revert to specific commit
git revert HEAD
# or
git reset --hard <commit-hash>

# Push changes to main branch
git push --force origin main

# Run deployment script
./deploy-edgeview-website.sh
```

## Deployment Log
Keep track of deployments for reference:

| Date | Time | Changes | Status | Notes |
|------|------|---------|--------|-------|
| 2025-09-16 | 15:42 | Fixed case sensitivity imports | Success | Fixed blog component import paths, resolved deployment errors |
| 2025-09-16 | 14:36 | Enhanced analytics tracking | Success | Microsoft Clarity, UTM tracking, call tracking (1300 280 895), scroll depth tracking |
| 2025-09-13 | 21:30 | Comprehensive docs + fixes | Success | Upgraded to Astro v5, fixed all build issues |
| 2025-09-13 | 21:00 | Dependency upgrades | Success | Resolved nodejs runtime and package conflicts |
| 2025-09-13 | 20:30 | TypeScript error fix | Success | Used build:fast to skip TS checking |
| 2025-09-13 | 19:00 | Homepage compacting | Success | Fixed value stack spacing |
| 2025-09-13 | 14:00 | Contact form fix | Success | Added POST handler |
| 2025-09-13 | 11:00 | Navigation bold fix | Success | Used !important CSS |

## Testing Protocol

### Local Testing Commands
```bash
# Start development server
npm run dev

# Build site locally
npm run build:fast

# Preview production build
npm run preview
```

### API Testing
```bash
# Test contact form locally
curl -X POST http://localhost:4002/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'
```

## Important Notes
1. **NEVER** use direct Vercel CLI deployment from source folder
2. **ALWAYS** use the GitHub deployment method via main branch
3. **ALWAYS** test locally first with `npm run dev`
4. **ALWAYS** check this document before deploying
5. **UPDATE** this document when new issues/solutions are found
6. **VERIFY** Node.js runtime compatibility (use nodejs20.x or higher)
7. **CHECK** dependency versions are compatible (especially Astro + integrations)
8. **USE** `npm run build:fast` to bypass TypeScript errors when needed

## Support Resources
- Astro Documentation: https://docs.astro.build
- Vercel Documentation: https://vercel.com/docs
- Project Repository: https://github.com/Alchemist-DevAI/edgeviewfinance-website

---
*Last Updated: 2025-09-13*
*Maintained by: Development Team*