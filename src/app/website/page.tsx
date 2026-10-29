import type { Metadata } from "next";
import WebsitesPage from "@/features/website-page/website-view";

export const metadata: Metadata = {
  title: "Websites — High-Performance Web Design & Portals",
  description:
    "Bespoke, high-performance websites engineered for speed, conversion, and luxury aesthetics across real estate, clinics, retail, and corporate enterprises.",
  alternates: {
    canonical: "https://zironpro.ae/website",
  },
  openGraph: {
    title: "Websites | Ziron Pro",
    description:
      "Bespoke, high-performance websites engineered for speed, conversion, and luxury aesthetics.",
    url: "https://zironpro.ae/website",
  },
};

export default function Website() {
  return <WebsitesPage />;
}
