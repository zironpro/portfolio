"use client";

/**
 * Ziron Pro — Websites page (route: /website)
 * Card: Hover smoothly scrolls the webpage screenshot.
 * Click: Opens project details with full scrollable screenshot and live link.
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
} from "../CategoryShell";

type Project = {
  id: string;
  title: string;
  industry: string;
  kind: string;
  description: string;
  url: string;
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

const PROJECTS: Project[] = [
  {
    id: "w1",
    title: "Biznorx Realty",
    industry: "Real estate",
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
    url: "https://biznorxrealty.com",
    displayUrl: "biznorxrealty.com",
    tone: P,
    image: "/websites/biznorx-realty.jpg",
  },
  {
    id: "w2",
    title: "Vila Ventures",
    industry: "Real estate",
    kind: "Luxury Estates & Villas",
    description:
      "Editorial-style digital experience engineered to showcase luxury vacation villas and high-yield estate investments with high-resolution imagery and direct inquiry booking.",
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
    url: "https://vilaventures.com",
    displayUrl: "vilaventures.com",
    tone: P2,
    image: "/websites/vila-ventures.jpg",
  },
  {
    id: "w3",
    title: "Delta Equipment",
    industry: "Retail & Equipment",
    kind: "Machinery Catalogue",
    description:
      "Robust commercial product catalogue with detailed specification sheets, request-a-quote flows, and instant part lookup systems for commercial contractors.",
    deliverables: [
      "Product Catalogue",
      "Instant RFQ Flow",
      "Technical Specs Viewer",
      "SEO Architecture",
    ],
    metrics: [
      { label: "Catalog Items", value: "1,200+" },
      { label: "Quote Speed", value: "Instant" },
      { label: "Organic Search", value: "+62%" },
    ],
    url: "https://deltaequipment.com",
    displayUrl: "deltaequipment.com",
    tone: K,
    image: "/websites/delta-equipment.jpg",
  },
  {
    id: "w4",
    title: "Energex",
    industry: "Energy & Power",
    kind: "Clean Solar Solutions",
    description:
      "Modern clean energy website with an intuitive solar savings calculator, client success stories, and seamless residential and commercial appointment booking.",
    deliverables: [
      "Solar Calculator",
      "Consultation Booking",
      "Case Study Hub",
      "Custom Animation",
    ],
    metrics: [
      { label: "Conversion Rate", value: "4.8%" },
      { label: "Install Queries", value: "+55%" },
      { label: "Page Speed", value: "97/100" },
    ],
    url: "https://energex.com",
    displayUrl: "energex.com",
    tone: P3,
    image: "/websites/energex.jpg",
  },
  {
    id: "w5",
    title: "100 Power",
    industry: "Energy & Power",
    kind: "Industrial Power Systems",
    description:
      "Industrial corporate presence communicating engineering precision, large-scale battery storage capabilities, and turnkey power infrastructure for industrial complexes.",
    deliverables: [
      "Corporate Website",
      "Solutions Architecture",
      "Client Portal Entry",
      "Compliance Standards",
    ],
    metrics: [
      { label: "B2B Leads", value: "+70%" },
      { label: "Avg Session", value: "3m 40s" },
      { label: "Mobile Score", value: "99/100" },
    ],
    url: "https://100power.com",
    displayUrl: "100power.com",
    tone: P,
    image: "/websites/100-power.jpg",
  },
  {
    id: "w6",
    title: "Maxline",
    industry: "Logistics",
    kind: "Freight & Supply Chain",
    description:
      "Dynamic logistics platform featuring fleet capability matrix, streamlined rate calculation requests, and end-to-end supply chain transparency.",
    deliverables: [
      "Fleet Showcase",
      "Rate Estimate Form",
      "Route Capabilities",
      "Fast Quotations",
    ],
    metrics: [
      { label: "Quote Inquiries", value: "+40%" },
      { label: "Response Time", value: "< 2hr" },
      { label: "User Trust", value: "99.4%" },
    ],
    url: "https://maxline.com",
    displayUrl: "maxline.com",
    tone: K,
    image: "/websites/maxline.jpg",
  },
  {
    id: "w7",
    title: "Qordx",
    industry: "Technology",
    kind: "Digital Platform & SaaS",
    description:
      "Sleek SaaS product landing page with dark-mode accents, interactive feature highlights, API documentation preview, and friction-free user onboarding.",
    deliverables: [
      "SaaS Landing Page",
      "Interactive Features",
      "Pricing Matrix",
      "User Onboarding",
    ],
    metrics: [
      { label: "Signup Rate", value: "+38%" },
      { label: "Page Load", value: "0.8s" },
      { label: "Product Demos", value: "2.4x" },
    ],
    url: "https://qordx.com",
    displayUrl: "qordx.com",
    tone: P2,
    image: "/websites/qordx.jpg",
  },
  {
    id: "w8",
    title: "Qordx",
    industry: "Technology",
    kind: "Digital Platform & SaaS",
    description:
      "Sleek SaaS product landing page with dark-mode accents, interactive feature highlights, API documentation preview, and friction-free user onboarding.",
    deliverables: [
      "SaaS Landing Page",
      "Interactive Features",
      "Pricing Matrix",
      "User Onboarding",
    ],
    metrics: [
      { label: "Signup Rate", value: "+38%" },
      { label: "Page Load", value: "0.8s" },
      { label: "Product Demos", value: "2.4x" },
    ],
    url: "https://qordx.com",
    displayUrl: "qordx.com",
    tone: P2,
    image: "/websites/hot-wheels.png",
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
      className={`zw-card zs-reveal ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`View ${p.title} details`}
    >
      <span className="zw-shot">
        <img src={p.image} alt={p.title} loading="lazy" />
        <span className="zw-view">
          View details <ArrowUpRight />
        </span>
      </span>
      <span className="zw-cap">
        <span className="zw-ind">{p.title}</span>
        <span className="zw-kind">{p.kind}</span>
      </span>
    </button>
  );
};

const DetailsModal: React.FC<{ p: Project; onClose: () => void }> = ({
  p,
  onClose,
}) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useModal(onClose);
  useEffect(() => closeRef.current?.focus(), []);

  return (
    <div
      className="zs-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} website details`}
      onClick={onClose}
    >
      <div className="zw-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div className="zw-modal-head">
          <div className="zw-modal-title-group">
            <span className="zw-modal-tag">{p.industry}</span>
            <h2 className="zw-modal-title">{p.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="zs-close"
            onClick={onClose}
            aria-label="Close details"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content Body: Left is scrollable screenshot mockup, Right is details */}
        <div className="zw-modal-body">
          {/* Screenshot mockup with browser bar */}
          <div className="zw-browser-wrap">
            <div className="zw-browser-bar">
              <div className="zw-browser-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="zw-browser-url"
                title="Open live site in new tab"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span>{p.displayUrl || p.url.replace(/^https?:\/\//, "")}</span>
                <ArrowUpRight />
              </a>
            </div>

            <div
              className="zw-browser-scroll"
              tabIndex={0}
              aria-label={`${p.title} website design screenshot, scrollable`}
            >
              <img
                src={p.image}
                alt={`${p.title} full page design`}
                className="zw-full-img"
              />
            </div>
            <div className="zw-scroll-hint" aria-hidden="true">
              <span>Scroll to explore full design</span>
            </div>
          </div>

          {/* Details column */}
          <div className="zw-details-col">
            <div className="zw-details-section">
              <span className="zw-section-label">Overview</span>
              <p className="zw-details-desc">{p.description}</p>
            </div>

            {p.deliverables && (
              <div className="zw-details-section">
                <span className="zw-section-label">Scope & Features</span>
                <div className="zw-pills">
                  {p.deliverables.map((d) => (
                    <span key={d} className="zw-pill">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {p.metrics && (
              <div className="zw-details-section">
                <span className="zw-section-label">Key Highlights</span>
                <div className="zw-metrics-grid">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="zw-metric-card">
                      <span className="zw-metric-val">{m.value}</span>
                      <span className="zw-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live website link CTA */}
            <div className="zw-cta-wrap">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="zw-live-btn"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight />
              </a>
              <span className="zw-cta-note">
                Live URL: <b>{p.displayUrl || p.url}</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WebsitesPage({ whatsappNumber, backHref }: Props) {
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
      words={["Websites", "that", "work", "for", "you."]}
      sub="High-conversion digital experiences. Tap any to view details."
      waText="Hi Ziron Pro, I'd like a website."
      ctaTitle="Let’s build yours."
      ctaLabel="Chat on WhatsApp"
      label="Website projects"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={open && <DetailsModal p={open} onClose={close} />}
    >
      <style>{CSS}</style>
      <Filters
        items={industries}
        value={filter}
        onChange={setFilter}
        label="Filter by industry"
      />
      <div className="zw-grid">
        {shown.map((p, i) => (
          <Card key={filter + p.id} p={p} i={i} onOpen={setOpen} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zw-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zw-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zw-grid{grid-template-columns:1fr} }

.zw-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px}
.zw-shot{
  position:relative; display:block; aspect-ratio:4/3; overflow:hidden;
  background:#fff; border:1.5px solid var(--line); border-radius:12px;
  box-shadow:0 2px 8px rgba(13,20,32,.04);
  transition:transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .4s;
}
.zw-card:hover .zw-shot, .zw-card:focus-visible .zw-shot{
  transform:translateY(-6px); border-color:var(--purple);
  box-shadow:0 16px 32px -8px rgba(77,17,168,.25);
}
.zw-shot img{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  object-position:50% 0%;
  transition:object-position 2s cubic-bezier(.35, 0, .2, 1);
  will-change:object-position;
}
.zw-card:hover .zw-shot img, .zw-card:focus-visible .zw-shot img{
  object-position:50% 100%;
  transition:object-position 4.2s cubic-bezier(.35, 0, .2, 1);
}
.zw-view{
  position:absolute; right:12px; bottom:12px; display:inline-flex; align-items:center; gap:6px;
  background:var(--black); color:#fff; font-weight:600; font-size:.85rem; padding:8px 14px;
  border-radius:999px; opacity:0; transform:translateY(8px);
  transition:opacity .3s, transform .3s;
}
.zw-card:hover .zw-view, .zw-card:focus-visible .zw-view{opacity:1; transform:none}
@media (hover:none){ .zw-view{opacity:1; transform:none} }
.zw-cap{display:flex; justify-content:space-between; align-items:baseline; gap:12px}
.zw-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zw-kind{font-size:.88rem; opacity:.65}

/* Details Modal Sheet */
.zw-modal-sheet{
  width:min(1080px, 96vw);
  max-height:min(90vh, 860px);
  background:#FFFFFF;
  border-radius:24px;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  box-shadow:0 24px 64px rgba(13,20,32,.35);
  animation:zwPop .35s cubic-bezier(.2,.8,.2,1);
}
@keyframes zwPop{from{transform:translateY(24px) scale(.98); opacity:0}}

.zw-modal-head{
  flex:none;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:18px 24px;
  border-bottom:1.5px solid var(--line);
}
.zw-modal-title-group{display:flex; flex-direction:column; gap:4px}
.zw-modal-tag{
  font-size:.78rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.06em;
  color:var(--purple);
}
.zw-modal-title{
  margin:0;
  font-size:clamp(1.25rem,2.2vw,1.75rem);
  font-weight:800;
  letter-spacing:-.03em;
  color:var(--black);
}

.zw-modal-body{
  flex:1;
  min-height:0;
  display:grid;
  grid-template-columns:1.25fr 1fr;
  overflow:hidden;
}
@media (max-width:880px){
  .zw-modal-sheet{max-height:92vh}
  .zw-modal-body{
    grid-template-columns:1fr;
    overflow-y:auto;
  }
}

/* Browser Mockup Column */
.zw-browser-wrap{
  position:relative;
  display:flex;
  flex-direction:column;
  background:#F5F6FA;
  border-right:1.5px solid var(--line);
  min-height:0;
  height:100%;
}
@media (max-width:880px){
  .zw-browser-wrap{
    height:400px;
    border-right:none;
    border-bottom:1.5px solid var(--line);
  }
}
.zw-browser-bar{
  flex:none;
  height:44px;
  background:#fff;
  border-bottom:1.5px solid var(--line);
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 16px;
  gap:12px;
}
.zw-browser-dots{display:flex; gap:6px}
.zw-browser-dots span{
  width:9px; height:9px; border-radius:50%; background:rgba(13,20,32,.18);
}
.zw-browser-dots span:nth-child(1){background:#FF5F56}
.zw-browser-dots span:nth-child(2){background:#FFBD2E}
.zw-browser-dots span:nth-child(3){background:#27C93F}

.zw-browser-url{
  display:inline-flex;
  align-items:center;
  gap:6px;
  background:var(--tint);
  color:var(--black);
  text-decoration:none;
  font-size:.78rem;
  font-weight:600;
  padding:5px 12px;
  border-radius:999px;
  max-width:280px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  transition:background .2s, color .2s;
}
.zw-browser-url:hover{
  background:var(--purple);
  color:#fff;
}

.zw-browser-scroll{
  flex:1;
  min-height:0;
  overflow-y:auto;
  overflow-x:hidden;
  scroll-behavior:smooth;
  padding:0;
  scrollbar-width:thin;
  scrollbar-color:rgba(13,20,32,.25) transparent;
}
.zw-browser-scroll::-webkit-scrollbar{width:7px}
.zw-browser-scroll::-webkit-scrollbar-thumb{background:rgba(13,20,32,.25); border-radius:999px}
.zw-full-img{
  display:block;
  width:100%;
  height:auto;
}

.zw-scroll-hint{
  position:absolute;
  bottom:12px;
  left:50%;
  transform:translateX(-50%);
  background:rgba(13,20,32,.78);
  backdrop-filter:blur(4px);
  color:#fff;
  font-size:.72rem;
  font-weight:600;
  padding:5px 12px;
  border-radius:999px;
  pointer-events:none;
  opacity:.9;
}

/* Details Column */
.zw-details-col{
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:clamp(18px,2.4vw,28px);
  overflow-y:auto;
  scrollbar-width:thin;
}
.zw-details-section{display:flex; flex-direction:column; gap:8px}
.zw-section-label{
  font-size:.75rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.05em;
  opacity:.55;
}
.zw-details-desc{
  margin:0;
  font-size:.95rem;
  line-height:1.6;
  color:rgba(13,20,32,.85);
}

.zw-pills{display:flex; flex-wrap:wrap; gap:8px}
.zw-pill{
  font-size:.78rem;
  font-weight:600;
  padding:6px 12px;
  border-radius:8px;
  background:var(--tint);
  color:var(--black);
}

.zw-metrics-grid{
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:8px;
}
.zw-metric-card{
  background:var(--tint);
  padding:10px 12px;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  gap:2px;
}
.zw-metric-val{
  font-size:1.15rem;
  font-weight:800;
  color:var(--purple);
  letter-spacing:-.02em;
}
.zw-metric-lbl{
  font-size:.72rem;
  opacity:.65;
  line-height:1.2;
}

.zw-cta-wrap{
  margin-top:auto;
  padding-top:14px;
  display:flex;
  flex-direction:column;
  gap:8px;
}
.zw-live-btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  background:var(--purple);
  color:#fff;
  text-decoration:none;
  font-weight:700;
  font-size:.95rem;
  padding:14px 22px;
  border-radius:999px;
  transition:background .2s, transform .2s, box-shadow .2s;
  box-shadow:0 8px 20px -4px rgba(77,17,168,.35);
}
.zw-live-btn:hover{
  background:var(--black);
  transform:translateY(-2px);
  box-shadow:0 12px 24px -4px rgba(13,20,32,.35);
}
.zw-cta-note{
  font-size:.75rem;
  opacity:.6;
  text-align:center;
}
.zw-cta-note b{font-weight:600}

@media (prefers-reduced-motion: reduce){
  .zw-shot img, .zw-shot, .zw-live-btn{transition:none}
  .zw-modal-sheet{animation:none}
}
`;

