export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
}

export interface MediaGallery {
  items: MediaItem[];
  layout?: "grid" | "masonry" | "carousel" | "single";
  columns?: 1 | 2 | 3 | 4;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl: string;
  imageUrl?: string;
  media?: MediaItem[] | MediaGallery;
  links?: {
    label: string;
    url: string;
    icon?: string;
  }[];
  metadata?: {
    date?: string;
    technologies?: string[];
    status?: "completed" | "in-progress" | "concept";
    hideToolset?: boolean;
    projectType?: string;
    client?: string;
  };
}
