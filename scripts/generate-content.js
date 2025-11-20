#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), "public", "content");
const OUTPUT_FILE = path.join(
  process.cwd(),
  "src",
  "data",
  "generated-portfolio.ts",
);
const TAG_DIRS = [
  "exploration",
  "experience",
  "digital",
  "motion",
  "storytelling",
  "brand",
];

// Thumbnail dimensions for collision detection
const THUMBNAIL_WIDTH = 384;
const THUMBNAIL_HEIGHT = 256;
const MIN_SPACING = 40;

// Check if two rectangles overlap
const rectanglesOverlap = (rect1, rect2) => {
  return !(
    rect1.x + rect1.width < rect2.x ||
    rect2.x + rect2.width < rect1.x ||
    rect1.y + rect1.height < rect2.y ||
    rect2.y + rect2.height < rect1.y
  );
};

// Generate position using radial/spiral algorithm growing outward from center
const generatePosition = (existingPositions, itemIndex = 0) => {
  // Start with base radius just outside central protection zone
  // Protection zone is 500px horizontal, 300px vertical
  // Use the larger dimension (500px) plus some padding as base radius
  const baseRadius = 550;
  const radiusIncrement = 460; // How much to increase radius per "ring"
  const goldenAngle = 137.508; // Golden angle in degrees for natural spiral

  // Calculate position using spiral pattern
  // Items are placed in expanding spiral starting close to center
  const angle = itemIndex * goldenAngle * (Math.PI / 180); // Convert to radians
  const ringNumber = Math.floor(itemIndex / 6); // ~6 items per ring
  const radius = baseRadius + ringNumber * radiusIncrement;

  // Add minimal randomness to prevent perfect spiral (more organic feel)
  const angleVariation = (Math.random() - 0.5) * 10 * (Math.PI / 180); // ±5 degrees
  const radiusVariation = (Math.random() - 0.5) * 20; // ±10px

  const finalAngle = angle + angleVariation;
  const finalRadius = radius + radiusVariation;

  // Convert polar coordinates to cartesian
  const x = Math.round(Math.cos(finalAngle) * finalRadius);
  const y = Math.round(Math.sin(finalAngle) * finalRadius);

  const newPosition = { x, y };

  // Verify position doesn't overlap with existing items
  let attempts = 0;
  const maxAttempts = 10;

  while (
    attempts < maxAttempts &&
    existingPositions.some((existingPos) =>
      rectanglesOverlap(
        {
          x: newPosition.x - THUMBNAIL_WIDTH / 2,
          y: newPosition.y - THUMBNAIL_HEIGHT / 2,
          width: THUMBNAIL_WIDTH + MIN_SPACING,
          height: THUMBNAIL_HEIGHT + MIN_SPACING,
        },
        {
          x: existingPos.x - THUMBNAIL_WIDTH / 2,
          y: existingPos.y - THUMBNAIL_HEIGHT / 2,
          width: THUMBNAIL_WIDTH + MIN_SPACING,
          height: THUMBNAIL_HEIGHT + MIN_SPACING,
        },
      ),
    )
  ) {
    // If collision detected, try nearby position
    const adjustAngle = finalAngle + (attempts * 45 * Math.PI) / 180;
    const adjustRadius = finalRadius + attempts * 80;

    newPosition.x = Math.round(Math.cos(adjustAngle) * adjustRadius);
    newPosition.y = Math.round(Math.sin(adjustAngle) * adjustRadius);
    attempts++;
  }

  return newPosition;
};

// Load content from a single item directory
const loadItemContent = (tag, slug) => {
  const itemDir = path.join(CONTENT_DIR, tag, slug);
  const contentFile = path.join(itemDir, "content.json");

  if (!fs.existsSync(contentFile)) {
    console.warn(`Content file not found: ${contentFile}`);
    return null;
  }

  try {
    const rawContent = fs.readFileSync(contentFile, "utf-8");
    const content = JSON.parse(rawContent);

    // Build asset URLs relative to the item directory
    const buildAssetUrl = (filename) => `/content/${tag}/${slug}/${filename}`;

    const item = {
      id: content.id || slug,
      title: content.title,
      description: content.description,
      shortDescription: content.shortDescription,
      tag,
      thumbnailUrl: buildAssetUrl(content.thumbnailUrl),
      imageUrl: content.imageUrl ? buildAssetUrl(content.imageUrl) : undefined,
      media: content.media,
      links: content.links,
      position: content.position || { x: 0, y: 0 }, // Will be set later if not specified
      metadata: content.metadata,
    };

    return item;
  } catch (error) {
    console.error(`Error loading content for ${tag}/${slug}:`, error);
    return null;
  }
};

