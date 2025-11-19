# Quick Commands Reference 🚀

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Git Commands

```bash
# Initialize and first commit
git init
git add .
git commit -m "Initial commit: Perplexity AI Clone"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main

# Regular workflow
git add .
git commit -m "Your message"
git push
```

## Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Testing

```bash
# Open in browser
http://localhost:3000

# Test landing page
- Type a question
- Click search or press Enter

# Test chat
- Send multiple messages
- Watch streaming
- Check sources
- Try new chat button
```

## File Structure

```bash
# View structure
tree /F

# Or manually check
app/
  chat/
    page.tsx
  globals.css
  layout.tsx
  page.tsx
  providers.tsx
components/
  ui/
  chat-input.tsx
  chat-interface.tsx
  chat-message.tsx
  landing-page.tsx
lib/
  stream.ts
  utils.ts
types/
  chat.ts
```

## Common Issues

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Dependencies missing
```bash
# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Kill process on port 3000
# Windows PowerShell:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart
npm run dev
```

## Environment Check

```bash
# Check Node version (need 18+)
node --version

# Check npm version
npm --version

# Check if Git is installed
git --version
```

## Pre-Deployment Checklist

```bash
# 1. Build succeeds
npm run build

# 2. No TypeScript errors
npx tsc --noEmit

# 3. No lint errors
npm run lint

# 4. Test locally
npm run dev
# Open http://localhost:3000 and test

# 5. Git is ready
git status
git log --oneline

# 6. Ready to deploy!
```

## Vercel Dashboard URLs

- Dashboard: https://vercel.com/dashboard
- New Project: https://vercel.com/new
- Documentation: https://vercel.com/docs

## Important Links

- Next.js Docs: https://nextjs.org/docs
- TailwindCSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- React Query: https://tanstack.com/query/latest
- API: https://mock-askperplexity.piyushhhxyz.deno.net

## Documentation Files

Read these for more info:
- README.md - Main documentation
- ARCHITECTURE.md - Code structure
- DEPLOYMENT.md - Deploy guide
- FEATURES.md - Feature list
- TESTING.md - Test checklist
- GIT_SETUP.md - Git guide
- PROJECT_SUMMARY.md - Summary

## Quick Test

```bash
# 1. Start dev server
npm run dev

# 2. Open browser
http://localhost:3000

# 3. Test flow
Landing → Search → Chat → Stream → Sources → New Chat

# 4. If all works, you're ready!
```

## Submission

```markdown
**GitHub Repository**: https://github.com/YOUR_USERNAME/REPO_NAME
**Vercel Deployment**: https://your-project.vercel.app
```

---

That's all you need! 🎉
