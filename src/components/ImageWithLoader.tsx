"use client";

import { useState } from "react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export const ImageWithLoader = ({
  src,
  alt,
  className = "",
  caption,
}: ImageWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
              <p className="text-gray-400 mt-4 text-sm">Loading image...</p>
            </div>
          </div>
        )}

        {/* Image */}
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-gray-300 text-md mt-3 px-4 text-left">{caption}</p>
      )}
    </div>
  );
};
