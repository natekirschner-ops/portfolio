"use client";

import { PortfolioItem } from "../../../types/portfolio";
interface AvaraDetailProps {
  item: PortfolioItem;
}

const AvaraDetail = ({ item }: AvaraDetailProps) => {
  return (
    <div className="bg-black py-20 relative">
      {/* Banner Video */}
      <div className="max-w-4xl mx-auto mb-20">
        <img
          src="/content/avara/thumbnail.jpg"
          alt="Avara Medical logo"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Project Description */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-2xl md:text-4xl font-black text-white mb-6">
          {item.shortDescription}
        </h3>
        <h3 className="text-xl md:text-2xl font-bold font-playfair italic text-white mb-12">
          {item.description}
        </h3>
      </div>

      {/* Featured Images */}
      <div className="mt-20 max-w-4xl mx-auto px-6">
        <img
          src="/content/avara/avara_01.jpg"
          alt="Avara Medical logomark and workmark"
          className="w-full rounded-2xl"
        />
      </div>

      {/* Closing */}
      <div className="max-w-2xl mt-20 mx-auto px-6 mb-40">
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <div className="flex justify-center mt-8">
            <a
              href="https://avaramedical.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Visit website</span>
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
    </div>
  );
};

export default AvaraDetail;
