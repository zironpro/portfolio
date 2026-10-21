"use client";

/**
 * Ziron Pro — Hero
 * ---------------------------------------------------------------
 * A pinned, scroll-driven hero. No dependencies except React.
 *
 *  1. Load: the headline rises in word by word.
 *  2. Scroll: the headline shrinks to the top and a deck of six
 *     service cards slides up. Each scroll step flips to the next
 *     service (Website → Branding → Video → SEO → Leads → Print).
 *  3. After the last card the hero un-pins and the page continues
 *     (put your "Work categories" section right after <Hero />).
 *
 * Props
 *  - whatsappNumber: digits only, with country code (e.g. "919876543210")
 *  - workHref: id of the section that follows the hero (default "#work")
 *
 * Works in Next.js (app router) and Vite/CRA. Fonts load from Google Fonts.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";

type HeroProps = {
  whatsappNumber?: string;
  workHref?: string;
};

type Service = {
  name: string;
  line: string;
  bg: string;
  fg: string;
  Art: React.FC<{ active: boolean }>;
};

/* ---------- helpers ---------- */
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---------- card artwork (pure CSS, no images needed) ---------- */
const WebArt: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`zp-art zp-web ${active ? "on" : ""}`}>
    <div className="zp-web-bar">
      <i /><i /><i />
      <span />
    </div>
    <div className="zp-web-body">
      <div className="zp-web-hero" />
      <div className="zp-web-row">
        <b /><b /><b />
      </div>
      <div className="zp-web-btn" />
    </div>
    <svg className="zp-cursor" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path d="M4 2l16 9-7 2-3 7z" fill="#0B0D2E" stroke="#fff" strokeWidth="1.4" />
    </svg>
  </div>
);

const BrandArt: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`zp-art zp-brand ${active ? "on" : ""}`}>
    <span className="s1" />
    <span className="s2" />
    <span className="s3" />
    <span className="s4" />
  </div>
);

const VideoArt: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`zp-art zp-video ${active ? "on" : ""}`}>
    <div className="zp-play">
      <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
        <path d="M8 5v14l11-7z" fill="#0B0D2E" />
      </svg>
    </div>
    <div className="zp-track">
      <div className="zp-fill" />
      <div className="zp-clips">
        <i /><i /><i /><i /><i />
      </div>
    </div>
  </div>
);

const SeoArt: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`zp-art zp-seo ${active ? "on" : ""}`}>
    <div className="zp-bars">
      {[28, 42, 36, 58, 74, 92].map((h, i) => (
        <b key={i} style={{ ["--h" as string]: `${h}%`, ["--d" as string]: `${i * 90}ms` }} />
      ))}
    </div>
    <div className="zp-rank">#1</div>
  </div>
);

const LeadArt: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`zp-art zp-lead ${active ? "on" : ""}`}>
    <div className="zp-funnel">
      <i style={{ ["--w" as string]: "100%" }} />
      <i style={{ ["--w" as string]: "74%" }} />
      <i style={{ ["--w" as string]: "48%" }} />
      <i style={{ ["--w" as string]: "26%" }} />
    </div>
    <div className="zp-drops">
      <u /><u /><u /><u /><u />
    </div>
  </div>
);

const PrintArt: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`zp-art zp-print ${active ? "on" : ""}`}>
    <div className="p p1" />
    <div className="p p2" />
    <div className="p p3">
      <em /><em /><em /><em />
    </div>
  </div>
);

const SERVICES: Service[] = [
  { name: "Website Development", line: "Sites that load fast and convert.", bg: "#F4F2FF", fg: "#0D1420", Art: WebArt },
  { name: "Branding", line: "Identities people remember.", bg: "#FF6A4D", fg: "#0D1420", Art: BrandArt },
  { name: "Videography & Editing", line: "Footage cut to hold attention.", bg: "#170349", fg: "#F4F2FF", Art: VideoArt },
  { name: "SEO", line: "Rankings you can measure.", bg: "#7CF2C0", fg: "#0D1420", Art: SeoArt },
  { name: "Lead Generation", line: "Enquiries, not just clicks.", bg: "#8F2CF4", fg: "#F4F2FF", Art: LeadArt },
  { name: "Printing Services", line: "Print that feels as good as it looks.", bg: "#E7E3FF", fg: "#0D1420", Art: PrintArt },
];

