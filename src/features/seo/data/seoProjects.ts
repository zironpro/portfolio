export type SeoCategory = "seo" | "geo";

export type SeoProject = {
  id: string;
  category: SeoCategory;
  industry?: string;
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

// category is optional on input and defaults to "seo"
type SeoProjectInput = Omit<SeoProject, "category"> & {
  category?: SeoCategory;
};

const RAW_PROJECTS: SeoProjectInput[] = [
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
    timeframe: "2 month",
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
    timeframe: "3 month",
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
  {
    id: "seo-12",
    industry: "Commercial Solutions",
    kind: "Architectural Window Film",
    rank: "#2",
    trafficGrowth: "+350%",
    timeframe: "3 months",
    keywordsRanked: 160,
    topKeyword: "Window Film Solutions in Abu Dhabi",
    image: "/seo/window-film.png",
    metrics: [25, 45, 62, 78, 92, 98],
    overview:
      "High-competition commercial keyword strategy securing Page 1 dominance for comprehensive architectural and residential window film solutions in Abu Dhabi.",
    results: [
      "Rank #2 Google search placement for 'Window Film Solutions in Abu Dhabi'",
      "Outranked established regional and international film suppliers",
      "+350% qualified traffic to dedicated window tinting service landing page",
      "Direct high-ticket commercial inquiries and WhatsApp quotation requests",
    ],
  },
  {
    id: "seo-13",
    industry: "Solar & Heat Control",
    kind: "Architectural Cooling Film",
    rank: "Top 10",
    trafficGrowth: "+260%",
    timeframe: "2 months",
    keywordsRanked: 110,
    topKeyword: "cooling film for windows abu dhabi",
    image: "/seo/cooling-film.png",
    metrics: [18, 32, 48, 64, 80, 92],
    overview:
      "High-intent search optimization capturing commercial property managers and villa owners seeking window cooling films for energy conservation and thermal heat rejection.",
    results: [
      "Top 10 Google search ranking for 'cooling film for windows abu dhabi'",
      "Targeted energy-saving and thermal reduction keyword clusters",
      "+260% increase in seasonal cooling film quotes",
      "Decreased acquisition cost by ranking organically against paid competitors",
    ],
  },
  {
    id: "seo-14",
    industry: "Solar & Heat Control",
    kind: "Sun Shield Window Tinting",
    rank: "Top 10",
    trafficGrowth: "+210%",
    timeframe: "1 month",
    keywordsRanked: 85,
    topKeyword: "sun shield window tinting abu dhabi",
    image: "/seo/sun-sheild.png",
    metrics: [14, 26, 42, 58, 74, 88],
    overview:
      "Targeting high-volume residential and commercial solar tinting keywords, establishing organic footprints for sun shield and glass insulation queries across Abu Dhabi.",
    results: [
      "Top 20 organic position on Google for 'sun shield window tinting abu dhabi'",
      "Expanding visibility across luxury villa communities and residential developments",
      "+210% growth in organic impressions within first 30 days",
      "Direct WhatsApp quote inquiries from mobile searchers",
    ],
  },

  {
    id: "seo-15",
    industry: "Energy & Power",
    kind: "Industrial Generator Rental",
    rank: "#1",
    trafficGrowth: "+310%",
    timeframe: "2 months",
    keywordsRanked: 124,
    topKeyword: "generator rental sharjah",
    image: "/seo/generator-rental-in-sharjah.png",
    metrics: [22, 38, 55, 72, 88, 98],
    overview:
      "Targeted regional SEO strategy capturing industrial contractors, construction sites, and event planners seeking diesel and silent power generators across Sharjah and the Northern Emirates.",
    results: [
      "Rank #1 Google search placement for 'generator rental sharjah'",
      "Captured primary visibility for commercial diesel generator capacities (15 kVA to 1,500 kVA)",
      "+310% increase in high-intent inbound rental RFQs and direct WhatsApp leads",
      "Outranked established national and regional equipment suppliers organically",
    ],
  },

  /* ── GEO (AI search visibility) projects ────────────────────────────── */
  {
    id: "geo-1",
    category: "geo",
    industry: "Energy & Power",
    kind: "ChatGPT Recommendation",
    rank: "#1",
    trafficGrowth: "+280%",
    timeframe: "3 weeks",
    keywordsRanked: 48,
    topKeyword: "best generator rental companies in dubai",
    image: "/geo/energex-generator-rental-recommendation.png",
    metrics: [20, 36, 54, 70, 86, 96],
    overview:
      "Generative Engine Optimization (GEO) positioning Energex as the top-cited equipment rental company in OpenAI ChatGPT for commercial, industrial, and event power inquiries across Dubai.",
    results: [
      "#1 Recommended citation in ChatGPT for 'best generator rental companies in dubai'",
      "Prominently featured with direct website link, capacity specifications (15–1,500 kVA), and 24/7 service highlights",
      "Entity authority built across power equipment databases, technical spec sheets, and high-trust GCC trade directories",
      "+280% increase in AI-referred quotation traffic and high-ticket B2B inquiries",
    ],
  },
  {
    id: "geo-2",
    category: "geo",
    industry: "Energy & Power",
    kind: "Perplexity AI Recommendation",
    rank: "#1",
    trafficGrowth: "+310%",
    timeframe: "1 month",
    keywordsRanked: 52,
    topKeyword: "best generator rental companies in dubai",
    image: "/geo/energex-tops-dubai-generator-rentals.png",
    metrics: [24, 40, 58, 74, 90, 99],
    overview:
      "Optimized structured data, knowledge graph footprints, and regional citation networks to secure the primary answer and source citation on Perplexity AI search.",
    results: [
      "#1 Top Recommended position on Perplexity AI for 'best generator rental companies in dubai'",
      "Verified source citation among 10 authority references with map integration and 24/7 phone contact",
      "Highlighted generator fleet ranges from 15 kVA to 1,500 kVA for construction, industrial, and event power",
      "Captured conversational AI searchers comparing Aggreko, Al-Bahar CAT, and Byrne Equipment",
    ],
  },
  {
    id: "geo-3",
    category: "geo",
    industry: "Solar & Heat Control",
    kind: "ChatGPT Recommendation",
    rank: "#1",
    trafficGrowth: "+340%",
    timeframe: "3 weeks",
    keywordsRanked: 65,
    topKeyword: "window film solutions abu dhabi",
    image: "/geo/crystal-shield-window-film-guide.png",
    metrics: [22, 38, 56, 72, 88, 97],
    overview:
      "GEO and brand authority optimization ensuring Crystal Shield is the primary recommended window film specialist when users prompt ChatGPT for heat control, UV protection, and architectural films in Abu Dhabi.",
    results: [
      "#1 Top Recommended citation in ChatGPT for 'window film solutions abu dhabi'",
      "Full feature snippet citing solar control, security films, UV protection, and residential/commercial services",
      "Rich card generation with direct website link, local contact details, and location pack in Abu Dhabi",
      "Established high entity salience for UAE climate-specific thermal insulation queries",
    ],
  },
  {
    id: "geo-4",
    category: "geo",
    industry: "Solar & Heat Control",
    kind: "Perplexity AI Recommendation",
    rank: "#1",
    trafficGrowth: "+325%",
    timeframe: "1 month",
    keywordsRanked: 58,
    topKeyword: "window film solutions abu dhabi",
    image: "/geo/perplexity-window-film-search-in-abu-dhabi.png",
    metrics: [20, 36, 52, 68, 85, 96],
    overview:
      "Entity-based GEO strategy linking Crystal Shield's technical case studies and regional trade directory profiles to dominate Perplexity AI synthesized search results.",
    results: [
      "#1 Top Recommended citation on Perplexity AI for 'window film solutions abu dhabi'",
      "Sourced across 8 verified citations ahead of regional competitors Tint Concept and Gulf Film",
      "Direct business card display featuring interactive map, opening hours, and direct website routing",
      "+325% growth in high-conversion AI conversational queries across the Abu Dhabi emirate",
    ],
  },
];

export const SEO_PROJECTS: SeoProject[] = RAW_PROJECTS.map((p) => ({
  ...p,
  category: p.category ?? "seo",
}));
