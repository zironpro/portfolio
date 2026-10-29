import type { Metadata } from "next";
import BrandsPage from "@/features/branding/branding-view";

export const metadata: Metadata = {
  title: "Branding — Brand Identity & Guidelines",
  description:
    "Comprehensive brand identity systems, corporate monograms, typography hierarchy, palette specifications, and full brand guidelines books.",
  alternates: {
    canonical: "https://zironpro.ae/branding",
  },
  openGraph: {
    title: "Branding | Ziron Pro",
    description:
      "Comprehensive brand identity systems, typography, color specifications, and full brand guidelines books.",
    url: "https://zironpro.ae/branding",
  },
};

export default function Brands() {
  return <BrandsPage />;
}
