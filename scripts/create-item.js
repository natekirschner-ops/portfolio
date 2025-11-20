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
const VALID_TAGS = ["projects", "experiments", "insights"];

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Create directory if it doesn't exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Main function
async function createItem() {
  console.log("\n🚀 Create New Portfolio Item\n");

  try {
    // Get item details
    const title = await question("Title: ");
    if (!title.trim()) {
      console.log("❌ Title is required");
      rl.close();
      return;
    }

    const description = await question("Description: ");
    if (!description.trim()) {
      console.log("❌ Description is required");
      rl.close();
      return;
    }

    const shortDescription = await question("Short description (optional): ");

    console.log("\nAvailable tags:");
    VALID_TAGS.forEach((tag, index) => {
      console.log(`  ${index + 1}. ${tag}`);
    });

    const tagChoice = await question("\nSelect tag (1-3): ");
    const tagIndex = parseInt(tagChoice) - 1;

    if (tagIndex < 0 || tagIndex >= VALID_TAGS.length) {
      console.log("❌ Invalid tag selection");
      rl.close();
      return;
    }

    const tag = VALID_TAGS[tagIndex];

    // Optional fields
    const date = await question("Date (optional): ");
    const technologies = await question(
      "Technologies (comma-separated, optional): ",
    );
    const status = await question(
      "Status (completed/in-progress/concept, optional): ",
    );
    const liveUrl = await question("Live URL (optional): ");
    const githubUrl = await question("GitHub URL (optional): ");
    const caseStudyUrl = await question("Case Study URL (optional): ");

    // Generate slug
    const slug = generateSlug(title);
    console.log(`\n📁 Creating item with slug: ${slug}`);

    // Create directories
    const contentDir = path.join(process.cwd(), "public", "content", tag, slug);
    ensureDir(contentDir);

    // Build content object
    const content = {
      id: slug,
      title,
      description,
      ...(shortDescription && { shortDescription }),
      thumbnailUrl: "thumbnail.jpg",
      ...(tag === "projects" && { imageUrl: "hero-image.jpg" }),
      position: { x: 0, y: 0 }, // Will be auto-generated
      metadata: {
        ...(date && { date }),
        ...(technologies && {
          technologies: technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
        ...(status &&
          ["completed", "in-progress", "concept"].includes(status) && {
            status,
          }),
      },
    };

    // Add links if provided
    const links = [];
    if (liveUrl) links.push({ label: "Live Demo", url: liveUrl });
    if (githubUrl) links.push({ label: "GitHub", url: githubUrl });
    if (caseStudyUrl) links.push({ label: "Case Study", url: caseStudyUrl });
    if (links.length > 0) content.links = links;

    // Write content.json
    const contentFile = path.join(contentDir, "content.json");
    fs.writeFileSync(contentFile, JSON.stringify(content, null, 2));

    // Create placeholder README
    const readme = `# ${title}

${description}

## Assets Needed

- \`thumbnail.jpg\` - Main thumbnail image (recommended: 384x288px)
${tag === "projects" ? "- `hero-image.jpg` - Hero image for detail view\n" : ""}
- Additional images can be placed in this directory and referenced in custom layouts

## Custom Layout

To create a custom modal layout for this item, create a \`layout.tsx\` file in this directory.

## Notes

- Auto-generated slug: ${slug}
- Position will be automatically assigned to avoid collisions
- Edit \`content.json\` to update item properties
`;

    fs.writeFileSync(path.join(contentDir, "README.md"), readme);

    console.log("\n✅ Item created successfully!");
    console.log(`📁 Location: public/content/${tag}/${slug}/`);
    console.log("\n📋 Next steps:");
    console.log(`1. Add thumbnail.jpg to public/content/${tag}/${slug}/`);
    if (tag === "projects") {
      console.log(`2. Add hero-image.jpg to public/content/${tag}/${slug}/`);
    }
    console.log(`3. Update content.json if needed`);
    console.log(`4. Restart your development server to see the changes`);
  } catch (error) {
    console.error("❌ Error creating item:", error.message);
  } finally {
    rl.close();
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
🚀 Portfolio Item Creator

Usage: node scripts/create-item.js

This tool will guide you through creating a new portfolio item.
It will create:
- A new directory in public/content/{tag}/{slug}/
- A content.json file with your item data
- A README.md with instructions

Available tags: ${VALID_TAGS.join(", ")}
`);
  process.exit(0);
}

// Run the script
createItem();
