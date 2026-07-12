import { Nunito, Playfair_Display } from "next/font/google";
import { Metadata } from "next";

import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";
import ToasterProvider from "@/app/providers/ToasterProvider";

import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";

import "./globals.css";

const siteUrl = "https://airbnbclone-red.vercel.app";
const description =
  "Discover unique places to stay, from beachfront villas to mountain chalets. Browse, book, and host with a full-featured Airbnb clone.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Airbnb Clone",
    template: "%s | Airbnb Clone",
  },
  description,
  keywords: ["airbnb clone", "vacation rentals", "book a stay", "travel"],
  openGraph: {
    title: "Airbnb Clone",
    description,
    url: siteUrl,
    siteName: "Airbnb Clone",
    images: [{ url: "/images/logo.png", width: 200, height: 200 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Airbnb Clone",
    description,
    images: ["/images/logo.png"],
  },
};

const font = Nunito({
  subsets: ["latin"],
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" className={display.variable}>
      <body className={`${font.className} bg-ink-950 text-neutral-100`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
