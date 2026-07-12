"use client";

import Image from "next/image";

import useSearchModal from "@/app/hooks/useSearchModal";

const HomeHero = () => {
  const searchModal = useSearchModal();

  return (
    <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=80"
        alt="Luxury villa with infinity pool"
        fill
        priority
        className="object-cover animate-slow-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/20" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 gap-6">
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
      </div>
    </div>
  );
};

export default HomeHero;
