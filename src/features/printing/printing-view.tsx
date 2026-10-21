"use client";

/**
 * Ziron Pro — Printing Services Category Page
 * ---------------------------------------------------------------
 * Route: /printing (matches the Printing card in <Categories />)
 *
 *  - Terracotta header (#B8452E, matches the Printing card) with hero rings
 *  - Filter chips by print type (Packaging, Menus, Stationery, Merchandise)
 *  - Tactile physical print showcase cards with texture/finish tags
 *  - Lightbox modal displaying paper stocks, printing finish specs, and sample mockups
 *
 * Props:
 *  - whatsappNumber: digits only with country code
 *  - backHref: page with <Hero /> + <Categories />
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";

type PrintProject = {
  id: string;
  industry: string;
  kind: string;
  finish: string;
  stock: string;
  tone: string;
  ratio: string;
  specs: string[];
  description: string;
};

const PRINT_PROJECTS: PrintProject[] = [
  {
    id: "p1",
    industry: "Hospitality",
    kind: "Foil-Stamped Tasting Menu",
    finish: "Hot Foil & Soft Touch",
    stock: "350gsm G.F Smith Colorplan",
    tone: "#B8452E",
    ratio: "4/5",
    specs: ["Gold metallic hot stamp", "Matte velvet lamination", "Hand-stitched spine"],
    description: "Multi-course dining presentation crafted on heavyweight textured card with fingerprint-resistant velvet coating."
  },
  {
    id: "p2",
    industry: "Café",
    kind: "Custom Coffee Bean Pouches",
    finish: "Matte Kraft & Degassing Valve",
    stock: "Biodegradable Tri-layer Barrier",
    tone: "#386B50",
    ratio: "1/1",
    specs: ["Eco-friendly water-based inks", "Resealable aroma zipper", "One-way degassing valve"],
    description: "Retail coffee packaging line preserving peak roasted bean freshness with a raw organic tactile feel."
  },
  {
    id: "p3",
    industry: "Retail",
    kind: "Luxury Rigid Unboxing Box",
    finish: "Embossed & Spot UV",
    stock: "1200gsm Greyboard wrapped in Wibalin",
    tone: "#1D1A20",
    ratio: "4/3",
    specs: ["Magnetic snap closure", "Debossed logo monogram", "Precision die-cut foam insert"],
    description: "High-end jewelry and accessory presentation boxes engineered for structural weight and unboxing ceremony."
  },
  {
    id: "p4",
    industry: "Real estate",
    kind: "Hardcover Architectural Monograph",
    finish: "Clothbound Casebound",
    stock: "170gsm Fedrigoni Tatami",
    tone: "#1F2A55",
    ratio: "4/5",
    specs: ["Buckram linen hardcover", "Blind deboss spine & face", "Lay-flat Swiss binding"],
    description: "Architectural development prospectus for luxury penthouses with true-color photography reproduction."
  },
  {
    id: "p5",
    industry: "Fashion",
    kind: "Garment Hangtags & Seal Labels",
    finish: "Letterpress & Blind Deboss",
    stock: "600gsm Cotton Lettra",
    tone: "#FF6A4D",
    ratio: "1/1",
    specs: ["Deep relief letterpress", "Waxed cotton eyelet cord", "Foil serialized number tags"],
    description: "Signature tactile brand touchpoints attached to designer capsule collections."
  },
  {
    id: "p6",
    industry: "Healthcare",
    kind: "Appointment Folders & Stationery",
    finish: "Scuff-Free Matte",
    stock: "300gsm FSC Certified Recycled",
    tone: "#7CF2C0",
    ratio: "4/3",
    specs: ["Business card slot slit", "Spot gloss clinic seal", "Soy-based pantone matching"],
    description: "Executive presentation folders and intake stationery designed to establish immediate clinical authority."
  }
];

type Props = { whatsappNumber?: string; backHref?: string };

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Tactile Mock Representation of Print Material */
const PrintPlate: React.FC<{ p: PrintProject }> = ({ p }) => (
  <div className="zprint-plate" style={{ ["--tone" as string]: p.tone }} aria-hidden="true">
    <div className="zprint-paper">
      <div className="zprint-cutout" />
      <div className="zprint-badge">{p.finish}</div>
      <div className="zprint-cmyk">
        <span style={{ background: "#00B7EB" }} />
        <span style={{ background: "#EC008C" }} />
        <span style={{ background: "#FFE600" }} />
        <span style={{ background: "#111111" }} />
      </div>
    </div>
  </div>
);

