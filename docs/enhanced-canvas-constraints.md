# Enhanced Canvas Constraints Documentation

This document describes the improved canvas scrolling constraints and red border system that ensures a minimum browsable area of browser width and height.

## Overview

The enhanced constraint system guarantees that users can always scroll to see an area at least as large as their browser window, even if the portfolio content doesn't naturally fill that space. This prevents the "trapped" feeling of having too small a scrollable area.

## Key Improvements

### 1. **Minimum Browser Dimensions**
- **Content bounds are expanded** to at least match browser window size
- **Red border grows** to encompass minimum browser width/height
- **Smooth scrolling experience** across all screen sizes
- **Responsive behavior** adapts to window resizing

### 2. **Enhanced Constraint Logic**
- **Content-based bounds**: Calculated from actual thumbnail positions
- **Browser-minimum bounds**: Ensures minimum scrollable area
- **Combined approach**: Takes the larger of content bounds or browser bounds
- **Center-anchored system**: All calculations relative to screen center

### 3. **Visual Feedback**
- **Red border** shows the exact scrollable area
- **Debug logging** for development troubleshooting
- **Constraint indicators** show when boundaries are hit

## Technical Implementation

### Content Bounds Calculation

```typescript
const getContentBounds = useCallback(() => {
  if (typeof window === "undefined") {
    return { minX: -500, maxX: 500, minY: -300, maxY: 300 };
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  if (portfolioItems.length === 0) {
    // Ensure minimum browser dimensions when no items
    return {
      minX: -screenWidth / 2,
      maxX: screenWidth / 2,
      minY: -screenHeight / 2,
      maxY: screenHeight / 2,
    };
  }

  const THUMBNAIL_WIDTH = 384;
  const THUMBNAIL_HEIGHT = 288;
  const PADDING = 100;

  const positions = portfolioItems.map((item) => item.position);
  
  // Calculate content bounds
  const contentMinX = Math.min(...positions.map((p) => p.x - THUMBNAIL_WIDTH / 2)) - PADDING;
  const contentMaxX = Math.max(...positions.map((p) => p.x + THUMBNAIL_WIDTH / 2)) + PADDING;
  const contentMinY = Math.min(...positions.map((p) => p.y - THUMBNAIL_HEIGHT / 2)) - PADDING;
  const contentMaxY = Math.max(...positions.map((p) => p.y + THUMBNAIL_HEIGHT / 2)) + PADDING;

  // Ensure bounds are at least browser width/height
  const minX = Math.min(contentMinX, -screenWidth / 2);
  const maxX = Math.max(contentMaxX, screenWidth / 2);
  const minY = Math.min(contentMinY, -screenHeight / 2);
  const maxY = Math.max(contentMaxY, screenHeight / 2);

  return { minX, maxX, minY, maxY };
}, [portfolioItems]);
```

### Viewport Constraints

The constraint system ensures the red border edges never go beyond the screen boundaries:

```typescript
const constrainViewport = useCallback((x: number, y: number) => {
  const contentBounds = getContentBounds();
  
  // Calculate limits so red border stays within screen
  const maxViewportX = -(screenCenterX + contentBounds.minX);
  const minViewportX = screenWidth - (screenCenterX + contentBounds.maxX);
  const maxViewportY = -(screenCenterY + contentBounds.minY);
  const minViewportY = screenHeight - (screenCenterY + contentBounds.maxY);

  const constrainedX = Math.max(minViewportX, Math.min(maxViewportX, x));
  const constrainedY = Math.max(minViewportY, Math.min(maxViewportY, y));

  return { x: constrainedX, y: constrainedY };
}, [getContentBounds]);
```

### Red Border Visualization

The red border uses identical logic to show the exact scrollable area:

```typescript
// Calculate bounds with minimum browser dimensions
const contentMinX = Math.min(...positions.map((p) => p.x - THUMBNAIL_WIDTH / 2)) - PADDING;
const contentMaxX = Math.max(...positions.map((p) => p.x + THUMBNAIL_WIDTH / 2)) + PADDING;
const contentMinY = Math.min(...positions.map((p) => p.y - THUMBNAIL_HEIGHT / 2)) - PADDING;
const contentMaxY = Math.max(...positions.map((p) => p.y + THUMBNAIL_HEIGHT / 2)) + PADDING;

// Ensure bounds are at least browser width/height
const minX = Math.min(contentMinX, -screenWidth / 2);
const maxX = Math.max(contentMaxX, screenWidth / 2);
const minY = Math.min(contentMinY, -screenHeight / 2);
const maxY = Math.max(contentMaxY, screenHeight / 2);
```

