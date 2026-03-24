"use client";

import { PortfolioItem } from "../../../types/portfolio";

interface PrayForSnowDetailProps {
  item: PortfolioItem;
}

const PrayForSnowDetail = ({ item }: PrayForSnowDetailProps) => {
  return (
    <div className="bg-black py-20 relative">
      {/* Banner Video */}
      <div className="max-w-4xl mx-auto mb-20 px-6">
        <video
          src="/content/pray-for-snow/thumbnail.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full object-cover rounded-2xl"
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
    </div>
  );
};

export default PrayForSnowDetail;
