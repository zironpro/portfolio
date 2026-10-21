"use client";

/**
 * Ziron Pro — SEO Category Page
 * ---------------------------------------------------------------
 * Route: /seo (matches the SEO card in <Categories />)
 *
 *  - Charcoal header (#1D1A20, echoes the SEO category card) with hero rings
 *  - Industry filter chips (no client names — industries only)
 *  - Interactive ranking & growth metrics cards
 *  - Click to view detailed case study breakdown (traffic charts, top keywords, rankings)
 *
 * Props:
 *  - whatsappNumber: digits only with country code
 *  - backHref: page with <Hero /> + <Categories />
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SeoProject = {
  id: string;
  industry: string;
  kind: string;
  rank: string;
  trafficGrowth: string;
  keywordsRanked: number;
  tone: string;
  topKeyword: string;
  metrics: number[];
  overview: string;
  results: string[];
};

const SEO_PROJECTS: SeoProject[] = [
  {
    id: "s1",
    industry: "Local services",
    kind: "Local Pack & Maps SEO",
    rank: "#1",
    trafficGrowth: "+312%",
    keywordsRanked: 148,
    tone: "#7CF2C0",
    topKeyword: "emergency plumber near me",
    metrics: [24, 38, 45, 62, 85, 96],
    overview: "Hyper-local search engine optimization focusing on Google Maps prominence and conversion-driven calls.",
    results: ["Ranked top 3 in Google Maps for 18 zip codes", "148 high-intent commercial keywords on Page 1", "3.1x boost in direct phone bookings"]
  },
  {
    id: "s2",
    industry: "E-commerce",
    kind: "Technical & E-com SEO",
    rank: "#2",
    trafficGrowth: "+480%",
    keywordsRanked: 840,
    tone: "#FFD23F",
    topKeyword: "organic skincare serum",
    metrics: [18, 29, 42, 58, 79, 94],
    overview: "Full store taxonomy architecture redesign, structured product data schema, and programmatic category indexing.",
    results: ["Organic transactions surged by 480% YoY", "840 top-funnel and transactional keywords ranked", "Core Web Vitals optimized under 1.2s LCP"]
  },
  {
    id: "s3",
    industry: "Real estate",
    kind: "Commercial Property Search",
    rank: "#1",
    trafficGrowth: "+265%",
    keywordsRanked: 320,
    tone: "#2336FF",
    topKeyword: "luxury villas for sale",
    metrics: [30, 44, 52, 69, 81, 98],
    overview: "Targeted landing pages for luxury developments coupled with authority link architecture and digital PR.",
    results: ["Outranked major listing aggregators for prime neighborhoods", "+265% increase in high-net-worth investor inquiries", "Average visit session duration increased to 4m 12s"]
  },
  {
    id: "s4",
    industry: "Healthcare",
    kind: "Medical Clinic SEO",
    rank: "#1",
    trafficGrowth: "+190%",
    keywordsRanked: 215,
    tone: "#FF6A4D",
    topKeyword: "pediatric dentist booking",
    metrics: [22, 35, 48, 64, 78, 92],
    overview: "Specialty doctor directory structuring, E-E-A-T medical content framework, and appointment booking schema.",
    results: ["First page for all core local dental specialties", "Over 200 qualified monthly consultation inquiries", "Cleaned 40+ toxic backlinks and resolved index bloat"]
  },
  {
    id: "s5",
    industry: "Hospitality",
    kind: "Boutique Hotel Direct Booking",
    rank: "#3",
    trafficGrowth: "+340%",
    keywordsRanked: 410,
    tone: "#386B50",
    topKeyword: "boutique resort staycation",
    metrics: [15, 28, 40, 56, 74, 91],
    overview: "Disintermediating OTAs with competitive destination content hubs, seasonal search trends, and local guide indexing.",
    results: ["Direct commission-free room bookings tripled", "Captured top positions for regional weekend escape queries", "Speed score raised from 41 to 96 on mobile"]
  },
  {
    id: "s6",
    industry: "Education",
    kind: "Programmatic Course SEO",
    rank: "#1",
    trafficGrowth: "+520%",
    keywordsRanked: 1120,
    tone: "#7CF2C0",
    topKeyword: "data science certification online",
    metrics: [25, 41, 55, 70, 88, 100],
    overview: "Curriculum mapping, high-velocity educational content creation, and search intent clustering.",
    results: ["1,100+ keywords across learning queries ranking in top 5", "Student enrollment pipeline scaled organically by 520%", "Over 18,000 monthly organic organic visitors"]
  }
];

type Props = { whatsappNumber?: string; backHref?: string };

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Mini ranking chart */
const MiniChart: React.FC<{ metrics: number[]; tone: string }> = ({ metrics, tone }) => (
  <div className="zseo-chart" aria-hidden="true">
    {metrics.map((val, idx) => (
      <span
        key={idx}
        style={{
          ["--h" as string]: `${val}%`,
          ["--bg" as string]: idx === metrics.length - 1 ? tone : "rgba(244,242,255,0.25)",
          ["--d" as string]: `${idx * 70}ms`
        }}
      />
    ))}
  </div>
);

