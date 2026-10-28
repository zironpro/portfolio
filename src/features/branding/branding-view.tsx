"use client";

/**
 * Ziron Pro — Branding page (route: /branding)
 * Card: Hover smoothly scrolls through the brand guidelines pages.
 * Click: Opens brand presentation with interactive scrollable PDF and case details.
 */

import React, {
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
  pdf: string;
  stripImage: string;
  coverImage: string;
  pages: number;
  description: string;
  deliverables: string[];
  tone: string;
};

const P = "#4D11A8",
  P2 = "#8F2CF4",
  K = "#0D1420";

const PROJECTS: Project[] = [
  {
    id: "b1",
    title: "Biznorx Realty",
    industry: "Real estate",
    kind: "Corporate Identity & Guidelines",
    pdf: "/branding/biznorx.pdf",
    stripImage: "/branding/previews/biznorx-strip.jpg",
    coverImage: "/branding/previews/biznorx-cover.jpg",
    pages: 32,
    description:
      "A sophisticated, architectural visual identity for a premier real estate firm. Features precision geometric logo marks, deep purple and navy brand palette, stationery systems, and comprehensive brand usage guidelines.",
    deliverables: [
      "Primary & Secondary Logo Marks",
      "Color Hierarchy & Swatches",
      "Corporate Typography",
      "Stationery & Business Cards",
      "Signage & Billboard System",
      "Complete 32-Page Brand Book",
    ],
    tone: P,
  },
  {
    id: "b2",
    title: "Hot Wheel Driving School",
    industry: "Automotive & Education",
    kind: "Visual Identity & Fleet Livery",
    pdf: "/branding/hot-wheel.pdf",
    stripImage: "/branding/previews/hot-wheel-strip.jpg",
    coverImage: "/branding/previews/hot-wheel-cover.jpg",
    pages: 40,
    description:
      "High-energy, modern automotive educational brand identity built on trust and dynamic motion. Features custom vehicle fleet livery, student learning collaterals, instructor apparel, and complete digital brand standards.",
    deliverables: [
      "Dynamic Motion Logo System",
      "Vehicle Fleet & Livery Design",
      "Student Materials & Badges",
      "Staff & Instructor Uniforms",
      "Certificates & Stationery",
      "Complete 40-Page Brand Book",
    ],
    tone: K,
  },
  {
    id: "b3",
    title: "Sphere IT Solutions",
    industry: "Technology & SaaS",
    kind: "Tech Brand System & Guidelines",
    pdf: "/branding/sphere-it.pdf",
    stripImage: "/branding/previews/sphere-it-strip.jpg",
    coverImage: "/branding/previews/sphere-it-cover.jpg",
    pages: 19,
    description:
      "A forward-thinking technology brand identity embodying digital transformation and data intelligence. Includes bespoke tech iconography, dark-mode color palettes, pitch decks, and digital UI guidelines.",
    deliverables: [
      "Tech Iconography & Symbol",
      "Digital Product Color System",
      "Investor Pitch Deck Template",
      "Iconography & Data Graphics",
      "Office Signage & Swag",
      "Complete 19-Page Brand Book",
    ],
    tone: P2,
  },
];

type Props = { whatsappNumber?: string; backHref?: string };

const Card: React.FC<{
  p: Project;
  i: number;
  onOpen: (p: Project) => void;
}> = ({ p, i, onOpen }) => {
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
        <img
          src={p.stripImage}
          alt={`${p.title} Brand Guidelines`}
          loading="lazy"
        />
        <span className="zb-badge">{p.pages} Pages PDF</span>
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
};

