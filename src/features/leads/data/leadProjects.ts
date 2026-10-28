export type LeadProject = {
  id: string;
  industry: string;
  kind: string;
  cpl: string;
  leadsDelivered: string;
  roas: string;
  channels: string[];
  funnelStages: { stage: string; rate: string }[];
  overview: string;
};

export const LEAD_PROJECTS: LeadProject[] = [
  {
    id: "l1",
    industry: "Education",
    kind: "Higher Ed Admissions Campaign",
    cpl: "$14.20",
    leadsDelivered: "1,450",
    roas: "4.8x",
    channels: ["Meta Ads", "Google Search", "WhatsApp Automation"],
    funnelStages: [
      { stage: "Ad Impressions", rate: "240k" },
      { stage: "Qualified Quiz Completers", rate: "2,800" },
      { stage: "Booked Advising Calls", rate: "1,450" },
      { stage: "Confirmed Enrolments", rate: "310" },
    ],
    overview:
      "An interactive scholarship and eligibility quiz funnel paired with fast WhatsApp CRM routing.",
  },
  {
    id: "l2",
    industry: "Real estate",
    kind: "Off-Plan Investment Funnel",
    cpl: "$32.50",
    leadsDelivered: "680",
    roas: "8.2x",
    channels: ["Google Search Intent", "LinkedIn B2B", "Direct Outreach"],
    funnelStages: [
      { stage: "High-Intent Searchers", rate: "45k" },
      { stage: "Brochure Unlocks", rate: "1,950" },
      { stage: "Verified Investor Enquiries", rate: "680" },
      { stage: "Site Visits Booked", rate: "94" },
    ],
    overview:
      "A gated developer brochure funnel that filters serious investors before handing off to the sales team.",
  },
  {
    id: "l3",
    industry: "Healthcare",
    kind: "Cosmetic & Dental Enquiries",
    cpl: "$18.90",
    leadsDelivered: "920",
    roas: "5.4x",
    channels: ["Instagram Reels Ads", "Local Google Search", "SMS Reminders"],
    funnelStages: [
      { stage: "Video Views", rate: "180k" },
      { stage: "Treatment Cost Calculators", rate: "3,200" },
      { stage: "Consultation Bookings", rate: "920" },
      { stage: "Treatments Started", rate: "285" },
    ],
    overview:
      "A pricing calculator that captures patients who are ready to book a consultation.",
  },
  {
    id: "l4",
    industry: "Local services",
    kind: "Emergency Call Enquiries",
    cpl: "$11.40",
    leadsDelivered: "1,850",
    roas: "6.1x",
    channels: ["Google Local Services Ads", "Click-to-Call Ads"],
    funnelStages: [
      { stage: "Call Ad Impressions", rate: "95k" },
      { stage: "Calls Connected", rate: "2,400" },
      { stage: "Qualified Dispatches", rate: "1,850" },
      { stage: "Completed Jobs", rate: "1,420" },
    ],
    overview:
      "A pay-per-call mobile campaign built for sub-30-minute dispatch response times.",
  },
  {
    id: "l5",
    industry: "Hospitality",
    kind: "Corporate Retreats & Banquets",
    cpl: "$45.00",
    leadsDelivered: "340",
    roas: "7.0x",
    channels: ["LinkedIn Sponsored InMail", "Account-Based Marketing"],
    funnelStages: [
      { stage: "Corporate Decision Makers", rate: "12k" },
      { stage: "Venue Deck Downloads", rate: "840" },
      { stage: "Quote Requests", rate: "340" },
      { stage: "Signed Event Contracts", rate: "48" },
    ],
    overview:
      "Targeted outreach to HR and event heads, securing premium corporate bookings.",
  },
  {
    id: "l6",
    industry: "Retail",
    kind: "VIP Buyer & Wholesale Pipeline",
    cpl: "$16.80",
    leadsDelivered: "1,120",
    roas: "5.1x",
    channels: ["Meta Lookalike Audiences", "Email Flows"],
    funnelStages: [
      { stage: "Lookbook Viewers", rate: "120k" },
      { stage: "VIP Club Signups", rate: "4,600" },
      { stage: "Wholesale Enquiries", rate: "1,120" },
      { stage: "Stockists Onboarded", rate: "115" },
    ],
    overview:
      "Dual-track lead capture driving both direct-to-consumer loyalty and wholesale stockist applications.",
  },
];