export default function SeoPage({ whatsappNumber = "910000000000", backHref = "/" }: Props) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<SeoProject | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const industries = useMemo(() => ["All", ...Array.from(new Set(SEO_PROJECTS.map((p) => p.industry)))], []);
  const shown = useMemo(() => (filter === "All" ? SEO_PROJECTS : SEO_PROJECTS.filter((p) => p.industry === filter)), [filter]);
  const close = useCallback(() => setSelected(null), []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Ziron Pro, I'd like to rank on Google.")}`;
  const words = ["Rankings", "you", "can", "measure."];

  return (
    <main className="zseo-page">
      <style>{CSS}</style>

      {/* Header */}
      <header className="zseo-head">
        <div className="zseo-rings" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotate(${y * 0.12}deg)` }}>
          <span /><span /><span />
        </div>

        <nav className="zseo-navbar">
          <a className="zseo-logo" href={backHref} aria-label="Ziron Pro home">
            <img src="/logo/logo-white.png" alt="Ziron Pro" className="zseo-logo-img" />
          </a>
          <a className="zseo-wa" href={waHref} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </nav>

        <div className="zseo-head-body" style={{ transform: `translateY(${Math.min(y, 400) * 0.25}px)`, opacity: 1 - Math.min(y / 520, 1) }}>
          <a className="zseo-back" href={backHref}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </a>
          <h1 className="zseo-h1">
            {words.map((w, i) => (
              <span className="zseo-word" key={i}>
                <span style={{ animationDelay: `${0.1 + i * 0.09}s` }}>{w}</span>{" "}
              </span>
            ))}
          </h1>
          <p className="zseo-sub">Search visibility engineered to dominate search results and capture intent.</p>
        </div>
      </header>

      {/* Body */}
      <section className="zseo-body" aria-label="SEO case studies">
        <div className="zseo-filters" role="tablist" aria-label="Filter by industry">
          {industries.map((f) => (
            <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="zseo-grid">
          {shown.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="zseo-card"
              style={{ ["--tone" as string]: p.tone, ["--d" as string]: `${(i % 3) * 90}ms` }}
              onClick={() => setSelected(p)}
              aria-label={`View ${p.industry} SEO case study`}
            >
              <div className="zseo-card-top">
                <span className="zseo-rank-badge">{p.rank}</span>
                <span className="zseo-growth">{p.trafficGrowth}</span>
              </div>

              <MiniChart metrics={p.metrics} tone={p.tone} />

              <div className="zseo-card-info">
                <p className="zseo-kw">“{p.topKeyword}”</p>
                <div className="zseo-cap">
                  <span className="zseo-ind">{p.industry}</span>
                  <span className="zseo-kind">{p.kind}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="zseo-cta">
        <h2>Ready for Page #1?</h2>
        <a href={waHref} target="_blank" rel="noopener noreferrer">
          Audit your site on WhatsApp <ArrowUpRight />
        </a>
      </section>

      {/* Modal Details */}
      {selected && (
        <div className="zseo-modal" role="dialog" aria-modal="true" onClick={close}>
          <div className="zseo-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="zseo-sheet-top">
              <div>
                <b className="zseo-sheet-ind">{selected.industry}</b>
                <span className="zseo-sheet-kind">{selected.kind}</span>
              </div>
              <button type="button" className="zseo-close" onClick={close} aria-label="Close modal">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="zseo-sheet-body">
              <div className="zseo-stats-row">
                <div className="zstat">
                  <span>Peak Rank</span>
                  <b style={{ color: selected.tone }}>{selected.rank}</b>
                </div>
                <div className="zstat">
                  <span>Traffic Growth</span>
                  <b style={{ color: selected.tone }}>{selected.trafficGrowth}</b>
                </div>
                <div className="zstat">
                  <span>Top-Ranked Keywords</span>
                  <b>{selected.keywordsRanked}+</b>
                </div>
              </div>

              <div className="zseo-section">
                <h3>Execution Overview</h3>
                <p>{selected.overview}</p>
              </div>

              <div className="zseo-section">
                <h3>Key Search Results</h3>
                <ul className="zseo-bullets">
                  {selected.results.map((r, idx) => (
                    <li key={idx}>
                      <span className="zdot" style={{ background: selected.tone }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="zseo-sheet-foot">
              <a className="zseo-consult-btn" href={waHref} target="_blank" rel="noopener noreferrer">
                Request Similar Strategy <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.zseo-page{
  --cobalt:#2336FF; --paper:#F4F2FF; --ink:#0B0D2E; --coral:#FF6A4D; --sun:#FFD23F; --mint:#7CF2C0; --charcoal:#1D1A20; --grey:#E4E5EB;
  min-height:100vh; background:var(--grey); color:var(--ink);
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
}
.zseo-page *{box-sizing:border-box}

/* header */
.zseo-head{position:relative; overflow:hidden; background:var(--charcoal); color:var(--paper); min-height:min(78vh,640px); display:flex; flex-direction:column; border-radius:0 0 32px 32px}
.zseo-rings{position:absolute; left:78%; top:55%; width:120vmax; height:120vmax; pointer-events:none; will-change:transform}
.zseo-rings span{position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(244,242,255,.12)}
.zseo-rings span:nth-child(2){inset:16%; border-style:dashed; border-color:rgba(244,242,255,.16)}
.zseo-rings span:nth-child(3){inset:32%; border-color:var(--mint)}
.zseo-rings span:nth-child(3)::after{content:""; position:absolute; top:-9px; left:50%; width:18px; height:18px; border-radius:50%; background:var(--sun)}

.zseo-navbar{position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zseo-logo{display:inline-flex; align-items:center; text-decoration:none}
.zseo-logo-img{height:clamp(28px, 4vw, 40px); width:auto; object-fit:contain; display:block}
.zseo-wa{color:var(--ink); background:var(--paper); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:transform .2s, background .2s}
.zseo-wa:hover{transform:translateY(-2px); background:var(--mint)}

.zseo-head-body{position:relative; z-index:2; margin-top:auto; padding:0 clamp(18px,4vw,48px) clamp(36px,6vw,72px); will-change:transform,opacity}
.zseo-back{display:inline-flex; align-items:center; gap:6px; color:var(--paper); text-decoration:none; font-weight:600; font-size:.92rem; opacity:.85; margin-bottom:clamp(14px,3vw,28px); padding:6px 12px 6px 8px; border-radius:999px; border:1.5px solid rgba(244,242,255,.3); transition:background .2s, opacity .2s}
.zseo-back:hover{background:rgba(244,242,255,.12); opacity:1}
.zseo-h1{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(3rem,11vw,9.5rem); max-width:11ch; font-variation-settings:'opsz' 96}
.zseo-word{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.08em; margin-right:0.28em}
.zseo-word:last-child{margin-right:0}
.zseo-word>span{display:inline-block; transform:translateY(110%); animation:zseoRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zseoRise{to{transform:none}}
.zseo-sub{margin:1.1rem 0 0; font-size:clamp(1rem,1.5vw,1.2rem); opacity:.85}

/* body */
.zseo-body{padding:clamp(28px,4vw,56px) clamp(16px,2.8vw,54px) clamp(40px,5vw,72px)}
.zseo-filters{display:flex; gap:10px; overflow-x:auto; scrollbar-width:none; padding-bottom:6px; margin-bottom:clamp(18px,2.4vw,32px)}
.zseo-filters::-webkit-scrollbar{display:none}
.zseo-filters button{flex:none; border:1.5px solid rgba(11,13,46,.25); background:transparent; color:var(--ink); font-weight:600; font-size:.95rem; padding:9px 18px; border-radius:999px; cursor:pointer; transition:background .2s, color .2s, border-color .2s}
.zseo-filters button:hover{border-color:var(--ink)}
.zseo-filters button.on{background:var(--ink); color:var(--paper); border-color:var(--ink)}

.zseo-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zseo-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zseo-grid{grid-template-columns:1fr} }

/* card */
.zseo-card{all:unset; box-sizing:border-box; cursor:pointer; background:#141217; color:var(--paper); border-radius:12px; padding:clamp(18px,2.4vw,28px); display:flex; flex-direction:column; justify-content:space-between; gap:20px; box-shadow:0 18px 40px -22px rgba(5,8,70,.5); transition:transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s}
.zseo-card:hover{transform:translateY(-6px); box-shadow:0 26px 50px -20px rgba(5,8,70,.65)}
.zseo-card:focus-visible{outline:3px solid var(--mint); outline-offset:4px}
.zseo-card-top{display:flex; justify-content:space-between; align-items:center}
.zseo-rank-badge{background:var(--tone); color:var(--ink); font-weight:800; font-size:1.15rem; padding:4px 12px; border-radius:999px}
.zseo-growth{font-weight:800; font-size:1.5rem; letter-spacing:-.02em; color:var(--tone)}

.zseo-chart{height:90px; display:flex; align-items:flex-end; gap:8%; padding:10px 0; border-bottom:1px solid rgba(244,242,255,0.12)}
.zseo-chart span{flex:1; height:var(--h); background:var(--bg); border-radius:4px 4px 0 0; transform-origin:bottom; animation:zseoBar 1s cubic-bezier(.2,.8,.2,1)}
@keyframes zseoBar{from{transform:scaleY(0)} to{transform:scaleY(1)}}

.zseo-card-info{display:flex; flex-direction:column; gap:6px}
.zseo-kw{margin:0; font-size:.95rem; opacity:.75; font-style:italic}
.zseo-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zseo-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zseo-kind{font-size:.88rem; opacity:.65}

/* closing strip */
.zseo-cta{background:var(--cobalt); color:var(--paper); border-radius:32px 32px 0 0; padding:clamp(40px,7vw,90px) clamp(18px,4vw,48px); display:flex; flex-wrap:wrap; gap:20px 40px; align-items:center; justify-content:space-between}
.zseo-cta h2{margin:0; font-weight:800; letter-spacing:-.04em; line-height:.95; font-size:clamp(2.2rem,7vw,5.5rem)}
.zseo-cta a{display:inline-flex; align-items:center; gap:8px; background:var(--sun); color:var(--ink); text-decoration:none; font-weight:600; padding:14px 26px; border-radius:999px; transition:transform .2s}
.zseo-cta a:hover{transform:translateY(-3px)}

/* modal */
.zseo-modal{position:fixed; inset:0; z-index:200; background:rgba(8,10,24,.85); backdrop-filter:blur(6px); display:grid; place-items:center; padding:16px; animation:zseoFade .25s ease}
@keyframes zseoFade{from{opacity:0}}
.zseo-sheet{width:min(680px,100%); background:#18151D; color:var(--paper); border-radius:20px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 24px 60px rgba(0,0,0,0.6)}
.zseo-sheet-top{display:flex; justify-content:space-between; align-items:center; padding:20px 24px; border-bottom:1px solid rgba(244,242,255,0.12)}
.zseo-sheet-ind{font-size:1.3rem; letter-spacing:-.02em; display:block}
.zseo-sheet-kind{font-size:.9rem; opacity:.65}
.zseo-close{border:0; background:rgba(244,242,255,0.1); color:var(--paper); width:38px; height:38px; border-radius:50%; display:grid; place-items:center; cursor:pointer}
.zseo-close:hover{background:rgba(244,242,255,0.2)}
.zseo-sheet-body{padding:24px; display:flex; flex-direction:column; gap:22px}
.zseo-stats-row{display:grid; grid-template-columns:repeat(3,1fr); gap:12px; background:rgba(244,242,255,0.04); padding:16px; border-radius:12px}
.zstat span{font-size:.8rem; opacity:.6; display:block}
.zstat b{font-size:1.4rem; letter-spacing:-.02em}
.zseo-section h3{margin:0 0 8px; font-size:1.05rem; opacity:.85}
.zseo-section p{margin:0; opacity:.75; line-height:1.55; font-size:.95rem}
.zseo-bullets{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:10px}
.zseo-bullets li{display:flex; align-items:center; gap:10px; font-size:.92rem; opacity:.9}
.zdot{width:8px; height:8px; border-radius:50%; flex:none}
.zseo-sheet-foot{padding:16px 24px 24px}
.zseo-consult-btn{display:inline-flex; width:100%; justify-content:center; align-items:center; gap:8px; background:var(--mint); color:var(--ink); text-decoration:none; font-weight:700; padding:14px; border-radius:999px; transition:transform .2s}
.zseo-consult-btn:hover{transform:translateY(-2px)}
`;
