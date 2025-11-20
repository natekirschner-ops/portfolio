#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), "public", "content");
const TAG_DIRS = ["projects", "experiments", "insights"];

// Thumbnail dimensions for collision detection
const THUMBNAIL_WIDTH = 384;
const THUMBNAIL_HEIGHT = 288;
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

// Convert position to rectangle for collision detection
const positionToRect = (position) => ({
  x: position.x - THUMBNAIL_WIDTH / 2,
  y: position.y - THUMBNAIL_HEIGHT / 2,
  width: THUMBNAIL_WIDTH + MIN_SPACING,
  height: THUMBNAIL_HEIGHT + MIN_SPACING,
});

// Generate a safe position using radial algorithm growing outward from center
const generateSafePosition = (existingPositions, excludePositions = []) => {
  // Start with base radius just outside central protection zone
  // Protection zone is 500px horizontal, 300px vertical
  // Use the larger dimension (500px) plus some padding as base radius
  const baseRadius = 550;
  const radiusIncrement = 180;
  const goldenAngle = 137.508; // Golden angle in degrees for natural spiral

  // Try different positions in expanding spiral
  let attempts = 0;
  const maxAttempts = 50;

  do {
    // Calculate position using spiral pattern
    const itemIndex = existingPositions.length + attempts;
    const angle = itemIndex * goldenAngle * (Math.PI / 180);
    const ringNumber = Math.floor(itemIndex / 6);
    const radius = baseRadius + ringNumber * radiusIncrement;

    // Add some randomness for organic feel
    const angleVariation = (Math.random() - 0.5) * 30 * (Math.PI / 180);
    const radiusVariation = (Math.random() - 0.5) * 80;

    const finalAngle = angle + angleVariation;
    const finalRadius = radius + radiusVariation;

    // Convert polar to cartesian coordinates
    const x = Math.round(Math.cos(finalAngle) * finalRadius);
    const y = Math.round(Math.sin(finalAngle) * finalRadius);

    const newPosition = { x, y };

    // Check if this position conflicts with any existing or excluded positions
    const newRect = positionToRect(newPosition);
    const hasConflict = [...existingPositions, ...excludePositions].some(
      (existingPos) => {
        const existingRect = positionToRect(existingPos);
        return rectanglesOverlap(newRect, existingRect);
      },
    );

    if (!hasConflict) {
      return newPosition;
    }

    attempts++;
  } while (attempts < maxAttempts);

  // Fallback: if spiral fails, try a few more distant positions
  for (let fallbackAttempts = 0; fallbackAttempts < 10; fallbackAttempts++) {
    const fallbackRadius = baseRadius + 400 + fallbackAttempts * 200;
    const fallbackAngle = Math.random() * 2 * Math.PI;

    const x = Math.round(Math.cos(fallbackAngle) * fallbackRadius);
    const y = Math.round(Math.sin(fallbackAngle) * fallbackRadius);

    const newPosition = { x, y };
    const newRect = positionToRect(newPosition);

    const hasConflict = [...existingPositions, ...excludePositions].some(
      (existingPos) => {
        const existingRect = positionToRect(existingPos);
        return rectanglesOverlap(newRect, existingRect);
      },
    );

    if (!hasConflict) {
      return newPosition;
    }
  }

  console.warn("⚠️ Could not find non-overlapping position after all attempts");

  // Final fallback: place far from center
  const fallbackAngle = Math.random() * 2 * Math.PI;
  const fallbackRadius = 1000 + Math.random() * 500;

  return {
    x: Math.round(Math.cos(fallbackAngle) * fallbackRadius),
    y: Math.round(Math.sin(fallbackAngle) * fallbackRadius),
  };
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
    return {
      tag,
      slug,
      filePath: contentFile,
      content,
      position: content.position || { x: 0, y: 0 },
    };
  } catch (error) {
    console.error(`Error loading content for ${tag}/${slug}:`, error);
    return null;
  }
};

// Load all content items
const loadAllItems = () => {
  const items = [];

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

  return items;
};

