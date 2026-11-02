"use client";

/**
 * Ziron Pro — Posts page (route: /posts)
 * High-conversion social media creatives, ad campaigns, and branded digital content.
 * Click any card to inspect full creative, design specifications, and strategic rationale.
 */

import React, { useCallback, useMemo, useState, useRef, useEffect } from "react";
import Shell, {
  ArrowUpRight,
  CloseIcon,
  useSeen,
  useModal,
  waLink,
} from "../CategoryShell";
import { POST_PROJECTS, PostProject } from "./data/postsProjects";

type Props = { whatsappNumber?: string; backHref?: string };

const Card: React.FC<{
  p: PostProject;
  i: number;
  onOpen: (p: PostProject) => void;
}> = ({ p, i, onOpen }) => {
  const [ref, seen] = useSeen<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      type="button"
      className={`zpost-card zs-reveal ${seen ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
      onClick={() => onOpen(p)}
      aria-label={`View ${p.title} creative`}
    >
      <div className="zpost-cover">
        <img
          src={p.image}
          alt={p.title}
          className="zpost-img"
          loading="lazy"
        />
        <span className="zpost-badge">{p.client}</span>
        <span className="zpost-view">
          Inspect creative <ArrowUpRight />
        </span>
      </div>
      <div className="zpost-cap">
        <span className="zpost-kind">{p.kind}</span>
        <span className="zpost-ind">{p.title}</span>
      </div>
    </button>
  );
};

const PostModal: React.FC<{
  p: PostProject;
  whatsappNumber?: string;
  onClose: () => void;
}> = ({ p, whatsappNumber = "971542588446", onClose }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useModal(onClose);
  useEffect(() => closeRef.current?.focus(), []);

  const wa = waLink(
    whatsappNumber,
    `Hi Ziron Pro, I saw the "${p.title}" post design for ${p.client} and would like similar social media creatives for my business.`
  );

  return (
    <div
      className="zs-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} Creative Details`}
      onClick={onClose}
    >
      <div className="zpost-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="zpost-modal-head">
          <div className="zpost-modal-title-group">
            <span className="zpost-modal-tag">
              {p.client} • {p.kind}
            </span>
            <h2 className="zpost-modal-title">{p.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="zs-close"
            onClick={onClose}
            aria-label="Close details"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="zpost-modal-body">
          {/* Left column: Full image preview */}
          <div className="zpost-viewer-col">
            <div className="zpost-img-frame">
              <img
                src={p.image}
                alt={p.title}
                className="zpost-full-img"
              />
            </div>
          </div>

          {/* Right column: Details and specifications */}
          <div className="zpost-details-col">
            {p.headline && (
              <div className="zpost-headline-box">
                <span className="zpost-section-label">Core Headline</span>
                <p className="zpost-headline-text" dir="auto">
                  “{p.headline}”
                </p>
              </div>
            )}

            <div className="zpost-details-section">
              <span className="zpost-section-label">Creative Specifications</span>
              <div className="zpost-specs-grid">
                <div className="zpost-spec-card">
                  <span className="zpost-spec-lbl">Brand / Client</span>
                  <span className="zpost-spec-val">{p.client}</span>
                </div>
                <div className="zpost-spec-card">
                  <span className="zpost-spec-lbl">Aspect Ratio</span>
                  <span className="zpost-spec-val">{p.ratio || "3:4 (Portrait)"}</span>
                </div>
                <div className="zpost-spec-card">
                  <span className="zpost-spec-lbl">Platforms</span>
                  <span className="zpost-spec-val">{p.platform}</span>
                </div>
              </div>
            </div>

            <div className="zpost-details-section">
              <span className="zpost-section-label">Design & Production Highlights</span>
              <ul className="zpost-bullets">
                {p.specs.map((sp, idx) => (
                  <li key={idx}>
                    <span
                      className="zpost-pip"
                      style={{ background: p.tone || "var(--purple)" }}
                    />
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="zpost-details-section">
              <span className="zpost-section-label">Campaign Strategy</span>
              <p className="zpost-details-desc">{p.overview}</p>
            </div>

            <div className="zpost-cta-wrap">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="zpost-wa-btn"
              >
                <span>Request Custom Social Creatives on WhatsApp</span>
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PostsPage({
  whatsappNumber = "971542588446",
  backHref,
}: Props) {
  const [selected, setSelected] = useState<PostProject | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const wa = waLink(
    whatsappNumber,
    "Hi Ziron Pro, I'd like social media creatives for my brand."
  );

  return (
    <Shell
      words={["Social", "posts", "that", "stop", "the", "scroll."]}
      sub="High-conversion social media creatives, ad campaigns, and brand storytelling."
      waText="Hi Ziron Pro, I'd like social media creatives for my brand."
      ctaTitle="Ready to turn scrollers into clients?"
      ctaLabel="Get custom post designs"
      label="Social media posts"
      whatsappNumber={whatsappNumber}
      backHref={backHref}
      overlay={selected && <PostModal p={selected} whatsappNumber={whatsappNumber} onClose={close} />}
    >
      <style>{CSS}</style>
      <div className="zpost-grid">
        {POST_PROJECTS.map((p, i) => (
          <Card key={p.id} p={p} i={i} onOpen={setSelected} />
        ))}
      </div>
    </Shell>
  );
}

const CSS = `
.zpost-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:clamp(16px,2vw,32px);
  width:100%;
}
@media (max-width:1000px){ .zpost-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px){ .zpost-grid{grid-template-columns:1fr} }

/* card */
.zpost-card{
  all:unset;
  box-sizing:border-box;
  cursor:pointer;
  display:flex;
  flex-direction:column;
  gap:12px;
  width:100%;
}
.zpost-card:focus-visible{outline:3px solid var(--purple); outline-offset:4px; border-radius:16px}

.zpost-cover{
  position:relative;
  width:100%;
  aspect-ratio:3/4;
  border-radius:14px;
  overflow:hidden;
  background:#F4F5F9;
  border:1.5px solid var(--line);
  box-shadow:0 6px 20px -6px rgba(13,20,32,.08);
  transition:transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .4s;
}
.zpost-card:hover .zpost-cover{
  transform:translateY(-6px);
  border-color:var(--purple);
  box-shadow:0 20px 40px -12px rgba(77,17,168,.25);
}

.zpost-img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  transition:transform .5s cubic-bezier(.2,.8,.2,1);
}
.zpost-card:hover .zpost-img{
  transform:scale(1.05);
}

.zpost-badge{
  position:absolute;
  top:12px;
  left:12px;
  z-index:2;
  background:rgba(13,20,32,.85);
  backdrop-filter:blur(6px);
  color:#fff;
  font-size:.74rem;
  font-weight:700;
  padding:4px 10px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,.15);
}

.zpost-view{
  position:absolute;
  right:12px;
  bottom:12px;
  z-index:2;
  display:inline-flex;
  align-items:center;
  gap:6px;
  background:var(--black);
  color:#fff;
  font-weight:600;
  font-size:.82rem;
  padding:6px 12px;
  border-radius:999px;
  opacity:0;
  transform:translateY(6px);
  transition:opacity .3s, transform .3s;
}
.zpost-card:hover .zpost-view,
.zpost-card:focus-visible .zpost-view{
  opacity:1;
  transform:none;
}
@media (hover:none){ .zpost-view{opacity:1; transform:none} }

.zpost-cap{
  display:flex;
  flex-direction:column;
  gap:4px;
  padding:0 2px;
}
.zpost-kind{
  font-size:.76rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.05em;
  color:var(--purple);
}
.zpost-ind{
  font-weight:800;
  font-size:1.15rem;
  letter-spacing:-.02em;
  line-height:1.3;
  color:var(--black);
}

/* Modal */
.zpost-modal-sheet{
  width:min(1080px, 96vw);
  max-height:min(90vh, 880px);
  background:#fff;
  border-radius:24px;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  box-shadow:0 24px 64px rgba(13,20,32,.35);
  animation:zwPop .35s cubic-bezier(.2,.8,.2,1);
}
@keyframes zwPop{from{transform:translateY(24px) scale(.98); opacity:0}}

.zpost-modal-head{
  flex:none;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:16px 24px;
  border-bottom:1.5px solid var(--line);
  gap:14px;
}
.zpost-modal-title-group{display:flex; flex-direction:column; gap:2px}
.zpost-modal-tag{
  font-size:.75rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.06em;
  color:var(--purple);
}
.zpost-modal-title{
  margin:0;
  font-size:clamp(1.15rem,1.8vw,1.45rem);
  font-weight:800;
  letter-spacing:-.02em;
  color:var(--black);
}

.zpost-modal-body{
  flex:1;
  min-height:0;
  display:grid;
  grid-template-columns:1.05fr 1fr;
  overflow:hidden;
}
@media (max-width:900px){
  .zpost-modal-sheet{max-height:92vh}
  .zpost-modal-body{grid-template-columns:1fr; overflow-y:auto}
}

.zpost-viewer-col{
  background:#F4F5F9;
  border-right:1.5px solid var(--line);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  min-height:0;
  overflow-y:auto;
}
@media (max-width:900px){
  .zpost-viewer-col{
    border-right:none;
    border-bottom:1.5px solid var(--line);
    padding:16px;
  }
}

.zpost-img-frame{
  width:100%;
  max-width:440px;
  aspect-ratio:3/4;
  border-radius:14px;
  overflow:hidden;
  border:1.5px solid var(--line);
  box-shadow:0 12px 32px -8px rgba(13,20,32,.18);
  background:#fff;
}
.zpost-full-img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

.zpost-details-col{
  display:flex;
  flex-direction:column;
  gap:18px;
  padding:clamp(18px,2.4vw,28px);
  overflow-y:auto;
  scrollbar-width:thin;
}

.zpost-headline-box{
  background:var(--tint);
  border-left:3px solid var(--purple);
  padding:12px 14px;
  border-radius:0 10px 10px 0;
  display:flex;
  flex-direction:column;
  gap:4px;
}
.zpost-headline-text{
  margin:0;
  font-size:1.05rem;
  font-weight:700;
  line-height:1.4;
  color:var(--black);
}

.zpost-details-section{display:flex; flex-direction:column; gap:8px}
.zpost-section-label{
  font-size:.74rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.05em;
  opacity:.55;
}
.zpost-details-desc{
  margin:0;
  font-size:.92rem;
  line-height:1.6;
  color:rgba(13,20,32,.85);
}

.zpost-specs-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:8px;
}
@media (max-width:600px){
  .zpost-specs-grid{grid-template-columns:1fr}
}
.zpost-spec-card{
  background:var(--tint);
  padding:10px 12px;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  gap:2px;
}
.zpost-spec-lbl{font-size:.72rem; opacity:.65; line-height:1.2}
.zpost-spec-val{font-size:.9rem; font-weight:800; color:var(--purple); letter-spacing:-.01em}

.zpost-bullets{
  margin:0;
  padding:0;
  list-style:none;
  display:flex;
  flex-direction:column;
  gap:8px;
}
.zpost-bullets li{
  display:flex;
  align-items:flex-start;
  gap:10px;
  font-size:.88rem;
  line-height:1.45;
}
.zpost-pip{
  width:8px;
  height:8px;
  border-radius:50%;
  flex:none;
  margin-top:5px;
}

.zpost-cta-wrap{
  margin-top:auto;
  padding-top:14px;
  display:flex;
  flex-direction:column;
  gap:8px;
}
.zpost-wa-btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  background:var(--purple);
  color:#fff;
  text-decoration:none;
  font-weight:700;
  font-size:.92rem;
  padding:13px 20px;
  border-radius:999px;
  transition:background .2s, transform .2s, box-shadow .2s;
  box-shadow:0 8px 20px -4px rgba(77,17,168,.35);
}
.zpost-wa-btn:hover{
  background:var(--black);
  transform:translateY(-2px);
  box-shadow:0 12px 24px -4px rgba(13,20,32,.35);
}

@media (prefers-reduced-motion: reduce){
  .zpost-cover, .zpost-img, .zpost-wa-btn{transition:none}
  .zpost-modal-sheet{animation:none}
}
`;

