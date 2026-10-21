"use client";

/**
 * Ziron Pro — Categories
 * ---------------------------------------------------------------
 * Slides up as the hero's scroll finishes. The hero drops to the
 * bottom of the screen (as a preview) and this panel — six cards in
 * ONE row — sits on top.
 *
 * Usage:
 *   <Hero />
 *   <Categories />
 *
 * Desktop: six cards share one row.
 * Tablet / mobile: still one row, swipe sideways.
 *
 * Thumbnails: set `image` on each item (e.g. "/work/websites.jpg").
 * Until then a colour-matched placeholder is shown.
 * Each card links to `${basePath}/${slug}`. No client names — only industries.
 */

import React, { useEffect, useRef, useState } from "react";

/** Panel height in vh. Must match PEEK in Hero.tsx */
const PEEK = 62;

type Item = {
  slug: string;
  href?: string;
  title: string;
  industries: string;
  bg: string;
  tone: string;
  image?: string;
};

const ITEMS: Item[] = [
  { slug: "website-development", href: "/website", title: "Websites", industries: "Real estate, clinics\n& retail stores", bg: "#1F2A55", tone: "#5C7CFF" },
  { slug: "branding", href: "/branding", title: "Branding", industries: "Cafés, fashion\n& startups", bg: "#386B50", tone: "#9AE6B4" },
  { slug: "videography-editing", href: "/video", title: "Video", industries: "Hospitality, events\n& product launches", bg: "#2D1B33", tone: "#FF6A4D" },
  { slug: "seo", href: "/seo", title: "SEO", industries: "Local services\n& e-commerce", bg: "#1D1A20", tone: "#7CF2C0" },
  { slug: "lead-generation", href: "/leads", title: "Leads", industries: "Education, real estate\n& healthcare", bg: "#2336FF", tone: "#FFD23F" },
  { slug: "printing-services", href: "/printing", title: "Printing", industries: "Packaging, menus\n& brand stationery", bg: "#B8452E", tone: "#FFD9C9" },
];

type Props = {
  basePath?: string;
  id?: string;
};

const Mark = () => (
  <img src="/logo/icon.png" alt="" className="zc-mark-icon" aria-hidden="true" />
);

