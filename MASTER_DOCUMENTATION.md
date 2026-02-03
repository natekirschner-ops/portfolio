# Portfolio Master Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Splash Page Implementation](#splash-page-implementation)
3. [Technical Architecture](#technical-architecture)
4. [Design System](#design-system)
5. [Deployment & Configuration](#deployment--configuration)
6. [Development Workflow](#development-workflow)
7. [Troubleshooting](#troubleshooting)
8. [Change Log](#change-log)

---

## Project Overview

### Portfolio Website
A personal portfolio website for Nathan Kirschner featuring a minimal splash page with 3D Spline background and clean navigation to showcase professional work.

### Tech Stack
- **Framework**: Next.js 15.5.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Spline (@splinetool/react-spline)
- **Deployment**: Vercel
- **Node**: 18+ (specified in .nvmrc)

---

## Splash Page Implementation

### Core Features
The main portfolio page (`Portfolio.tsx`) includes:
- **3D Spline Background**: Dynamic intro scene with fallback system
- **Center Header**: "Nathan Kirschner" with "inspire.design.experience" subheader
- **Noise Background**: Subtle texture overlay (0.015 opacity)
- **Custom Cursor**: 12px circle (#6D597A default, #E56B6F on hover)
- **Navigation Links**: 6 strategically positioned elements
- **Dynamic Copyright**: Automatically updates year

### Layout Structure
**Desktop:**
```
      [Logo]                           [Projects]
                     
                Nathan Kirschner
            inspire.design.experience
                
  [Contact]    [LinkedIn]    [Instagram]       [©YYYY]
```

**Mobile:**
```
      [Logo]                           [Projects]
                     
                Nathan Kirschner
            inspire.design.experience
                
            [Contact] [LinkedIn] [Instagram]
                      [©YYYY]
```

### Animation Sequence
After Spline loads + 2-second delay:
1. **Logo**: 0ms (80% opacity)
2. **Projects**: 200ms delay
3. **Header/Subheader**: 300ms delay
4. **Contact**: 400ms delay  
5. **LinkedIn**: 500ms delay
6. **Instagram**: 600ms delay
7. **Copyright**: 700ms delay

### Link Configuration
- **Logo**: Upper left, `/logo.svg` (triangle design)
- **Projects**: Upper right, `href="/projects"`
- **Header**: Center, "Nathan Kirschner" with subheader "inspire.design.experience"
- **Contact**: Bottom left, `mailto:contact@nathankirschner.com`
- **LinkedIn**: Bottom center-left, external link
- **Instagram**: Bottom center-right, external link
- **Copyright**: Bottom right, `©{new Date().getFullYear()}`

---

## Technical Architecture

### Component Structure
```
Portfolio.tsx
├── SplineBackground component
│   ├── Dynamic import of @splinetool/react-spline
│   ├── Error handling & fallback system
│   ├── Loading states (clean, no text)
│   └── Timeout protection (10s)
├── Custom cursor system
│   ├── Global cursor hiding
│   ├── Hardware-accelerated positioning
│   └── Link hover state management
├── Noise background overlay
└── UI element positioning & animations
```

### Spline Integration
- **Scene File**: `/scene-spline.splinecode` (copied from public/spline/public/)
- **Loading**: Async import with timeout protection
- **Fallback**: CSS particle animation if Spline fails
- **Error Handling**: Graceful degradation with console logging

### Performance Optimizations
- **GPU Acceleration**: `translate3d()` transforms throughout
- **Layer Isolation**: CSS `contain` and `isolation` properties
- **Minimal DOM**: Efficient event handling and cleanup
- **Async Loading**: Non-blocking Spline component loading

---

## Design System

### Color Palette
- **Background**: White (#FFFFFF)
- **Text Default**: Gray-500 (#6B7280)
- **Text Hover**: Red-400 (#E56B6F)
- **Cursor/Logo**: Purple (#6D597A)
- **Noise Overlay**: Black at 1.5% opacity

### Typography
- **Font**: System font stack with fallbacks
- **Header**: `text-4xl` to `text-6xl` responsive, `font-light`, positioned 5% above center
- **Subheader**: `text-lg` to `text-xl` responsive, `font-light` with `tracking-wide`
- **Links**: `text-sm` (14px) with `font-medium`

### Responsive Layout
- **Desktop**: Single row footer with equal spacing
- **Mobile**: Two-row footer (links on row 1, copyright on row 2)
- **Breakpoint**: `sm` (640px) and above for desktop layout

### Logo Design
- **File**: water.svg (triangle outline)
- **Dimensions**: 136×118px viewBox
- **Style**: 8px stroke width, geometric triangle
- **Usage**: Both logo and favicon

### Animations
- **Duration**: 1000ms fade-in transitions
- **Easing**: CSS default (ease)
- **Cursor**: 0.2s color/transform transitions
- **Custom**: Cubic-bezier for smooth motion

---

## Deployment & Configuration

### Vercel Setup
- **Framework**: Next.js (auto-detected)
- **Node Version**: 18.x
- **Build Command**: `npm run build` (no turbopack flag)
- **Output Directory**: Default (.next)

### Package.json Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "prebuild": "npm run generate:content"
}
```

### Dependencies
```json
{
  "dependencies": {
    "@splinetool/react-spline": "^4.1.0",
    "@splinetool/runtime": "^1.11.1",
    "next": "15.5.5",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  }
}
```

### TypeScript Configuration
```json
{
  "exclude": [
    "node_modules",
    "public/spline/**/*"
  ]
}
```

### Next.js Configuration
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/:path*.splinecode",
      headers: [
        { key: "Content-Type", value: "application/octet-stream" },
        { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }
      ]
    }];
  }
};
```

---

## Development Workflow

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### File Structure
```
src/
├── app/
│   ├── page.tsx (main entry point)
│   └── layout.tsx
├── components/
│   └── Portfolio.tsx
└── data/
    └── generated-portfolio.ts

public/
├── logo.svg (triangle design)
├── favicon.svg (same triangle)
├── scene-spline.splinecode (active 3D scene)
└── content/ (portfolio items)
```

### Development Best Practices
- Always test `npm run build` before deploying
- Use TypeScript strict mode for type safety
- Follow component composition patterns
- Implement proper error boundaries
- Clean up event listeners and timeouts

---

## Troubleshooting

### Common Vercel Deployment Issues

#### 404 NOT_FOUND Error
**Cause**: Build script using unsupported flags
**Solution**: Remove `--turbopack` from build script

#### Spline Loading Failures
**Symptoms**: Fallback particles showing instead of 3D scene
**Debugging**: Check browser console for specific error messages
**Solutions**:
- Verify scene file exists at correct path
- Check network connectivity
- Ensure @splinetool/react-spline is properly installed

#### TypeScript Errors
**Cause**: External dependencies in public/spline/
**Solution**: Update tsconfig.json exclude patterns
```json
{
  "exclude": [
    "node_modules",
    "public/spline/**/*"
  ]
}
```

### Performance Issues

#### Slow Loading
- Check Spline scene file size
- Verify network conditions
- Monitor browser developer tools for bottlenecks

#### Memory Leaks
- Ensure proper cleanup in useEffect returns
- Clear timeouts and animation frames
- Remove event listeners on component unmount

### Browser Compatibility
- **Chrome/Chromium**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile**: Responsive considerations needed

---

## Change Log

### Recent Updates

#### Mobile Responsive Footer Layout
- **Date**: Latest
- **Change**: Added responsive footer layout for mobile viewports
- **Desktop**: Single row with equal spacing (Contact, LinkedIn, Instagram, Copyright)
- **Mobile**: Two rows - Row 1: Contact/LinkedIn/Instagram, Row 2: Copyright
- **Breakpoint**: `sm` (640px) for layout switching
- **Impact**: Better mobile user experience and touch targets

#### Header & Subheader Addition
- **Date**: Previous
- **Change**: Added centered "Nathan Kirschner" header with "inspire.design.experience" subheader
- **Location**: Center of splash page, positioned 5% above exact center for better visual balance
- **Styling**: Responsive text sizes, light font weight, gray color scheme
- **Animation**: Fades in at 300ms delay
- **Impact**: Clear brand identity and messaging

#### Logo & Favicon Update
- **Date**: Previous
- **Change**: Replaced complex rectangles with simple triangle outline
- **Files**: `public/logo.svg`, `public/favicon.svg`
- **Design**: 136×118px triangle in #6D597A
- **Impact**: Cleaner, more scalable brand identity

#### Dynamic Copyright Implementation
- **Change**: `©2025` → `©{new Date().getFullYear()}`
- **Benefit**: Automatic year updates, zero maintenance
- **Location**: Bottom-right corner of splash page

#### Loading Text Removal
- **Change**: Removed "Loading 3D scene..." text
- **Reason**: Cleaner, more minimal loading experience
- **Result**: Smoother visual flow during Spline loading

#### Link Layout Finalization
- **Structure**: 6 total elements (logo + 5 navigation)
- **Bottom Links**: Contact, LinkedIn, Instagram, Copyright
- **Spacing**: Equal distribution using CSS percentages
- **Animation**: Staggered 100ms delays for smooth cascade

#### Vercel Deployment Fix
- **Issue**: 404 NOT_FOUND error on deployment
- **Root Cause**: `--turbopack` flag not supported in production
- **Solution**: Updated build script, added Node version specification
- **Files**: `package.json`, `.nvmrc`

#### TypeScript Cleanup
- **Problem**: False positive errors from Spline dependencies
- **Solution**: Updated exclude patterns in tsconfig.json
- **Result**: Clean diagnostics panel, zero errors/warnings
- **Benefit**: Better development experience

### Historical Development

#### Splash Page Creation
- **Approach**: Built from scratch for clean implementation
- **Features**: Spline integration, custom cursor, staggered animations
- **Architecture**: Single component with embedded fallback system

#### Spline Integration & File Cleanup
- **Scene Source**: `public/spline/public/scene.splinecode` (copied to `/scene-spline.splinecode`)
- **Implementation**: Async loading with error handling
- **Fallback**: CSS particle animation
- **Optimization**: Timeout protection, stable loading sequence
- **Cleanup**: Removed unused `particles.splinecode`, `scene.splinecode`, and `spline-footer/` directory

#### Performance Optimization
- **GPU Acceleration**: Consistent use of `translate3d()`
- **Layer Isolation**: CSS `contain` and `isolation` properties  
- **Event Handling**: Efficient cursor tracking with RAF
- **Memory Management**: Proper cleanup and timeout handling

---

## Development Guidelines

### Code Standards
- Use TypeScript strict mode
- Implement proper error handling
- Follow React hooks best practices
- Clean up resources in useEffect returns
- Use semantic HTML and accessible patterns

### Performance Considerations
- Minimize DOM manipulations
- Use requestAnimationFrame for smooth animations
- Implement proper loading states
- Optimize asset sizes and formats
- Test across different network conditions

### Accessibility
- Maintain keyboard navigation support
- Use semantic HTML elements
- Provide proper alt texts and labels
- Ensure sufficient color contrast
- Test with screen readers

### Browser Testing
- Test core functionality across major browsers
- Verify mobile responsiveness
- Check performance on lower-end devices
- Validate fallback systems work properly

---

**Last Updated**: Current
**Version**: Production Ready
**Status**: Active Development
**Maintainer**: Nathan Kirschner Portfolio Team