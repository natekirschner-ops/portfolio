"use client";

import { useEffect, useState } from 'react';

interface CSSNoiseBackgroundProps {
  opacity?: number;
  className?: string;
  animationDuration?: string;
}

export const CSSNoiseBackground: React.FC<CSSNoiseBackgroundProps> = ({
  opacity = 0.02,
  className = "",
  animationDuration = "0.1s"
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style jsx>{`
        .noise-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          opacity: ${opacity};
          mix-blend-mode: multiply;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.2) 1px, transparent 0),
            radial-gradient(circle at 3px 1px, rgba(0,0,0,0.1) 1px, transparent 0);
          background-size: 4px 4px, 6px 6px, 8px 8px;
          background-position: 0 0, 1px 1px, 2px 2px;
          animation: noise ${animationDuration} infinite linear;
        }

        @keyframes noise {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-1px, 1px) rotate(0deg); }
          20% { transform: translate(1px, 0px) rotate(1deg); }
          30% { transform: translate(0px, -1px) rotate(-1deg); }
          40% { transform: translate(-1px, -1px) rotate(0deg); }
          50% { transform: translate(1px, 1px) rotate(1deg); }
          60% { transform: translate(0px, 1px) rotate(0deg); }
          70% { transform: translate(-1px, 0px) rotate(-1deg); }
          80% { transform: translate(1px, -1px) rotate(0deg); }
          90% { transform: translate(0px, 0px) rotate(1deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }

        .noise-layer-2 {
          background-image:
            radial-gradient(circle at 2px 3px, rgba(0,0,0,0.15) 0.5px, transparent 0),
            radial-gradient(circle at 4px 1px, rgba(0,0,0,0.1) 0.5px, transparent 0);
          background-size: 5px 5px, 7px 7px;
          animation: noise-2 0.15s infinite linear reverse;
        }

        @keyframes noise-2 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(1px, 0px); }
          50% { transform: translate(0px, 1px); }
          75% { transform: translate(-1px, 0px); }
          100% { transform: translate(0px, -1px); }
        }

        .noise-layer-3 {
          background-image:
            linear-gradient(90deg, transparent 98%, rgba(0,0,0,0.03) 100%),
            linear-gradient(0deg, transparent 98%, rgba(0,0,0,0.03) 100%);
          background-size: 3px 3px, 2px 2px;
          animation: noise-3 0.2s infinite linear;
        }

        @keyframes noise-3 {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 3px 3px, 2px 2px; }
        }
      `}</style>

      <div className={`noise-background ${className}`} />
      <div className={`noise-background noise-layer-2 ${className}`} style={{ opacity: opacity * 0.7 }} />
      <div className={`noise-background noise-layer-3 ${className}`} style={{ opacity: opacity * 0.5 }} />
    </>
  );
};
