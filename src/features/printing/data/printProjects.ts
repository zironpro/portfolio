export type PrintProject = {
  id: string;
  kind: string;
  image: string;
  finish: string;
  stock: string;
  tone: string;
  ratio?: string;
  specs: string[];
  description: string;
  industry?: string;
};

export const PRINT_PROJECTS: PrintProject[] = [
  {
    id: "p1",
    kind: "Large Format Outdoor Highway Billboard",
    image: "/printing/printing-1.jpeg",
    finish: "Anti-Glare UV Overlamination",
    stock: "550gsm High-Tensile Frontlit Vinyl",
    tone: "#D92D20",
    ratio: "4/3",
    specs: [
      "Vibrant UV-cured outdoor ink system (5-year fade guarantee)",
      "High-tensile wind-shear resistant reinforced substrate",
      "Precision heat-welded hems & heavy-duty steel eyelet grommets",
      "Long-range optical clarity optimized for highway speeds",
    ],
    description:
      "Engineered for high-impact expressway visibility across UAE thoroughfares. Fabricated with UV-stabilized inks and tear-resistant vinyl designed to endure extreme heat, sandstorms, and intense direct sunlight.",
  },
  {
    id: "p2",
    kind: "Corporate ID Badges & Custom Lanyards",
    image: "/printing/printing-2.jpeg",
    finish: "Dual-Sided Gloss Protective Shield",
    stock: "850 Micron PVC Composite & Satin Ribbon",
    tone: "#D92D20",
    ratio: "3/2",
    specs: [
      "High-definition dye-sublimation micro-text printing",
      "RFID / NFC chip & smart card compatibility",
      "Heavy-duty chrome lobster-claw swivel attachment",
      "Safety breakaway clasp on custom woven satin ribbon",
    ],
    description:
      "Complete corporate identification and access suite manufactured for enterprise security protocols, high-frequency card reader scans, and executive daily wear.",
  },
  {
    id: "p3",
    kind: "Executive Laser-Engraved Corporate Pens",
    image: "/printing/printing-3.jpeg",
    finish: "Fiber Laser Precision Engraving",
    stock: "Anodized Aluminum & Stainless Steel Core",
    tone: "#D92D20",
    ratio: "4/3",
    specs: [
      "Permanent sub-millimeter fiber laser etching",
      "Velvety soft-touch barrel coating with chrome accents",
      "Smooth-glide Swiss rollerball ink refill system",
      "Balanced ergonomic weight distribution",
    ],
    description:
      "Dual-tone executive writing instruments customized with permanent laser etching for new employee welcome packs, VIP board conferences, and premium client corporate gifting.",
  },
  {
    id: "p4",
    kind: "Die-Cut Adhesive Packaging Labels & Seals",
    image: "/printing/printing-4.jpeg",
    finish: "Contour Die-Cut & Matte UV Protective Coat",
    stock: "Waterproof Polypropylene Vinyl",
    tone: "#D92D20",
    ratio: "3/2",
    specs: [
      "Precision optical kiss-cut contour edges",
      "Waterproof, grease-proof & heat-resistant adhesive",
      "High-opacity rich red chevron micro-pattern background",
      "Supplied on easy-dispense rolls for high-speed application",
    ],
    description:
      "Custom-shaped product seal stickers and tamper-evident packaging closures designed for luxury retail merchandise boxes, delivery pouches, and e-commerce mailers.",
  },
  {
    id: "p5",
    kind: "Premium Matte Corporate Business Cards",
    image: "/printing/printing-5.jpeg",
    finish: "Velvet Soft-Touch & Spot Gloss Details",
    stock: "450gsm Heavyweight Silk Artboard",
    tone: "#D92D20",
    ratio: "3/2",
    specs: [
      "Heavyweight 450gsm cardstock with zero edge fraying",
      "Soft-touch velvet lamination on both faces",
      "Dual-tone crimson & ultra-white contrast geometry",
      "High-precision hydraulic guillotine square cuts",
    ],
    description:
      "Executive presentation cards engineered with substantial hand-feel and velvety tactile lamination, projecting immediate authority during executive networking.",
  },
  {
    id: "p6",
    kind: "Large Format Outdoor Highway Billboard",
    image: "/printing/printing-8.jpeg",
    finish: "Anti-Glare UV Overlamination",
    stock: "550gsm High-Tensile Frontlit Vinyl",
    tone: "#D92D20",
    ratio: "4/3",
    specs: [
      "Vibrant UV-cured outdoor ink system (5-year fade guarantee)",
      "High-tensile wind-shear resistant reinforced substrate",
      "Precision heat-welded hems & heavy-duty steel eyelet grommets",
      "Long-range optical clarity optimized for highway speeds",
    ],
    description:
      "Engineered for high-impact expressway visibility across UAE thoroughfares. Fabricated with UV-stabilized inks and tear-resistant vinyl designed to endure extreme heat, sandstorms, and intense direct sunlight.",
  },
  {
    id: "p7",
    kind: "Rounded-Corner Corporate Business Cards",
    image: "/printing/printing-7.jpeg",
    finish: "Silk Matte Lamination & Corner Radiusing",
    stock: "400gsm Premium Smooth Artboard",
    tone: "#00A3FF",
    ratio: "1/1",
    specs: [
      "6mm die-punched rounded corners (prevents dog-earing)",
      "Deep navy & vibrant electric cyan vector printing",
      "Multi-icon logistics service directory layout",
      "Double-sided scuff-resistant matte protective seal",
    ],
    description:
      "Manufactured for Maxline Global Logistics (Jebel Ali, Dubai). Features clean rounded corners, comprehensive logistics service iconography, and high-contrast dual-tone layout built for international trade networking.",
  },
  {
    id: "p8",
    kind: "Custom Branded Aluminum Sports Bottle",
    image: "/printing/printing.jpeg",
    finish: "Rotary Screen Print & Powder Coat",
    stock: "600ml Food-Grade Lightweight Aluminum",
    tone: "#D92D20",
    ratio: "3/2",
    specs: [
      "360° seamless rotary screen-printed branding",
      "Scratch-resistant powder-coated matte metallic finish",
      "Leakproof screw-on lid with anodized carabiner clip",
      "BPA-free food-safe protective internal lining",
    ],
    description:
      "Durable aluminum drinkware customized for corporate sports events, employee onboarding kits, and executive promotional giveaways.",
  },
];
