# Getting Started

Welcome to the Nathan Kirschner Portfolio development guide! This interactive portfolio showcases projects, experiments, and insights through a mystical floating canvas experience.

## 🚀 Quick Setup

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - For version control
- **Code Editor** - VS Code recommended

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 First Steps

### Explore the Canvas
- **Mouse/Trackpad**: Click and drag to navigate the floating canvas
- **Scroll**: Use scroll wheel for smooth navigation
- **Click Thumbnails**: Open detailed views of projects/experiments/insights

### Understanding the Layout
- **Center**: Your name and "pure mysticism" tagline (protected area)
- **Floating Items**: 14 portfolio items distributed organically around the center
- **Navigation**: Smooth 2D movement with momentum and constraints

## 📁 Project Structure Overview

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/
│   │   ├── FloatingCanvas.tsx  # Main canvas component
│   │   ├── FloatingThumbnail.tsx # Individual thumbnail
│   │   ├── DetailView.tsx      # Modal detail views
│   │   └── FilterBar.tsx       # Tag filtering
│   ├── hooks/
│   │   └── useCanvasNavigation.ts # Canvas movement logic
│   ├── data/
│   │   └── generated-portfolio.ts # Auto-generated content
│   └── types/
│       └── portfolio.ts        # TypeScript definitions
├── content/                    # Content management system
│   ├── projects/              # Production work
│   ├── experiments/           # Exploratory projects
│   └── insights/             # Written reflections
├── scripts/                   # Content management tools
└── docs/                     # Documentation
```

## 🎨 Understanding the Content System

### Content Types
- **Projects (◉)** - Complete applications and professional work
- **Experiments (◈)** - Prototypes, creative coding, explorations
- **Insights (◊)** - Written pieces, philosophy, reflections

### Content Structure
Each item lives in its own folder:
```
content/experiments/neural-canvas/
├── content.json        # Metadata, description, links
├── thumbnail.jpg      # 384×288px thumbnail image
├── hero-image.jpg     # Optional full-size image
└── README.md         # Development notes
```

### Content.json Schema
```json
{
  "id": "neural-canvas",
  "title": "Neural Canvas", 
  "description": "Detailed description for modal views...",
  "shortDescription": "Brief tagline for thumbnails",
  "thumbnailUrl": "thumbnail.jpg",
  "imageUrl": "hero-image.jpg",
  "links": [
    { "label": "Live Demo", "url": "https://..." },
    { "label": "GitHub", "url": "https://..." }
  ],
  "position": { "x": -800, "y": -500 },
  "metadata": {
    "date": "2024",
    "technologies": ["TensorFlow.js", "WebGL", "React"],
    "status": "completed"
  }
}
```

## 🛠️ Development Workflow

### Adding New Content

**Method 1: Interactive CLI (Recommended)**
```bash
npm run create:item
```
This guides you through:
- Title and descriptions
- Tag selection (project/experiment/insight)
- Technologies and metadata
- Automatic folder and file creation

**Method 2: Manual Creation**
```bash
# 1. Create directory
mkdir content/experiments/my-new-experiment

