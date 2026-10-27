"use client";

/**
 * Ziron Pro — Video page  (route: /video)
 * Featured film, grid of landscape films, then vertical reels. Hover plays a silent preview.
 * Per video set ONE of:  src: "/work/video/ad.mp4"   or   embed: "https://www.youtube.com/embed/XXXX"
 * plus a `poster` thumbnail. Until set, animated placeholders show.
 */

import React, { useCallback, useMemo, useRef, useState } from "react";
import Shell, { CloseIcon, Filters, useSeen, useModal } from "../CategoryShell";

type Video = {
  id: string; industry: string; kind: "Ad film" | "Reel" | "Event" | "Product";
  orientation: "landscape" | "portrait"; duration: string; tone: string;
  src?: string; embed?: string; poster?: string;
};

const P = "#4D11A8", P2 = "#8F2CF4", P3 = "#6620EE", K = "#0D1420";

const VIDEOS: Video[] = [
  { id: "v1", industry: "Hospitality", kind: "Ad film", orientation: "landscape", duration: "0:45", tone: P },
  { id: "v2", industry: "Real estate", kind: "Product", orientation: "landscape", duration: "1:20", tone: K },
  { id: "v3", industry: "Fashion", kind: "Ad film", orientation: "landscape", duration: "0:30", tone: P3 },
  { id: "v4", industry: "Healthcare", kind: "Event", orientation: "landscape", duration: "2:10", tone: P2 },
  { id: "v5", industry: "Café", kind: "Reel", orientation: "portrait", duration: "0:15", tone: P },
  { id: "v6", industry: "Fashion", kind: "Reel", orientation: "portrait", duration: "0:20", tone: K },
  { id: "v7", industry: "Real estate", kind: "Reel", orientation: "portrait", duration: "0:25", tone: P2 },
  { id: "v8", industry: "Retail", kind: "Reel", orientation: "portrait", duration: "0:18", tone: P3 },
  { id: "v9", industry: "Education", kind: "Event", orientation: "landscape", duration: "1:05", tone: P },
];

type Props = { whatsappNumber?: string; backHref?: string };

const PlayIcon: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
);

const Footage: React.FC<{ tone: string }> = ({ tone }) => (
  <div className="zv-footage" style={{ ["--tone" as string]: tone }} aria-hidden="true">
    <i /><i /><i />
    <div className="zv-timeline"><b /></div>
  </div>
);

const Thumb: React.FC<{ v: Video; featured?: boolean }> = ({ v, featured }) => {
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
      className="zv-media" onMouseEnter={start} onMouseLeave={stop}
      style={{ aspectRatio: v.orientation === "portrait" ? "9/16" : featured ? "21/9" : "16/9" }}
    >
      {v.poster ? <img src={v.poster} alt="" loading="lazy" /> : <Footage tone={v.tone} />}
      {v.src && <video ref={vid} src={v.src} muted loop playsInline preload="none" autoPlay={featured} poster={v.poster} />}
      <span className="zv-play"><PlayIcon /></span>
      <span className="zv-dur">{v.duration}</span>
    </span>
  );
};

