import { PortfolioItem } from "../types/portfolio";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "viagen",
    title: "Viagen Platform",
    description:
      "A platform that empowers teams to move ideas towards production at the speed of thought. Viagen combines task management, AI automation and sane access control —it’s collaborative, safe, and fast.",
    shortDescription: "Product Design",
    thumbnailUrl: "/content/viagen/thumbnail.jpg",
    metadata: {
      projectType: "Product Design",
      client: "Compute & Token",
    },
  },
  {
    id: "avara",
    title: "Avara",
    description: "Avara Medical is a functional medicine clinic in Provo, UT",
    shortDescription: "Brand identity",
    thumbnailUrl: "/content/avara/thumbnail.jpg",
    metadata: {
      projectType: "Branding",
      client: "Avara Medical",
    },
  },
  {
    id: "peruvian-mountain-rides",
    title: "Peruvian Mountain Rides",
    description:
      "Peruvian Mountain Rides was born from a shared passion for exploration and a deep love for Peru’s untamed landscapes.",
    shortDescription: "Website Design + Webflow",
    thumbnailUrl: "/content/peruvian-mountain-rides/thumbnail.jpg",
    metadata: {
      projectType: "Website Design & Production",
    },
  },
  {
    id: "storm-dayz",
    title: "Storm Dayz",
    description:
      "I was spending time exploring tools like Runway AI, and became curious about how its outputs could live inside a more traditional motion design workflow. Rather than treating AI as the end result, I wanted to see how it could act as a collaborator—augmenting intuition, texture, and story.",
    shortDescription: "Photography + AI + After Effects",
    thumbnailUrl: "/content/storm-dayz/thumbnail.mp4",
    metadata: {
      projectType: "AI + Motion",
    },
  },
  {
    id: "the-carriboo-jack",
    title: "The Carriboo Jack",
    description:
      "The Carriboo Jack was born from a love of biking, trails, community, and the simple joy of being out in the woods together. What started as an idea quickly became a hands-on experiment in experience design. It was grassroots in every sense, built with the help of countless friends, volunteers, and supporters along the way. Where to begin?",
    shortDescription: "A most excellent adventure turned cult-classic",
    thumbnailUrl: "/content/the-carriboo-jack/thumbnail.mp4",
    metadata: {
      projectType: "UX & Event Management",
      client: "Mountain Bike the Tetons",
    },
  },
  {
    id: "seismic",
    title: "Seismo",
    description:
      "Rethinking Seismic's proprietary software meant stepping back before moving forward. The goal wasn't just to redesign screens, but to bring clarity, cohesion, and long-term structure to a complex internal platform.",
    shortDescription: "Redesigning an enterprise platform",
    thumbnailUrl: "/content/seismic/thumbnail.jpg",
    metadata: {
      projectType: "Product Design",
      client: "Seismic",
    },
  },
  {
    id: "exposed",
    title: "Exposed",
    description:
      "Sometimes the most powerful stories emerge from unplanned moments. What began as a casual trail-scouting mission in the Teton region transformed into a ten-hour epic—one that would eventually capture the attention of Outside Magazine and showcase the raw beauty of backcountry exploration.",
    shortDescription: "A picture is worth a thousand words",
    thumbnailUrl: "/content/exposed/thumbnail.mp4",
    metadata: {
      projectType: "Storytelling",
      client: "Outside Magazine",
    },
  },
  {
    id: "beers-on-trails",
    title: "Beers on Trails",
    description:
      "Beers on Trails is a mobile-first web app that unites beer and outdoor enthusiasts through modern location-based technology. 10 Barrel Brewing set out to bridge the gap between tech and active lifestyles—creating a platform that connects beer lovers across the country while they’re out exploring.",
    shortDescription: "Connecting beer drinkers and trail goers",
    thumbnailUrl: "/content/beers-on-trails/thumbnail.jpg",
    metadata: {
      projectType: "Product Design",
      client: "10 Barrel Brewing",
    },
  },
];

export const getItemById = (id: string) => {
  return portfolioItems.find((item) => item.id === id);
};
