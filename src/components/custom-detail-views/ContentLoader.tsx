"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { PortfolioItem } from "../../types/portfolio";

interface ContentLoaderProps {
  item: PortfolioItem | null;
  isVisible: boolean;
}

// Registry of custom content components
const customContentComponents: Record<
  string,
  () => Promise<{ default: React.ComponentType<{ item: PortfolioItem }> }>
> = {
  ideation: () => import("./ideation"),
  "the-carriboo-jack": () => import("./the-carriboo-jack"),
  exposed: () => import("./exposed"),
  "snow-dayz": () => import("./snow-dayz"),
  "avara-medical": () => import("./avara-medical"),
  seismic: () => import("./seismic"),
};

// Helper function to check if custom content exists
export const hasCustomContent = (itemId: string): boolean => {
  return itemId in customContentComponents;
};

// Cache for loaded components
const componentCache = new Map<
  string,
  React.ComponentType<{ item: PortfolioItem }>
>();

export const ContentLoader: React.FC<ContentLoaderProps> = ({
  item,
  isVisible,
}) => {
  const [ContentComponent, setContentComponent] = useState<React.ComponentType<{
    item: PortfolioItem;
  }> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!item || !isVisible) {
      setContentComponent(null);
      return;
    }

    const loadContent = async () => {
      const componentKey = item.id;

      // Check cache first
      if (componentCache.has(componentKey)) {
        const cachedComponent = componentCache.get(componentKey);
        if (cachedComponent) {
          setContentComponent(() => cachedComponent);
          return;
        }
      }

      // Check if custom content exists
      if (!hasCustomContent(componentKey)) {
        // No custom content, render nothing (could add default content here)
        setContentComponent(null);
        return;
      }

      try {
        setIsLoading(true);
        setLoadError(false);

        const loader = customContentComponents[componentKey];
        const module = await loader();
        const Component = module.default;

        // Cache the component
        componentCache.set(componentKey, Component);
        setContentComponent(() => Component);
      } catch (error) {
        console.warn(
          `Failed to load custom content for ${componentKey}:`,
          error,
        );
        setLoadError(true);
        setContentComponent(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [item?.id, isVisible]);

  // Don't render anything if not visible
  if (!isVisible || !item) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500">Unable to load project details</p>
        </div>
      </div>
    );
  }

  // Render custom content component
  if (ContentComponent) {
    return (
      <Suspense
        fallback={
          <div className="py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        }
      >
        <ContentComponent item={item} />
      </Suspense>
    );
  }

  // No custom content available
  return null;
};

export default ContentLoader;