export default function PrintingPage({ whatsappNumber = "910000000000", backHref = "/" }: Props) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<PrintProject | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const industries = useMemo(() => ["All", ...Array.from(new Set(PRINT_PROJECTS.map((p) => p.industry)))], []);
  const shown = useMemo(() => (filter === "All" ? PRINT_PROJECTS : PRINT_PROJECTS.filter((p) => p.industry === filter)), [filter]);
  const close = useCallback(() => setSelected(null), []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Ziron Pro, I'd like a custom print quote.")}`;
  const words = ["Print", "that", "feels", "tangible."];

  return (
    <main className="zprint-page">
      <style>{CSS}</style>

      {/* Header */}
      <header className="zprint-head">
        <div className="zprint-rings" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotate(${y * 0.12}deg)` }}>
          <span /><span /><span />
        </div>

        <nav className="zprint-navbar">
          <a className="zprint-logo" href={backHref} aria-label="Ziron Pro home">
            <img src="/logo/logo-white.png" alt="Ziron Pro" className="zprint-logo-img" />
          </a>
          <a className="zprint-wa" href={waHref} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </nav>

        <div className="zprint-head-body" style={{ transform: `translateY(${Math.min(y, 400) * 0.25}px)`, opacity: 1 - Math.min(y / 520, 1) }}>
          <a className="zprint-back" href={backHref}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </a>
          <h1 className="zprint-h1">
            {words.map((w, i) => (
              <span className="zprint-word" key={i}>
                <span style={{ animationDelay: `${0.1 + i * 0.09}s` }}>{w}</span>{" "}
              </span>
            ))}
          </h1>
          <p className="zprint-sub">Premium paper stocks, specialty foil finishes, and artisanal packaging fabrication.</p>
        </div>
      </header>

      {/* Body */}
      <section className="zprint-body" aria-label="Print projects">
        <div className="zprint-filters" role="tablist" aria-label="Filter by industry">
          {industries.map((f) => (
            <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="zprint-grid">
          {shown.map((p) => (
            <button
              key={p.id}
              type="button"
              className="zprint-card"
              onClick={() => setSelected(p)}
              aria-label={`View ${p.industry} ${p.kind}`}
            >
              <div className="zprint-cover" style={{ aspectRatio: p.ratio }}>
                <PrintPlate p={p} />
                <span className="zprint-stock-tag">{p.stock}</span>
              </div>
              <div className="zprint-cap">
                <span className="zprint-ind">{p.industry}</span>
                <span className="zprint-kind">{p.kind}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="zprint-cta">
        <h2>Feel the difference in hand.</h2>
        <a href={waHref} target="_blank" rel="noopener noreferrer">
          Request Material Swatches <ArrowUpRight />
        </a>
      </section>

      {/* Modal Details */}
      {selected && (
        <div className="zprint-modal" role="dialog" aria-modal="true" onClick={close}>
          <div className="zprint-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="zprint-sheet-top">
              <div>
                <b className="zprint-sheet-ind">{selected.industry}</b>
                <span className="zprint-sheet-kind">{selected.kind}</span>
              </div>
              <button type="button" className="zprint-close" onClick={close} aria-label="Close modal">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="zprint-sheet-body">
              <div className="zprint-spec-plate">
                <PrintPlate p={selected} />
              </div>

              <div className="zprint-spec-list">
                <div className="zspec-item">
                  <span>Paper Stock</span>
                  <b>{selected.stock}</b>
                </div>
                <div className="zspec-item">
                  <span>Finishing Technique</span>
                  <b>{selected.finish}</b>
                </div>
              </div>

              <div className="zprint-section">
                <h3>Production Highlights</h3>
                <ul className="zprint-bullets">
                  {selected.specs.map((sp, idx) => (
                    <li key={idx}>
                      <span className="zprint-pip" style={{ background: selected.tone }} />
                      {sp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="zprint-section">
                <h3>Fabrication Details</h3>
                <p>{selected.description}</p>
              </div>
            </div>

            <div className="zprint-sheet-foot">
              <a className="zprint-consult-btn" href={waHref} target="_blank" rel="noopener noreferrer">
                Inquire About This Print Specification <ArrowUpRight />
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

.zprint-page{
  --cobalt:#2336FF; --paper:#F4F2FF; --ink:#0B0D2E; --coral:#FF6A4D; --sun:#FFD23F; --terracotta:#B8452E; --grey:#E4E5EB;
  min-height:100vh; background:var(--grey); color:var(--ink);
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
}
.zprint-page *{box-sizing:border-box}

/* header */
.zprint-head{position:relative; overflow:hidden; background:var(--terracotta); color:var(--paper); min-height:min(78vh,640px); display:flex; flex-direction:column; border-radius:0 0 32px 32px}
.zprint-rings{position:absolute; left:78%; top:55%; width:120vmax; height:120vmax; pointer-events:none; will-change:transform}
.zprint-rings span{position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(244,242,255,.14)}
.zprint-rings span:nth-child(2){inset:16%; border-style:dashed; border-color:rgba(244,242,255,.18)}
.zprint-rings span:nth-child(3){inset:32%; border-color:var(--sun)}
.zprint-rings span:nth-child(3)::after{content:""; position:absolute; top:-9px; left:50%; width:18px; height:18px; border-radius:50%; background:var(--cobalt)}

.zprint-navbar{position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zprint-logo{display:inline-flex; align-items:center; text-decoration:none}
.zprint-logo-img{height:clamp(28px, 4vw, 40px); width:auto; object-fit:contain; display:block}
.zprint-wa{color:var(--ink); background:var(--paper); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:transform .2s, background .2s}
.zprint-wa:hover{transform:translateY(-2px); background:var(--sun)}

.zprint-head-body{position:relative; z-index:2; margin-top:auto; padding:0 clamp(18px,4vw,48px) clamp(36px,6vw,72px); will-change:transform,opacity}
.zprint-back{display:inline-flex; align-items:center; gap:6px; color:var(--paper); text-decoration:none; font-weight:600; font-size:.92rem; opacity:.85; margin-bottom:clamp(14px,3vw,28px); padding:6px 12px 6px 8px; border-radius:999px; border:1.5px solid rgba(244,242,255,.3); transition:background .2s, opacity .2s}
.zprint-back:hover{background:rgba(244,242,255,.12); opacity:1}
.zprint-h1{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(3rem,11vw,9.5rem); max-width:11ch; font-variation-settings:'opsz' 96}
.zprint-word{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.08em; margin-right:0.28em}
.zprint-word:last-child{margin-right:0}
.zprint-word>span{display:inline-block; transform:translateY(110%); animation:zprintRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zprintRise{to{transform:none}}
.zprint-sub{margin:1.1rem 0 0; font-size:clamp(1rem,1.5vw,1.2rem); opacity:.85}

/* body */
.zprint-body{padding:clamp(28px,4vw,56px) clamp(16px,2.8vw,54px) clamp(40px,5vw,72px)}
.zprint-filters{display:flex; gap:10px; overflow-x:auto; scrollbar-width:none; padding-bottom:6px; margin-bottom:clamp(18px,2.4vw,32px)}
.zprint-filters::-webkit-scrollbar{display:none}
.zprint-filters button{flex:none; border:1.5px solid rgba(11,13,46,.25); background:transparent; color:var(--ink); font-weight:600; font-size:.95rem; padding:9px 18px; border-radius:999px; cursor:pointer; transition:background .2s, color .2s, border-color .2s}
.zprint-filters button:hover{border-color:var(--ink)}
.zprint-filters button.on{background:var(--ink); color:var(--paper); border-color:var(--ink)}

.zprint-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zprint-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zprint-grid{grid-template-columns:1fr} }

/* card */
.zprint-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px}
.zprint-card:focus-visible{outline:3px solid var(--terracotta); outline-offset:4px}
.zprint-cover{position:relative; width:100%; border-radius:10px; overflow:hidden; background:#fff; box-shadow:0 18px 40px -22px rgba(5,8,70,.35); transition:transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s}
.zprint-card:hover .zprint-cover{transform:translateY(-6px); box-shadow:0 26px 50px -20px rgba(5,8,70,.5)}
.zprint-stock-tag{position:absolute; left:12px; bottom:12px; background:rgba(11,13,46,.82); color:var(--paper); font-weight:600; font-size:.78rem; padding:5px 12px; border-radius:999px; backdrop-filter:blur(4px)}

.zprint-plate{position:absolute; inset:0; display:grid; place-items:center; background:color-mix(in srgb, var(--tone) 15%, #F4F2FF)}
.zprint-paper{width:75%; height:75%; background:#fff; border-radius:8px; box-shadow:0 14px 28px -10px rgba(5,8,70,.25); display:flex; flex-direction:column; justify-content:space-between; padding:8%; position:relative; overflow:hidden; transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.zprint-card:hover .zprint-paper{transform:scale(1.04) rotate(-1deg)}
.zprint-cutout{width:40%; height:8px; border-radius:4px; background:var(--tone); opacity:.6}
.zprint-badge{font-size:.85rem; font-weight:700; color:var(--ink); opacity:.9}
.zprint-cmyk{display:flex; gap:6px}
.zprint-cmyk span{width:10px; height:10px; border-radius:50%}

.zprint-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zprint-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zprint-kind{font-size:.88rem; opacity:.65}

/* closing strip */
.zprint-cta{background:var(--terracotta); color:var(--paper); border-radius:32px 32px 0 0; padding:clamp(40px,7vw,90px) clamp(18px,4vw,48px); display:flex; flex-wrap:wrap; gap:20px 40px; align-items:center; justify-content:space-between}
.zprint-cta h2{margin:0; font-weight:800; letter-spacing:-.04em; line-height:.95; font-size:clamp(2.2rem,7vw,5.5rem)}
.zprint-cta a{display:inline-flex; align-items:center; gap:8px; background:var(--sun); color:var(--ink); text-decoration:none; font-weight:600; padding:14px 26px; border-radius:999px; transition:transform .2s}
.zprint-cta a:hover{transform:translateY(-3px)}

/* modal */
.zprint-modal{position:fixed; inset:0; z-index:200; background:rgba(8,10,24,.82); backdrop-filter:blur(6px); display:grid; place-items:center; padding:16px; animation:zprintFade .25s ease}
@keyframes zprintFade{from{opacity:0}}
.zprint-sheet{width:min(680px,100%); background:#fff; color:var(--ink); border-radius:20px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 24px 60px rgba(0,0,0,0.4)}
.zprint-sheet-top{display:flex; justify-content:space-between; align-items:center; padding:20px 24px; border-bottom:1px solid rgba(11,13,46,0.1)}
.zprint-sheet-ind{font-size:1.3rem; letter-spacing:-.02em; display:block}
.zprint-sheet-kind{font-size:.9rem; opacity:.65}
.zprint-close{border:0; background:rgba(11,13,46,0.08); color:var(--ink); width:38px; height:38px; border-radius:50%; display:grid; place-items:center; cursor:pointer}
.zprint-close:hover{background:rgba(11,13,46,0.15)}
.zprint-sheet-body{padding:24px; display:flex; flex-direction:column; gap:20px}
.zprint-spec-plate{height:160px; border-radius:12px; position:relative; overflow:hidden}
.zprint-spec-list{display:grid; grid-template-columns:1fr 1fr; gap:12px; background:#F4F2FF; padding:14px 18px; border-radius:10px}
.zspec-item span{font-size:.8rem; opacity:.65; display:block}
.zspec-item b{font-size:.95rem}

.zprint-section h3{margin:0 0 10px; font-size:1.05rem; opacity:.85}
.zprint-section p{margin:0; opacity:.75; line-height:1.55; font-size:.95rem}
.zprint-bullets{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px}
.zprint-bullets li{display:flex; align-items:center; gap:10px; font-size:.92rem; opacity:.9}
.zprint-pip{width:8px; height:8px; border-radius:50%; flex:none}

.zprint-sheet-foot{padding:16px 24px 24px}
.zprint-consult-btn{display:inline-flex; width:100%; justify-content:center; align-items:center; gap:8px; background:var(--terracotta); color:#fff; text-decoration:none; font-weight:700; padding:14px; border-radius:999px; transition:transform .2s}
.zprint-consult-btn:hover{transform:translateY(-2px)}
`;
