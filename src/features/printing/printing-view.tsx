"use client";

/**
 * Ziron Pro — Printing Services page  (route: /printing)
 * Uses the shared CategoryShell (header, filters, CTA, modal chrome) like the other category pages.
 */

import React, { useCallback, useMemo, useState } from "react";
import Shell, {
  ArrowUpRight,
  CloseIcon,
  useSeen,
  useModal,
  waLink,
} from "../CategoryShell";
import { PRINT_PROJECTS, PrintProject } from "./data/printProjects";

type Props = { whatsappNumber?: string; backHref?: string };

/* Tactile mock representation of a print piece (fallback) */
const PrintPlate: React.FC<{ p: PrintProject }> = ({ p }) => (
  <div
    className="zprint-plate"
    style={{ ["--tone" as string]: p.tone }}
    aria-hidden="true"
  >
    <div className="zprint-paper">
      <div className="zprint-cutout" />
      <div className="zprint-badge">{p.finish}</div>
      <div className="zprint-cmyk">
        <span style={{ background: "#00B7EB" }} />
        <span style={{ background: "#EC008C" }} />
        <span style={{ background: "#FFE600" }} />
        <span style={{ background: "#111111" }} />
      </div>
    </div>
  </div>
);

const Card: React.FC<{
  p: PrintProject;
  i: number;
  onOpen: (p: PrintProject) => void;
}> = ({ p, i, onOpen }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      className={`zprint-card zs-reveal ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`View ${p.kind}`}
    >
      <div className="zprint-cover" style={{ aspectRatio: p.ratio || "4/3" }}>
        {p.image ? (
          <img
            src={p.image}
            alt={p.kind}
            className="zprint-img"
            loading="lazy"
          />
        ) : (
          <PrintPlate p={p} />
        )}
        <span className="zprint-view">
          Inspect spec <ArrowUpRight />
        </span>
        {/* <span className="zprint-stock-tag">{p.finish}</span> */}
      </div>
      <div className="zprint-cap">
        <span className="zprint-ind">{p.kind}</span>
        {/* <span className="zprint-stock-lbl">{p.stock}</span> */}
      </div>
    </button>
  );
};

const Detail: React.FC<{
  p: PrintProject;
  wa: string;
  onClose: () => void;
}> = ({ p, wa, onClose }) => {
  useModal(onClose);
  return (
    <div
      className="zs-modal"
      role="dialog"
      aria-modal="true"
      aria-label={p.kind}
      onClick={onClose}
    >
      <div
        className="zs-sheet zprint-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="zs-sheet-top">
          <div>
            <span className="zprint-modal-tag">{p.finish}</span>
            <b className="zs-sheet-ind">{p.kind}</b>
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
          <div className="zprint-detail-frame">
            {p.image ? (
              <img
                src={p.image}
                alt={p.kind}
                className="zprint-detail-img"
              />
            ) : (
              <div className="zprint-spec-plate">
                <PrintPlate p={p} />
              </div>
            )}
          </div>

          <div className="zprint-spec-list">
            <div>
              <span>Material / Substrate</span>
              <b>{p.stock}</b>
            </div>
            <div>
              <span>Finishing Technique</span>
              <b>{p.finish}</b>
            </div>
          </div>

          <div>
            <h3 className="zs-h3">Production highlights</h3>
            <ul className="zprint-bullets">
              {p.specs.map((sp, idx) => (
                <li key={idx}>
                  <span
                    className="zprint-pip"
                    style={{ background: p.tone || "var(--purple)" }}
                  />
                  {sp}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="zs-h3">Fabrication details</h3>
            <p className="zs-p">{p.description}</p>
          </div>
        </div>

        <div className="zs-sheet-foot">
          <a
            className="zs-btn"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
          >
            Inquire about this print specification <ArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function PrintingPage({
  whatsappNumber = "971542588446",
  backHref,
}: Props) {
  const [selected, setSelected] = useState<PrintProject | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const wa = waLink(
    whatsappNumber,
    "Hi Ziron Pro, I'd like a custom print quote.",
  );

  return (
    <Shell
      words={["Print", "that", "feels", "tangible."]}
      sub="Premium paper stocks, specialty foil finishes, and artisanal packaging fabrication."
      waText="Hi Ziron Pro, I'd like a custom print quote."
      ctaTitle="Feel the difference in hand."
      ctaLabel="Request material swatches"
      label="Printing projects"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={selected && <Detail p={selected} wa={wa} onClose={close} />}
    >
      <style>{CSS}</style>
      <div className="zprint-grid">
        {PRINT_PROJECTS.map((p, i) => (
          <Card key={p.id} p={p} i={i} onOpen={setSelected} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zprint-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zprint-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zprint-grid{grid-template-columns:1fr} }

/* card */
.zprint-card{all:unset; box-sizing:border-box; cursor:pointer; display:flex; flex-direction:column; gap:12px}
.zprint-card:focus-visible{outline:3px solid var(--purple); outline-offset:4px}
.zprint-cover{
  position:relative; width:100%; border-radius:14px; overflow:hidden; background:#F4F5F9;
  border:1.5px solid var(--line);
  box-shadow:0 6px 20px -6px rgba(13,20,32,.08);
  transition:transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .4s;
}
.zprint-card:hover .zprint-cover{
  transform:translateY(-6px);
  border-color:var(--purple);
  box-shadow:0 20px 40px -12px rgba(77,17,168,.25);
}
.zprint-img{
  width:100%; height:100%; object-fit:cover; display:block;
  transition:transform .5s cubic-bezier(.2,.8,.2,1);
}
.zprint-card:hover .zprint-img{
  transform:scale(1.05);
}
.zprint-view{
  position:absolute; right:12px; bottom:12px; z-index:2;
  display:inline-flex; align-items:center; gap:6px;
  background:var(--black); color:#fff; font-weight:600; font-size:.82rem;
  padding:6px 12px; border-radius:999px; opacity:0; transform:translateY(6px);
  transition:opacity .3s, transform .3s;
}
.zprint-card:hover .zprint-view, .zprint-card:focus-visible .zprint-view{
  opacity:1; transform:none;
}
.zprint-stock-tag{
  position:absolute; left:12px; top:12px; z-index:2;
  background:rgba(13,20,32,.85); backdrop-filter:blur(6px); color:#fff;
  font-weight:600; font-size:.74rem; padding:4px 10px; border-radius:999px;
  border:1px solid rgba(255,255,255,.15);
}

.zprint-cap{display:flex; flex-direction:column; gap:4px; padding:0 2px}
.zprint-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em; line-height:1.25}
.zprint-stock-lbl{font-size:.85rem; opacity:.65; line-height:1.3}

/* modal */
.zprint-sheet{width:min(720px, 96vw) !important}
.zprint-modal-tag{display:block; font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:var(--purple); margin-bottom:4px}
.zprint-detail-frame{
  width:100%; max-height:440px; border-radius:12px; overflow:hidden;
  border:1.5px solid var(--line); background:#FAF9FC;
  display:flex; align-items:center; justify-content:center;
}
.zprint-detail-img{
  width:100%; height:auto; max-height:440px; object-fit:contain; display:block;
}

/* tactile plate (fallback) */
.zprint-plate{position:absolute; inset:0; display:grid; place-items:center; background:color-mix(in srgb, var(--tone) 15%, #F4F2FF)}
.zprint-paper{
  width:75%; height:75%; background:#fff; border-radius:8px; box-shadow:0 14px 28px -10px rgba(5,8,70,.25);
  display:flex; flex-direction:column; justify-content:space-between; padding:8%;
  position:relative; overflow:hidden; transition:transform .6s cubic-bezier(.2,.8,.2,1);
}
.zprint-card:hover .zprint-paper{transform:scale(1.04) rotate(-1deg)}
.zprint-cutout{width:40%; height:8px; border-radius:4px; background:var(--tone); opacity:.6}
.zprint-badge{font-size:.85rem; font-weight:700; color:var(--black); opacity:.9}
.zprint-cmyk{display:flex; gap:6px}
.zprint-cmyk span{width:10px; height:10px; border-radius:50%}

/* modal extras */
.zprint-spec-plate{height:160px; border-radius:12px; position:relative; overflow:hidden}
.zprint-spec-list{display:grid; grid-template-columns:1fr 1fr; gap:12px; background:#F4F5F9; padding:14px 18px; border-radius:10px}
.zprint-spec-list span{font-size:.8rem; opacity:.65; display:block}
.zprint-spec-list b{font-size:.95rem}
.zprint-bullets{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px}
.zprint-bullets li{display:flex; align-items:center; gap:10px; font-size:.92rem}
.zprint-pip{width:8px; height:8px; border-radius:50%; flex:none; background:var(--purple)}

@media (prefers-reduced-motion: reduce){
  .zprint-cover, .zprint-paper, .zprint-img{transition:none}
}
`;