const Card: React.FC<{ v: Video; i: number; onOpen: (v: Video) => void; featured?: boolean }> = ({ v, i, onOpen, featured }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref} type="button"
      className={`zv-card zs-reveal ${v.orientation} ${featured ? "featured" : ""} ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }} onClick={() => onOpen(v)} aria-label={`Play ${v.industry} ${v.kind}`}
    >
      <Thumb v={v} featured={featured} />
      <span className="zv-cap">
        <span className="zv-ind">{v.industry}</span>
        <span className="zv-kind">{v.kind}</span>
      </span>
    </button>
  );
};

const Player: React.FC<{ v: Video; onClose: () => void }> = ({ v, onClose }) => {
  useModal(onClose);
  const embedSrc = v.embed ? `${v.embed}${v.embed.includes("?") ? "&" : "?"}autoplay=1&rel=0` : undefined;
  return (
    <div className="zv-modal" role="dialog" aria-modal="true" aria-label={`${v.industry} ${v.kind}`} onClick={onClose}>
      <div className="zv-modal-top" onClick={(e) => e.stopPropagation()}>
        <div className="zv-modal-title"><b>{v.industry}</b><span>{v.kind}</span></div>
        <button type="button" className="zv-x" onClick={onClose} aria-label="Close video"><CloseIcon /></button>
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

export default function VideoPage({ whatsappNumber, backHref }: Props) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Video | null>(null);
  const kinds = useMemo(() => ["All", ...Array.from(new Set(VIDEOS.map((v) => v.kind)))], []);
  const list = useMemo(() => (filter === "All" ? VIDEOS : VIDEOS.filter((v) => v.kind === filter)), [filter]);
  const landscape = list.filter((v) => v.orientation === "landscape");
  const portrait = list.filter((v) => v.orientation === "portrait");
  const [featured, ...rest] = landscape;
  const close = useCallback(() => setOpen(null), []);

  return (
    <Shell
      words={["Stories", "worth", "watching."]}
      sub="Shot and cut to hold attention. Tap any to play."
      waText="Hi Ziron Pro, I'd like a video made."
      ctaTitle="Let’s roll camera."
      ctaLabel="Chat on WhatsApp"
      label="Video projects"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={open && <Player v={open} onClose={close} />}
    >
      <style>{CSS}</style>
      <Filters items={kinds} value={filter} onChange={setFilter} label="Filter by type" />

      {featured && (
        <div className="zv-featured">
          <Card key={filter + featured.id} v={featured} i={0} onOpen={setOpen} featured />
        </div>
      )}

      {rest.length > 0 && (
        <div className="zv-grid">
          {rest.map((v, i) => <Card key={filter + v.id} v={v} i={i} onOpen={setOpen} />)}
        </div>
      )}

      {portrait.length > 0 && (
        <>
          <h2 className="zv-sec">Reels</h2>
          <div className="zv-reels">
            {portrait.map((v, i) => <Card key={filter + v.id} v={v} i={i} onOpen={setOpen} />)}
          </div>
        </>
      )}
    </Shell>
  );
}

const CSS = `
.zv-featured{margin-bottom:clamp(18px,2.4vw,34px)}
.zv-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px); margin-bottom:clamp(8px,2vw,28px)}
@media (max-width:1000px){ .zv-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zv-grid{grid-template-columns:1fr} }
.zv-sec{margin:clamp(24px,4vw,48px) 0 clamp(14px,2vw,22px); font-weight:800; letter-spacing:-.03em; font-size:clamp(1.4rem,2.6vw,2rem); line-height:1}
.zv-reels{display:grid; grid-auto-flow:column; grid-auto-columns:clamp(150px,19vw,260px); gap:clamp(12px,1.6vw,26px); overflow-x:auto; scroll-snap-type:x proximity; scrollbar-width:none; padding-bottom:6px}
.zv-reels::-webkit-scrollbar{display:none}
.zv-reels .zv-card{scroll-snap-align:start}

