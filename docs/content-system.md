# Portfolio Content Management System

A folder-based content management system for easily adding and organizing projects, experiments, and insights in your portfolio.

## 📁 Folder Structure

```
portfolio/
├── content/                          # Content directory
│   ├── projects/                     # Production applications & systems
│   │   ├── project-slug/
│   │   │   ├── content.json         # Item metadata & content
│   │   │   ├── thumbnail.jpg        # Thumbnail image (384x288px)
│   │   │   ├── hero-image.jpg       # Optional hero image
│   │   │   ├── layout.tsx          # Optional custom modal layout
│   │   │   └── README.md           # Documentation & notes
│   │   └── ...
│   ├── experiments/                  # Exploratory technical work
│   │   ├── experiment-slug/
│   │   │   ├── content.json
│   │   │   ├── thumbnail.jpg
│   │   │   ├── demo-video.mp4      # Optional demo video
│   │   │   └── ...
│   │   └── ...
│   └── insights/                     # Written reflections & philosophy
│       ├── insight-slug/
│       │   ├── content.json
│       │   ├── thumbnail.jpg
│       │   └── ...
│       └── ...
├── scripts/
│   ├── create-item.js               # CLI tool for adding new items
│   ├── generate-content.js          # Build-time content processor
│   └── migrate-existing.js          # Migration utility
└── src/data/
    └── generated-portfolio.ts        # Auto-generated portfolio data
```

## 🚀 Quick Start

### Adding a New Item

Use the interactive CLI tool:

```bash
npm run create:item
```

This will guide you through:
- Title, description, and short description
- Tag selection (projects/experiments/insights)
- Optional metadata (date, technologies, status, URLs)
- Automatic slug generation
- Directory and file creation

### Manual Item Creation

1. **Create the directory:**
   ```bash
   mkdir content/experiments/my-new-experiment
   ```

2. **Create `content.json`:**
   ```json
   {
     "id": "my-new-experiment",
     "title": "My New Experiment",
     "description": "A detailed description of what this experiment explores...",
     "shortDescription": "Brief tagline for thumbnails",
     "thumbnailUrl": "thumbnail.jpg",
     "position": { "x": 0, "y": 0 },
     "metadata": {
       "date": "2024",
       "technologies": ["React", "WebGL", "TypeScript"],
       "status": "in-progress"
     }
   }
   ```

3. **Add your thumbnail image** (`thumbnail.jpg`)

4. **Generate and deploy:**
   ```bash
   npm run generate:content
   cp -r content public/
   ```

## 📋 Content.json Schema

### Required Fields
```json
{
  "id": "unique-slug",              // Unique identifier (usually matches folder name)
  "title": "Display Title",        // Full title shown in UI
  "description": "Full description...", // Detailed description for modals
  "thumbnailUrl": "thumbnail.jpg"   // Thumbnail image filename
}
```

### Optional Fields
```json
{
  "shortDescription": "Brief tagline",     // Shown on thumbnails
  "imageUrl": "hero-image.jpg",           // Hero image for modals (projects)
  "links": [                              // Action buttons in modals
    { "label": "Live Demo", "url": "https://..." },
    { "label": "GitHub", "url": "https://..." }
  ],
  "position": { "x": 100, "y": 200 },    // Manual positioning (auto if omitted)
  "metadata": {
    "date": "2024",                       // Project date
    "technologies": ["React", "Node.js"], // Tech stack
    "status": "completed"                 // completed|in-progress|concept
  }
}
```

## 🎨 Asset Guidelines

### Thumbnail Images
- **Size:** 384×288px (recommended)
- **Format:** JPG, PNG, or WebP
- **Naming:** `thumbnail.jpg`
- **Purpose:** Shown on floating canvas

### Hero Images (Projects)
- **Size:** Any reasonable resolution
- **Format:** JPG, PNG, or WebP  
- **Naming:** `hero-image.jpg`
- **Purpose:** Large image in detail modals

### Additional Assets
- Place any additional images, videos, or files in the item directory
- Reference them in custom layouts or link to them
- They'll be served from `/content/{tag}/{slug}/{filename}`

## ⚙️ Build System

### Content Generation
```bash
npm run generate:content
```
This script:
- Scans all content directories
- Reads `content.json` files
- Generates positions for new items (avoiding collisions)
- Creates `src/data/generated-portfolio.ts`
- Preserves existing positions

### Automatic Build Integration
The content is automatically generated before builds:
```json
{
  "scripts": {
    "prebuild": "npm run generate:content"
  }
}
```

### Asset Serving
Content assets are served from `/content/{tag}/{slug}/` by copying the content directory to `public/`.

## 🎛️ Custom Modal Layouts

Create custom layouts for specific items by adding `layout.tsx` to the item directory:

