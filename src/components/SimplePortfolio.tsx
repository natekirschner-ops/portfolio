"use client";

import { useState } from "react";
import { PortfolioItem } from "../types/portfolio";
import { portfolioItems } from "../data/generated-portfolio";
import { DetailViewLoader } from "./DetailViewLoader";
import { SplineBackground } from "./SplineBackground";
import { CSSNoiseBackground } from "./CSSNoiseBackground";

export const SimplePortfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  // Define which projects are your top concept-driven work
  const featuredProjectIds = [
    "collaborative-intelligence",
    "the-carriboo-jack",
  ];

  // Separate featured concept work from additional work, maintaining order from featuredProjectIds
  const featuredItems = featuredProjectIds
    .map((id) => portfolioItems.find((item) => item.id === id))
    .filter(Boolean) as PortfolioItem[];

  // Custom order for additional work
  const additionalWorkOrder = [
    "beers-on-trails",
    "exposed",
    "snow-dayz",
    "prospect-studio",
    "retain-ai",
    "pray-for-snow",
    "peruvian-mountain-rides",
    "creative-stillness",
  ];

  const additionalItems = additionalWorkOrder
    .map((id) => portfolioItems.find((item) => item.id === id))
    .filter(Boolean) as PortfolioItem[];

  return (
    <>
      <CSSNoiseBackground opacity={0.015} />
      <div className="bg-white">
        {/* Full Height Intro */}
        <section
          className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden"
          style={{ paddingBottom: "5vh" }}
        >
          {/* SPLINE 3D Background */}
          <SplineBackground className="" />

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
            <p className="text-sm text-gray-500 mb-4 tracking-wider uppercase">
              Scroll Down
            </p>
            <div className="w-px h-12 bg-gray-300 mx-auto animate-pulse"></div>
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-6 pb-16">
          {/* About Section */}
          <section className="pt-28 mb-28">
            <div className="max-w-xl mx-auto text-justify">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-600 font-semibold leading-relaxed">
                  I'm a{" "}
                  <a
                    href="https://www.linkedin.com/in/natekirschner/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    multi-disciplinary designer
                  </a>{" "}
                  guided by curiosity, intuition, and the spark of ideas not yet
                  formed.
                </p>
                <p className="text-md md:text-lg text-gray-600 font-normal leading-relaxed">
                  For me, every project begins with inspiration: a moment of
                  possibility that opens a door to the unknown. Through
                  thoughtful design, I give that spark structure, shape, and
                  intention. And ultimately, I create experiences meant to be
                  felt — moments that invite people to see, think, or sense
                  something differently.
                </p>
                <p className="text-md md:text-lg text-gray-600 font-normal leading-relaxed">
                  My work spans digital design, storytelling, and experiential
                  concepts, all rooted in a deep love for exploration and the
                  power of ideas brought to life.
                </p>
              </div>
            </div>
          </section>

          {/* Selected Works */}
          <section className="mt-24">
            <div className="text-center mb-16">
              <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
              <h2 className="text-sm text-gray-500 mb-4 tracking-wider uppercase">
                Selected Works
              </h2>
            </div>

            {/* Featured Projects */}
            <div className="grid gap-12 md:gap-16 mb-16">
              {featuredItems.map((item, index) => (
                <article
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="space-y-6">
                    {/* Full-width thumbnail */}
                    <div className="relative overflow-hidden rounded-sm bg-gray-100 aspect-video">
                      {item.thumbnailUrl.endsWith(".mp4") ? (
                        <video
                          src={item.thumbnailUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          View project
                        </span>
                      </div>
                    </div>

                    {/* Content below */}
                    <div className="space-y-4 p-4 max-w-full">
                      <div>
                        <div className="flex items-start justify-between gap-8">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-1">
                              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors uppercase tracking-tight">
                                {item.title}
                              </h2>
                              {item.id === "collaborative-intelligence" && (
                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide font-medium">
                                  Current
                                </span>
                              )}
                            </div>
                            <span className="text-xl text-gray-600 italic font-semibold font-playfair">
                              {item.tag}
                            </span>
                          </div>
                          <div className="text-right min-w-0 flex-1 max-w-3xs">
                            <p className="text-md text-gray-700 leading-tight">
                              {item.shortDescription || "Project overview"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Additional Work Grid */}
            {additionalItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {additionalItems.map((item, index) => (
                  <article
                    key={item.id}
                    className="group cursor-pointer bg-white overflow-hidden transition-all duration-300"
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-sm bg-gray-100 aspect-video">
                      {item.thumbnailUrl.endsWith(".mp4") ? (
                        <video
                          src={item.thumbnailUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          View project
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col">
                          <h3 className="text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors uppercase tracking-tight">
                            {item.title}
                          </h3>
                          <span className="text-sm text-gray-600 italic font-semibold font-playfair">
                            {item.tag}
                          </span>
                        </div>
                        <div className="text-right min-w-0 flex-1">
                          <p className="text-xs text-gray-700 leading-tight">
                            {item.shortDescription || "Project overview"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          <footer className="mt-24 pt-16 border-t border-gray-200 text-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-center space-x-8 text-sm">
                  <a
                    href="mailto:contact@nathankirschner.com"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Contact
                  </a>
                  <a
                    href="https://linkedin.com/in/nathankirschner"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <DetailViewLoader
        item={selectedItem}
        isOpen={isDetailViewOpen}
        onClose={handleCloseDetailView}
      />
    </>
  );
};
