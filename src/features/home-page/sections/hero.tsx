"use client";

/**
 * Ziron Pro — Hero + service chooser (one swipe)
 * ---------------------------------------------------------------
 *  1. Load: the headline rises in word by word.
 *  2. ONE short scroll (60vh): the headline lifts and shrinks, and the
 *     six service links rise into place. Nothing else to scroll through.
 *  3. The hero then un-pins and the page continues.
 *
 * Background: a thick purple ring with a ball running around it,
 * followed by a trail of fading, low-opacity balls.
 *
 * <Categories /> is no longer needed. Use only <Hero /> and put the
 * rest of your page right after it.
 *
 * Colours (Ziron Pro only): white 60% · purple 30% · black 10%
 *
 * Props
 *  - whatsappNumber: digits only, with country code (e.g. "971542588446")
 */

import React, { useEffect, useRef, useState } from "react";

type HeroProps = {
  whatsappNumber?: string;
};

type Item = { href: string; title: string; industries: string; image: string };

const ITEMS: Item[] = [
  {
    href: "/website",
    title: "Websites",
    industries: "Real estate, clinics & retail stores",
    image: "/categories/website.png",
  },
  {
    href: "/branding",
    title: "Branding",
    industries: "Cafés, fashion & startups",
    image: "/categories/branding.png",
  },
  {
    href: "/video",
    title: "Video",
    industries: "Hospitality, events & product launches",
    image: "/categories/video.png",
  },
  {
    href: "/seo",
    title: "SEO",
    industries: "Local services & e-commerce",
    image: "/categories/seo.png",
  },
  {
    href: "/leads",
    title: "Leads",
    industries: "Education, real estate & healthcare",
    image: "/categories/leads.png",
  },
  {
    href: "/printing",
    title: "Printing",
    industries: "Packaging, menus & brand stationery",
    image: "/categories/printing.png",
  },
];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Extra scroll distance (in vh) needed to reveal the chooser. Smaller = fewer swipes. */
const TRAVEL = 60;

