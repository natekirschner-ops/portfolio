import { lazy } from "react";
import { DetailViewComponent } from "../../types/detail-view";

// Registry of custom detail views
// Add new custom detail views here as they are created
export const customDetailViews: Record<
  string,
  () => Promise<{ default: DetailViewComponent }>
> = {
  // Custom detail views temporarily disabled to focus on base template
  // Projects
  // "beers-on-trails": () => import("./beers-on-trails/DetailView"),
  // Add project detail views here as they are created
  // Experiments
  // Add experiment detail views here as they are created
  // Insights
  // Add insight detail views here as they are created
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
