"use client";

/**
 * Ziron Pro — Lead Generation Category Page
 * ---------------------------------------------------------------
 * Route: /leads (matches the Leads card in <Categories />)
 *
 *  - Electric Cobalt header (#2336FF) with hero rings
 *  - Filter chips by industry
 *  - Conversion pipeline cards: CPL, Qualified Leads, ROI
 *  - Modal breakdown showcasing funnel architecture and paid campaign channels
 *
 * Props:
 *  - whatsappNumber: digits only with country code
 *  - backHref: page with <Hero /> + <Categories />
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";

type LeadProject = {
  id: string;
  industry: string;
  kind: string;
  cpl: string;
  leadsDelivered: string;
  roas: string;
  tone: string;
  channels: string[];
  funnelStages: { stage: string; rate: string }[];
  overview: string;
};

const LEAD_PROJECTS: LeadProject[] = [
  {
    id: "l1",
    industry: "Education",
    kind: "Higher Ed Admissions Campaign",
    cpl: "$14.20",
    leadsDelivered: "1,450",
    roas: "4.8x",
    tone: "#FFD23F",
    channels: ["Meta Ads", "Google Search", "WhatsApp Automation"],
    funnelStages: [
      { stage: "Ad Impressions", rate: "240k" },
      { stage: "Qualified Quiz Completers", rate: "2,800" },
      { stage: "Booked Advising Calls", rate: "1,450" },
      { stage: "Confirmed Enrollments", rate: "310" }
    ],
    overview: "Built an interactive scholarship and eligibility assessment funnel paired with rapid WhatsApp CRM routing."
  },
  {
    id: "l2",
    industry: "Real estate",
    kind: "Off-Plan Investment Funnel",
    cpl: "$32.50",
    leadsDelivered: "680",
    roas: "8.2x",
    tone: "#FF6A4D",
    channels: ["Google Search Intent", "LinkedIn B2B", "Direct Outreach"],
    funnelStages: [
      { stage: "High-Intent Searchers", rate: "45k" },
      { stage: "Brochure Unlocks", rate: "1,950" },
      { stage: "Verified HNW Inquiries", rate: "680" },
      { stage: "Site Inspections Booked", rate: "94" }
    ],
    overview: "Gated developer prospectus funnel filtering accredited investors before handing off to executive sales agents."
  },
  {
    id: "l3",
    industry: "Healthcare",
    kind: "Cosmetic & Dental Inquiries",
    cpl: "$18.90",
    leadsDelivered: "920",
    roas: "5.4x",
    tone: "#7CF2C0",
    channels: ["Instagram Reels Ads", "Local Google Search", "SMS Reminders"],
    funnelStages: [
      { stage: "Video Views", rate: "180k" },
      { stage: "Treatment Cost Calculators", rate: "3,200" },
      { stage: "Consultation Bookings", rate: "920" },
      { stage: "Treatment Initiations", rate: "285" }
    ],
    overview: "Interactive smile simulation & pricing calculator capturing high-intent patients ready to schedule their consult."
  },
  {
    id: "l4",
    industry: "Local services",
    kind: "Contractor Emergency Enquiries",
    cpl: "$11.40",
    leadsDelivered: "1,850",
    roas: "6.1x",
    tone: "#FFD23F",
    channels: ["Google Local Services Ads", "Click-to-Call Ads"],
    funnelStages: [
      { stage: "Phone Call Impressions", rate: "95k" },
      { stage: "Immediate Call Connections", rate: "2,400" },
      { stage: "Qualified Work Dispatches", rate: "1,850" },
      { stage: "Completed Invoices", rate: "1,420" }
    ],
    overview: "Instant pay-per-call mobile campaign engineered for sub-30-minute dispatch response times."
  },
  {
    id: "l5",
    industry: "Hospitality",
    kind: "Corporate Retreats & Banquets",
    cpl: "$45.00",
    leadsDelivered: "340",
    roas: "7.0x",
    tone: "#FF6A4D",
    channels: ["LinkedIn Sponsored InMail", "Account-Based Marketing"],
    funnelStages: [
      { stage: "Corporate Decision Makers", rate: "12k" },
      { stage: "Venue Deck Downloads", rate: "840" },
      { stage: "RFP Submissions", rate: "340" },
      { stage: "Signed Event Contracts", rate: "48" }
    ],
    overview: "Targeted executive outreach to HR and event directors securing premium corporate seasonal buyouts."
  },
  {
    id: "l6",
    industry: "Retail",
    kind: "VIP Buyer & Wholesale Pipeline",
    cpl: "$16.80",
    leadsDelivered: "1,120",
    roas: "5.1x",
    tone: "#7CF2C0",
    channels: ["Meta Lookalike Audiences", "Klaviyo Flows"],
    funnelStages: [
      { stage: "Exclusive Lookbook Viewers", rate: "120k" },
      { stage: "VIP Club Signups", rate: "4,600" },
      { stage: "Wholesale Enquiries", rate: "1,120" },
      { stage: "Stockist Onboarding", rate: "115" }
    ],
    overview: "Dual-tier lead capture driving direct-to-consumer loyalty alongside wholesale retail stockist applications."
  }
];

type Props = { whatsappNumber?: string; backHref?: string };

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function LeadsPage({ whatsappNumber = "910000000000", backHref = "/" }: Props) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<LeadProject | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const industries = useMemo(() => ["All", ...Array.from(new Set(LEAD_PROJECTS.map((p) => p.industry)))], []);
  const shown = useMemo(() => (filter === "All" ? LEAD_PROJECTS : LEAD_PROJECTS.filter((p) => p.industry === filter)), [filter]);
  const close = useCallback(() => setSelected(null), []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Ziron Pro, I need more qualified leads.")}`;
  const words = ["Enquiries,", "not", "just", "clicks."];

  return (
    <main className="zlead-page">
      <style>{CSS}</style>

      {/* Header */}
      <header className="zlead-head">
        <div className="zlead-rings" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotate(${y * 0.12}deg)` }}>
          <span /><span /><span />
        </div>

        <nav className="zlead-navbar">
          <a className="zlead-logo" href={backHref} aria-label="Ziron Pro home">
            <img src="/logo/logo-white.png" alt="Ziron Pro" className="zlead-logo-img" />
          </a>
          <a className="zlead-wa" href={waHref} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </nav>

        <div className="zlead-head-body" style={{ transform: `translateY(${Math.min(y, 400) * 0.25}px)`, opacity: 1 - Math.min(y / 520, 1) }}>
          <a className="zlead-back" href={backHref}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </a>
          <h1 className="zlead-h1">
            {words.map((w, i) => (
              <span className="zlead-word" key={i}>
                <span style={{ animationDelay: `${0.1 + i * 0.09}s` }}>{w}</span>{" "}
              </span>
            ))}
          </h1>
          <p className="zlead-sub">Performance customer acquisition campaigns with audited conversion tracking.</p>
        </div>
      </header>

      {/* Body */}
      <section className="zlead-body" aria-label="Lead generation case studies">
        <div className="zlead-filters" role="tablist" aria-label="Filter by industry">
          {industries.map((f) => (
            <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="zlead-grid">
          {shown.map((p) => (
            <button
              key={p.id}
              type="button"
              className="zlead-card"
              style={{ ["--tone" as string]: p.tone }}
              onClick={() => setSelected(p)}
              aria-label={`View ${p.industry} lead generation case study`}
            >
              <div className="zlead-card-top">
                <span className="zlead-roas">{p.roas} ROAS</span>
                <span className="zlead-delivered">{p.leadsDelivered} Leads</span>
              </div>

              {/* Graphic funnel representation */}
              <div className="zlead-mini-funnel" aria-hidden="true">
                <div className="f-bar f1" style={{ background: p.tone }} />
                <div className="f-bar f2" />
                <div className="f-bar f3" />
              </div>

              <div className="zlead-card-meta">
                <div className="zlead-cpl-tag">Average CPL: <b>{p.cpl}</b></div>
                <div className="zlead-cap">
                  <span className="zlead-ind">{p.industry}</span>
                  <span className="zlead-kind">{p.kind}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="zlead-cta">
        <h2>Scale your sales pipeline.</h2>
        <a href={waHref} target="_blank" rel="noopener noreferrer">
          Book a Growth Call <ArrowUpRight />
        </a>
      </section>

      {/* Modal Details */}
      {selected && (
        <div className="zlead-modal" role="dialog" aria-modal="true" onClick={close}>
          <div className="zlead-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="zlead-sheet-top">
              <div>
                <b className="zlead-sheet-ind">{selected.industry}</b>
                <span className="zlead-sheet-kind">{selected.kind}</span>
              </div>
              <button type="button" className="zlead-close" onClick={close} aria-label="Close modal">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="zlead-sheet-body">
              <div className="zlead-stats-row">
                <div className="zstat">
                  <span>Cost per Lead</span>
                  <b style={{ color: selected.tone }}>{selected.cpl}</b>
                </div>
                <div className="zstat">
                  <span>Verified Enquiries</span>
                  <b style={{ color: selected.tone }}>{selected.leadsDelivered}</b>
                </div>
                <div className="zstat">
                  <span>Return on Ad Spend</span>
                  <b>{selected.roas}</b>
                </div>
              </div>

              <div className="zlead-section">
                <h3>Funnel Progression</h3>
                <div className="zfunnel-steps">
                  {selected.funnelStages.map((s, idx) => (
                    <div key={idx} className="zfunnel-step">
                      <span className="zstep-idx">0{idx + 1}</span>
                      <span className="zstep-name">{s.stage}</span>
                      <b className="zstep-rate">{s.rate}</b>
                    </div>
                  ))}
                </div>
              </div>

              <div className="zlead-section">
                <h3>Active Acquisition Channels</h3>
                <div className="zchannel-chips">
                  {selected.channels.map((ch, idx) => (
                    <span key={idx} className="zchannel-chip">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="zlead-section">
                <h3>Strategy & Implementation</h3>
                <p>{selected.overview}</p>
              </div>
            </div>

            <div className="zlead-sheet-foot">
              <a className="zlead-consult-btn" href={waHref} target="_blank" rel="noopener noreferrer">
                Launch My Lead Engine <ArrowUpRight />
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

.zlead-page{
  --cobalt:#2336FF; --paper:#F4F2FF; --ink:#0B0D2E; --coral:#FF6A4D; --sun:#FFD23F; --mint:#7CF2C0; --grey:#E4E5EB;
  min-height:100vh; background:var(--grey); color:var(--ink);
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
}
.zlead-page *{box-sizing:border-box}

/* header */
.zlead-head{position:relative; overflow:hidden; background:var(--cobalt); color:var(--paper); min-height:min(78vh,640px); display:flex; flex-direction:column; border-radius:0 0 32px 32px}
.zlead-rings{position:absolute; left:78%; top:55%; width:120vmax; height:120vmax; pointer-events:none; will-change:transform}
.zlead-rings span{position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(244,242,255,.14)}
.zlead-rings span:nth-child(2){inset:16%; border-style:dashed; border-color:rgba(244,242,255,.18)}
.zlead-rings span:nth-child(3){inset:32%; border-color:var(--sun)}
.zlead-rings span:nth-child(3)::after{content:""; position:absolute; top:-9px; left:50%; width:18px; height:18px; border-radius:50%; background:var(--coral)}

.zlead-navbar{position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zlead-logo{display:inline-flex; align-items:center; text-decoration:none}
.zlead-logo-img{height:clamp(28px, 4vw, 40px); width:auto; object-fit:contain; display:block}
.zlead-wa{color:var(--ink); background:var(--paper); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:transform .2s, background .2s}
.zlead-wa:hover{transform:translateY(-2px); background:var(--sun)}

.zlead-head-body{position:relative; z-index:2; margin-top:auto; padding:0 clamp(18px,4vw,48px) clamp(36px,6vw,72px); will-change:transform,opacity}
.zlead-back{display:inline-flex; align-items:center; gap:6px; color:var(--paper); text-decoration:none; font-weight:600; font-size:.92rem; opacity:.85; margin-bottom:clamp(14px,3vw,28px); padding:6px 12px 6px 8px; border-radius:999px; border:1.5px solid rgba(244,242,255,.3); transition:background .2s, opacity .2s}
.zlead-back:hover{background:rgba(244,242,255,.12); opacity:1}
.zlead-h1{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(3rem,11vw,9.5rem); max-width:12ch; font-variation-settings:'opsz' 96}
.zlead-word{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.08em; margin-right:0.28em}
.zlead-word:last-child{margin-right:0}
.zlead-word>span{display:inline-block; transform:translateY(110%); animation:zleadRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zleadRise{to{transform:none}}
.zlead-sub{margin:1.1rem 0 0; font-size:clamp(1rem,1.5vw,1.2rem); opacity:.85}

/* body */
.zlead-body{padding:clamp(28px,4vw,56px) clamp(16px,2.8vw,54px) clamp(40px,5vw,72px)}
.zlead-filters{display:flex; gap:10px; overflow-x:auto; scrollbar-width:none; padding-bottom:6px; margin-bottom:clamp(18px,2.4vw,32px)}
.zlead-filters::-webkit-scrollbar{display:none}
.zlead-filters button{flex:none; border:1.5px solid rgba(11,13,46,.25); background:transparent; color:var(--ink); font-weight:600; font-size:.95rem; padding:9px 18px; border-radius:999px; cursor:pointer; transition:background .2s, color .2s, border-color .2s}
.zlead-filters button:hover{border-color:var(--ink)}
.zlead-filters button.on{background:var(--ink); color:var(--paper); border-color:var(--ink)}

.zlead-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zlead-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zlead-grid{grid-template-columns:1fr} }

/* card */
.zlead-card{all:unset; box-sizing:border-box; cursor:pointer; background:#fff; color:var(--ink); border-radius:12px; padding:clamp(20px,2.4vw,28px); display:flex; flex-direction:column; justify-content:space-between; gap:22px; box-shadow:0 18px 40px -22px rgba(5,8,70,.35); transition:transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s}
.zlead-card:hover{transform:translateY(-6px); box-shadow:0 26px 50px -20px rgba(5,8,70,.5)}
.zlead-card:focus-visible{outline:3px solid var(--cobalt); outline-offset:4px}
.zlead-card-top{display:flex; justify-content:space-between; align-items:center}
.zlead-roas{background:var(--ink); color:var(--paper); font-weight:800; font-size:1.05rem; padding:4px 12px; border-radius:999px}
.zlead-delivered{font-weight:800; font-size:1.45rem; letter-spacing:-.02em; color:var(--cobalt)}

.zlead-mini-funnel{display:flex; flex-direction:column; gap:6px; padding:12px 0}
.f-bar{height:7px; border-radius:4px; transition:width .6s ease}
.f-bar.f1{width:100%}
.f-bar.f2{width:68%; background:color-mix(in srgb, var(--tone) 70%, #0B0D2E)}
.f-bar.f3{width:36%; background:var(--ink)}

.zlead-card-meta{display:flex; flex-direction:column; gap:8px}
.zlead-cpl-tag{font-size:.9rem; opacity:.75}
.zlead-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zlead-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zlead-kind{font-size:.88rem; opacity:.65}

/* closing strip */
.zlead-cta{background:var(--ink); color:var(--paper); border-radius:32px 32px 0 0; padding:clamp(40px,7vw,90px) clamp(18px,4vw,48px); display:flex; flex-wrap:wrap; gap:20px 40px; align-items:center; justify-content:space-between}
.zlead-cta h2{margin:0; font-weight:800; letter-spacing:-.04em; line-height:.95; font-size:clamp(2.2rem,7vw,5.5rem)}
.zlead-cta a{display:inline-flex; align-items:center; gap:8px; background:var(--sun); color:var(--ink); text-decoration:none; font-weight:600; padding:14px 26px; border-radius:999px; transition:transform .2s}
.zlead-cta a:hover{transform:translateY(-3px)}

/* modal */
.zlead-modal{position:fixed; inset:0; z-index:200; background:rgba(8,10,24,.82); backdrop-filter:blur(6px); display:grid; place-items:center; padding:16px; animation:zleadFade .25s ease}
@keyframes zleadFade{from{opacity:0}}
.zlead-sheet{width:min(680px,100%); background:#fff; color:var(--ink); border-radius:20px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 24px 60px rgba(0,0,0,0.4)}
.zlead-sheet-top{display:flex; justify-content:space-between; align-items:center; padding:20px 24px; border-bottom:1px solid rgba(11,13,46,0.1)}
.zlead-sheet-ind{font-size:1.3rem; letter-spacing:-.02em; display:block}
.zlead-sheet-kind{font-size:.9rem; opacity:.65}
.zlead-close{border:0; background:rgba(11,13,46,0.08); color:var(--ink); width:38px; height:38px; border-radius:50%; display:grid; place-items:center; cursor:pointer}
.zlead-close:hover{background:rgba(11,13,46,0.15)}
.zlead-sheet-body{padding:24px; display:flex; flex-direction:column; gap:22px}
.zlead-stats-row{display:grid; grid-template-columns:repeat(3,1fr); gap:12px; background:#F4F2FF; padding:16px; border-radius:12px}
.zstat span{font-size:.8rem; opacity:.65; display:block}
.zstat b{font-size:1.4rem; letter-spacing:-.02em}

.zlead-section h3{margin:0 0 10px; font-size:1.05rem; opacity:.85}
.zlead-section p{margin:0; opacity:.75; line-height:1.55; font-size:.95rem}

.zfunnel-steps{display:flex; flex-direction:column; gap:8px}
.zfunnel-step{display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:#F9F9FC; border-radius:8px; font-size:.92rem}
.zstep-idx{font-weight:700; color:var(--cobalt); font-size:.85rem}
.zstep-name{flex:1; margin-left:14px}
.zstep-rate{font-weight:700}

.zchannel-chips{display:flex; flex-wrap:wrap; gap:8px}
.zchannel-chip{background:rgba(35,54,255,0.1); color:var(--cobalt); font-weight:600; font-size:.85rem; padding:6px 14px; border-radius:999px}

.zlead-sheet-foot{padding:16px 24px 24px}
.zlead-consult-btn{display:inline-flex; width:100%; justify-content:center; align-items:center; gap:8px; background:var(--cobalt); color:#fff; text-decoration:none; font-weight:700; padding:14px; border-radius:999px; transition:transform .2s}
.zlead-consult-btn:hover{transform:translateY(-2px)}
`;
