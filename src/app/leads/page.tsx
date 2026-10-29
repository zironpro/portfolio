import type { Metadata } from "next";
import LeadsPage from "@/features/leads/leads-view";

export const metadata: Metadata = {
  title: "Leads — Customer Acquisition & Growth Funnels",
  description:
    "Tracked customer acquisition funnels, Google Analytics 4 conversion tracking, WhatsApp automation, and proven return on ad spend.",
  alternates: {
    canonical: "https://zironpro.ae/leads",
  },
  openGraph: {
    title: "Lead Generation & Acquisition | Ziron Pro",
    description:
      "Tracked customer acquisition funnels, GA4 conversion data, WhatsApp routing, and measured ROAS.",
    url: "https://zironpro.ae/leads",
  },
};

export default function Leads() {
  return <LeadsPage />;
}
