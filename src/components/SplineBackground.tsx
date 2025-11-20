"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface SplineBackgroundProps {
  className?: string;
  onLoad?: () => void;
}

// Ultra-optimized CSS-based particle fallback with complete isolation
const ParticleFallback = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`${className} relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50`}
      style={{
        contain: "strict",
        isolation: "isolate",
        willChange: "auto",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Completely isolated particle layer */}
      <div
        className="absolute inset-0"
        style={{
          contain: "strict",
          isolation: "isolate",
          transform: "translateZ(0)",
        }}
      >
        {/* Hardware-accelerated particles */}
        {[
          {
            size: "w-2 h-2",
            opacity: "bg-gray-200/40",
            left: "10%",
            top: "20%",
            delay: "0s",
            duration: "8s",
          },
          {
            size: "w-1 h-1",
            opacity: "bg-gray-300/60",
            left: "80%",
            top: "10%",
            delay: "1s",
            duration: "6s",
          },
          {
            size: "w-3 h-3",
            opacity: "bg-gray-200/30",
            left: "60%",
            top: "70%",
            delay: "2s",
            duration: "8s",
          },
          {
            size: "w-1.5 h-1.5",
            opacity: "bg-gray-300/50",
            left: "20%",
            top: "80%",
            delay: "1.5s",
            duration: "4s",
          },
          {
            size: "w-2 h-2",
            opacity: "bg-gray-200/35",
            left: "90%",
            top: "60%",
            delay: "3s",
            duration: "6s",
          },
          {
            size: "w-1 h-1",
            opacity: "bg-gray-300/65",
            left: "40%",
            top: "30%",
            delay: "0.5s",
            duration: "8s",
          },
          {
            size: "w-2.5 h-2.5",
            opacity: "bg-gray-200/25",
            left: "70%",
            top: "40%",
            delay: "2.5s",
            duration: "4s",
          },
          {
            size: "w-1 h-1",
            opacity: "bg-gray-300/70",
            left: "30%",
            top: "90%",
            delay: "1.8s",
            duration: "6s",
          },
        ].map((particle, index) => (
          <div
            key={index}
            className={`absolute ${particle.size} ${particle.opacity} rounded-full`}
            style={{
              left: particle.left,
              top: particle.top,
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
              contain: "strict",
              isolation: "isolate",
              animation: `float-${index % 3 === 0 ? "slow" : index % 3 === 1 ? "medium" : "fast"} ${particle.duration} ease-in-out infinite`,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay with isolation */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10"
        style={{
          contain: "strict",
          isolation: "isolate",
          pointerEvents: "none",
        }}
      />

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate3d(0px, 0px, 0);
          }
          25% {
            transform: translate3d(10px, -20px, 0);
          }
          50% {
            transform: translate3d(-5px, -10px, 0);
          }
          75% {
            transform: translate3d(8px, -15px, 0);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translate3d(0px, 0px, 0);
          }
          33% {
            transform: translate3d(-8px, -15px, 0);
          }
          66% {
            transform: translate3d(12px, -8px, 0);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translate3d(0px, 0px, 0);
          }
          50% {
            transform: translate3d(-10px, -25px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export const SplineBackground = ({
  className = "",
  onLoad,
}: SplineBackgroundProps) => {
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canvasStable, setCanvasStable] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLElement | null>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const stabilityTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Load Spline with enhanced error handling
  useEffect(() => {
    let cancelled = false;

    const loadSpline = async () => {
      try {
        // Extended timeout for complex scenes
        loadTimeoutRef.current = setTimeout(() => {
          if (!cancelled) {
            console.warn("Spline load timeout, using fallback");
            setHasError(true);
          }
        }, 8000);

        const { default: Spline } = await import("@splinetool/react-spline");

        if (!cancelled) {
          if (loadTimeoutRef.current) {
            clearTimeout(loadTimeoutRef.current);
          }
          setSplineComponent(() => Spline);
        }
      } catch (error) {
        if (!cancelled) {
          console.warn("Spline import failed:", error);
          setHasError(true);
        }
      }
    };

    loadSpline();

    return () => {
      cancelled = true;
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  // Enhanced load handler with stability checks
  const handleLoad = useCallback(() => {
    console.log("Spline scene loaded");

    // Wait for canvas to be completely stable before proceeding
    const stabilizeCanvas = () => {
      const canvas = containerRef.current?.querySelector("canvas");
      if (canvas && !canvasStable) {
        canvasRef.current = canvas;

        // Force canvas into its own compositing layer immediately
        const canvasStyle = canvas.style;
        canvasStyle.transform = "translate3d(0, 0, 0)";
        canvasStyle.backfaceVisibility = "hidden";
        canvasStyle.willChange = "auto";
        canvasStyle.isolation = "isolate";
        canvasStyle.contain = "strict";
        canvasStyle.cursor = "none";
        canvasStyle.touchAction = "manipulation";

        // Ensure canvas is completely rendered and stable
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setCanvasStable(true);
            setIsLoaded(true);

            // Additional stabilization delay
            stabilityTimeoutRef.current = setTimeout(() => {
              onLoad?.();
            }, 200);
          });
        });
      }
    };

    // Multiple stability checks
    stabilizeCanvas();
    setTimeout(stabilizeCanvas, 100);
    setTimeout(stabilizeCanvas, 300);
  }, [onLoad, canvasStable]);

  const handleError = useCallback(
    (error: any) => {
      console.warn("Spline scene error:", error);
      setHasError(true);

      // Still trigger onLoad to prevent parent hanging
      setTimeout(() => {
        onLoad?.();
      }, 100);
    },
    [onLoad],
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      if (stabilityTimeoutRef.current) {
        clearTimeout(stabilityTimeoutRef.current);
      }
    };
  }, []);

  // Show fallback for errors or missing component
  if (hasError || !SplineComponent) {
    return <ParticleFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={`${className} absolute inset-0`}
      style={{
        // Maximum isolation and containment
        contain: "strict",
        isolation: "isolate",
        willChange: "auto",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
        // Prevent any layout shifts
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Spline container with maximum stability */}
      <div
        className="spline-wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          contain: "strict",
          isolation: "isolate",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          willChange: "auto",
        }}
      >
        <SplineComponent
          scene={`/scene.splinecode?v=${Date.now()}`}
          wasmPath="/"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            // Force immediate GPU acceleration
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            isolation: "isolate",
            contain: "strict",
            willChange: "auto",
          }}
        />
      </div>

      {/* Ultra-aggressive canvas styling to prevent interference */}
      <style jsx>{`
        .spline-wrapper {
          /* Prevent any layout recalculations */
          overflow: visible !important;
        }

        .spline-wrapper canvas {
          /* Force canvas into separate layer immediately */
          transform: translate3d(0, 0, 0) !important;
          backface-visibility: hidden !important;
          will-change: auto !important;
          isolation: isolate !important;
          contain: strict !important;

          /* Prevent cursor conflicts */
          cursor: none !important;

          /* Optimize touch/pointer events */
          touch-action: manipulation !important;
          pointer-events: auto !important;

          /* Prevent aliasing issues */
          image-rendering: optimizeQuality !important;

          /* Force high-performance rendering */
          image-rendering: -webkit-optimize-contrast !important;

          /* Prevent context loss */
          -webkit-backface-visibility: hidden !important;
          -webkit-transform: translate3d(0, 0, 0) !important;

          /* Block any external style interference */
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;

          /* Ensure stable positioning */
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;

          /* Prevent any transitions that could interfere */
          transition: none !important;
          animation: none !important;
        }

        /* Ensure WebGL context stability */
        .spline-wrapper canvas[data-engine="three.js r152"] {
          /* Three.js specific optimizations */
          -webkit-transform-style: preserve-3d !important;
          transform-style: preserve-3d !important;
        }

        /* Prevent any child element interference */
        .spline-wrapper * {
          backface-visibility: hidden !important;
          transform-style: preserve-3d !important;
          will-change: auto !important;
        }

        /* Block external CSS from affecting canvas */
        .spline-wrapper canvas:not([style*="display: none"]) {
          display: block !important;
        }
      `}</style>
    </div>
  );
};
