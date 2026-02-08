---
description: How to deploy the application with new commits
---

# Deployment Workflow for Tambo GitHub Explorer

This workflow guides you through deploying your application with new commits to Vercel (or other platforms).

## Prerequisites

- Git repository initialized
- GitHub repository created and connected
- Vercel account (or other hosting platform)
- All environment variables configured

---

## Step 1: Verify Your Changes

Before deploying, ensure your application builds successfully locally:

```bash
npm run build
```

**What to check:**
- ✅ No build errors
- ✅ No TypeScript errors
- ✅ All linting passes

If there are errors, fix them before proceeding.

---

## Step 2: Run Linting (Optional but Recommended)

Clean up your code:

```bash
npm run lint
```

If there are fixable issues:

```bash
npm run lint:fix
```

---

## Step 3: Stage Your Changes

Add all modified files to staging:

```bash
git add .
```

Or add specific files:

```bash
git add src/path/to/file.tsx
```

---

## Step 4: Commit Your Changes

Create a meaningful commit message:

```bash
git commit -m "feat: describe your new feature or fix"
```

**Commit message examples:**
- `feat: add repository comparison tool`
- `fix: resolve kanban board drag-and-drop issue`
- `docs: update README with deployment instructions`
- `style: improve landing page animations`
- `refactor: optimize GitHub API calls`

---

## Step 5: Push to GitHub

Push your commits to the main branch:

```bash
git push origin main
```

Or if you're using a different branch:

```bash
git push origin your-branch-name
```

---

## Step 6: Deploy to Vercel

### Option A: Automatic Deployment (Recommended)

If you have Vercel connected to your GitHub repository:

1. **Vercel will automatically detect the push**
2. **It will trigger a new deployment**
3. **Wait for the build to complete** (usually 1-3 minutes)
4. **Check the deployment status** at https://vercel.com/dashboard

### Option B: Manual Deployment via Vercel CLI

If you prefer manual control:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option C: Deploy to Other Platforms

**For Netlify:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**For other platforms:**
- Follow their specific deployment documentation
- Ensure environment variables are configured on the platform

---

## Step 7: Verify Deployment

After deployment completes:

1. **Open your deployed URL** (e.g., https://your-app.vercel.app)
2. **Test critical features:**
   - ✅ Landing page loads
   - ✅ Login/OAuth works
   - ✅ Chat interface responds
   - ✅ Tools execute correctly
3. **Check browser console** for any errors
4. **Test on mobile** if applicable

---

## Step 8: Monitor Deployment

Check deployment logs if something goes wrong:

**On Vercel:**
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Click on the latest deployment
4. View build logs and runtime logs

**Common issues:**
- ❌ **Build fails**: Check for TypeScript errors or missing dependencies
- ❌ **Environment variables missing**: Add them in Vercel dashboard → Settings → Environment Variables
- ❌ **API routes fail**: Verify environment variables are set correctly
- ❌ **OAuth broken**: Update callback URLs in GitHub OAuth app settings

---

## Quick Reference Commands

```bash
# Full deployment workflow
npm run build            # Verify build works
npm run lint            # Check for issues
git add .               # Stage changes
git commit -m "message" # Commit with message
git push origin main    # Push to GitHub
# → Vercel auto-deploys

# Manual Vercel deployment
vercel --prod

# Check git status
git status

# View recent commits
git log --oneline -5

# View current branch
git branch
```

---

## Environment Variables Checklist

Ensure these are set in your deployment platform:

- ✅ `NEXT_PUBLIC_TAMBO_API_KEY`
- ✅ `NEXT_PUBLIC_TAMBO_URL`
- ✅ `NEXT_PUBLIC_GITHUB_TOKEN`
- ✅ `NEXTAUTH_URL` (set to your production URL)
- ✅ `NEXTAUTH_SECRET`
- ✅ `GITHUB_CLIENT_ID`
- ✅ `GITHUB_CLIENT_SECRET`

---

## Rollback (If Something Goes Wrong)

**Revert to previous commit:**
```bash
git revert HEAD
git push origin main
```

**Redeploy previous version on Vercel:**
1. Go to Vercel dashboard
2. Find the previous successful deployment
3. Click "..." → "Promote to Production"

---

## Tips for Successful Deployments

1. **Always test locally first** with `npm run build`
2. **Write clear commit messages** for better tracking
3. **Use feature branches** for experimental features
4. **Check Vercel/platform status** if deploys are slow
5. **Keep environment variables in sync** between local and production
6. **Monitor error logs** after deployment
7. **Test OAuth flows** specifically after deployment (callback URLs must match)

---

## Troubleshooting

**Build fails with "Module not found":**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
npm run build
```

**Deployment succeeds but app doesn't work:**
- Check environment variables in Vercel dashboard
- Verify all secrets are set correctly
- Check runtime logs for errors

**OAuth redirect fails:**
- Update GitHub OAuth app callback URL to match production URL
- Ensure `NEXTAUTH_URL` matches your production domain

---

## Success! 🎉

Your application should now be live with your latest changes. Share your deployment URL and celebrate! 🚀
