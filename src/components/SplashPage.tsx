"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { SplineBackground } from "./SplineBackground";
import { CSSNoiseBackground } from "./CSSNoiseBackground";

export const SplashPage = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const [splineReady, setSplineReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineLayerRef = useRef<HTMLDivElement>(null);
  const uiLayerRef = useRef<HTMLDivElement>(null);

  // Stabilize Spline layer before any UI interactions
  const handleSplineLoad = useCallback(() => {
    setIsSplineLoaded(true);

    // Force a stable render cycle before proceeding
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Ensure Spline layer is completely stable
        if (splineLayerRef.current) {
          // Force layer promotion and stabilization
          splineLayerRef.current.style.transform = "translate3d(1%, -2%, 0)";
          splineLayerRef.current.style.opacity = "1";
        }

        setSplineReady(true);

        // Start UI fade-in only after Spline is completely stable
        setTimeout(() => {
          requestAnimationFrame(() => {
            setShowUI(true);
          });
        }, 2000);
      });
    });
  }, []);

  // Initialize cursor system with complete isolation
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create cursor in isolated context
    const initializeCursor = () => {
      // Hide default cursor globally
      const globalStyle = document.createElement("style");
      globalStyle.setAttribute("data-cursor-global", "true");
      globalStyle.textContent = `
        html, body, * {
          cursor: none !important;
        }
        canvas {
          cursor: none !important;
        }
      `;
      document.head.appendChild(globalStyle);

      // Create hardware-accelerated cursor
      const cursor = document.createElement("div");
      cursor.id = "custom-cursor";
      cursor.style.cssText = `
        position: fixed;
        width: 12px;
        height: 12px;
        background: linear-gradient(135deg, #8A6B95 0%, #6D597A 50%, #5A4A66 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        top: -100px;
        left: -100px;
        transform: translate3d(0, 0, 0) scale(1);
        transition: none;
        opacity: 0;
        will-change: transform;
        contain: strict;
        isolation: isolate;
        backface-visibility: hidden;
        box-shadow:
          0 2px 4px rgba(109, 89, 122, 0.3),
          0 1px 2px rgba(109, 89, 122, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(0, 0, 0, 0.1);
      `;
      document.body.appendChild(cursor);

      // Optimized mouse tracking
      let mouseX = 0;
      let mouseY = 0;
      let isVisible = false;

      const updateCursor = () => {
        if (cursor) {
          cursor.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(${cursor.dataset.scale || "1"})`;
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
          cursor.style.opacity = "1";
          isVisible = true;
        }

        updateCursor();
      };

      const handleMouseLeave = () => {
        cursor.style.opacity = "0";
        isVisible = false;
      };

      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseleave", handleMouseLeave, {
        passive: true,
      });

      return {
        cursor,
        cleanup: () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseleave", handleMouseLeave);
          globalStyle.remove();
          cursor.remove();
        },
      };
    };

    const cursorSystem = initializeCursor();

    return cursorSystem.cleanup;
  }, []);

  // Handle link hover effects after UI is visible
  useEffect(() => {
    if (!showUI) return;

    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    const handleMouseEnter = () => {
      cursor.style.background =
        "linear-gradient(135deg, #F28A8A 0%, #E56B6F 50%, #D14A4A 100%)";
      cursor.style.boxShadow = `
        0 3px 8px rgba(229, 107, 111, 0.4),
        0 2px 4px rgba(229, 107, 111, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1)
      `;
      cursor.dataset.scale = "1.1";
    };

    const handleMouseLeave = () => {
      cursor.style.background =
        "linear-gradient(135deg, #8A6B95 0%, #6D597A 50%, #5A4A66 100%)";
      cursor.style.boxShadow = `
        0 2px 4px rgba(109, 89, 122, 0.3),
        0 1px 2px rgba(109, 89, 122, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1)
      `;
      cursor.dataset.scale = "1";
    };

    // Attach listeners to links with delay to prevent interference
    const attachListeners = () => {
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleMouseEnter, {
          passive: true,
        });
        link.addEventListener("mouseleave", handleMouseLeave, {
          passive: true,
        });
      });
    };

    const timeout = setTimeout(attachListeners, 100);

    return () => {
      clearTimeout(timeout);
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [showUI]);

  // Fallback timer
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!isSplineLoaded) {
        handleSplineLoad();
      }
    }, 4000);

    return () => clearTimeout(fallback);
  }, [isSplineLoaded, handleSplineLoad]);

  return (
    <>
      <CSSNoiseBackground opacity={0.015} />

      {/* Main Container */}
      <div
        ref={containerRef}
        className="bg-white"
        style={{
          isolation: "isolate",
          contain: "layout style",
        }}
      >
        <section className="h-screen relative overflow-hidden">
          {/* SPLINE LAYER - Completely Isolated */}
          <div
            ref={splineLayerRef}
            className="absolute inset-0"
            style={{
              zIndex: 1,
              isolation: "isolate",
              contain: "strict",
              willChange: "auto",
              transform: "translate3d(1%, -2%, 0)",
              opacity: splineReady ? 1 : 1, // Keep always visible
              backfaceVisibility: "hidden",
              // Force separate compositing layer
              filter: "blur(0px)",
            }}
          >
            <SplineBackground onLoad={handleSplineLoad} />
          </div>

          {/* UI LAYER - Completely Separate */}
          <div
            ref={uiLayerRef}
            className="absolute inset-0"
            style={{
              zIndex: 10,
              isolation: "isolate",
              contain: "layout style",
              pointerEvents: "none",
              // Separate compositing layer
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Logo - Upper Left */}
            <div
              className="absolute top-6 left-6"
              style={{
                pointerEvents: "auto",
                opacity: showUI ? 0.8 : 0,
                transform: showUI
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, -20px, 0)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
                willChange: showUI ? "auto" : "opacity, transform",
                contain: "layout style paint",
                isolation: "isolate",
              }}
            >
              <img
                src="/logo.svg"
                alt="Nathan Kirschner Logo"
                className="w-8 h-auto"
                style={{
                  display: "block",
                  backfaceVisibility: "hidden",
                }}
              />
            </div>

            {/* Contact Link - Upper Right */}
            <div
              className="absolute top-6 right-6"
              style={{
                pointerEvents: "auto",
                opacity: showUI ? 1 : 0,
                transform: showUI
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, -20px, 0)",
                transition:
                  "opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s",
                willChange: showUI ? "auto" : "opacity, transform",
                contain: "layout style paint",
                isolation: "isolate",
              }}
            >
              <a
                href="mailto:contact@nathankirschner.com"
                className="text-sm font-medium"
                style={{
                  color: "#6B7280",
                  textDecoration: "none",
                  display: "block",
                  backfaceVisibility: "hidden",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#E56B6F";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6B7280";
                }}
              >
                Contact
              </a>
            </div>

            {/* LinkedIn Link - Lower Right */}
            <div
              className="absolute bottom-6 right-6"
              style={{
                pointerEvents: "auto",
                opacity: showUI ? 1 : 0,
                transform: showUI
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, 20px, 0)",
                transition:
                  "opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s",
                willChange: showUI ? "auto" : "opacity, transform",
                contain: "layout style paint",
                isolation: "isolate",
              }}
            >
              <a
                href="https://linkedin.com/in/nathankirschner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
                style={{
                  color: "#6B7280",
                  textDecoration: "none",
                  display: "block",
                  backfaceVisibility: "hidden",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#E56B6F";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6B7280";
                }}
              >
                LinkedIn
              </a>
            </div>

            {/* Current Project Link - Lower Left */}
            <div
              className="absolute bottom-6 left-6"
              style={{
                pointerEvents: "auto",
                opacity: showUI ? 1 : 0,
                transform: showUI
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, 20px, 0)",
                transition:
                  "opacity 1s ease-out 0.6s, transform 1s ease-out 0.6s",
                willChange: showUI ? "auto" : "opacity, transform",
                contain: "layout style paint",
                isolation: "isolate",
              }}
            >
              <a
                href="#"
                className="text-sm font-medium"
                style={{
                  color: "#6B7280",
                  textDecoration: "none",
                  display: "block",
                  backfaceVisibility: "hidden",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#E56B6F";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6B7280";
                }}
              >
                Current Project
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
