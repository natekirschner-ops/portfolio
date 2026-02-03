"use client";

import { PortfolioItem } from "../../../types/portfolio";

interface SeismicDetailProps {
  item: PortfolioItem;
}

const SeismicDetail = ({ item }: SeismicDetailProps) => {
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
            Seismic delivers performance-driven influencer marketing campaigns
            by combining institutional knowledge, data science, and proprietary
            technology. At the center of this ecosystem is Seismo—Seismic’s
            internal software platform used to plan, manage, and evaluate
            campaigns.
          </p>
          <p>
            Over time, Seismo had grown feature by feature, responding to
            immediate needs without a unifying vision. While powerful, the
            experience had become fragmented, making it harder to scale,
            maintain, and use effectively. I was brought in to help establish a
            holistic design direction, improve usability, and create a system
            that could evolve alongside the business.
          </p>
        </div>
      </div>
      {/*Image */}
      <div className="my-20 max-w-5xl mx-auto px-6">
        <img
          src="/content/seismic/seismic_01.jpg"
          alt="Seismo design system foundations"
          className="w-full rounded-lg"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          The core brand foundations—color palette, typography, and
          iconography—provide a shared visual language for the Seismic platform.
          These elements ensure consistency across components, help designers
          and engineers communicate effectively, and create a scalable system
          that can grow with the product.
        </p>
      </div>
      {/* My role */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">My role</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            I worked closely with the Product Manager, VP of Engineering, and
            engineering team to introduce a more intentional design process,
            establishing clear phases for discovery, design, review, and
            handoff. Alongside this, I led the creation of a scalable design
            system—defining components, patterns, and conventions that aligned
            with both product needs and engineering constraints.
          </p>
          <p>
            This system improved consistency across the platform, reduced
            production time, and created a shared language between design and
            development, allowing the team to move faster with greater
            confidence.
          </p>
        </div>
      </div>
      {/*Image */}
      <div className="my-20 max-w-5xl mx-auto px-6">
        <img
          src="/content/seismic/seismic_02.jpg"
          alt="Seismo design system components"
          className="w-full rounded-lg"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          Components are the building blocks of the Seismic design system. Each
          one is designed to be flexible, reusable, and consistent, allowing the
          team to quickly assemble interfaces while maintaining a cohesive
          experience across the platform.
        </p>
      </div>
      {/* Design Insight */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">Design insight</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            This project reinforced the importance of starting with clarity.
            Setting clear business and product goals upfront created alignment
            across teams and helped guide design decisions throughout the
            process.
          </p>
          <p>
            I also learned the value of starting simple. By focusing first on
            core components and essential workflows, the system could evolve
            organically through iteration and feedback, rather than attempting
            to solve everything at once.
          </p>
          <p>
            Finally, alignment is as much a design challenge as it is a process
            one. Open communication and shared expectations between stakeholders
            proved critical in building trust, momentum, and long-term success.
          </p>
        </div>
      </div>
      {/*Image */}
      <div className="my-20 max-w-5xl mx-auto px-6">
        <img
          src="/content/seismic/seismic_03.jpg"
          alt="Seismo design system architecture"
          className="w-full rounded-lg"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          Seismic’s platform is organized into modular surfaces—communication,
          management, and discovery—each designed to support distinct workflows
          while sharing a consistent system of components and patterns. This
          modular approach allows the product to scale without fragmenting the
          user experience.
        </p>
      </div>
      {/* Closer */}
      <div className="max-w-2xl mx-auto px-6 mb-40">
        <h3 className="text-3xl font-bold text-white mb-6">Closing</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            Working on Seismic’s design system deepened my appreciation for
            systems that grow over time. It reminded me that good design isn’t
            static—it’s something that evolves through iteration, reflection,
            and collaboration. I carry these lessons forward, not just in my
            design practice, but in how I approach problem-solving more broadly:
            with patience, intention, and a commitment to continuous
            improvement.
          </p>
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

export default SeismicDetail;
