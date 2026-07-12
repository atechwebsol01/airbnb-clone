import Link from "next/link";

const exploreLinks = [
  { label: "Beach houses", href: "/?category=Beach" },
  { label: "Modern villas", href: "/?category=Modern" },
  { label: "Castles", href: "/?category=Castles" },
  { label: "Island escapes", href: "/?category=Islands" },
  { label: "Luxury stays", href: "/?category=Lux" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Cancellation options", href: "#" },
  { label: "Safety information", href: "#" },
  { label: "Report a concern", href: "#" },
];

const legalLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-ink-900 border-t border-ink-700 mt-20">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gold-500"
              >
                <path
                  d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-display text-lg text-neutral-50">
                Airbnb <span className="text-gold-500">Clone</span>
              </span>
            </div>
            <p className="text-neutral-400 text-sm font-light max-w-xs">
              Handpicked homes in the world&apos;s most beautiful places.
              Browse, book, and host with confidence.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-semibold text-neutral-50">Explore</div>
            {exploreLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-neutral-400 text-sm hover:text-gold-400 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-semibold text-neutral-50">Support</div>
            {supportLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-neutral-400 text-sm hover:text-gold-400 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-semibold text-neutral-50">Legal</div>
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-neutral-400 text-sm hover:text-gold-400 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="
            border-t
            border-ink-700
            mt-10
            pt-6
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
            text-sm
            text-neutral-500
          "
        >
          <div>© {new Date().getFullYear()} Airbnb Clone. All rights reserved.</div>
          <div>
            Built by{" "}
            <a
              href="https://github.com/atechwebsol01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:underline"
            >
              @atechwebsol01
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
