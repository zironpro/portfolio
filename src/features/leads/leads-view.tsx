"use client";

/**
 * Ziron Pro — Lead Generation page  (route: /leads)
 * Conversion cards (CPL, leads, ROAS); click for the funnel and channel breakdown.
 * The figures below are sample content: replace with your real results.
 */

import React, { useCallback, useMemo, useState } from "react";
import Shell, {
  ArrowUpRight,
  CloseIcon,
  useSeen,
  useModal,
  waLink,
} from "../CategoryShell";
import { LEAD_PROJECTS, LeadProject } from "./data/leadProjects";



type Props = { whatsappNumber?: string; backHref?: string };

const Card: React.FC<{
  p: LeadProject;
  i: number;
  onOpen: (p: LeadProject) => void;
}> = ({ p, i, onOpen }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      className={`zlead-card zs-reveal ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`View ${p.industry} lead generation case study`}
    >
      <div className="zlead-top">
        <span className="zlead-roas">{p.roas} ROAS</span>
        <span className="zlead-delivered">{p.leadsDelivered} leads</span>
      </div>
      <div className="zlead-funnel" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="zlead-meta">
        <div className="zlead-cpl">
          Average CPL: <b>{p.cpl}</b>
        </div>
        <div className="zlead-cap">
          <span className="zlead-ind">{p.industry}</span>
          <span className="zlead-kind">{p.kind}</span>
        </div>
      </div>
    </button>
  );
};

const Detail: React.FC<{ p: LeadProject; wa: string; onClose: () => void }> = ({
  p,
  wa,
  onClose,
}) => {
  useModal(onClose);
  return (
    <div
      className="zs-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.industry} lead generation case study`}
      onClick={onClose}
    >
      <div className="zs-sheet" onClick={(e) => e.stopPropagation()}>
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
          <div className="zs-stats">
            <div>
              <span>Cost per lead</span>
              <b style={{ color: "var(--purple)" }}>{p.cpl}</b>
            </div>
            <div>
              <span>Verified enquiries</span>
              <b style={{ color: "var(--purple)" }}>{p.leadsDelivered}</b>
            </div>
            <div>
              <span>Return on ad spend</span>
              <b>{p.roas}</b>
            </div>
          </div>
          <div>
            <h3 className="zs-h3">Funnel</h3>
            <div className="zlead-steps">
              {p.funnelStages.map((s, idx) => (
                <div key={idx} className="zlead-step">
                  <span className="zlead-idx">0{idx + 1}</span>
                  <span className="zlead-name">{s.stage}</span>
                  <b>{s.rate}</b>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="zs-h3">Channels</h3>
            <div className="zlead-chips">
              {p.channels.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="zs-h3">Strategy</h3>
            <p className="zs-p">{p.overview}</p>
          </div>
        </div>
        <div className="zs-sheet-foot">
          <a
            className="zs-btn"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
          >
            Launch my lead engine <ArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function LeadsPage({
  whatsappNumber = "971542588446",
  backHref,
}: Props) {
  const [selected, setSelected] = useState<LeadProject | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const wa = waLink(
    whatsappNumber,
    "Hi Ziron Pro, I need more qualified leads.",
  );

  return (
    <Shell
      words={["Enquiries,", "not", "just", "clicks."]}
      sub="Customer acquisition campaigns with tracked conversions."
      waText="Hi Ziron Pro, I need more qualified leads."
      ctaTitle="Fill your pipeline."
      ctaLabel="Book a growth call"
      label="Lead generation case studies"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={selected && <Detail p={selected} wa={wa} onClose={close} />}
    >
      <style>{CSS}</style>
      <div className="zlead-grid">
        {LEAD_PROJECTS.map((p, i) => (
          <Card key={p.id} p={p} i={i} onOpen={setSelected} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zlead-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(14px,1.8vw,30px)}
@media (max-width:1000px){ .zlead-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zlead-grid{grid-template-columns:1fr} }

.zlead-card{all:unset; box-sizing:border-box; cursor:pointer; background:#fff; color:var(--black); border:1.5px solid var(--black); border-radius:14px; padding:clamp(18px,2.4vw,28px); display:flex; flex-direction:column; justify-content:space-between; gap:22px; transition:transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s, background .3s}
.zlead-card:hover{transform:translateY(-6px); border-color:var(--purple); background:var(--tint)}
.zlead-top{display:flex; justify-content:space-between; align-items:center}
.zlead-roas{background:var(--black); color:#fff; font-weight:800; font-size:1.05rem; padding:4px 12px; border-radius:999px}
.zlead-delivered{font-weight:800; font-size:1.45rem; letter-spacing:-.02em; color:var(--purple)}
.zlead-funnel{display:flex; flex-direction:column; gap:6px; padding:12px 0}
.zlead-funnel i{display:block; height:7px; border-radius:4px}
.zlead-funnel i:nth-child(1){width:100%; background:var(--purple)}
.zlead-funnel i:nth-child(2){width:68%; background:var(--purple-2)}
.zlead-funnel i:nth-child(3){width:36%; background:var(--black)}
.zlead-meta{display:flex; flex-direction:column; gap:8px}
.zlead-cpl{font-size:.9rem; opacity:.8}
.zlead-cap{display:flex; justify-content:space-between; align-items:baseline; gap:10px}
.zlead-ind{font-weight:800; font-size:1.15rem; letter-spacing:-.02em}
.zlead-kind{font-size:.88rem; opacity:.65}

.zlead-steps{display:flex; flex-direction:column; gap:8px}
.zlead-step{display:flex; align-items:center; padding:10px 14px; background:var(--tint); border-radius:8px; font-size:.92rem}
.zlead-idx{font-weight:700; color:var(--purple); font-size:.85rem}
.zlead-name{flex:1; margin-left:14px}
.zlead-chips{display:flex; flex-wrap:wrap; gap:8px}
.zlead-chips span{background:var(--purple); color:#fff; font-weight:600; font-size:.85rem; padding:6px 14px; border-radius:999px}

@media (prefers-reduced-motion: reduce){ .zlead-card{transition:none} }
`;
