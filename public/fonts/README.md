# Font Installation Guide

## THICCCBOI Font Setup

This folder is prepared to receive the THICCCBOI font files. Please add the following font files to the `thicccboi/` directory:

### Required Font Files

Place these files in `portfolio/public/fonts/thicccboi/`:

```
THICCCBOI-Thin.ttf         (weight: 100)
THICCCBOI-ExtraLight.ttf   (weight: 200)
THICCCBOI-Light.ttf        (weight: 300)
THICCCBOI-Regular.ttf      (weight: 400)
THICCCBOI-Medium.ttf       (weight: 500)
THICCCBOI-SemiBold.ttf     (weight: 600)
THICCCBOI-Bold.ttf         (weight: 700)
THICCCBOI-ExtraBold.ttf    (weight: 800)
THICCCBOI-Black.ttf        (weight: 900)
```

### Font Usage in the Portfolio

- **Main Headings**: "NATHAN KIRSCHNER" uses THICCCBOI SemiBold (600)
- **Navigation**: Filter labels use THICCCBOI Medium (500)
- **Thumbnails**: "TITLE" labels use THICCCBOI SemiBold (600)
- **Body Text**: General content uses THICCCBOI Regular (400)
- **Detail Views**: Headings use THICCCBOI Medium (500)

## Playfair Display (Google Fonts)

Playfair Display is automatically loaded from Google Fonts and used for:

- **Tagline**: "pure mysticism" in italic style
- **Filter Label**: "filter:" in italic style
- **Thumbnail Tags**: Content type labels (project, experiment, insight)
- **Detail Descriptions**: Short descriptions in italic style

## Installation Steps

1. **Download THICCCBOI font files** in TTF format
2. **Copy all 9 weight files** to `portfolio/public/fonts/thicccboi/`
3. **Restart the development server** (`npm run dev`)
4. **Fonts will load automatically** through the Next.js font system

## Font Fallbacks

If THICCCBOI files are missing, the system will gracefully fallback to:
1. Geist (default Next.js font)
2. System fonts (-apple-system, BlinkMacSystemFont, etc.)

## File Format Support

- **TTF**: TrueType format used for THICCCBOI fonts
- **WOFF2**: Alternative format (smaller file size, better compression)
- **WOFF**: Alternative if WOFF2 not available

## Performance Notes

- All fonts use `display: swap` for optimal loading performance
- THICCCBOI is loaded as a local font (no external requests)
- Playfair Display is loaded from Google Fonts CDN
- Font files are automatically optimized by Next.js

## Licensing

Please ensure you have proper licensing for THICCCBOI font usage in your portfolio project.