// Load all content and generate portfolio items
const loadAllContent = () => {
  const items = [];

  // Load items from each tag directory
  for (const tag of TAG_DIRS) {
    const tagDir = path.join(CONTENT_DIR, tag);

    if (!fs.existsSync(tagDir)) {
      console.warn(`Tag directory not found: ${tagDir}`);
      continue;
    }

    const itemSlugs = fs.readdirSync(tagDir).filter((item) => {
      const itemPath = path.join(tagDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const slug of itemSlugs) {
      const item = loadItemContent(tag, slug);
      if (item) {
        items.push(item);
      }
    }
  }

  // Regenerate ALL positions using golden spiral (ignore existing positions)
  console.log("🌀 Applying golden spiral algorithm to all items...");

  const itemsWithGoldenSpiral = [];
  const existingPositions = [];

  // Apply golden spiral to ALL items in order
  items.forEach((item, index) => {
    const newPosition = generatePosition(existingPositions, index);
    item.position = newPosition;
    existingPositions.push(newPosition);
    itemsWithGoldenSpiral.push(item);

    console.log(
      `📍 Item ${index}: ${item.id} positioned at (${newPosition.x}, ${newPosition.y})`,
    );
  });

  console.log("✨ Golden spiral distribution complete!");
  return itemsWithGoldenSpiral;
};

// Validate no overlaps exist
const validateNoOverlaps = (items) => {
  const overlaps = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const item1 = items[i];
      const item2 = items[j];

      const rect1 = {
        x: item1.position.x - THUMBNAIL_WIDTH / 2,
        y: item1.position.y - THUMBNAIL_HEIGHT / 2,
        width: THUMBNAIL_WIDTH + MIN_SPACING,
        height: THUMBNAIL_HEIGHT + MIN_SPACING,
      };

      const rect2 = {
        x: item2.position.x - THUMBNAIL_WIDTH / 2,
        y: item2.position.y - THUMBNAIL_HEIGHT / 2,
        width: THUMBNAIL_WIDTH + MIN_SPACING,
        height: THUMBNAIL_HEIGHT + MIN_SPACING,
      };

      if (rectanglesOverlap(rect1, rect2)) {
        overlaps.push({
          items: [item1, item2],
          distance: Math.sqrt(
            Math.pow(item1.position.x - item2.position.x, 2) +
              Math.pow(item1.position.y - item2.position.y, 2),
          ),
        });
      }
    }
  }

  return overlaps.sort((a, b) => a.distance - b.distance);
};

