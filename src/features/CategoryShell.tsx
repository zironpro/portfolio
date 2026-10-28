"use client";

/**
 * Ziron Pro — shared shell for every category page
 * ---------------------------------------------------------------
 * One place for the header, filter chips, closing strip, modal base
 * and the brand palette, so all six pages stay identical in look.
 *
 * Palette (Ziron Pro only):  white 60% · purple 30% · black 10%
 *   white   #FFFFFF
 *   purple  #4D11A8  (+ #8F2CF4, #6620EE as lighter accents)
 *   black   #0D1420
 */

import React, { useEffect, useRef, useState } from "react";

/* ---------- shared bits ---------- */
export const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      d="M7 17L17 7M9 7h8v8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export const waLink = (number: string = "971542588446", text: string) =>
  `https://wa.me/${(number || "971542588446").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

/** Fires once when the element scrolls into view (for the reveal animation). */
export function useSeen<T extends Element>() {
  const ref = useRef<T | null>(null);
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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/** Locks page scroll and closes on Escape while a modal is open. */
export function useModal(
  onClose: () => void,
  onKey?: (e: KeyboardEvent) => void,
) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      onKey?.(e);
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onKey]);
}

/* ---------- shell ---------- */
type ShellProps = {
  words: string[];
  sub: string;
  waText: string;
  ctaTitle: string;
  ctaLabel: string;
  whatsappNumber?: string;
  backHref?: string;
  label: string;
  children: React.ReactNode;
  /** rendered after the closing strip (modals) */
  overlay?: React.ReactNode;
};

export default function CategoryShell({
  words,
  sub,
  waText,
  ctaTitle,
  ctaLabel,
  whatsappNumber = "971542588446",
  backHref = "/",
  label,
  children,
  overlay,
}: ShellProps) {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = waLink(whatsappNumber, waText);

  return (
    <main className="zs-page">
      <style>{SHELL_CSS}</style>

      <header className="zs-head">
        <div
          className="zs-rings"
          aria-hidden="true"
          style={{ transform: `translate(-50%, -50%) rotate(${y * 0.12}deg)` }}
        >
          <span />
          <span />
          <span />
        </div>

        <nav className="zs-nav">
          <a className="zs-logo" href={backHref} aria-label="Ziron Pro home">
            <img
              src="/logo/white-logo.png"
              alt="Ziron Pro"
              className="zs-logo-img"
            />
          </a>
          <a
            className="zs-wa"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>
        </nav>

        <div
          className="zs-head-body"
          style={{
            transform: `translateY(${Math.min(y, 400) * 0.25}px)`,
            opacity: 1 - Math.min(y / 520, 1),
          }}
        >
          <a className="zs-back" href={backHref}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All work
          </a>
          <h1 className="zs-h1">
            {words.map((w, i) => (
              <span className="zs-word" key={i}>
                <span style={{ animationDelay: `${0.1 + i * 0.09}s` }}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="zs-sub">{sub}</p>
        </div>
      </header>

      <section className="zs-body" aria-label={label}>
        {children}
      </section>

      <section className="zs-cta">
        <h2>{ctaTitle}</h2>
        <a href={wa} target="_blank" rel="noopener noreferrer">
          {ctaLabel} <ArrowUpRight />
        </a>
      </section>

      {overlay}
    </main>
  );
}

/* ---------- styles ---------- */
export const SHELL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

.zs-page{
  --white:#FFFFFF; --purple:#4D11A8; --purple-2:#8F2CF4; --purple-3:#6620EE; --black:#0D1420;
  --tint:color-mix(in srgb, var(--purple) 7%, #fff);
  --line:rgba(13,20,32,.14);
  min-height:100vh; background:var(--white); color:var(--black);
  font-family:'Bricolage Grotesque', system-ui, sans-serif;
}
.zs-page *{box-sizing:border-box}
.zs-page button{font-family:inherit}

/* header: shorter so the work shows up sooner */
.zs-head{position:relative; overflow:hidden; background:var(--purple); color:var(--white); min-height:min(54vh,460px); display:flex; flex-direction:column; border-radius:0 0 32px 32px}
.zs-rings{position:absolute; left:78%; top:60%; width:120vmax; height:120vmax; pointer-events:none; will-change:transform}
.zs-rings span{position:absolute; inset:0; border-radius:50%; border:1.5px solid rgba(255,255,255,.16)}
.zs-rings span:nth-child(2){inset:18%; border-style:dashed; border-color:rgba(255,255,255,.2)}
.zs-rings span:nth-child(3){inset:36%; border-color:var(--purple-2)}
.zs-rings span:nth-child(3)::after{content:""; position:absolute; top:-9px; left:50%; width:18px; height:18px; border-radius:50%; background:var(--white)}

.zs-nav{position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; padding:20px clamp(18px,4vw,48px)}
.zs-logo{display:inline-flex; align-items:center; text-decoration:none}
.zs-logo-img{height:clamp(28px,4vw,40px); width:auto; object-fit:contain; display:block}
.zs-wa{background:var(--white); color:var(--black); text-decoration:none; font-weight:600; font-size:.95rem; padding:10px 18px; border-radius:999px; transition:background .2s, color .2s}
.zs-wa:hover{background:var(--black); color:var(--white)}

.zs-head-body{position:relative; z-index:2; margin-top:auto; padding:0 clamp(18px,4vw,48px) clamp(28px,4.5vw,52px); will-change:transform,opacity}
.zs-back{display:inline-flex; align-items:center; gap:6px; color:var(--white); text-decoration:none; font-weight:600; font-size:.92rem; margin-bottom:clamp(12px,2.4vw,22px); padding:6px 12px 6px 8px; border-radius:999px; border:1.5px solid rgba(255,255,255,.4); transition:background .2s}
.zs-back:hover{background:rgba(255,255,255,.14)}
.zs-h1{margin:0; font-weight:800; line-height:1; letter-spacing:-.035em; font-size:clamp(2.6rem,8vw,6.5rem); max-width:12ch; font-variation-settings:'opsz' 96}
.zs-word{display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:.08em; margin-right:.26em}
.zs-word:last-child{margin-right:0}
.zs-word>span{display:inline-block; transform:translateY(110%); animation:zsRise .9s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes zsRise{to{transform:none}}
.zs-sub{margin:1rem 0 0; font-size:clamp(1rem,1.5vw,1.2rem); max-width:52ch}

/* body */
.zs-body{padding:clamp(24px,3.5vw,48px) clamp(16px,2.8vw,54px) clamp(40px,5vw,72px)}

/* reveal (higher specificity so card resets like "all:unset" can't cancel it) */
.zs-page .zs-reveal{opacity:0; transform:translateY(40px); transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1); transition-delay:var(--d,0ms)}
.zs-page .zs-reveal.in{opacity:1; transform:none}

/* closing strip */
.zs-cta{background:var(--black); color:var(--white); border-radius:32px 32px 0 0; padding:clamp(36px,6vw,80px) clamp(18px,4vw,48px); display:flex; flex-wrap:wrap; gap:20px 40px; align-items:center; justify-content:space-between}
.zs-cta h2{margin:0; font-weight:800; letter-spacing:-.04em; line-height:.95; font-size:clamp(2.2rem,6.5vw,5rem)}
.zs-cta a{display:inline-flex; align-items:center; gap:8px; background:var(--purple); color:var(--white); text-decoration:none; font-weight:600; padding:14px 26px; border-radius:999px; transition:background .2s, transform .2s}
.zs-cta a:hover{background:var(--purple-2); transform:translateY(-3px)}

/* modal base */
.zs-modal{position:fixed; inset:0; z-index:200; background:rgba(13,20,32,.78); backdrop-filter:blur(6px); display:grid; place-items:center; padding:16px; animation:zsFade .25s ease}
@keyframes zsFade{from{opacity:0}}
.zs-sheet{width:min(680px,100%); max-height:calc(100vh - 32px); overflow:auto; background:var(--white); color:var(--black); border-radius:20px; display:flex; flex-direction:column; box-shadow:0 24px 60px rgba(13,20,32,.4)}
.zs-sheet-top{display:flex; justify-content:space-between; align-items:center; gap:12px; padding:20px 24px; border-bottom:1.5px solid var(--line)}
.zs-sheet-ind{font-size:1.3rem; letter-spacing:-.02em; display:block}
.zs-sheet-kind{font-size:.9rem; opacity:.65}
.zs-close{border:0; background:var(--tint); color:var(--black); width:38px; height:38px; border-radius:50%; display:grid; place-items:center; cursor:pointer; flex:none}
.zs-close:hover{background:var(--black); color:var(--white)}
.zs-sheet-body{padding:24px; display:flex; flex-direction:column; gap:22px}
.zs-sheet-foot{padding:16px 24px 24px}
.zs-btn{display:inline-flex; width:100%; justify-content:center; align-items:center; gap:8px; background:var(--purple); color:var(--white); text-decoration:none; font-weight:700; padding:14px; border-radius:999px; transition:background .2s, transform .2s}
.zs-btn:hover{background:var(--black); transform:translateY(-2px)}
.zs-stats{display:grid; grid-template-columns:repeat(3,1fr); gap:12px; background:var(--tint); padding:16px; border-radius:12px}
.zs-stats span{font-size:.8rem; opacity:.65; display:block}
.zs-stats b{font-size:1.4rem; letter-spacing:-.02em}
.zs-h3{margin:0 0 10px; font-size:1.05rem}
.zs-p{margin:0; opacity:.78; line-height:1.55; font-size:.95rem}

/* focus */
.zs-page a:focus-visible, .zs-page button:focus-visible{outline:3px solid var(--purple-2); outline-offset:3px}

@media (prefers-reduced-motion: reduce){
  .zs-word>span{animation:none; transform:none}
  .zs-page .zs-reveal{opacity:1; transform:none; transition:none}
  .zs-modal{animation:none}
}
`;
