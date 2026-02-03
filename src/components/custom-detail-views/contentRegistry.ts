import React from "react";
import { PortfolioItem } from "../../types/portfolio";

// Simple type for content-only components that work with the shared media system
export interface DetailContentComponent {
  (props: { item: PortfolioItem }): React.JSX.Element;
}

// Registry of custom detail content components (simplified to use index files)
export const customDetailComponents: Record<
  string,
  () => Promise<{ default: DetailContentComponent }>
> = {
  ideation: () => import("./ideation"),
  "the-carriboo-jack": () => import("./the-carriboo-jack"),
  exposed: () => import("./exposed"),
  "snow-dayz": () => import("./snow-dayz"),
  "avara-medical": () => import("./avara-medical"),
  seismic: () => import("./seismic"),
};

// Helper function to check if custom detail component exists
export const hasCustomDetailComponent = (itemId: string): boolean => {
  return itemId in customDetailComponents;
};

// Helper function to load custom detail component
export const loadCustomDetailComponent = async (
  itemId: string,
): Promise<DetailContentComponent | null> => {
  const loader = customDetailComponents[itemId];
  if (!loader) {
    return null;
  }

  try {
    const module = await loader();
    return module.default || null;
  } catch (error) {
    console.warn(
      `Failed to load custom detail component for ${itemId}:`,
      error,
    );
    return null;
  }
};
