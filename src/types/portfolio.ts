export type PortfolioTag =
  | "exploration"
  | "experience"
  | "digital"
  | "motion"
  | "storytelling"
  | "brand";

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
  tag: PortfolioTag;
  thumbnailUrl: string;
  imageUrl?: string;
  media?: MediaItem[] | MediaGallery;
  links?: {
    label: string;
    url: string;
    icon?: string;
  }[];
  position: {
    x: number;
    y: number;
  };
  metadata?: {
    date?: string;
    technologies?: string[];
    status?: "completed" | "in-progress" | "concept";
    hideToolset?: boolean;
  };
}

export interface CanvasState {
  viewportX: number;
  viewportY: number;
  isDragging: boolean;
  velocity: {
    x: number;
    y: number;
  };
}

export interface FilterState {
  activeFilters: Set<PortfolioTag>;
  isFiltering: boolean;
}

export interface DetailViewState {
  selectedItem: PortfolioItem | null;
  isOpen: boolean;
}
