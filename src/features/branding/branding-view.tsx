"use client";

/**
 * Ziron Pro — Branding page (route: /branding)
 * Card: hover smoothly scrolls through the brand guideline strip (GPU transform).
 * Click: opens a modal with the scrollable strip, project details, and direct PDF access.
 */

import React, {
  memo,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import Shell, {
  ArrowUpRight,
  CloseIcon,
  Filters,
  useSeen,
  useModal,
  waLink,
} from "../CategoryShell";

type Project = {
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

const PROJECTS: Project[] = [
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
    id: "b2",
    title: "Hot Wheel Motors",
    industry: "Automotive",
    kind: "Automotive Brand Identity & Applications",
    strip: "/branding/previews/hot-wheel-strip.jpg",
    pdf: "/branding/hot-wheel.pdf",
    pages: 40,
    description:
      "A bold automotive identity designed to communicate energy, movement, and reliability. The brand system extends across vehicle graphics, promotional materials, staff uniforms, certificates, and supporting brand assets to create a consistent visual presence across physical and digital touchpoints.",
    deliverables: [
      "Custom Logo & Visual Identity",
      "Vehicle Graphics & Fleet Branding",
      "Promotional Materials & Badges",
      "Staff Uniforms & Apparel Standards",
      "Certificates & Corporate Stationery",
      "Complete 40-Page Brand Guidelines",
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

type Props = { whatsappNumber?: string; backHref?: string };

/** Strip image with skeleton + error fallback. Shared by card and modal. */
const StripImg: React.FC<{
  src: string;
  alt: string;
  className: string;
  eager?: boolean;
}> = ({ src, alt, className, eager }) => {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Handle images already cached before React attached onLoad
  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) setState("ok");
  }, [src]);

  if (state === "error") {
    return <span className="zb-img-fallback">Preview unavailable</span>;
  }
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`${className} ${state === "ok" ? "is-ready" : ""}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onLoad={() => setState("ok")}
      onError={() => setState("error")}
    />
  );
};

const Card = memo(function Card({
  p,
  i,
  onOpen,
}: {
  p: Project;
  i: number;
  onOpen: (p: Project) => void;
}) {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      className={`zb-card zs-reveal ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`View ${p.title} brand guidelines`}
    >
      <span className="zb-shot">
        <span className="zb-badge">{p.pages} Pages</span>
        <StripImg
          src={p.strip}
          alt={`${p.title} brand guidelines preview`}
          className="zb-strip"
        />
        <span className="zb-view">
          View Guidelines <ArrowUpRight />
        </span>
      </span>
      <span className="zb-cap">
        <span className="zb-title-wrap">
          <span className="zb-ind">{p.title}</span>
          <span className="zb-ind-tag">{p.industry}</span>
        </span>
        <span className="zb-kind">{p.kind}</span>
      </span>
    </button>
  );
});

