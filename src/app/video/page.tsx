import type { Metadata } from "next";
import VideoPage from "@/features/video/video-view";

export const metadata: Metadata = {
  title: "Video — Commercial Video Production & Motion",
  description:
    "High-impact video production, commercial advertisements, hospitality showcases, event coverage, and social media video content.",
  alternates: {
    canonical: "https://zironpro.ae/video",
  },
  openGraph: {
    title: "Video Production | Ziron Pro",
    description:
      "High-impact commercial video production, brand films, and motion content.",
    url: "https://zironpro.ae/video",
  },
};

export default function Video() {
  return <VideoPage />;
}
