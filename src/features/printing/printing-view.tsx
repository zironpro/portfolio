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

/* Tactile mock representation of a print piece */
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
      <div className="zprint-cover" style={{ aspectRatio: p.ratio }}>
        <PrintPlate p={p} />
        <span className="zprint-stock-tag">{p.stock}</span>
      </div>
      <div className="zprint-cap">
        <span className="zprint-ind">{p.kind}</span>
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
      <div className="zs-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="zs-sheet-top">
          <div>
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
          <div className="zprint-spec-plate">
            <PrintPlate p={p} />
          </div>

          <div className="zprint-spec-list">
            <div>
              <span>Paper stock</span>
              <b>{p.stock}</b>
            </div>
            <div>
              <span>Finishing technique</span>
              <b>{p.finish}</b>
            </div>
          </div>

          <div>
            <h3 className="zs-h3">Production highlights</h3>
            <ul className="zprint-bullets">
              {p.specs.map((sp, idx) => (
                <li key={idx}>
                  <span className="zprint-pip" style={{ background: p.tone }} />
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
  position:relative; width:100%; border-radius:10px; overflow:hidden; background:#fff;
  box-shadow:0 18px 40px -22px rgba(5,8,70,.35);
  transition:transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s;
}
.zprint-card:hover .zprint-cover{transform:translateY(-6px); box-shadow:0 26px 50px -20px rgba(5,8,70,.5)}
.zprint-stock-tag{
  position:absolute; left:12px; bottom:12px; background:rgba(13,20,32,.82); color:#fff;
  font-weight:600; font-size:.78rem; padding:5px 12px; border-radius:999px; backdrop-filter:blur(4px);
}

/* tactile plate */
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

.zprint-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zprint-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zprint-kind{font-size:.88rem; opacity:.65}

/* modal extras */
.zprint-spec-plate{height:160px; border-radius:12px; position:relative; overflow:hidden}
.zprint-spec-list{display:grid; grid-template-columns:1fr 1fr; gap:12px; background:#F4F5F9; padding:14px 18px; border-radius:10px}
.zprint-spec-list span{font-size:.8rem; opacity:.65; display:block}
.zprint-spec-list b{font-size:.95rem}
.zprint-bullets{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px}
.zprint-bullets li{display:flex; align-items:center; gap:10px; font-size:.92rem}
.zprint-pip{width:8px; height:8px; border-radius:50%; flex:none}

@media (prefers-reduced-motion: reduce){
  .zprint-cover, .zprint-paper{transition:none}
}
`;
