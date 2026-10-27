"use client";

/**
 * Ziron Pro — Branding page  (route: /branding)
 * Masonry gallery, hover swaps to a second view, click opens a full-screen gallery.
 * Add real images per project: images: [{ src: "/work/brand/cafe-1.jpg", label: "Logo" }, ...]
 * The first image is the cover, the second shows on hover.
 */

import React, { useCallback, useMemo, useRef, useState } from "react";
import Shell, { Filters, useSeen, useModal, CloseIcon } from "../CategoryShell";

type Shot = { src: string; label: string };
type Shape = "circle" | "square" | "tri" | "arch";
type Project = {
  id: string; industry: string; kind: string; tone: string; shape: Shape; ratio: string; images?: Shot[];
};

const P = "#4D11A8", P2 = "#8F2CF4", P3 = "#6620EE", K = "#0D1420";

const PROJECTS: Project[] = [
  { id: "b1", industry: "Café", kind: "Logo & identity", tone: P, shape: "circle", ratio: "4/5" },
  { id: "b2", industry: "Fashion", kind: "Brand system", tone: K, shape: "arch", ratio: "1/1" },
  { id: "b3", industry: "Real estate", kind: "Logo & stationery", tone: P3, shape: "square", ratio: "4/3" },
  { id: "b4", industry: "Healthcare", kind: "Identity refresh", tone: P2, shape: "tri", ratio: "1/1" },
  { id: "b5", industry: "Café", kind: "Packaging & logo", tone: K, shape: "arch", ratio: "4/3" },
  { id: "b6", industry: "Startup", kind: "Visual identity", tone: P2, shape: "circle", ratio: "4/5" },
  { id: "b7", industry: "Fashion", kind: "Logo & lookbook", tone: P, shape: "tri", ratio: "4/3" },
  { id: "b8", industry: "Startup", kind: "Brand guidelines", tone: P3, shape: "square", ratio: "4/5" },
];

type Props = { whatsappNumber?: string; backHref?: string };

const Chevron: React.FC<{ dir: "l" | "r" }> = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* placeholder boards (used until real images are added) */
const kinds = ["Logo", "Palette", "Stationery", "Pattern"] as const;
type Kind = (typeof kinds)[number];

const Board: React.FC<{ p: Project; kind: Kind }> = ({ p, kind }) => (
  <div className={`zb-board ${kind.toLowerCase()}`} style={{ ["--tone" as string]: p.tone } as React.CSSProperties} aria-hidden="true">
    {kind === "Logo" && (
      <>
        <div className={`zb-mark ${p.shape}`} />
        <div className="zb-word"><i /><i /></div>
      </>
    )}
    {kind === "Palette" && (
      <div className="zb-swatches">
        <b style={{ background: p.tone }} />
        <b style={{ background: `color-mix(in srgb, ${p.tone} 50%, #fff)` }} />
        <b style={{ background: `color-mix(in srgb, ${p.tone} 55%, ${K})` }} />
        <b style={{ background: "#FFFFFF" }} />
        <b style={{ background: K }} />
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
        {Array.from({ length: 20 }).map((_, i) => <span key={i} className={`zb-mark xs ${p.shape}`} />)}
      </div>
    )}
  </div>
);

type Slide = { label: string; src?: string; kind?: Kind };
const slidesOf = (p: Project): Slide[] =>
  p.images?.length ? p.images.map((s) => ({ label: s.label, src: s.src })) : kinds.map((k) => ({ label: k, kind: k }));

const SlideView: React.FC<{ p: Project; s: Slide; contain?: boolean }> = ({ p, s, contain }) =>
  s.src ? <img src={s.src} alt="" loading="lazy" style={{ objectFit: contain ? "contain" : "cover" }} /> : <Board p={p} kind={s.kind!} />;