// Generate TypeScript file content
const generateTypeScriptFile = (items) => {
  const itemsJson = JSON.stringify(items, null, 2);

  return `// Auto-generated file - DO NOT EDIT MANUALLY
// Generated on ${new Date().toISOString()}
// Use 'npm run generate:content' to regenerate

import { PortfolioItem } from "../types/portfolio";

// Utility function for collision detection
const rectanglesOverlap = (rect1: any, rect2: any) => {
  return !(
    rect1.x + rect1.width < rect2.x ||
    rect2.x + rect2.width < rect1.x ||
    rect1.y + rect1.height < rect2.y ||
    rect2.y + rect2.height < rect1.y
  );
};

export const portfolioItems: PortfolioItem[] = ${itemsJson};

// Filter functions
export const getItemsByTag = (tag: string) => {
  return portfolioItems.filter((item) => item.tag === tag);
};

export const getItemById = (id: string) => {
  return portfolioItems.find((item) => item.id === id);
};

// Utility functions for canvas positioning with minimum browser dimensions
export const getCanvasBounds = () => {
  const positions = portfolioItems.map((item) => item.position);
  const xs = positions.map((p) => p.x);
  const ys = positions.map((p) => p.y);

  // Account for thumbnail dimensions (384x256) and padding
  const thumbnailHalfWidth = 192; // 384 / 2
  const thumbnailHalfHeight = 128; // 256 / 2
  const padding = 0; // No extra padding - let viewport constraints handle it

  // Calculate content bounds
  const contentMinX = Math.min(...xs) - thumbnailHalfWidth - padding;
  const contentMaxX = Math.max(...xs) + thumbnailHalfWidth + padding;
  const contentMinY = Math.min(...ys) - thumbnailHalfHeight - padding;
  const contentMaxY = Math.max(...ys) + thumbnailHalfHeight + padding;

  // Default browser dimensions (will be overridden by actual window size in browser)
  const defaultWidth = 1200;
  const defaultHeight = 800;

  // Ensure bounds are at least browser width/height
  const minX = Math.min(contentMinX, -defaultWidth / 2);
  const maxX = Math.max(contentMaxX, defaultWidth / 2);
  const minY = Math.min(contentMinY, -defaultHeight / 2);
  const maxY = Math.max(contentMaxY, defaultHeight / 2);

  return {
    minX,
    maxX,
    minY,
    maxY,
  };
};

// Utility function to add new items without overlaps
export const addNewItemPosition = (existingItems: PortfolioItem[]) => {
  const existingPositions = existingItems.map((item) => item.position);
  let newPosition: { x: number; y: number };
  let attempts = 0;
  const maxAttempts = 200;

  do {
    newPosition = {
      x: Math.round((Math.random() - 0.5) * 1400),
      y: Math.round((Math.random() - 0.5) * 1200),
    };
    attempts++;
  } while (
    attempts < maxAttempts &&
    existingPositions.some((existingPos) =>
      rectanglesOverlap(
        {
          x: newPosition.x - ${THUMBNAIL_WIDTH} / 2,
          y: newPosition.y - ${THUMBNAIL_HEIGHT} / 2,
          width: ${THUMBNAIL_WIDTH} + ${MIN_SPACING},
          height: ${THUMBNAIL_HEIGHT} + ${MIN_SPACING},
        },
        {
          x: existingPos.x - ${THUMBNAIL_WIDTH} / 2,
          y: existingPos.y - ${THUMBNAIL_HEIGHT} / 2,
          width: ${THUMBNAIL_WIDTH} + ${MIN_SPACING},
          height: ${THUMBNAIL_HEIGHT} + ${MIN_SPACING},
        },
      )
    )
  );

  return newPosition;
};
`;
};

// Main function
function generateContent() {
  console.log("🔄 Generating portfolio content...");

  try {
    // Load all content
    const items = loadAllContent();

    if (items.length === 0) {
      console.warn("⚠️  No content items found");
      return;
    }

    console.log(`📝 Found ${items.length} portfolio items`);

    // Log items by category
    const byTag = items.reduce((acc, item) => {
      acc[item.tag] = (acc[item.tag] || 0) + 1;
      return acc;
    }, {});

    Object.entries(byTag).forEach(([tag, count]) => {
      console.log(`   - ${tag}: ${count}`);
    });

    // Generate TypeScript file
    const fileContent = generateTypeScriptFile(items);

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(OUTPUT_FILE, fileContent);

    console.log(`✅ Generated ${OUTPUT_FILE}`);
    console.log("💡 Import this file instead of portfolioItems.ts");

    // Run overlap validation
    console.log("\n🔍 Checking for overlaps...");
    const overlaps = validateNoOverlaps(items);
    if (overlaps.length > 0) {
      console.log(`⚠️  Found ${overlaps.length} overlapping thumbnail pairs:`);
      overlaps.forEach((overlap, index) => {
        const [item1, item2] = overlap.items;
        console.log(
          `   ${index + 1}. ${item1.id} ↔ ${item2.id} (${Math.round(overlap.distance)}px apart)`,
        );
      });
      console.log(
        "\n💡 Run 'npm run fix:overlaps' to automatically fix these issues.",
      );
    } else {
      console.log("✅ No overlaps detected - all thumbnails properly spaced!");
    }
  } catch (error) {
    console.error("❌ Error generating content:", error);
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
🔄 Portfolio Content Generator

Usage: node scripts/generate-content.js

This tool reads all content from the content/ directory and generates
a TypeScript file with portfolio items.

Generated file: src/data/generated-portfolio.ts
`);
  process.exit(0);
}

// Run the script
generateContent();
