"use client";

/**
 * Ziron Pro — Websites category page
 * ---------------------------------------------------------------
 * Route suggestion: /work/website-development  (matches the card link in <Categories />)
 *
 *  - Navy header that echoes the Websites card + hero rings
 *  - Industry filter chips (no client names — industries only)
 *  - Thumbnail grid: hover scrolls the screenshot like a real page
 *  - Click a thumbnail → live preview (desktop / mobile) + "Visit live site"
 *
 * Add your projects in PROJECTS below:
 *   image: path to a tall screenshot of the site (e.g. "/work/sites/realestate-1.jpg")
 *   url:   the live link
 * Until `image` is set, a colour-matched mock thumbnail is shown.
 *
 * Props
 *  - whatsappNumber: digits only with country code
 *  - backHref: where "All work" goes (the page with <Hero /> + <Categories />)
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  industry: string;
  kind: string; // e.g. "Corporate site", "E-commerce"
  url: string;
  tone: string; // placeholder colour until a screenshot is added
  image?: string;
};

const PROJECTS: Project[] = [
  { id: "w1", industry: "Real estate", kind: "Property showcase", url: "https://example.com", tone: "#2336FF" },
  { id: "w2", industry: "Healthcare", kind: "Clinic & booking", url: "https://example.com", tone: "#386B50" },
  { id: "w3", industry: "Retail", kind: "E-commerce store", url: "https://example.com", tone: "#B8452E" },
  { id: "w4", industry: "Hospitality", kind: "Restaurant & menu", url: "https://example.com", tone: "#2D1B33" },
  { id: "w5", industry: "Education", kind: "Course platform", url: "https://example.com", tone: "#FFD23F" },
  { id: "w6", industry: "Real estate", kind: "Developer landing page", url: "https://example.com", tone: "#1F2A55" },
  { id: "w7", industry: "Retail", kind: "Brand catalogue", url: "https://example.com", tone: "#FF6A4D" },
  { id: "w8", industry: "Healthcare", kind: "Hospital website", url: "https://example.com", tone: "#7CF2C0" },
  { id: "w9", industry: "Hospitality", kind: "Hotel & stays", url: "https://example.com", tone: "#1D1A20" },
];

type Props = {
  whatsappNumber?: string;
  backHref?: string;
};

/* ---------- small pieces ---------- */
const Mark = () => (
  <svg viewBox="0 0 40 28" width="30" height="21" aria-hidden="true">
    <path d="M3 3h30L10 25h27" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" />
  </svg>
);

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Mock: React.FC<{ tone: string }> = ({ tone }) => (
  <div className="zw-mock" style={{ ["--tone" as string]: tone }} aria-hidden="true">
    <div className="zw-mock-bar"><i /><i /><i /></div>
    <div className="zw-mock-page">
      <div className="m-hero" />
      <div className="m-row"><b /><b /><b /></div>
      <div className="m-line" />
      <div className="m-line s" />
      <div className="m-row"><b /><b /></div>
      <div className="m-hero b" />
    </div>
  </div>
);

