import type { Metadata } from "next";
import SeoPage from "@/features/seo/seo-view";

export const metadata: Metadata = {
  title: "SEO & GEO — Google Search & AI Search Visibility",
  description:
    "Verified #1 Google search rankings and Generative Engine Optimization (GEO) top recommendations across ChatGPT and Perplexity AI.",
  alternates: {
    canonical: "https://zironpro.ae/seo",
  },
  openGraph: {
    title: "SEO & GEO AI Search Visibility | Ziron Pro",
    description:
      "Verified #1 Google search rankings and Generative Engine Optimization (GEO) citations across ChatGPT and Perplexity.",
    url: "https://zironpro.ae/seo",
  },
};

export default function Seo() {
  return <SeoPage />;
}
