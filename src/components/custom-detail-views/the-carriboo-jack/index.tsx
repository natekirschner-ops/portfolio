"use client";

import { PortfolioItem } from "../../../types/portfolio";

interface TheCarribooJackDetailProps {
  item: PortfolioItem;
}

const TheCarribooJackDetail = ({ item }: TheCarribooJackDetailProps) => {
  return (
    <div className="bg-black py-20 relative">
      {/* Banner Video */}
      <div className="max-w-4xl mx-auto mb-20 px-6">
        <video
          src="/content/the-carriboo-jack/thumbnail.mp4"
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

      <div className="mt-16 max-w-5xl mx-auto px-6">
        <figure>
          <img
            src="/content/the-carriboo-jack/carriboo-jack_01.jpg"
            alt="Party in the woods"
            className="w-full rounded-lg"
          />
          <figcaption className="text-gray-400 text-sm mt-3 px-1">
            This quiet moment might be my favorite photo from all the years of
            the event—a true party in the woods. 📸 Alex Pashley
          </figcaption>
        </figure>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-6">
        <figure>
          <img
            src="/content/the-carriboo-jack/carriboo-jack_02.jpg"
            alt="Nick is stoked"
            className="w-full rounded-lg"
          />
          <figcaption className="text-gray-400 text-sm mt-3 px-1">
            Nick, stoked on the ride and rocking a Smartwool x Cariboo Jack
            jersey, soaking in the trails and the energy of the event. 📸 Alex
            Pashley
          </figcaption>
        </figure>
      </div>

      {/* Project Overview */}
      <div className="max-w-2xl mx-auto px-6 my-24">
        <h3 className="text-3xl font-bold text-white mb-6">Overview</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>There's an arc here.</p>
          <p>
            In 2018, inspired by events like Trans-Cascadia, I felt a pull to
            create something from nothing: a mountain bike event rooted in trail
            stewardship, a challenging race to highlight that work, and a party
            in the woods to bring people together afterward. I hustled for local
            support, spent my own money, built the brand, and made it happen. It
            was small—but there was a buzz. An energy that felt special.
          </p>
          <p>
            Each year, the event grew. Sponsors came on board. Production became
            more polished. It started to look like the "real" thing. The
            Carriboo Jack was always a bit awkward by design—a backcountry race
            that pushed people outside their comfort zones. The first year, I
            begged people to sign up. A few years later, it was selling out in
            under 30 minutes.
          </p>
          <p>And somewhere along the way, it stopped being fun.</p>
          <p>
            I realized I was trying to make it big, when what made it meaningful
            was that it was small. Local. A little goofy. Personal.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-6">
        <figure>
          <img
            src="/content/the-carriboo-jack/carriboo-jack_03.jpg"
            alt="Rider high in the alpine"
            className="w-full rounded-lg"
          />
          <figcaption className="text-gray-400 text-sm mt-3 px-1">
            A rider high in the alpine. There's something magical about this
            zone—hard to explain, but deeply felt. 📸 Cort Muller
          </figcaption>
        </figure>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-6">
        <figure>
          <img
            src="/content/the-carriboo-jack/carriboo-jack_04.jpg"
            alt="Evan slinging pies"
            className="w-full rounded-lg"
          />
          <figcaption className="text-gray-400 text-sm mt-3 px-1">
            Pizza master Grottylocks slinging pies to a group of hungry
            riders—much-needed fuel after a long day in the mountains. 📸 Cort
            Muller
          </figcaption>
        </figure>
      </div>

      {/* My Role */}
      <div className="max-w-2xl mx-auto px-6 my-24">
        <h3 className="text-3xl font-bold text-white mb-6">My role</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            Founder and lead organizer. I designed and executed every aspect of
            the event, including trail work, course design, brand identity,
            marketing, website, sponsorships, logistics, and volunteer
            coordination. The Carriboo Jack was a fully volunteer-run effort,
            with all proceeds reinvested directly into trail stewardship.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-6">
        <figure>
          <img
            src="/content/the-carriboo-jack/carriboo-jack_05.jpg"
            alt="Big Jerm and Bill embody the Carriboo Jack spirit"
            className="w-full rounded-lg"
          />
          <figcaption className="text-gray-400 text-sm mt-3 px-1">
            Big Jerm being serenaded by Cariboo Jack—a moment that perfectly
            captures the spirit of the event. Equal parts grit, humor, and
            community. 📸 Ben Gavelda
          </figcaption>
        </figure>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-6">
        <figure>
          <img
            src="/content/the-carriboo-jack/carriboo-jack_06.jpg"
            alt="Carriboo Jack beer"
            className="w-full rounded-lg"
          />
          <figcaption className="text-gray-400 text-sm mt-3 px-1">
            10 Barrel Brewing crafted a light Cariboo Jack beer—always welcome
            after a hard day in the mountains. 📸 Cort Muller
          </figcaption>
        </figure>
      </div>

      {/* Design Insight */}
      <div className="max-w-2xl mx-auto px-6 my-24">
        <h3 className="text-3xl font-bold text-white mb-6">Design insight</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            The most important design decision wasn't about branding, logistics,
            or scale—it was about restraint. Letting the event be what it wanted
            to be, not what I thought it should become.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-6">
        <figure>
          <img
            src="/content/the-carriboo-jack/carriboo-jack_07.jpg"
            alt="Trailwork tool stash"
            className="w-full rounded-lg"
          />
          <figcaption className="text-gray-400 text-sm mt-3 px-1">
            The USFS packed tools in by horse a few days before our dig days,
            making it possible to work deep in the backcountry without motorized
            access. 📸 Ben Gavelda
          </figcaption>
        </figure>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-6">
        <figure>
          <img
            src="/content/the-carriboo-jack/carriboo-jack_08.jpg"
            alt="Trophy skull"
            className="w-full rounded-lg"
          />
          <figcaption className="text-gray-400 text-sm mt-3 px-1">
            The trophy skull tradition began with Mitch Prissel in 2018 and
            quickly became part of the Cariboo Jack lore. 📸 Cort Muller
          </figcaption>
        </figure>
      </div>

      {/* Closing */}
      <div className="max-w-2xl mx-auto px-6 mt-24 mb-40">
        <h3 className="text-3xl font-bold text-white mb-6">Closing</h3>
        <div className="text-gray-50 leading-relaxed font-normal text-md md:text-lg">
          <p>
            By 2024, my final year involved with the race, everything clicked.
            The venue, the course, the format—it all felt right. It felt like
            riding bikes in the woods with your friends.
          </p>
          <p>
            Looking back, I'm amazed at how much time I spent deep in the
            forest—alone and with others—clearing trail, problem-solving, and
            staying up late worrying about race details. It was 100%
            volunteer-run, with all proceeds going back into the trails. I
            wouldn't trade any of it for anything.
          </p>
          <div className="flex justify-center mt-8">
            <a
              href="https://www.mountainbiketetons.org/the-carriboo-jack"
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

export default TheCarribooJackDetail;
