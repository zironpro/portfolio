export type Project = {
  id: string;
  title: string;
  industry: string;
  kind: string;
  description: string;
  url?: string;
  displayUrl?: string;
  tone: string;
  image: string;
  deliverables?: string[];
  metrics?: { label: string; value: string }[];
};

const P = "#4D11A8",
  P2 = "#8F2CF4",
  P3 = "#6620EE",
  K = "#0D1420";

export const PROJECTS: Project[] = [
  {
    id: "w1",
    title: "Biznorx Realty",
    industry: "Real Estate",
    kind: "Property Showcase",
    description:
      "A high-performance real estate portal tailored for premium property listings, interactive virtual tours, and automated inquiry capture across mobile and desktop.",
    deliverables: [
      "Responsive Web Design",
      "Property Search & Filter",
      "Lead Capture Integration",
      "Mobile Optimization",
    ],
    metrics: [
      { label: "Performance", value: "98/100" },
      { label: "Load Speed", value: "< 1.2s" },
      { label: "Inquiry Lift", value: "+44%" },
    ],
    url: "https://biznorxrealty.com/",
    displayUrl: "biznorxrealty.com",
    tone: P,
    image: "/websites/biznorx-realty.jpg",
  },
  {
    id: "w3",
    title: "Delta Equipment",
    industry: "Heavy Equipment",
    kind: "Machinery Catalogue",
    description:
      "A professional equipment website showcasing heavy machinery, product specifications, equipment categories, and solutions for commercial and industrial customers.",
    deliverables: [
      "Product Catalogue",
      "Equipment Showcase",
      "Technical Specifications",
      "SEO Optimization",
    ],
    metrics: [
      { label: "Catalog Items", value: "1,200+" },
      { label: "Quote Requests", value: "Streamlined" },
      { label: "Mobile Experience", value: "Optimized" },
    ],
    url: "https://deltaequip.net/",
    displayUrl: "deltaequip.net",
    tone: K,
    image: "/websites/delta-equipment.jpg",
  },
  {
    id: "w2",
    title: "Vila Ventures",
    industry: "Real Estate",
    kind: "Luxury Estates & Villas",
    description:
      "An editorial-style digital experience showcasing luxury vacation villas and premium estate investments through high-resolution imagery and direct inquiry options.",
    deliverables: [
      "Luxury UI/UX",
      "Brochure Downloads",
      "Interactive Map",
      "WhatsApp Direct Booking",
    ],
    metrics: [
      { label: "Performance", value: "99/100" },
      { label: "Bounce Rate", value: "-28%" },
      { label: "Bookings", value: "+3.2x" },
    ],
    url: "https://vilaventures.ae/",
    displayUrl: "vilaventures.ae",
    tone: P2,
    image: "/websites/vila-ventures.jpg",
  },
  {
    id: "w4",
    title: "Energex Equipment Rental",
    industry: "Energy & Power",
    kind: "Generator Rental Solutions",
    description:
      "A modern equipment rental website presenting generator rental solutions, power capacities, technical specifications, and dependable power support for commercial and industrial projects.",
    deliverables: [
      "Generator Showcase",
      "Rental Solutions",
      "Technical Specifications",
      "Custom Animations",
    ],
    metrics: [
      { label: "Power Range", value: "20–1500 kVA" },
      { label: "Technical Support", value: "24/7" },
      { label: "Ambient Design", value: "50°C" },
    ],
    url: "https://energexequip.ae/",
    displayUrl: "energexequip.ae",
    tone: P3,
    image: "/websites/energex.jpg",
  },
  {
    id: "w5",
    title: "100 Power",
    industry: "Energy & Power",
    kind: "Industrial Power Systems",
    description:
      "A corporate digital presence highlighting industrial power solutions, engineering capabilities, and reliable energy infrastructure for commercial and industrial clients.",
    deliverables: [
      "Corporate Website",
      "Solutions Architecture",
      "Service Showcase",
      "Responsive Design",
    ],
    metrics: [
      { label: "Industry", value: "Energy" },
      { label: "Solutions", value: "Industrial" },
      { label: "Experience", value: "Responsive" },
    ],
    url: "https://100poweruae.com/en",
    displayUrl: "100poweruae.com",
    tone: P,
    image: "/websites/100-power.jpg",
  },
  {
    id: "w6",
    title: "Maxline Global",
    industry: "Logistics",
    kind: "Freight & Supply Chain",
    description:
      "A professional logistics website presenting freight services, transportation capabilities, and supply chain solutions through a streamlined digital experience.",
    deliverables: [
      "Service Showcase",
      "Logistics Solutions",
      "Inquiry Forms",
      "Responsive Design",
    ],
    metrics: [
      { label: "Industry", value: "Logistics" },
      { label: "Services", value: "Freight & Supply Chain" },
      { label: "Experience", value: "Responsive" },
    ],
    url: "https://maxlineglobal.com/",
    displayUrl: "maxlineglobal.com",
    tone: K,
    image: "/websites/maxline.png",
  },
  {
    id: "w7",
    title: "Qordx",
    industry: "Technology",
    kind: "Digital Platform & SaaS",
    description:
      "A sleek SaaS product concept featuring dark-mode accents, interactive feature highlights, modern interface elements, and a streamlined user experience.",
    deliverables: [
      "SaaS Landing Page",
      "Interactive Features",
      "Pricing Interface",
      "User Onboarding",
    ],
    metrics: [
      { label: "Design", value: "Modern UI" },
      { label: "Experience", value: "Interactive" },
      { label: "Theme", value: "Dark Mode" },
    ],
    // No URL for Qordx
    tone: P2,
    image: "/websites/qordx.jpg",
  },
  {
    id: "w8",
    title: "Al Rewaya Book Store",
    industry: "E-commerce & Publishing",
    kind: "Online Bookstore",
    description:
      "A modern e-commerce platform designed to showcase a diverse collection of books, from Islamic literature and children's books to fiction and personal development. The website delivers a seamless browsing and shopping experience with curated collections, bestsellers, and an intuitive product discovery journey.",
    deliverables: [
      "E-commerce Website",
      "Book Catalogue & Categories",
      "Product Discovery & Shopping",
      "Responsive Design",
    ],
    metrics: [
      { label: "Industry", value: "Book Retail" },
      { label: "Platform", value: "E-commerce" },
      { label: "Experience", value: "Responsive" },
    ],
    url: "https://www.rewayabooks.com/",
    displayUrl: "rewayabooks.com",
    tone: P2,
    image: "/websites/al-rewaya.png",
  },
  {
    id: "w9",
    title: "InfraGuide UAE",
    industry: "Infrastructure",
    kind: "Infrastructure Solutions",
    description:
      "A professional digital platform presenting infrastructure-related services and solutions through structured content, clear navigation, and a modern corporate interface.",
    deliverables: [
      "Corporate Website",
      "Service Presentation",
      "Content Architecture",
      "Responsive Design",
    ],
    metrics: [
      { label: "Industry", value: "Infrastructure" },
      { label: "Experience", value: "User-Focused" },
      { label: "Layout", value: "Responsive" },
    ],
    url: "https://www.infraguideuae.com/",
    displayUrl: "infraguideuae.com",
    tone: P2,
    image: "/websites/infra-guide.png",
  },
];