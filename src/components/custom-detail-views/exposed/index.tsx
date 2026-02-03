"use client";

import { PortfolioItem } from "../../../types/portfolio";

interface ExposedDetailProps {
  item: PortfolioItem;
}

const ExposedDetail = ({ item }: ExposedDetailProps) => {
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
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            I was an ambassador for Rocky Mountain Bicycles for over six years.
            During that time, I regularly dragged friends out on rides to
            explore new zones—bringing a camera along to capture a few moments
            and help stoke the brand. The raw beauty of these places is hard to
            describe; it simply takes a little effort to reach them. These
            outings were almost always longer than expected, and we quickly
            learned to pack extra snacks.
          </p>
          <p>
            On this particular day, autumn colors painted the mountains in
            vibrant hues, while fresh snow added dramatic contrast to the
            landscape. It wasn’t hard to convince my friend and photographer,
            Alex Pashley, to join. Always down for anything, he was in—no
            questions asked.
          </p>
          <p>I think the conversation went something like this:</p>
          <p className="italic font-playfair font-semibold">
            ”Pash, want to go on a ride? Should make for some good photos. Not
            sure how long it is, but it looks good on the map.”
          </p>
          <p className="italic font-playfair font-semibold">
            ”Sure. What time?”
          </p>
        </div>
      </div>
      {/* Featured Images */}

      <div className="mt-20 max-w-5xl mx-auto px-6">
        <img
          src="/content/exposed/gallery-2.jpg"
          alt="Nate riding a bike through the Tetons"
          className="w-full rounded-lg"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          The autumn colors were in full effect, painting the landscape with
          vibrant hues of red, orange, and yellow. A dusting of snow covered the
          ground, creating even more contrast to the kaleidoscope of colors. 📸
          Alex Pashley
        </p>
      </div>
      <div className="mt-20 max-w-5xl mx-auto px-6">
        <img
          src="/content/exposed/gallery-3.jpg"
          alt="Fallen leaves on the ground"
          className="w-full rounded-lg"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          The changing of seasons always brings a sense of reflection and
          rebirth. Change is inevitable — everything is continuously in motion,
          and I sometimes need to remind myself to stop and appreciate that
          moment, because that moment it will never happen again. 📸 Alex
          Pashley
        </p>
      </div>
      <div className="max-w-2xl mx-auto px-6 mt-16">
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            About four hours in, we realized the day was going to be longer than
            expected. Freeze-thaw cycles had left the shaded terrain greasy,
            turning already steep sections into something sportier than planned.
            We opted for the path less traveled, thinking an exposed ridge would
            be better than a slick, rutted trail. I still stand by our
            assessment of the conditions—but I underestimated the extra time
            required to navigate a lesser-used route, along with the added
            climbing needed to reach the descent.
          </p>
          <p>
            As I get older, I’ve realized that while it’s important to ride with
            people who are competent in this terrain, what matters even more is
            their attitude toward adversity. Sure, it can hurt, and moments like
            this can get a little sucky. But when you step back and remember
            that you’re mountain biking through a landscape most people only
            read about, perspective shifts. You take a breath, relax, and laugh.
            Sometimes, that’s all you can do—and that day, we laughed a lot.
          </p>
        </div>
      </div>
      <div className="mt-16 max-w-5xl mx-auto px-6">
        <img
          src="/content/exposed/gallery-1.jpg"
          alt="Nate topping out on a big hike-a-bike"
          className="w-full rounded-lg"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          You can't call it a backcountry ride without a little hike-a-bike!
          Looking back, this photo represents such a special time and place,
          with an amazing human-being. This will be a day I always will
          remember. 📸 Alex Pashley
        </p>
      </div>
      <div className="mt-16 max-w-5xl mx-auto px-6">
        <img
          src="/content/exposed/gallery-4.jpg"
          alt="Nate looking out at the mountainscape"
          className="w-full rounded-lg"
        />
        <p className="text-gray-300 text-md mt-3 px-4 text-left">
          The more time you spend out in the mountains, you begin to realize how
          small you really are. 📸 Alex Pashley
        </p>
      </div>
      <div className="max-w-2xl mx-auto px-6 mt-16 mb-40">
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            The project ultimately became a reflection on changing seasons—a
            reminder of impermanence.
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

export default ExposedDetail;
