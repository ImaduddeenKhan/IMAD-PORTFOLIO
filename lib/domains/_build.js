/**
 * buildDomain: validates and fills computed cost fields on every task.
 * Each task only needs hoursPerMonth (both sides) and ai.toolCost.
 *
 * Numbers are SCALED so they reflect a *medium-sized* business
 * (typical Indian SMB doing roughly ₹2–8 Cr annual turnover).
 * Earlier the math felt enterprise-heavy (₹1+ Cr savings) which is
 * unrealistic for the SMB owners these pages are written for.
 *
 * A domain can override:
 *   - domain.scale          : multiplier on traditional & AI hoursPerMonth
 *                             (defaults below by domain — most are 0.18-0.30)
 *   - domain.businessProfile: { sizeLabel, annualTurnover, teamSize, locations }
 *                             a default is provided if missing
 */
const DEFAULT_SCALE_BY_DOMAIN = {
  // small annual-turnover targets where hours were way over-stated
  healthcare: 0.18,            // 1 mid clinic, ~₹3-5 Cr revenue
  banking: 0.12,
  "banking-capital-markets": 0.12,
  insurance: 0.18,
  "mortgage-lenders-brokers": 0.22,
  "customer-support-bpo": 0.18,
  manufacturing: 0.22,
  "construction-engineering": 0.22,
  "logistics-freight": 0.25,
  legal: 0.30,
  "real-estate": 0.30,
  "education-coaching": 0.28,
  "hr-recruitment": 0.30,
  "telecom-isp": 0.22,
  "government-public-sector": 0.20,
  "travel-tourism-hospitality": 0.30,
  "restaurants-food-services": 0.35,
  "agriculture-agribusiness": 0.30,
  "renewable-energy": 0.28,
  "professional-services-agencies": 0.35,
  "accounting-finance-ops": 0.30,
  "retail-ecommerce": 0.30,
  "truck-permit-providers": 0.45,
};

const DEFAULT_BUSINESS_PROFILE = {
  sizeLabel: "Medium-sized business",
  annualTurnover: "₹3–8 Cr / year",
  teamSize: "20–80 people",
  locations: "1–3 branches",
};

