"use client";

/**
 * Ziron Pro — Video page (route: /video)
 * Vertical 9:16 reels. Cards show a poster, preview silently on hover (desktop)
 * or while in view (touch), and open a modal player with sound on click.
 */

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Shell, {
  ArrowUpRight,
  CloseIcon,
  useSeen,
  useModal,
  waLink,
} from "../CategoryShell";

type Video = {
  id: string;
  title: string;
  industry: string;
  kind: "Ad film" | "Reel" | "Product";
  duration: string;
  slug: string; // files: /video/{slug}.mp4|.webm, /video/posters/{slug}.jpg
  description: string;
};

const VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Biznorx Realty",
    industry: "Real Estate",
    kind: "Ad film",
    duration: "0:17",
    slug: "biznorx-launch",
    description:
      "Cinematic launch teaser for Biznorx Realty highlighting landmark architecture, urban skyline presence, and premium property development.",
  },
  {
    id: "v2",
    title: "Crystal Shield",
    industry: "Window Film",
    kind: "Reel",
    duration: "0:15",
    slug: "crystal-shield",
    description:
      "Dynamic geo-targeted social reel showcasing high-performance residential window tinting and thermal heat insulation across Abu Dhabi luxury villas.",
  },
  {
    id: "v3",
    title: "Energex Power",
    industry: "Industrial Power",
    kind: "Ad film",
    duration: "0:29",
    slug: "energex-industrial",
    description:
      "High-impact cinematic promo for Energex heavy industrial backup generators powering mega infrastructure, earthmoving, and construction sites.",
  },
  {
    id: "v4",
    title: "Energex Rental",
    industry: "Equipment Rental",
    kind: "Product",
    duration: "0:21",
    slug: "energex-rental",
    description:
      "Engaging on-site walkthrough and product feature reel detailing turnkey generator rental fleet solutions and 24/7 power reliability.",
  },
  {
    id: "v5",
    title: "S.A.J Legal Solicitors",
    industry: "Legal Services",
    kind: "Ad film",
    duration: "0:12",
    slug: "saj-solicitors",
    description:
      "Sophisticated brand storytelling reel for S.A.J Legal Solicitors — 'Every case has a story' — emphasizing justice, advocacy, and client commitment.",
  },
  {
    id: "v6",
    title: "SSI Solar Safety",
    industry: "Solar Insulation",
    kind: "Reel",
    duration: "0:17",
    slug: "ssi-insulation",
    description:
      "Commercial installation reel highlighting Solar Safety Insulation LLC applying heat-reflective safety film on high-rise architectural facades.",
  },
];

const poster = (v: Video) => `/video/posters/${v.slug}.jpg`;

/** WebM first (smaller), MP4 as fallback. */
const Sources = ({ v }: { v: Video }) => (
  <>
    <source src={`/video/${v.slug}.webm`} type="video/webm" />
    <source src={`/video/${v.slug}.mp4`} type="video/mp4" />
  </>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden="true">
    <path d="M8 5v14l11-7z" fill="currentColor" />
  </svg>
);

/* ---------- Card thumbnail ----------
 * The <video> is only mounted while the card is active (hover / focus / in view),
 * so nothing is downloaded until a preview is actually needed. */
function Thumb({ v }: { v: Video }) {
  const [wrap, setWrap] = useState<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  const on = useCallback(() => setActive(true), []);
  const off = useCallback(() => {
    setActive(false);
    setPlaying(false);
  }, []);

  // Touch devices have no hover: preview while the card is mostly on screen.
  useEffect(() => {
    if (!wrap || !window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? on() : off()),
      { threshold: 0.6 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [wrap, on, off]);

  return (
    <span
      ref={setWrap}
      className={`zv-media${playing ? " is-playing" : ""}`}
      onMouseEnter={on}
      onMouseLeave={off}
    >
      <img src={poster(v)} alt="" loading="lazy" decoding="async" />
      {active && (
        <video
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onPlaying={() => setPlaying(true)}
        >
          <Sources v={v} />
        </video>
      )}
      <span className="zv-play" aria-hidden="true">
        <PlayIcon />
      </span>
      <span className="zv-dur">{v.duration}</span>
    </span>
  );
}

function Card({
  v,
  i,
  onOpen,
}: {
  v: Video;
  i: number;
  onOpen: (v: Video) => void;
}) {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      className={`zv-card zs-reveal${seen ? " in" : ""}`}
      style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties}
      onClick={() => onOpen(v)}
      aria-label={`Play ${v.title} — ${v.industry} ${v.kind}`}
    >
      <Thumb v={v} />
      <span className="zv-cap">
        <span className="zv-ind-tag">{v.industry}</span>
        <span className="zv-ind">{v.title}</span>
        <span className="zv-kind">{v.kind}</span>
      </span>
    </button>
  );
}

