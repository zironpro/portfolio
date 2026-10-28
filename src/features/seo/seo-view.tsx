"use client";

/**
 * Ziron Pro — SEO page  (route: /seo)
 * Verified Google search ranking proof cards; click for case-study breakdown.
 */

import React, { useCallback, useMemo, useState } from "react";
import Shell, {
  ArrowUpRight,
  CloseIcon,
  useSeen,
  useModal,
  waLink,
} from "../CategoryShell";
import { SEO_PROJECTS, SeoProject } from "./data/seoProjects";


type Props = { whatsappNumber?: string; backHref?: string };

const Card: React.FC<{
  p: SeoProject;
  i: number;
  onOpen: (p: SeoProject) => void;
}> = ({ p, i, onOpen }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      className={`zseo-card zs-reveal ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`View ${p.topKeyword} ranking case study`}
    >
      <div className="zseo-card-top">
        <span className="zseo-rank">{p.rank}</span>
        <span className="zseo-time">
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              d="M12 7v5l3 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {p.timeframe}
        </span>
        <span className="zseo-growth">{p.trafficGrowth}</span>
      </div>

      <div className="zseo-card-media">
        <img src={p.image} alt={p.topKeyword} loading="lazy" />
        <span className="zseo-media-tag">
          <svg
            viewBox="0 0 24 24"
            width="11"
            height="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path
              d="M20 6L9 17l-5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {p.rank.startsWith("#")
            ? `Google Rank ${p.rank}`
            : `Google ${p.rank}`}
        </span>
      </div>

      <div className="zseo-info">
        <p className="zseo-kw">“{p.topKeyword}”</p>
        <div className="zseo-cap">
          <span className="zseo-ind">{p.industry}</span>
          <span className="zseo-kind">{p.kind}</span>
        </div>
      </div>
    </button>
  );
};

const Detail: React.FC<{
  p: SeoProject;
  wa: string;
  onClose: () => void;
}> = ({ p, wa, onClose }) => {
  useModal(onClose);
  return (
    <div
      className="zs-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.topKeyword} SEO case study`}
      onClick={onClose}
    >
      <div
        className="zs-sheet zseo-modal-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="zs-sheet-top">
          <div>
            <b className="zs-sheet-ind">{p.industry}</b>
            <span className="zs-sheet-kind">{p.kind}</span>
          </div>
          <button
            type="button"
            className="zs-close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="zs-sheet-body">
          <div className="zseo-detail-media">
            <div className="zseo-detail-bar">
              <span className="zseo-proof-badge">
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Verified Live Google Search Result
              </span>
              <span className="zseo-proof-kw">
                Target query: <b>“{p.topKeyword}”</b>
              </span>
            </div>
            <div className="zseo-detail-frame">
              <img
                src={p.image}
                alt={`Google rank proof for ${p.topKeyword}`}
                className="zseo-detail-img"
              />
            </div>
          </div>

          <div className="zs-stats">
            <div>
              <span>Peak rank</span>
              <b style={{ color: "var(--purple)" }}>{p.rank}</b>
            </div>
            <div>
              <span>Traffic growth</span>
              <b style={{ color: "var(--purple)" }}>{p.trafficGrowth}</b>
            </div>
            <div>
              <span>Time to rank</span>
              <b>{p.timeframe}</b>
            </div>
            <div>
              <span>Keywords ranked</span>
              <b>{p.keywordsRanked}+</b>
            </div>
          </div>

          <div>
            <h3 className="zs-h3">What we did</h3>
            <p className="zs-p">{p.overview}</p>
          </div>

          <div>
            <h3 className="zs-h3">Results</h3>
            <ul className="zseo-bullets">
              {p.results.map((r, idx) => (
                <li key={idx}>
                  <span className="zseo-dot" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="zs-sheet-foot">
          <a
            className="zs-btn"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a similar strategy <ArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function SeoPage({
  whatsappNumber = "971542588446",
  backHref,
}: Props) {
  const [selected, setSelected] = useState<SeoProject | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const wa = waLink(
    whatsappNumber,
    "Hi Ziron Pro, I'd like to rank on Google.",
  );

  return (
    <Shell
      words={["Rankings", "you", "can", "measure."]}
      sub="Real Google Search top rankings and verified organic growth."
      waText="Hi Ziron Pro, I'd like to rank on Google."
      ctaTitle="Ready for Page #1?"
      ctaLabel="Audit your site on WhatsApp"
      label="SEO case studies"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={selected && <Detail p={selected} wa={wa} onClose={close} />}
    >
      <style>{CSS}</style>
      <div className="zseo-grid">
        {SEO_PROJECTS.map((p, i) => (
          <Card key={p.id} p={p} i={i} onOpen={setSelected} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zseo-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zseo-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zseo-grid{grid-template-columns:1fr} }

/* Light card */
.zseo-card{
  all:unset; box-sizing:border-box; cursor:pointer;
  background:#fff; color:var(--black);
  border-radius:16px; padding:clamp(16px,2vw,24px); display:flex; flex-direction:column;
  justify-content:space-between; gap:16px; border:1.5px solid var(--line);
  transition:transform .4s cubic-bezier(.2,.8,.2,1), background .3s, border-color .3s, box-shadow .4s;
}
.zseo-card:hover, .zseo-card:focus-visible{
  transform:translateY(-6px);
  background:color-mix(in srgb, var(--purple) 6%, #fff);
  border-color:rgba(143,44,244,.4);
  box-shadow:0 18px 36px -10px rgba(77,17,168,.2);
}

.zseo-card-top{display:flex; justify-content:space-between; align-items:center; gap:8px}
.zseo-rank{background:var(--purple-2); color:#fff; font-weight:800; font-size:1.05rem; padding:4px 12px; border-radius:999px; white-space:nowrap}
.zseo-growth{font-weight:800; font-size:1.5rem; letter-spacing:-.02em; color:var(--purple)}

/* Time-to-rank pill */
.zseo-time{
  display:inline-flex; align-items:center; gap:5px;
  font-size:.78rem; font-weight:700;
  color:var(--black);
  background:#F4F5F9;
  border:1px solid var(--line);
  padding:4px 10px;
  border-radius:999px;
  white-space:nowrap;
}

.zseo-card-media{
  position:relative;
  width:100%;
  aspect-ratio:16/9;
  border-radius:10px;
  overflow:hidden;
  background:#F4F5F9;
  border:1px solid var(--line);
}
.zseo-card-media img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center;
  display:block;
  transition:transform .5s cubic-bezier(.2,.8,.2,1);
}
.zseo-card:hover .zseo-card-media img{
  transform:scale(1.05);
}
.zseo-media-tag{
  position:absolute;
  top:8px;
  right:8px;
  display:inline-flex;
  align-items:center;
  gap:4px;
  background:rgba(255,255,255,.92);
  backdrop-filter:blur(6px);
  color:var(--black);
  font-size:.7rem;
  font-weight:700;
  padding:4px 9px;
  border-radius:999px;
  border:1px solid var(--line);
}

.zseo-info{display:flex; flex-direction:column; gap:6px}
.zseo-kw{margin:0; font-size:.95rem; opacity:.85; font-style:italic}
.zseo-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zseo-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zseo-kind{font-size:.88rem; opacity:.7}

/* Modal details */
.zseo-modal-sheet{
  width:min(840px, 96vw) !important;
}
/* 4 stats in the modal instead of 3 */
.zseo-modal-sheet .zs-stats{grid-template-columns:repeat(4,1fr)}
@media (max-width:600px){
  .zseo-modal-sheet .zs-stats{grid-template-columns:repeat(2,1fr)}
}
.zseo-detail-media{
  display:flex;
  flex-direction:column;
  gap:10px;
  background:#F4F5F9;
  border:1.5px solid var(--line);
  border-radius:14px;
  padding:12px;
}
.zseo-detail-bar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  gap:8px;
  padding:0 2px;
}
.zseo-proof-badge{
  display:inline-flex;
  align-items:center;
  gap:6px;
  background:#16A34A;
  color:#fff;
  font-size:.76rem;
  font-weight:700;
  padding:4px 10px;
  border-radius:999px;
}
.zseo-proof-kw{
  font-size:.82rem;
  opacity:.8;
  color:var(--black);
}
.zseo-detail-frame{
  border-radius:10px;
  overflow:hidden;
  border:1px solid rgba(13,20,32,.1);
  box-shadow:0 6px 18px rgba(13,20,32,.06);
  background:#fff;
}
.zseo-detail-img{
  display:block;
  width:100%;
  height:auto;
}

.zseo-bullets{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:10px}
.zseo-bullets li{display:flex; align-items:center; gap:10px; font-size:.92rem}
.zseo-dot{width:8px; height:8px; border-radius:50%; flex:none; background:var(--purple)}

@media (prefers-reduced-motion: reduce){
  .zseo-card{transition:none}
  .zseo-card-media img{transition:none}
}
`;
