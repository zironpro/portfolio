"use client";

/**
 * Ziron Pro — Websites page  (route: /website)
 * Hover scrolls the screenshot like a real page; click opens a live preview (desktop / mobile).
 * Per project: image = tall screenshot ("/work/sites/realestate-1.jpg"), url = live link.
 */

import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import Shell, {
  ArrowUpRight,
  CloseIcon,
  Filters,
  useSeen,
  useModal,
} from "../CategoryShell";

type Project = {
  id: string;
  industry: string;
  kind: string;
  url: string;
  tone: string;
  image?: string;
};

const P = "#4D11A8",
  P2 = "#8F2CF4",
  P3 = "#6620EE",
  K = "#0D1420";

const PROJECTS: Project[] = [
  {
    id: "w1",
    industry: "Real estate",
    kind: "Biznorx Realty — Property showcase",
    url: "https://biznorxrealty.com",
    tone: P,
    image: "/websites/biznorx-realty.jpg",
  },
  {
    id: "w2",
    industry: "Real estate",
    kind: "Vila Ventures — Luxury estates",
    url: "https://vilaventures.com",
    tone: P2,
    image: "/websites/vila-ventures.jpg",
  },
  {
    id: "w3",
    industry: "Retail & Equipment",
    kind: "Delta Equipment — Machinery catalogue",
    url: "https://deltaequipment.com",
    tone: K,
    image: "/websites/delta-equipment.jpg",
  },
  {
    id: "w4",
    industry: "Energy & Power",
    kind: "Energex — Clean solar solutions",
    url: "https://energex.com",
    tone: P3,
    image: "/websites/energex.jpg",
  },
  {
    id: "w5",
    industry: "Energy & Power",
    kind: "100 Power — Industrial power systems",
    url: "https://100power.com",
    tone: P,
    image: "/websites/100-power.jpg",
  },
  {
    id: "w6",
    industry: "Logistics",
    kind: "Maxline — Freight & supply chain",
    url: "https://maxline.com",
    tone: K,
    image: "/websites/maxline.jpg",
  },
  {
    id: "w7",
    industry: "Technology",
    kind: "Qordx — Digital platform & analytics",
    url: "https://qordx.com",
    tone: P2,
    image: "/websites/qordx.jpg",
  },
];

type Props = { whatsappNumber?: string; backHref?: string };

const Mock: React.FC<{ tone: string }> = ({ tone }) => (
  <div
    className="zw-mock"
    style={{ ["--tone" as string]: tone }}
    aria-hidden="true"
  >
    <div className="zw-mock-bar">
      <i />
      <i />
      <i />
    </div>
    <div className="zw-mock-page">
      <div className="m-hero" />
      <div className="m-row">
        <b />
        <b />
        <b />
      </div>
      <div className="m-line" />
      <div className="m-line s" />
      <div className="m-row">
        <b />
        <b />
      </div>
      <div className="m-hero b" />
    </div>
  </div>
);

const Card: React.FC<{
  p: Project;
  i: number;
  onOpen: (p: Project) => void;
}> = ({ p, i, onOpen }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      className={`zw-card zs-reveal ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`Preview ${p.industry} website`}
    >
      <span className="zw-shot">
        {p.image ? (
          <img src={p.image} alt="" loading="lazy" />
        ) : (
          <Mock tone={p.tone} />
        )}
        <span className="zw-view">
          View <ArrowUpRight />
        </span>
      </span>
      <span className="zw-cap">
        <span className="zw-ind">{p.industry}</span>
        <span className="zw-kind">{p.kind}</span>
      </span>
    </button>
  );
};

const Preview: React.FC<{ p: Project; onClose: () => void }> = ({
  p,
  onClose,
}) => {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useModal(onClose);
  useEffect(() => closeRef.current?.focus(), []);

  return (
    <div
      className="zs-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.industry} website preview`}
      onClick={onClose}
    >
      <div className="zw-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="zw-top">
          <div className="zw-title">
            <b>{p.industry}</b>
            <span>{p.kind}</span>
          </div>
          <div className="zw-toggle" role="group" aria-label="Preview size">
            <button
              type="button"
              className={device === "desktop" ? "on" : ""}
              onClick={() => setDevice("desktop")}
            >
              Desktop
            </button>
            <button
              type="button"
              className={device === "mobile" ? "on" : ""}
              onClick={() => setDevice("mobile")}
            >
              Mobile
            </button>
          </div>
          <a
            className="zw-visit"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit live site <ArrowUpRight />
          </a>
          <button
            ref={closeRef}
            type="button"
            className="zs-close"
            onClick={onClose}
            aria-label="Close preview"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="zw-stage">
          <div className={`zw-frame ${device}`}>
            {!loaded && (
              <div className="zw-loading">
                <span />
              </div>
            )}
            <iframe
              key={device + p.id}
              src={p.url}
              title={`${p.industry} live website`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>
        <p className="zw-note">
          Preview not loading? Some sites block embedding. Use “Visit live
          site”.
        </p>
      </div>
    </div>
  );
};

