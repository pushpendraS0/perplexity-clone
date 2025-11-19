# Deployment Guide 🚀

## Quick Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production:
```bash
vercel --prod
```

### Method 2: Vercel Dashboard (Easiest)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Perplexity AI Clone"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com)

3. Click "New Project"

4. Import your GitHub repository

5. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

6. Click "Deploy"

## Environment Configuration

No environment variables needed for this project as we're using a public API.

## Build Configuration

The project is pre-configured with:
- `next.config.ts` for Next.js settings
- `vercel.json` for Vercel deployment
- Optimized for production builds

## Post-Deployment Checklist

✅ Landing page loads correctly  
✅ Search functionality works  
✅ Chat page is accessible  
✅ Streaming responses work  
✅ Sources are displayed  
✅ New chat button functions  
✅ Responsive on mobile devices  
✅ All animations are smooth  

## Testing Your Deployment

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)

2. Test the landing page:
   - Enter a question
   - Click search or press Enter
   - Verify navigation to chat page

3. Test the chat interface:
   - Send a message
   - Watch streaming response
   - Check source citations
   - Try follow-up questions
   - Test "New Chat" button

4. Test on different devices:
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Chrome)
   - Tablet (iPad)

## Common Issues & Solutions

### Issue: Build fails with TypeScript errors
**Solution**: Run `npm run build` locally first to catch errors

### Issue: Streaming doesn't work
**Solution**: Check CORS and API endpoint accessibility

### Issue: Styles not loading
**Solution**: Clear `.next` cache and rebuild

### Issue: Images not displaying
**Solution**: Use Next.js Image component correctly

## Performance Optimization

The project includes:
- Server-side rendering (SSR)
- Automatic code splitting
- Optimized images
- Minimal bundle size
- Efficient streaming

## Custom Domain Setup

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as shown
5. Wait for SSL certificate

## Monitoring

Vercel provides:
- Real-time logs
- Analytics
- Performance insights
- Error tracking

Access these in your Vercel dashboard.

## Rollback

If something goes wrong:
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find a previous working deployment
4. Click "..." → "Promote to Production"

## Support

For issues:
- Check Vercel documentation
- Review build logs
- Test locally first
- Check API connectivity

---

Happy Deploying! 🎉
