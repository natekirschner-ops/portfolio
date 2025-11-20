# Exposed

A powerful web application that exposes hidden data patterns and insights through interactive visualizations and real-time analytics.

## Assets

- `thumbnail.mp4` - Main thumbnail video (currently used as banner in detail view)
- `outside-icon.png` - Custom icon for Outside Magazine link
- `gallery-1.jpg` - Dashboard interface screenshot
- `gallery-2.jpg` - Advanced filtering interface screenshot  
- `demo-video.mp4` - Interactive demonstration video
- `demo-poster.jpg` - Video poster image

## Media Gallery System

This project demonstrates the **Media Gallery** feature that allows adding multiple images and videos below the description. The gallery is controlled through the `media` array in `content.json`.

### Gallery Configuration

```json
{
  "media": [
    {
      "type": "image",
      "src": "gallery-1.jpg",
      "alt": "Dashboard interface showing real-time analytics",
      "caption": "Main dashboard with real-time data visualization and filtering controls",
      "aspectRatio": "video"
    },
    {
      "type": "video", 
      "src": "demo-video.mp4",
      "alt": "demo-poster.jpg",
      "caption": "Interactive demonstration of the data exploration workflow"
    },
    {
      "type": "image",
      "src": "gallery-2.jpg", 
      "alt": "Advanced filtering interface",
      "caption": "Advanced filtering system allowing complex data queries",
      "aspectRatio": "square"
    }
  ]
}
```

### Media Item Properties

- **`type`**: `"image"` or `"video"` (required)
- **`src`**: File name relative to project directory (required)
- **`alt`**: Alt text for images, poster image for videos (optional)
- **`caption`**: Text displayed below media item (optional)
- **`aspectRatio`**: `"video"` (16:9), `"square"` (1:1), `"portrait"` (3:4), `"auto"` (optional, defaults to "video")

### Advanced Gallery Options

For more control, use the gallery object format:

```json
{
  "media": {
    "layout": "grid",
    "columns": 3,
    "items": [
      // ... media items array
    ]
  }
}
```

- **`layout`**: `"grid"`, `"masonry"`, or `"carousel"` (defaults to "grid")
- **`columns`**: 1, 2, 3, or 4 columns (defaults to 2)
- **`items`**: Array of media items

## Markdown Formatting Support

This project demonstrates **Markdown formatting** in descriptions. You can use rich text formatting directly in the `description` field of `content.json`:

### Supported Formatting

- **Bold text** using `**bold**`
- *Italic text* using `*italic*`
- **Headings** using `# H1`, `## H2`, `### H3`
- Lists using `-` or `*`
- Line breaks using `\n\n`

### Example Description

```json
{
  "description": "A **powerful web application** that exposes hidden data patterns and insights through *interactive visualizations* and real-time analytics.\n\n**Key Features:**\n- Dynamic data processing and visualization\n- Real-time analytics dashboard\n- **Advanced filtering** and search capabilities\n- Export functionality for reports\n\nBuilt to handle complex datasets with *performance* and *scalability* in mind."
}
```

## Dynamic Icons

This project demonstrates the dynamic icon feature for action buttons. Each link in the `content.json` can have a custom icon:

```json
"links": [
  {
    "icon": "outside-icon.png",
    "label": "Outside Magazine", 
    "url": "#"
  }
]
```

## Icon Guidelines

- **Format**: SVG preferred for crisp scaling, PNG/JPG also supported
- **Size**: 16x16px to 24x24px recommended
- **Style**: Simple, monochromatic icons work best
- **Fallback**: If no icon is provided, defaults to `↗` arrow

## Custom Layout

To create a custom detail view layout for this item:
1. Create `DetailView.tsx` in `src/components/custom-detail-views/exposed/`
2. Add import to `src/components/custom-detail-views/index.ts`
3. Follow the `ExtendedDetailViewProps` interface

## File Structure

```
public/content/projects/exposed/
├── content.json           # Main configuration with media gallery
├── thumbnail.mp4         # Banner video
├── outside-icon.png      # Custom link icon
├── gallery-1.jpg         # Gallery image 1
├── gallery-2.jpg         # Gallery image 2
├── demo-video.mp4        # Gallery video
├── demo-poster.jpg       # Video poster
└── README.md            # This file
```

## Metadata

- **Type**: Project
- **Status**: In Progress
- **Technologies**: React, D3.js, Node.js, PostgreSQL (hidden with `hideToolset: true`)
- **Date**: 2024
- **Features**: Media Gallery (3 items), Custom Icons, Markdown Description