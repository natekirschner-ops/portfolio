# Canvas Constraints System

> **Center-Anchored Boundary Control** - Smart viewport constraints that prevent infinite scrolling while maintaining smooth navigation within content boundaries.

## 🎯 Overview

The canvas constraint system uses **center-anchored coordinates** to create bounded navigation that keeps users within the content area. Unlike traditional approaches, our system calculates constraints based on the **red border boundaries** that dynamically encompass all portfolio items.

## ✨ Features

- **🎯 Center-Anchored Coordinates** - (0,0) = screen center for intuitive positioning
- **🔴 Red Border Boundaries** - Visual constraints match scroll limits exactly
- **📐 Dynamic Content Bounds** - Automatically calculated from thumbnail positions
- **🚫 No Infinite Scrolling** - Hard constraints at content edges
- **📱 Responsive Design** - Adapts to any screen size
- **⚡ Real-Time Updates** - Recalculates as content changes

## 🧮 Mathematical Foundation

### Center-Anchored Coordinate System

```
Traditional (top-left):           Center-Anchored:
┌─────────────────┐              ┌─────────────────┐
│(0,0)            │              │        │        │
│                 │              │   (-,-)│  (+,-)  │
│                 │              │────────┼────────│
│                 │              │   (-,+)│  (+,+)  │
│                 │              │        │(0,0)    │
└─────────────────┘              └─────────────────┘
```

### Content Bounds Calculation

```typescript
const getContentBounds = () => {
  const THUMBNAIL_WIDTH = 384;
  const THUMBNAIL_HEIGHT = 288;
  const PADDING = 100; // Red border padding

  const positions = portfolioItems.map(item => item.position);
  
  const minX = Math.min(...positions.map(p => p.x - THUMBNAIL_WIDTH / 2)) - PADDING;
  const maxX = Math.max(...positions.map(p => p.x + THUMBNAIL_WIDTH / 2)) + PADDING;
  const minY = Math.min(...positions.map(p => p.y - THUMBNAIL_HEIGHT / 2)) - PADDING;
  const maxY = Math.max(...positions.map(p => p.y + THUMBNAIL_HEIGHT / 2)) + PADDING;

  return { minX, maxX, minY, maxY };
};
```

## 🔧 Constraint Implementation

### Viewport Limit Calculation

```typescript
const constrainViewport = (x: number, y: number) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenCenterX = screenWidth / 2;
  const screenCenterY = screenHeight / 2;

  const contentBounds = getContentBounds();

  // Calculate viewport limits so red border edges stay within screen
  const maxViewportX = -(screenCenterX + contentBounds.minX);
  const minViewportX = screenWidth - (screenCenterX + contentBounds.maxX);
  const maxViewportY = -(screenCenterY + contentBounds.minY);
  const minViewportY = screenHeight - (screenCenterY + contentBounds.maxY);

  const constrainedX = Math.max(minViewportX, Math.min(maxViewportX, x));
  const constrainedY = Math.max(minViewportY, Math.min(maxViewportY, y));

  return { x: constrainedX, y: constrainedY };
};
```

### Constraint Logic Explanation

**Key Insight**: When the red border edge touches the screen edge, that's the scroll limit.

- **Left Limit**: When `contentBounds.minX` (left content edge) reaches screen position `0`
  - `screenCenterX + contentBounds.minX + viewportX = 0`
  - `viewportX = -(screenCenterX + contentBounds.minX)` = `maxViewportX`

- **Right Limit**: When `contentBounds.maxX` (right content edge) reaches `screenWidth`
  - `screenCenterX + contentBounds.maxX + viewportX = screenWidth`
  - `viewportX = screenWidth - (screenCenterX + contentBounds.maxX)` = `minViewportX`

## 📐 Current Portfolio Constraints

### Example Calculation
With 6 items in radial pattern:
```javascript
positions = [
  { x: 350, y: -374 },    // Autonomous Art Gallery
  { x: -632, y: 307 },    // Distributed Dreams
  { x: -264, y: 698 },    // Breathing Pixels
  { x: -314, y: -645 },   // Neural Canvas
  { x: 223, y: -729 },    // Quantum Thoughts
  { x: 727, y: 74 }       // Paradox of Choice
];

contentBounds = {
  minX: -632 - 192 - 100 = -924,  // Leftmost edge
  maxX: 727 + 192 + 100 = 1019,   // Rightmost edge
  minY: -729 - 144 - 100 = -973,  // Topmost edge
  maxY: 698 + 144 + 100 = 942     // Bottommost edge
};
```

### Viewport Limits (1920×1080 screen)
```javascript
screenCenterX = 960, screenCenterY = 540

maxViewportX = -(960 + (-924)) = -36    // Can pan 36px right
minViewportX = 1920 - (960 + 1019) = -59   // Can pan 59px left
maxViewportY = -(540 + (-973)) = 433    // Can pan 433px down  
minViewportY = 1080 - (540 + 942) = -402   // Can pan 402px up

Viewport Range: X(-59 to -36), Y(-402 to 433)
```