## Benefits

### User Experience
- **Never feel trapped** in a small scrollable area
- **Consistent scrolling behavior** across different screen sizes
- **Predictable boundaries** with visual red border feedback
- **Smooth navigation** without jarring constraint hits

### Developer Experience
- **Clear debugging output** showing constraint calculations
- **Consistent logic** between components
- **Responsive behavior** handles window resizing
- **Easy to modify** minimum dimensions if needed

## Configuration

### Adjustable Parameters

```typescript
// In content bounds calculation
const THUMBNAIL_WIDTH = 384;      // Thumbnail width
const THUMBNAIL_HEIGHT = 288;     // Thumbnail height
const PADDING = 100;             // Extra padding around content

// In generation script
const defaultWidth = 1200;       // Fallback browser width
const defaultHeight = 800;       // Fallback browser height
```

### Browser Support
- **Modern browsers** with `window.innerWidth/Height` support
- **Fallback dimensions** for SSR and older browsers
- **Responsive updates** on window resize events

## Debug Information

### Console Output

During development, the system logs detailed constraint information:

```
🚧 Enhanced Viewport Constraints (Min Browser Size): {
  input: { x: 150, y: -200 },
  contentBounds: { minX: -600, maxX: 600, minY: -400, maxY: 400 },
  screenSize: { screenWidth: 1920, screenHeight: 1080 },
  viewportLimits: {
    minViewportX: -360,
    maxViewportX: 360,
    minViewportY: -140,
    maxViewportY: 140
  },
  output: { x: 150, y: -140 },
  wasConstrained: { x: false, y: true },
  constraintType: { x: "none", y: "max" },
  ensuredMinimumBrowser: { width: 1920, height: 1080 }
}
```

```
🔴 Enhanced Red Border (Min Browser Size): {
  contentBounds: {
    contentMinX: -506,
    contentMaxX: 506,
    contentMinY: -400,
    contentMaxY: 400
  },
  finalBounds: { minX: -960, maxX: 960, minY: -540, maxY: 540 },
  dimensions: { width: 1920, height: 1080 },
  screenSize: { screenWidth: 1920, screenHeight: 1080 },
  ensuredMinimumBrowser: true
}
```

## Testing

### Verification Checklist
- [ ] Red border is always at least browser width/height
- [ ] Scrolling never feels constrained on any screen size
- [ ] Content is properly centered in available space
- [ ] Window resize updates constraints appropriately
- [ ] No content is ever unreachable due to constraints

### Test Scenarios
1. **Small content, large screen** - Border expands to screen size
2. **Large content, small screen** - Border matches content bounds
3. **Window resize** - Constraints update dynamically
4. **Mobile devices** - Touch scrolling respects boundaries
5. **Edge cases** - Empty content, single item, etc.

## Migration Notes

### From Previous System
- **Backward compatible** - existing positioning continues to work
- **Enhanced boundaries** - scrollable area is never smaller than before
- **Same API** - no changes to component interfaces
- **Improved UX** - users get more scrollable space, not less

### Performance Impact
- **Minimal overhead** - calculations happen only during navigation
- **Cached bounds** - content bounds calculated once per navigation session  
- **Efficient updates** - only recalculates when necessary
- **GPU acceleration** - animations use transform properties

## Future Enhancements

### Potential Improvements
- **Adaptive padding** based on screen size
- **Gesture-based boundaries** for touch devices
- **Smooth boundary transitions** when resizing
- **Custom minimum ratios** (e.g., 1.5x browser size)
- **Content-aware expansion** (more space for denser content)

### API Extensions
- **Configurable minimums** - allow setting custom minimum dimensions
- **Boundary callbacks** - trigger events when hitting constraints
- **Animation options** - customize constraint feedback animations
- **Accessibility modes** - enhanced boundaries for screen readers

The enhanced canvas constraints provide a robust, user-friendly scrolling experience that adapts to any screen size while maintaining the portfolio's mystical, floating aesthetic.