export type Project = {
  id: string;
  title: string;
  industry: string;
  kind: string;
  strip: string;
  pdf: string;
  pages: number;
  description: string;
  deliverables: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "b1",
    title: "Biznorx Realty",
    industry: "Real Estate",
    kind: "Corporate Identity & Brand Guidelines",
    strip: "/branding/previews/biznorx-strip.jpg",
    pdf: "/branding/biznorx.pdf",
    pages: 32,
    description:
      "A refined corporate identity crafted for a premier modern real estate brand. The visual system combines architectural precision, geometric monogram elements, and an authoritative purple and navy palette across stationery, marketing collaterals, environmental signage, and comprehensive brand guidelines.",
    deliverables: [
      "Primary & Secondary Logo System",
      "Brand Colors & Palette Specifications",
      "Typography & Visual Hierarchy",
      "Corporate Stationery & Letterheads",
      "Signage & Billboard System",
      "Complete 32-Page Brand Guidelines",
    ],
  },
  {
    id: "b3",
    title: "Sphere IT Solutions",
    industry: "Technology",
    kind: "Enterprise Tech System & Guidelines",
    strip: "/branding/previews/sphere-it-strip.jpg",
    pdf: "/branding/sphere-it.pdf",
    pages: 19,
    description:
      "A contemporary technology identity built around cloud connectivity, data intelligence, and digital transformation. Combines electric cyan and deep navy color codes, scalable digital product iconography, and investor presentation systems.",
    deliverables: [
      "Primary Logo & Enterprise Monogram",
      "Brand Colors & Technical Typography",
      "Digital Graphics & UI Iconography",
      "Presentation & Pitch Deck Templates",
      "Office Signage & Branded Collateral",
      "Complete 19-Page Brand Guidelines",
    ],
  },
  {
    id: "b4",
    title: "Vila Ventures",
    industry: "Lifestyle & Wellness",
    kind: "Brand Kit & Visual Identity",
    strip: "/branding/previews/vila-ventures-strip.jpg",
    pdf: "/branding/vila-ventures.pdf",
    pages: 8,
    description:
      "A warm, soul-centered visual brand identity built on the core mantra 'Rooted In Joy.' Blends terracotta sun tones, custom meditative brand illustrations, and modern typography across wellness retreats, lifestyle packaging, and mindful apparel.",
    deliverables: [
      "Custom Hand-Drawn Brand Illustration",
      "Sun Flower & Clash Grotesk Typography",
      "Warm Sunburst Terracotta Color Codes",
      "Social Media & Content Kit",
      "Merchandise & Apparel Applications",
      "Complete 8-Page Brand Kit",
    ],
  },
  {
    id: "b5",
    title: "Qordz",
    industry: "Consumer Tech",
    kind: "Tech Lifestyle Brand System",
    strip: "/branding/previews/qordz-strip.jpg",
    pdf: "/branding/qordz.pdf",
    pages: 13,
    description:
      "A cutting-edge tech accessories and mobile power brand created under the tagline 'Tech on the Go.' Highlights an electric charging bolt 'Q' icon, emerald neon accents, and high-impact consumer electronics retail packaging guidelines.",
    deliverables: [
      "Lightning Bolt 'Q' Monogram",
      "Emerald Glow (#00A072) & Carbon Palette",
      "Gilroy & Inter Typography Hierarchy",
      "Retail Packaging & Box Guidelines",
      "E-Commerce & Digital Ad Templates",
      "Complete 13-Page Brand Guidelines",
    ],
  },
  {
    id: "b6",
    title: "Siddh Global Trading",
    industry: "Automotive",
    kind: "Corporate Brand Kit & Guidelines",
    strip: "/branding/previews/siddh-global-strip.jpg",
    pdf: "/branding/siddh-global.pdf",
    pages: 8,
    description:
      "An authoritative automotive spare parts and global trade brand based in UAE: 'Your Reliable Partner on the Road, Trusted by Millions.' Features a precision engine piston 'S' monogram, deep crimson corporate palette, and international export documentation suites.",
    deliverables: [
      "Engine Piston 'S' Emblem",
      "Crimson Red (#A83636) & Steel Charcoal",
      "Aktiv Grotesk & Montserrat Typography",
      "Corporate Stationery & Letterhead Suite",
      "International Trade Business Cards",
      "Complete 8-Page Corporate Brand Kit",
    ],
  },
  {
    id: "b7",
    title: "Mr. Hopps",
    industry: "Lifestyle & Wellness",
    kind: "Brand Mark & Identity Kit",
    strip: "/branding/previews/mrhopps-strip.jpg",
    pdf: "/branding/mrhopps.pdf",
    pages: 8,
    description:
      "A vibrant, friendly lifestyle brand crafted around the philosophy 'Life, Simplified.' Showcases an agile geometric hare emblem in energetic mandarin orange and cobalt blue, engineered for modern retail, delivery, and mobile app icons.",
    deliverables: [
      "Geometric Hare Logo Emblem",
      "Mandarin Orange & Cobalt Palette",
      "Modern Geometric Wordmark",
      "Mobile App Icon & Favicon Suite",
      "Retail Packaging & Merchandise Mockups",
      "Complete 8-Page Identity Kit",
    ],
  },
  {
    id: "b8",
    title: "M2Mtek",
    industry: "Technology",
    kind: "IoT & Telemetry Brand Guidelines",
    strip: "/branding/previews/m2mtek-strip.jpg",
    pdf: "/branding/m2mtek.pdf",
    pages: 16,
    description:
      "An enterprise IoT and telecommunications brand system built on the vision 'Bridging Technologies.' Highlights an interconnected 'M-T' bridge symbol with precision electric cyan and dark slate geometry, built for high-tech scalability.",
    deliverables: [
      "Interconnected 'MT' Bridge Monogram",
      "Electric Cyan & Deep Slate Palette",
      "Precision Clear Space & Grid Standards",
      "Light & Dark Mode Interface Assets",
      "Digital Product & Telematics Icons",
      "Complete 16-Page Brand Guidelines",
    ],
  },
];