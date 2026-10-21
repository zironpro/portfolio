"use client";

/**
 * Ziron Pro — Branding category page
 * ---------------------------------------------------------------
 * Route suggestion: /work/branding  (matches the Branding card in <Categories />)
 *
 *  - Green header (same colour as the Branding card) with the hero rings
 *  - Industry filter chips (industries only — no client names)
 *  - Masonry gallery of brand identities; hover swaps to a second view
 *  - Click → full-screen gallery: arrows, keyboard, swipe, thumbnail strip
 *
 * Add your projects in PROJECTS below. For each, set `images`:
 *   images: [{ src: "/work/brand/cafe-1.jpg", label: "Logo" }, ...]
 * The first image is the cover, the second shows on hover.
 * Until `images` is set, colour-matched placeholder boards are shown.
 *
 * Props
 *  - whatsappNumber: digits only with country code
 *  - backHref: page with <Hero /> + <Categories />
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Shot = { src: string; label: string };
type Shape = "circle" | "square" | "tri" | "arch";

type Project = {
  id: string;
  industry: string;
  kind: string;
  tone: string;
  shape: Shape;
  ratio: string; // card shape for the masonry: "4/5", "1/1", "4/3"
  images?: Shot[];
};

const PROJECTS: Project[] = [
  { id: "b1", industry: "Café", kind: "Logo & identity", tone: "#386B50", shape: "circle", ratio: "4/5" },
  { id: "b2", industry: "Fashion", kind: "Brand system", tone: "#FF6A4D", shape: "arch", ratio: "1/1" },
  { id: "b3", industry: "Real estate", kind: "Logo & stationery", tone: "#1F2A55", shape: "square", ratio: "4/3" },
  { id: "b4", industry: "Healthcare", kind: "Identity refresh", tone: "#2336FF", shape: "tri", ratio: "1/1" },
  { id: "b5", industry: "Café", kind: "Packaging & logo", tone: "#B8452E", shape: "arch", ratio: "4/3" },
  { id: "b6", industry: "Startup", kind: "Visual identity", tone: "#2D1B33", shape: "circle", ratio: "4/5" },
  { id: "b7", industry: "Fashion", kind: "Logo & lookbook", tone: "#1D1A20", shape: "tri", ratio: "4/3" },
  { id: "b8", industry: "Startup", kind: "Brand guidelines", tone: "#7CB518", shape: "square", ratio: "4/5" },
];

type Props = { whatsappNumber?: string; backHref?: string };

/* ---------- icons ---------- */
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
const Chevron: React.FC<{ dir: "l" | "r" }> = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- placeholder boards (used until real images are added) ---------- */
const kinds = ["Logo", "Palette", "Stationery", "Pattern"] as const;

const Board: React.FC<{ p: Project; kind: (typeof kinds)[number] }> = ({ p, kind }) => {
  const style = { ["--tone" as string]: p.tone } as React.CSSProperties;
  return (
    <div className={`zb-board ${kind.toLowerCase()}`} style={style} aria-hidden="true">
      {kind === "Logo" && (
        <>
          <div className={`zb-mark ${p.shape}`} />
          <div className="zb-word"><i /><i /></div>
        </>
      )}
      {kind === "Palette" && (
        <div className="zb-swatches">
          <b style={{ background: p.tone }} />
          <b style={{ background: `color-mix(in srgb, ${p.tone} 55%, #fff)` }} />
          <b style={{ background: `color-mix(in srgb, ${p.tone} 55%, #0B0D2E)` }} />
          <b style={{ background: "#F4F2FF" }} />
          <b style={{ background: "#FFD23F" }} />
        </div>
      )}
      {kind === "Stationery" && (
        <>
          <div className="zb-sheet a"><div className={`zb-mark sm ${p.shape}`} /><i /><i /><i /></div>
          <div className="zb-sheet b"><div className={`zb-mark sm ${p.shape}`} /></div>
        </>
      )}
      {kind === "Pattern" && (
        <div className="zb-pattern">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={`zb-mark xs ${p.shape}`} />
          ))}
        </div>
      )}
    </div>
  );
};

