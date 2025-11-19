# Git Setup & Deployment Guide 🚀

## Step 1: Initialize Git Repository

```bash
cd perplexity-clone
git init
git add .
git commit -m "Initial commit: Perplexity AI Clone - Complete implementation"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New Repository"
3. Name: `perplexity-ai-clone` (or your preferred name)
4. Description: "A pixel-perfect clone of Perplexity AI with streaming responses"
5. **Make it Public** ✅ (Required for assignment)
6. **Do NOT** initialize with README (we already have one)
7. Click "Create repository"

## Step 3: Connect Local to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/perplexity-ai-clone.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel

### Option A: Vercel Dashboard (Easiest)

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import your `perplexity-ai-clone` repository
5. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
6. Click "Deploy"
7. Wait 2-3 minutes for deployment
8. Your app will be live at: `https://your-project.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

## Step 5: Verify Deployment

1. Click the deployment URL
2. Test landing page:
   - Search bar works
   - Example questions clickable
   - Navigation to chat works
3. Test chat interface:
   - Messages send correctly
   - Streaming works
   - Sources display
   - New chat button works

## Step 6: Update README with Links

Edit your README.md and add:

```markdown
## 🌐 Live Demo

- **Deployed App**: https://your-project.vercel.app
- **GitHub Repository**: https://github.com/YOUR_USERNAME/perplexity-ai-clone
```

Commit and push:

```bash
git add README.md
git commit -m "Add deployment links to README"
git push
```

## Step 7: Submission

Provide these two links:

1. **GitHub Repository**: `https://github.com/YOUR_USERNAME/perplexity-ai-clone`
2. **Vercel Deployed Link**: `https://your-project.vercel.app`

---

## Useful Git Commands

```bash
# Check status
git status

# See changes
git diff

# Add specific files
git add file1.tsx file2.tsx

# Add all changes
git add .

# Commit with message
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main

# Merge branch
git merge feature-name
```

## Vercel Auto-Deployments

After initial setup:
- Every push to `main` branch auto-deploys
- Preview deployments for other branches
- Instant rollback available
- View logs in Vercel dashboard

## Environment Variables (If Needed)

If you add environment variables:

1. Add to `.env.local` locally
2. Add to Vercel dashboard:
   - Project Settings → Environment Variables
   - Add key-value pairs
   - Redeploy

## Custom Domain (Optional)

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel:
   - Project Settings → Domains
   - Add your domain
   - Update DNS records as shown
   - Wait for SSL certificate

## Troubleshooting

### Build fails on Vercel
- Check build logs
- Run `npm run build` locally first
- Fix any TypeScript errors
- Push fixes and redeploy

### Streaming doesn't work
- Check API endpoint is accessible
- Verify CORS settings
- Check browser console for errors

### 404 on refresh
- Should work with Next.js App Router
- Check `next.config.ts` if issues

---

## Quick Reference

```bash
# Complete workflow
git add .
git commit -m "Description of changes"
git push

# Vercel will auto-deploy!
```

---

Ready to submit! 🎉