.zv-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px; width:100%}
.zv-media{position:relative; display:block; width:100%; overflow:hidden; background:var(--black); border-radius:10px; transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.zv-card:hover .zv-media{transform:translateY(-6px)}
.zv-media img, .zv-media video{position:absolute; inset:0; width:100%; height:100%; object-fit:cover}
.zv-media video{opacity:0; transition:opacity .4s}
.zv-card:hover .zv-media video, .zv-card.featured .zv-media video{opacity:1}
.zv-play{position:absolute; left:50%; top:50%; width:64px; height:64px; margin:-32px 0 0 -32px; border-radius:50%; background:#fff; color:var(--black); display:grid; place-items:center; padding-left:4px; transition:transform .35s cubic-bezier(.3,1.6,.5,1), background .2s, color .2s; z-index:2}
.zv-card:hover .zv-play{transform:scale(1.15); background:var(--purple); color:#fff}
.zv-card.featured .zv-play{width:84px; height:84px; margin:-42px 0 0 -42px}
.zv-card.portrait .zv-play{width:50px; height:50px; margin:-25px 0 0 -25px}
.zv-dur{position:absolute; right:10px; bottom:10px; z-index:2; background:var(--black); color:#fff; font-weight:600; font-size:.8rem; padding:4px 10px; border-radius:999px}
.zv-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zv-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zv-kind{font-size:.92rem; opacity:.65; white-space:nowrap}
.zv-card.featured .zv-ind{font-size:clamp(1.3rem,2.4vw,1.9rem)}
.zv-card.portrait .zv-cap{flex-direction:column; gap:2px}

/* placeholder footage */
.zv-footage{position:absolute; inset:0; overflow:hidden; background:linear-gradient(135deg, color-mix(in srgb, var(--tone) 80%, #0D1420), #0D1420)}
.zv-footage i{position:absolute; border-radius:50%; background:var(--tone); opacity:.6; filter:blur(2px); animation:zvDrift 9s ease-in-out infinite alternate}
.zv-footage i:nth-child(1){width:55%; aspect-ratio:1; left:-10%; top:-20%}
.zv-footage i:nth-child(2){width:38%; aspect-ratio:1; right:-6%; bottom:-14%; background:#fff; opacity:.16; animation-delay:-3s}
.zv-footage i:nth-child(3){width:22%; aspect-ratio:1; left:46%; top:22%; background:#8F2CF4; opacity:.5; animation-delay:-6s}
@keyframes zvDrift{to{transform:translate(18%,14%) scale(1.15)}}
.zv-timeline{position:absolute; left:6%; right:6%; bottom:9%; height:4px; border-radius:2px; background:rgba(255,255,255,.25); overflow:hidden}
.zv-timeline b{position:absolute; inset:0; width:100%; background:#fff; transform-origin:left; animation:zvScrub 6s linear infinite}
@keyframes zvScrub{from{transform:scaleX(0)} to{transform:scaleX(1)}}

/* player */
.zv-modal{position:fixed; inset:0; z-index:200; background:rgba(13,20,32,.96); backdrop-filter:blur(6px); color:#fff; display:flex; flex-direction:column; align-items:center; animation:zsFade .25s ease}
.zv-modal-top{width:100%; flex:none; display:flex; align-items:center; gap:14px; padding:14px clamp(14px,3vw,32px)}
.zv-modal-title{display:flex; flex-direction:column; margin-right:auto; line-height:1.15}
.zv-modal-title b{font-size:1.15rem; letter-spacing:-.02em}
.zv-modal-title span{font-size:.85rem; opacity:.65}
.zv-x{border:0; background:rgba(255,255,255,.14); color:#fff; width:40px; height:40px; border-radius:50%; display:grid; place-items:center; cursor:pointer}
.zv-x:hover{background:var(--purple-2)}
.zv-player{position:relative; margin:auto; background:#000; border-radius:10px; overflow:hidden; animation:zvPop .4s cubic-bezier(.2,.8,.2,1)}
@keyframes zvPop{from{opacity:0; transform:scale(.96) translateY(20px)}}
.zv-player.landscape{width:min(1100px, 94vw, calc((100vh - 120px) * 1.7778)); aspect-ratio:16/9}
.zv-player.portrait{height:min(86vh, 780px); aspect-ratio:9/16; max-width:92vw}
.zv-player video, .zv-player iframe{position:absolute; inset:0; width:100%; height:100%; border:0; background:#000}
.zv-soon{position:absolute; left:0; right:0; bottom:16%; margin:0; text-align:center; font-size:.9rem; padding:0 16px}
.zv-soon code{background:rgba(255,255,255,.18); padding:2px 6px; border-radius:4px}

@media (prefers-reduced-motion: reduce){
  .zv-footage i, .zv-timeline b{animation:none}
  .zv-media, .zv-play{transition:none}
  .zv-modal, .zv-player{animation:none}
}
`;