"use client";

/**
 * Ziron Pro — SEO page  (route: /seo)
 * Black ranking cards with growth charts; click for the case-study breakdown.
 * The figures below are sample content: replace with your real results.
 */

import React, { useCallback, useMemo, useState } from "react";
import Shell, { ArrowUpRight, CloseIcon, Filters, useSeen, useModal, waLink } from "../CategoryShell";

type SeoProject = {
  id: string; industry: string; kind: string; rank: string; trafficGrowth: string; keywordsRanked: number;
  topKeyword: string; metrics: number[]; overview: string; results: string[];
};

const SEO_PROJECTS: SeoProject[] = [
  {
    id: "s1", industry: "Local services", kind: "Local Pack & Maps SEO", rank: "#1", trafficGrowth: "+312%", keywordsRanked: 148,
    topKeyword: "emergency plumber near me", metrics: [24, 38, 45, 62, 85, 96],
    overview: "Hyper-local search optimisation focused on Google Maps prominence and conversion-driven calls.",
    results: ["Ranked top 3 in Google Maps for 18 areas", "148 high-intent commercial keywords on Page 1", "3.1x boost in direct phone bookings"],
  },
  {
    id: "s2", industry: "E-commerce", kind: "Technical & E-com SEO", rank: "#2", trafficGrowth: "+480%", keywordsRanked: 840,
    topKeyword: "organic skincare serum", metrics: [18, 29, 42, 58, 79, 94],
    overview: "Full store taxonomy redesign, structured product data and programmatic category indexing.",
    results: ["Organic transactions up 480% year on year", "840 top-funnel and transactional keywords ranked", "Core Web Vitals optimised to under 1.2s LCP"],
  },
  {
    id: "s3", industry: "Real estate", kind: "Commercial Property Search", rank: "#1", trafficGrowth: "+265%", keywordsRanked: 320,
    topKeyword: "luxury villas for sale", metrics: [30, 44, 52, 69, 81, 98],
    overview: "Targeted landing pages for luxury developments with authority link building and digital PR.",
    results: ["Outranked major listing portals for prime neighbourhoods", "+265% increase in high-value investor enquiries", "Average session duration up to 4m 12s"],
  },
  {
    id: "s4", industry: "Healthcare", kind: "Medical Clinic SEO", rank: "#1", trafficGrowth: "+190%", keywordsRanked: 215,
    topKeyword: "paediatric dentist booking", metrics: [22, 35, 48, 64, 78, 92],
    overview: "Specialist directory structure, E-E-A-T medical content framework and appointment booking schema.",
    results: ["First page for all core local dental specialties", "200+ qualified monthly consultation enquiries", "Removed 40+ toxic backlinks and fixed index bloat"],
  },
  {
    id: "s5", industry: "Hospitality", kind: "Boutique Hotel Direct Booking", rank: "#3", trafficGrowth: "+340%", keywordsRanked: 410,
    topKeyword: "boutique resort staycation", metrics: [15, 28, 40, 56, 74, 91],
    overview: "Reducing reliance on booking portals with destination content hubs, seasonal search trends and local guides.",
    results: ["Direct, commission-free room bookings tripled", "Top positions for regional weekend-escape queries", "Mobile speed score raised from 41 to 96"],
  },
  {
    id: "s6", industry: "Education", kind: "Programmatic Course SEO", rank: "#1", trafficGrowth: "+520%", keywordsRanked: 1120,
    topKeyword: "data science certification online", metrics: [25, 41, 55, 70, 88, 100],
    overview: "Curriculum mapping, high-velocity educational content and search-intent clustering.",
    results: ["1,100+ learning keywords ranking in the top 5", "Student enrolment pipeline up 520% organically", "18,000+ monthly organic visitors"],
  },
];

type Props = { whatsappNumber?: string; backHref?: string };

const MiniChart: React.FC<{ metrics: number[] }> = ({ metrics }) => (
  <div className="zseo-chart" aria-hidden="true">
    {metrics.map((val, idx) => (
      <span key={idx} className={idx === metrics.length - 1 ? "hi" : ""} style={{ height: `${val}%`, animationDelay: `${idx * 70}ms` }} />
    ))}
  </div>
);