/** What a project shows: real images if provided, else 4 placeholder boards. */
type Slide = { label: string; src?: string; kind?: (typeof kinds)[number] };
const slidesOf = (p: Project): Slide[] =>
  p.images?.length ? p.images.map((s) => ({ label: s.label, src: s.src })) : kinds.map((k) => ({ label: k, kind: k }));

const SlideView: React.FC<{ p: Project; s: Slide; contain?: boolean }> = ({ p, s, contain }) =>
  s.src ? <img src={s.src} alt="" loading="lazy" style={{ objectFit: contain ? "contain" : "cover" }} /> : <Board p={p} kind={s.kind!} />;

/* ---------- card ---------- */
const Card: React.FC<{ p: Project; onOpen: (p: Project) => void }> = ({ p, onOpen }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [seen, setSeen] = useState(false);
  const slides = slidesOf(p);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={`zb-card ${seen ? "in" : ""}`}
      onClick={() => onOpen(p)}
      aria-label={`Open ${p.industry} branding gallery`}
    >
      <span className="zb-cover" style={{ aspectRatio: p.ratio }}>
        <span className="zb-layer a"><SlideView p={p} s={slides[0]} /></span>
        <span className="zb-layer b"><SlideView p={p} s={slides[Math.min(1, slides.length - 1)]} /></span>
        <span className="zb-count">{slides.length}</span>
      </span>
      <span className="zb-cap">
        <span className="zb-ind">{p.industry}</span>
        <span className="zb-kind">{p.kind}</span>
      </span>
    </button>
  );
};

