"use client";

import { PortfolioItem } from "../../../types/portfolio";

interface SnowDayzDetailProps {
  item: PortfolioItem;
}

const SnowDayzDetail = ({ item }: SnowDayzDetailProps) => {
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
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            There’s something uniquely generative about being in the
            mountains—where silence sharpens attention and small details begin
            to feel meaningful. On a backcountry ski tour, I started carving
            faces into snow features along the skin track, a quiet and almost
            subconscious act. One of those forms unexpectedly resembled a fish.
          </p>
          <p>
            That moment of recognition sparked an idea: what if this fleeting,
            site-specific piece of snow art could be given a second life? This
            became an experiment in translating a spontaneous, ephemeral
            mountain moment into a moving image—blending physical play,
            observation, and digital transformation.
          </p>
        </div>
      </div>
      {/* Tools */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">Tools</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            This project was built using a lightweight, exploratory toolset.
            iPhone photography and video captured the initial moments as they
            happened, while Photoshop was used to refine and prepare visual
            elements. Kaiber AI acted as a generative collaborator, helping
            translate a fleeting snow sculpture into motion. The final piece was
            composed in After Effects, grounding the AI-generated elements
            within a traditional motion workflow.
          </p>
        </div>
      </div>
      {/* Design Insight */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">Design insight</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            Snow Daze taught me to treat AI less as a destination and more as a
            connective medium. The most compelling results didn’t come from
            pushing prompts, but from responding—listening to what the material
            suggested and shaping it through iteration.
          </p>
          <p>
            I’m thinking that the real opportunity with tools like Runway and
            Kaiber lie in preserving feeling, not just generating novelty. By
            grounding AI outputs in a lived, physical experience, the work stays
            human. The snow fish became a bridge—connecting solitude, play, and
            emerging technology into a shared moment of wonder.
          </p>
        </div>
      </div>
      {/* Closer */}
      <div className="max-w-2xl mx-auto px-6 mb-40">
        <h3 className="text-3xl font-bold text-white mb-6">Closing</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            At its core, this experiment is about noticing—and honoring—small
            moments before they disappear. The mountains offer them freely, but
            only briefly. This project is a reminder that experimentation
            doesn’t have to be loud or complex; sometimes it’s just about paying
            attention, following curiosity, and letting ideas evolve naturally.
          </p>
          <div className="flex justify-center mt-8">
            <a
              href="https://www.instagram.com/p/DGR7olNukXi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>View on Instagram</span>
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

export default SnowDayzDetail;