const Card: React.FC<{ p: SeoProject; i: number; onOpen: (p: SeoProject) => void }> = ({ p, i, onOpen }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref} type="button" className={`zseo-card zs-reveal ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }} onClick={() => onOpen(p)} aria-label={`View ${p.industry} SEO case study`}
    >
      <div className="zseo-card-top">
        <span className="zseo-rank">{p.rank}</span>
        <span className="zseo-growth">{p.trafficGrowth}</span>
      </div>
      <MiniChart metrics={p.metrics} />
      <div className="zseo-info">
        <p className="zseo-kw">“{p.topKeyword}”</p>
        <div className="zseo-cap">
          <span className="zseo-ind">{p.industry}</span>
          <span className="zseo-kind">{p.kind}</span>
        </div>
      </div>
    </button>
  );
};

const Detail: React.FC<{ p: SeoProject; wa: string; onClose: () => void }> = ({ p, wa, onClose }) => {
  useModal(onClose);
  return (
    <div className="zs-modal" role="dialog" aria-modal="true" aria-label={`${p.industry} SEO case study`} onClick={onClose}>
      <div className="zs-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="zs-sheet-top">
          <div><b className="zs-sheet-ind">{p.industry}</b><span className="zs-sheet-kind">{p.kind}</span></div>
          <button type="button" className="zs-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>
        <div className="zs-sheet-body">
          <div className="zs-stats">
            <div><span>Peak rank</span><b style={{ color: "var(--purple)" }}>{p.rank}</b></div>
            <div><span>Traffic growth</span><b style={{ color: "var(--purple)" }}>{p.trafficGrowth}</b></div>
            <div><span>Keywords ranked</span><b>{p.keywordsRanked}+</b></div>
          </div>
          <div>
            <h3 className="zs-h3">What we did</h3>
            <p className="zs-p">{p.overview}</p>
          </div>
          <div>
            <h3 className="zs-h3">Results</h3>
            <ul className="zseo-bullets">
              {p.results.map((r, idx) => <li key={idx}><span className="zseo-dot" />{r}</li>)}
            </ul>
          </div>
        </div>
        <div className="zs-sheet-foot">
          <a className="zs-btn" href={wa} target="_blank" rel="noopener noreferrer">Request a similar strategy <ArrowUpRight /></a>
        </div>
      </div>
    </div>
  );
};

export default function SeoPage({ whatsappNumber = "910000000000", backHref }: Props) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<SeoProject | null>(null);
  const industries = useMemo(() => ["All", ...Array.from(new Set(SEO_PROJECTS.map((p) => p.industry)))], []);
  const shown = useMemo(() => (filter === "All" ? SEO_PROJECTS : SEO_PROJECTS.filter((p) => p.industry === filter)), [filter]);
  const close = useCallback(() => setSelected(null), []);
  const wa = waLink(whatsappNumber, "Hi Ziron Pro, I'd like to rank on Google.");

  return (
    <Shell
      words={["Rankings", "you", "can", "measure."]}
      sub="Search visibility built to capture intent."
      waText="Hi Ziron Pro, I'd like to rank on Google."
      ctaTitle="Ready for Page #1?"
      ctaLabel="Audit your site on WhatsApp"
      label="SEO case studies"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={selected && <Detail p={selected} wa={wa} onClose={close} />}
    >
      <style>{CSS}</style>
      <Filters items={industries} value={filter} onChange={setFilter} label="Filter by industry" />
      <div className="zseo-grid">
        {shown.map((p, i) => <Card key={filter + p.id} p={p} i={i} onOpen={setSelected} />)}
      </div>
    </Shell>
  );
}

const CSS = `
.zseo-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zseo-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zseo-grid{grid-template-columns:1fr} }

.zseo-card{all:unset; box-sizing:border-box; cursor:pointer; background:var(--black); color:#fff; border-radius:14px; padding:clamp(18px,2.4vw,28px); display:flex; flex-direction:column; justify-content:space-between; gap:20px; transition:transform .4s cubic-bezier(.2,.8,.2,1), background .3s}
.zseo-card:hover{transform:translateY(-6px); background:color-mix(in srgb, var(--purple) 30%, var(--black))}
.zseo-card-top{display:flex; justify-content:space-between; align-items:center}
.zseo-rank{background:var(--purple-2); color:#fff; font-weight:800; font-size:1.15rem; padding:4px 12px; border-radius:999px}
.zseo-growth{font-weight:800; font-size:1.5rem; letter-spacing:-.02em; color:#fff}
.zseo-chart{height:90px; display:flex; align-items:flex-end; gap:8%; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.18)}
.zseo-chart span{flex:1; background:rgba(255,255,255,.28); border-radius:4px 4px 0 0; transform-origin:bottom; animation:zseoBar 1s cubic-bezier(.2,.8,.2,1) both}
.zseo-chart span.hi{background:var(--purple-2)}
@keyframes zseoBar{from{transform:scaleY(0)} to{transform:scaleY(1)}}
.zseo-info{display:flex; flex-direction:column; gap:6px}
.zseo-kw{margin:0; font-size:.95rem; opacity:.8; font-style:italic}
.zseo-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zseo-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zseo-kind{font-size:.88rem; opacity:.7}

.zseo-bullets{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:10px}
.zseo-bullets li{display:flex; align-items:center; gap:10px; font-size:.92rem}
.zseo-dot{width:8px; height:8px; border-radius:50%; flex:none; background:var(--purple)}

@media (prefers-reduced-motion: reduce){ .zseo-chart span{animation:none} .zseo-card{transition:none} }
`;