export type LeadProject = {
  id: string;
  company: string;
  source: string;
  period: string;
  kind: string;
  leadsDelivered: string;
  roas: string;
  channels: string[];
  funnelStages: { stage: string; rate: string }[];
  overview: string;
};

export const LEAD_PROJECTS: LeadProject[] = [
  {
    id: "l1",
    company: "Energex",
    source: "Google Analytics 4",
    period: "1 Aug – 28 Oct 2026",
    kind: "Website Lead Funnel",
    leadsDelivered: "95",
    roas: "4.2x",
    channels: ["WhatsApp Click", "Contact Form"],
    funnelStages: [
      { stage: "Total Users", rate: "518" },
      { stage: "Engaged Users", rate: "283" },
      { stage: "Scrolled Users", rate: "223" },
      { stage: "WhatsApp Clickers", rate: "32" },
      { stage: "Contact Form Submitters", rate: "11" },
    ],
    overview:
      "Energex website performance from Google Analytics 4 recorded 518 users, 283 engaged users, 1,942 page views, and 4,621 events. Tracking recorded 66 WhatsApp click events and 29 contact form submission events.",
  },
  {
    id: "l2",
    company: "Crystal Shield",
    source: "Google Analytics 4",
    period: "1 Aug – 28 Oct 2026",
    kind: "Website Lead Funnel",
    leadsDelivered: "110",
    roas: "5.2x",
    channels: [
      "Organic Search",
      "Google Search",
      "WhatsApp Click",
      "Contact Form",
    ],
    funnelStages: [
      { stage: "Total Users", rate: "724" },
      { stage: "Engaged Users", rate: "401" },
      { stage: "Scrolled Users", rate: "318" },
      { stage: "WhatsApp Clickers", rate: "43" },
      { stage: "Contact Form Submitters", rate: "19" },
    ],
    overview:
      "Crystal Shield website performance includes 724 users, 401 engaged users, and 318 users who scrolled. Tracking recorded WhatsApp enquiries and contact form submissions, supporting lead generation through organic search and Google Search.",
  },
];