const Card: React.FC<{ p: Project; onOpen: (p: Project) => void }> = ({ p, onOpen }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  const slides = slidesOf(p);
  return (
    <button ref={ref} type="button" className={`zb-card zs-reveal ${seen ? "in" : ""}`} onClick={() => onOpen(p)} aria-label={`Open ${p.industry} branding gallery`}>
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

const Lightbox: React.FC<{ p: Project; onClose: () => void }> = ({ p, onClose }) => {
  const slides = slidesOf(p);
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);
  const go = useCallback((d: number) => setI((v) => (v + d + slides.length) % slides.length), [slides.length]);
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  }, [go]);
  useModal(onClose, onKey);

  return (
    <div
      className="zb-lb" role="dialog" aria-modal="true" aria-label={`${p.industry} branding gallery`} onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="zb-lb-top" onClick={(e) => e.stopPropagation()}>
        <div className="zb-lb-title"><b>{p.industry}</b><span>{p.kind}</span></div>
        <span className="zb-lb-count">{i + 1} / {slides.length}</span>
        <button type="button" className="zb-x" onClick={onClose} aria-label="Close gallery"><CloseIcon /></button>
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

export default function BrandingPage({ whatsappNumber, backHref }: Props) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);
  const industries = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.industry)))], []);
  const shown = useMemo(() => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.industry === filter)), [filter]);
  const close = useCallback(() => setOpen(null), []);

  return (
    <Shell
      words={["Brands", "people", "remember."]}
      sub="Logos and identities. Tap any to open the gallery."
      waText="Hi Ziron Pro, I'd like a brand identity."
      ctaTitle="Let’s name your look."
      ctaLabel="Chat on WhatsApp"
      label="Branding projects"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={open && <Lightbox p={open} onClose={close} />}
    >
      <style>{CSS}</style>
      <Filters items={industries} value={filter} onChange={setFilter} label="Filter by industry" />
      <div className="zb-masonry">
        {shown.map((p) => <Card key={filter + p.id} p={p} onOpen={setOpen} />)}
      </div>
    </Shell>
  );
}