const LAST = SERVICES.length - 1;
/** Height (in vh) of the Categories panel. The hero drops down by the same amount. Keep in sync with Categories.tsx */
const PEEK = 62;
const INTRO_END = 0.2; // share of scroll used by the headline → deck transition

/* ---------- component ---------- */
export default function Hero({ whatsappNumber = "910000000000", workHref = "#work" }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const target = useRef(0);
  const smooth = useRef(0);
  const qTarget = useRef(0);
  const qSmooth = useRef(0);
  const reduced = useRef(false);
  const [p, setP] = useState(0);
  const [q, setQ] = useState(0); // 0 → 1 while Categories slides over and the hero drops to the bottom

  /* scroll progress → smoothed value */
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight * 2; // last 100vh is overlapped by Categories
      target.current = travel > 0 ? clamp(-rect.top / travel) : 0;
      qTarget.current = clamp((-rect.top - travel) / window.innerHeight);
    };

    let raf = 0;
    const loop = () => {
      const diff = target.current - smooth.current;
      smooth.current = reduced.current || Math.abs(diff) < 0.0004 ? target.current : smooth.current + diff * 0.22;
      setP((prev) => (Math.abs(prev - smooth.current) > 0.0002 ? smooth.current : prev));
      const dq = qTarget.current - qSmooth.current;
      qSmooth.current = reduced.current || Math.abs(dq) < 0.0004 ? qTarget.current : qSmooth.current + dq * 0.24;
      setQ((prev) => (Math.abs(prev - qSmooth.current) > 0.0002 ? qSmooth.current : prev));
      raf = requestAnimationFrame(loop);
    };

    measure();
    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* derived animation values */
  const intro = easeOut(clamp(p / INTRO_END)); // 0 → 1 : headline shrinks, deck arrives
  const deckP = clamp((p - INTRO_END) / (1 - INTRO_END));
  const pos = deckP * LAST; // 0 … 5 (float card position)
  const active = Math.round(pos);
  const settled = p > 0.02;

  const jumpTo = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight * 2;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const prog = INTRO_END + (i / LAST) * (1 - INTRO_END);
    window.scrollTo({ top: top + travel * prog, behavior: reduced.current ? "auto" : "smooth" });
  }, []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Ziron Pro, I'd like to talk about a project."
  )}`;

  const words = ["Work", "that", "speaks", "before", "we", "do."];

  return (
    <section ref={sectionRef} className="zp-hero" aria-label="Ziron Pro portfolio introduction">
      <style>{CSS}</style>

      <div
        className="zp-stage"
        style={{
          transform: `translate3d(0, ${q * PEEK}vh, 0)`,
          width: q > 0 ? `calc(100% - ${q * 2} * clamp(14px, 2.8vw, 54px))` : "100%",
          margin: "0 auto",
        }}
      >
        {/* ambient rings that turn with scroll */}
        <div className="zp-rings" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotate(${p * 220}deg) scale(${1 + p * 0.25})` }}>
          <span /><span /><span />
        </div>

        {/* top bar */}
        <header className="zp-top">
          <a className="zp-logo" href="/" aria-label="Ziron Pro home">
            <img src="/logo/logo-white.png" alt="Ziron Pro" className="zp-logo-img" />
          </a>
          <a className="zp-wa" href={waHref} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </header>

        {/* headline */}
        <div className="zp-headline-wrap">
          <h1
            className="zp-headline"
            style={{
              transform: `translate3d(0, ${-35 * intro}vh, 0) scale(${1 - 0.62 * intro})`,
            }}
          >
            {words.map((w, i) => (
              <span className="zp-word" key={i}>
                <span style={{ animationDelay: `${0.15 + i * 0.09}s` }}>{w}</span>{" "}
              </span>
            ))}
          </h1>
          <p className="zp-sub" style={{ opacity: 1 - clamp(p / 0.08), transform: `translateY(${-p * 120}px)` }}>
            Websites, brands, video, search, leads and print.
          </p>
        </div>

        {/* scroll cue */}
        <div className="zp-cue" style={{ opacity: 1 - clamp(p / 0.06) }} aria-hidden="true">
          <span />
          Scroll
        </div>

        {/* card deck */}
        <div
          className="zp-deck"
          style={{
            opacity: clamp(intro * 1.4),
            transform: `translate3d(0, ${(1 - intro) * 70 + 4}vh, 0)`,
            pointerEvents: settled ? "auto" : "none",
          }}
        >
          {SERVICES.map((s, i) => {
            const d = i - pos;
            let x: number, y: number, r: number, sc: number, o: number, z: number;
            if (d < 0) {
              // already shown: fly out to the left
              x = d * -1 * -62;
              y = d * -1 * -4;
              r = d * 9;
              sc = 1 + d * 0.04;
              o = clamp(1 + d * 1.4);
              z = 30;
            } else {
              // waiting behind the active card
              x = d * 7;
              y = -d * 4.5;
              r = d * 2.2;
              sc = 1 - d * 0.07;
              o = d > 4 ? 0 : 1 - d * 0.16;
              z = 20 - i;
            }
            const Art = s.Art;
            return (
              <article
                key={s.name}
                className="zp-card"
                aria-hidden={i !== active}
                style={{
                  background: s.bg,
                  color: s.fg,
                  opacity: o,
                  zIndex: z,
                  transform: `translate3d(${x}%, ${y}%, 0) rotate(${r}deg) scale(${sc})`,
                }}
              >
                <Art active={i === active && deckP > 0} />
              </article>
            );
          })}
        </div>

        {/* active service + progress */}
        <footer className="zp-foot" style={{ opacity: clamp((intro - 0.5) * 2) }}>
          <div className="zp-now" key={active}>
            <h2>{SERVICES[active].name}</h2>
            <p>{SERVICES[active].line}</p>
          </div>

          <nav className="zp-steps" aria-label="Services">
            {SERVICES.map((s, i) => (
              <button
                key={s.name}
                type="button"
                className={i === active ? "is-active" : ""}
                onClick={() => jumpTo(i)}
                aria-label={s.name}
                aria-current={i === active}
              >
                <i style={{ transform: `scaleX(${clamp(pos - i + 1)})` }} />
                <span>{s.name}</span>
              </button>
            ))}
          </nav>

          <a
            className="zp-cta"
            href={workHref}
            style={{ opacity: clamp((deckP - 0.82) * 6) + (active === LAST ? 0 : 0), pointerEvents: deckP > 0.85 ? "auto" : "none" }}
          >
            See all work
          </a>
        </footer>
      </div>
    </section>
  );
}

