"use client";

/**
 * Ziron Pro — Video page (route: /video)
 * Vertical 9:16 reels, 4 per row on desktop. Cards show the video's own first
 * frame (no poster images) and play silently on hover. Click opens a modal
 * player with sound and project details.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
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
  slug: string; // files: /video/{slug}.webm & /video/{slug}.mp4
  description: string;
};

const VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Via Sakan",
    industry: "Real Estate",
    kind: "Ad film",
    duration: "0:48",
    slug: "via-sakan",
    description:
      "Cinematic architectural tour exploring bespoke luxury villa residences, modern interior finishing, and prestigious community living in the UAE.",
  },
  {
    id: "v2",
    title: "The Fitness Lab",
    industry: "Health & Fitness",
    kind: "Reel",
    duration: "0:37",
    slug: "fitness-lab",
    description:
      "High-energy social reel presenting bespoke in-home personal training for ladies, posture alignment, and strength conditioning.",
  },
  {
    id: "v3",
    title: "Roots Wellness",
    industry: "Beauty & Wellness",
    kind: "Reel",
    duration: "0:31",
    slug: "roots",
    description:
      "Serene lifestyle video highlighting authentic Ayurvedic therapies, holistic body care, and rejuvenating natural herbal treatments.",
  },
  {
    id: "v4",
    title: "Vila Ventures",
    industry: "Wellness & Lifestyle",
    kind: "Reel",
    duration: "0:54",
    slug: "vila-ventures",
    description:
      "Inspiring journey documentary reel following transformative mindfulness sessions, therapeutic yoga postures, and personal wellness growth.",
  },
  {
    id: "v5",
    title: "Delta Equipment",
    industry: "Industrial Equipment",
    kind: "Ad film",
    duration: "0:13",
    slug: "delta",
    description:
      "Dynamic brand commercial showcasing Delta Equipment's premier facility and authorized JCB heavy machinery dealership in the UAE.",
  },
  {
    id: "v6",
    title: "Delta JCB 225LCM",
    industry: "Heavy Machinery",
    kind: "Product",
    duration: "0:24",
    slug: "delta-jcb-225lcm",
    description:
      "Heavy earthmoving machinery reel demonstrating the JCB 225LCM tracked excavator on active civil construction and excavation sites.",
  },
  {
    id: "v7",
    title: "Energex Power",
    industry: "Equipment Rental",
    kind: "Product",
    duration: "0:21",
    slug: "energex-rental",
    description:
      "On-camera walkthrough detailing turnkey commercial generator rental solutions, power backup fleets, and 24/7 technical support.",
  },
  {
    id: "v8",
    title: "S.A.J Legal Solicitors",
    industry: "Legal Services",
    kind: "Ad film",
    duration: "0:12",
    slug: "saj-solicitors",
    description:
      "Sophisticated brand storytelling reel for S.A.J Legal Solicitors — 'Every case has a story' — emphasizing justice, advocacy, and client commitment.",
  },
  {
    id: "v9",
    title: "SSI Solar Safety",
    industry: "Architectural Glazing",
    kind: "Reel",
    duration: "0:17",
    slug: "ssi-insulation",
    description:
      "Commercial high-rise installation reel showing Solar Safety Insulation LLC applying heat-reflective architectural safety film on glazed facades.",
  },
];

/** WebM first (smaller), MP4 as fallback. `hash` e.g. "#t=0.1" shows a frame. */
const Sources = ({ v, hash = "" }: { v: Video; hash?: string }) => (
  <>
    <source src={`/video/${v.slug}.webm${hash}`} type="video/webm" />
    <source src={`/video/${v.slug}.mp4${hash}`} type="video/mp4" />
  </>
);

/* ---------- Card thumbnail ----------
 * The video itself is the thumbnail: paused on its first frame, no poster.
 * - Mounted only once the card is near the viewport (lazy), so off-screen
 *   cards download nothing.
 * - preload="metadata" loads just enough to show the first frame.
 * - Mouse hover plays it silently; leaving pauses and rewinds to the frame.
 * - Touch devices don't trigger hover playback; a tap opens the player. */
function Thumb({ v }: { v: Video }) {
  const [wrap, setWrap] = useState<HTMLSpanElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMounted(true);
          io.disconnect(); // mount once, keep the frame afterwards
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [wrap]);

  const play = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  };

  const stop = () => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0.1;
  };

  return (
    <span
      ref={setWrap}
      className="zv-media"
      onPointerEnter={(e) => e.pointerType === "mouse" && play()}
      onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
      onFocus={play}
      onBlur={stop}
    >
      {mounted && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
        >
          {/* #t=0.1 makes the browser (incl. iOS Safari) render a frame */}
          <Sources v={v} hash="#t=0.1" />
        </video>
      )}
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
      style={{ "--d": `${(i % 4) * 90}ms` } as CSSProperties}
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
          <video controls autoPlay playsInline>
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
      sub="Shot, scripted, and cut to hold attention. Hover to preview, tap to watch with sound."
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
.zv-grid{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:clamp(14px,1.8vw,28px);
  width:100%;
  margin:0 0 clamp(12px,2.5vw,32px);
}
@media(max-width:820px){
  .zv-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
}
@media(max-width:540px){
  .zv-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
}

.zv-card{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:12px;width:100%}
.zv-card:focus-visible{outline:2px solid var(--purple);outline-offset:4px;border-radius:16px}

.zv-media{position:relative;display:block;width:100%;aspect-ratio:9/16;overflow:hidden;background:var(--black);border-radius:14px;border:1.5px solid var(--line);box-shadow:0 4px 14px rgba(13,20,32,.05);transition:transform .4s cubic-bezier(.2,.8,.2,1),border-color .3s,box-shadow .4s}
.zv-card:hover .zv-media,.zv-card:focus-visible .zv-media{transform:translateY(-6px);border-color:var(--purple);box-shadow:0 18px 36px -8px rgba(77,17,168,.25)}
.zv-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}

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
  .zv-media,.zv-modal-wa{transition:none}
  .zv-modal,.zv-modal-sheet{animation:none}
}
`;