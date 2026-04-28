"use client";

import { PortfolioItem } from "../../../types/portfolio";
interface ViagenDetailProps {
  item: PortfolioItem;
}

const ViagenDetail = ({ item }: ViagenDetailProps) => {
  return (
    <div className="bg-black py-20 relative">
      {/* Banner Video */}
      <div className="max-w-4xl mx-auto mb-20">
        <img
          src="/content/viagen/thumbnail.jpg"
          alt="Fallen leaves on the ground"
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
          src="/content/viagen/viagen_02.jpg"
          alt="Viagen workspace"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default ViagenDetail;