export default function WebsitesPage({ whatsappNumber, backHref }: Props) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);
  const industries = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.industry)))],
    [],
  );
  const shown = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.industry === filter),
    [filter],
  );
  const close = useCallback(() => setOpen(null), []);

  return (
    <Shell
      words={["Websites", "that", "work", "for", "you."]}
      sub="Live sites. Tap any to preview."
      waText="Hi Ziron Pro, I'd like a website."
      ctaTitle="Let’s build yours."
      ctaLabel="Chat on WhatsApp"
      label="Website projects"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={open && <Preview p={open} onClose={close} />}
    >
      <style>{CSS}</style>
      <Filters
        items={industries}
        value={filter}
        onChange={setFilter}
        label="Filter by industry"
      />
      <div className="zw-grid">
        {shown.map((p, i) => (
          <Card key={filter + p.id} p={p} i={i} onOpen={setOpen} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zw-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zw-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zw-grid{grid-template-columns:1fr} }

.zw-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px}
.zw-shot{position:relative; display:block; aspect-ratio:4/3; overflow:hidden; background:#fff; border:1.5px solid var(--line); border-radius:10px; transition:transform .5s cubic-bezier(.2,.8,.2,1), border-color .3s}
.zw-card:hover .zw-shot{transform:translateY(-6px); border-color:var(--purple)}
.zw-shot img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 0%; transition:object-position 2s cubic-bezier(.35, 0, .2, 1); will-change:object-position}
.zw-card:hover .zw-shot img, .zw-card:focus-visible .zw-shot img{object-position:50% 100%; transition:object-position 4.2s cubic-bezier(.35, 0, .2, 1)}
.zw-view{position:absolute; right:12px; bottom:12px; display:inline-flex; align-items:center; gap:6px; background:var(--black); color:#fff; font-weight:600; font-size:.9rem; padding:8px 14px; border-radius:999px; opacity:0; transform:translateY(8px); transition:opacity .3s, transform .3s}
.zw-card:hover .zw-view, .zw-card:focus-visible .zw-view{opacity:1; transform:none}
@media (hover:none){ .zw-view{opacity:1; transform:none} }
.zw-cap{display:flex; justify-content:space-between; align-items:baseline; gap:12px}
.zw-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zw-kind{font-size:.92rem; opacity:.65}

/* mock thumbnail */
.zw-mock{position:absolute; inset:0; background:color-mix(in srgb, var(--tone) 10%, #fff); display:flex; flex-direction:column}
.zw-mock-bar{flex:none; height:11%; background:#fff; display:flex; align-items:center; gap:5px; padding:0 4%; border-bottom:1.5px solid var(--line)}
.zw-mock-bar i{width:7px; height:7px; border-radius:50%; background:rgba(13,20,32,.25)}
.zw-mock-page{display:grid; gap:7%; padding:5%; transition:transform 3s cubic-bezier(.4,0,.2,1)}
.zw-card:hover .zw-mock-page{transform:translateY(-38%)}
.m-hero{height:clamp(70px,13vw,150px); border-radius:8px; background:var(--tone)}
.m-hero.b{background:color-mix(in srgb, var(--tone) 55%, #0D1420)}
.m-row{display:flex; gap:5%}
.m-row b{flex:1; height:clamp(36px,6vw,70px); border-radius:6px; background:rgba(13,20,32,.1)}
.m-line{height:10px; width:70%; border-radius:5px; background:rgba(13,20,32,.2)}
.m-line.s{width:42%}

/* preview modal */
.zw-sheet{width:min(1280px,100%); height:min(860px,100%); background:#fff; border-radius:20px; display:flex; flex-direction:column; overflow:hidden; animation:zwPop .4s cubic-bezier(.2,.8,.2,1)}
@keyframes zwPop{from{transform:translateY(30px) scale(.97); opacity:0}}
.zw-top{flex:none; display:flex; align-items:center; gap:12px; padding:12px 14px 12px 20px; flex-wrap:wrap; border-bottom:1.5px solid var(--line)}
.zw-title{display:flex; flex-direction:column; margin-right:auto; line-height:1.15}
.zw-title b{font-size:1.1rem; letter-spacing:-.02em}
.zw-title span{font-size:.85rem; opacity:.65}
.zw-toggle{display:flex; background:var(--tint); border-radius:999px; padding:3px}
.zw-toggle button{border:0; background:transparent; font-weight:600; font-size:.88rem; padding:7px 14px; border-radius:999px; cursor:pointer; color:var(--black)}
.zw-toggle button.on{background:var(--black); color:#fff}
@media (max-width:640px){ .zw-toggle{display:none} }
.zw-visit{display:inline-flex; align-items:center; gap:6px; background:var(--purple); color:#fff; text-decoration:none; font-weight:600; font-size:.92rem; padding:10px 16px; border-radius:999px; transition:background .2s}
.zw-visit:hover{background:var(--black)}
.zw-stage{flex:1; min-height:0; display:grid; place-items:center; padding:12px clamp(8px,1.4vw,18px); background:var(--tint)}
.zw-frame{position:relative; height:100%; background:#fff; border:1.5px solid var(--line); border-radius:12px; overflow:hidden; transition:width .5s cubic-bezier(.2,.8,.2,1)}
.zw-frame.desktop{width:100%}
.zw-frame.mobile{width:min(390px,100%)}
.zw-frame iframe{position:absolute; inset:0; width:100%; height:100%; border:0}
.zw-loading{position:absolute; inset:0; display:grid; place-items:center; background:#fff; z-index:1}
.zw-loading span{width:34px; height:34px; border-radius:50%; border:3px solid rgba(13,20,32,.15); border-top-color:var(--purple); animation:zwSpin .8s linear infinite}
@keyframes zwSpin{to{transform:rotate(360deg)}}
.zw-note{flex:none; margin:0; padding:10px 20px 14px; font-size:.82rem; opacity:.6; text-align:center}

@media (prefers-reduced-motion: reduce){
  .zw-shot img, .zw-mock-page, .zw-shot{transition:none}
  .zw-sheet, .zw-loading span{animation:none}
}
`;