/* ---------- card ---------- */
const Card: React.FC<{ p: Project; i: number; onOpen: (p: Project) => void }> = ({ p, i, onOpen }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={`zw-card ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`Preview ${p.industry} website`}
    >
      <span className="zw-shot">
        {p.image ? <img src={p.image} alt="" loading="lazy" /> : <Mock tone={p.tone} />}
        <span className="zw-view">
          View <ArrowUpRight />
        </span>
      </span>
      <span className="zw-cap">
        <span className="zw-ind">{p.industry}</span>
        <span className="zw-kind">{p.kind}</span>
      </span>
    </button>
  );
};

/* ---------- preview modal ---------- */
const Preview: React.FC<{ p: Project; onClose: () => void }> = ({ p, onClose }) => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="zw-modal" role="dialog" aria-modal="true" aria-label={`${p.industry} website preview`} onClick={onClose}>
      <div className="zw-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="zw-sheet-top">
          <div className="zw-sheet-title">
            <b>{p.industry}</b>
            <span>{p.kind}</span>
          </div>

          <div className="zw-toggle" role="group" aria-label="Preview size">
            <button type="button" className={device === "desktop" ? "on" : ""} onClick={() => setDevice("desktop")}>Desktop</button>
            <button type="button" className={device === "mobile" ? "on" : ""} onClick={() => setDevice("mobile")}>Mobile</button>
          </div>

          <a className="zw-visit" href={p.url} target="_blank" rel="noopener noreferrer">
            Visit live site <ArrowUpRight />
          </a>
          <button ref={closeRef} type="button" className="zw-close" onClick={onClose} aria-label="Close preview">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="zw-stage">
          <div className={`zw-frame ${device}`}>
            {!loaded && <div className="zw-loading"><span /></div>}
            <iframe
              key={device + p.id}
              src={p.url}
              title={`${p.industry} live website`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>

        <p className="zw-note">Preview not loading? Some sites block embedding. Use “Visit live site”.</p>
      </div>
    </div>
  );
};

/* ---------- page ---------- */
export default function WebsitesPage({ whatsappNumber = "910000000000", backHref = "/" }: Props) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const industries = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.industry)))], []);
  const shown = useMemo(() => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.industry === filter)), [filter]);
  const close = useCallback(() => setOpen(null), []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Ziron Pro, I'd like a website.")}`;
  const words = ["Websites", "that", "work", "for", "you."];

  return (
    <main className="zw-page">
      <style>{CSS}</style>

      {/* header */}
      <header className="zw-head">
        <div className="zw-rings" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotate(${y * 0.12}deg)` }}>
          <span /><span /><span />
        </div>

        <nav className="zw-nav">
          <a className="zw-logo" href={backHref} aria-label="Ziron Pro home">
            <img src="/logo/logo-white.png" alt="Ziron Pro" className="zw-logo-img" />
          </a>
          <a className="zw-wa" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </nav>

        <div className="zw-head-body" style={{ transform: `translateY(${Math.min(y, 400) * 0.25}px)`, opacity: 1 - Math.min(y / 520, 1) }}>
          <a className="zw-back" href={backHref}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All work
          </a>
          <h1 className="zw-h1">
            {words.map((w, i) => (
              <span className="zw-word" key={i}>
                <span style={{ animationDelay: `${0.1 + i * 0.09}s` }}>{w}</span>{" "}
              </span>
            ))}
          </h1>
          <p className="zw-sub">Live sites. Tap any to preview.</p>
        </div>
      </header>

      {/* grid */}
      <section className="zw-body" aria-label="Website projects">
        <div className="zw-filters" role="tablist" aria-label="Filter by industry">
          {industries.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={filter === f ? "on" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="zw-grid">
          {shown.map((p, i) => (
            <Card key={filter + p.id} p={p} i={i} onOpen={setOpen} />
          ))}
        </div>
      </section>

      {/* closing strip */}
      <section className="zw-cta">
        <h2>Let’s build yours.</h2>
        <a href={waHref} target="_blank" rel="noopener noreferrer">
          Chat on WhatsApp <ArrowUpRight />
        </a>
      </section>

      {open && <Preview p={open} onClose={close} />}
    </main>
  );
}

/* ---------- styles ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.zw-page{
  --cobalt:#2336FF; --paper:#F4F2FF; --ink:#0B0D2E; --coral:#FF6A4D; --sun:#FFD23F; --mint:#7CF2C0; --navy:#1F2A55; --grey:#E4E5EB;
  min-height:100vh; background:var(--grey); color:var(--ink);
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
}
.zw-page *{box-sizing:border-box}
.zw-page button{font-family:inherit}

/* header */
.zw-head{position:relative; overflow:hidden; background:var(--navy); color:var(--paper); min-height:min(78vh,640px); display:flex; flex-direction:column; border-radius:0 0 32px 32px}
.zw-rings{position:absolute; left:78%; top:55%; width:120vmax; height:120vmax; pointer-events:none; will-change:transform}
.zw-rings span{position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(244,242,255,.12)}
.zw-rings span:nth-child(2){inset:16%; border-style:dashed; border-color:rgba(244,242,255,.16)}
.zw-rings span:nth-child(3){inset:32%; border-color:rgba(255,106,77,.5)}
.zw-rings span:nth-child(3)::after{content:""; position:absolute; top:-9px; left:50%; width:18px; height:18px; border-radius:50%; background:var(--sun)}

.zw-nav{position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zw-logo{display:inline-flex; align-items:center; text-decoration:none}
.zw-logo-img{height:clamp(28px, 4vw, 40px); width:auto; object-fit:contain; display:block}
.zw-wa{color:var(--ink); background:var(--paper); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:transform .2s, background .2s}
.zw-wa:hover{transform:translateY(-2px); background:var(--sun)}

.zw-head-body{position:relative; z-index:2; margin-top:auto; padding:0 clamp(18px,4vw,48px) clamp(36px,6vw,72px); will-change:transform,opacity}
.zw-back{display:inline-flex; align-items:center; gap:6px; color:var(--paper); text-decoration:none; font-weight:600; font-size:.92rem; opacity:.85; margin-bottom:clamp(14px,3vw,28px); padding:6px 12px 6px 8px; border-radius:999px; border:1.5px solid rgba(244,242,255,.3); transition:background .2s, opacity .2s}
.zw-back:hover{background:rgba(244,242,255,.12); opacity:1}
.zw-h1{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(3rem,11vw,9.5rem); max-width:12ch; font-variation-settings:'opsz' 96}
.zw-word{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.08em; margin-right:0.28em}
.zw-word:last-child{margin-right:0}
.zw-word>span{display:inline-block; transform:translateY(110%); animation:zwRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zwRise{to{transform:none}}
.zw-sub{margin:1.1rem 0 0; font-size:clamp(1rem,1.5vw,1.2rem); opacity:.85}

/* body */
.zw-body{padding:clamp(28px,4vw,56px) clamp(16px,2.8vw,54px) clamp(40px,5vw,72px)}
.zw-filters{display:flex; gap:10px; overflow-x:auto; scrollbar-width:none; padding-bottom:6px; margin-bottom:clamp(18px,2.4vw,32px)}
.zw-filters::-webkit-scrollbar{display:none}
.zw-filters button{flex:none; border:1.5px solid rgba(11,13,46,.25); background:transparent; color:var(--ink); font-weight:600; font-size:.95rem; padding:9px 18px; border-radius:999px; cursor:pointer; transition:background .2s, color .2s, border-color .2s}
.zw-filters button:hover{border-color:var(--ink)}
.zw-filters button.on{background:var(--ink); color:var(--paper); border-color:var(--ink)}
.zw-filters button:focus-visible{outline:3px solid var(--cobalt); outline-offset:2px}

.zw-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zw-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zw-grid{grid-template-columns:1fr} }

/* card */
.zw-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px; opacity:0; transform:translateY(50px); transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1); transition-delay:var(--d)}
.zw-card.in{opacity:1; transform:none}
.zw-card:focus-visible{outline:3px solid var(--cobalt); outline-offset:4px}
.zw-shot{position:relative; display:block; aspect-ratio:4/3; overflow:hidden; background:#fff; border-radius:6px; box-shadow:0 18px 40px -22px rgba(5,8,70,.5); transition:transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s}
.zw-card:hover .zw-shot{transform:translateY(-6px); box-shadow:0 28px 50px -22px rgba(5,8,70,.6)}
.zw-shot img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 0; transition:object-position 3.2s cubic-bezier(.4,0,.2,1)}
.zw-card:hover .zw-shot img{object-position:50% 100%}

.zw-view{position:absolute; right:12px; bottom:12px; display:inline-flex; align-items:center; gap:6px; background:var(--ink); color:var(--paper); font-weight:600; font-size:.9rem; padding:8px 14px; border-radius:999px; opacity:0; transform:translateY(8px); transition:opacity .3s, transform .3s}
.zw-card:hover .zw-view, .zw-card:focus-visible .zw-view{opacity:1; transform:none}
@media (hover:none){ .zw-view{opacity:1; transform:none} }

.zw-cap{display:flex; justify-content:space-between; align-items:baseline; gap:12px}
.zw-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zw-kind{font-size:.92rem; opacity:.65}

/* mock thumbnail */
.zw-mock{position:absolute; inset:0; background:color-mix(in srgb, var(--tone) 14%, #fff); display:flex; flex-direction:column}
.zw-mock-bar{flex:none; height:11%; background:#fff; display:flex; align-items:center; gap:5px; padding:0 4%; border-bottom:1.5px solid rgba(11,13,46,.12)}
.zw-mock-bar i{width:7px; height:7px; border-radius:50%; background:rgba(11,13,46,.25)}
.zw-mock-page{display:grid; gap:7%; padding:5%; transition:transform 3s cubic-bezier(.4,0,.2,1)}
.zw-card:hover .zw-mock-page{transform:translateY(-38%)}
.m-hero{height:clamp(70px,13vw,150px); border-radius:8px; background:var(--tone)}
.m-hero.b{background:color-mix(in srgb, var(--tone) 55%, #0B0D2E)}
.m-row{display:flex; gap:5%}
.m-row b{flex:1; height:clamp(36px,6vw,70px); border-radius:6px; background:rgba(11,13,46,.12)}
.m-line{height:10px; width:70%; border-radius:5px; background:rgba(11,13,46,.2)}
.m-line.s{width:42%}

/* closing strip */
.zw-cta{background:var(--cobalt); color:var(--paper); border-radius:32px 32px 0 0; padding:clamp(40px,7vw,90px) clamp(18px,4vw,48px); display:flex; flex-wrap:wrap; gap:20px 40px; align-items:center; justify-content:space-between}
.zw-cta h2{margin:0; font-weight:800; letter-spacing:-.04em; line-height:.95; font-size:clamp(2.2rem,7vw,5.5rem)}
.zw-cta a{display:inline-flex; align-items:center; gap:8px; background:var(--sun); color:var(--ink); text-decoration:none; font-weight:600; padding:14px 26px; border-radius:999px; transition:transform .2s}
.zw-cta a:hover{transform:translateY(-3px)}
.zw-cta a:focus-visible, .zw-wa:focus-visible, .zw-back:focus-visible, .zw-logo:focus-visible{outline:3px solid var(--sun); outline-offset:3px}

/* modal */
.zw-modal{position:fixed; inset:0; z-index:200; background:rgba(8,10,44,.72); backdrop-filter:blur(6px); display:grid; place-items:center; padding:clamp(8px,2vw,28px); animation:zwFade .25s ease}
@keyframes zwFade{from{opacity:0}}
.zw-sheet{width:min(1280px,100%); height:min(860px,100%); background:var(--grey); border-radius:20px; display:flex; flex-direction:column; overflow:hidden; animation:zwPop .4s cubic-bezier(.2,.8,.2,1)}
@keyframes zwPop{from{transform:translateY(30px) scale(.97); opacity:0}}
.zw-sheet-top{flex:none; display:flex; align-items:center; gap:12px; padding:12px 14px 12px 20px; flex-wrap:wrap}
.zw-sheet-title{display:flex; flex-direction:column; margin-right:auto; line-height:1.15}
.zw-sheet-title b{font-size:1.1rem; letter-spacing:-.02em}
.zw-sheet-title span{font-size:.85rem; opacity:.65}
.zw-toggle{display:flex; background:rgba(11,13,46,.08); border-radius:999px; padding:3px}
.zw-toggle button{border:0; background:transparent; font-weight:600; font-size:.88rem; padding:7px 14px; border-radius:999px; cursor:pointer; color:var(--ink)}
.zw-toggle button.on{background:var(--ink); color:var(--paper)}
@media (max-width:640px){ .zw-toggle{display:none} }
.zw-visit{display:inline-flex; align-items:center; gap:6px; background:var(--cobalt); color:#fff; text-decoration:none; font-weight:600; font-size:.92rem; padding:10px 16px; border-radius:999px}
.zw-close{border:0; background:rgba(11,13,46,.08); width:38px; height:38px; border-radius:50%; display:grid; place-items:center; cursor:pointer; color:var(--ink)}
.zw-close:hover{background:rgba(11,13,46,.16)}
.zw-visit:focus-visible, .zw-close:focus-visible, .zw-toggle button:focus-visible{outline:3px solid var(--sun); outline-offset:2px}

.zw-stage{flex:1; min-height:0; display:grid; place-items:center; padding:0 clamp(8px,1.4vw,18px)}
.zw-frame{position:relative; height:100%; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 18px 40px -20px rgba(5,8,70,.5); transition:width .5s cubic-bezier(.2,.8,.2,1)}
.zw-frame.desktop{width:100%}
.zw-frame.mobile{width:min(390px,100%)}
.zw-frame iframe{position:absolute; inset:0; width:100%; height:100%; border:0}
.zw-loading{position:absolute; inset:0; display:grid; place-items:center; background:#fff; z-index:1}
.zw-loading span{width:34px; height:34px; border-radius:50%; border:3px solid rgba(11,13,46,.15); border-top-color:var(--cobalt); animation:zwSpin .8s linear infinite}
@keyframes zwSpin{to{transform:rotate(360deg)}}
.zw-note{flex:none; margin:0; padding:10px 20px 14px; font-size:.82rem; opacity:.6; text-align:center}

@media (prefers-reduced-motion: reduce){
  .zw-word>span{animation:none; transform:none}
  .zw-card{opacity:1; transform:none; transition:none}
  .zw-shot img, .zw-mock-page, .zw-shot{transition:none}
  .zw-modal, .zw-sheet, .zw-loading span{animation:none}
}
`;