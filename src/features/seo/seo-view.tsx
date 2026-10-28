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

type SeoProject = {
  id: string;
  industry: string;
  kind: string;
  rank: string;
  trafficGrowth: string;
  timeframe: string;
  keywordsRanked: number;
  topKeyword: string;
  metrics: number[];
  overview: string;
  results: string[];
  image: string;
};

const SEO_PROJECTS: SeoProject[] = [
  {
    id: "seo-1",
    industry: "Solar & Heat Control",
    kind: "Thermal Insulation Film",
    rank: "#1",
    trafficGrowth: "+320%",
    timeframe: "3 months",
    keywordsRanked: 148,
    topKeyword: "tint insulation in abu dhabi",
    image: "/seo/tint-insulation-in-abudhabi.png",
    metrics: [28, 42, 58, 72, 88, 98],
    overview:
      "Targeted regional SEO strategy dominating high-intent residential and commercial window tint insulation searches across Abu Dhabi and the UAE.",
    results: [
      "Rank #1 Google search placement for 'tint insulation in abu dhabi'",
      "Top 3 Google Maps pack placement across all target districts",
      "+320% organic traffic growth in 90 days",
      "3.2x increase in direct phone calls and qualified quotation inquiries",
    ],
  },
  {
    id: "seo-2",
    industry: "Solar & Heat Control",
    kind: "Heat Control Window Film",
    rank: "#1",
    trafficGrowth: "+290%",
    timeframe: "2 months",
    keywordsRanked: 115,
    topKeyword: "best heat control window film abudhabi",
    image: "/seo/best-heat-control-window-film-abudhabi.png",
    metrics: [20, 35, 52, 68, 84, 96],
    overview:
      "Focused on high-rejection solar control queries during extreme summer months, capturing villa owners, commercial properties, and facility managers.",
    results: [
      "#1 organic position for 'best heat control window film abudhabi'",
      "Outranked regional competitors and international distributors",
      "+290% increase in seasonal quote requests",
      "Zero paid ad spend required for core heat-reduction terms",
    ],
  },
  {
    id: "seo-3",
    industry: "Solar & Heat Control",
    kind: "UV & Heat Blocking Film",
    rank: "#1",
    trafficGrowth: "+345%",
    timeframe: "3 months",
    keywordsRanked: 132,
    topKeyword: "heat blocking window film abudhabi",
    image: "/seo/heat-blocking-window-film-abudhabi.png",
    metrics: [24, 38, 56, 74, 89, 99],
    overview:
      "Technical SEO and schema markup optimization targeting UV protection, infrared heat rejection, and energy-saving glass films.",
    results: [
      "#1 Google ranking for 'heat blocking window film abudhabi'",
      "High-intent commercial inquiries surged by +345%",
      "Featured snippet capture for glass heat reduction FAQs",
      "4.1m average session engagement on technical specification pages",
    ],
  },
  {
    id: "seo-4",
    industry: "Solar & Heat Control",
    kind: "Solar Shield Film",
    rank: "#1",
    trafficGrowth: "+275%",
    timeframe: "1 month",
    keywordsRanked: 96,
    topKeyword: "solar shield window film abudhabi",
    image: "/seo/solar-sheild-window-fim-abudhabi.png",
    metrics: [22, 36, 48, 64, 82, 94],
    overview:
      "Keyword cluster strategy around solar shield technology, building envelope efficiency, and residential glazing protection.",
    results: [
      "#1 position for branded and non-branded solar shield queries",
      "+275% growth in qualified organic click-throughs",
      "Indexed on Page 1 across Abu Dhabi, Dubai, and Al Ain",
      "Direct lead capture via integrated WhatsApp routing",
    ],
  },
  {
    id: "seo-5",
    industry: "Safety & Security",
    kind: "Commercial Security Glazing",
    rank: "#1",
    trafficGrowth: "+410%",
    timeframe: "4 months",
    keywordsRanked: 164,
    topKeyword: "security window film abudhabi",
    image: "/seo/security-window-film-abudhabi.png",
    metrics: [30, 48, 62, 78, 91, 100],
    overview:
      "B2B search positioning tailored for banks, luxury retail, government entities, and embassies requiring shatter-resistant glass films.",
    results: [
      "#1 ranking on Google for 'security window film abudhabi'",
      "+410% surge in enterprise and government procurement leads",
      "Top visibility across Abu Dhabi commercial real estate districts",
      "High authority backlinks from architectural & safety directories",
    ],
  },
  {
    id: "seo-6",
    industry: "Safety & Security",
    kind: "Glass Protection & Security",
    rank: "#1",
    trafficGrowth: "+280%",
    timeframe: "3 months",
    keywordsRanked: 128,
    topKeyword: "security film for glass abudhabi",
    image: "/seo/security-film-for-glass-abudhabi.png",
    metrics: [18, 32, 50, 68, 85, 95],
    overview:
      "Optimized for impact resistance, anti-shatter certification standards, and commercial store-front safety compliance.",
    results: [
      "#1 ranking for 'security film for glass abudhabi'",
      "128 commercial safety keywords ranking on Page 1",
      "+280% organic inquiry increase for retail shopfront protection",
      "Avg. time-on-page improved from 45s to 3m 15s",
    ],
  },
  {
    id: "seo-7",
    industry: "Safety & Security",
    kind: "Anti-Shatter Safety Film",
    rank: "#1",
    trafficGrowth: "+330%",
    timeframe: "2 months",
    keywordsRanked: 142,
    topKeyword: "safety film abudhabi",
    image: "/seo/safety-film-abudhabi.png",
    metrics: [25, 40, 58, 75, 90, 98],
    overview:
      "Comprehensive safety glazing keyword clustering targeting schools, hospitals, hotels, and public facilities.",
    results: [
      "#1 Google search position for 'safety film abudhabi'",
      "Established brand as the top safety film contractor in UAE",
      "+330% increase in municipal and institutional RFQs",
      "Ranked #1 on mobile search across Abu Dhabi emirate",
    ],
  },
  {
    id: "seo-8",
    industry: "Safety & Security",
    kind: "Ballistic & Blast Mitigation",
    rank: "#1",
    trafficGrowth: "+460%",
    timeframe: "4 months",
    keywordsRanked: 88,
    topKeyword: "bullet proof window film abudhabi",
    image: "/seo/bullet-proof-window-film-abudhabi.png",
    metrics: [15, 28, 46, 68, 86, 99],
    overview:
      "Niche high-ticket SEO campaign targeting blast mitigation, ballistic glass laminates, and armored security solutions.",
    results: [
      "#1 search ranking for 'bullet proof window film abudhabi'",
      "+460% growth in high-value VIP and security inquiries",
      "Secured multi-site embassy and financial institution contracts",
      "Zero organic competitors able to challenge the top position",
    ],
  },
  {
    id: "seo-9",
    industry: "Architectural & Specialty",
    kind: "Frosted & Decorative Film",
    rank: "#1",
    trafficGrowth: "+360%",
    timeframe: "3 months",
    keywordsRanked: 156,
    topKeyword: "decorative window film abudhabi",
    image: "/seo/decorative-window-film-abudhabi.png",
    metrics: [26, 42, 60, 76, 92, 98],
    overview:
      "Visual SEO capturing interior designers, fit-out contractors, and office managers searching for frosted glass, privacy film, and custom patterns.",
    results: [
      "#1 ranking on Google for 'decorative window film abudhabi'",
      "+360% increase in commercial office fit-out inquiries",
      "Image search pack dominance for frosted & patterned glass",
      "Direct partnership inquiries from top UAE interior design firms",
    ],
  },
  {
    id: "seo-10",
    industry: "Architectural & Specialty",
    kind: "Polycarbonate & Blister-Free Film",
    rank: "#1",
    trafficGrowth: "+240%",
    timeframe: "1 month",
    keywordsRanked: 74,
    topKeyword: "blister free window film",
    image: "/seo/blister-free-window-film.png",
    metrics: [20, 34, 50, 66, 82, 94],
    overview:
      "Technical problem-solving content strategy targeting blister-free films for polycarbonate, acrylic, and plastic glazing surfaces.",
    results: [
      "#1 ranking for 'blister free window film' across GCC region",
      "Captured specialized industrial inquiries nationwide",
      "+240% organic pipeline growth for specialty glazing projects",
      "High E-E-A-T technical case studies driving 18% conversion rate",
    ],
  },
  {
    id: "seo-11",
    industry: "Commercial Solutions",
    kind: "Turnkey Window Film Services",
    rank: "#1",
    trafficGrowth: "+380%",
    timeframe: "4 months",
    keywordsRanked: 185,
    topKeyword: "window film solutions abudhabi",
    image: "/seo/window-film-solutions-abudhabi.png",
    metrics: [32, 50, 68, 82, 94, 100],
    overview:
      "Broad umbrella SEO authority campaign establishing comprehensive leadership for turnkey window film installations across Abu Dhabi.",
    results: [
      "#1 primary ranking for 'window film solutions abudhabi'",
      "185 total keywords ranking on Page 1 of Google",
      "+380% overall organic revenue contribution",
      "Dominant Google Business profile with 5-star review integration",
    ],
  },
];

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
          Google Rank #1
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
      sub="Real Google Search #1 rankings and verified organic growth."
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
.zseo-rank{background:var(--purple-2); color:#fff; font-weight:800; font-size:1.15rem; padding:4px 12px; border-radius:999px}
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
