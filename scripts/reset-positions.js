#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), "public", "content");
const TAG_DIRS = ["projects", "experiments", "insights"];

// Reset all positions to (0, 0) so they get regenerated with new algorithm
function resetPositions() {
  console.log("🔄 Resetting all thumbnail positions...\n");

  let resetCount = 0;

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
      const itemDir = path.join(tagDir, slug);
      const contentFile = path.join(itemDir, "content.json");

      if (!fs.existsSync(contentFile)) {
        console.warn(`Content file not found: ${contentFile}`);
        continue;
      }

      try {
        // Read current content
        const rawContent = fs.readFileSync(contentFile, "utf-8");
        const content = JSON.parse(rawContent);

        // Reset position to (0, 0)
        content.position = { x: 0, y: 0 };

        // Write back to file
        fs.writeFileSync(contentFile, JSON.stringify(content, null, 2));

        console.log(`📍 Reset ${tag}/${slug}`);
        resetCount++;
      } catch (error) {
        console.error(`❌ Error resetting ${tag}/${slug}:`, error);
      }
    }
  }

  console.log(`\n🎉 Reset ${resetCount} thumbnail positions!`);
  console.log("\n📋 Next steps:");
  console.log(
    "1. Run 'npm run generate:content' to regenerate with radial algorithm",
  );
  console.log("2. Public assets are already up to date");
  console.log("3. Restart your development server to see changes");
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
🔄 Position Reset Tool

Usage: node scripts/reset-positions.js

This tool resets all thumbnail positions in public/content to (0, 0) so
they will be regenerated using the new radial positioning algorithm when
you run 'npm run generate:content'.

This is useful when switching from the old random positioning to the
new radial/spiral positioning that grows outward from the center.
`);
  process.exit(0);
}

// Confirm action
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "⚠️  This will reset all thumbnail positions. Continue? (y/N): ",
  (answer) => {
    if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
      resetPositions();
    } else {
      console.log("Operation cancelled.");
    }
    rl.close();
  },
);