/* ---------- Modal player ---------- */
function Player({
  v,
  onClose,
  whatsappNumber = "971542588446",
}: {
  v: Video;
  onClose: () => void;
  whatsappNumber?: string;
}) {
  useModal(onClose);

  const waHref = waLink(
    whatsappNumber,
    `Hi Ziron Pro, I saw the "${v.title}" video and would like to produce a similar video.`,
  );

  return (
    <div
      className="zv-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${v.title} — ${v.kind}`}
      onClick={onClose}
    >
      <div className="zv-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="zv-modal-top">
          <div className="zv-modal-title">
            <span className="zv-modal-tag">
              {v.industry} • {v.kind}
            </span>
            <b>{v.title}</b>
          </div>
          <div className="zv-modal-actions">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="zv-modal-wa"
            >
              Enquire
              <ArrowUpRight />
            </a>
            <button
              type="button"
              className="zv-x"
              onClick={onClose}
              aria-label="Close video"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="zv-player">
          <video poster={poster(v)} controls autoPlay playsInline>
            <Sources v={v} />
          </video>
        </div>

        <div className="zv-modal-foot">
          <p className="zv-modal-desc">{v.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function VideoPage({
  whatsappNumber,
  backHref,
}: {
  whatsappNumber?: string;
  backHref?: string;
}) {
  const [open, setOpen] = useState<Video | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <Shell
      words={["Stories", "worth", "watching."]}
      sub="Shot, scripted, and cut to hold attention. Hover to preview, tap to watch."
      waText="Hi Ziron Pro, I'd like a video made."
      ctaTitle="Let’s roll camera."
      ctaLabel="Chat on WhatsApp"
      label="Video projects"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={
        open && (
          <Player v={open} onClose={close} whatsappNumber={whatsappNumber} />
        )
      }
    >
      <style>{CSS}</style>
      <div className="zv-grid">
        {VIDEOS.map((v, i) => (
          <Card key={v.id} v={v} i={i} onOpen={setOpen} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,230px));justify-content:center;gap:clamp(16px,2vw,28px);margin-bottom:clamp(12px,2.5vw,32px)}
@media(max-width:540px){.zv-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}}

.zv-card{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:12px;width:100%}
.zv-card:focus-visible{outline:2px solid var(--purple);outline-offset:4px;border-radius:16px}

.zv-media{position:relative;display:block;width:100%;aspect-ratio:9/16;overflow:hidden;background:var(--black);border-radius:14px;border:1.5px solid var(--line);box-shadow:0 4px 14px rgba(13,20,32,.05);transition:transform .4s cubic-bezier(.2,.8,.2,1),border-color .3s,box-shadow .4s}
.zv-card:hover .zv-media,.zv-card:focus-visible .zv-media{transform:translateY(-6px);border-color:var(--purple);box-shadow:0 18px 36px -8px rgba(77,17,168,.25)}
.zv-media img,.zv-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.zv-media video{z-index:1;opacity:0;transition:opacity .35s}
.zv-media.is-playing video{opacity:1}

.zv-play{position:absolute;left:50%;top:50%;z-index:2;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(255,255,255,.94);color:var(--black);display:grid;place-items:center;padding-left:3px;box-shadow:0 8px 24px rgba(0,0,0,.3);transition:transform .35s cubic-bezier(.3,1.6,.5,1),background .2s,color .2s,opacity .3s}
.zv-card:hover .zv-play{transform:scale(1.12);background:var(--purple);color:#fff}
.zv-media.is-playing .zv-play{opacity:0;transform:scale(.8);pointer-events:none}

.zv-dur{position:absolute;right:10px;bottom:10px;z-index:2;background:rgba(13,20,32,.85);color:#fff;font-weight:700;font-size:.78rem;padding:4px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.15);letter-spacing:.02em}

.zv-cap{display:flex;flex-direction:column;gap:3px;padding:0 2px}
.zv-ind-tag{font-size:.74rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--purple)}
.zv-ind{font-weight:800;font-size:1rem;letter-spacing:-.02em;color:var(--black);line-height:1.25}
.zv-kind{font-size:.84rem;opacity:.65;color:var(--black)}

/* Modal */
.zv-modal{position:fixed;inset:0;z-index:200;background:rgba(13,20,32,.88);backdrop-filter:blur(12px);color:#fff;display:flex;align-items:center;justify-content:center;padding:clamp(12px,2.5vw,24px);animation:zsFade .25s ease}
.zv-modal-sheet{width:min(440px,94vw);max-height:94vh;display:flex;flex-direction:column;background:#0E131F;border-radius:20px;border:1px solid rgba(255,255,255,.14);box-shadow:0 24px 64px rgba(0,0,0,.5);overflow:hidden;animation:zvPop .35s cubic-bezier(.2,.8,.2,1)}
@keyframes zvPop{from{opacity:0;transform:scale(.96) translateY(20px)}}

.zv-modal-top{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03)}
.zv-modal-title{display:flex;flex-direction:column;gap:2px}
.zv-modal-tag{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--purple-2)}
.zv-modal-title b{font-size:1.15rem;font-weight:800;letter-spacing:-.02em}
.zv-modal-actions{display:flex;align-items:center;gap:10px}
.zv-modal-wa{display:inline-flex;align-items:center;gap:6px;background:var(--purple);color:#fff;text-decoration:none;font-size:.8rem;font-weight:700;padding:7px 14px;border-radius:999px;transition:background .2s,transform .2s}
.zv-modal-wa:hover{background:var(--purple-2);transform:translateY(-1px)}
.zv-x{border:0;background:rgba(255,255,255,.12);color:#fff;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;cursor:pointer;transition:background .2s}
.zv-x:hover{background:rgba(255,255,255,.25)}

.zv-player{width:100%;aspect-ratio:9/16;max-height:min(68vh,640px);background:#000}
.zv-player video{width:100%;height:100%;object-fit:contain}

.zv-modal-foot{padding:12px 18px;border-top:1px solid rgba(255,255,255,.08)}
.zv-modal-desc{margin:0;font-size:.84rem;line-height:1.5;color:rgba(255,255,255,.8)}

@media(prefers-reduced-motion:reduce){
  .zv-media,.zv-media video,.zv-play,.zv-modal-wa{transition:none}
  .zv-modal,.zv-modal-sheet{animation:none}
}
`;