# 2. Create content.json (see schema above)
# 3. Add thumbnail.jpg (384×288px recommended)
# 4. Generate portfolio data
npm run generate:content
```

### Content Management Commands
```bash
npm run create:item          # Add new portfolio item
npm run generate:content     # Generate portfolio data from content files
npm run fix:overlaps        # Fix overlapping thumbnails
npm run dev                 # Start development server
npm run build              # Build for production
```

### Development Cycle
1. **Add/Edit Content** - Use CLI or edit files directly
2. **Generate Data** - `npm run generate:content`
3. **Check Spacing** - `npm run fix:overlaps` (if needed)
4. **Test Locally** - `npm run dev`
5. **Build & Deploy** - `npm run build`

## 🎯 Key Concepts

### Canvas Navigation
- **Viewport Position**: Current view center (x, y coordinates)
- **Dragging**: Mouse/touch dragging moves the viewport
- **Momentum**: Smooth deceleration after drag release
- **Constraints**: Viewport bounded to prevent excessive movement
- **Smooth Scrolling**: Scroll wheel provides alternate navigation

### Positioning System
- **Canvas Bounds**: -1200px to +1400px (X), -700px to +700px (Y)
- **Central Exclusion**: -400px to +400px (X), -200px to +200px (Y)
- **Thumbnail Size**: 384×288px with 40px minimum spacing
- **Auto-Generation**: Items with position (0,0) get automatic safe placement
- **Collision Detection**: Prevents overlapping thumbnails

### Content Generation
- **Build-Time Processing**: Content read from folders during build
- **Automatic Positioning**: Safe placement for new items
- **Asset URLs**: Automatically generated from folder structure
- **Type Safety**: Full TypeScript integration

## 🎨 Styling & Theming

### Design System
- **Typography**: `font-thicccboi` for headings, `font-playfair` for elegance
- **Colors**: Neutral grays with subtle accents
- **Layout**: Floating, non-grid organic positioning
- **Animations**: Smooth CSS transitions, no JavaScript animations
- **Responsive**: Adapts to different screen sizes

### Customization
- **Thumbnail Appearance**: Edit `FloatingThumbnail.tsx`
- **Canvas Behavior**: Modify `useCanvasNavigation.ts`
- **Detail Modals**: Customize `DetailView.tsx`
- **Colors & Fonts**: Update Tailwind configuration

## 🔧 Common Tasks

### Changing Thumbnail Positions
```bash
# Edit content/{tag}/{slug}/content.json
# Change "position": { "x": newX, "y": newY }
npm run generate:content
```

### Adding Custom Modal Layouts
Create `layout.tsx` in any content directory:
```tsx
// content/experiments/my-item/layout.tsx
export default function CustomLayout({ item, onClose }) {
  return (
    <div>
      {/* Custom layout specific to this item */}
    </div>
  );
}
```

### Bulk Content Updates
```bash
# Make changes to multiple content.json files
npm run fix:overlaps        # Fix any spacing issues
npm run generate:content    # Regenerate data
```

## 🚨 Troubleshooting

### Content Not Appearing
1. Check `content.json` syntax (valid JSON)
2. Ensure directory structure is correct
3. Run `npm run generate:content` manually
4. Check console for error messages

### Thumbnail Overlapping
```bash
npm run fix:overlaps    # Automatically fixes spacing issues
```

### Build Errors
1. Validate all `content.json` files
2. Check required fields (id, title, description, thumbnailUrl)
3. Ensure TypeScript types match

### Asset Loading Issues
```bash
# Update public directory with latest content
cp -r content public/
```

## 📈 Performance Tips

### Optimizing Images
- **Thumbnails**: 384×288px, optimized JPEGs
- **Hero Images**: Reasonable file sizes (< 2MB)
- **Format**: Use WebP for better compression when possible

### Content Organization
- **Consistent Naming**: Use lowercase, hyphenated slugs
- **Reasonable Description Length**: 2-3 paragraphs maximum
- **Technology Lists**: Focus on most relevant/impressive tech

## 🎉 Next Steps

Once you're comfortable with the basics:
1. **[Content System Guide](content-system.md)** - Deep dive into content management
2. **[Canvas Navigation](canvas-navigation.md)** - Understanding the floating system
3. **[Architecture Guide](architecture.md)** - System design and patterns
4. **[API Reference](api-reference.md)** - Component documentation

## 💡 Tips for Success

### Content Strategy
- **Projects**: Focus on completed, professional work
- **Experiments**: Showcase learning process and creativity
- **Insights**: Share unique perspectives and experiences

### Visual Consistency
- **High-quality thumbnails** make a strong first impression
- **Consistent description length** maintains visual rhythm
- **Professional asset quality** reflects portfolio standards

### Technical Excellence
- **Regular validation** prevents deployment issues
- **Consistent commits** maintain project history
- **Documentation updates** help future development

---

**Ready to start building your mystical portfolio experience!** ✨

For questions or issues, check the other documentation files or the troubleshooting guide.