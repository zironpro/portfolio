export type LeadProject = {
  id: string;
  company: string;
  source: string;
  period: string;
  kind: string;
  /** Screenshot shown on the card and in the detail view (served from /public) */
  image?: string;
  imageAlt?: string;
  cpl?: string;
  leadsDelivered: string;
  /** Unit label next to the headline number, e.g. "leads", "conversations" */
  unit?: string;
  roas?: string;
  channels: string[];
  /** Heading for the breakdown list in the detail view (default: "Funnel") */
  breakdownTitle?: string;
  funnelStages: { stage: string; rate: string }[];
  overview: string;
};

const SRC = "Meta Ads Manager";

const ALL_PROJECTS: LeadProject[] = [
  {
    id: "l-recruitment",
    company: "Recruitment",
    source: SRC,
    period: "Aug 2023 – Sep 2026",
    kind: "Lead Form Campaigns",
    image: "/leads/recruitment.png",
    imageAlt: "Meta Ads Manager results for recruitment lead generation campaigns",
    cpl: "AED 2.31",
    leadsDelivered: "6,941",
    unit: "leads",
    channels: ["Meta Lead Forms", "Instagram", "Facebook"],
    breakdownTitle: "Top campaigns",
    funnelStages: [
      { stage: "AURA AIMS | TRCUK | UAE", rate: "2,946 leads" },
      { stage: "Hungary | Aura | NOV23", rate: "1,831 leads" },
      { stage: "Welders_Feb27", rate: "923 leads" },
      { stage: "Europe Heavy Drivers", rate: "384 leads" },
      { stage: "Europe Welders", rate: "349 leads" },
    ],
    overview:
      "Lead generation for recruitment and overseas work opportunities across 9 campaigns. Lead forms collected candidate details at an average of AED 2.31 per lead, with the lowest cost at AED 0.84 per lead on the Hungary taxi-driver campaign.",
  },
  {
    id: "l-legal",
    company: "Legal Services",
    source: SRC,
    period: "Aug 2023 – Sep 2026",
    kind: "Lead Form Campaigns",
    image: "/leads/legal.png",
    imageAlt: "Meta Ads Manager results for legal service lead form campaigns",
    cpl: "AED 1.59",
    leadsDelivered: "3,669",
    unit: "leads",
    channels: ["Meta Lead Forms", "Instagram", "Facebook"],
    breakdownTitle: "Campaigns",
    funnelStages: [
      { stage: "UK Refusal | UAE", rate: "1,438 leads" },
      { stage: "SAL Legal | June copy", rate: "1,274 leads" },
      { stage: "Saj Legal | Aug Campaign", rate: "957 leads" },
    ],
    overview:
      "Lead form campaigns tailored to legal service enquiries. Four campaigns produced 3,669 leads from roughly 1.5 million impressions, with cost per lead between AED 1.30 and AED 2.08.",
  },
  {
    id: "l-general",
    company: "Multi-Sector Campaigns",
    source: SRC,
    period: "Aug 2023 – Sep 2026",
    kind: "Messaging & Lead Forms",
    image: "/leads/overview.png",
    imageAlt: "Meta Ads Manager overview of messaging and lead generation campaigns",
    cpl: "AED 0.56 – 4.67",
    leadsDelivered: "5,558",
    unit: "leads",
    channels: ["Meta Lead Forms", "WhatsApp Conversations"],
    breakdownTitle: "Top campaigns",
    funnelStages: [
      { stage: "Astro Kerala", rate: "2,449 leads" },
      { stage: "Astro Karnata", rate: "1,548 leads" },
      { stage: "Astro Srilanka", rate: "757 leads" },
      { stage: "Aura GCC Video", rate: "739 leads" },
      { stage: "Finland Computers | UAE", rate: "233 chats" },
    ],
    overview:
      "A selection of messaging and lead-generation campaigns across different sectors, delivering 5,558 form leads plus 278 WhatsApp conversations. Cost per lead ranged from AED 0.56 to AED 4.67 depending on the campaign.",
  },
  {
    id: "l-healthcare",
    company: "Healthcare Clinic",
    source: SRC,
    period: "Aug 2026",
    kind: "WhatsApp Patient Enquiries",
    image: "/leads/healthcare.png",
    imageAlt: "Meta Ads Manager results for healthcare WhatsApp campaigns",
    cpl: "AED 5.09",
    leadsDelivered: "295",
    unit: "conversations",
    channels: ["WhatsApp", "Instagram", "Facebook"],
    breakdownTitle: "Campaigns",
    funnelStages: [
      { stage: "WhatsApp Leads | Abu Dhabi | AUG 15", rate: "165 chats" },
      { stage: "WhatsApp Leads | Abu Dhabi | Sta", rate: "130 chats" },
    ],
    overview:
      "WhatsApp campaigns focused on patient enquiries for a local clinic in Abu Dhabi. Two campaigns started 295 conversations for AED 1,500.82, at an average of AED 5.09 per conversation (best: AED 4.31).",
  },
  {
    id: "l-customer",
    company: "Customer Enquiries",
    source: SRC,
    period: "May – Jun 2026",
    kind: "WhatsApp Conversations",
    image: "/leads/customer-enquiry.png",
    imageAlt: "Meta Ads Manager results for customer enquiry WhatsApp campaigns",
    cpl: "AED 12.25",
    leadsDelivered: "224",
    unit: "conversations",
    channels: ["WhatsApp", "Video Creative"],
    breakdownTitle: "Campaigns",
    funnelStages: [
      { stage: "CS | ENG | WA | JUN 17", rate: "129 chats" },
      { stage: "CS | WhatsApp Leads | Abu Dhabi", rate: "58 chats" },
      { stage: "CS VIDEO | MAY 24TH", rate: "37 chats" },
    ],
    overview:
      "WhatsApp campaign creatives designed to start conversations with prospective customers. Three campaigns started 224 conversations for AED 2,743.25 in total.",
  },
  {
    id: "l-product",
    company: "Product Campaigns",
    source: SRC,
    period: "Jun – Jul 2026",
    kind: "Messaging, Reach & Traffic",
    image: "/leads/product.png",
    imageAlt: "Meta Ads Manager results for product messaging campaigns",
    cpl: "AED 11.30",
    leadsDelivered: "518",
    unit: "conversations",
    channels: ["WhatsApp", "Reach", "Link Clicks"],
    breakdownTitle: "Campaigns",
    funnelStages: [
      { stage: "SSI | ENG | WA | JUL 14", rate: "153 chats" },
      { stage: "SSI | ENG | WA | JUL 14 - Copy", rate: "152 chats" },
      { stage: "Window Film | JUNE 28 - Copy", rate: "109 chats" },
      { stage: "SSI | Safety Film | JUL 20", rate: "93 chats" },
      { stage: "SS | AWRNS | DUBAI (reach)", rate: "15,502 people" },
    ],
    overview:
      "Messaging campaigns across product themes, alongside reach and traffic activity. Five messaging campaigns started 518 WhatsApp conversations at an average of AED 11.30, with a reach campaign covering 15,502 people.",
  },
  {
    id: "l-logistics",
    company: "Logistics",
    source: SRC,
    period: "Aug 2026",
    kind: "WhatsApp, Traffic & Lead Forms",
    image: "/leads/logistics.png",
    imageAlt: "Meta Ads Manager results for logistics campaigns",
    cpl: "AED 7.92",
    leadsDelivered: "61",
    unit: "leads",
    channels: ["Meta Lead Forms", "Landing Page", "WhatsApp"],
    breakdownTitle: "Campaigns",
    funnelStages: [
      { stage: "Landing page views (AED 0.57 each)", rate: "221" },
      { stage: "Lead form leads", rate: "61" },
      { stage: "WhatsApp conversations", rate: "14" },
      { stage: "Completed registrations", rate: "6" },
    ],
    overview:
      "Campaigns spanning WhatsApp conversations, landing-page traffic and lead forms for a China–UAE logistics company. The lead form campaign delivered 61 leads at AED 7.92 each, while traffic reached 221 landing page views at AED 0.57.",
  },
  {
    id: "l-profile",
    company: "Profile Visits",
    source: SRC,
    period: "2026",
    kind: "Instagram Traffic",
    image: "/leads/profile-visit.png",
    imageAlt: "Meta Ads Manager results for Instagram profile visit campaigns",
    cpl: "AED 0.21",
    leadsDelivered: "655",
    unit: "profile visits",
    channels: ["Instagram", "Brand Page"],
    breakdownTitle: "Campaigns",
    funnelStages: [
      { stage: "ENBERGEX | INSTA | PV", rate: "588 visits" },
      { stage: "Instagram post boost", rate: "67 visits" },
    ],
    overview:
      "Traffic campaigns directing audiences to an Instagram profile and brand page. 655 profile visits for AED 139.93 in total, as low as AED 0.19 per visit.",
  },
  // {
  //   id: "l1",
  //   company: "Energex",
  //   source: "Google Analytics 4",
  //   period: "1 Aug – 28 Oct 2026",
  //   kind: "Website Lead Funnel",
  //   leadsDelivered: "95",
  //   unit: "leads",
  //   roas: "4.2x",
  //   channels: ["WhatsApp Click", "Contact Form"],
  //   funnelStages: [
  //     { stage: "Total Users", rate: "518" },
  //     { stage: "Engaged Users", rate: "283" },
  //     { stage: "Scrolled Users", rate: "223" },
  //     { stage: "WhatsApp Clickers", rate: "32" },
  //     { stage: "Contact Form Submitters", rate: "11" },
  //   ],
  //   overview:
  //     "Energex website performance from Google Analytics 4 recorded 518 users, 283 engaged users, 1,942 page views, and 4,621 events. Tracking recorded 66 WhatsApp click events and 29 contact form submission events.",
  // },
  // {
  //   id: "l2",
  //   company: "Crystal Shield",
  //   source: "Google Analytics 4",
  //   period: "1 Aug – 28 Oct 2026",
  //   kind: "Website Lead Funnel",
  //   leadsDelivered: "110",
  //   unit: "leads",
  //   roas: "5.2x",
  //   channels: ["Organic Search", "Google Search", "WhatsApp Click", "Contact Form"],
  //   funnelStages: [
  //     { stage: "Total Users", rate: "724" },
  //     { stage: "Engaged Users", rate: "401" },
  //     { stage: "Scrolled Users", rate: "318" },
  //     { stage: "WhatsApp Clickers", rate: "43" },
  //     { stage: "Contact Form Submitters", rate: "19" },
  //   ],
  //   overview:
  //     "Crystal Shield website performance includes 724 users, 401 engaged users, and 318 users who scrolled. Tracking recorded WhatsApp enquiries and contact form submissions, supporting lead generation through organic search and Google Search.",
  // },
];

/** Pulls the number out of strings like "6,941" so cases can be ranked. */
const num = (s: string) => Number(s.replace(/,/g, "")) || 0;

/** Cases with the most results show first. */
export const LEAD_PROJECTS: LeadProject[] = [...ALL_PROJECTS].sort(
  (a, b) => num(b.leadsDelivered) - num(a.leadsDelivered),
);