/* ---------- styles ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.zp-hero{
  --cobalt: var(--purple-main, #4D11A8);
  --purple-2: var(--purple-2, #8F2CF4);
  --purple-3: var(--purple-3, #6620EE);
  --navy: var(--navy-blue, #170349);
  --darker: var(--darker, #0D1420);
  --paper: #F4F2FF;
  --ink: var(--darker, #0D1420);
  --coral: #FF6A4D;
  --sun: var(--purple-2, #8F2CF4);
  --mint: #7CF2C0;
  position:relative; z-index:90; height:500vh; background:transparent; color:var(--paper); overflow:clip;
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
  pointer-events:none;
}
.zp-hero *{box-sizing:border-box}
.zp-stage{position:sticky; top:0; left:0; right:0; margin-left:auto; margin-right:auto; height:100vh; height:100svh; overflow:hidden; background:linear-gradient(145deg, var(--navy), var(--cobalt)); transform-origin:50% 0; will-change:transform,width; pointer-events:auto}

/* rings */
.zp-rings{position:absolute; left:50%; top:50%; width:140vmax; height:140vmax; pointer-events:none; will-change:transform}
.zp-rings span{position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(244,242,255,.14)}
.zp-rings span:nth-child(2){inset:16%; border-style:dashed; border-color:rgba(143,44,244,.28)}
.zp-rings span:nth-child(3){inset:32%; border-color:var(--purple-2)}
.zp-rings span:nth-child(3)::after{content:""; position:absolute; top:-9px; left:50%; width:18px; height:18px; border-radius:50%; background:var(--purple-2); box-shadow:0 0 16px var(--purple-2)}

