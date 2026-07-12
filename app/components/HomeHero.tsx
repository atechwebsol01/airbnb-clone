"use client";

import Image from "next/image";

import useSearchModal from "@/app/hooks/useSearchModal";

interface HomeHeroProps {
  stats?: {
    homes: number;
    reviews: number;
    destinations: number;
  };
}

const HomeHero: React.FC<HomeHeroProps> = ({ stats }) => {
  const searchModal = useSearchModal();

  return (
    <div className="relative h-[82vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2000&q=80"
        alt="Luxury villa at dusk"
        fill
        priority
        className="object-cover animate-slow-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" />
      {/* pt offsets the fixed navbar + category bar (~11rem tall) so the headline centers in the VISIBLE area */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 gap-6 pt-52">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-neutral-50 max-w-3xl leading-tight">
          Find your next{" "}
          <span className="text-gold-500 italic">unforgettable</span> stay
        </h1>
        <p className="text-neutral-300 max-w-xl text-base md:text-lg">
          Handpicked homes in the world&apos;s most beautiful places — from
          beachfront villas to mountain chalets.
        </p>
        <button
          type="button"
          onClick={searchModal.onOpen}
          className="
            bg-gold-500
            hover:bg-gold-400
            transition
            text-ink-950
            font-semibold
            px-8
            py-3
            rounded-full
            text-sm
            tracking-wide
            uppercase
          "
        >
          Start exploring
        </button>
        {stats && (
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 mt-4">
            {[
              { value: stats.homes, label: "Curated homes" },
              { value: stats.reviews, label: "Guest reviews" },
              { value: stats.destinations, label: "Destinations" },
            ].map((item) => (
              <div
                key={item.label}
                className="
                  bg-ink-950/60
                  backdrop-blur-sm
                  border
                  border-ink-600/60
                  rounded-xl
                  px-6
                  py-3
                  text-center
                "
              >
                <div className="text-gold-500 font-display text-2xl font-bold">
                  {item.value}+
                </div>
                <div className="text-neutral-300 text-xs uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeHero;