const CSS = `
.zb-masonry{column-count:3; column-gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zb-masonry{column-count:2} }
@media (max-width:520px){ .zb-masonry{column-count:1} }

.zb-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px; width:100%; break-inside:avoid; margin-bottom:clamp(18px,2.2vw,32px)}
.zb-cover{position:relative; display:block; width:100%; overflow:hidden; background:#fff; border:1.5px solid var(--line); border-radius:10px; transition:transform .5s cubic-bezier(.2,.8,.2,1), border-color .3s}
.zb-card:hover .zb-cover{transform:translateY(-6px); border-color:var(--purple)}
.zb-layer{position:absolute; inset:0; display:block; transition:opacity .5s ease, transform .9s cubic-bezier(.2,.8,.2,1)}
.zb-layer img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover}
.zb-layer.b{opacity:0; transform:scale(1.06)}
.zb-card:hover .zb-layer.b, .zb-card:focus-visible .zb-layer.b{opacity:1; transform:none}
.zb-card:hover .zb-layer.a{transform:scale(1.04)}
.zb-count{position:absolute; right:12px; bottom:12px; z-index:2; background:var(--black); color:#fff; font-weight:600; font-size:.82rem; min-width:30px; height:30px; padding:0 10px; border-radius:999px; display:grid; place-items:center}
.zb-cap{display:flex; justify-content:space-between; align-items:baseline; gap:12px}
.zb-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zb-kind{font-size:.92rem; opacity:.65}

/* placeholder boards */
.zb-board{position:absolute; inset:0; display:grid; place-items:center; overflow:hidden}
.zb-board.logo{background:color-mix(in srgb, var(--tone) 10%, #fff); align-content:center; gap:7%}
.zb-board.palette{background:#fff}
.zb-board.stationery{background:color-mix(in srgb, var(--tone) 18%, #fff)}
.zb-board.pattern{background:var(--tone)}
.zb-mark{width:34%; aspect-ratio:1; background:var(--tone); display:block}
.zb-mark.circle{border-radius:50%}
.zb-mark.square{border-radius:18%; transform:rotate(12deg)}
.zb-mark.tri{clip-path:polygon(50% 4%,96% 92%,4% 92%)}
.zb-mark.arch{border-radius:50% 50% 8% 8%}
.zb-mark.sm{width:16%}
.zb-mark.xs{width:100%; background:rgba(255,255,255,.9)}
.zb-word{display:grid; gap:6px; justify-items:center; width:40%}
.zb-word i{display:block; height:9px; width:100%; border-radius:5px; background:var(--tone)}
.zb-word i+i{width:60%; height:6px; opacity:.45}
.zb-swatches{position:absolute; inset:0; display:flex}
.zb-swatches b{flex:1}
.zb-swatches b:first-child{flex:2.2}
.zb-sheet{position:absolute; background:#fff; border:1.5px solid var(--line); padding:5%; display:grid; gap:7px; align-content:start; justify-items:start}
.zb-sheet.a{width:46%; aspect-ratio:.72; left:12%; top:10%; transform:rotate(-6deg)}
.zb-sheet.b{width:44%; aspect-ratio:1.6; right:9%; bottom:12%; transform:rotate(5deg); place-items:center; background:var(--tone)}
.zb-sheet.b .zb-mark{background:#fff}
.zb-sheet i{display:block; height:5px; width:80%; background:rgba(13,20,32,.18); border-radius:3px}
.zb-sheet i+i{width:55%}
.zb-pattern{position:absolute; inset:0; display:grid; grid-template-columns:repeat(5,1fr); padding:6%; align-content:center; gap:9%}
.zb-pattern .zb-mark{width:70%; justify-self:center}
.zb-pattern .zb-mark:nth-child(even){opacity:.45}

/* lightbox */
.zb-lb{position:fixed; inset:0; z-index:200; background:rgba(13,20,32,.95); backdrop-filter:blur(6px); color:#fff; display:flex; flex-direction:column; animation:zsFade .25s ease}
.zb-lb-top{flex:none; display:flex; align-items:center; gap:14px; padding:14px clamp(14px,3vw,32px)}
.zb-lb-title{display:flex; flex-direction:column; margin-right:auto; line-height:1.15}
.zb-lb-title b{font-size:1.15rem; letter-spacing:-.02em}
.zb-lb-title span{font-size:.85rem; opacity:.65}
.zb-lb-count{font-weight:600; font-size:.92rem; opacity:.8}
.zb-x{border:0; background:rgba(255,255,255,.14); color:#fff; width:40px; height:40px; border-radius:50%; display:grid; place-items:center; cursor:pointer}
.zb-x:hover{background:var(--purple-2)}
.zb-lb-main{flex:1; min-height:0; display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:clamp(6px,2vw,24px); padding:0 clamp(8px,2vw,28px)}
.zb-nav{border:0; background:rgba(255,255,255,.14); color:#fff; width:48px; height:48px; border-radius:50%; display:grid; place-items:center; cursor:pointer; transition:background .2s, transform .2s}
.zb-nav:hover{background:var(--purple-2)}
.zb-nav.l:hover{transform:translateX(-3px)} .zb-nav.r:hover{transform:translateX(3px)}
@media (max-width:640px){ .zb-nav{width:38px; height:38px} }
.zb-lb-slide{position:relative; justify-self:center; width:min(100%, calc((100vh - 230px) * 1.333)); aspect-ratio:4/3; max-height:100%; background:#fff; border-radius:8px; overflow:hidden; animation:zbSlide .45s cubic-bezier(.2,.8,.2,1)}
@keyframes zbSlide{from{opacity:0; transform:translateX(24px) scale(.98)}}
.zb-lb-slide img{position:absolute; inset:0; width:100%; height:100%; background:#fff}
.zb-lb-label{position:absolute; left:14px; bottom:14px; background:var(--black); color:#fff; font-weight:600; font-size:.85rem; padding:6px 14px; border-radius:999px; z-index:2}
.zb-strip{flex:none; display:flex; justify-content:center; gap:10px; padding:14px 14px 20px; overflow-x:auto}
.zb-strip button{all:unset; box-sizing:border-box; cursor:pointer; position:relative; flex:none; width:76px; height:56px; border-radius:6px; overflow:hidden; opacity:.5; outline:2px solid transparent; transition:opacity .2s, outline-color .2s}
.zb-strip button.on, .zb-strip button:hover{opacity:1}
.zb-strip button.on{outline-color:var(--purple-2)}
.zb-strip button img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover}

@media (prefers-reduced-motion: reduce){
  .zb-layer, .zb-cover{transition:none}
  .zb-lb, .zb-lb-slide{animation:none}
}
`;