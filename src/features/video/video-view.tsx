"use client";

/**
 * Ziron Pro — Videography & Editing category page
 * ---------------------------------------------------------------
 * Route suggestion: /work/videography-editing  (matches the Video card in <Categories />)
 *
 *  - Plum header (same colour as the Video card) with the hero rings
 *  - Filter chips by type (Ad film, Reel, Event, Product) — no client names
 *  - Featured film, then a grid of landscape films, then a row of vertical reels
 *  - Hover plays a silent preview; click opens a full player
 *
 * Add your videos in VIDEOS below. For each one set ONE of:
 *   src:   direct file, e.g. "/work/video/restaurant-ad.mp4"
 *   embed: YouTube / Vimeo embed URL, e.g. "https://www.youtube.com/embed/XXXX"
 * and a `poster` image (thumbnail). Until set, animated placeholders are shown.
 *
 * Props
 *  - whatsappNumber: digits only with country code
 *  - backHref: page with <Hero /> + <Categories />
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Video = {
  id: string;
  industry: string;
  kind: "Ad film" | "Reel" | "Event" | "Product";
  orientation: "landscape" | "portrait";
  duration: string;
  tone: string;
  src?: string;
  embed?: string;
  poster?: string;
};

const VIDEOS: Video[] = [
  { id: "v1", industry: "Hospitality", kind: "Ad film", orientation: "landscape", duration: "0:45", tone: "#FF6A4D" },
  { id: "v2", industry: "Real estate", kind: "Product", orientation: "landscape", duration: "1:20", tone: "#2336FF" },
  { id: "v3", industry: "Fashion", kind: "Ad film", orientation: "landscape", duration: "0:30", tone: "#B8452E" },
  { id: "v4", industry: "Healthcare", kind: "Event", orientation: "landscape", duration: "2:10", tone: "#386B50" },
  { id: "v5", industry: "Café", kind: "Reel", orientation: "portrait", duration: "0:15", tone: "#FFD23F" },
  { id: "v6", industry: "Fashion", kind: "Reel", orientation: "portrait", duration: "0:20", tone: "#7CF2C0" },
  { id: "v7", industry: "Real estate", kind: "Reel", orientation: "portrait", duration: "0:25", tone: "#5C7CFF" },
  { id: "v8", industry: "Retail", kind: "Reel", orientation: "portrait", duration: "0:18", tone: "#FF6A4D" },
  { id: "v9", industry: "Education", kind: "Event", orientation: "landscape", duration: "1:05", tone: "#1F2A55" },
];

type Props = { whatsappNumber?: string; backHref?: string };

/* ---------- icons ---------- */
const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlayIcon: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M8 5v14l11-7z" fill="currentColor" />
  </svg>
);

/* ---------- hooks ---------- */
function useSeen<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/* ---------- placeholder footage (until real videos are added) ---------- */
const Footage: React.FC<{ tone: string }> = ({ tone }) => (
  <div className="zv-footage" style={{ ["--tone" as string]: tone }} aria-hidden="true">
    <i /><i /><i />
    <div className="zv-timeline"><b /></div>
  </div>
);

/* ---------- thumbnail ---------- */
const Thumb: React.FC<{ v: Video; autoPlayPreview?: boolean }> = ({ v, autoPlayPreview }) => {
  const vid = useRef<HTMLVideoElement | null>(null);

  const start = () => vid.current?.play().catch(() => {});
  const stop = () => {
    const el = vid.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <span
      className="zv-media"
      onMouseEnter={start}
      onMouseLeave={stop}
      style={{ aspectRatio: v.orientation === "portrait" ? "9/16" : autoPlayPreview ? "21/9" : "16/9" }}
    >
      {v.poster ? <img src={v.poster} alt="" loading="lazy" /> : <Footage tone={v.tone} />}
      {v.src && (
        <video
          ref={vid}
          src={v.src}
          muted
          loop
          playsInline
          preload="none"
          autoPlay={autoPlayPreview}
          poster={v.poster}
        />
      )}
      <span className="zv-play"><PlayIcon /></span>
      <span className="zv-dur">{v.duration}</span>
    </span>
  );
};

