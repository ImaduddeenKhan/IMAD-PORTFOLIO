/**
 * Per-domain SEO enrichment: targeted keyword phrases (the long-tail intents
 * a buyer in that niche actually types into Google) and a short FAQ that gets
 * rendered as JSON-LD FAQPage schema for rich-results eligibility.
 *
 * Keep keywords realistic — Google penalises stuffed pages. We use them in
 * <title>, <meta description>, OpenGraph, and natural-language FAQ answers.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_NAME || "Imad Khan AI Automation";

export const DOMAIN_SEO = {
  healthcare: {
    primaryKeyword: "AI for hospitals and clinics in India",
    keywords: [
      "how to implement AI in hospitals",
      "AI for clinics India",
      "ambient voice scribe for doctors",
      "AI receptionist for clinics",
      "automated discharge summary AI",
      "TPA pre-authorisation automation",
      "AI for OPD appointments",
      "patient follow-up automation WhatsApp",
      "hospital workflow automation India",
      "AI medical billing software India",
    ],
    faqs: [
      {
        q: "How do hospitals implement AI without disrupting patient care?",
        a: "We start with one painful, non-clinical workflow — usually appointment booking or discharge summaries — and ship a working slice in 7–14 days. Doctors only see AI suggestions they can edit and sign. No core EMR is replaced; we integrate via APIs/exports.",
      },
      {
        q: "Is an AI medical scribe safe for Indian clinics?",
        a: "Yes — the AI drafts SOAP notes from the consultation audio in Hindi or English, and the doctor signs every note. Audio can be processed on India-region servers with consent, and PHI is encrypted at rest and in transit.",
      },
      {
        q: "How much does AI for a mid-sized clinic cost in India?",
        a: "A medium clinic (₹3–6 Cr revenue, 30–80 beds) typically pays a one-time build of ₹50K–₹1.2L per workflow plus ₹3K–₹15K monthly tool cost. Payback usually shows up inside 3–6 months from saved doctor and front-desk hours.",
      },
      {
        q: "Will AI replace receptionists or doctors?",
        a: "No. AI removes the repetitive parts — typing notes, chasing forms, calling patients with reports — so receptionists handle judgement calls and doctors do medicine. Headcount usually stays the same; per-doctor capacity rises 25–40%.",
      },
    ],
  },
  "logistics-freight": {
    primaryKeyword: "AI automation for trucking and logistics companies",
    keywords: [
      "AI for trucking companies India",
      "freight dispatch automation",
      "AI for 3PL operations",
      "TMS automation with AI",
      "BOL extraction AI",
      "POD chasing automation",
      "detention claim automation",
      "AI for fleet operations India",
      "freight broker AI tools",
      "truck logistics workflow automation",
    ],
    faqs: [
      {
        q: "How does AI help a mid-sized fleet owner?",
        a: "AI agents handle dispatch matching, paperwork (BOL, POD, e-way bills), detention/demurrage claims, and customer status updates over WhatsApp — freeing 4–8 ops staff to focus on exceptions instead of typing.",
      },
      {
        q: "Can AI integrate with my existing TMS?",
        a: "Yes. We sit on top via API or even daily CSV exports if your TMS is older. The AI reads your data, writes back updates, and never forces a system change.",
      },
      {
        q: "What ROI can a 50-truck fleet expect?",
        a: "A 30–80 truck fleet typically saves ₹5–15 lakh/year in ops hours plus 5–10% recovered detention claims that earlier slipped through. Build is one-time, monthly run cost stays under ₹15K.",
      },
    ],
  },
  "retail-ecommerce": {
    primaryKeyword: "AI automation for e-commerce and D2C brands India",
    keywords: [
      "AI for ecommerce India",
      "Shopify AI automation",
      "D2C brand automation tools",
      "WhatsApp commerce AI",
      "product listing automation",
      "AI customer support ecommerce",
      "abandoned cart automation AI",
      "marketplace seller automation India",
      "Amazon seller AI tools",
    ],
    faqs: [
      {
        q: "Which AI tools should a small D2C brand start with?",
        a: "Start with the highest-volume pain: support tickets and abandoned carts. A WhatsApp + email AI agent that handles 70% of support and recovers carts pays for itself inside a month for most ₹2–5 Cr brands.",
      },
      {
        q: "Can AI write Amazon and Flipkart listings?",
        a: "Yes — given your product data and competitor listings, an AI writes A+ content, bullet points, and even keyword-optimised back-end search terms. Human review takes 2 minutes per SKU instead of 30.",
      },
    ],
  },
  manufacturing: {
    primaryKeyword: "AI automation for MSME manufacturing in India",
    keywords: [
      "AI for manufacturing MSME India",
      "factory paperwork automation",
      "production planning AI India",
      "AI for shop floor",
      "predictive maintenance for SMEs",
      "GST e-invoice automation",
      "purchase order automation AI",
      "manufacturing ERP AI India",
    ],
    faqs: [
      {
        q: "How can a small Indian factory use AI without changing its ERP?",
        a: "We layer AI on top of Tally, SAP B1, or even Excel. The AI reads POs, invoices, dispatch challans, and quality reports — then writes structured data back to your existing system. No rip-and-replace.",
      },
      {
        q: "Is AI worth it for a 30-crore MSME?",
        a: "Yes. The biggest unlock is back-office (POs, GRNs, e-invoices, GST, salary inputs) — typically 60–120 hours/month freed for ₹50K–₹1L build cost.",
      },
    ],
  },
  "construction-engineering": {
    primaryKeyword: "AI automation for construction and EPC firms India",
    keywords: [
      "AI for construction companies India",
      "BOQ automation AI",
      "tender response automation",
      "RA bill automation construction",
      "AI for EPC firms",
      "drawing comparison AI",
      "site report automation",
      "subcontractor RA bill AI",
    ],
    faqs: [
      {
        q: "Can AI prepare BOQs and tender responses?",
        a: "Yes. An AI agent reads your tender documents, drawings and rate library, then drafts a complete BOQ + technical response in hours instead of days. Estimators only review and adjust.",
      },
      {
        q: "How does AI help with RA bills?",
        a: "AI reads measurement sheets, computes deductions, produces the RA bill PDF, and routes it for sign-off — turning a 2-day cycle into 30 minutes per cycle.",
      },
    ],
  },
  insurance: {
    primaryKeyword: "AI automation for insurance brokers and insurers India",
    keywords: [
      "AI for insurance India",
      "claims automation insurance",
      "underwriting AI India",
      "policy issuance automation",
      "insurance broker AI tools",
      "insurance document extraction AI",
      "auto-renewal AI insurance",
    ],
    faqs: [
      {
        q: "How does AI speed up claim processing?",
        a: "AI extracts data from claim forms, hospital bills, and FIR reports, runs first-level rule checks, and prepares a packet for the human assessor — turning 90 minutes per claim into under 10.",
      },
      {
        q: "Can AI handle policy renewals end-to-end?",
        a: "Yes — for standard products. The agent personalises renewal quotes on WhatsApp, answers FAQs, accepts payments, and only escalates to humans for changes in coverage or risk profile.",
      },
    ],
  },
  "banking-capital-markets": {
    primaryKeyword: "AI automation for banks and NBFCs in India",
    keywords: [
      "AI for NBFCs India",
      "KYC automation AI",
      "bank back-office automation",
      "credit decisioning AI India",
      "RM productivity AI",
      "wealth management AI",
      "loan documentation automation",
    ],
    faqs: [
      {
        q: "Is AI safe for KYC and credit decisions in regulated finance?",
        a: "Yes — when designed correctly. AI is used to extract, verify, and pre-score; final approval stays with the human officer with a full audit trail. We follow RBI digital-lending norms and DPDP guardrails.",
      },
    ],
  },
  "accounting-finance-ops": {
    primaryKeyword: "AI for CA firms and finance teams in India",
    keywords: [
      "AI for CA firms India",
      "Tally automation AI",
      "GST return automation",
      "audit automation AI India",
      "bookkeeping AI for SMBs",
      "AP automation India",
      "invoice OCR India",
      "expense reconciliation AI",
    ],
    faqs: [
      {
        q: "Can AI auto-post entries into Tally?",
        a: "Yes. We've shipped a workflow that reads vendor bills (PDF/JPG), matches them to PO/GRN, and posts entries into Tally with the correct GST split — reducing 90% of data-entry hours.",
      },
      {
        q: "Does AI help with GST and audit?",
        a: "AI reconciles GSTR-2A vs purchase register, flags mismatches, and prepares audit working papers. Article time goes from days to hours per client.",
      },
    ],
  },
  legal: {
    primaryKeyword: "AI for law firms and legal teams in India",
    keywords: [
      "AI for law firms India",
      "contract review AI India",
      "legal drafting AI",
      "due diligence automation",
      "court order tracking automation",
      "legal research AI India",
      "contract redlining AI",
    ],
    faqs: [
      {
        q: "Will AI replace junior lawyers?",
        a: "No — it removes the soul-crushing parts: first-pass contract redlines, cite checks, e-discovery sorting. Juniors get to do real legal thinking faster.",
      },
      {
        q: "Is AI accurate enough for legal due diligence?",
        a: "AI gets you to a 90% draft in minutes; a partner finishes the last 10% in an hour, instead of a junior taking three days.",
      },
    ],
  },
  "real-estate": {
    primaryKeyword: "AI automation for real estate brokers and developers India",
    keywords: [
      "AI for real estate India",
      "lead automation real estate",
      "WhatsApp lead bot real estate",
      "broker CRM AI India",
      "site visit booking AI",
      "channel partner automation",
      "sales call analytics real estate",
    ],
    faqs: [
      {
        q: "How does AI help real estate brokers convert more leads?",
        a: "AI replies on WhatsApp/calls within 60 seconds, qualifies the buyer, books a site visit, and only then hands to a human — typical conversion lift is 25–40%.",
      },
    ],
  },
  "education-coaching": {
    primaryKeyword: "AI for schools, coaching institutes and edtech in India",
    keywords: [
      "AI for schools India",
      "AI for coaching institutes",
      "doubt-solving AI for students",
      "automatic test grading AI",
      "AI parent communication",
      "edtech AI India",
      "admission counselling automation",
    ],
    faqs: [
      {
        q: "Can AI grade subjective answers?",
        a: "Yes — for short-answer and structured long-answer questions, AI grades against a rubric with 90%+ teacher agreement. Teachers approve marks in bulk.",
      },
      {
        q: "How does AI help in admissions?",
        a: "An AI counsellor on WhatsApp answers FAQs, qualifies leads, schedules counselling, and follows up — converting 30–50% more cold enquiries with the same team.",
      },
    ],
  },
  "hr-recruitment": {
    primaryKeyword: "AI for recruitment and HR teams in India",
    keywords: [
      "AI for HR India",
      "AI recruitment tools India",
      "resume screening AI",
      "candidate chatbot",
      "interview scheduling AI",
      "onboarding automation",
      "HR ticket automation",
    ],
    faqs: [
      {
        q: "Does AI screening introduce bias in hiring?",
        a: "It can — if you let it. We score on objective skills only, expose the rationale to recruiters, and audit decisions against demographic parity quarterly.",
      },
    ],
  },
  "telecom-isp": {
    primaryKeyword: "AI automation for ISPs and telecom NOCs",
    keywords: [
      "AI for ISP India",
      "NOC automation AI",
      "SLA reporting automation",
      "telecom customer support AI",
      "broadband support chatbot",
      "trouble ticket automation",
    ],
    faqs: [
      {
        q: "Can AI triage NOC alarms?",
        a: "Yes. AI clusters duplicate alarms, predicts the likely root cause, and drafts an incident note — engineers act on signal, not noise.",
      },
    ],
  },
  "government-public-sector": {
    primaryKeyword: "AI for government and public sector in India",
    keywords: [
      "AI for government India",
      "AI citizen helpdesk",
      "regional language chatbot government",
      "RTI response AI",
      "public-sector workflow automation",
      "municipal corporation AI",
    ],
    faqs: [
      {
        q: "Is AI suitable for citizen-facing helpdesks in regional languages?",
        a: "Yes — modern LLMs handle Hindi, Marathi, Tamil, Telugu, Bengali and others with high accuracy. We deploy with a clear escalation path to human officers.",
      },
    ],
  },
  "travel-tourism-hospitality": {
    primaryKeyword: "AI automation for travel agencies and hotels India",
    keywords: [
      "AI for travel agency India",
      "hotel concierge AI",
      "DMC itinerary AI",
      "booking chatbot hotel",
      "OTA refund automation",
      "trip planning AI India",
    ],
    faqs: [
      {
        q: "Can AI build customised itineraries for travellers?",
        a: "Yes. AI takes preferences, budget and dates, then drafts a day-by-day itinerary your team only needs to review and price.",
      },
    ],
  },
  "restaurants-food-services": {
    primaryKeyword: "AI for restaurants, QSRs and cloud kitchens India",
    keywords: [
      "AI for restaurants India",
      "Zomato Swiggy dispute automation",
      "cloud kitchen AI",
      "restaurant inventory AI",
      "QSR automation India",
      "menu engineering AI",
      "AI for food service ops",
    ],
    faqs: [
      {
        q: "How does AI cut Zomato/Swiggy disputes?",
        a: "An AI agent reads aggregator dashboards daily, flags missing-item or refund disputes within hours, files counter-evidence (KOT, dispatch photo) automatically, and recovers 60–80% of bogus deductions.",
      },
    ],
  },
  "agriculture-agribusiness": {
    primaryKeyword: "AI for FPOs and agribusiness in India",
    keywords: [
      "AI for agriculture India",
      "farmer advisory chatbot",
      "AI for FPOs",
      "mandi price AI",
      "agri input recommendation AI",
      "crop advisory AI India",
    ],
    faqs: [
      {
        q: "Can AI advise farmers in their own language?",
        a: "Yes — AI voice + WhatsApp agents work in 10+ Indian languages and handle weather alerts, pest advisory, mandi prices, and input recommendations.",
      },
    ],
  },
  "renewable-energy": {
    primaryKeyword: "AI automation for solar EPC and renewable energy India",
    keywords: [
      "AI for solar EPC India",
      "DISCOM application automation",
      "rooftop solar subsidy AI",
      "renewable energy CRM AI",
      "energy consultancy AI tools",
    ],
    faqs: [
      {
        q: "How does AI help solar EPCs?",
        a: "AI fills DISCOM and subsidy applications, tracks status, drafts BOQ + DPR, and answers customer queries on WhatsApp — collapsing weeks of paperwork into days.",
      },
    ],
  },
  "customer-support-bpo": {
    primaryKeyword: "AI for BPOs and customer-support teams India",
    keywords: [
      "AI for BPO India",
      "agent assist AI",
      "voice AI for support",
      "100% QA AI",
      "auto-QA call centre",
      "customer support chatbot India",
      "ticket deflection AI",
    ],
    faqs: [
      {
        q: "Can AI achieve 100% QA on contact centre calls?",
        a: "Yes. Every call is transcribed, scored against your QA rubric, and the worst 5% are routed to QA leads — instead of sampling 2% manually.",
      },
    ],
  },
  "professional-services-agencies": {
    primaryKeyword: "AI for consulting firms and digital agencies India",
    keywords: [
      "AI for consulting firms",
      "agency proposal automation",
      "deck generation AI",
      "client status report automation",
      "timesheet AI",
      "agency RFP automation",
    ],
    faqs: [
      {
        q: "Will AI write client decks for me?",
        a: "AI drafts the deck from your inputs (data, brief, prior decks), and you spend time on insight and design polish — not on copy-pasting.",
      },
    ],
  },
  "mortgage-lenders-brokers": {
    primaryKeyword: "AI for mortgage lenders and brokers",
    keywords: [
      "AI for mortgage brokers",
      "loan document automation",
      "DSA workflow AI",
      "home-loan sanction packet AI",
      "mortgage AI India",
      "NBFC home loan automation",
    ],
    faqs: [
      {
        q: "How fast can AI build a sanction packet?",
        a: "From document upload to a sanction-ready packet in under 30 minutes — vs 2–3 days manually.",
      },
    ],
  },
  "truck-permit-providers": {
    primaryKeyword: "AI for OS/OW truck permit providers in the USA",
    keywords: [
      "AI for truck permit providers",
      "oversize permit automation",
      "BOL extraction permit",
      "multi-state permit application AI",
      "escort coordination AI",
      "heavy haul permit software AI",
    ],
    faqs: [
      {
        q: "Can AI file multi-state OS/OW permits?",
        a: "Yes. AI reads the BOL, plans the route, fills each state's permit portal form, attaches required documents, and tracks status — collapsing days of work into a few hours per load.",
      },
    ],
  },
};

export function getDomainSeo(slug) {
  return DOMAIN_SEO[slug] || { keywords: [], faqs: [] };
}

export function buildDomainMetadata(domain) {
  const seo = getDomainSeo(domain.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imadkhan.me";
  const url = `${siteUrl.replace(/\/$/, "")}/${domain.slug}`;
  const title = `${domain.label} — ${seo.primaryKeyword || "AI automation"} | ${SITE}`;
  const description = `${domain.subheadline?.slice(0, 155) || ""}`.trim();

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: `/${domain.slug}` },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export function buildDomainJsonLd(domain) {
  const seo = getDomainSeo(domain.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imadkhan.me";
  const url = `${siteUrl.replace(/\/$/, "")}/${domain.slug}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `AI automation for ${domain.label}`,
    name: `AI automation for ${domain.label}`,
    description: domain.subheadline,
    provider: {
      "@type": "Person",
      name: "Imaduddeen Khan",
      jobTitle: "AI Automation Engineer",
      url: siteUrl,
      email: "aiwithimad@gmail.com",
    },
    areaServed: { "@type": "Country", name: "India" },
    audience: { "@type": "Audience", audienceType: domain.audience },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: domain.buildCost,
      description: "One-time build cost for the medium-business setup described on the page.",
    },
    url,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: domain.label, item: url },
    ],
  };

  const faqs = (seo.faqs || []).length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }
    : null;

  return [service, breadcrumb, faqs].filter(Boolean);
}
