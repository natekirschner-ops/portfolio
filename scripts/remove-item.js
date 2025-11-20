#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify readline question
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// Valid tags
const TAG_DIRS = ["projects", "experiments", "insights"];

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), "public", "content");

// Load all existing items
const loadAllItems = () => {
  const items = [];

  for (const tag of TAG_DIRS) {
    const tagDir = path.join(CONTENT_DIR, tag);

    if (!fs.existsSync(tagDir)) {
      continue;
    }

    const itemSlugs = fs.readdirSync(tagDir).filter((item) => {
      const itemPath = path.join(tagDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const slug of itemSlugs) {
      const itemDir = path.join(tagDir, slug);
      const contentFile = path.join(itemDir, "content.json");

      if (fs.existsSync(contentFile)) {
        try {
          const rawContent = fs.readFileSync(contentFile, "utf-8");
          const content = JSON.parse(rawContent);
          items.push({
            id: content.id || slug,
            title: content.title,
            tag,
            slug,
            path: itemDir,
          });
        } catch (error) {
          console.warn(`Warning: Could not read ${contentFile}`);
        }
      }
    }
  }

  return items.sort((a, b) => {
    // Sort by tag first, then by title
    if (a.tag !== b.tag) {
      return a.tag.localeCompare(b.tag);
    }
    return a.title.localeCompare(b.title);
  });
};

// Display items in a nice format
const displayItems = (items) => {
  console.log("\n📋 Current Portfolio Items:\n");

  const tagSymbols = {
    projects: "◉",
    experiments: "◈",
    insights: "◊",
  };

  let currentTag = "";
  items.forEach((item, index) => {
    if (item.tag !== currentTag) {
      currentTag = item.tag;
      console.log(`\n${tagSymbols[item.tag]} ${item.tag.toUpperCase()}:`);
    }
    console.log(`   ${index + 1}. ${item.title}`);
  });
  console.log("");
};

// Remove item directory safely
const removeItemDirectory = (itemPath) => {
  try {
    // Remove directory recursively
    fs.rmSync(itemPath, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.error(`❌ Error removing directory: ${error.message}`);
    return false;
  }
};

// Update public directory
const updatePublicDirectory = () => {
  // No longer needed - working directly in public/content
  console.log("   ✅ Public directory is already up to date");
  return true;
};

// Main function
async function removeItem() {
  console.log("\n🗑️  Remove Portfolio Item\n");

  try {
    // Load all items
    const items = loadAllItems();

    if (items.length === 0) {
      console.log("📭 No portfolio items found!");
      rl.close();
      return;
    }

    // Display current items
    displayItems(items);

    // Get selection
    const selection = await question(
      `Select item to remove (1-${items.length}): `,
    );
    const itemIndex = parseInt(selection) - 1;

    if (itemIndex < 0 || itemIndex >= items.length) {
      console.log("❌ Invalid selection");
      rl.close();
      return;
    }

    const selectedItem = items[itemIndex];

    // Confirmation
    console.log(`\n⚠️  You are about to remove:`);
    console.log(`   Title: ${selectedItem.title}`);
    console.log(`   Type: ${selectedItem.tag}`);
    console.log(
      `   Path: public/content/${selectedItem.tag}/${selectedItem.slug}/`,
    );

    const confirm = await question(
      "\nAre you sure? This cannot be undone! (yes/no): ",
    );

    if (confirm.toLowerCase() !== "yes") {
      console.log("❌ Removal cancelled");
      rl.close();
      return;
    }

    // Remove the item
    console.log(`\n🗑️  Removing ${selectedItem.title}...`);

    // Step 1: Remove directory
    if (!removeItemDirectory(selectedItem.path)) {
      rl.close();
      return;
    }
    console.log(
      `   ✅ Removed public/content/${selectedItem.tag}/${selectedItem.slug}/`,
    );

    // Step 2: Regenerate portfolio data
    console.log("   🔄 Regenerating portfolio data...");
    try {
      const { execSync } = require("child_process");
      execSync("npm run generate:content", {
        cwd: process.cwd(),
        stdio: "pipe", // Suppress output for cleaner display
      });
      console.log("   ✅ Portfolio data regenerated");
    } catch (error) {
      console.log("   ⚠️  Warning: Could not regenerate portfolio data");
      console.log("      Run 'npm run generate:content' manually");
    }

    // Step 3: Update public directory
    console.log("   📁 Updating public assets...");
    if (updatePublicDirectory()) {
      console.log("   ✅ Public directory updated");
    } else {
      console.log("   ⚠️  Warning: Could not update directory");
    }

    // Success message
    console.log(`\n🎉 Successfully removed "${selectedItem.title}"!`);

    // Show updated count
    const remainingItems = loadAllItems();
    console.log(`📊 Portfolio now contains ${remainingItems.length} items`);

    console.log("\n📋 Next steps:");
    console.log("1. Restart your development server if running");
    console.log("2. The item has been completely removed from the portfolio");
    console.log("3. Changes will be reflected immediately");
  } catch (error) {
    console.error("❌ Error removing item:", error.message);
  } finally {
    rl.close();
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
🗑️  Portfolio Item Remover

Usage: node scripts/remove-item.js

This tool will:
1. Show all current portfolio items
2. Let you select which one to remove
3. Safely delete the content directory
4. Regenerate portfolio data

The removal is permanent and cannot be undone!

Safety features:
- Shows exactly what will be removed
- Requires explicit "yes" confirmation
- Updates all generated files automatically
- Provides clear next steps
`);
  process.exit(0);
}

// Handle direct slug removal
if (args.length > 0) {
  const targetSlug = args[0];
  const targetTag = args[1];

  if (!targetTag || !TAG_DIRS.includes(targetTag)) {
    console.log("❌ Usage: node scripts/remove-item.js [slug] [tag]");
    console.log(`   Valid tags: ${TAG_DIRS.join(", ")}`);
    process.exit(1);
  }

  const targetPath = path.join(CONTENT_DIR, targetTag, targetSlug);

  if (!fs.existsSync(targetPath)) {
    console.log(
      `❌ Item not found: public/content/${targetTag}/${targetSlug}/`,
    );
    process.exit(1);
  }

  console.log(`🗑️  Removing public/content/${targetTag}/${targetSlug}/...`);
  if (removeItemDirectory(targetPath)) {
    console.log("✅ Item removed successfully");
    console.log("💡 Run 'npm run generate:content' to update portfolio data");
  }
  process.exit(0);
}

// Run the interactive script
removeItem();
