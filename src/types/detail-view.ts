import * as React from "react";

export interface DetailViewProps {
  item: PortfolioItem;
  isOpen: boolean;
  onClose: () => void;
}

export interface DetailViewAnimationState {
  isVisible: boolean;
  isContentVisible: boolean;
}

// Extended props that custom detail views receive
export interface ExtendedDetailViewProps extends DetailViewProps {
  // Animation state helpers
  animationState: DetailViewAnimationState;
  // Common handlers
  handleBackdropClick: (e: React.MouseEvent) => void;
  handleEscapeKey?: (e: KeyboardEvent) => void;
}

export interface DetailViewComponent {
  (props: ExtendedDetailViewProps): React.JSX.Element | null;
}

// Base props that all custom detail views should accept
export interface BaseDetailViewProps extends ExtendedDetailViewProps {}

// Common styling utilities for consistent UX patterns
export const detailViewStyles = {
  backdrop: "fixed inset-0 z-50 transition-all duration-300",
  backdropBlur: "absolute inset-0 bg-white/95 backdrop-blur-sm",
  modal:
    "relative w-full h-full bg-white/95 backdrop-blur-xl overflow-hidden transition-all duration-300",
  closeButton:
    "fixed top-6 right-6 z-20 px-4 py-2 bg-white/80 hover:bg-white/90 border border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-200 shadow-lg backdrop-blur-sm rounded-md text-sm font-thicccboi font-medium uppercase tracking-wide",
  scrollContent: "overflow-y-auto h-full",

  // Header styles
  header: "relative p-8 pb-6 border-b border-gray-200",
  headerGlow: "absolute inset-0 opacity-20",
  headerContent: "relative",
  tagAndStatus: "flex items-center justify-between mb-4",
  tag: "px-3 py-1.5 rounded-full text-sm font-thicccboi font-medium border border-gray-300 text-gray-700 bg-gray-50 uppercase tracking-wide",
  status: "flex items-center space-x-4 text-sm text-gray-600",
  title: "text-4xl font-thicccboi font-medium text-gray-900 mb-4 leading-tight",
  shortDescription:
    "text-xl font-playfair text-gray-700 font-light italic leading-relaxed",

  // Content styles
  content: "p-8",
  prose: "prose prose-lg max-w-none mb-8",
  description: "font-thicccboi text-gray-700 leading-relaxed text-lg",

  // Navigation hint
  navigationHint:
    "fixed bottom-6 left-6 text-gray-500 text-sm font-thicccboi z-20",
} as const;

// Tag-specific colors
export const tagColors = {
  exploration: {
    gradient: "#8b5cf6",
    background: "bg-purple-500/20",
    text: "text-purple-300",
    border: "border-purple-500/30",
    accent: "text-purple-700",
    section: "from-purple-50 to-transparent border-purple-200",
  },
  experience: {
    gradient: "#3b82f6",
    background: "bg-blue-500/20",
    text: "text-blue-300",
    border: "border-blue-500/30",
    accent: "text-blue-700",
    section: "from-blue-50 to-transparent border-blue-200",
  },
  digital: {
    gradient: "#10b981",
    background: "bg-emerald-500/20",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    accent: "text-emerald-700",
    section: "from-emerald-50 to-transparent border-emerald-200",
  },
  motion: {
    gradient: "#ef4444",
    background: "bg-red-500/20",
    text: "text-red-300",
    border: "border-red-500/30",
    accent: "text-red-700",
    section: "from-red-50 to-transparent border-red-200",
  },
  storytelling: {
    gradient: "#ec4899",
    background: "bg-pink-500/20",
    text: "text-pink-300",
    border: "border-pink-500/30",
    accent: "text-pink-700",
    section: "from-pink-50 to-transparent border-pink-200",
  },
  brand: {
    gradient: "#6366f1",
    background: "bg-indigo-500/20",
    text: "text-indigo-300",
    border: "border-indigo-500/30",
    accent: "text-indigo-700",
    section: "from-indigo-50 to-transparent border-indigo-200",
  },
} as const;

// Status indicators
export const statusColors = {
  completed: "text-green-400",
  "in-progress": "text-yellow-400",
  concept: "text-gray-400",
} as const;

export const statusIcons = {
  completed: "✓",
  "in-progress": "⋯",
  concept: "○",
} as const;

// Import type from portfolio types
import { PortfolioItem } from "./portfolio";
