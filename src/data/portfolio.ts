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

export const portfolioItems: PortfolioItem[] = [
  {
    id: "snow-dayz",
    title: "Storm Dayz",
    description:
      "I was spending time exploring tools like Runway AI and Kaiber AI, and became curious about how its outputs could live inside a more traditional motion design workflow. Rather than treating AI as the end result, I wanted to see how it could act as a collaborator—augmenting intuition, texture, and story.",
    shortDescription: "Experimenting with a new motion workflow",
    tag: "exploration",
    thumbnailUrl: "/content/snow-dayz/thumbnail.mp4",
    position: {
      x: -426,
      y: 362,
    },
    metadata: {
      date: "2024",
      technologies: ["Videography", "AI"],
      status: "completed",
      projectType: "AI + Motion",
    },
  },
  {
    id: "avara-medical",
    title: "Avara Medical",
    description:
      "Avara Medical challenged me to design without a clear narrative. The project sat at the intersection of healthcare, function, and regeneration—but without a defined meaning behind the name or a strong directional brief. What emerged was a study in restraint, structure, and finding clarity within ambiguity.",
    shortDescription: "Innovative healthcare solutions",
    tag: "digital",
    thumbnailUrl: "/content/avara-medical/thumbnail.mp4",
    position: {
      x: 200,
      y: -200,
    },
    metadata: {
      date: "2024",
      technologies: ["UX", "Design"],
      status: "completed",
      projectType: "Branding",
    },
  },
  {
    id: "seismic",
    title: "Seismic",
    description:
      "Rethinking Seismic’s proprietary software meant stepping back before moving forward. The goal wasn’t just to redesign screens, but to bring clarity, cohesion, and long-term structure to a complex internal platform.",
    shortDescription: "Redesigning an enterprise platform",
    tag: "digital",
    thumbnailUrl: "/content/seismic/thumbnail.jpg",
    position: {
      x: -100,
      y: 100,
    },
    metadata: {
      date: "2024",
      technologies: ["UX", "Design"],
      status: "completed",
      projectType: "Product",
    },
  },
  {
    id: "the-carriboo-jack",
    title: "The Carriboo Jack",
    description:
      "The Carriboo Jack was born from a love of biking, trails, community, and the simple joy of being out in the woods together. What started as an idea quickly became a hands-on experiment in experience design. It was grassroots in every sense, built with the help of countless friends, volunteers, and supporters along the way. Where to begin?",
    shortDescription: "A most excellent adventure turned cult-classic",
    tag: "experience",
    thumbnailUrl: "/content/the-carriboo-jack/thumbnail.mp4",
    position: {
      x: 72,
      y: -539,
    },
    metadata: {
      date: "2024",
      technologies: [
        "Event Planning & Management",
        "Storytelling",
        "Marketing",
        "Visual",
        "UX",
      ],
      status: "completed",
      projectType: "Event Management",
    },
  },

  {
    id: "ideation",
    title: "Ideation",
    description:
      "Traditional LLM interfaces treat conversations as a single, disposable thread. Once an idea passes, it's buried—lost to scrolling. Ideation allows you to connect insights across conversations, view ideas from unique perspectives, and discover patterns you might never see in a linear thread.",
    shortDescription: "Exploring the LLM experience.",
    tag: "digital",
    thumbnailUrl: "/content/ideation/thumbnail.mp4",
    position: {
      x: -538,
      y: -72,
    },
    metadata: {
      date: "2024",
      technologies: [
        "OpenAI API",
        "Claude API",
        "React",
        "TypeScript",
        "WebSockets",
        "Creative AI",
        "Collaborative Systems",
        "Human-Computer Interaction",
      ],
      status: "completed",
      projectType: "Product",
    },
  },

  {
    id: "exposed",
    title: "Exposed",
    description:
      "Sometimes the most powerful stories emerge from unplanned moments. What began as a casual trail-scouting mission in the Teton region transformed into a ten-hour epic—one that would eventually capture the attention of Outside Magazine and showcase the raw beauty of backcountry exploration.",
    shortDescription: "A picture is worth a thousand words",
    tag: "storytelling",
    thumbnailUrl: "/content/exposed/thumbnail.mp4",
    position: {
      x: 930,
      y: 410,
    },
    metadata: {
      projectType: "Storytelling",
    },
  },
];

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
          x: newPosition.x - 384 / 2,
          y: newPosition.y - 256 / 2,
          width: 384 + 40,
          height: 256 + 40,
        },
        {
          x: existingPos.x - 384 / 2,
          y: existingPos.y - 256 / 2,
          width: 384 + 40,
          height: 256 + 40,
        },
      ),
    )
  );

  return newPosition;
};
