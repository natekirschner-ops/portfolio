"use client";

import { useEffect, useState, useRef } from "react";
import { portfolioItems } from "../data/portfolio";
import { PortfolioItem } from "../types/portfolio";
import {
  hasCustomDetailComponent,
  loadCustomDetailComponent,
  DetailContentComponent,
} from "./custom-detail-views/contentRegistry";

export const Portfolio = () => {
  const [showUI, setShowUI] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [hoveredItem, setHoveredItem] = useState<PortfolioItem | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentFading, setContentFading] = useState(false);
  const [customDetailContent, setCustomDetailContent] =
    useState<DetailContentComponent | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [portfolioScrollPosition, setPortfolioScrollPosition] = useState(0);
  const [sharedMedia, setSharedMedia] = useState<{
    item: PortfolioItem;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
  } | null>(null);

  // Define project order and get items
  const projectOrder = [
    "ideation",
    "the-carriboo-jack",
    "seismic",
    "exposed",

    "snow-dayz",
  ];

  const orderedItems = projectOrder
    .map((id) => portfolioItems.find((item) => item.id === id))
    .filter(Boolean) as PortfolioItem[];

  const handleItemClick = (item: PortfolioItem) => {
    if (hoveredItem?.id === item.id) {
      // Set up shared media at hover position
      setSharedMedia({
        item,
        x: mousePosition.x,
        y: mousePosition.y,
        width: 336,
        height: 209,
        visible: true,
      });
      // Save current scroll position before transition
      setPortfolioScrollPosition(window.scrollY);

      // Start fade to black transition with delay for proper animation
      setFadeToBlack(true);

      // Delay contentFading to allow black overlay to fade in gradually
      setTimeout(() => {
        setContentFading(true);
        // Reset scroll position and scrollY state immediately when black overlay becomes visible
        window.scrollTo(0, 0);
        setScrollY(0);
      }, 50);

      setHoveredItem(null);
      setSelectedItem(item);

      // Start transition animation
      setTimeout(() => {
        setIsTransitioning(true);
        setSharedMedia((prev) => {
          if (!prev) return null;

          // Calculate responsive dimensions
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Mobile breakpoint
          const isMobile = viewportWidth < 768;
          const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

          // Responsive width with proper padding
          let maxWidth;
          if (isMobile) {
            maxWidth = Math.min(viewportWidth - 24, 400); // Smaller on mobile
          } else if (isTablet) {
            maxWidth = Math.min(viewportWidth - 48, 600); // Medium on tablet
          } else {
            maxWidth = Math.min(viewportWidth - 64, 800); // Full on desktop
          }

          // Maintain aspect ratio (16:9)
          const aspectRatio = 16 / 9;
          const calculatedHeight = maxWidth / aspectRatio;

          // Responsive max height based on device
          const maxHeight = isMobile
            ? viewportHeight * 0.4 // Smaller on mobile to save space
            : viewportHeight * 0.6;

          const finalHeight = Math.min(calculatedHeight, maxHeight);
          const finalWidth = finalHeight * aspectRatio;

          // Increase size by 20% for detail view
          const scaledWidth = finalWidth * 1.2;
          const scaledHeight = finalHeight * 1.2;

          // Ensure scaled dimensions don't exceed viewport with padding
          const maxScaledWidth = viewportWidth - (isMobile ? 24 : 64);
          const maxScaledHeight = viewportHeight * (isMobile ? 0.5 : 0.7);

          const constrainedWidth = Math.min(scaledWidth, maxScaledWidth);
          const constrainedHeight = Math.min(scaledHeight, maxScaledHeight);

          // Maintain aspect ratio after constraints
          const aspectConstrainedWidth = constrainedHeight * aspectRatio;
          const aspectConstrainedHeight = constrainedWidth / aspectRatio;

          const finalScaledWidth = Math.min(
            constrainedWidth,
            aspectConstrainedWidth,
          );
          const finalScaledHeight = Math.min(
            constrainedHeight,
            aspectConstrainedHeight,
          );

          // Center shared media on the page
          const yPosition = viewportHeight / 2;

          return {
            ...prev,
            x: viewportWidth / 2,
            y: yPosition,
            width: Math.round(finalScaledWidth),
            height: Math.round(finalScaledHeight),
          };
        });
      }, 50);

      // Switch to detail view after animation
      setTimeout(async () => {
        setViewMode("detail");
        setIsTransitioning(false);

        // Load custom detail component if available
        if (hasCustomDetailComponent(item.id)) {
          const contentComponent = await loadCustomDetailComponent(item.id);
          setCustomDetailContent(() => contentComponent);
        }

        // Fade content back in with slight delay for smoother transition
        setTimeout(() => {
          setContentFading(false);
          setFadeToBlack(false);
        }, 200);
      }, 850);
    } else {
      // Direct open if not hovering
      setSelectedItem(item);
      setViewMode("detail");
    }
  };

  const handleCloseDetailView = () => {
    setContentFading(true);
    setFadeToBlack(true);
    setTimeout(() => {
      setViewMode("list");
      setSharedMedia(null);
      setSelectedItem(null);
      setCustomDetailContent(null);
      setContentFading(false);
      setFadeToBlack(false);

      // Restore portfolio scroll position after a short delay
      setTimeout(() => {
        window.scrollTo(0, portfolioScrollPosition);
      }, 100);
    }, 400);
  };

  const handleMouseMove = (e: React.MouseEvent, item: PortfolioItem) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // Prevent scroll bounce on detail view
  useEffect(() => {
    if (viewMode === "detail") {
      // Store original styles
      const originalBodyStyle = document.body.style.cssText;
      const originalHtmlStyle = document.documentElement.style.cssText;

      // Apply styles to prevent bounce
      document.body.style.overscrollBehavior = "none";
      document.body.style.backgroundColor = "#000";
      document.documentElement.style.overscrollBehavior = "none";
      document.documentElement.style.backgroundColor = "#000";

      // Cleanup on unmount or mode change
      return () => {
        document.body.style.cssText = originalBodyStyle;
        document.documentElement.style.cssText = originalHtmlStyle;
      };
    }
  }, [viewMode]);

  // Handle window resize for responsive shared media
  useEffect(() => {
    const handleResize = () => {
      if (sharedMedia && viewMode === "detail") {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isMobile = viewportWidth < 768;
        const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

        let maxWidth;
        if (isMobile) {
          maxWidth = Math.min(viewportWidth - 24, 400);
        } else if (isTablet) {
          maxWidth = Math.min(viewportWidth - 48, 600);
        } else {
          maxWidth = Math.min(viewportWidth - 64, 800);
        }

        const aspectRatio = 16 / 9;
        const calculatedHeight = maxWidth / aspectRatio;
        const maxHeight = isMobile
          ? viewportHeight * 0.4
          : viewportHeight * 0.6;
        const finalHeight = Math.min(calculatedHeight, maxHeight);
        const finalWidth = finalHeight * aspectRatio;

        // Increase size by 20% for detail view
        const scaledWidth = finalWidth * 1.2;
        const scaledHeight = finalHeight * 1.2;

        // Ensure scaled dimensions don't exceed viewport with padding
        const maxScaledWidth = viewportWidth - (isMobile ? 24 : 64);
        const maxScaledHeight = viewportHeight * (isMobile ? 0.5 : 0.7);

        const constrainedWidth = Math.min(scaledWidth, maxScaledWidth);
        const constrainedHeight = Math.min(scaledHeight, maxScaledHeight);

        // Maintain aspect ratio after constraints
        const aspectConstrainedWidth = constrainedHeight * aspectRatio;
        const aspectConstrainedHeight = constrainedWidth / aspectRatio;

        const finalScaledWidth = Math.min(
          constrainedWidth,
          aspectConstrainedWidth,
        );
        const finalScaledHeight = Math.min(
          constrainedHeight,
          aspectConstrainedHeight,
        );

        const yPosition = viewportHeight / 2;

        setSharedMedia((prev) =>
          prev
            ? {
                ...prev,
                x: viewportWidth / 2,
                y: yPosition,
                width: Math.round(finalScaledWidth),
                height: Math.round(finalScaledHeight),
              }
            : null,
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sharedMedia, viewMode]);

  // Handle scroll-based fade for shared media in detail view
  useEffect(() => {
    const handleScroll = () => {
      if (viewMode === "detail") {
        setScrollY(window.scrollY);
      }
    };

    if (viewMode === "detail") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [viewMode]);

  // Calculate shared media opacity based on scroll position
  const getSharedMediaOpacity = () => {
    // During transitions or when not in detail view, always show shared media
    if (viewMode !== "detail" || !sharedMedia || isTransitioning) return 1;

    // Start fading at 150px scroll, completely fade by 400px
    const fadeStart = 150;
    const fadeEnd = 400;

    if (scrollY <= fadeStart) return 1;
    if (scrollY >= fadeEnd) return 0;

    // Smooth easing curve for natural fade
    const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
    return 1 - Math.pow(progress, 1.5);
  };

  // Calculate shared media Y offset for subtle upward movement during fade
  const getSharedMediaYOffset = () => {
    // During transitions, don't move the shared media
    if (viewMode !== "detail" || !sharedMedia || isTransitioning) return 0;

    const fadeStart = 150;
    const fadeEnd = 400;

    if (scrollY <= fadeStart) return 0;
    if (scrollY >= fadeEnd) return -30; // Move up by 30px when fully faded

    const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
    return -30 * Math.pow(progress, 1.2); // Subtle easing for movement
  };

  return (
    <>
      {/* Noise Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fade to Black Overlay */}
      {fadeToBlack && (
        <div
          className="fixed inset-0 z-[125] bg-black"
          style={{
            opacity: contentFading ? 0.98 : 0,
            transition: "opacity 700ms ease-in-out",
          }}
        />
      )}

      <div className="min-h-screen bg-white">
        {/* Shared Media Element */}
        {sharedMedia && sharedMedia.visible && (
          <div
            className="fixed z-[150]"
            style={{
              left: `${sharedMedia.x}px`,
              top: `${sharedMedia.y + getSharedMediaYOffset()}px`,
              transform: "translate(-50%, -50%)",
              transition: isTransitioning
                ? "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "opacity 0.2s ease-out, top 0.3s ease-out",
              opacity: getSharedMediaOpacity(),
              pointerEvents: getSharedMediaOpacity() < 0.1 ? "none" : "auto",
            }}
          >
            <div
              className="rounded-lg shadow-2xl overflow-hidden"
              style={{
                width: `${sharedMedia.width}px`,
                height: `${sharedMedia.height}px`,
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                borderRadius: isTransitioning ? "16px" : "8px",
              }}
            >
              {sharedMedia.item.thumbnailUrl?.endsWith(".mp4") ? (
                <video
                  src={sharedMedia.item.thumbnailUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={sharedMedia.item.thumbnailUrl}
                  alt={sharedMedia.item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        )}

        {/* Conditional Content based on view mode */}
        {viewMode === "list" && (
          <div
            className={`transition-opacity duration-500 ${
              contentFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Hero Section */}
            <section className="h-screen relative overflow-hidden bg-white">
              {/* Video Background Container with Padding */}
              <div className="absolute inset-0 px-6 py-18 md:py-20">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => {
                    setTimeout(() => {
                      setShowUI(true);
                    }, 500);
                  }}
                  onError={() => {
                    // Show UI even if video fails to load
                    setTimeout(() => {
                      setShowUI(true);
                    }, 500);
                  }}
                  className="w-full h-full object-cover rounded-2xl"
                  style={{
                    opacity: showUI ? 1 : 0,
                    transition: "opacity 1500ms ease-in-out",
                  }}
                >
                  <source src="/hero-background.mp4" type="video/mp4" />
                </video>
              </div>

              {/* UI Elements */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* Name - Upper Left */}
                <div
                  className={`fixed top-6 left-6 pointer-events-auto transition-opacity duration-1000 z-50 ${
                    showUI ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div
                    className="cursor-pointer hover:opacity-75 transition-opacity text-xl font-black uppercase text-gray-700 leading-5 tracking-tight"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <div>Nathan</div>
                    <div>Kirschner</div>
                  </div>
                </div>

                {/* Contact Link - Upper Right */}
                <div
                  className={`fixed top-6 right-6 pointer-events-auto transition-opacity duration-1000 delay-200 z-50 ${
                    showUI ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <a
                    href="mailto:contact@nathankirschner.com"
                    className="text-sm font-semibold text-gray-500 hover:text-red-400 transition-colors"
                  >
                    Contact
                  </a>
                </div>

                {/* Bottom Left Header */}
                <div
                  className="absolute pointer-events-none"
                  style={{ bottom: "6.5rem", left: "4rem" }}
                >
                  <div
                    className={`transition-opacity duration-1000 delay-300 ${
                      showUI ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold uppercase text-white leading-none text-shadow-2xs">
                      Designed <br></br>with curiosity
                    </h1>
                  </div>
                </div>

                {/* Bottom Links - Desktop: Row layout, Mobile: Stacked */}
                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  {/* LinkedIn Link - Left */}
                  <div
                    className={`fixed bottom-6 left-6 pointer-events-auto transition-opacity duration-1000 delay-500 z-50 ${
                      showUI ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <a
                      href="https://www.linkedin.com/in/natekirschner/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-500 hover:text-red-400 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>

                  {/* Copyright - Far Right */}
                  <div
                    className={`fixed bottom-6 right-6 pointer-events-none transition-opacity duration-1000 delay-700 z-50 ${
                      showUI ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-500">
                      ©{new Date().getFullYear()}
                    </span>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  {/* LinkedIn Link - Left */}
                  <div
                    className={`fixed bottom-6 left-6 pointer-events-auto transition-opacity duration-1000 delay-500 z-50 ${
                      showUI ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <a
                      href="https://linkedin.com/in/nathankirschner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-500 hover:text-red-400 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>

                  {/* Copyright - Right */}
                  <div
                    className={`fixed bottom-6 right-6 pointer-events-none transition-opacity duration-1000 delay-700 z-50 ${
                      showUI ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-500">
                      ©{new Date().getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Combined About & Selected Works Section */}
            <section className="max-w-2xl mx-auto px-6 pt-24 pb-6">
              {/* About Content */}
              <div className="mb-8">
                <p className="text-3xl md:text-4xl text-gray-800 font-black uppercase leading-tight tracking-tight">
                  I'm a{" "}
                  <a
                    href="https://www.linkedin.com/in/natekirschner/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-400"
                  >
                    multi-disciplinary designer
                  </a>{" "}
                  guided by curiosity.
                </p>
              </div>
              <div className="mb-12">
                <div className="space-y-6">
                  <p className="text-md md:text-lg text-gray-600 font-normal leading-relaxed">
                    Everything begins with a spark of inspiration — igniting a
                    voyage into the unknown. Design is my outlet for giving that
                    spark structure, form, and intention.
                  </p>
                  <p className="text-md md:text-lg text-gray-600 font-normal leading-relaxed">
                    My work spans digital design, storytelling, and experiential
                    concepts, all rooted in a deep love for exploration. The
                    selected works below are a curated snapshot of this
                    breadth—each one reflecting a different facet of how I
                    think, explore, and build through design.
                  </p>
                </div>
              </div>

              {/* All Projects - List Layout */}
              <div className="space-y-12 group/list">
                {orderedItems.map((item, index) => (
                  <article
                    key={item.id}
                    className="group cursor-pointer border-b border-gray-100 pb-8 last:border-b-0 relative transition-opacity duration-300 group-hover/list:opacity-25 hover:!opacity-100"
                    onClick={() => handleItemClick(item)}
                    onMouseMove={(e) => handleMouseMove(e, item)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-start justify-between relative z-20">
                      <div className="flex-1">
                        {/* Row 1: Project Title */}
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 group-hover:text-gray-700 transition-colors uppercase tracking-tight mb-1">
                          {item.title}
                        </h2>
                        {/* Row 2: Project Type • Description */}
                        <div className="flex items-center text-gray-600">
                          <span className="text-md font-medium">
                            {item.metadata?.projectType || item.tag}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-md">
                            {item.shortDescription}
                          </span>
                        </div>
                      </div>
                      {/* Arrow Icon */}
                      <div className="ml-8 flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Hover Thumbnail */}
                    {hoveredItem?.id === item.id && !sharedMedia && (
                      <div
                        className="fixed pointer-events-none z-10"
                        style={{
                          left: `${mousePosition.x}px`,
                          top: `${mousePosition.y}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
                          style={{ width: "336px", height: "209px" }}
                        >
                          {item.thumbnailUrl?.endsWith(".mp4") ? (
                            <video
                              src={item.thumbnailUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={item.thumbnailUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* Linking Section */}
            <section className="max-w-2xl mx-auto px-6">
              <div className="space-y-8">
                <p className="text-lg text-gray-600 leading-relaxed">
                  This work is part of an ongoing creative practice—one guided
                  by curiosity, iteration, and reflection. I’m currently a Lead
                  Product Designer at Seismic. In parallel, I'm building{" "}
                  <a
                    className="underline hover:text-red-400"
                    href="https://ideationai.space/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ideation
                  </a>
                  —an independent exploration into how we can expand the way we
                  think and create with AI.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I’m drawn to projects that value depth, experimentation, and
                  intention, and I’m most energized when ideas are allowed to
                  evolve over time. If something here resonates, I’m always open
                  to thoughtful{" "}
                  <a
                    className="underline hover:text-red-400"
                    href="mailto:contact@nathankirschner.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    conversations
                  </a>{" "}
                  and collaborative exploration.
                </p>
              </div>
            </section>

            {/* Footer Section */}
            <section className="h-screen flex items-center justify-center">
              <div className="max-w-xl mx-auto px-6 text-center">
                <div className="space-y-6">
                  <p className="text-xl md:text-3xl text-gray-700 font-playfair italic font-semibold leading-normal">
                    "Care about people's approval, and you will be their
                    prisoner."
                  </p>
                  <p className="text-md md:text-lg text-gray-500 font-normal leading-relaxed">
                    Lao-Tzu
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {viewMode === "detail" && selectedItem && (
          <section
            className="min-h-screen relative bg-black"
            style={{
              overscrollBehavior: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseDetailView}
              className="fixed top-6 right-6 z-[300] w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Detail Content */}
            <div
              className="min-h-screen px-4 md:px-6 bg-black"
              style={{
                overscrollBehavior: "none",
              }}
            >
              <div className="w-full h-screen flex flex-col items-center justify-end">
                {/* Title section positioned at bottom like portfolio header */}
                <div
                  className="text-center px-2 z-200 relative"
                  style={{ paddingBottom: "12px" }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase text-white mb-2 leading-none">
                    {selectedItem.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Custom Detail Content */}
            {customDetailContent && selectedItem && (
              <div
                style={{
                  overscrollBehavior: "none",
                  backgroundColor: "#000",
                }}
              >
                {customDetailContent({ item: selectedItem })}
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
};
