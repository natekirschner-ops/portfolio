# Custom Detail Views Guide

This guide explains how to create custom detail views for your portfolio items, allowing each project, experiment, or insight to have its own unique presentation while maintaining consistent UX patterns.

## Overview

The portfolio uses a dynamic detail view system where:
- Each portfolio item can have its own custom `DetailView.tsx` component
- Custom views are stored in their respective content folders
- A registry system manages which items have custom views
- Fallback to a default view if no custom view exists

## Quick Start

1. **Create the custom DetailView component** in your item's content folder
2. **Add it to the registry** in `src/components/custom-detail-views/index.ts`
3. **Test your implementation** by clicking the item in the portfolio

## File Structure

```
content/
├── projects/
│   └── my-project/
│       ├── content.json
│       ├── thumbnail.jpg
│       └── DetailView.tsx          # Custom detail view
├── experiments/
│   └── my-experiment/
│       ├── content.json
│       ├── thumbnail.jpg
│       └── DetailView.tsx          # Custom detail view
└── insights/
    └── my-insight/
        ├── content.json
        ├── thumbnail.jpg
        └── DetailView.tsx              # Custom detail view
```

## Creating a Custom Detail View

### 1. Create the Component

Create a new `DetailView.tsx` file in your item's content folder:

```tsx
"use client";

import { PortfolioItem } from "../../../src/types/portfolio";
import {
  ExtendedDetailViewProps,
  detailViewStyles,
  tagColors,
  statusColors,
  statusIcons,
} from "../../../src/types/detail-view";

export default function MyCustomDetailView({
  item,
  isOpen,
  onClose,
  animationState,
  handleBackdropClick,
}: ExtendedDetailViewProps) {
  if (!animationState.isVisible || !item) return null;

  const colors = tagColors[item.tag];

  return (
    <div
      className={`${detailViewStyles.backdrop} ${
        animationState.isContentVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className={detailViewStyles.backdropBlur} />

      {/* Modal container */}
      <div
        className={`${detailViewStyles.modal} ${
          animationState.isContentVisible
            ? "scale-100 translate-y-0"
            : "scale-95 translate-y-4"
        }`}
      >
        {/* Close button */}
        <button onClick={onClose} className={detailViewStyles.closeButton}>
          ✕
        </button>

        {/* Content */}
        <div className={detailViewStyles.scrollContent}>
          {/* Header section */}
          <div className={detailViewStyles.header}>
            {/* Background glow */}
            <div
              className={detailViewStyles.headerGlow}
              style={{
                background: `radial-gradient(ellipse at top, ${colors.gradient}20, transparent 70%)`,
              }}
            />

            <div className={detailViewStyles.headerContent}>
              {/* Tag and status */}
              <div className={detailViewStyles.tagAndStatus}>
                <span className={detailViewStyles.tag}>{item.tag}</span>
                <div className={detailViewStyles.status}>
                  {item.metadata?.date && <span>{item.metadata.date}</span>}
                  {item.metadata?.status && (
                    <div className="flex items-center space-x-1">
                      <span className={statusColors[item.metadata.status]}>
                        {statusIcons[item.metadata.status]}
                      </span>
                      <span className={statusColors[item.metadata.status]}>
                        {item.metadata.status.replace("-", " ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <h1 className={detailViewStyles.title}>{item.title}</h1>

              {/* Short description */}
              {item.shortDescription && (
                <p className={detailViewStyles.shortDescription}>
                  {item.shortDescription}
                </p>
              )}
            </div>
          </div>

          {/* Main content - CUSTOMIZE THIS SECTION */}
          <div className={detailViewStyles.content}>
            {/* Your custom content goes here */}
            <div className="mb-8">
              <h3 className="text-xl font-thicccboi font-medium text-gray-900 mb-4">
                Custom Section
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Add your unique content, interactive elements, visualizations,
                or any other custom presentation here.
              </p>
            </div>

            {/* Standard sections (optional) */}
            {item.metadata?.technologies && (
              <div className="mb-8">
                <h3 className="font-thicccboi text-gray-900 text-lg font-medium mb-4">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.metadata.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1.5 bg-${item.tag === 'projects' ? 'blue' : item.tag === 'experiments' ? 'purple' : 'amber'}-100 hover:bg-${item.tag === 'projects' ? 'blue' : item.tag === 'experiments' ? 'purple' : 'amber'}-200 text-${item.tag === 'projects' ? 'blue' : item.tag === 'experiments' ? 'purple' : 'amber'}-700 text-sm font-thicccboi rounded-full border border-${item.tag === 'projects' ? 'blue' : item.tag === 'experiments' ? 'purple' : 'amber'}-200 hover:border-${item.tag === 'projects' ? 'blue' : item.tag === 'experiments' ? 'purple' : 'amber'}-300 transition-colors duration-200`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {item.links && item.links.length > 0 && (
              <div className="mb-8">
                <h3 className="font-thicccboi text-gray-900 text-lg font-medium mb-4">
                  Links
                </h3>
                <div className="flex flex-wrap gap-3">
                  {item.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-${item.tag === 'projects' ? 'blue' : item.tag === 'experiments' ? 'purple' : 'amber'}-500 to-${item.tag === 'projects' ? 'purple' : item.tag === 'experiments' ? 'pink' : 'orange'}-500 hover:from-${item.tag === 'projects' ? 'blue' : item.tag === 'experiments' ? 'purple' : 'amber'}-600 hover:to-${item.tag === 'projects' ? 'purple' : item.tag === 'experiments' ? 'pink' : 'orange'}-600 text-white rounded-lg transition-all duration-200 text-sm font-thicccboi font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                    >
                      {link.label}
                      <span className="ml-2 text-xs">
                        {item.tag === 'projects' ? '🎨' : item.tag === 'experiments' ? '🧠' : '⚛'}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation hint */}
        <div className={detailViewStyles.navigationHint}>
          Press ESC to close
        </div>
      </div>
    </div>
  );
}
```

### 2. Add to Registry

Update `src/components/custom-detail-views/index.ts`:

```tsx
export const customDetailViews: Record<
  string,
  () => Promise<{ default: DetailViewComponent }>
> = {
  // ... existing entries

  // Add your new custom view
  "my-item-id": () => import("../../../content/category/my-item-id/DetailView"),
};
```

### 3. Test Your Implementation

1. Run `npm run dev`
2. Click on your portfolio item
3. Verify your custom detail view loads correctly

## Available Resources

### Props Interface

Your component receives `ExtendedDetailViewProps`:

```tsx
interface ExtendedDetailViewProps {
  item: PortfolioItem;              // The portfolio item data
  isOpen: boolean;                  // Whether the modal is open
  onClose: () => void;              // Function to close the modal
  animationState: {                 // Animation state
    isVisible: boolean;
    isContentVisible: boolean;
  };
  handleBackdropClick: (e: React.MouseEvent) => void;  // Handle backdrop clicks
}
```

### Styling Utilities

Use `detailViewStyles` for consistent styling:

- `detailViewStyles.backdrop` - Modal backdrop
- `detailViewStyles.modal` - Modal container
- `detailViewStyles.closeButton` - Close button
- `detailViewStyles.header` - Header section
- `detailViewStyles.content` - Main content area
- `detailViewStyles.navigationHint` - Bottom navigation text

### Color Schemes

Use `tagColors` for consistent theming:

```tsx
const colors = tagColors[item.tag];
// colors.gradient - Hex color for gradients
// colors.accent - Text accent color class
// colors.section - Background gradient classes
```

## Examples

The portfolio includes three example custom detail views:

1. **Autonomous Art Gallery** (`content/projects/autonomous-art-gallery/DetailView.tsx`)
   - Gallery showcase grid
   - AI curation insights
   - Technical architecture section

2. **Neural Canvas** (`content/experiments/neural-canvas/DetailView.tsx`)
   - Interactive canvas demonstration
   - Neural processing pipeline
   - Performance metrics

3. **Quantum Thoughts** (`content/insights/quantum-thoughts/DetailView.tsx`)
   - Quantum consciousness visualization
   - Philosophical exploration
   - Thought experiments

## Best Practices

### 1. Maintain UX Consistency
- Always use the standard header structure
- Include the close button and navigation hint
- Handle backdrop clicks and escape key

### 2. Follow Visual Hierarchy
- Use consistent typography classes (`font-thicccboi`, `font-playfair`)
- Maintain proper spacing with margin utilities
- Use tag-specific color schemes

### 3. Optimize Performance
- Keep components lightweight
- Avoid heavy computations in render
- Use proper React patterns

### 4. Accessibility
- Ensure keyboard navigation works
- Include proper ARIA labels if needed
- Support reduced motion preferences

### 5. Responsive Design
- Test on different screen sizes
- Use responsive grid classes (`md:grid-cols-2`, etc.)
- Consider mobile-first design

## Common Patterns

### Interactive Elements

```tsx
// Hover effects
<div className="group cursor-pointer">
  <div className="group-hover:scale-105 transition-transform">
    Content
  </div>
</div>

// Loading states
<div className="animate-pulse bg-gray-200 h-4 rounded"></div>

// Progress indicators
<div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
```

### Grid Layouts

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <div key={item.id}>Content</div>
  ))}
</div>
```

### Gradients and Effects

```tsx
// Background gradients
<div className="bg-gradient-to-br from-blue-50 to-purple-50">

// Border gradients
<div className="bg-gradient-to-r from-blue-500 to-purple-600">

// Backdrop blur
<div className="backdrop-blur-md bg-white/90">
```

## Troubleshooting

### Component Not Loading
1. Check the file path in the registry
2. Ensure the component exports as default
3. Verify there are no TypeScript errors

### Styling Issues
1. Make sure Tailwind classes are available
2. Check for conflicting styles
3. Use browser dev tools to debug

### Animation Problems
1. Verify `animationState` is being used correctly
2. Check CSS transition classes
3. Ensure proper timing for state changes

## Next Steps

Once you've created your custom detail view:

1. **Test thoroughly** across different devices and browsers
2. **Gather feedback** from users about the presentation
3. **Iterate and improve** based on user experience
4. **Document any special features** for future reference

Your custom detail views are a powerful way to showcase each portfolio item with the unique presentation it deserves while maintaining the overall cohesive experience of your portfolio.