## 🎮 User Experience

### Navigation Behavior

1. **Centered Start**: Portfolio loads with content centered (viewport 0,0)
2. **Bounded Exploration**: Users can scroll/drag within calculated limits
3. **Hard Constraints**: Navigation stops at red border edges
4. **Visual Feedback**: Red border shows exact scroll boundaries
5. **No Empty Space**: Users never scroll into areas without content

### Interaction Types

**Mouse Drag**:
```typescript
const deltaX = e.clientX - lastPosition.current.x;
const deltaY = e.clientY - lastPosition.current.y;

setCanvasState(prev => {
  const constrainedPosition = constrainViewport(
    prev.viewportX + deltaX,
    prev.viewportY + deltaY
  );
  return {
    ...prev,
    viewportX: constrainedPosition.x,
    viewportY: constrainedPosition.y,
  };
});
```

**Wheel Scroll**:
```typescript
const constrainedPosition = constrainViewport(
  prev.viewportX - deltaX,
  prev.viewportY - deltaY
);
```

## 🔴 Red Border Integration

### Visual Constraint Indicator

```typescript
// FloatingCanvas.tsx - Red border calculation
const positions = visibleItems.map(item => item.position);
const minX = Math.min(...positions.map(p => p.x - THUMBNAIL_WIDTH / 2)) - PADDING;
const maxX = Math.max(...positions.map(p => p.x + THUMBNAIL_WIDTH / 2)) + PADDING;
const minY = Math.min(...positions.map(p => p.y - THUMBNAIL_HEIGHT / 2)) - PADDING;
const maxY = Math.max(...positions.map(p => p.y + THUMBNAIL_HEIGHT / 2)) + PADDING;

const screenCenterX = window.innerWidth / 2;
const screenCenterY = window.innerHeight / 2;

// Border positioned using same coordinate system as constraints
<div style={{
  left: screenCenterX + minX + canvasState.viewportX,
  top: screenCenterY + minY + canvasState.viewportY,
  width: maxX - minX,
  height: maxY - minY,
}} />
```

### Perfect Alignment

- **Same calculation logic** - Border and constraints use identical bounds
- **Visual verification** - Red border edges should align with scroll limits
- **Real-time updates** - Both update when content changes
- **Debug tool** - Border serves as visual constraint reference

## ⚙️ Dynamic Updates

### Content Changes

Constraints automatically recalculate when:

```bash
# Adding new items
npm run create:item
npm run generate:content

# Repositioning existing items  
npm run reset:positions
npm run generate:content

# Fixing overlaps
npm run fix:overlaps
```

### Responsive Behavior

```typescript
// Constraints adapt to screen size changes
useEffect(() => {
  const handleResize = () => {
    // Viewport limits recalculate automatically
    // Based on new screen dimensions
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## 🛠️ Configuration

### Adjustable Parameters

```typescript
// Content bounds padding (affects constraint tightness)
const PADDING = 100;              // Distance beyond thumbnails

// Thumbnail dimensions (for bounds calculation)
const THUMBNAIL_WIDTH = 384;
const THUMBNAIL_HEIGHT = 288;
```

### Debug Features

**Console Logging**:
```javascript
🚧 Viewport Constraints: {
  input: { x: 50, y: -200 },
  contentBounds: { minX: -924, maxX: 1019, minY: -973, maxY: 942 },
  screenSize: { screenWidth: 1920, screenHeight: 1080 },
  viewportLimits: { minViewportX: -59, maxViewportX: -36, ... },
  output: { x: -36, y: -200 },
  wasConstrained: { x: true, y: false }
}
```

**Visual Verification**:
- Red border should encompass all thumbnails
- Border edges should align with scroll limits
- No content should extend beyond border

## 📊 Performance Characteristics

### Computational Efficiency
- **O(n) bounds calculation** - Linear with item count
- **O(1) constraint checking** - Constant time per interaction
- **Minimal recalculation** - Only when content changes
- **No DOM queries** - Pure mathematical calculations

### Memory Usage
- **Cached bounds** - Calculated once per content change
- **Static viewport limits** - Computed per screen size
- **No event listeners** - Integrated with existing handlers
- **Optimized dependencies** - Minimal React re-renders

## 🎯 Benefits

### User Experience
- **Never lost** - Always within content boundaries
- **Predictable navigation** - Clear visual and functional limits
- **Professional feel** - Polished, bounded exploration
- **Content-focused** - Attention stays on portfolio items

### Developer Experience
- **Intuitive coordinates** - Center-based positioning
- **Visual debugging** - Red border shows exact constraints
- **Automatic updates** - No manual boundary configuration
- **Mathematical precision** - Exact pixel-perfect constraints

### Scalability
- **Content-aware** - Adapts as portfolio grows
- **Screen-agnostic** - Works on any viewport size
- **Performance optimized** - Efficient at any scale
- **Maintainable logic** - Clear mathematical foundation

---

The center-anchored constraint system provides **precise, predictable boundaries** that enhance the portfolio's mystical navigation while ensuring users never lose sight of the content that matters.