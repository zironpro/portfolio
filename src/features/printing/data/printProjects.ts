export type PrintProject = {
  id: string;
  industry?: string;
  kind: string;
  finish: string;
  stock: string;
  tone: string;
  ratio: string;
  specs: string[];
  description: string;
};

export const PRINT_PROJECTS: PrintProject[] = [
  {
    id: "p1",
    industry: "Hospitality",
    kind: "Foil-Stamped Tasting Menu",
    finish: "Hot Foil & Soft Touch",
    stock: "350gsm G.F Smith Colorplan",
    tone: "#B8452E",
    ratio: "4/5",
    specs: [
      "Gold metallic hot stamp",
      "Matte velvet lamination",
      "Hand-stitched spine",
    ],
    description:
      "Multi-course dining presentation crafted on heavyweight textured card with fingerprint-resistant velvet coating.",
  },
  {
    id: "p2",
    industry: "Café",
    kind: "Custom Coffee Bean Pouches",
    finish: "Matte Kraft & Degassing Valve",
    stock: "Biodegradable Tri-layer Barrier",
    tone: "#386B50",
    ratio: "1/1",
    specs: [
      "Eco-friendly water-based inks",
      "Resealable aroma zipper",
      "One-way degassing valve",
    ],
    description:
      "Retail coffee packaging line preserving peak roasted bean freshness with a raw organic tactile feel.",
  },
  {
    id: "p3",
    industry: "Retail",
    kind: "Luxury Rigid Unboxing Box",
    finish: "Embossed & Spot UV",
    stock: "1200gsm Greyboard wrapped in Wibalin",
    tone: "#1D1A20",
    ratio: "4/3",
    specs: [
      "Magnetic snap closure",
      "Debossed logo monogram",
      "Precision die-cut foam insert",
    ],
    description:
      "High-end jewelry and accessory presentation boxes engineered for structural weight and unboxing ceremony.",
  },
  {
    id: "p4",
    industry: "Real estate",
    kind: "Hardcover Architectural Monograph",
    finish: "Clothbound Casebound",
    stock: "170gsm Fedrigoni Tatami",
    tone: "#1F2A55",
    ratio: "4/5",
    specs: [
      "Buckram linen hardcover",
      "Blind deboss spine & face",
      "Lay-flat Swiss binding",
    ],
    description:
      "Architectural development prospectus for luxury penthouses with true-color photography reproduction.",
  },
  {
    id: "p5",
    industry: "Fashion",
    kind: "Garment Hangtags & Seal Labels",
    finish: "Letterpress & Blind Deboss",
    stock: "600gsm Cotton Lettra",
    tone: "#FF6A4D",
    ratio: "1/1",
    specs: [
      "Deep relief letterpress",
      "Waxed cotton eyelet cord",
      "Foil serialized number tags",
    ],
    description:
      "Signature tactile brand touchpoints attached to designer capsule collections.",
  },
  {
    id: "p6",
    industry: "Healthcare",
    kind: "Appointment Folders & Stationery",
    finish: "Scuff-Free Matte",
    stock: "300gsm FSC Certified Recycled",
    tone: "#7CF2C0",
    ratio: "4/3",
    specs: [
      "Business card slot slit",
      "Spot gloss clinic seal",
      "Soy-based pantone matching",
    ],
    description:
      "Executive presentation folders and intake stationery designed to establish immediate clinical authority.",
  },
];