// Find overlapping items
const findOverlaps = (items) => {
  const overlaps = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const item1 = items[i];
      const item2 = items[j];

      const rect1 = positionToRect(item1.position);
      const rect2 = positionToRect(item2.position);

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

// Check if a position is in the central protection area
const isInCentralArea = (position) => {
  const centralBounds = {
    excludeX: { min: -500, max: 500 },
    excludeY: { min: -300, max: 300 },
  };

  return (
    position.x >= centralBounds.excludeX.min &&
    position.x <= centralBounds.excludeX.max &&
    position.y >= centralBounds.excludeY.min &&
    position.y <= centralBounds.excludeY.max
  );
};

// Find items that violate central protection area
const findCentralViolations = (items) => {
  const violations = [];

  for (const item of items) {
    if (isInCentralArea(item.position)) {
      violations.push(item);
    }
  }

  return violations;
};

// Fix overlapping positions
const fixOverlaps = (items, overlaps) => {
  console.log(`\n🔧 Fixing ${overlaps.length} overlapping pairs...\n`);

  const fixedItems = new Set();
  const allPositions = items.map((item) => item.position);

  for (const overlap of overlaps) {
    const [item1, item2] = overlap.items;

    console.log(`📍 Overlap detected:`);
    console.log(
      `   ${item1.tag}/${item1.slug} at (${item1.position.x}, ${item1.position.y})`,
    );
    console.log(
      `   ${item2.tag}/${item2.slug} at (${item2.position.x}, ${item2.position.y})`,
    );
    console.log(`   Distance: ${Math.round(overlap.distance)}px`);

    // Decide which item to move (prefer moving the second one found)
    const itemToMove = fixedItems.has(item1.slug) ? item2 : item1;
    const itemToKeep = itemToMove === item1 ? item2 : item1;

    if (!fixedItems.has(itemToMove.slug)) {
      console.log(`   🔄 Moving ${itemToMove.tag}/${itemToMove.slug}...`);

      // Get all positions except the one we're moving
      const otherPositions = allPositions.filter(
        (pos) => pos !== itemToMove.position,
      );

      // Generate new safe position
      const newPosition = generateSafePosition(otherPositions);

      // Update the item's position
      const oldPosition = { ...itemToMove.position };
      itemToMove.position = newPosition;
      itemToMove.content.position = newPosition;

      // Update the allPositions array
      const index = allPositions.findIndex(
        (pos) => pos.x === oldPosition.x && pos.y === oldPosition.y,
      );
      if (index !== -1) {
        allPositions[index] = newPosition;
      }

      console.log(`   ✅ Moved to (${newPosition.x}, ${newPosition.y})`);

      // Write updated content file
      try {
        fs.writeFileSync(
          itemToMove.filePath,
          JSON.stringify(itemToMove.content, null, 2),
        );
        console.log(
          `   💾 Updated ${itemToMove.tag}/${itemToMove.slug}/content.json`,
        );
      } catch (error) {
        console.error(`   ❌ Failed to update ${itemToMove.filePath}:`, error);
      }

      fixedItems.add(itemToMove.slug);
    } else {
      console.log(
        `   ⏭️  ${itemToMove.tag}/${itemToMove.slug} already fixed, skipping`,
      );
    }

    console.log("");
  }

  return fixedItems.size;
};

// Main function
function fixThumbnailOverlaps() {
  console.log("🔍 Checking for overlapping thumbnails...\n");

  try {
    // Load all items
    const items = loadAllItems();
    console.log(`📝 Loaded ${items.length} portfolio items`);

    // Find overlaps
    const overlaps = findOverlaps(items);

    // Find central area violations
    const centralViolations = findCentralViolations(items);

    if (overlaps.length === 0 && centralViolations.length === 0) {
      console.log(
        "✅ No overlapping thumbnails or central area violations found! Everything looks good.",
      );
      return;
    }

    if (overlaps.length > 0) {
      console.log(`⚠️  Found ${overlaps.length} overlapping thumbnail pairs:`);

      // List all overlaps
      overlaps.forEach((overlap, index) => {
        const [item1, item2] = overlap.items;
        console.log(
          `   ${index + 1}. ${item1.tag}/${item1.slug} ↔ ${item2.tag}/${item2.slug} (${Math.round(overlap.distance)}px apart)`,
        );
      });
    }

    if (centralViolations.length > 0) {
      console.log(
        `⚠️  Found ${centralViolations.length} items in central protection area:`,
      );

      // List all central violations
      centralViolations.forEach((item, index) => {
        console.log(
          `   ${index + 1}. ${item.tag}/${item.slug} at (${item.position.x}, ${item.position.y})`,
        );
      });
    }

    // Fix overlaps
    const overlapFixedCount =
      overlaps.length > 0 ? fixOverlaps(items, overlaps) : 0;

    // Fix central violations
    let centralFixedCount = 0;
    if (centralViolations.length > 0) {
      console.log(
        `\n🔧 Moving ${centralViolations.length} items out of central area...\n`,
      );

      const allPositions = items.map((item) => item.position);

      for (const item of centralViolations) {
        console.log(`📍 Moving ${item.tag}/${item.slug} from central area:`);
        console.log(
          `   Current position: (${item.position.x}, ${item.position.y})`,
        );

        // Get all positions except the one we're moving
        const otherPositions = allPositions.filter(
          (pos) => pos !== item.position,
        );

        // Generate new safe position
        const newPosition = generateSafePosition(otherPositions);
        const oldPosition = { ...item.position };

        // Update position in item and content
        item.position = newPosition;
        item.content.position = newPosition;

        // Update the allPositions array
        const index = allPositions.findIndex(
          (pos) => pos.x === oldPosition.x && pos.y === oldPosition.y,
        );
        if (index !== -1) {
          allPositions[index] = newPosition;
        }

        console.log(`   New position: (${newPosition.x}, ${newPosition.y})`);

        // Save updated content
        try {
          fs.writeFileSync(
            item.filePath,
            JSON.stringify(item.content, null, 2),
          );
          console.log(`   💾 Updated ${item.tag}/${item.slug}/content.json`);
          centralFixedCount++;
        } catch (error) {
          console.error(`   ❌ Failed to update ${item.filePath}:`, error);
        }

        console.log("");
      }
    }

    const totalFixed = overlapFixedCount + centralFixedCount;

    console.log(
      `🎉 Fixed ${totalFixed} thumbnail positions! (${overlapFixedCount} overlaps, ${centralFixedCount} central violations)`,
    );
    console.log("\n📋 Next steps:");
    console.log(
      "1. Run 'npm run generate:content' to regenerate portfolio data",
    );
    console.log("2. Restart your development server to see changes");
  } catch (error) {
    console.error("❌ Error fixing overlaps:", error);
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
🔧 Thumbnail Overlap Fixer

Usage: node scripts/fix-overlaps.js

This tool:
1. Scans all public/content directories for overlapping thumbnails
2. Identifies collision pairs and their distances
3. Automatically repositions overlapping items to safe locations
4. Updates content.json files with new positions
5. Preserves the central text area exclusion zone

The script will move thumbnails to new positions that:
- Don't overlap with other thumbnails
- Stay outside the central heading area (-500 to +500px, -300 to +300px)
- Maintain proper spacing (40px minimum between items)
- Distribute organically across the canvas
`);
  process.exit(0);
}

// Run the script
fixThumbnailOverlaps();
