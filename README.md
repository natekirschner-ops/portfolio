# Nathan Kirschner Portfolio

> **Creative Technologist** - A clean, concept-driven portfolio showcasing strategic thinking and creative problem-solving through simple, compelling presentations.

## ✨ Overview

This portfolio positions Nathan as a creative technologist who "turns complex challenges into simple, compelling concepts." The design emphasizes conceptual thinking and strategic positioning over technical complexity.

## 🎯 Design Philosophy

**Clean & Concept-Driven** - The portfolio emphasizes:
- **Strategic positioning** with clear value proposition
- **Concept-first presentation** highlighting breakthrough thinking
- **Clean, minimal design** that lets the work speak for itself
- **Narrative flow** from introduction through featured work to additional projects
- **Professional sophistication** without visual clutter

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd portfolio
npm install

# Start development
npm run dev

# Add new content
npm run create:item
```

## 🎭 Splash Page Mode

The portfolio includes a temporary splash page feature for deployment while development continues:

```bash
# Show splash page (default in development)
NEXT_PUBLIC_SHOW_SPLASH=true

# Show full portfolio
NEXT_PUBLIC_SHOW_SPLASH=false
```

**Splash Page Features:**
- Full-height 3D Spline background
- Clean minimal layout with no scroll
- Contact link (upper right)
- LinkedIn link (lower right) 
- "Portfolio Coming Soon" placeholder (lower left)

**Deployment Options:**
- Deploy with splash page while working on portfolio
- Toggle to full portfolio when ready
- Environment variable controls the display mode

## 📁 Project Structure

```
portfolio/
├── public/content/             # Content management system
│   ├── digital/               # Digital products & platforms
│   ├── exploration/           # Creative explorations
│   ├── experience/            # Experience design
│   ├── motion/                # Motion graphics
│   ├── storytelling/          # Written & visual stories
│   └── brand/                 # Brand & identity work
├── src/
│   ├── components/           # React components
│   ├── data/                # Generated portfolio data
│   └── types/               # TypeScript definitions
├── scripts/                 # Content management tools
└── docs/                   # Documentation
```

## 🎯 Content Strategy

### **Three-Tier Structure**
1. **Full-Screen Introduction** - Establishes positioning and value proposition
2. **Featured Projects** - 2 concept-driven projects with full-width presentation
3. **Additional Work** - Grid of remaining projects showing breadth and capability

### **Featured Projects**
- **Collaborative Intelligence** - Reimagining AI as creative collaborator
- **The Carriboo Jack** - Premier backcountry mountain bike race experience

These projects demonstrate breakthrough conceptual thinking and strategic problem-solving.

## 📝 Content Management

### Adding New Items
```bash
# Interactive creation wizard
npm run create:item

# Or create manually in content/{category}/{slug}/
```

### Content Structure
Each portfolio item has its own directory:
```
public/content/digital/project-name/
├── content.json        # Metadata and content
├── thumbnail.mp4      # Required thumbnail (video or image)
└── README.md         # Documentation
```

## ✨ Content Features

### Rich Descriptions
All portfolio items support Markdown formatting in descriptions for **bold**, *italic*, lists, and structured content that emphasizes conceptual insights.

### Media Galleries
Add multiple images and videos with flexible layout options:

```json
{
  "media": [
    {
      "type": "image",
      "src": "gallery-1.jpg",
      "alt": "Description of image",
      "caption": "Optional caption text",
      "aspectRatio": "video"
    }
  ]
}
```

### Current Project Highlighting
Featured projects can be tagged as "Current" to indicate active or recent work:
- Collaborative Intelligence displays a "Current" tag
- Positioned prominently in featured section

## 🛠️ Available Scripts

- `npm run create:item` - Add new portfolio items
- `npm run generate:content` - Generate portfolio data from content folders
- `npm run remove:item` - Remove portfolio items  
- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🎨 Visual Design

### Typography
- **Primary font**: Thicccboi for headings and emphasis
- **Body font**: Geist Sans for readability
- **Accent font**: Playfair Display for sophistication

### Layout Principles
- **Full-width hero section** for immediate impact
- **Featured projects** with full-width images and detailed descriptions
- **Grid layout** for additional work scanning
- **Clean hover interactions** with transparent overlays
- **Responsive design** across all devices

## 📊 Current Portfolio

**10 total projects** across 6 categories:
- **digital**: 4 projects (including Collaborative Intelligence)
- **exploration**: 2 projects  
- **experience**: 1 project (The Carriboo Jack)
- **motion**: 1 project
- **storytelling**: 1 project
- **brand**: 1 project

## 🚀 Technical Stack

- **Next.js 15** with App Router and Turbopack
- **React 19** with modern hooks
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Dynamic content generation** from folder structure
- **Responsive design** with mobile-first approach

## 🌟 Key Features

- **Concept-driven positioning** - Emphasizes strategic thinking over technical execution
- **Clean, minimal design** - Sophisticated simplicity that focuses attention on concepts
- **Narrative flow** - Introduction → Featured Work → About → Additional Work
- **Professional presentation** - Designed for senior creative roles
- **Content-first architecture** - Easy to update and maintain

## 🎯 Strategic Positioning

**Target Audience**: Senior creative roles focused on concept development and creative direction

**Key Differentiator**: Shows how complex challenges become simple, compelling concepts through systematic creative thinking

**Value Proposition**: "I turn complex challenges into simple, compelling concepts"

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
```

### Content Workflow
1. **Add content**: `npm run create:item`
2. **Add assets**: Place `thumbnail.mp4` or `thumbnail.jpg` in item directory
3. **Generate data**: `npm run generate:content` 
4. **Test locally**: `npm run dev`

## 🚀 Deployment

Optimized for deployment on:
- **Vercel** (recommended)
- **Netlify** 
- **Any static hosting** service

```bash
npm run build        # Generates optimized production build
```

## 📄 License

This project is private and proprietary to Nathan Kirschner.

---

## 💫 About

This portfolio represents a strategic approach to creative positioning - showcasing conceptual thinking and strategic problem-solving through clean, sophisticated design that emphasizes ideas over execution complexity.

**Built with intentional simplicity and strategic focus**