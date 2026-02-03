import { lazy } from "react";
import { DetailViewComponent } from "../../types/detail-view";

// Registry of custom detail views
// Add new custom detail views here as they are created
export const customDetailViews: Record<
  string,
  () => Promise<{ default: DetailViewComponent }>
> = {
  // Custom detail views for all projects
  ideation: () => import("./ideation"),
  "the-carriboo-jack": () => import("./the-carriboo-jack"),
  exposed: () => import("./exposed"),
  "snow-dayz": () => import("./snow-dayz"),
  "avara-medical": () => import("./avara-medical"),
  seismic: () => import("./seismic"),
};

// Helper function to check if a custom detail view exists
export const hasCustomDetailView = (itemId: string): boolean => {
  return itemId in customDetailViews;
};

// Helper function to load a custom detail view
export const loadCustomDetailView = async (
  itemId: string,
): Promise<DetailViewComponent | null> => {
  const loader = customDetailViews[itemId];
  if (!loader) {
    return null;
  }

  try {
    const module = await loader();
    return module.default || null;
  } catch (error) {
    // Failed to load custom detail view, using fallback
    return null;
  }
};