export default function Hero({ whatsappNumber = "971542588446" }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const target = useRef(0);
  const smooth = useRef(0);
  const reduced = useRef(false);
  const [p, setP] = useState(0);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const travel = el.offsetHeight - window.innerHeight;
      target.current =
        travel > 0 ? clamp(-el.getBoundingClientRect().top / travel) : 0;
    };

    let raf = 0;
    const loop = () => {
      const diff = target.current - smooth.current;
      smooth.current =
        reduced.current || Math.abs(diff) < 0.0004
          ? target.current
          : smooth.current + diff * 0.2;
      setP((prev) =>
        Math.abs(prev - smooth.current) > 0.0002 ? smooth.current : prev,
      );
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

  const goToChooser = () => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (el.offsetHeight - window.innerHeight),
      behavior: reduced.current ? "auto" : "smooth",
    });
  };

  const t = easeOut(clamp(p / 0.85)); // 0 → 1 : headline lifts, chooser arrives
  const ready = p > 0.7;

  const waHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi Ziron Pro, I'd like to talk about a project.",
  )}`;

  const line1 = ["Work", "that", "speaks"];
  const line2 = ["before", "we", "do."];

  return (
    <section
      ref={sectionRef}
      className="zp-hero"
      style={{ height: `${100 + TRAVEL}vh` }}
      aria-label="Ziron Pro introduction and services"
    >
      <style>{CSS}</style>

      <div className="zp-stage">
        {/* thick ring + running ball with a fading trail */}
        <div
          className="zp-rings"
          aria-hidden="true"
          style={{ transform: `translate(-50%, -50%) rotate(${p * 160}deg)` }}
        >
          <span />
          <span />
          <div className="zp-orbit">
            <span className="zp-tail" />
            <b className="zp-ball" />
          </div>
        </div>

        <header className="zp-top">
          <a className="zp-logo" href="/" aria-label="Ziron Pro home">
            {/* Dark/purple logo for a white background. Change the path if yours differs. */}
            <img
              src="/logo/logo-main.png"
              alt="Ziron Pro"
              className="zp-logo-img"
            />
          </a>
          <a
            className="zp-wa"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>
        </header>

        {/* headline */}
        <div className="zp-headline-wrap">
          <h1
            className="zp-headline"
            style={{
              transform: `translate3d(0, ${-27 * t}vh, 0) scale(${1 - 0.5 * t})`,
            }}
          >
            <span className="zp-line">
              {line1.map((w, i) => (
                <span className="zp-word" key={w}>
                  <span style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
                    {w}
                  </span>
                </span>
              ))}
            </span>
            <span className="zp-line zp-purple">
              {line2.map((w, i) => (
                <span className="zp-word" key={w}>
                  <span style={{ animationDelay: `${0.45 + i * 0.09}s` }}>
                    {w}
                  </span>
                </span>
              ))}
            </span>
          </h1>
          <p
            className="zp-sub"
            style={{
              opacity: 1 - clamp(p / 0.2),
              transform: `translateY(${-p * 80}px)`,
            }}
          >
            Websites, brands, video, search, leads and print.
          </p>
        </div>

        {/* scroll cue */}
        <button
          type="button"
          className="zp-cue"
          onClick={goToChooser}
          style={{
            opacity: 1 - clamp(p / 0.15),
            pointerEvents: p > 0.1 ? "none" : "auto",
          }}
        >
          <span aria-hidden="true" />
          Choose a service
        </button>

        {/* chooser */}
        <nav
          className="zp-choose"
          aria-label="Choose a service"
          style={{
            opacity: clamp(t * 1.6),
            transform: `translate3d(0, ${(1 - t) * 40}vh, 0)`,
            pointerEvents: ready ? "auto" : "none",
          }}
        >
          {ITEMS.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="zp-item"
              tabIndex={ready ? 0 : -1}
            >
              <div className="zp-item-top">
                <span className="zp-item-title">{it.title}</span>
                <svg
                  className="zp-go"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="zp-item-media">
                <span className="zp-item-oval" aria-hidden="true" />
                <img
                  src={it.image}
                  alt={it.title}
                  className="zp-item-img"
                  loading="lazy"
                />
              </div>

              <span className="zp-item-ind">{it.industries}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.zp-hero{
  --white:#FFFFFF;
  --purple:#4D11A8;
  --purple-2:#8F2CF4;
  --black:#0D1420;
  position:relative; background:var(--white); color:var(--black);
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
}
.zp-hero *{box-sizing:border-box}
.zp-stage{position:sticky; top:0; height:100vh; height:100svh; overflow:hidden; background:var(--white)}

/* rings (purple) + running ball */
.zp-rings{
  --rw:clamp(12px,2.2vmin,22px);          /* ring thickness */
  --ball:clamp(26px,4.2vmin,44px);        /* ball size */
  position:absolute; left:50%; top:50%;
  width:min(92vmin,900px); height:min(92vmin,900px);
  pointer-events:none; will-change:transform;
}
.zp-rings>span{position:absolute; inset:0; border-radius:50%; border:var(--rw) solid rgba(77,17,168,.09)}
.zp-rings>span:nth-child(2){inset:16%; border:1.5px dashed rgba(143,44,244,.25)}

/* the ball runs around the ring */
.zp-orbit{position:absolute; inset:0; animation:zpOrbit 9s linear infinite}
@keyframes zpOrbit{to{transform:rotate(360deg)}}

/* tail: one continuous band, same width as the ball, fading out behind it */
.zp-tail{
  position:absolute; border-radius:50%;
  inset:calc(var(--rw) / 2 - var(--ball) / 2);
  background:conic-gradient(from 0deg, transparent 0deg, transparent 285deg, rgba(77,17,168,.38) 360deg);
  -webkit-mask:radial-gradient(farthest-side, transparent calc(100% - var(--ball)), #000 calc(100% - var(--ball) + .5px));
          mask:radial-gradient(farthest-side, transparent calc(100% - var(--ball)), #000 calc(100% - var(--ball) + .5px));
}
/* lead ball, same size as the tail width */
.zp-ball{
  position:absolute; left:50%; top:calc(var(--rw) / 2);
  width:var(--ball); height:var(--ball); border-radius:50%;
  transform:translate(-50%,-50%);
  background:radial-gradient(circle at 35% 30%, #C79BFF 0%, var(--purple-2) 45%, var(--purple) 100%);
  box-shadow:0 10px 18px -4px rgba(77,17,168,.45), 0 0 calc(var(--ball) * .8) rgba(143,44,244,.5);
}

/* top bar */
.zp-top{position:absolute; z-index:60; top:0; left:0; right:0; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zp-logo{display:inline-flex; align-items:center; text-decoration:none}
.zp-logo-img{height:clamp(28px,4vw,40px); width:auto; object-fit:contain; display:block}
.zp-wa{background:var(--black); color:var(--white); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:background .2s}
.zp-wa:hover{background:var(--purple)}
.zp-wa:focus-visible,.zp-logo:focus-visible,.zp-cue:focus-visible,.zp-item:focus-visible{outline:3px solid var(--purple-2); outline-offset:3px}

/* headline */
.zp-headline-wrap{position:absolute; inset:0; display:grid; place-items:center; align-content:center; z-index:50; pointer-events:none; padding:0 5vw; text-align:center}
.zp-headline{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(2.8rem,10vw,8.5rem); will-change:transform; font-variation-settings:'opsz' 96; color:var(--black)}
.zp-line{display:block}
.zp-purple{color:var(--purple)}
.zp-word{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.1em; margin:0 .14em}
.zp-word>span{display:inline-block; transform:translateY(110%); animation:zpRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zpRise{to{transform:translateY(0)}}
.zp-sub{margin:1.2rem 0 0; font-size:clamp(1rem,1.6vw,1.3rem); max-width:34ch; color:var(--black)}

/* scroll cue */
.zp-cue{all:unset; cursor:pointer; position:absolute; z-index:55; bottom:28px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:10px; font-size:.9rem; font-weight:600; color:var(--purple); font-family:inherit}
.zp-cue span{width:1.5px; height:40px; background:linear-gradient(var(--purple), transparent); transform-origin:top; animation:zpDrip 1.6s ease-in-out infinite}
@keyframes zpDrip{0%{transform:scaleY(0)} 60%{transform:scaleY(1)} 100%{transform:scaleY(1); opacity:0}}

/* chooser */
.zp-choose{
  position:absolute; z-index:60; left:clamp(14px,2.8vw,54px); right:clamp(14px,2.8vw,54px); bottom:clamp(16px,4vh,44px);
  height:min(50vh,440px);
  display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:clamp(10px,1.2vw,20px);
  will-change:transform,opacity;
}
.zp-item{
  position:relative; display:flex; flex-direction:column; justify-content:space-between;
  padding:clamp(14px,1.4vw,22px); text-decoration:none;
  background:var(--white); color:var(--black); border:1.5px solid var(--black); border-radius:20px;
  overflow:hidden;
  transition:background .25s cubic-bezier(.2,.8,.2,1), color .25s cubic-bezier(.2,.8,.2,1), border-color .25s cubic-bezier(.2,.8,.2,1), transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s cubic-bezier(.2,.8,.2,1);
}
.zp-item:hover,.zp-item:focus-visible{
  background:var(--purple); border-color:var(--purple); color:var(--white);
  transform:translateY(-6px);
  box-shadow:0 18px 36px -8px rgba(77,17,168,.3);
}

.zp-item-top{display:flex; justify-content:space-between; align-items:flex-start; gap:8px}
.zp-item-title{font-weight:800; letter-spacing:-.03em; line-height:1; font-size:clamp(1.2rem,1.9vw,2rem)}
.zp-go{flex-shrink:0; color:var(--purple); margin-top:2px; transition:color .25s, transform .25s}
.zp-item:hover .zp-go,.zp-item:focus-visible .zp-go{color:var(--white); transform:translate(3px, -2px)}

.zp-item-media{
  position:relative; flex:1; min-height:0; display:flex; align-items:center; justify-content:center;
  margin:clamp(8px,1.2vh,16px) 0; pointer-events:none;
}
.zp-item-oval{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  width:min(82%,144px); height:min(84%,128px);
  border-radius:50%;
  background:radial-gradient(ellipse at 42% 38%, #F8F2FF 0%, #E8DAFD 72%, #DEC7FC 100%);
  pointer-events:none; z-index:1;
  transition:transform .35s cubic-bezier(.2,.8,.2,1), background .25s ease;
}
.zp-item:hover .zp-item-oval,.zp-item:focus-visible .zp-item-oval{
  transform:translate(-50%,-50%) scale(1.06);
  background:rgba(255,255,255,.16);
}
.zp-item-img{
  position:relative; z-index:2;
  max-width:96%; max-height:96%; width:auto; height:auto; object-fit:contain;
  filter:drop-shadow(0 10px 18px rgba(77,17,168,.14));
  transition:transform .35s cubic-bezier(.2,.8,.2,1), filter .35s cubic-bezier(.2,.8,.2,1);
}
.zp-item:hover .zp-item-img,.zp-item:focus-visible .zp-item-img{
  transform:scale(1.08) translateY(-3px);
  filter:drop-shadow(0 14px 24px rgba(0,0,0,.35));
}

.zp-item-ind{
  font-size:clamp(.75rem,.85vw,.9rem); line-height:1.3; font-weight:400; max-width:22ch;
  color:rgba(13,20,32,.72);
  transition:color .25s;
}
.zp-item:hover .zp-item-ind,.zp-item:focus-visible .zp-item-ind{color:rgba(255,255,255,.9)}

/* tablet: 3 x 2 */
@media (max-width:1000px){
  .zp-choose{grid-template-columns:repeat(3,minmax(0,1fr)); grid-template-rows:repeat(2,1fr); height:min(54vh,480px); gap:clamp(10px,1.4vw,16px)}
  .zp-item{padding:clamp(12px,1.5vw,18px)}
  .zp-item-title{font-size:clamp(1.2rem,2.8vw,1.65rem)}
  .zp-item-ind{font-size:.76rem}
  .zp-item-media{margin:4px 0}
  .zp-item-oval{width:min(84%,120px); height:min(86%,106px)}
}
/* mobile: 2 x 3 */
@media (max-width:560px){
  .zp-choose{grid-template-columns:repeat(2,minmax(0,1fr)); grid-template-rows:repeat(3,1fr); height:min(60vh,500px); gap:8px}
  .zp-item{border-radius:16px; padding:10px 12px}
  .zp-item-title{font-size:1.15rem}
  .zp-item-ind{font-size:.68rem; line-height:1.2}
  .zp-item-media{margin:2px 0}
  .zp-item-oval{width:min(86%,90px); height:min(88%,78px)}
  .zp-go{width:16px; height:16px}
}

@media (prefers-reduced-motion: reduce){
  .zp-word>span{animation:none; transform:none}
  .zp-cue span{animation:none}
  .zp-orbit{animation:none}
  .zp-item{transition:none}
  .zp-item-img{transition:none}
  .zp-item-oval{transition:none}
  .zp-go{transition:none}
}
`;
