"use client";

import Link from "next/link";
import { portfolioItems } from "../data/portfolio";
import { PortfolioItem } from "../types/portfolio";
import { useState, useRef } from "react";

const detailPageSlugs = new Set([
  "seismic",
  "the-carriboo-jack",
  "exposed",
  "storm-dayz",
  "beers-on-trails",
  "viagen",
  "peruvian-mountain-rides",
  "avara",
]);

interface GridItemProps {
  item: PortfolioItem;
}

const GridItem = ({ item }: GridItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = item.thumbnailUrl?.endsWith(".mp4");

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
        {item.thumbnailUrl ? (
          isVideo ? (
            <video
              ref={videoRef}
              src={item.thumbnailUrl}
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )
        ) : null}
      </div>

      {/* Meta — below image */}
      <div>
        <h3 className="mb-0 text-lg font-semibold text-gray-900 truncate pt-2">
          {item.title}
        </h3>
        {item.metadata?.projectType && (
          <p className="text-sm font-normal text-gray-500 mt-0.5 truncate">
            {item.metadata.projectType}
          </p>
        )}
      </div>
    </div>
  );
};

const allItems = portfolioItems;

export const Portfolio = () => {
  const [showUI, setShowUI] = useState(true);

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

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="h-screen relative overflow-hidden bg-white">
          {/* Video Background */}
          <div className="absolute inset-0 px-6 py-18 md:py-20">
            <video
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setTimeout(() => setShowUI(true), 500)}
              onError={() => setTimeout(() => setShowUI(true), 500)}
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
            {/* Name — Upper Left */}
            <div
              className={`fixed top-6 left-6 pointer-events-auto transition-opacity duration-1000 z-50 ${
                showUI ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="cursor-pointer hover:opacity-75 transition-opacity text-xl font-black uppercase text-gray-700 leading-5 tracking-tight"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div>Nathan</div>
                <div>Kirschner</div>
              </div>
            </div>

            {/* Contact — Upper Right */}
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

            {/* Headline — Bottom Left */}
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
                  Experience <br />
                  the design
                </h1>
              </div>
            </div>

            {/* Bottom Bar — Desktop */}
            <div className="hidden sm:block">
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

            {/* Bottom Bar — Mobile */}
            <div className="block sm:hidden">
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

        {/* Intro */}
        <section className="max-w-3xl mx-16 px-6 pt-24 pb-6">
          <p className="text-3xl md:text-5xl text-gray-800 font-black uppercase leading-tight tracking-tight">
            I capture ideas and shape them into intentional experiences.
          </p>
        </section>

        {/* About */}
        <section className="max-w-lg sm:mx-auto mx-16 px-6 pt-24 pb-6">
          <div className="mb-12">
            <div className="space-y-6">
              <p className="text-md md:text-lg text-gray-600 font-normal leading-relaxed">
                My work spans digital design, storytelling, and experiential
                concepts, all rooted in a deep love for exploration. The
                selected works below are a curated snapshot of this breadth—each
                one reflecting a different facet of how I think, explore, and
                build through design.
              </p>
            </div>
          </div>
        </section>

        {/* Work Grid */}
        <section className="w-full pt-24 px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 group/grid">
            {allItems.map((item) => (
              <div
                key={item.id}
                className="transition-opacity duration-300 group-hover/grid:opacity-50 hover:!opacity-100"
              >
                {detailPageSlugs.has(item.id) ? (
                  <Link href={`/work/${item.id}`}>
                    <GridItem item={item} />
                  </Link>
                ) : (
                  <GridItem item={item} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Linking Section */}
        <section className="max-w-lg sm:mx-auto mx-16 px-6 pt-24">
          <div className="space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm drawn to projects that value depth, experimentation, and
              intention. If something here resonates, I'm always open to
              thoughtful{" "}
              <a
                className="underline hover:text-red-400"
                href="mailto:contact@nathankirschner.com"
              >
                conversations
              </a>{" "}
              and collaborative exploration.
            </p>
          </div>
        </section>

        {/* Footer */}
        <section className="h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="space-y-6">
              <p className="text-3xl md:text-4xl text-gray-700 font-playfair italic font-bold leading-normal">
                "Care about people's approval, and you will be their prisoner."
              </p>
              <p className="text-md md:text-lg text-gray-500 font-normal leading-relaxed">
                Lao-Tzu
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
