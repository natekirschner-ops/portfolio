"use client";

import ReactMarkdown from "react-markdown";
import React from "react";
import { PortfolioItem, PortfolioTag, MediaItem } from "../types/portfolio";
import {
  ExtendedDetailViewProps,
  detailViewStyles,
  tagColors,
  statusColors,
  statusIcons,
} from "../types/detail-view";

// Category display labels for detail view
const categoryDisplayLabels: Record<PortfolioTag, string> = {
  exploration: "exploration",
  experience: "experience",
  digital: "digital",
  motion: "motion",
  storytelling: "storytelling",
  brand: "brand",
};

// Media Gallery Component
const MediaGallery = ({
  media,
  itemId,
  tag,
}: {
  media: MediaItem[] | any;
  itemId: string;
  tag: string;
}) => {
  if (!media) return null;

  // Handle both array format and gallery object format
  const mediaItems = Array.isArray(media) ? media : media.items || [];
  const layout = Array.isArray(media) ? "grid" : media.layout || "grid";
  const columns = Array.isArray(media) ? 2 : media.columns || 2;

  if (mediaItems.length === 0) return null;

  const getAspectRatio = (aspectRatio?: string) => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "portrait":
        return "aspect-[3/4]";
      case "video":
        return "aspect-video";
      case "auto":
        return ""; // No aspect ratio constraint for auto
      default:
        return "aspect-video";
    }
  };

  const getGridCols = (cols: number) => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  // Render media item
  const renderMediaItem = (mediaItem: MediaItem, index: number) => (
    <div key={index} className="group">
      {mediaItem.type === "video" ? (
        <div
          className={`relative bg-gray-900 rounded-lg overflow-hidden ${
            mediaItem.aspectRatio === "auto"
              ? "flex items-center justify-center"
              : getAspectRatio(mediaItem.aspectRatio)
          }`}
        >
          <video
            src={`/content/${tag}/${itemId}/${mediaItem.src}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`
              ${
                mediaItem.aspectRatio === "auto"
                  ? "max-w-full h-auto rounded-lg"
                  : "absolute inset-0 w-full h-full object-cover"
              }
              group-hover:scale-105 transition-transform duration-300
            `}
            poster={
              mediaItem.alt
                ? `/content/${tag}/${itemId}/${mediaItem.alt}`
                : undefined
            }
          />
        </div>
      ) : (
        <div
          className={`relative bg-gray-100 rounded-lg overflow-hidden ${
            mediaItem.aspectRatio === "auto"
              ? "flex items-center justify-center"
              : getAspectRatio(mediaItem.aspectRatio)
          }`}
        >
          <img
            src={`/content/${tag}/${itemId}/${mediaItem.src}`}
            alt={mediaItem.alt || `Gallery image ${index + 1}`}
            className={`
              ${
                mediaItem.aspectRatio === "auto"
                  ? "max-w-full h-auto object-contain rounded-lg"
                  : "absolute inset-0 w-full h-full object-cover"
              }
              group-hover:scale-105 transition-transform duration-300
            `}
          />
        </div>
      )}
      {mediaItem.caption && (
        <p className="text-sm text-gray-600 font-thicccboi mt-2 leading-relaxed">
          {mediaItem.caption}
        </p>
      )}
    </div>
  );

  return (
    <div className="mb-8">
      {/* Grid Layout */}
      {layout === "grid" && (
        <div className={`grid ${getGridCols(columns)} gap-4`}>
          {mediaItems.map(renderMediaItem)}
        </div>
      )}

      {/* Masonry Layout */}
      {layout === "masonry" && (
        <div
          className={`${columns === 1 ? "columns-1" : columns === 2 ? "columns-1 md:columns-2" : columns === 3 ? "columns-1 md:columns-2 lg:columns-3" : "columns-1 md:columns-2 lg:columns-4"} gap-4 space-y-4`}
        >
          {mediaItems.map(renderMediaItem)}
        </div>
      )}

      {/* Carousel Layout */}
      {layout === "carousel" && (
        <div className="relative">
          <div className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory">
            {mediaItems.map((mediaItem: MediaItem, index: number) => (
              <div key={index} className="flex-shrink-0 w-80 snap-start">
                {renderMediaItem(mediaItem, index)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Layout */}
      {layout === "single" && (
        <div className="space-y-8">{mediaItems.map(renderMediaItem)}</div>
      )}
    </div>
  );
};

export const DefaultDetailView = ({
  item,
  isOpen,
  onClose,
  animationState,
  handleBackdropClick,
}: ExtendedDetailViewProps) => {
  if (!animationState.isVisible || !item) return null;

  const colors = tagColors[item.tag];

  return (
    <div
      className={`${detailViewStyles.backdrop} ${
        animationState.isContentVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className={detailViewStyles.backdropBlur} />

      {/* Modal container */}
      <div
        className={`${detailViewStyles.modal} ${
          animationState.isContentVisible
            ? "scale-100 translate-y-0"
            : "scale-95 translate-y-4"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="cursor-pointer fixed top-6 right-6 z-20 px-4 py-2 text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-thicccboi font-medium"
        >
          close
        </button>

        {/* Content */}
        <div className={detailViewStyles.scrollContent}>
          {/* Content area with max width */}
          <div className="max-w-4xl mx-auto px-8 py-8">
            {/* Banner area - using thumbnail image/video */}
            <div className="relative w-full aspect-[3/2] bg-gray-900 overflow-hidden mb-4 rounded-lg">
              {item.thumbnailUrl ? (
                item.thumbnailUrl.endsWith(".mp4") ? (
                  <video
                    src={item.thumbnailUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
              )}
            </div>
            {/* Title and tag section */}
            <div className="relative mb-4">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-thicccboi uppercase font-bold text-gray-900 leading-tight mb-2 pr-32">
                {item.title}
              </h1>

              {/* Project tag - positioned top right */}
              <div className="absolute top-0 right-0 min-w-max">
                <span className="text-xl font-medium font-playfair italic text-gray-600 text-right">
                  {categoryDisplayLabels[item.tag]}
                </span>
              </div>
            </div>

            {/* Action buttons/links */}
            {item.links && item.links.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-8">
                {item.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-thicccboi font-medium"
                  >
                    {link.icon ? (
                      <img
                        src={`/content/${item.tag}/${item.id}/${link.icon}`}
                        alt=""
                        className="mr-2 w-5 h-5 object-contain"
                      />
                    ) : (
                      <span className="mr-2 text-xs">↗</span>
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Short description if different from main description */}
            {item.shortDescription &&
              item.shortDescription !== item.description && (
                <div className="mb-2">
                  <p className="text-gray-900 font-bold text-xl leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>
              )}

            {/* Description */}
            <div
              className="mb-8 prose prose-lg max-w-none text-gray-700 leading-relaxed font-thicccboi
                           prose-p:font-thicccboi prose-p:text-gray-700 prose-p:leading-relaxed
                           prose-strong:font-medium prose-strong:text-gray-900
                           prose-em:italic prose-em:text-gray-600
                           prose-ul:font-thicccboi prose-li:font-thicccboi prose-li:text-gray-700
                           prose-h1:font-thicccboi prose-h2:font-thicccboi prose-h3:font-thicccboi
                           prose-h1:text-gray-900 prose-h2:text-gray-900 prose-h3:text-gray-900"
            >
              <ReactMarkdown>{item.description}</ReactMarkdown>
            </div>

            {/* Short description if different from main description */}
            {/* Toolset */}
            {/* Technologies */}
            {item.metadata?.technologies && !item.metadata?.hideToolset && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {item.metadata.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-thicccboi rounded-md border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Media Gallery */}
            <MediaGallery media={item.media} itemId={item.id} tag={item.tag} />

            {/* Metadata section - temporarily hidden */}
            {/*
            {(item.metadata?.date || item.metadata?.status) && (
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  {item.metadata?.date && (
                    <span className="font-thicccboi">{item.metadata.date}</span>
                  )}
                  {item.metadata?.status && (
                    <div className="flex items-center space-x-2">
                      <span className={statusColors[item.metadata.status]}>
                        {statusIcons[item.metadata.status]}
                      </span>
                      <span
                        className={`${statusColors[item.metadata.status]} font-thicccboi capitalize`}
                      >
                        {item.metadata.status.replace("-", " ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            */}
          </div>
        </div>
      </div>
    </div>
  );
};
