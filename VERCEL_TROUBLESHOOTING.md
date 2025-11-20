# Vercel Deployment Troubleshooting Guide

## Error Details
- **Error Code**: 404: NOT_FOUND
- **Error ID**: cle1::plvps-1763668730889-d85665f5a43a
- **Status**: Deployment failing with 404 error

## Immediate Troubleshooting Steps

### 1. Check Vercel Build Logs
1. Go to your Vercel dashboard
2. Click on your project
3. Navigate to the "Functions" or "Build Logs" tab
4. Look for any red error messages during build process

### 2. Verify Build Command
Ensure your `vercel.json` or project settings use the correct build command:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

### 3. Check Environment Variables
- Verify all required environment variables are set in Vercel dashboard
- Ensure `NEXT_PUBLIC_*` variables are properly configured
- Check if any missing environment variables are causing build failures

## Common Causes & Solutions

### Cause 1: Spline Dependencies Issue
**Problem**: Spline package causing build failures on Vercel

**Solution A**: Add to `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, '@splinetool/react-spline'];
    return config;
  }
};

export default nextConfig;
```

**Solution B**: Add to `package.json`:
```json
{
  "resolutions": {
    "@splinetool/react-spline": "^4.1.0"
  }
}
```

### Cause 2: Node Version Mismatch
**Problem**: Vercel using different Node.js version

**Solution**: Add to `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

Or create `.nvmrc` file:
```
18
```

### Cause 3: Build Output Issues
**Problem**: Next.js build not generating proper static files

**Solution**: Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  trailingSlash: false,
};
```

### Cause 4: Turbopack Compatibility
**Problem**: Turbopack not supported in Vercel production builds

**Solution**: Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  }
}
```

## File System Issues

### Check Required Files
Ensure these files exist and are committed:
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `next.config.ts`
- `package.json`
- `public/` directory with assets

### Verify Public Assets
Ensure all referenced files exist:
- `public/logo.svg`
- `public/scene-spline.splinecode`
- Any other static assets

## Deployment Configuration

### Vercel Project Settings
1. **Framework Preset**: Next.js
2. **Node.js Version**: 18.x or 20.x
3. **Build Command**: `npm run build`
4. **Output Directory**: Leave empty (Next.js default)
5. **Install Command**: `npm install`

### Environment Variables
Required variables for Vercel:
```
NEXT_PUBLIC_SHOW_SPLASH=true (if using toggle)
```

## Advanced Debugging

### Enable Verbose Logging
Add to `next.config.ts`:
```typescript
const nextConfig = {
  experimental: {
    logging: {
      level: 'verbose'
    }
  }
};
```

### Check Bundle Analysis
Run locally to identify large dependencies:
```bash
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

### Test Production Build Locally
```bash
npm run build
npm run start
```

## Quick Fix Checklist

- [ ] Check Vercel build logs for specific errors
- [ ] Verify Node.js version compatibility
- [ ] Ensure all dependencies are in `package.json`
- [ ] Confirm no missing environment variables
- [ ] Check that `src/app/page.tsx` exports default component
- [ ] Verify `public/` assets are committed to git
- [ ] Test production build locally
- [ ] Remove Turbopack from build command
- [ ] Clear Vercel build cache

## Emergency Rollback

### Revert to Previous Working Version
1. In Vercel dashboard, go to "Deployments"
2. Find last working deployment
3. Click "..." menu → "Redeploy"
4. This will restore the working version while you debug

### Minimal Working Version
If all else fails, create a minimal `page.tsx`:
```jsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">Portfolio Site</h1>
    </div>
  );
}
```

## Contact Support

If none of these solutions work:
1. Copy exact error message from Vercel logs
2. Note your Node.js version and dependencies
3. Create minimal reproduction case
4. Contact Vercel support with error ID: `cle1::plvps-1763668730889-d85665f5a43a`

## Prevention

### Pre-Deployment Testing
1. Always test `npm run build` locally
2. Test production mode with `npm run start`
3. Use `vercel dev` for local Vercel simulation
4. Set up GitHub Actions for build testing

### Monitoring
- Enable Vercel build notifications
- Monitor bundle size changes
- Track dependency updates
- Regular deployment testing

---

**Last Updated**: Current
**Status**: Active troubleshooting guide
**Next Steps**: Follow checklist systematically