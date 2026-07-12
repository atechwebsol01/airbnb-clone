"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      aria-label="Airbnb Clone home"
      className="hidden md:flex items-center gap-2 cursor-pointer group"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gold-500 transition group-hover:rotate-12"
      >
        <path
          d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-display text-xl tracking-wide text-neutral-50">
        Airbnb <span className="text-gold-500">Clone</span>
      </span>
    </button>
  );
};

export default Logo;
