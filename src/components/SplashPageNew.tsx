"use client";

import { useEffect, useState, useRef } from "react";

export const SplashPageNew = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const splineRef = useRef<HTMLDivElement>(null);

  // Handle Spline load
  const handleSplineLoad = () => {
    setSplineLoaded(true);
    // Show UI elements after 2 second delay
    setTimeout(() => {
      setShowUI(true);
    }, 2000);
  };

  // Initialize custom cursor
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    // Create custom cursor
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.style.cssText = `
      position: fixed;
      width: 12px;
      height: 12px;
      background: #6D597A;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;
    document.body.appendChild(cursor);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 6 + "px";
      cursor.style.top = e.clientY - 6 + "px";
      cursor.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    };
  }, []);

  // Handle link hover for cursor
  useEffect(() => {
    const handleLinkHover = () => {
      const cursor = document.getElementById("custom-cursor");
      if (cursor) {
        cursor.style.background = "#E56B6F";
        cursor.style.transform = "scale(1.2)";
      }
    };

    const handleLinkLeave = () => {
      const cursor = document.getElementById("custom-cursor");
      if (cursor) {
        cursor.style.background = "#6D597A";
        cursor.style.transform = "scale(1)";
      }
    };

    if (showUI) {
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleLinkHover);
        link.addEventListener("mouseleave", handleLinkLeave);
      });

      return () => {
        links.forEach((link) => {
          link.removeEventListener("mouseenter", handleLinkHover);
          link.removeEventListener("mouseleave", handleLinkLeave);
        });
      };
    }
  }, [showUI]);

  return (
    <>
      {/* Noise Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Main Container */}
        <section className="h-screen relative overflow-hidden">
          {/* Spline Background */}
          <div
            ref={splineRef}
            className="absolute inset-0"
            style={{
              transform: "translateX(1%) translateY(-2%)",
            }}
          >
            <SplineBackground onLoad={handleSplineLoad} />
          </div>

          {/* UI Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Logo - Upper Left */}
            <div
              className={`absolute top-6 left-6 pointer-events-auto transition-opacity duration-1000 ${
                showUI ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src="/logo.svg"
                alt="Nathan Kirschner Logo"
                className="w-8 h-auto"
              />
            </div>

            {/* Contact Link - Upper Right */}
            <div
              className={`absolute top-6 right-6 pointer-events-auto transition-opacity duration-1000 delay-200 ${
                showUI ? "opacity-100" : "opacity-0"
              }`}
            >
              <a
                href="https://app.seismic.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-500 hover:text-red-400 transition-colors"
              >
                Currently @ Seismic
              </a>
            </div>

            {/* Bottom Links - Equally Spaced */}
            {/* Contact Link - Far Left */}
            <div
              className={`absolute bottom-6 left-6 pointer-events-auto transition-opacity duration-1000 delay-400 ${
                showUI ? "opacity-100" : "opacity-0"
              }`}
            >
              <a
                href="mailto:contact@nathankirschner.com"
                className="text-sm font-medium text-gray-500 hover:text-red-400 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* LinkedIn Link - Center Left */}
            <div
              className={`absolute bottom-6 pointer-events-auto transition-opacity duration-1000 delay-500 ${
                showUI ? "opacity-100" : "opacity-0"
              }`}
              style={{ left: "33.33%" }}
            >
              <a
                href="https://linkedin.com/in/natekirschner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-500 hover:text-red-400 transition-colors"
              >
                LinkedIn
              </a>
            </div>

            {/* Instagram Link - Center Right */}
            <div
              className={`absolute bottom-6 pointer-events-auto transition-opacity duration-1000 delay-600 ${
                showUI ? "opacity-100" : "opacity-0"
              }`}
              style={{ left: "66.66%" }}
            >
              <a
                href="https://www.instagram.com/nkirschner/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-500 hover:text-red-400 transition-colors"
              >
                Instagram
              </a>
            </div>

            {/* Copyright - Far Right */}
            <div
              className={`absolute bottom-6 right-6 pointer-events-none transition-opacity duration-1000 delay-700 ${
                showUI ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-sm font-medium text-gray-500">
                ©{new Date().getFullYear()}
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Simple Spline Background Component
const SplineBackground = ({ onLoad }: { onLoad: () => void }) => {
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSpline = async () => {
      try {
        console.log("Loading Spline component...");
        setIsLoading(true);

        // Add timeout for Spline loading
        const loadPromise = import("@splinetool/react-spline");
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Spline load timeout")), 10000),
        );

        const { default: Spline } = (await Promise.race([
          loadPromise,
          timeoutPromise,
        ])) as any;
        console.log("Spline component loaded successfully");
        setSplineComponent(() => Spline);
        setIsLoading(false);
      } catch (error) {
        console.warn("Spline failed to load, using fallback:", error);
        setHasError(true);
        setIsLoading(false);
        // Still call onLoad so UI doesn't hang
        setTimeout(onLoad, 1000);
      }
    };
    loadSpline();
  }, [onLoad]);

  const handleLoad = () => {
    console.log(
      "Spline scene loaded successfully from:",
      "/scene-spline.splinecode",
    );
    onLoad();
  };

  const handleError = (error: any) => {
    console.error("Spline scene failed to load:", error);
    console.log("Attempted to load from:", "/scene-spline.splinecode");
    setHasError(true);
    onLoad(); // Still call onLoad so UI doesn't hang
  };

  // Show loading state
  if (isLoading && !hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading 3D scene...</div>
      </div>
    );
  }

  // Fallback background
  if (hasError || !SplineComponent) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
        {/* Simple animated particles as fallback */}
        <div className="absolute inset-0">
          <div
            className="absolute w-2 h-2 bg-gray-200/40 rounded-full animate-pulse"
            style={{ left: "10%", top: "20%" }}
          />
          <div
            className="absolute w-1 h-1 bg-gray-300/60 rounded-full animate-pulse"
            style={{ left: "80%", top: "15%" }}
          />
          <div
            className="absolute w-3 h-3 bg-gray-200/30 rounded-full animate-pulse"
            style={{ left: "60%", top: "70%" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <SplineComponent
        scene="/scene-spline.splinecode"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />
    </div>
  );
};
