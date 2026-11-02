export type PostProject = {
  id: string;
  title: string;
  client: string;
  kind: string;
  format: string;
  platform: string;
  headline?: string;
  image: string;
  ratio?: string;
  tone?: string;
  specs: string[];
  overview: string;
  industry?: string;
};

export const POST_PROJECTS: PostProject[] = [
  {
    id: "post-1",
    title: "JCB 225 LC M — High-Performance Excavator Launch",
    client: "Delta Equipment",
    kind: "Heavy Equipment Launch",
    format: "Feed Creative · 3:4 Portrait",
    platform: "Instagram, Facebook & WhatsApp",
    headline: "قوة أكتر · شغل أكتر — حَفّار JCB 225 LC M",
    image: "/posts/delta.jpg",
    ratio: "3/4",
    tone: "#EAB308",
    specs: [
      "Dynamic 3D terrain composite with explosive earth-moving action",
      "Prominent technical callouts (148 HP, heavy-duty build, peak productivity)",
      "Instant contact routing with Sudan local dialing (+249 91 237 0248)",
      "Bold Arabic typography following JCB global yellow-and-black identity",
    ],
    overview:
      "Engineered for Delta Equipment to announce the JCB 225 LC M excavator across Sudan and regional mining sectors. The creative balances heavy industrial authority with immediate inquiry conversion through bold spec badges and direct telephone CTAs.",
  },
  {
    id: "post-2",
    title: "Under the Soil of Sudan — Nation Building Campaign",
    client: "Delta Equipment",
    kind: "Brand Narrative Campaign",
    format: "Brand Campaign · 3:4 Portrait",
    platform: "Instagram, LinkedIn & Facebook",
    headline: "تحت أرض السودان في مستقبل يستاهل نحفر عشانه — نبني مستقبل السودان",
    image: "/posts/delta-2.jpg",
    ratio: "3/4",
    tone: "#F59E0B",
    specs: [
      "Cinematic sunset lighting with dual-exposure modern city skyline",
      "Emotional national-reconstruction storytelling tailored for Sudan",
      "Crisp earth-trench compositing with yellow tracked excavator hero",
      "Brand authority partnership between JCB global and Delta Equipment",
    ],
    overview:
      "An institutional storytelling campaign positioning Delta Equipment and JCB not merely as machinery dealers, but as primary partners in building the future of Sudan. Designed to foster emotional brand loyalty among government contractors, developers, and civil engineers.",
  },
  {
    id: "post-3",
    title: "JCB 345 LC HD — 221 HP Quarry & Mining Power",
    client: "Delta Equipment",
    kind: "Industrial Spec Showcase",
    format: "Feed Creative · 3:4 Portrait",
    platform: "Instagram, LinkedIn & Meta Ads",
    headline: "قوة 221 حصان... أداء تقدر تعتمد عليه",
    image: "/posts/delta-3.jpg",
    ratio: "3/4",
    tone: "#EAB308",
    specs: [
      "Ultra-detailed quarry site perspective highlighting bucket teeth depth",
      "Iconographic sector breakdown: Mining, Quarries & Earthmoving",
      "High-contrast 221 HP power metric callout",
      "Industrial grade color grading optimized for mobile feed contrast",
    ],
    overview:
      "Created to target quarry owners and large-scale mining operations. Emphasizes durability, continuous operating hours, and 221 horsepower engine reliability with extreme close-up foreground perspective and sector-specific iconography.",
  },
  {
    id: "post-4",
    title: "Gateway from China to GCC — Trade Corridor",
    client: "Maxline Global Logistics",
    kind: "Global Logistics & Freight",
    format: "Ad Creative · 3:4 Portrait",
    platform: "LinkedIn, Instagram & Meta Ads",
    headline: "Your Gateway from China to GCC — Reliable Logistics Solutions",
    image: "/posts/maxline.jpg",
    ratio: "3/4",
    tone: "#0284C7",
    specs: [
      "Futuristic glowing portal bridge between Shanghai and Dubai skylines",
      "High-speed haulage container truck with Maxline corporate branding",
      "Comprehensive GCC regional footprint (UAE, KSA, Oman, Qatar, Bahrain, Kuwait)",
      "Direct lead-generation 'Enquire Now' button and phone hotline (+971 42 822 022)",
    ],
    overview:
      "A dynamic concept advertising creative developed for Maxline Global Logistics (Jebel Ali, Dubai). Visualizes an effortless physical portal directly transporting freight from Chinese manufacturing hubs to Arabian Gulf distribution centers, driving B2B shipping inquiries.",
  },
  {
    id: "post-5",
    title: "Safety Film: Built to Hold, Designed to Protect",
    client: "Crystal Shield & Madico",
    kind: "Architectural Glass Protection",
    format: "Product Authority · 3:4 Portrait",
    platform: "Instagram, LinkedIn & Meta Ads",
    headline: "Safety Film. Built to Hold. Designed to Protect.",
    image: "/posts/ssi.webp",
    ratio: "3/4",
    tone: "#2563EB",
    specs: [
      "Striking shatter-impact demonstration on full-height architectural glass",
      "Three pillar benefit matrix: Enhanced Safety, Glass Retention, Occupant Protection",
      "Official NFRC Certified Films green accreditation badge",
      "Dedicated commercial consultation phone hotline (+971 50 385 8785)",
    ],
    overview:
      "High-credibility social creative engineered for Crystal Shield in partnership with USA manufacturer Madico. Conveys immediate peace of mind for corporate facility managers and villa owners through high-impact visual proof of anti-shatter glass retention.",
  },
];