export default function Categories({ basePath = "/work", id = "work" }: Props) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} className="zc-section" aria-label="Work categories">
      <style>{CSS}</style>

      <div className="zc-panel-wrap">
        <h2 className="zc-title">Choose a service</h2>

        <div className={`zc-row ${shown ? "in" : ""}`} ref={rowRef}>
          {ITEMS.map((it, i) => (
            <a
              key={it.slug}
              href={it.href || `${basePath}/${it.slug}`}
              className="zc-card"
              style={{ ["--i" as string]: i, ["--bg" as string]: it.bg, ["--tone" as string]: it.tone }}
              aria-label={`View ${it.title} work`}
            >
              <div className="zc-top">
                <span className="zc-logo"><Mark /></span>
                <p className="zc-ind">{it.industries}</p>
                <span className="zc-name">{it.title}</span>
              </div>

              <div className="zc-thumb">
                {it.image ? (
                  <img src={it.image} alt="" loading="lazy" />
                ) : (
                  <div className="zc-ph" aria-hidden="true">
                    <i />
                    <i />
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

/* The section is exactly 100vh and overlaps the last 100vh of the hero.
   Only the top ${PEEK}vh is solid; the rest is see-through so the dropped hero shows below. */
.zc-section{
  position:relative; z-index:40; margin-top:-100vh; height:100vh; height:100svh;
  pointer-events:none;
  font-family:'Bricolage Grotesque', system-ui, sans-serif; color:#0B0D2E;
}
.zc-section *{box-sizing:border-box}

.zc-panel-wrap{
  pointer-events:auto;
  height:${PEEK}vh; background:#E4E5EB;
  padding:clamp(14px,2.4vh,26px) clamp(14px,2.8vw,54px) clamp(16px,2.8vh,30px);
  display:flex; flex-direction:column; gap:clamp(10px,1.8vh,18px);
}
.zc-title{margin:0; font-weight:800; letter-spacing:-.03em; font-size:clamp(1.15rem,2.2vw,1.7rem); line-height:1; flex:none}

.zc-row{
  flex:1; min-height:0;
  display:grid; grid-auto-flow:column; grid-auto-columns:minmax(0,1fr); gap:clamp(10px,1.3vw,24px);
}
/* below desktop: still one row, swipe sideways */
@media (max-width:1100px){
  .zc-row{grid-auto-columns:clamp(180px,38vw,260px); overflow-x:auto; overscroll-behavior-x:contain; scroll-snap-type:x mandatory; scrollbar-width:none; padding-bottom:2px}
  .zc-row::-webkit-scrollbar{display:none}
  .zc-card{scroll-snap-align:start}
}
@media (max-width:560px){
  .zc-row{grid-auto-columns:62vw}
}

.zc-card{
  display:flex; flex-direction:column; height:100%; min-height:0; color:#fff; text-decoration:none; overflow:hidden; background:var(--bg);
  opacity:0; transform:translateY(46px);
  transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1);
  transition-delay:calc(var(--i) * 80ms);
}
.zc-row.in .zc-card{opacity:1; transform:none}
.zc-card:focus-visible{outline:3px solid #2336FF; outline-offset:3px}

.zc-top{position:relative; flex:71 1 0; min-height:0; padding:clamp(12px,1.2vw,20px); transition:flex-grow .6s cubic-bezier(.2,.8,.2,1)}
.zc-thumb{position:relative; flex:29 1 0; min-height:0; overflow:hidden; transition:flex-grow .6s cubic-bezier(.2,.8,.2,1)}
.zc-card:hover .zc-top, .zc-card:focus-visible .zc-top{flex-grow:56}
.zc-card:hover .zc-thumb, .zc-card:focus-visible .zc-thumb{flex-grow:44}

.zc-logo{display:block}
.zc-mark-icon{width:clamp(22px, 2.2vw, 32px); height:auto; object-fit:contain; display:block}
.zc-ind{position:absolute; left:clamp(12px,1.2vw,20px); bottom:clamp(12px,1.2vw,20px); margin:0; font-size:clamp(.66rem,.8vw,.8rem); line-height:1.25; font-weight:600; white-space:pre-line; max-width:56%}
.zc-name{
  position:absolute; right:clamp(10px,1vw,18px); bottom:clamp(12px,1.2vw,18px);
  writing-mode:vertical-rl; transform:rotate(180deg);
  font-size:clamp(1.5rem,2.6vw,2.6rem); font-weight:600; letter-spacing:-.02em; line-height:1; white-space:nowrap;
  max-height:calc(100% - 44px);
}

.zc-thumb img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transform:scale(1.05); transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.zc-card:hover .zc-thumb img{transform:scale(1)}

/* placeholder until real thumbnails are added */
.zc-ph{position:absolute; inset:0; background:linear-gradient(135deg, var(--tone), color-mix(in srgb, var(--tone) 40%, #0B0D2E))}
.zc-ph i{position:absolute; border-radius:50%; background:rgba(255,255,255,.22); transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.zc-ph i:nth-child(1){width:70%; aspect-ratio:1; right:-18%; top:-40%}
.zc-ph i:nth-child(2){width:38%; aspect-ratio:1; left:12%; bottom:-30%; background:rgba(0,0,0,.18)}
.zc-card:hover .zc-ph i:nth-child(1){transform:translate(-14%,18%) scale(1.15)}
.zc-card:hover .zc-ph i:nth-child(2){transform:translate(20%,-30%) scale(1.2)}

@media (prefers-reduced-motion: reduce){
  .zc-card{opacity:1; transform:none; transition:none}
  .zc-top,.zc-thumb,.zc-thumb img,.zc-ph i{transition:none}
}
`;