const DOMAIN_BUSINESS_PROFILES = {
  healthcare: {
    sizeLabel: "Mid-sized multi-speciality clinic / 30–80 bed hospital",
    annualTurnover: "₹3–6 Cr / year",
    teamSize: "1 receptionist desk, 4–10 doctors, 8–20 nurses, 1 billing/insurance person",
    locations: "1 clinic / hospital",
  },
  "logistics-freight": {
    sizeLabel: "Mid-sized fleet owner / regional 3PL",
    annualTurnover: "₹4–10 Cr / year",
    teamSize: "30–80 trucks, 4–8 ops staff, 2 dispatchers",
    locations: "1 head office + 1–3 yards",
  },
  "retail-ecommerce": {
    sizeLabel: "Growing D2C / regional retail brand",
    annualTurnover: "₹2–6 Cr / year",
    teamSize: "8–25 people across ops, support and marketing",
    locations: "1 warehouse, online + 0–3 stores",
  },
  manufacturing: {
    sizeLabel: "MSME factory (Tier-2 / Tier-3 city)",
    annualTurnover: "₹4–12 Cr / year",
    teamSize: "30–120 people on shop floor + 6–10 office staff",
    locations: "1 plant",
  },
  "construction-engineering": {
    sizeLabel: "Mid-sized contractor / EPC firm",
    annualTurnover: "₹5–15 Cr / year, 3–8 active projects",
    teamSize: "15–40 office + 100–300 site",
    locations: "1 head office + 3–8 sites",
  },
  insurance: {
    sizeLabel: "Mid-sized broking house / regional insurer ops cell",
    annualTurnover: "₹3–10 Cr brokerage",
    teamSize: "20–60 underwriters, claims & support staff",
    locations: "1–4 offices",
  },
  "banking-capital-markets": {
    sizeLabel: "Branch / NBFC ops unit",
    annualTurnover: "₹10–30 Cr book size",
    teamSize: "15–40 ops + RMs",
    locations: "1–3 branches",
  },
  "accounting-finance-ops": {
    sizeLabel: "CA firm / in-house finance team",
    annualTurnover: "₹1–5 Cr fee book / serving SMBs",
    teamSize: "8–25 articles & seniors",
    locations: "1–2 offices",
  },
  legal: {
    sizeLabel: "Boutique law firm",
    annualTurnover: "₹1–4 Cr fee book",
    teamSize: "4–15 lawyers + 2–5 support",
    locations: "1 office",
  },
  "real-estate": {
    sizeLabel: "Mid-sized broker / 1-project developer",
    annualTurnover: "₹3–10 Cr / year",
    teamSize: "10–30 sales + ops",
    locations: "1–3 offices",
  },
  "education-coaching": {
    sizeLabel: "Coaching institute / mid-sized school",
    annualTurnover: "₹2–6 Cr / year",
    teamSize: "20–60 teachers + admin",
    locations: "1–3 centres",
  },
  "hr-recruitment": {
    sizeLabel: "Recruitment firm / in-house TA team",
    annualTurnover: "₹1–4 Cr / year, 60–200 hires/year",
    teamSize: "5–15 recruiters",
    locations: "1 office",
  },
  "telecom-isp": {
    sizeLabel: "Regional ISP / managed-services provider",
    annualTurnover: "₹3–8 Cr / year",
    teamSize: "15–40 NOC + support",
    locations: "1 NOC + 1–3 PoPs",
  },
  "government-public-sector": {
    sizeLabel: "Municipal corporation cell / mid-sized PSU department",
    annualTurnover: "Annual budget ₹20–80 Cr",
    teamSize: "30–80 staff in the cell",
    locations: "1 office",
  },
  "travel-tourism-hospitality": {
    sizeLabel: "Boutique DMC / 3-star hotel chain",
    annualTurnover: "₹3–8 Cr / year",
    teamSize: "10–30 ops + reservations",
    locations: "1–4 properties",
  },
  "restaurants-food-services": {
    sizeLabel: "QSR / cloud-kitchen group",
    annualTurnover: "₹2–6 Cr / year",
    teamSize: "20–60 staff across kitchens",
    locations: "2–6 outlets",
  },
  "agriculture-agribusiness": {
    sizeLabel: "Farmer Producer Organisation / agri-input company",
    annualTurnover: "₹2–8 Cr / year",
    teamSize: "10–30 staff serving 1,000–10,000 farmers",
    locations: "1 head office + 2–6 collection centres",
  },
  "renewable-energy": {
    sizeLabel: "Solar EPC / energy consultancy",
    annualTurnover: "₹4–12 Cr / year",
    teamSize: "10–25 engineers + ops",
    locations: "1 office + project sites",
  },
  "customer-support-bpo": {
    sizeLabel: "Mid-sized BPO / in-house CX team",
    annualTurnover: "₹3–10 Cr / year",
    teamSize: "30–120 seats",
    locations: "1–2 centres",
  },
  "professional-services-agencies": {
    sizeLabel: "Boutique consulting firm / digital agency",
    annualTurnover: "₹1–4 Cr / year",
    teamSize: "10–30 people",
    locations: "1 office",
  },
  "mortgage-lenders-brokers": {
    sizeLabel: "DSA / broker shop / small HFC branch",
    annualTurnover: "₹2–8 Cr fee income, 40–150 cases / month",
    teamSize: "8–25 people",
    locations: "1–3 offices",
  },
  "truck-permit-providers": {
    sizeLabel: "OS/OW permit shop (US)",
    annualTurnover: "$300K–$1.2M / year",
    teamSize: "4–12 permit agents + 1–2 escort coordinators",
    locations: "1 office",
  },
};

export function buildDomain(domain) {
  const rate = domain.assumedRate;
  const scale = domain.scale ?? DEFAULT_SCALE_BY_DOMAIN[domain.slug] ?? 0.25;
  const businessProfile =
    domain.businessProfile ||
    DOMAIN_BUSINESS_PROFILES[domain.slug] ||
    DEFAULT_BUSINESS_PROFILE;

  // Per-task hours are kept as-is (they describe a *reference* mid-large
  // setup so the volume text — "≈ 2,300 bookings / month" — stays honest).
  // The dashboard totals at the top, ROI band and hero stat are then
  // multiplied by `scale` inside DomainPage.jsx so the headline savings
  // reflect the medium-sized business profile shown above the math.
  const tasks = domain.tasks.map((t) => {
    const tradHours = t.traditional.hoursPerMonth;
    const aiHours = t.ai.hoursPerMonth;
    const toolCost = t.ai.toolCost ?? 0;
    return {
      ...t,
      traditional: {
        ...t.traditional,
        monthlyCost: Math.round(tradHours * rate),
      },
      ai: {
        ...t.ai,
        toolCost,
        monthlyCost: Math.round(aiHours * rate + toolCost),
      },
    };
  });

  // Scale build & run costs to the medium-business profile too.
  const buildCost = Math.round((domain.buildCost || 0) * Math.max(0.4, scale * 1.8));
  const monthlyRun = Math.round((domain.monthlyRun || 0) * Math.max(0.4, scale * 1.8));

  return { ...domain, scale, businessProfile, buildCost, monthlyRun, tasks };
}