/* ---------- card ---------- */
const Card: React.FC<{ v: Video; i: number; onOpen: (v: Video) => void; featured?: boolean }> = ({ v, i, onOpen, featured }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      className={`zv-card ${v.orientation} ${featured ? "featured" : ""} ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(v)}
      aria-label={`Play ${v.industry} ${v.kind}`}
    >
      <Thumb v={v} autoPlayPreview={featured} />
      <span className="zv-cap">
        <span className="zv-ind">{v.industry}</span>
        <span className="zv-kind">{v.kind}</span>
      </span>
    </button>
  );
};

/* ---------- player modal ---------- */
const Player: React.FC<{ v: Video; onClose: () => void }> = ({ v, onClose }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const embedSrc = v.embed ? `${v.embed}${v.embed.includes("?") ? "&" : "?"}autoplay=1&rel=0` : undefined;

  return (
    <div className="zv-modal" role="dialog" aria-modal="true" aria-label={`${v.industry} ${v.kind}`} onClick={onClose}>
      <div className="zv-modal-top" onClick={(e) => e.stopPropagation()}>
        <div className="zv-modal-title">
          <b>{v.industry}</b>
          <span>{v.kind}</span>
        </div>
        <button type="button" className="zv-x" onClick={onClose} aria-label="Close video">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div className={`zv-player ${v.orientation}`} onClick={(e) => e.stopPropagation()}>
        {v.src ? (
          <video src={v.src} poster={v.poster} controls autoPlay playsInline />
        ) : embedSrc ? (
          <iframe src={embedSrc} title={`${v.industry} ${v.kind}`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : (
          <>
            <Footage tone={v.tone} />
            <p className="zv-soon">Add this video’s <code>src</code> or <code>embed</code> link in <code>VIDEOS</code>.</p>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------- page ---------- */
export default function VideoPage({ whatsappNumber = "910000000000", backHref = "/" }: Props) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Video | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const kinds = useMemo(() => ["All", ...Array.from(new Set(VIDEOS.map((v) => v.kind)))], []);
  const list = useMemo(() => (filter === "All" ? VIDEOS : VIDEOS.filter((v) => v.kind === filter)), [filter]);
  const landscape = list.filter((v) => v.orientation === "landscape");
  const portrait = list.filter((v) => v.orientation === "portrait");
  const [featured, ...rest] = landscape;
  const close = useCallback(() => setOpen(null), []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Ziron Pro, I'd like a video made.")}`;
  const words = ["Stories", "worth", "watching."];

  return (
    <main className="zv-page">
      <style>{CSS}</style>

      <header className="zv-head">
        <div className="zv-rings" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotate(${y * 0.12}deg)` }}>
          <span /><span /><span />
        </div>

        <nav className="zv-navbar">
          <a className="zv-logo" href={backHref} aria-label="Ziron Pro home">
            <img src="/logo/logo-white.png" alt="Ziron Pro" className="zv-logo-img" />
          </a>
          <a className="zv-wa" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </nav>

        <div className="zv-head-body" style={{ transform: `translateY(${Math.min(y, 400) * 0.25}px)`, opacity: 1 - Math.min(y / 520, 1) }}>
          <a className="zv-back" href={backHref}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All work
          </a>
          <h1 className="zv-h1">
            {words.map((w, n) => (
              <span className="zv-wrap" key={n}>
                <span style={{ animationDelay: `${0.1 + n * 0.1}s` }}>{w}</span>{" "}
              </span>
            ))}
          </h1>
          <p className="zv-sub">Shot and cut to hold attention. Tap any to play.</p>
        </div>
      </header>

      <section className="zv-body" aria-label="Video projects">
        <div className="zv-filters" role="tablist" aria-label="Filter by type">
          {kinds.map((f) => (
            <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        {featured && (
          <div className="zv-featured">
            <Card key={filter + featured.id} v={featured} i={0} onOpen={setOpen} featured />
          </div>
        )}

        {rest.length > 0 && (
          <div className="zv-grid">
            {rest.map((v, i) => (
              <Card key={filter + v.id} v={v} i={i} onOpen={setOpen} />
            ))}
          </div>
        )}

        {portrait.length > 0 && (
          <>
            <h2 className="zv-sec">Reels</h2>
            <div className="zv-reels">
              {portrait.map((v, i) => (
                <Card key={filter + v.id} v={v} i={i} onOpen={setOpen} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="zv-cta">
        <h2>Let’s roll camera.</h2>
        <a href={waHref} target="_blank" rel="noopener noreferrer">Chat on WhatsApp <ArrowUpRight /></a>
      </section>

      {open && <Player v={open} onClose={close} />}
    </main>
  );
}

/* ---------- styles ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.zv-page{
  --cobalt:#2336FF; --paper:#F4F2FF; --ink:#0B0D2E; --coral:#FF6A4D; --sun:#FFD23F; --plum:#2D1B33; --grey:#E4E5EB;
  min-height:100vh; background:var(--grey); color:var(--ink);
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
}
.zv-page *{box-sizing:border-box}
.zv-page button{font-family:inherit}

/* header */
.zv-head{position:relative; overflow:hidden; background:var(--plum); color:var(--paper); min-height:min(78vh,640px); display:flex; flex-direction:column; border-radius:0 0 32px 32px}
.zv-rings{position:absolute; left:78%; top:55%; width:120vmax; height:120vmax; pointer-events:none; will-change:transform}
.zv-rings span{position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(244,242,255,.12)}
.zv-rings span:nth-child(2){inset:16%; border-style:dashed; border-color:rgba(244,242,255,.16)}
.zv-rings span:nth-child(3){inset:32%; border-color:rgba(255,106,77,.6)}
.zv-rings span:nth-child(3)::after{content:""; position:absolute; top:-9px; left:50%; width:18px; height:18px; border-radius:50%; background:var(--sun)}

.zv-navbar{position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zv-logo{display:inline-flex; align-items:center; text-decoration:none}
.zv-logo-img{height:clamp(28px, 4vw, 40px); width:auto; object-fit:contain; display:block}
.zv-wa{color:var(--ink); background:var(--paper); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:transform .2s, background .2s}
.zv-wa:hover{transform:translateY(-2px); background:var(--sun)}

.zv-head-body{position:relative; z-index:2; margin-top:auto; padding:0 clamp(18px,4vw,48px) clamp(36px,6vw,72px); will-change:transform,opacity}
.zv-back{display:inline-flex; align-items:center; gap:6px; color:var(--paper); text-decoration:none; font-weight:600; font-size:.92rem; opacity:.85; margin-bottom:clamp(14px,3vw,28px); padding:6px 12px 6px 8px; border-radius:999px; border:1.5px solid rgba(244,242,255,.3); transition:background .2s, opacity .2s}
.zv-back:hover{background:rgba(244,242,255,.12); opacity:1}
.zv-h1{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(3rem,11vw,9.5rem); max-width:10ch; font-variation-settings:'opsz' 96}
.zv-wrap{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.08em; margin-right:0.28em}
.zv-wrap:last-child{margin-right:0}
.zv-wrap>span{display:inline-block; transform:translateY(110%); animation:zvRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zvRise{to{transform:none}}
.zv-sub{margin:1.1rem 0 0; font-size:clamp(1rem,1.5vw,1.2rem); opacity:.85}

/* body */
.zv-body{padding:clamp(28px,4vw,56px) clamp(16px,2.8vw,54px) clamp(40px,5vw,72px)}
.zv-filters{display:flex; gap:10px; overflow-x:auto; scrollbar-width:none; padding-bottom:6px; margin-bottom:clamp(18px,2.4vw,32px)}
.zv-filters::-webkit-scrollbar{display:none}
.zv-filters button{flex:none; border:1.5px solid rgba(11,13,46,.25); background:transparent; color:var(--ink); font-weight:600; font-size:.95rem; padding:9px 18px; border-radius:999px; cursor:pointer; transition:background .2s, color .2s, border-color .2s}
.zv-filters button:hover{border-color:var(--ink)}
.zv-filters button.on{background:var(--ink); color:var(--paper); border-color:var(--ink)}
.zv-filters button:focus-visible{outline:3px solid var(--cobalt); outline-offset:2px}

.zv-featured{margin-bottom:clamp(18px,2.4vw,34px)}
.zv-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px); margin-bottom:clamp(8px,2vw,28px)}
@media (max-width:1000px){ .zv-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zv-grid{grid-template-columns:1fr} }

.zv-sec{margin:clamp(24px,4vw,48px) 0 clamp(14px,2vw,22px); font-weight:800; letter-spacing:-.03em; font-size:clamp(1.4rem,2.6vw,2rem); line-height:1}
.zv-reels{display:grid; grid-auto-flow:column; grid-auto-columns:clamp(150px,19vw,260px); gap:clamp(12px,1.6vw,26px); overflow-x:auto; scroll-snap-type:x proximity; scrollbar-width:none; padding-bottom:6px}
.zv-reels::-webkit-scrollbar{display:none}
.zv-reels .zv-card{scroll-snap-align:start}

/* card */
.zv-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px; width:100%; opacity:0; transform:translateY(50px); transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1); transition-delay:var(--d)}
.zv-card.in{opacity:1; transform:none}
.zv-card:focus-visible{outline:3px solid var(--cobalt); outline-offset:4px}
.zv-media{position:relative; display:block; width:100%; overflow:hidden; background:var(--plum); border-radius:6px; box-shadow:0 18px 40px -22px rgba(5,8,70,.55); transition:transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s}
.zv-card:hover .zv-media{transform:translateY(-6px); box-shadow:0 28px 50px -22px rgba(5,8,70,.65)}
.zv-media img, .zv-media video{position:absolute; inset:0; width:100%; height:100%; object-fit:cover}
.zv-media video{opacity:0; transition:opacity .4s}
.zv-card:hover .zv-media video, .zv-card.featured .zv-media video{opacity:1}

.zv-play{position:absolute; left:50%; top:50%; width:64px; height:64px; margin:-32px 0 0 -32px; border-radius:50%; background:var(--paper); color:var(--ink); display:grid; place-items:center; padding-left:4px; transition:transform .35s cubic-bezier(.3,1.6,.5,1), background .2s; z-index:2}
.zv-card:hover .zv-play{transform:scale(1.15); background:var(--sun)}
.zv-card.featured .zv-play{width:84px; height:84px; margin:-42px 0 0 -42px}
.zv-card.portrait .zv-play{width:50px; height:50px; margin:-25px 0 0 -25px}
.zv-dur{position:absolute; right:10px; bottom:10px; z-index:2; background:rgba(11,13,46,.82); color:var(--paper); font-weight:600; font-size:.8rem; padding:4px 10px; border-radius:999px}

.zv-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zv-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zv-kind{font-size:.92rem; opacity:.65; white-space:nowrap}
.zv-card.featured .zv-ind{font-size:clamp(1.3rem,2.4vw,1.9rem)}
.zv-card.portrait .zv-cap{flex-direction:column; gap:2px}

/* placeholder footage */
.zv-footage{position:absolute; inset:0; overflow:hidden; background:linear-gradient(135deg, color-mix(in srgb, var(--tone) 70%, #0B0D2E), #14091a)}
.zv-footage i{position:absolute; border-radius:50%; background:var(--tone); opacity:.55; filter:blur(2px); animation:zvDrift 9s ease-in-out infinite alternate}
.zv-footage i:nth-child(1){width:55%; aspect-ratio:1; left:-10%; top:-20%}
.zv-footage i:nth-child(2){width:38%; aspect-ratio:1; right:-6%; bottom:-14%; background:var(--paper); opacity:.18; animation-delay:-3s}
.zv-footage i:nth-child(3){width:22%; aspect-ratio:1; left:46%; top:22%; background:var(--sun); opacity:.35; animation-delay:-6s}
@keyframes zvDrift{to{transform:translate(18%,14%) scale(1.15)}}
.zv-timeline{position:absolute; left:6%; right:6%; bottom:9%; height:4px; border-radius:2px; background:rgba(244,242,255,.25); overflow:hidden}
.zv-timeline b{position:absolute; inset:0; width:100%; background:var(--paper); transform-origin:left; animation:zvScrub 6s linear infinite}
@keyframes zvScrub{from{transform:scaleX(0)} to{transform:scaleX(1)}}

/* closing strip */
.zv-cta{background:var(--cobalt); color:var(--paper); border-radius:32px 32px 0 0; padding:clamp(40px,7vw,90px) clamp(18px,4vw,48px); display:flex; flex-wrap:wrap; gap:20px 40px; align-items:center; justify-content:space-between}
.zv-cta h2{margin:0; font-weight:800; letter-spacing:-.04em; line-height:.95; font-size:clamp(2.2rem,7vw,5.5rem)}
.zv-cta a{display:inline-flex; align-items:center; gap:8px; background:var(--sun); color:var(--ink); text-decoration:none; font-weight:600; padding:14px 26px; border-radius:999px; transition:transform .2s}
.zv-cta a:hover{transform:translateY(-3px)}
.zv-cta a:focus-visible, .zv-wa:focus-visible, .zv-back:focus-visible, .zv-logo:focus-visible{outline:3px solid var(--sun); outline-offset:3px}

/* player */
.zv-modal{position:fixed; inset:0; z-index:200; background:rgba(14,6,18,.94); backdrop-filter:blur(6px); color:var(--paper); display:flex; flex-direction:column; align-items:center; animation:zvFade .25s ease}
@keyframes zvFade{from{opacity:0}}
.zv-modal-top{width:100%; flex:none; display:flex; align-items:center; gap:14px; padding:14px clamp(14px,3vw,32px)}
.zv-modal-title{display:flex; flex-direction:column; margin-right:auto; line-height:1.15}
.zv-modal-title b{font-size:1.15rem; letter-spacing:-.02em}
.zv-modal-title span{font-size:.85rem; opacity:.65}
.zv-x{border:0; background:rgba(244,242,255,.12); color:var(--paper); width:40px; height:40px; border-radius:50%; display:grid; place-items:center; cursor:pointer}
.zv-x:hover{background:rgba(244,242,255,.22)}
.zv-x:focus-visible{outline:3px solid var(--sun); outline-offset:2px}
.zv-player{position:relative; margin:auto; background:#000; border-radius:10px; overflow:hidden; animation:zvPop .4s cubic-bezier(.2,.8,.2,1)}
@keyframes zvPop{from{opacity:0; transform:scale(.96) translateY(20px)}}
.zv-player.landscape{width:min(1100px, 94vw, calc((100vh - 120px) * 1.7778)); aspect-ratio:16/9}
.zv-player.portrait{height:min(86vh, 780px); aspect-ratio:9/16; max-width:92vw}
.zv-player video, .zv-player iframe{position:absolute; inset:0; width:100%; height:100%; border:0; background:#000}
.zv-soon{position:absolute; left:0; right:0; bottom:16%; margin:0; text-align:center; font-size:.9rem; padding:0 16px; opacity:.9}
.zv-soon code{background:rgba(244,242,255,.18); padding:2px 6px; border-radius:4px}

@media (prefers-reduced-motion: reduce){
  .zv-wrap>span{animation:none; transform:none}
  .zv-card{opacity:1; transform:none; transition:none}
  .zv-footage i, .zv-timeline b{animation:none}
  .zv-media, .zv-play{transition:none}
  .zv-modal, .zv-player{animation:none}
}
`;