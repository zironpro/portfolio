import type { Metadata } from "next";
import PostsPage from "@/features/posts/posts-view";

export const metadata: Metadata = {
  title: "Social Media Posts & Creatives — High-Impact Feed Design",
  description:
    "High-converting social media creatives, ad campaigns, and brand storytelling engineered for Instagram, LinkedIn, and Meta Ads.",
  alternates: {
    canonical: "https://zironpro.ae/posts",
  },
  openGraph: {
    title: "Social Media Posts & Creatives | Ziron Pro",
    description:
      "High-converting social media creatives, ad campaigns, and brand storytelling engineered for Instagram, LinkedIn, and Meta Ads.",
    url: "https://zironpro.ae/posts",
  },
};

export default function Posts() {
  return <PostsPage />;
}

