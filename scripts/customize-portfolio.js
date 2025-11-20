#!/usr/bin/env node

/**
 * Portfolio Customization Helper
 *
 * This script helps you customize your Nathan Kirschner portfolio
 * with your own content, images, and branding.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function log(message, color = "white") {
  console.log(colorize(message, color));
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(colorize(prompt, "cyan"), resolve);
  });
}

async function updatePersonalInfo() {
  log("\n🎨 Personalizing Your Portfolio", "bright");
  log("================================", "dim");

  const name = await question("Your full name: ");
  const tagline = await question('Your tagline (e.g., "pure mysticism"): ');
  const title = await question("Portfolio title: ");
  const description = await question("Portfolio description: ");

  // Update layout.tsx
  const layoutPath = path.join(process.cwd(), "src/app/layout.tsx");
  let layoutContent = fs.readFileSync(layoutPath, "utf8");

  layoutContent = layoutContent.replace(
    /title: "Nathan Kirschner"/,
    `title: "${name}"`,
  );
  layoutContent = layoutContent.replace(
    /description:\s*"[^"]*"/,
    `description: "${description}"`,
  );

  fs.writeFileSync(layoutPath, layoutContent);
  log(`✅ Updated layout metadata`, "green");

  // Update FloatingCanvas.tsx
  const canvasPath = path.join(
    process.cwd(),
    "src/components/FloatingCanvas.tsx",
  );
  let canvasContent = fs.readFileSync(canvasPath, "utf8");

  canvasContent = canvasContent.replace(/Nathan Kirschner/g, name);
  canvasContent = canvasContent.replace(/pure mysticism/g, tagline);

  fs.writeFileSync(canvasPath, canvasContent);
  log(`✅ Updated main canvas with your info`, "green");

  // Update FilterBar.tsx
  const filterPath = path.join(process.cwd(), "src/components/FilterBar.tsx");
  let filterContent = fs.readFileSync(filterPath, "utf8");

  filterContent = filterContent.replace(/Nathan Kirschner/g, name);
  filterContent = filterContent.replace(/pure mysticism/g, tagline);

  fs.writeFileSync(filterPath, filterContent);
  log(`✅ Updated filter bar with your info`, "green");
}

async function generatePortfolioItem() {
  log("\n📝 Adding New Portfolio Item", "bright");
  log("=============================", "dim");

  const id = await question('Unique ID (e.g., "my-awesome-project"): ');
  const title = await question("Project title: ");
  const description = await question("Full description: ");
  const shortDescription = await question("Short description: ");

  log("\nSelect type:", "yellow");
  log("1. Projects (production applications)");
  log("2. Experiments (exploratory work)");
  log("3. Insights (writings/reflections)");

  const typeChoice = await question("Choice (1-3): ");
  const tagMap = { 1: "projects", 2: "experiments", 3: "insights" };
  const tag = tagMap[typeChoice] || "projects";

  const technologies = await question("Technologies (comma-separated): ");
  const techArray = technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const status = await question("Status (completed/in-progress/concept): ");
  const date = await question("Date/Year: ");

  const hasLinks = await question("Add links? (y/n): ");
  let links = [];

  if (hasLinks.toLowerCase() === "y") {
    let addMore = true;
    while (addMore) {
      const label = await question("Link label: ");
      const url = await question("Link URL: ");
      links.push({ label, url });

      const more = await question("Add another link? (y/n): ");
      addMore = more.toLowerCase() === "y";
    }
  }

  // Generate collision-free position
  const dataPath = path.join(process.cwd(), "src/data/portfolioItems.ts");
  let dataContent = fs.readFileSync(dataPath, "utf8");

  // Extract existing positions (simple regex parsing)
  const positionMatches = dataContent.match(
    /position:\s*{\s*x:\s*(-?\d+(?:\.\d+)?),\s*y:\s*(-?\d+(?:\.\d+)?)\s*}/g,
  );
  const existingPositions = positionMatches
    ? positionMatches
        .map((match) => {
          const coords = match.match(
            /x:\s*(-?\d+(?:\.\d+)?),\s*y:\s*(-?\d+(?:\.\d+)?)/,
          );
          return coords
            ? { x: parseFloat(coords[1]), y: parseFloat(coords[2]) }
            : null;
        })
        .filter(Boolean)
    : [];

  // Generate position that doesn't overlap
  const THUMBNAIL_WIDTH = 192;
  const THUMBNAIL_HEIGHT = 144;
  const MIN_SPACING = 50;

  const rectanglesOverlap = (rect1, rect2) => {
    return !(
      rect1.x + rect1.width < rect2.x ||
      rect2.x + rect2.width < rect1.x ||
      rect1.y + rect1.height < rect2.y ||
      rect2.y + rect2.height < rect1.y
    );
  };

  let position;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    position = {
      x: Math.round((Math.random() - 0.5) * 1200),
      y: Math.round((Math.random() - 0.5) * 1000),
    };
    attempts++;
  } while (
    attempts < maxAttempts &&
    existingPositions.some((existingPos) =>
      rectanglesOverlap(
        {
          x: position.x - THUMBNAIL_WIDTH / 2,
          y: position.y - THUMBNAIL_HEIGHT / 2,
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
  );

  const newItem = {
    id,
    title,
    description,
    shortDescription,
    tag,
    thumbnailUrl: `/thumbnails/${id}.jpg`,
    imageUrl: `/images/${id}-full.jpg`,
    links: links.length > 0 ? links : undefined,
    position,
    metadata: {
      date,
      technologies: techArray.length > 0 ? techArray : undefined,
      status,
    },
  };

  // Add to portfolioItems.ts (dataContent already loaded above)

  // Find the closing bracket of the portfolioItems array
  const itemsEndIndex = dataContent.lastIndexOf("];");

  const itemString = JSON.stringify(newItem, null, 2)
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");

  const newContent =
    dataContent.slice(0, itemsEndIndex) +
    ",\n" +
    itemString +
    "\n" +
    dataContent.slice(itemsEndIndex);

  fs.writeFileSync(dataPath, newContent);
  log(`✅ Added "${title}" to portfolio`, "green");
  log(
    `📸 Don't forget to add thumbnail: /public/thumbnails/${id}.jpg`,
    "yellow",
  );
}

async function customizeTheme() {
  log("\n🎨 Theme Customization", "bright");
  log("======================", "dim");

  log("Current theme uses mystical dark colors with subtle gradients.");
  log("You can customize colors in src/app/globals.css");

  const customize = await question("Open globals.css for editing? (y/n): ");

  if (customize.toLowerCase() === "y") {
    const cssPath = path.join(process.cwd(), "src/app/globals.css");

    log("\n🎨 Color Customization Guide:", "yellow");
    log("- Main background: --background variable");
    log("- Text color: --foreground variable");
    log("- Accent colors: Modify the theme colors in Tailwind config");
    log("- Animation speeds: Adjust duration values in CSS classes");

    if (process.platform === "darwin") {
      require("child_process").exec(`open "${cssPath}"`);
    } else if (process.platform === "win32") {
      require("child_process").exec(`start "${cssPath}"`);
    } else {
      require("child_process").exec(`xdg-open "${cssPath}"`);
    }

    log(`✅ Opening ${cssPath}`, "green");
  }
}

async function generatePlaceholderImages() {
  log("\n🖼️  Placeholder Image Generation", "bright");
  log("=================================", "dim");

  log("To generate placeholder images:");
  log("1. Open scripts/generate-placeholders.html in your browser");
  log('2. Click "Generate All Placeholders"');
  log("3. Download and save images to public/thumbnails/");

  const open = await question("Open placeholder generator? (y/n): ");

  if (open.toLowerCase() === "y") {
    const htmlPath = path.join(
      process.cwd(),
      "scripts/generate-placeholders.html",
    );

    if (process.platform === "darwin") {
      require("child_process").exec(`open "${htmlPath}"`);
    } else if (process.platform === "win32") {
      require("child_process").exec(`start "${htmlPath}"`);
    } else {
      require("child_process").exec(`xdg-open "${htmlPath}"`);
    }

    log(`✅ Opening placeholder generator`, "green");
  }
}

async function validateSetup() {
  log("\n✅ Setup Validation", "bright");
  log("===================", "dim");

  const checks = [
    { path: "src/app/layout.tsx", name: "Layout component" },
    { path: "src/data/portfolioItems.ts", name: "Portfolio data" },
    { path: "public/thumbnails", name: "Thumbnails directory" },
    { path: "public/images", name: "Images directory" },
    { path: "src/app/globals.css", name: "Global styles" },
  ];

  let allGood = true;

  checks.forEach((check) => {
    const fullPath = path.join(process.cwd(), check.path);
    const exists = fs.existsSync(fullPath);

    if (exists) {
      log(`✅ ${check.name}`, "green");
    } else {
      log(`❌ ${check.name} - Missing: ${check.path}`, "red");
      allGood = false;
    }
  });

  if (allGood) {
    log("\n🎉 All components are in place!", "green");
  } else {
    log("\n⚠️  Some files are missing. Please check the setup.", "yellow");
  }
}

async function showMainMenu() {
  while (true) {
    log("\n🌌 Portfolio Customization Tool", "bright");
    log("================================", "dim");
    log("1. 👤 Update personal information");
    log("2. 📝 Add new portfolio item");
    log("3. 🎨 Customize theme");
    log("4. 🖼️  Generate placeholder images");
    log("5. ✅ Validate setup");
    log("6. 🚪 Exit");

    const choice = await question("\nSelect option (1-6): ");

    switch (choice) {
      case "1":
        await updatePersonalInfo();
        break;
      case "2":
        await generatePortfolioItem();
        break;
      case "3":
        await customizeTheme();
        break;
      case "4":
        await generatePlaceholderImages();
        break;
      case "5":
        await validateSetup();
        break;
      case "6":
        log("\n✨ Happy coding! Your mystical portfolio awaits.", "magenta");
        rl.close();
        return;
      default:
        log("Invalid choice. Please select 1-6.", "red");
    }
  }
}

// Welcome message
log("\n" + "=".repeat(50), "cyan");
log("🌌 Welcome to the Portfolio Customization Tool", "bright");
log("=".repeat(50), "cyan");
log("\nThis tool helps you personalize the mystical portfolio");
log("template with your own content and branding.\n", "dim");

showMainMenu().catch(console.error);