/* top bar */
.zp-top{position:absolute; z-index:60; top:0; left:0; right:0; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zp-logo{display:inline-flex; align-items:center; text-decoration:none}
.zp-logo-img{height:clamp(28px, 4vw, 40px); width:auto; object-fit:contain; display:block}
.zp-wa{color:var(--ink); background:var(--paper); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:transform .2s, background .2s}
.zp-wa:hover{transform:translateY(-2px); background:var(--sun)}

/* headline */
.zp-headline-wrap{position:absolute; inset:0; display:grid; place-items:center; align-content:center; z-index:50; pointer-events:none; padding:0 5vw; text-align:center}
.zp-headline{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(3rem, 11vw, 9.5rem); max-width:14ch; will-change:transform; font-variation-settings:'opsz' 96}
.zp-word{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.08em; margin-right:0.28em}
.zp-word:last-child{margin-right:0}
.zp-word>span{display:inline-block; transform:translateY(110%); animation:zpRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zpRise{to{transform:translateY(0)}}
.zp-sub{margin:1.4rem 0 0; font-size:clamp(1rem,1.6vw,1.3rem); opacity:.85; max-width:34ch}

/* scroll cue */
.zp-cue{position:absolute; z-index:55; bottom:28px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:10px; font-size:.85rem; opacity:.9}
.zp-cue span{width:1.5px; height:44px; background:linear-gradient(var(--paper), transparent); transform-origin:top; animation:zpDrip 1.6s ease-in-out infinite}
@keyframes zpDrip{0%{transform:scaleY(0)}60%{transform:scaleY(1)}100%{transform:scaleY(1); opacity:0}}

/* deck */
.zp-deck{position:absolute; left:50%; top:50%; width:min(78vw,520px); aspect-ratio:4/3; margin-left:calc(min(78vw,520px) / -2); margin-top:calc(min(78vw,520px) * -0.375 - 2vh); z-index:40; will-change:transform,opacity}
.zp-card{position:absolute; inset:0; border-radius:28px; overflow:hidden; box-shadow:0 30px 60px -20px rgba(5,8,70,.55); will-change:transform,opacity}
@media (max-width:640px){
  .zp-deck{aspect-ratio:1/1.05; margin-top:calc(min(78vw,520px) * -0.525 - 3vh)}
  .zp-card{border-radius:22px}
}

/* footer */
.zp-foot{position:absolute; z-index:60; left:0; right:0; bottom:0; padding:0 clamp(18px,4vw,48px) 26px; display:grid; gap:16px; grid-template-columns:1fr auto; align-items:end}
.zp-now h2{margin:0; font-size:clamp(1.5rem,3.6vw,2.6rem); font-weight:800; letter-spacing:-.03em; line-height:1}
.zp-now p{margin:.4rem 0 0; opacity:.85; font-size:clamp(.95rem,1.4vw,1.1rem)}
.zp-now{animation:zpSwap .5s cubic-bezier(.2,.8,.2,1)}
@keyframes zpSwap{from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:none}}

.zp-steps{grid-column:1 / -1; grid-row:2; display:grid; grid-template-columns:repeat(6,1fr); gap:8px}
.zp-steps button{all:unset; cursor:pointer; display:block; position:relative; padding-top:12px; color:var(--paper); font-size:.82rem; opacity:.55; transition:opacity .25s; border-radius:4px}
.zp-steps button::before{content:""; position:absolute; top:0; left:0; right:0; height:3px; background:rgba(244,242,255,.25); border-radius:3px}
.zp-steps button i{position:absolute; top:0; left:0; right:0; height:3px; background:var(--sun); border-radius:3px; transform-origin:left}
.zp-steps button.is-active, .zp-steps button:hover{opacity:1}
.zp-steps button:focus-visible{outline:2px solid var(--sun); outline-offset:4px}
.zp-steps span{display:none}
@media (min-width:900px){ .zp-steps span{display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis} }

.zp-cta{grid-column:2; grid-row:1; justify-self:end; align-self:end; background:var(--sun); color:var(--ink); text-decoration:none; font-weight:600; padding:12px 22px; border-radius:999px; transition:transform .2s}
.zp-cta:hover{transform:translateY(-2px)}
.zp-cta:focus-visible, .zp-wa:focus-visible, .zp-logo:focus-visible{outline:2px solid var(--sun); outline-offset:3px}

/* ---------- card art ---------- */
.zp-art{position:absolute; inset:0; padding:8%; display:grid; place-items:center}

/* web */
.zp-web{align-content:stretch}
.zp-web-bar{position:absolute; top:7%; left:7%; right:7%; height:12%; background:#fff; border-radius:12px 12px 0 0; display:flex; align-items:center; gap:6px; padding:0 14px; border:2px solid var(--ink); border-bottom:0}
.zp-web-bar i{width:9px; height:9px; border-radius:50%; background:var(--coral)}
.zp-web-bar i:nth-child(2){background:var(--sun)} .zp-web-bar i:nth-child(3){background:var(--mint)}
.zp-web-bar span{margin-left:10px; flex:1; height:8px; border-radius:4px; background:#E3E0F5}
.zp-web-body{position:absolute; top:19%; left:7%; right:7%; bottom:7%; background:#fff; border:2px solid var(--ink); border-radius:0 0 12px 12px; padding:5%; display:flex; flex-direction:column; gap:10%}
.zp-web-hero{flex:1.4; border-radius:10px; background:var(--cobalt); transform:scaleX(.2); transform-origin:left; transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.zp-web-row{display:flex; gap:8%; flex:1}
.zp-web-row b{flex:1; border-radius:8px; background:#E3E0F5; transform:translateY(30px); opacity:0; transition:transform .6s, opacity .6s}
.zp-web-btn{height:12%; width:34%; border-radius:999px; background:var(--coral); transform:scale(0); transition:transform .5s .7s cubic-bezier(.3,1.6,.5,1)}
.zp-web.on .zp-web-hero{transform:scaleX(1)}
.zp-web.on .zp-web-row b{transform:none; opacity:1}
.zp-web.on .zp-web-row b:nth-child(2){transition-delay:.15s} .zp-web.on .zp-web-row b:nth-child(3){transition-delay:.3s}
.zp-web.on .zp-web-btn{transform:scale(1)}
.zp-cursor{position:absolute; left:20%; top:30%; opacity:0}
.zp-web.on .zp-cursor{animation:zpCursor 2.4s .5s ease-in-out infinite}
@keyframes zpCursor{0%{opacity:0; transform:translate(0,0)} 15%{opacity:1} 60%{transform:translate(150%,170%)} 100%{opacity:1; transform:translate(150%,170%)}}

/* brand */
.zp-brand{grid-template-columns:1fr 1fr; gap:6%; padding:12%}
.zp-brand span{width:100%; height:100%; background:var(--ink); transition:transform .9s cubic-bezier(.2,.8,.2,1), border-radius .9s; transform:scale(.4) rotate(-40deg)}
.zp-brand .s1{border-radius:50%; background:var(--paper)}
.zp-brand .s2{border-radius:18%; background:var(--ink)}
.zp-brand .s3{border-radius:100% 0 0 0; background:var(--sun)}
.zp-brand .s4{clip-path:polygon(50% 6%,94% 92%,6% 92%); background:var(--cobalt)}
.zp-brand.on span{transform:none}
.zp-brand.on .s1{border-radius:50% 50% 50% 8%}
.zp-brand.on .s2{border-radius:50%}
.zp-brand.on .s3{transition-delay:.12s} .zp-brand.on .s4{transition-delay:.24s}

/* video */
.zp-video{align-content:center; gap:14%}
.zp-play{width:28%; aspect-ratio:1; border-radius:50%; background:var(--paper); display:grid; place-items:center; padding-left:4px; transform:scale(.7); transition:transform .5s cubic-bezier(.3,1.6,.5,1)}
.zp-video.on .zp-play{transform:scale(1); animation:zpPulse 1.8s .6s infinite}
@keyframes zpPulse{0%{box-shadow:0 0 0 0 rgba(244,242,255,.5)} 100%{box-shadow:0 0 0 28px rgba(244,242,255,0)}}
.zp-track{position:relative; width:84%; height:16%; background:rgba(244,242,255,.14); border-radius:10px; overflow:hidden}
.zp-fill{position:absolute; inset:0; width:0; background:var(--coral); transition:width 3.2s .3s linear}
.zp-video.on .zp-fill{width:72%}
.zp-clips{position:absolute; inset:0; display:flex; gap:3px; padding:3px}
.zp-clips i{flex:1; border-radius:6px; border:1.5px solid rgba(244,242,255,.5)}
.zp-clips i:nth-child(2){flex:2} .zp-clips i:nth-child(4){flex:1.5}

/* seo */
.zp-seo{padding:12% 10% 10%}
.zp-bars{position:absolute; left:10%; right:10%; bottom:10%; top:22%; display:flex; align-items:flex-end; gap:5%}
.zp-bars b{flex:1; height:var(--h); background:var(--ink); border-radius:8px 8px 0 0; transform:scaleY(0); transform-origin:bottom; transition:transform .7s cubic-bezier(.2,.8,.2,1); transition-delay:var(--d)}
.zp-bars b:last-child{background:var(--cobalt)}
.zp-seo.on .zp-bars b{transform:scaleY(1)}
.zp-rank{position:absolute; top:9%; right:10%; background:var(--ink); color:var(--mint); font-weight:800; font-size:clamp(1.4rem,4vw,2.2rem); padding:4px 16px; border-radius:999px; transform:scale(0) rotate(-12deg); transition:transform .5s 1s cubic-bezier(.3,1.6,.5,1)}
.zp-seo.on .zp-rank{transform:scale(1) rotate(-4deg)}

/* lead */
.zp-lead{align-content:start; padding-top:12%}
.zp-funnel{width:100%; display:grid; gap:3.5%; justify-items:center}
.zp-funnel i{display:block; width:var(--w); height:clamp(20px,5.4vw,34px); border-radius:10px; background:var(--ink); transform:scaleX(0); transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.zp-funnel i:nth-child(1){background:rgba(11,13,46,.28)} .zp-funnel i:nth-child(2){background:rgba(11,13,46,.5)} .zp-funnel i:nth-child(3){background:rgba(11,13,46,.75)} .zp-funnel i:nth-child(4){background:var(--coral)}
.zp-lead.on .zp-funnel i{transform:scaleX(1)}
.zp-lead.on .zp-funnel i:nth-child(2){transition-delay:.12s} .zp-lead.on .zp-funnel i:nth-child(3){transition-delay:.24s} .zp-lead.on .zp-funnel i:nth-child(4){transition-delay:.36s}
.zp-drops{position:absolute; top:6%; bottom:10%; left:0; right:0; pointer-events:none}
.zp-drops u{position:absolute; top:0; width:9px; height:9px; border-radius:50%; background:var(--cobalt); opacity:0}
.zp-drops u:nth-child(1){left:30%} .zp-drops u:nth-child(2){left:44%} .zp-drops u:nth-child(3){left:50%} .zp-drops u:nth-child(4){left:57%} .zp-drops u:nth-child(5){left:68%}
.zp-lead.on .zp-drops u{animation:zpDrop 2s infinite}
.zp-lead.on .zp-drops u:nth-child(2){animation-delay:.3s} .zp-lead.on .zp-drops u:nth-child(3){animation-delay:.9s}
.zp-lead.on .zp-drops u:nth-child(4){animation-delay:.5s} .zp-lead.on .zp-drops u:nth-child(5){animation-delay:1.2s}
@keyframes zpDrop{0%{opacity:0; transform:translateY(0)} 15%{opacity:1} 100%{opacity:0; transform:translateY(240%) translateX(var(--x,0))}}

/* print */
.zp-print .p{position:absolute; width:56%; aspect-ratio:1.6; border-radius:10px; border:2px solid var(--ink); background:#fff; transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.zp-print .p1{background:var(--coral); transform:rotate(0)}
.zp-print .p2{background:var(--cobalt); transform:rotate(0)}
.zp-print .p3{background:#fff; display:flex; align-items:center; justify-content:center; gap:7%}
.zp-print .p3 em{width:13%; aspect-ratio:1; border-radius:50%; background:#00B7EB}
.zp-print .p3 em:nth-child(2){background:#EC008C} .zp-print .p3 em:nth-child(3){background:#FFE600} .zp-print .p3 em:nth-child(4){background:#111}
.zp-print.on .p1{transform:translate(-26%,-22%) rotate(-12deg)}
.zp-print.on .p2{transform:translate(24%,-6%) rotate(9deg)}
.zp-print.on .p3{transform:translate(-4%,26%) rotate(-3deg)}

/* reduced motion: keep layout, drop looping/entrance motion */
@media (prefers-reduced-motion: reduce){
  .zp-word>span{animation:none; transform:none}
  .zp-cue span, .zp-cursor, .zp-drops u, .zp-play, .zp-now{animation:none !important}
  .zp-rings{transition:none}
}
`;