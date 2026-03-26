"use client";

import { PortfolioItem } from "../../../types/portfolio";
interface LomDetailProps {
  item: PortfolioItem;
}

const LomDetail = ({ item }: LomDetailProps) => {
  return (
    <div className="bg-black py-20 relative">
      {/* Banner Video */}
      <div className="max-w-4xl mx-auto mb-20 px-6">
        <img
          src="/content/lom/thumbnail.jpg"
          alt="Lom Vans logo"
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
          src="/content/lom/lom_01.jpg"
          alt="Lom vans logos"
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default LomDetail;