```tsx
// content/experiments/my-item/layout.tsx
import { PortfolioItem } from '../../../src/types/portfolio';

interface CustomLayoutProps {
  item: PortfolioItem;
  onClose: () => void;
}

export default function CustomLayout({ item, onClose }: CustomLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Custom content specific to this item */}
      <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
        {/* Interactive demo, video, or custom visualization */}
      </div>
      
      <div className="prose prose-gray max-w-none">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        
        {/* Custom sections specific to this item */}
        <h3>Technical Approach</h3>
        <p>Explain the unique aspects of this project...</p>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3">
        {item.links?.map((link, index) => (
          <a key={index} href={link.url} className="btn-primary">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
```

## 📍 Positioning System

### Automatic Positioning
Items with `"position": { "x": 0, "y": 0 }` get automatic positioning that:
- Avoids the central text area (-300 to +300px horizontally, -150 to +150px vertically)
- Prevents overlaps with existing items
- Distributes items organically across the canvas

### Manual Positioning
Set specific coordinates in `content.json`:
```json
{
  "position": { "x": -800, "y": -500 }
}
```

### Canvas Bounds
The system automatically calculates canvas bounds based on all item positions, ensuring proper viewport constraints.

## 🔄 Migration from Old System

If migrating from the old `portfolioItems.ts` system:

1. **Run the migration script:**
   ```bash
   node scripts/migrate-existing.js
   ```

2. **Update imports:**
   ```tsx
   // Old
   import { portfolioItems } from '../data/portfolioItems';
   
   // New
   import { portfolioItems } from '../data/generated-portfolio';
   ```

3. **Copy assets** to the appropriate directories

4. **Generate content:**
   ```bash
   npm run generate:content
   ```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run create:item` | Interactive CLI for adding new items |
| `npm run create:project` | Same as create:item (alias) |
| `npm run create:experiment` | Same as create:item (alias) |  
| `npm run create:insight` | Same as create:item (alias) |
| `npm run generate:content` | Generate portfolio data from content files |
| `node scripts/migrate-existing.js` | Migrate from old portfolioItems.ts |

## 📚 Content Types

### Projects (◉)
Production applications, complete systems, and professional work:
- Should have hero images (`imageUrl`)
- Include case study or live site links
- Mark status as "completed" when launched

### Experiments (◈) 
Exploratory technical work, prototypes, and creative coding:
- Focus on the process and learning
- Can include demo videos or interactive elements
- Status can be "in-progress" or "concept"

### Insights (◊)
Written reflections, philosophy, and thought pieces:
- Usually text-heavy content
- May not need hero images
- Focus on ideas and perspectives

## 🎯 Best Practices

### Content Writing
- **Title:** Clear and memorable (3-6 words ideal)
- **Short Description:** Compelling tagline (5-8 words)
- **Description:** Detailed but scannable (2-3 paragraphs)
- **Technologies:** List most relevant/impressive tech first

### Asset Management
- Keep file sizes reasonable (< 2MB for images)
- Use descriptive filenames for additional assets
- Consider progressive loading for large media

### Organization
- Use consistent slug naming (lowercase, hyphens)
- Group related experiments (e.g., "music-viz-v1", "music-viz-v2")
- Archive old experiments rather than deleting

### Performance
- The build system is optimized for many items (100+ tested)
- Automatic collision detection prevents layout issues
- Canvas bounds automatically adjust to content

## 🔍 Troubleshooting

### Content Not Appearing
1. Check that `content.json` has valid JSON syntax
2. Ensure the directory structure is correct
3. Run `npm run generate:content` manually
4. Check the console for parsing errors

### Asset Loading Issues
1. Verify files exist in the content directory
2. Check that `public/content/` was updated: `cp -r content public/`
3. Ensure filename matches exactly (case-sensitive)
4. Check browser developer tools for 404 errors

### Position Conflicts
1. The system should automatically resolve overlaps
2. If manual positions conflict, update coordinates in `content.json`
3. Use the collision detection validation in the generation script

### Build Errors
1. Ensure all `content.json` files have valid JSON
2. Check that required fields (id, title, description, thumbnailUrl) are present
3. Verify TypeScript types match the PortfolioItem interface

## 🚀 Future Enhancements

### Planned Features
- [ ] Admin UI for content editing
- [ ] Markdown support for rich descriptions  
- [ ] Video thumbnail support
- [ ] Bulk import/export tools
- [ ] Content versioning
- [ ] Search and tagging system
- [ ] Analytics integration

### Advanced Customization
- Custom positioning algorithms
- Theme-specific layouts
- Interactive canvas elements
- Real-time content updates

---

## 💡 Quick Reference

**Add new item:** `npm run create:item`  
**Regenerate content:** `npm run generate:content`  
**Update public assets:** `cp -r content public/`  
**Import in code:** `import { portfolioItems } from '../data/generated-portfolio'`

For questions or issues, refer to the README.md files in individual content directories or check the generated comments in `generated-portfolio.ts`.