# Nathan Kirschner Portfolio

A minimal portfolio website featuring a dynamic 3D Spline background and clean navigation interface.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Features

- **3D Spline Background**: Dynamic intro scene with fallback system
- **Custom Cursor**: Interactive 12px circle with hover effects
- **Clean Navigation**: 6 strategically positioned links
- **Dynamic Copyright**: Automatically updates year
- **Performance Optimized**: GPU acceleration and layer isolation

## Tech Stack

- **Next.js 15.5.5** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Spline** for 3D graphics
- **Vercel** deployment

## Documentation

For comprehensive documentation including implementation details, troubleshooting, and development guidelines, see:

**📖 [MASTER_DOCUMENTATION.md](./MASTER_DOCUMENTATION.md)**

This master file contains all project documentation including:
- Technical architecture
- Design system
- Deployment configuration
- Development workflow
- Troubleshooting guides
- Complete change log

## Project Structure

```
src/
├── app/
│   └── page.tsx          # Main entry point
└── components/
    └── SplashPageNew.tsx # Main splash page component

public/
├── logo.svg              # Triangle logo design
├── scene-spline.splinecode # 3D scene file
└── content/              # Portfolio items
```

## Development

- **Development**: `npm run dev` (with Turbopack)
- **Production Build**: `npm run build` (standard Next.js)
- **Node Version**: 18+ (see .nvmrc)

## Deployment

Optimized for Vercel deployment with automatic builds from the main branch.

---

**Status**: Production Ready  
**Maintainer**: Nathan Kirschner  
**Last Updated**: Current