const BrandModal: React.FC<{
  p: Project;
  whatsappNumber?: string;
  onClose: () => void;
}> = ({ p, whatsappNumber = "971542588446", onClose }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useModal(onClose);
  useEffect(() => closeRef.current?.focus(), []);

  const wa = waLink(
    whatsappNumber,
    `Hi Ziron Pro, I loved the ${p.title} branding and would like a brand identity project.`,
  );

  return (
    <div
      className="zs-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} Brand Guidelines`}
      onClick={onClose}
    >
      <div className="zb-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="zb-modal-head">
          <div className="zb-modal-title-group">
            <span className="zb-modal-tag">{p.industry}</span>
            <h2 className="zb-modal-title">{p.title}</h2>
          </div>
          <div className="zb-modal-actions">
            {p.pdf && (
              <a
                href={p.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="zb-open-pdf-btn"
              >
                <span>Open PDF</span>
                <ArrowUpRight />
              </a>
            )}
            <button
              ref={closeRef}
              type="button"
              className="zs-close"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="zb-modal-body">
          <div className="zb-viewer-col">
            <div
              className="zb-scroll-viewer"
              tabIndex={0}
              aria-label={`${p.title} brand guidelines, scrollable`}
            >
              {/* Cached from the card, so this opens and renders instantly */}
              <StripImg
                src={p.strip}
                alt={`${p.title} brand pages`}
                className="zb-full-strip"
                eager
              />
            </div>
            <div className="zb-scroll-hint" aria-hidden="true">
              <span>{p.pages} Pages · Scroll to inspect</span>
            </div>
          </div>

          <div className="zb-details-col">
            <div className="zb-details-section">
              <span className="zb-section-label">Brand Overview</span>
              <p className="zb-details-desc">{p.description}</p>
            </div>

            <div className="zb-details-section">
              <span className="zb-section-label">Scope & Assets Included</span>
              <div className="zb-pills">
                {p.deliverables.map((d) => (
                  <span key={d} className="zb-pill">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="zb-details-section">
              <span className="zb-section-label">Project Specifications</span>
              <div className="zb-specs-grid">
                <div className="zb-spec-card">
                  <span className="zb-spec-val">{p.pages}</span>
                  <span className="zb-spec-lbl">Guideline Pages</span>
                </div>
                <div className="zb-spec-card">
                  <span className="zb-spec-val">Vector</span>
                  <span className="zb-spec-lbl">Master Quality</span>
                </div>
                <div className="zb-spec-card">
                  <span className="zb-spec-val">Full Book</span>
                  <span className="zb-spec-lbl">Guidelines</span>
                </div>
              </div>
            </div>

            <div className="zb-cta-wrap">
              {p.pdf && (
                <a
                  href={p.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zb-pdf-btn"
                >
                  <span>Download Full PDF Guidelines ({p.pages} Pages)</span>
                  <ArrowUpRight />
                </a>
              )}
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="zb-wa-btn"
              >
                <span>Request Brand Identity on WhatsApp</span>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BrandingPage({ whatsappNumber, backHref }: Props) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);

  const industries = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.industry)))],
    [],
  );
  const shown = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.industry === filter),
    [filter],
  );
  const close = useCallback(() => setOpen(null), []);
  const openProject = useCallback((p: Project) => setOpen(p), []);

  return (
    <Shell
      words={["Brands", "people", "remember."]}
      sub="Logos and identities. Tap any to inspect the brand guidelines."
      waText="Hi Ziron Pro, I'd like a brand identity."
      ctaTitle="Let’s name your look."
      ctaLabel="Chat on WhatsApp"
      label="Branding projects"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={
        open && (
          <BrandModal
            p={open}
            whatsappNumber={whatsappNumber}
            onClose={close}
          />
        )
      }
    >
      <style>{CSS}</style>
      <Filters
        items={industries}
        value={filter}
        onChange={setFilter}
        label="Filter by industry"
      />
      <div className="zb-grid">
        {shown.map((p, i) => (
          <Card key={filter + p.id} p={p} i={i} onOpen={openProject} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zb-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(16px, 1.8vw, 28px);
}
@media (max-width: 1200px) {
  .zb-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 860px) {
  .zb-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 580px) {
  .zb-grid { grid-template-columns: 1fr; }
}

.zb-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:14px}

/* Skeleton shimmer shows until the strip loads */
.zb-shot{
  position:relative; display:block; aspect-ratio:16/11; overflow:hidden;
  container-type:size;
  background:linear-gradient(100deg,#f1f2f6 30%,#fafafc 50%,#f1f2f6 70%) 0 0/200% 100%;
  animation:zbShimmer 1.4s linear infinite;
  border:1.5px solid var(--line); border-radius:14px;
  box-shadow:0 4px 14px rgba(13,20,32,.04);
  transition:transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .4s;
}
@keyframes zbShimmer{to{background-position:-200% 0}}
.zb-card:hover .zb-shot, .zb-card:focus-visible .zb-shot{
  transform:translateY(-6px); border-color:var(--purple);
  box-shadow:0 18px 36px -8px rgba(77,17,168,.25);
}

/* Full-height strip scrolled with transform (GPU), not object-position (repaint).
   min() guards against strips shorter than the frame. */
.zb-strip{
  position:absolute; top:0; left:0; width:100%; height:auto; display:block;
  opacity:0; transform:translate3d(0,0,0);
  transition:opacity .4s ease, transform 3s cubic-bezier(.25,0,.2,1);
  user-select:none; -webkit-user-drag:none;
}
.zb-strip.is-ready{opacity:1}
@supports (height:1cqh){
  .zb-card:hover .zb-strip, .zb-card:focus-visible .zb-strip{
    transform:translate3d(0, min(0px, calc(100cqh - 100%)), 0);
    transition:opacity .4s ease, transform 12s cubic-bezier(.25,0,.2,1);
    will-change:transform;
  }
}
@supports not (height:1cqh){
  .zb-card:hover .zb-strip, .zb-card:focus-visible .zb-strip{
    transform:translateY(-75%);
    transition:transform 12s cubic-bezier(.25,0,.2,1);
  }
}

.zb-img-fallback{
  position:absolute; inset:0; display:grid; place-items:center;
  font-size:.8rem; font-weight:600; opacity:.5;
}

.zb-badge{
  position:absolute; top:12px; left:12px; z-index:2;
  background:rgba(13,20,32,.85); backdrop-filter:blur(6px); color:#fff;
  font-size:.72rem; font-weight:700; padding:4px 10px; border-radius:999px;
  border:1px solid rgba(255,255,255,.15);
}
.zb-view{
  position:absolute; right:12px; bottom:12px; z-index:2;
  display:inline-flex; align-items:center; gap:6px;
  background:var(--black); color:#fff; font-weight:600; font-size:.85rem;
  padding:8px 14px; border-radius:999px; opacity:0; transform:translateY(8px);
  transition:opacity .3s, transform .3s;
}
.zb-card:hover .zb-view, .zb-card:focus-visible .zb-view{opacity:1; transform:none}
@media (hover:none){ .zb-view{opacity:1; transform:none} }

.zb-cap{display:flex; justify-content:space-between; align-items:flex-start; gap:12px}
.zb-title-wrap{display:flex; flex-direction:column; gap:3px}
.zb-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em; color:var(--black); line-height:1.2}
.zb-ind-tag{font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:var(--purple)}
.zb-kind{font-size:.84rem; opacity:.65; text-align:right}

/* Modal */
.zb-modal-sheet{
  width:min(1140px, 96vw); max-height:min(90vh, 880px);
  background:#fff; border-radius:24px; display:flex; flex-direction:column;
  overflow:hidden; box-shadow:0 24px 64px rgba(13,20,32,.35);
  animation:zwPop .35s cubic-bezier(.2,.8,.2,1);
}
@keyframes zwPop{from{transform:translateY(24px) scale(.98); opacity:0}}

.zb-modal-head{
  flex:none; display:flex; justify-content:space-between; align-items:center;
  padding:16px 24px; border-bottom:1.5px solid var(--line); gap:14px;
}
.zb-modal-title-group{display:flex; flex-direction:column; gap:2px}
.zb-modal-tag{font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--purple)}
.zb-modal-title{margin:0; font-size:clamp(1.2rem,2vw,1.65rem); font-weight:800; letter-spacing:-.03em; color:var(--black)}

.zb-modal-actions{display:flex; align-items:center; gap:10px}
.zb-open-pdf-btn{
  display:inline-flex; align-items:center; gap:6px; background:var(--tint);
  color:var(--black); text-decoration:none; font-size:.82rem; font-weight:700;
  padding:7px 14px; border-radius:999px; transition:background .2s, color .2s, transform .2s;
}
.zb-open-pdf-btn:hover{background:var(--purple); color:#fff; transform:translateY(-1px)}

.zb-modal-body{flex:1; min-height:0; display:grid; grid-template-columns:1.35fr 1fr; overflow:hidden}
@media (max-width:900px){
  .zb-modal-sheet{max-height:92vh}
  .zb-modal-body{grid-template-columns:1fr; overflow-y:auto}
}

.zb-viewer-col{
  position:relative; display:flex; flex-direction:column; background:#EAEBF0;
  border-right:1.5px solid var(--line); min-height:0; height:100%;
}
@media (max-width:900px){
  .zb-viewer-col{height:460px; border-right:none; border-bottom:1.5px solid var(--line)}
}

.zb-scroll-viewer{
  flex:1; min-height:0; overflow-y:auto; overflow-x:hidden;
  overscroll-behavior:contain; -webkit-overflow-scrolling:touch;
  scroll-behavior:smooth; scrollbar-width:thin;
  scrollbar-color:rgba(13,20,32,.25) transparent;
}
.zb-scroll-viewer::-webkit-scrollbar{width:7px}
.zb-scroll-viewer::-webkit-scrollbar-thumb{background:rgba(13,20,32,.25); border-radius:999px}
.zb-full-strip{display:block; width:100%; height:auto; opacity:0; transition:opacity .3s}
.zb-full-strip.is-ready{opacity:1}

.zb-scroll-hint{
  position:absolute; bottom:12px; left:50%; transform:translateX(-50%);
  background:rgba(13,20,32,.8); backdrop-filter:blur(4px); color:#fff;
  font-size:.72rem; font-weight:600; padding:5px 12px; border-radius:999px;
  pointer-events:none; z-index:3;
}

.zb-details-col{
  display:flex; flex-direction:column; gap:20px;
  padding:clamp(18px,2.4vw,28px); overflow-y:auto; scrollbar-width:thin;
}
.zb-details-section{display:flex; flex-direction:column; gap:8px}
.zb-section-label{font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; opacity:.55}
.zb-details-desc{margin:0; font-size:.95rem; line-height:1.6; color:rgba(13,20,32,.85)}

.zb-pills{display:flex; flex-wrap:wrap; gap:8px}
.zb-pill{font-size:.78rem; font-weight:600; padding:6px 12px; border-radius:8px; background:var(--tint); color:var(--black)}

.zb-specs-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:8px}
.zb-spec-card{background:var(--tint); padding:10px 12px; border-radius:10px; display:flex; flex-direction:column; gap:2px}
.zb-spec-val{font-size:1.15rem; font-weight:800; color:var(--purple); letter-spacing:-.02em}
.zb-spec-lbl{font-size:.72rem; opacity:.65; line-height:1.2}

.zb-cta-wrap{margin-top:auto; padding-top:14px; display:flex; flex-direction:column; gap:8px}

.zb-pdf-btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  background:var(--tint); color:var(--black); text-decoration:none; font-weight:700;
  font-size:.88rem; padding:12px 20px; border-radius:999px;
  transition:background .2s, color .2s, transform .2s;
  border:1.5px solid var(--line);
}
.zb-pdf-btn:hover{background:var(--black); color:#fff; transform:translateY(-2px); border-color:var(--black)}

.zb-wa-btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  background:var(--purple); color:#fff; text-decoration:none; font-weight:700;
  font-size:.95rem; padding:14px 22px; border-radius:999px;
  transition:background .2s, transform .2s, box-shadow .2s;
  box-shadow:0 8px 20px -4px rgba(77,17,168,.35);
}
.zb-wa-btn:hover{background:var(--black); transform:translateY(-2px); box-shadow:0 12px 24px -4px rgba(13,20,32,.35)}

@media (prefers-reduced-motion: reduce){
  .zb-shot{animation:none}
  .zb-shot, .zb-strip, .zb-wa-btn, .zb-open-pdf-btn, .zb-pdf-btn{transition:none}
  .zb-modal-sheet{animation:none}
  .zb-scroll-viewer{scroll-behavior:auto}
}
`;
