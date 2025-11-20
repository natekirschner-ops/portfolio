# Center-Anchored Coordinate System

The portfolio uses a **center-anchored coordinate system** for intuitive positioning and predictable calculations across all components.

## 🎯 Core Concept

### Traditional System vs Center-Anchored
```
Traditional (top-left origin):     Center-Anchored:
┌─────────────────┐               ┌─────────────────┐
│(0,0)            │               │        │        │
│                 │               │   (-x,─y)  (+x,─y) │
│                 │               │────────┼────────│
│                 │               │   (-x,+y)  (+x,+y) │
│                 │               │        │  (0,0)  │
└─────────────────┘               └─────────────────┘
```

### Advantages
- **(0,0) = Screen center** - Natural reference point
- **Intuitive positioning** - Left = negative X, Right = positive X
- **Simplified calculations** - No viewport size dependencies  
- **Consistent anchoring** - All elements use center-based positioning
- **Predictable behavior** - Position values directly correlate to visual placement

## 🔧 Implementation

### 1. Thumbnail Positioning
```typescript
// FloatingThumbnail.tsx
const screenCenterX = window.innerWidth / 2;
const screenCenterY = window.innerHeight / 2;

const finalX = screenCenterX + item.position.x + viewportX;
const finalY = screenCenterY + item.position.y + viewportY;

// Apply with center offset for thumbnail centering
transform: `translate(${finalX - 192}px, ${finalY - 144}px)`
```

**How it works:**
- `item.position.x` = Center-relative coordinate (-500 to +500)
- `screenCenterX` = Current screen center (e.g., 960px on 1920px wide)
- `viewportX` = Canvas pan offset (changes during navigation)
- `-192px` = Half thumbnail width (384px / 2) for center anchoring

### 2. Canvas Navigation
```typescript
// useCanvasNavigation.ts
useEffect(() => {
  // Initialize at center - (0,0) viewport means content is centered
  setCanvasState((prev) => ({
    ...prev,
    viewportX: 0,
    viewportY: 0,
  }));
}, []);
```

**Reset behavior:**
- `panTo(0, 0)` = Return to center view
- No complex screen center calculations needed
- Consistent across all screen sizes

### 3. Border Calculations
```typescript
// FloatingCanvas.tsx
const screenCenterX = window.innerWidth / 2;
const screenCenterY = window.innerHeight / 2;

// Position border relative to screen center
left: screenCenterX + minX + canvasState.viewportX,
top: screenCenterY + minY + canvasState.viewportY,
```

## 📐 Coordinate Examples

### Current Portfolio Layout
With 6 items positioned around center:
```
                    Quantum Thoughts
                      (223, -729)
Neural Canvas                          Autonomous Gallery  
(-314, -645)                             (350, -374)

          NATHAN KIRSCHNER (0,0)
            pure mysticism

Distributed Dreams                    Paradox of Choice
(-632, 307)                            (727, 74)

                   Breathing Pixels
                    (-264, 698)
```

### Screen Translation
On 1920×1080 screen:
- **Center** = (960, 540)
- **Quantum Thoughts** at (223, -729) → Screen position: (1183, -189)
- **Breathing Pixels** at (-264, 698) → Screen position: (696, 1238)

## 🚧 Constraint Calculations

### Viewport Limits
```typescript
// When content bounds are calculated
const maxViewportX = -(screenCenterX + contentBounds.minX);
const minViewportX = screenWidth - (screenCenterX + contentBounds.maxX);
```

**Logic:**
- `contentBounds.minX` = Leftmost content edge (e.g., -950px)
- When viewport = `maxViewportX`, left content edge touches screen left (0px)
- When viewport = `minViewportX`, right content edge touches screen right

### Boundary Examples
For content spanning -950px to +950px on 1920px screen:
- `maxViewportX = -(960 + (-950)) = -10`
- `minViewportX = 1920 - (960 + 950) = 10`
- **Viewport range:** -10px to +10px (very constrained - content fits on screen)

For content spanning -1200px to +1200px:
- `maxViewportX = -(960 + (-1200)) = 240`
- `minViewportX = 1920 - (960 + 1200) = -240`  
- **Viewport range:** -240px to +240px (allows panning)

## 🎯 Benefits in Practice

### 1. **Intuitive Development**
```typescript
// Want item 200px right of center? Simply:
position: { x: 200, y: 0 }

// Want item in upper-left quadrant?
position: { x: -300, y: -400 }
```

### 2. **Responsive by Design**
- Same position values work on any screen size
- Center anchoring automatically adapts to viewport
- No manual responsive calculations needed

### 3. **Predictable Navigation**
- `panTo(100, 0)` always moves view 100px right of center
- `viewportX = 0, viewportY = 0` always shows centered content
- Constraints work consistently across screen sizes

### 4. **Simplified Bounds**
- Content bounds calculated directly from position values
- No complex viewport-relative calculations
- Border positioning uses same coordinate system

## 🔄 Migration Benefits

### Before (Traditional System)
- Complex screen center calculations
- Viewport-dependent positioning
- Inconsistent coordinate references
- Difficult constraint calculations

### After (Center-Anchored)
- Single source of truth: screen center
- Position values directly meaningful
- Consistent anchoring across components
- Simplified constraint logic

## 📋 Usage Guidelines

### Adding New Items
```typescript
// Close to center (first ring)
position: { x: 550, y: 0 }

// Second ring  
position: { x: 730, y: 200 }

// Upper quadrant
position: { x: 400, y: -500 }
```

### Debug Coordinates
Check console logs for:
```javascript
🔴 Center-Anchored Red Border Bounds: {
  positions: [{ x: 350, y: -374 }, ...],
  screenCenterX: 960,
  screenCenterY: 540,
  viewportX: 0,
  viewportY: 0
}
```

### Testing Boundaries
- Navigate to see red border edges
- Border edges should align with scroll limits
- Content should never extend beyond red border

---

The center-anchored system provides **intuitive positioning**, **predictable behavior**, and **simplified calculations** while maintaining the mystical aesthetic and organic feel of the portfolio.