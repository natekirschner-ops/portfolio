#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Original portfolio items data
const originalItems = [
  {
    id: "neural-canvas",
    title: "Neural Canvas",
    description: "An experimental interface exploring the intersection of machine learning and creative expression. Built with TensorFlow.js and WebGL for real-time neural style transfer.",
    shortDescription: "ML-powered creative interface",
    tag: "experiments",
    thumbnailUrl: "/thumbnails/neural-canvas.jpg",
    imageUrl: "/images/neural-canvas-full.jpg",
    links: [
      { label: "Live Demo", url: "#" },
      { label: "GitHub", url: "#" },
    ],
    position: { x: -800, y: -500 },
    metadata: {
      date: "2024",
      technologies: ["TensorFlow.js", "WebGL", "React"],
      status: "completed",
    },
  },
  {
    id: "quantum-thoughts",
    title: "Quantum Thoughts",
    description: "A meditation on the nature of consciousness and computation. This piece explores how quantum mechanics might inform our understanding of thought processes.",
    shortDescription: "Consciousness meets computation",
    tag: "insights",
    thumbnailUrl: "/thumbnails/quantum-thoughts.jpg",
    position: { x: -200, y: -600 },
    metadata: {
      date: "2023",
      status: "completed",
    },
  },
  {
    id: "ethereal-ecommerce",
    title: "Ethereal E-commerce",
    description: "A complete e-commerce platform built with Next.js, featuring advanced product visualization, AI-powered recommendations, and seamless checkout experiences.",
    shortDescription: "Next-gen online shopping platform",
    tag: "projects",
    thumbnailUrl: "/thumbnails/ethereal-ecommerce.jpg",
    imageUrl: "/images/ethereal-ecommerce-full.jpg",
    links: [
      { label: "Case Study", url: "#" },
      { label: "Live Site", url: "#" },
    ],
    position: { x: 600, y: -500 },
    metadata: {
      date: "2023",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "TensorFlow"],
      status: "completed",
    },
  },
  {
    id: "fractal-music-box",
    title: "Fractal Music Box",
    description: "An interactive audio-visual experience where mathematical patterns generate both sound and visuals in real-time. Each interaction creates unique, never-repeating compositions.",
    shortDescription: "Math-driven audio-visual art",
    tag: "experiments",
    thumbnailUrl: "/thumbnails/fractal-music.jpg",
    links: [{ label: "Experience", url: "#" }],
    position: { x: 1200, y: -600 },
    metadata: {
      date: "2024",
      technologies: ["Web Audio API", "Canvas", "TypeScript"],
      status: "in-progress",
    },
  },
  {
    id: "paradox-of-choice",
    title: "The Paradox of Choice",
    description: "An exploration of decision-making in the digital age. How infinite options can lead to paralysis, and what this means for interface design.",
    shortDescription: "Digital decision-making philosophy",
    tag: "insights",
    thumbnailUrl: "/thumbnails/paradox-choice.jpg",
    position: { x: -1000, y: -100 },
    metadata: {
      date: "2023",
      status: "completed",
    },
  },
  {
    id: "distributed-dreams",
    title: "Distributed Dreams",
    description: "A blockchain-based platform for collaborative storytelling. Writers from around the world contribute to evolving narratives, with smart contracts governing story progression.",
    shortDescription: "Blockchain storytelling platform",
    tag: "projects",
    thumbnailUrl: "/thumbnails/distributed-dreams.jpg",
    imageUrl: "/images/distributed-dreams-full.jpg",
    links: [
      { label: "White Paper", url: "#" },
      { label: "Prototype", url: "#" },
    ],
    position: { x: -500, y: 200 },
    metadata: {
      date: "2024",
      technologies: ["Ethereum", "IPFS", "React", "Solidity"],
      status: "in-progress",
    },
  },
  {
    id: "morphing-interfaces",
    title: "Morphing Interfaces",
    description: "An experimental UI framework that adapts its visual language based on user behavior patterns and emotional context.",
    shortDescription: "Adaptive interface experiment",
    tag: "experiments",
    thumbnailUrl: "/thumbnails/morphing-interfaces.jpg",
    position: { x: 800, y: -100 },
    metadata: {
      date: "2024",
      technologies: ["React", "Machine Learning", "CSS-in-JS"],
      status: "concept",
    },
  },
  {
    id: "digital-minimalism",
    title: "Digital Minimalism",
    description: "Reflections on reducing digital clutter and finding signal in the noise. A personal journey through intentional technology use.",
    shortDescription: "Intentional technology philosophy",
    tag: "insights",
    thumbnailUrl: "/thumbnails/digital-minimalism.jpg",
    position: { x: 1300, y: 150 },
    metadata: {
      date: "2023",
      status: "completed",
    },
  },
  {
    id: "autonomous-art-gallery",
    title: "Autonomous Art Gallery",
    description: "A self-curating digital art space powered by AI. The gallery evolves its exhibitions based on visitor interactions and emerging artistic trends.",
    shortDescription: "AI-curated digital gallery",
    tag: "projects",
    thumbnailUrl: "/thumbnails/autonomous-gallery.jpg",
    imageUrl: "/images/autonomous-gallery-full.jpg",
    links: [
      { label: "Visit Gallery", url: "#" },
      { label: "Technical Details", url: "#" },
    ],
    position: { x: -800, y: 600 },
    metadata: {
      date: "2024",
      technologies: ["Three.js", "OpenAI API", "Node.js"],
      status: "completed",
    },
  },
  {
    id: "breathing-pixels",
    title: "Breathing Pixels",
    description: "An ambient display that responds to your breathing patterns through subtle pixel animations. Created during a residency exploring biometric interfaces.",
    shortDescription: "Biometric ambient display",
    tag: "experiments",
    thumbnailUrl: "/thumbnails/breathing-pixels.jpg",
    position: { x: -100, y: 600 },
    metadata: {
      date: "2023",
      technologies: ["WebRTC", "Canvas", "Sensor APIs"],
      status: "completed",
    },
  },
  {
    id: "weight-of-code",
    title: "The Weight of Code",
    description: "A meditation on the responsibility that comes with building systems that shape human behavior. Exploring the ethics of algorithmic influence.",
    shortDescription: "Ethics in software development",
    tag: "insights",
    thumbnailUrl: "/thumbnails/weight-of-code.jpg",
    position: { x: 400, y: 400 },
    metadata: {
      date: "2024",
      status: "completed",
    },
  },
  {
    id: "temporal-workspace",
    title: "Temporal Workspace",
    description: "A productivity application that understands the temporal nature of work. Tasks and projects exist within time dimensions, providing new ways to organize and prioritize.",
    shortDescription: "Time-aware productivity app",
    tag: "projects",
    thumbnailUrl: "/thumbnails/temporal-workspace.jpg",
    imageUrl: "/images/temporal-workspace-full.jpg",
    links: [
      { label: "Beta Access", url: "#" },
      { label: "Case Study", url: "#" },
    ],
    position: { x: 1000, y: 650 },
    metadata: {
      date: "2024",
      technologies: ["React", "D3.js", "PostgreSQL", "Python"],
      status: "in-progress",
    },
  },
];

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Create directory if it doesn't exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Main migration function
function migrateItems() {
  console.log('🚀 Migrating existing portfolio items...\n');

  originalItems.forEach((item, index) => {
    const slug = generateSlug(item.title);
    console.log(`${index + 1}. Migrating: ${item.title} -> ${slug}`);

    // Create directory
    const itemDir = path.join(process.cwd(), 'content', item.tag, slug);
    ensureDir(itemDir);

    // Transform the item for the new structure
    const contentItem = {
      id: slug,
      title: item.title,
      description: item.description,
      ...(item.shortDescription && { shortDescription: item.shortDescription }),
      thumbnailUrl: 'thumbnail.jpg',
      ...(item.imageUrl && { imageUrl: 'hero-image.jpg' }),
      ...(item.links && { links: item.links }),
      position: item.position,
      ...(item.metadata && { metadata: item.metadata }),
    };

    // Write content.json
    const contentFile = path.join(itemDir, 'content.json');
    fs.writeFileSync(contentFile, JSON.stringify(contentItem, null, 2));

    // Create README
    const readme = `# ${item.title}

${item.description}

## Assets Needed

- \`thumbnail.jpg\` - Main thumbnail image (recommended: 384x288px)
${item.imageUrl ? '- `hero-image.jpg` - Hero image for detail view\n' : ''}
- Additional images can be placed in this directory and referenced in custom layouts

## Custom Layout

To create a custom modal layout for this item, create a \`layout.tsx\` file in this directory.

## Original Data

This item was migrated from the original portfolioItems.ts file.

- Original ID: ${item.id}
- Tag: ${item.tag}
- Position: (${item.position.x}, ${item.position.y})
${item.metadata ? `- Date: ${item.metadata.date || 'N/A'}
- Technologies: ${item.metadata.technologies ? item.metadata.technologies.join(', ') : 'N/A'}
- Status: ${item.metadata.status || 'N/A'}` : ''}

## Notes

- Auto-generated slug: ${slug}
- Edit \`content.json\` to update item properties
`;

    fs.writeFileSync(path.join(itemDir, 'README.md'), readme);

    console.log(`   ✅ Created: content/${item.tag}/${slug}/`);
  });

  console.log(`\n✅ Migration complete! Migrated ${originalItems.length} items.`);
  console.log('\n📋 Next steps:');
  console.log('1. Copy your existing thumbnail images to the appropriate directories');
  console.log('2. Copy your existing hero images to the appropriate directories');
  console.log('3. Run `npm run generate:content` to generate the new portfolio data');
  console.log('4. Update your app to import from `generated-portfolio.ts` instead of `portfolioItems.ts`');
  console.log('5. Copy the content directory to public/ so assets are served correctly');
}

// Run the migration
migrateItems();
