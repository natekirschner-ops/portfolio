"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { PortfolioItem } from "../types/portfolio";
import {
  DetailViewComponent,
  DetailViewAnimationState,
  detailViewStyles,
} from "../types/detail-view";
import {
  hasCustomDetailView,
  loadCustomDetailView,
} from "./custom-detail-views";
import { DefaultDetailView } from "./DefaultDetailView";

interface DetailViewLoaderProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

// Cache for loaded components to avoid re-importing
const componentCache = new Map<string, DetailViewComponent>();

export const DetailViewLoader = ({
  item,
  isOpen,
  onClose,
}: DetailViewLoaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [DetailViewComponent, setDetailViewComponent] =
    useState<DetailViewComponent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Animation state for custom detail views
  const animationState: DetailViewAnimationState = {
    isVisible,
    isContentVisible,
  };

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsContentVisible(true), 50);
    } else {
      setIsContentVisible(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  // Dynamic component loading
  useEffect(() => {
    if (!item) {
      setDetailViewComponent(null);
      return;
    }

    const componentKey = `${item.tag}/${item.id}`;

    // Check cache first
    if (componentCache.has(componentKey)) {
      setDetailViewComponent(() => componentCache.get(componentKey)!);
      return;
    }

    // Load component dynamically
    const loadComponent = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        // Try to load custom DetailView for this item using registry
        const Component = await loadCustomDetailView(item.id);

        if (Component) {
          componentCache.set(componentKey, Component);
          setDetailViewComponent(() => Component);
        } else {
          throw new Error("No custom component found");
        }
      } catch (error) {
        console.warn(
          `Custom DetailView not found for ${componentKey}, falling back to default:`,
          error,
        );
        setLoadError(true);

        // Fall back to a generic detail view if custom one doesn't exist
        setDetailViewComponent(() => DefaultDetailView);
      } finally {
        setIsLoading(false);
      }
    };

    loadComponent();
  }, [item]);

  if (!isVisible || !item) return null;

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`${detailViewStyles.backdrop} ${isContentVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className={detailViewStyles.backdropBlur} />
        <div
          className={`${detailViewStyles.modal} ${isContentVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        >
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 font-thicccboi">
              Loading detail view...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state - this shouldn't happen often as we fallback to DefaultDetailView
  if (loadError && !DetailViewComponent) {
    return (
      <div
        className={`${detailViewStyles.backdrop} ${isContentVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleBackdropClick}
      >
        <div className={detailViewStyles.backdropBlur} />
        <div
          className={`${detailViewStyles.modal} ${isContentVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        >
          <button onClick={onClose} className={detailViewStyles.closeButton}>
            CLOSE
          </button>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 font-thicccboi mb-2">
                Failed to load detail view
              </div>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 underline text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the custom detail view component
  if (DetailViewComponent) {
    return (
      <Suspense
        fallback={
          <div className={`${detailViewStyles.backdrop} opacity-100`}>
            <div className={detailViewStyles.backdropBlur} />
            <div
              className={`${detailViewStyles.modal} scale-100 translate-y-0`}
            >
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500 font-thicccboi">Loading...</div>
              </div>
            </div>
          </div>
        }
      >
        <DetailViewComponent
          item={item}
          isOpen={isOpen}
          onClose={onClose}
          animationState={animationState}
          handleBackdropClick={handleBackdropClick}
        />
      </Suspense>
    );
  }

  return null;
};