/* ---------- lightbox ---------- */
const Lightbox: React.FC<{ p: Project; onClose: () => void }> = ({ p, onClose }) => {
  const slides = slidesOf(p);
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);

  const go = useCallback((d: number) => setI((v) => (v + d + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  return (
    <div
      className="zb-lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.industry} branding gallery`}
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="zb-lb-top" onClick={(e) => e.stopPropagation()}>
        <div className="zb-lb-title">
          <b>{p.industry}</b>
          <span>{p.kind}</span>
        </div>
        <span className="zb-lb-count">{i + 1} / {slides.length}</span>
        <button type="button" className="zb-x" onClick={onClose} aria-label="Close gallery">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div className="zb-lb-main" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="zb-nav l" onClick={() => go(-1)} aria-label="Previous"><Chevron dir="l" /></button>
        <div className="zb-lb-slide" key={i}>
          <SlideView p={p} s={slides[i]} contain />
          <span className="zb-lb-label">{slides[i].label}</span>
        </div>
        <button type="button" className="zb-nav r" onClick={() => go(1)} aria-label="Next"><Chevron dir="r" /></button>
      </div>

      <div className="zb-strip" onClick={(e) => e.stopPropagation()}>
        {slides.map((s, n) => (
          <button key={n} type="button" className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={`Show ${s.label}`}>
            <SlideView p={p} s={s} />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ---------- page ---------- */
export default function BrandingPage({ whatsappNumber = "910000000000", backHref = "/" }: Props) {
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

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Ziron Pro, I'd like a brand identity.")}`;
  const words = ["Brands", "people", "remember."];

  return (
    <main className="zb-page">
      <style>{CSS}</style>

      <header className="zb-head">
        <div className="zb-rings" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotate(${y * 0.12}deg)` }}>
          <span /><span /><span />
        </div>

        <nav className="zb-nav-bar">
          <a className="zb-logo" href={backHref} aria-label="Ziron Pro home">
            <img src="/logo/logo-white.png" alt="Ziron Pro" className="zb-logo-img" />
          </a>
          <a className="zb-wa" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </nav>

        <div className="zb-head-body" style={{ transform: `translateY(${Math.min(y, 400) * 0.25}px)`, opacity: 1 - Math.min(y / 520, 1) }}>
          <a className="zb-back" href={backHref}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All work
          </a>
          <h1 className="zb-h1">
            {words.map((w, n) => (
              <span className="zb-word-wrap" key={n}>
                <span style={{ animationDelay: `${0.1 + n * 0.1}s` }}>{w}</span>{" "}
              </span>
            ))}
          </h1>
          <p className="zb-sub">Logos and identities. Tap any to open the gallery.</p>
        </div>
      </header>

      <section className="zb-body" aria-label="Branding projects">
        <div className="zb-filters" role="tablist" aria-label="Filter by industry">
          {industries.map((f) => (
            <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="zb-masonry">
          {shown.map((p) => (
            <Card key={filter + p.id} p={p} onOpen={setOpen} />
          ))}
        </div>
      </section>

      <section className="zb-cta">
        <h2>Let’s name your look.</h2>
        <a href={waHref} target="_blank" rel="noopener noreferrer">Chat on WhatsApp <ArrowUpRight /></a>
      </section>

      {open && <Lightbox p={open} onClose={close} />}
    </main>
  );
}

/* ---------- styles ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.zb-page{
  --cobalt:#2336FF; --paper:#F4F2FF; --ink:#0B0D2E; --coral:#FF6A4D; --sun:#FFD23F; --green:#386B50; --grey:#E4E5EB;
  min-height:100vh; background:var(--grey); color:var(--ink);
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
}
.zb-page *{box-sizing:border-box}
.zb-page button{font-family:inherit}

/* header */
.zb-head{position:relative; overflow:hidden; background:var(--green); color:var(--paper); min-height:min(78vh,640px); display:flex; flex-direction:column; border-radius:0 0 32px 32px}
.zb-rings{position:absolute; left:78%; top:55%; width:120vmax; height:120vmax; pointer-events:none; will-change:transform}
.zb-rings span{position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(244,242,255,.14)}
.zb-rings span:nth-child(2){inset:16%; border-style:dashed; border-color:rgba(244,242,255,.18)}
.zb-rings span:nth-child(3){inset:32%; border-color:rgba(255,210,63,.6)}
.zb-rings span:nth-child(3)::after{content:""; position:absolute; top:-9px; left:50%; width:18px; height:18px; border-radius:50%; background:var(--coral)}

.zb-nav-bar{position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zb-logo{display:inline-flex; align-items:center; text-decoration:none}
.zb-logo-img{height:clamp(28px, 4vw, 40px); width:auto; object-fit:contain; display:block}
.zb-wa{color:var(--ink); background:var(--paper); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:transform .2s, background .2s}
.zb-wa:hover{transform:translateY(-2px); background:var(--sun)}

.zb-head-body{position:relative; z-index:2; margin-top:auto; padding:0 clamp(18px,4vw,48px) clamp(36px,6vw,72px); will-change:transform,opacity}
.zb-back{display:inline-flex; align-items:center; gap:6px; color:var(--paper); text-decoration:none; font-weight:600; font-size:.92rem; opacity:.85; margin-bottom:clamp(14px,3vw,28px); padding:6px 12px 6px 8px; border-radius:999px; border:1.5px solid rgba(244,242,255,.3); transition:background .2s, opacity .2s}
.zb-back:hover{background:rgba(244,242,255,.12); opacity:1}
.zb-h1{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(3rem,11vw,9.5rem); max-width:11ch; font-variation-settings:'opsz' 96}
.zb-word-wrap{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.08em; margin-right:0.28em}
.zb-word-wrap:last-child{margin-right:0}
.zb-word-wrap>span{display:inline-block; transform:translateY(110%); animation:zbRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zbRise{to{transform:none}}
.zb-sub{margin:1.1rem 0 0; font-size:clamp(1rem,1.5vw,1.2rem); opacity:.85}

/* body */
.zb-body{padding:clamp(28px,4vw,56px) clamp(16px,2.8vw,54px) clamp(40px,5vw,72px)}
.zb-filters{display:flex; gap:10px; overflow-x:auto; scrollbar-width:none; padding-bottom:6px; margin-bottom:clamp(18px,2.4vw,32px)}
.zb-filters::-webkit-scrollbar{display:none}
.zb-filters button{flex:none; border:1.5px solid rgba(11,13,46,.25); background:transparent; color:var(--ink); font-weight:600; font-size:.95rem; padding:9px 18px; border-radius:999px; cursor:pointer; transition:background .2s, color .2s, border-color .2s}
.zb-filters button:hover{border-color:var(--ink)}
.zb-filters button.on{background:var(--ink); color:var(--paper); border-color:var(--ink)}
.zb-filters button:focus-visible{outline:3px solid var(--cobalt); outline-offset:2px}

/* masonry */
.zb-masonry{column-count:3; column-gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zb-masonry{column-count:2} }
@media (max-width:520px){ .zb-masonry{column-count:1} }

.zb-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px; width:100%; break-inside:avoid; margin-bottom:clamp(18px,2.2vw,34px); opacity:0; transform:translateY(50px); transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)}
.zb-card.in{opacity:1; transform:none}
.zb-card:focus-visible{outline:3px solid var(--cobalt); outline-offset:4px}
.zb-cover{position:relative; display:block; width:100%; overflow:hidden; background:#fff; border-radius:6px; box-shadow:0 18px 40px -22px rgba(5,8,70,.5); transition:transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s}
.zb-card:hover .zb-cover{transform:translateY(-6px); box-shadow:0 28px 50px -22px rgba(5,8,70,.6)}
.zb-layer{position:absolute; inset:0; display:block; transition:opacity .5s ease, transform .9s cubic-bezier(.2,.8,.2,1)}
.zb-layer img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover}
.zb-layer.b{opacity:0; transform:scale(1.06)}
.zb-card:hover .zb-layer.b, .zb-card:focus-visible .zb-layer.b{opacity:1; transform:none}
.zb-card:hover .zb-layer.a{transform:scale(1.04)}
.zb-count{position:absolute; right:12px; bottom:12px; z-index:2; background:var(--ink); color:var(--paper); font-weight:600; font-size:.82rem; min-width:30px; height:30px; padding:0 10px; border-radius:999px; display:grid; place-items:center}
.zb-cap{display:flex; justify-content:space-between; align-items:baseline; gap:12px}
.zb-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zb-kind{font-size:.92rem; opacity:.65}

/* placeholder boards */
.zb-board{position:absolute; inset:0; display:grid; place-items:center; overflow:hidden}
.zb-board.logo{background:color-mix(in srgb, var(--tone) 12%, #fff); align-content:center; gap:7%}
.zb-board.palette{background:#fff}
.zb-board.stationery{background:color-mix(in srgb, var(--tone) 30%, #E4E5EB)}
.zb-board.pattern{background:var(--tone)}

.zb-mark{width:34%; aspect-ratio:1; background:var(--tone); display:block}
.zb-mark.circle{border-radius:50%}
.zb-mark.square{border-radius:18%; transform:rotate(12deg)}
.zb-mark.tri{clip-path:polygon(50% 4%,96% 92%,4% 92%)}
.zb-mark.arch{border-radius:50% 50% 8% 8%}
.zb-mark.sm{width:16%}
.zb-mark.xs{width:100%; background:rgba(255,255,255,.88)}
.zb-word{display:grid; gap:6px; justify-items:center; width:40%}
.zb-word i{display:block; height:9px; width:100%; border-radius:5px; background:var(--tone)}
.zb-word i+i{width:60%; height:6px; opacity:.45}

.zb-swatches{position:absolute; inset:0; display:flex}
.zb-swatches b{flex:1; transition:flex .6s cubic-bezier(.2,.8,.2,1)}
.zb-swatches b:first-child{flex:2.2}

.zb-sheet{position:absolute; background:#fff; box-shadow:0 14px 30px -14px rgba(5,8,70,.5); padding:5%; display:grid; gap:7px; align-content:start; justify-items:start}
.zb-sheet.a{width:46%; aspect-ratio:.72; left:12%; top:10%; transform:rotate(-6deg)}
.zb-sheet.b{width:44%; aspect-ratio:1.6; right:9%; bottom:12%; transform:rotate(5deg); place-items:center; background:var(--tone)}
.zb-sheet.b .zb-mark{background:#fff}
.zb-sheet i{display:block; height:5px; width:80%; background:rgba(11,13,46,.18); border-radius:3px}
.zb-sheet i+i{width:55%}

.zb-pattern{position:absolute; inset:0; display:grid; grid-template-columns:repeat(5,1fr); gap:0; padding:6%; align-content:center; gap:9%}
.zb-pattern .zb-mark{width:70%; justify-self:center}
.zb-pattern .zb-mark:nth-child(even){opacity:.45}

/* closing strip */
.zb-cta{background:var(--cobalt); color:var(--paper); border-radius:32px 32px 0 0; padding:clamp(40px,7vw,90px) clamp(18px,4vw,48px); display:flex; flex-wrap:wrap; gap:20px 40px; align-items:center; justify-content:space-between}
.zb-cta h2{margin:0; font-weight:800; letter-spacing:-.04em; line-height:.95; font-size:clamp(2.2rem,7vw,5.5rem)}
.zb-cta a{display:inline-flex; align-items:center; gap:8px; background:var(--sun); color:var(--ink); text-decoration:none; font-weight:600; padding:14px 26px; border-radius:999px; transition:transform .2s}
.zb-cta a:hover{transform:translateY(-3px)}
.zb-cta a:focus-visible, .zb-wa:focus-visible, .zb-back:focus-visible, .zb-logo:focus-visible{outline:3px solid var(--sun); outline-offset:3px}

/* lightbox */
.zb-lb{position:fixed; inset:0; z-index:200; background:rgba(8,12,10,.92); backdrop-filter:blur(6px); color:var(--paper); display:flex; flex-direction:column; animation:zbFade .25s ease}
@keyframes zbFade{from{opacity:0}}
.zb-lb-top{flex:none; display:flex; align-items:center; gap:14px; padding:14px clamp(14px,3vw,32px)}
.zb-lb-title{display:flex; flex-direction:column; margin-right:auto; line-height:1.15}
.zb-lb-title b{font-size:1.15rem; letter-spacing:-.02em}
.zb-lb-title span{font-size:.85rem; opacity:.65}
.zb-lb-count{font-weight:600; font-size:.92rem; opacity:.8}
.zb-x{border:0; background:rgba(244,242,255,.12); color:var(--paper); width:40px; height:40px; border-radius:50%; display:grid; place-items:center; cursor:pointer}
.zb-x:hover{background:rgba(244,242,255,.22)}
.zb-lb-main{flex:1; min-height:0; display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:clamp(6px,2vw,24px); padding:0 clamp(8px,2vw,28px)}
.zb-nav{border:0; background:rgba(244,242,255,.12); color:var(--paper); width:48px; height:48px; border-radius:50%; display:grid; place-items:center; cursor:pointer; transition:background .2s, transform .2s}
.zb-nav:hover{background:var(--sun); color:var(--ink)}
.zb-nav.l:hover{transform:translateX(-3px)} .zb-nav.r:hover{transform:translateX(3px)}
@media (max-width:640px){ .zb-nav{width:38px; height:38px} }
.zb-lb-slide{position:relative; justify-self:center; width:min(100%, calc((100vh - 230px) * 1.333)); aspect-ratio:4/3; max-height:100%; background:#fff; border-radius:8px; overflow:hidden; animation:zbSlide .45s cubic-bezier(.2,.8,.2,1)}
@keyframes zbSlide{from{opacity:0; transform:translateX(24px) scale(.98)}}
.zb-lb-slide img{position:absolute; inset:0; width:100%; height:100%; background:#fff}
.zb-lb-label{position:absolute; left:14px; bottom:14px; background:var(--ink); color:var(--paper); font-weight:600; font-size:.85rem; padding:6px 14px; border-radius:999px; z-index:2}
.zb-strip{flex:none; display:flex; justify-content:center; gap:10px; padding:14px 14px 20px; overflow-x:auto}
.zb-strip button{all:unset; box-sizing:border-box; cursor:pointer; position:relative; flex:none; width:76px; height:56px; border-radius:6px; overflow:hidden; opacity:.5; outline:2px solid transparent; transition:opacity .2s, outline-color .2s}
.zb-strip button.on, .zb-strip button:hover{opacity:1}
.zb-strip button.on{outline-color:var(--sun)}
.zb-strip button img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover}
.zb-strip button:focus-visible, .zb-nav:focus-visible, .zb-x:focus-visible{outline:3px solid var(--sun); outline-offset:2px}

@media (prefers-reduced-motion: reduce){
  .zb-word-wrap>span{animation:none; transform:none}
  .zb-card{opacity:1; transform:none; transition:none}
  .zb-layer, .zb-cover{transition:none}
  .zb-lb, .zb-lb-slide{animation:none}
}
`;