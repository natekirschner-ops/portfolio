"use client";

import { PortfolioItem } from "../../../types/portfolio";

interface SeismicDetailProps {
  item: PortfolioItem;
}

const SeismicDetail = ({ item }: SeismicDetailProps) => {
  return (
    <div className="bg-black py-20 relative">
      {/* Banner */}
      <div className="mb-20 max-w-4xl mx-auto px-6">
        <img
          src="/content/seismic/thumbnail.jpg"
          alt="Seismo design system components"
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

      {/* Image */}
      <div className="my-20 max-w-4xl mx-auto px-6">
        <img
          src="/content/seismic/seismic_01.jpg"
          alt="Seismo design system foundations"
          className="w-full rounded-2xl"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          The core brand foundations—color palette, typography, and
          iconography—provide a shared visual language for the Seismic platform.
          These elements ensure consistency across components, help designers
          and engineers communicate effectively, and create a scalable system
          that can grow with the product.
        </p>
      </div>

      {/* Image */}
      <div className="my-20 max-w-4xl mx-auto px-6">
        <img
          src="/content/seismic/seismic_02.jpg"
          alt="Seismo design system components"
          className="w-full rounded-2xl"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          Components are the building blocks of the Seismic design system. Each
          one is designed to be flexible, reusable, and consistent, allowing the
          team to quickly assemble interfaces while maintaining a cohesive
          experience across the platform.
        </p>
      </div>

      {/* Image */}
      <div className="my-20 max-w-4xl mx-auto px-6">
        <img
          src="/content/seismic/seismic_03.jpg"
          alt="Seismo design system architecture"
          className="w-full rounded-2xl"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          Seismic's platform is organized into modular surfaces—communication,
          management, and discovery—each designed to support distinct workflows
          while sharing a consistent system of components and patterns. This
          modular approach allows the product to scale without fragmenting the
          user experience.
        </p>
      </div>
    </div>
  );
};

export default SeismicDetail;
