"use client";

import { PortfolioItem } from "../../../types/portfolio";

interface AvaraMedicalDetailProps {
  item: PortfolioItem;
}

const AvaraMedicalDetail = ({ item }: AvaraMedicalDetailProps) => {
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
            I was asked to create a foundational brand identity for Avara
            Medical, a company focused on functional and regenerative
            healthcare. Beyond that, the brief was intentionally open-ended: the
            name carried no intrinsic meaning, and the client was still
            discovering what the brand wanted to be.
          </p>
          <p>
            This lack of definition became both the challenge and the
            constraint. Without a story to anchor the work, the focus shifted
            toward creating a system that felt credible, calm, and adaptable—one
            that could support the brand as it evolved, rather than define it
            too narrowly from the start.
          </p>
        </div>
      </div>
      {/* My role */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">My role</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            I led the design of the core brand foundations, creating a basic but
            flexible identity system. This included the logo and wordmark, a
            considered font stack, and a restrained color palette designed to
            feel clinical without becoming cold. The goal was to establish
            visual coherence while leaving room for future meaning to develop.
          </p>
        </div>
      </div>
      {/* Design Insight */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <h3 className="text-3xl font-bold text-white mb-6">Design insight</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            This project pushed me outside my comfort zone. I’m naturally drawn
            to designing around story and symbolism, but Avara required a
            different approach—one rooted in form, proportion, and neutrality.
          </p>
          <p>
            Rather than forcing meaning where it didn’t yet exist, I explored
            simple geometric structures that subtly echoed the rhythm and
            balance of the wordmark. The process became an exercise in
            listening—allowing the identity to remain open-ended, functional,
            and supportive rather than expressive. I learned that sometimes good
            design isn’t about declaring intent, but about holding space for it.
          </p>
        </div>
      </div>
      {/* Closer */}
      <div className="max-w-2xl mx-auto px-6 mb-40">
        <h3 className="text-3xl font-bold text-white mb-6">Closing</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            Avara Medical reinforced the value of clarity, patience, and
            restraint in brand design. Not every identity begins with a strong
            narrative—and that’s okay. In those moments, design becomes a
            framework rather than a statement, offering stability while meaning
            is still taking shape.
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

export default AvaraMedicalDetail;
