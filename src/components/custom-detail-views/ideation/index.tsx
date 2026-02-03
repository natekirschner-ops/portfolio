"use client";

import { useState } from "react";
import { PortfolioItem } from "../../../types/portfolio";

interface IdeationDetailProps {
  item: PortfolioItem;
}

// Separate component for video loading to isolate hook usage
const LoomVideoEmbed = () => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      {/* Loading State */}
      {isVideoLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4 text-sm">Loading video...</p>
          </div>
        </div>
      )}

      <iframe
        src="https://www.loom.com/embed/ca008578b95c4298a168bba0d3cc01be?sid=8e3b3e5c-5f4e-4e5e-9e5e-5e5e5e5e5e5e"
        frameBorder="0"
        allowFullScreen
        onLoad={() => setIsVideoLoading(false)}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
};

const IdeationDetail = ({ item }: IdeationDetailProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black py-20 z-200 relative">
      {/* Project Description */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-2xl md:text-4xl font-black text-white mb-6 ">
          {item.shortDescription}
        </h3>
        <h3 className="text-xl md:text-2xl font-semibold font-playfair italic text-white mb-12">
          {item.description}
        </h3>
      </div>
      {/* Project Overview */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">Overview</h3>
        <div className=" text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            I use LLMs as thinking partners—to ideate, surface synchronicities
            and patterns, challenge assumptions, and create space for
            exploration. Rather than looking for answers, I use conversation as
            a way to ideate.
          </p>
          <p>
            Over time, I began to notice a limitation: first-generation LLM UX
            is fundamentally linear. Prompts move forward, responses follow, and
            context stacks vertically. While efficient, this structure felt
            misaligned with how meaningful ideas actually emerge.
          </p>
          <p>
            This pushed me to look beyond the tool and toward cognition itself.
            What surfaced was a simple truth: ideas don’t grow in straight
            lines. They branch, loop, return, and evolve through dialogue—both
            internal and external. Ideation is cyclical, not linear. It’s
            flow-based.
          </p>
          <p className="text-2xl md:text-3xl font-semibold font-playfair italic">
            So what does this look like?
          </p>
        </div>
      </div>
      {/* Loom */}
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <LoomVideoEmbed />
      </div>
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <div className=" text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            It looks like conversations that branch and merger over
            time—mirroring how ideas naturally evolve. A synthesis layer sits
            across both the micro and macro, allowing individual threads to
            remain distinct while contributing to a larger, emergent whole.
          </p>
          <p>
            The goal isn’t to capture every thought, but to preserve meaningful
            connections—maintaining coherence without collapsing ideation into a
            linear path or losing it to chaotic sprawl.
          </p>
        </div>
      </div>
      {/* My role */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">My role</h3>
        <div className=" text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            Ideation is an independent, end-to-end project that I designed and
            built in its entirety. I led the conceptual framing, interaction
            design, visual design, and development, using the project as both a
            design challenge and a personal research practice.
          </p>
        </div>
      </div>
      {/* Design insight */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">Design insight</h3>
        <div className=" text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            Building Ideation has clarified an important lesson for me:
            meaningful thinking rarely moves in straight lines. Through daily
            use and iteration, I’ve learned that ideation benefits from flexible
            structure—systems that preserve relationships between ideas without
            collapsing them into a linear flow. This work continues to shape how
            I approach AI, design, and the role of tools in supporting
            exploration rather than answers.
          </p>
        </div>
      </div>
      {/* Closing */}
      <div className="max-w-2xl mx-auto px-6 mb-40">
        <div className=" text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <h3 className="text-3xl font-bold text-white mb-6">Closing</h3>
          <p>
            This is a proof of concept, and a continued exploration on what it
            wants to become.
          </p>
          <div className="flex justify-center mt-8">
            <a
              href="https://ideationai.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Visit Ideation.space</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="flex justify-center mt-20 pb-8">
        <button
          onClick={scrollToTop}
          className="bg-white hover:bg-gray-100 text-black rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Back to top"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L12 20M12 4L6 10M12 4L18 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IdeationDetail;