const BrandModal: React.FC<{
  p: Project;
  whatsappNumber?: string;
  onClose: () => void;
}> = ({ p, whatsappNumber = "910000000000", onClose }) => {
  const [viewMode, setViewMode] = useState<"pdf" | "scroll">("pdf");
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
        {/* Top bar */}
        <div className="zb-modal-head">
          <div className="zb-modal-title-group">
            <span className="zb-modal-tag">{p.industry}</span>
            <h2 className="zb-modal-title">{p.title}</h2>
          </div>

          <div className="zb-modal-actions">
            <div
              className="zb-view-toggle"
              role="group"
              aria-label="Viewer format"
            >
              <button
                type="button"
                className={viewMode === "pdf" ? "on" : ""}
                onClick={() => setViewMode("pdf")}
              >
                PDF View
              </button>
              <button
                type="button"
                className={viewMode === "scroll" ? "on" : ""}
                onClick={() => setViewMode("scroll")}
              >
                Page Scroll
              </button>
            </div>

            <a
              href={p.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="zb-open-pdf-btn"
              title="Open full PDF in new tab"
            >
              <span>Open PDF</span>
              <ArrowUpRight />
            </a>

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

        {/* Body */}
        <div className="zb-modal-body">
          {/* Left: PDF or Page Scroll Viewer */}
          <div className="zb-viewer-col">
            {viewMode === "pdf" ? (
              <div className="zb-iframe-wrap">
                <iframe
                  src={`${p.pdf}#toolbar=0&view=FitH`}
                  className="zb-pdf-frame"
                  title={`${p.title} Brand Guidelines PDF`}
                />
              </div>
            ) : (
              <div
                className="zb-scroll-viewer"
                tabIndex={0}
                aria-label={`${p.title} brand presentation scroll`}
              >
                <img
                  src={p.stripImage}
                  alt={`${p.title} brand pages`}
                  className="zb-full-strip"
                />
              </div>
            )}
            <div className="zb-scroll-hint" aria-hidden="true">
              <span>{p.pages} Pages Document · Scroll to inspect</span>
            </div>
          </div>

          {/* Right: Details column */}
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
              <span className="zb-section-label">Document Specifications</span>
              <div className="zb-specs-grid">
                <div className="zb-spec-card">
                  <span className="zb-spec-val">{p.pages}</span>
                  <span className="zb-spec-lbl">Document Pages</span>
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

            {/* CTAs */}
            <div className="zb-cta-wrap">
              <a
                href={p.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="zb-pdf-btn"
              >
                <span>View Full PDF Document</span>
                <ArrowUpRight />
              </a>

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
          <Card key={filter + p.id} p={p} i={i} onOpen={setOpen} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zb-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(16px,2vw,32px)}
@media (max-width:1000px){ .zb-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:620px){ .zb-grid{grid-template-columns:1fr} }

.zb-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:14px}
.zb-shot{
  position:relative; display:block; aspect-ratio:16/11; overflow:hidden;
  background:#fff; border:1.5px solid var(--line); border-radius:14px;
  box-shadow:0 4px 14px rgba(13,20,32,.04);
  transition:transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .4s;
}
.zb-card:hover .zb-shot, .zb-card:focus-visible .zb-shot{
  transform:translateY(-6px); border-color:var(--purple);
  box-shadow:0 18px 36px -8px rgba(77,17,168,.25);
}

.zb-shot img{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  object-position:50% 0%;
  transition:object-position 3.5s cubic-bezier(.25, 0, .2, 1);
  will-change:object-position;
}
.zb-card:hover .zb-shot img, .zb-card:focus-visible .zb-shot img{
  object-position:50% 100%;
  transition:object-position 12s cubic-bezier(.25, 0, .2, 1);
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
.zb-ind{font-weight:800; font-size:1.2rem; letter-spacing:-.02em; color:var(--black)}
.zb-ind-tag{font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:var(--purple)}
.zb-kind{font-size:.86rem; opacity:.65; text-align:right}

/* Modal details */
.zb-modal-sheet{
  width:min(1120px, 96vw);
  max-height:min(90vh, 880px);
  background:#FFFFFF;
  border-radius:24px;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  box-shadow:0 24px 64px rgba(13,20,32,.35);
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
.zb-view-toggle{display:flex; background:var(--tint); border-radius:999px; padding:3px}
.zb-view-toggle button{border:0; background:transparent; font-weight:600; font-size:.82rem; padding:6px 12px; border-radius:999px; cursor:pointer; color:var(--black); transition:background .2s, color .2s}
.zb-view-toggle button.on{background:var(--black); color:#fff}

.zb-open-pdf-btn{
  display:inline-flex; align-items:center; gap:6px; background:var(--tint);
  color:var(--black); text-decoration:none; font-size:.82rem; font-weight:600;
  padding:7px 14px; border-radius:999px; transition:background .2s, color .2s;
}
.zb-open-pdf-btn:hover{background:var(--purple); color:#fff}

.zb-modal-body{
  flex:1; min-height:0; display:grid; grid-template-columns:1.35fr 1fr; overflow:hidden;
}
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

.zb-iframe-wrap{flex:1; min-height:0; width:100%; height:100%}
.zb-pdf-frame{width:100%; height:100%; border:0; display:block}

.zb-scroll-viewer{
  flex:1; min-height:0; overflow-y:auto; overflow-x:hidden;
  scroll-behavior:smooth; padding:0; scrollbar-width:thin;
  scrollbar-color:rgba(13,20,32,.25) transparent;
}
.zb-scroll-viewer::-webkit-scrollbar{width:7px}
.zb-scroll-viewer::-webkit-scrollbar-thumb{background:rgba(13,20,32,.25); border-radius:999px}
.zb-full-strip{display:block; width:100%; height:auto}

.zb-scroll-hint{
  position:absolute; bottom:12px; left:50%; transform:translateX(-50%);
  background:rgba(13,20,32,.8); backdrop-filter:blur(4px); color:#fff;
  font-size:.72rem; font-weight:600; padding:5px 12px; border-radius:999px;
  pointer-events:none; opacity:.9; z-index:3;
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

.zb-specs-grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:8px}
.zb-spec-card{background:var(--tint); padding:10px 12px; border-radius:10px; display:flex; flex-direction:column; gap:2px}
.zb-spec-val{font-size:1.15rem; font-weight:800; color:var(--purple); letter-spacing:-.02em}
.zb-spec-lbl{font-size:.72rem; opacity:.65; line-height:1.2}

.zb-cta-wrap{margin-top:auto; padding-top:14px; display:flex; flex-direction:column; gap:8px}
.zb-pdf-btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  background:var(--black); color:#fff; text-decoration:none; font-weight:700;
  font-size:.92rem; padding:12px 20px; border-radius:999px;
  transition:background .2s, transform .2s;
}
.zb-pdf-btn:hover{background:var(--purple); transform:translateY(-2px)}

.zb-wa-btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  background:var(--purple); color:#fff; text-decoration:none; font-weight:700;
  font-size:.95rem; padding:14px 22px; border-radius:999px;
  transition:background .2s, transform .2s, box-shadow .2s;
  box-shadow:0 8px 20px -4px rgba(77,17,168,.35);
}
.zb-wa-btn:hover{background:var(--black); transform:translateY(-2px); box-shadow:0 12px 24px -4px rgba(13,20,32,.35)}

@media (prefers-reduced-motion: reduce){
  .zb-shot img, .zb-shot, .zb-wa-btn{transition:none}
  .zb-modal-sheet{animation:none}
}
`;
