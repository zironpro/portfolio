export type Video = {
  id: string;
  title: string;
  industry?: string;
  kind: "Ad film" | "Reel" | "Product";
  duration: string;
  slug: string; // files: /video/{slug}.webm & /video/{slug}.mp4
  description: string;
};

export const VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Via Sakan",
    industry: "Real Estate",
    kind: "Ad film",
    duration: "0:48",
    slug: "via-sakan",
    description:
      "Cinematic architectural tour exploring bespoke luxury villa residences, modern interior finishing, and prestigious community living in the UAE.",
  },
  {
    id: "v2",
    title: "The Fitness Lab",
    industry: "Health & Fitness",
    kind: "Reel",
    duration: "0:37",
    slug: "fitness-lab",
    description:
      "High-energy social reel presenting bespoke in-home personal training for ladies, posture alignment, and strength conditioning.",
  },
  {
    id: "v3",
    title: "Roots Wellness",
    industry: "Beauty & Wellness",
    kind: "Reel",
    duration: "0:31",
    slug: "roots",
    description:
      "Serene lifestyle video highlighting authentic Ayurvedic therapies, holistic body care, and rejuvenating natural herbal treatments.",
  },
  {
    id: "v4",
    title: "Vila Ventures",
    industry: "Wellness & Lifestyle",
    kind: "Reel",
    duration: "0:54",
    slug: "vila-ventures",
    description:
      "Inspiring journey documentary reel following transformative mindfulness sessions, therapeutic yoga postures, and personal wellness growth.",
  },
  {
    id: "v5",
    title: "Delta Equipment",
    industry: "Industrial Equipment",
    kind: "Ad film",
    duration: "0:13",
    slug: "delta",
    description:
      "Dynamic brand commercial showcasing Delta Equipment's premier facility and authorized JCB heavy machinery dealership in the UAE.",
  },
  {
    id: "v6",
    title: "Delta JCB 225LCM",
    industry: "Heavy Machinery",
    kind: "Product",
    duration: "0:24",
    slug: "delta-jcb-225lcm",
    description:
      "Heavy earthmoving machinery reel demonstrating the JCB 225LCM tracked excavator on active civil construction and excavation sites.",
  },
  {
    id: "v7",
    title: "Energex Power",
    industry: "Equipment Rental",
    kind: "Product",
    duration: "0:21",
    slug: "energex-rental",
    description:
      "On-camera walkthrough detailing turnkey commercial generator rental solutions, power backup fleets, and 24/7 technical support.",
  },
  {
    id: "v8",
    title: "S.A.J Legal Solicitors",
    industry: "Legal Services",
    kind: "Ad film",
    duration: "0:12",
    slug: "saj-solicitors",
    description:
      "Sophisticated brand storytelling reel for S.A.J Legal Solicitors — 'Every case has a story' — emphasizing justice, advocacy, and client commitment.",
  },
  {
    id: "v9",
    title: "SSI Solar Safety",
    industry: "Architectural Glazing",
    kind: "Reel",
    duration: "0:17",
    slug: "ssi-insulation",
    description:
      "Commercial high-rise installation reel showing Solar Safety Insulation LLC applying heat-reflective architectural safety film on glazed facades.",
  },
];