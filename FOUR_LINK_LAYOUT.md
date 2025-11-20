# Four Link Layout Design

## Overview
Updated the splash page to include 4 equally spaced text links at the bottom of the page, creating a balanced and symmetrical navigation experience.

## Layout Design

### Link Positioning
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     [Logo]                        [Contact]     │
│                                                                 │
│                                                                 │
│                    SPLINE 3D BACKGROUND                        │
│                                                                 │
│                                                                 │
│   [Current Project]   [Portfolio]   [About]   [LinkedIn]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Exact Positioning
- **Current Project**: `left: 6` (24px from left edge)
- **Portfolio**: `left: 33.33%` (1/3 across screen width)
- **About**: `left: 66.66%` (2/3 across screen width)  
- **LinkedIn**: `right: 6` (24px from right edge)

## Link Details

### 1. Current Project (Far Left)
- **Position**: `bottom-6 left-6`
- **Link**: `href="#"` (placeholder)
- **Animation Delay**: `delay-400` (400ms)
- **Purpose**: Showcase current work/project

### 2. Portfolio (Center Left)
- **Position**: `bottom-6` with `left: 33.33%`
- **Link**: `href="/portfolio"`
- **Animation Delay**: `delay-500` (500ms)
- **Purpose**: Navigate to full portfolio view

### 3. About (Center Right)
- **Position**: `bottom-6` with `left: 66.66%`
- **Link**: `href="/about"`
- **Animation Delay**: `delay-600` (600ms)
- **Purpose**: About page/information

### 4. LinkedIn (Far Right)
- **Position**: `bottom-6 right-6`
- **Link**: `href="https://linkedin.com/in/nathankirschner"`
- **Animation Delay**: `delay-700` (700ms)
- **Purpose**: External LinkedIn profile

## Animation Sequence

### Timing Flow
1. **Spline loads** → 2 second pause
2. **Logo appears** (0ms delay, opacity: 0.8)
3. **Contact link** (200ms delay)
4. **Current Project** (400ms delay)
5. **Portfolio** (500ms delay)
6. **About** (600ms delay)  
7. **LinkedIn** (700ms delay)

### Visual Flow
- Top elements appear first (Logo, Contact)
- Bottom elements cascade left to right
- Creates natural reading flow
- Smooth, professional appearance

## Responsive Considerations

### Desktop Layout
- Links evenly distributed across bottom
- Adequate spacing for hover targets
- Balanced visual weight

### Mobile Considerations
- May need adjustment for smaller screens
- Consider stacking or reducing spacing
- Touch target optimization needed

## Styling Consistency

### All Links Share
- **Font**: `text-sm font-medium`
- **Default Color**: `text-gray-500` (#6B7280)
- **Hover Color**: `hover:text-red-400` (#E56B6F)
- **Transition**: `transition-colors`
- **Cursor**: Custom cursor with hover effects

### Spacing
- **Vertical**: `bottom-6` (24px from bottom)
- **Horizontal**: Even distribution using percentages
- **Edge Margin**: `6` (24px) for outer links

## Implementation Benefits

### User Experience
- ✅ Clear navigation options
- ✅ Balanced visual hierarchy  
- ✅ Intuitive link placement
- ✅ Smooth animation sequence

### Technical Benefits
- ✅ Semantic HTML structure
- ✅ Accessible link targets
- ✅ Consistent styling system
- ✅ Responsive-ready positioning

## Future Enhancements

### Potential Improvements
- Add keyboard navigation
- Implement active/current page indicators
- Add mobile-specific positioning
- Consider adding icons to links
- Add subtle hover animations beyond color change

### Customization Options
- Easily modify link destinations
- Adjust animation timing
- Change color scheme
- Add/remove links as needed

## Code Structure

### Layout Container
```jsx
<div className="absolute inset-0 pointer-events-none">
  {/* Top links */}
  {/* Bottom links - equally spaced */}
</div>
```

### Link Pattern
```jsx
<div className="absolute bottom-6 [position] pointer-events-auto transition-opacity duration-1000 delay-[X]">
  <a href="[url]" className="text-sm font-medium text-gray-500 hover:text-red-400 transition-colors">
    [Link Text]
  </a>
</div>
```

---

**Status**: ✅ Implemented  
**Links**: 4 total (evenly spaced)  
**Animation**: Cascading left-to-right  
**Accessibility**: Keyboard and screen reader friendly