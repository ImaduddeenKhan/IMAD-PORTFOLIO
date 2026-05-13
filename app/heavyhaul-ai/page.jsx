import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Database,
  FileScan,
  KeyRound,
  MailSearch,
  Network,
  RadioTower,
  ServerCog,
  ShieldCheck,
  Truck,
  Workflow,
} from "lucide-react";
import ThemeModeToggle from "@/components/portfolio/ThemeModeToggle";
import { getPublicPortfolio } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI Logistics Automation Case Study",
  description:
    "A public-safe case study explaining the AI logistics automation systems Imad built during his internship, including agents, document extraction, APIs, email automation, and deployment work.",
};

const metrics = [
  { label: "Major systems", value: "13" },
  { label: "Document types automated", value: "5" },
  { label: "Core endpoint", value: "/api/v1/order" },
  { label: "Support languages", value: "3" },
];

const capabilities = [
  "AI order support agent",
  "Multilingual estimate assistant",
  "Internal RAG knowledge search",
  "Voice conversation transcription",
  "Transcript cleaning pipeline",
  "Agentic Gmail intake workflow",
  "Front desk operations dashboard",
  "External TMS API integration",
  "Vision-based document extraction",
  "Async order lifecycle tracking",
  "API keys, OTP, CAPTCHA, rate limits",
  "Email notifications and audit logs",
  "Docker deployment and runtime operations",
];

const timeline = [
  {
    icon: Network,
    title: "1. I mapped the logistics workflow and designed the backend architecture",
    text: "I first studied how oversized-load orders move through the business: intake, document collection, route details, permit checks, order creation, team handoff, status updates, and notifications. From that flow, I designed a modular Flask backend with route blueprints, controllers, MongoDB models, middleware, utility layers, and clean response contracts.",
    points: [
      "Separated the platform into clear domains such as chat, permits, document onboarding, TMS registration, API updates, admin operations, and LiveKit authentication.",
      "Used MongoDB collections for orders, sessions, TMS clients, state rules, trucks, trailers, carriers, and users so the system could evolve without rigid relational migrations.",
      "Designed the system as a production-oriented modular monolith, which kept deployment simple while still keeping each feature area maintainable.",
    ],
  },
  {
    icon: Bot,
    title: "2. I built an AI order support agent for drivers and internal teams",
    text: "The first user-facing AI feature was a support bot that answers order-related questions. The user provides an order reference, and the agent retrieves order context, checks rules, and explains the result conversationally instead of forcing a staff member to search database records manually.",
    points: [
      "Added tool-calling functions for order fields, permit rules, load compliance, journey compliance, provision files, and pricing details.",
      "Connected the agent to fast LLM inference for responsive chat behavior and grounded each answer in retrieved operational data.",
      "Added a dark chat widget, voice input path, speech response support, active-order context display, and feedback hooks for response quality review.",
    ],
    image: "/case-studies/heavyhaul-ai/ai-agent.webp",
    imageAlt: "Sanitized AI order support chat widget screenshot",
  },
  {
    icon: Truck,
    title: "3. I created a multilingual estimator assistant",
    text: "After support automation, I built a customer-facing estimator flow. It lets a user enter route details and load dimensions, then starts an assisted session that can explain estimated costs and requirements in a simpler conversational format.",
    points: [
      "Captured origin, destination, route states, length, width, height, weight, and overhang information for better estimation context.",
      "Added English, Spanish, and Romanian support so the workflow could serve a wider logistics workforce.",
      "Implemented selectable agent voices and a clean session-start flow so non-technical users could begin quickly.",
    ],
    image: "/case-studies/heavyhaul-ai/estimator-agent.webp",
    imageAlt: "Sanitized multilingual estimator assistant screenshot",
  },
  {
    icon: BrainCircuit,
    title: "4. I built a RAG knowledge system for employee support",
    text: "The company had repeated questions about internal process, state rules, and operational decisions. I built a Retrieval-Augmented Generation system so employees could ask questions and receive answers grounded in internal knowledge instead of relying only on generic LLM memory.",
    points: [
      "Chunked and indexed internal conversation data and regulatory text so relevant context could be retrieved for each query.",
      "Connected state-specific regulation files to the answer flow, including permit provisions and compliance context.",
      "Improved consistency for new employees by preserving practical knowledge in a searchable support layer.",
    ],
  },
  {
    icon: RadioTower,
    title: "5. I developed a Discord voice transcription bot",
    text: "To grow the internal knowledge base, I built a bot that joins voice channels, listens to operational discussions, converts speech to text, and stores daily transcripts for later analysis and training data preparation.",
    points: [
      "Used Discord.js for voice-channel handling and Deepgram for speech-to-text transcription.",
      "Implemented one transcript per day, per server, per voice channel, with automatic finalization at the configured end-of-day time.",
      "Handled restarts safely by appending to the existing daily transcript instead of producing duplicate files.",
    ],
  },
  {
    icon: Database,
    title: "6. I cleaned raw transcripts into AI-ready data",
    text: "Raw transcripts are noisy. I built a cleanup pipeline that normalizes the captured conversations so they can become useful retrieval and training material instead of messy text dumps.",
    points: [
      "Used spaCy English and Spanish models for language-aware text processing.",
      "Removed noise artifacts, standardized formatting, and prepared cleaner chunks for downstream search and RAG ingestion.",
      "Designed the process for batch cleanup so large transcript collections could be processed repeatedly as more data arrived.",
    ],
  },
  {
    icon: MailSearch,
    title: "7. I automated front desk Gmail intake with an agentic workflow",
    text: "A major operational bottleneck was email-based order intake. I designed a LangGraph workflow where specialized agents monitor email threads, classify relevant requests, extract useful details, and prepare structured order data for the team.",
    points: [
      "Built the workflow as a multi-step graph: monitor, classify, extract, consolidate, and prepare order-ready output.",
      "Created a dashboard that shows intake stages, aging alerts, assignments, source links, order-building status, and ready-for-routing queues.",
      "Reduced repetitive reading and copying work while giving the team a clearer operational view of the inbox pipeline.",
    ],
    image: "/case-studies/heavyhaul-ai/frontdesk-dashboard.webp",
    imageAlt: "Sanitized front desk intake dashboard screenshot",
  },
  {
    icon: Workflow,
    title: "8. I built external APIs for partner TMS platforms",
    text: "Once internal flows were stable, I built public-facing API workflows so external transportation management systems could submit orders programmatically. The key endpoint accepts structured order data, document references, and multipart uploads, then returns an asynchronous acknowledgement.",
    points: [
      "Designed nested payload support for contacts, carrier data, truck data, trailer data, route stops, commodity dimensions, and documents.",
      "Added field validation for driver and client emails, VINs, MC/DOT numbers, route stop dates, and dimensional data.",
      "Implemented route-state inference, UTC route-date normalization, status polling, and callback support for downstream completion events.",
    ],
  },
  {
    icon: KeyRound,
    title: "9. I added self-service API registration and secure key provisioning",
    text: "To make partner onboarding practical, I built a registration page that collects workspace details, validates human users, verifies work email ownership, and then provisions API access in a controlled way.",
    points: [
      "Added CAPTCHA before registration to reduce automated abuse.",
      "Added email OTP verification with expiration and attempt controls before key generation.",
      "Stored client records with activation state, API key metadata, and admin controls for future access management.",
    ],
  },
  {
    icon: FileScan,
    title: "10. I built multi-document extraction for operational documents",
    text: "I automated extraction from the documents that repeatedly appear in logistics orders: rate confirmations, truck registrations, trailer registrations, IFTA certificates, and insurance documents. The goal was to reduce manual reading and prepare order-ready data faster.",
    points: [
      "Rendered PDFs into images and sent them to vision-language models with document-specific prompts.",
      "Processed multiple document URLs in parallel using ThreadPoolExecutor, then merged extracted values into a normalized payload.",
      "Added VIN decoding and enrichment for truck and trailer records where useful.",
    ],
    imagePair: [
      {
        src: "/case-studies/heavyhaul-ai/truck-form.webp",
        alt: "Truck registration form populated by extraction workflow",
      },
      {
        src: "/case-studies/heavyhaul-ai/trailer-form.webp",
        alt: "Trailer registration form populated by extraction workflow",
      },
    ],
  },
  {
    icon: ServerCog,
    title: "11. I implemented the async order lifecycle and downstream handoff",
    text: "Document extraction and downstream order creation can take time, so I moved the intake flow to an asynchronous lifecycle. Clients receive a fast acceptance response, while processing continues safely in the background.",
    points: [
      "Returned 202 Accepted with a generated order ID after validation and initial persistence.",
      "Tracked lifecycle states such as received, processing, forwarded, created, and failed.",
      "Added status polling and callback endpoints so external systems can follow the order without blocking their own workflows.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "12. I added security, notifications, observability, and deployment work",
    text: "The final layer was reliability. I added practical controls around authentication, rate limits, callbacks, email notifications, structured logs, audit metadata, Docker deployment, and production runtime troubleshooting.",
    points: [
      "Implemented API-key middleware, callback secret validation, per-client rate limiting, client activation/deactivation, and structured error responses.",
      "Built receipt emails, lifecycle notifications, OTP emails, and HTML email templates for operational communication.",
      "Added endpoint timing logs, JSON logs, step-by-step pipeline output, Docker containerization, environment management, and production monitoring workflows.",
    ],
  },
];

const stack = [
  "Python",
  "Flask",
  "MongoDB",
  "Google Gemini",
  "Groq LLMs",
  "LangGraph",
  "spaCy",
  "Deepgram",
  "Discord.js",
  "SMTP",
  "Docker",
  "Gunicorn",
];

export default async function LogisticsAutomationPage() {
  const portfolio = await getPublicPortfolio().catch(() => null);
  const initialMode = portfolio?.theme?.preset === "light" || portfolio?.theme?.preset === "minimal" ? "light" : "dark";
  const name = portfolio?.personalInfo?.fullName || "Imad Khan";

  return (
    <div className="min-h-screen">
      <header className="topnav-bar">
        <Link
          href="/"
          className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-fg/60 transition-colors hover:text-fg"
        >
          {name}
        </Link>
        <div className="flex items-center gap-3">
          <ThemeModeToggle initialMode={initialMode} compact />
          <a href="#work" className="topnav-menu-btn">
            Work <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[92vh] items-end overflow-hidden pt-28">
          <div className="container-page pb-12 sm:pb-16 lg:pb-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
              <div className="max-w-4xl">
                <p className="eyebrow animate-fade-up">Public case study</p>
                <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  AI logistics automation platform
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-fg/72 sm:text-lg">
                  Over several months, I helped build a production backend for oversized-load logistics operations. The work covered AI agents, document extraction, email intake automation, external APIs, security layers, logging, and deployment. This page only explains the useful project work and deliberately removes private personal and company-identifying details.
                </p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {capabilities.slice(0, 7).map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {metrics.map((metric, index) => (
                  <div key={metric.label} className="card p-5 animate-fade-up" style={{ "--enter-delay": `${index * 70}ms` }}>
                    <div className="font-display text-3xl font-semibold tracking-[-0.05em] text-fg sm:text-4xl">
                      {metric.value}
                    </div>
                    <div className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" id="overview">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1fr]">
              <div>
                <p className="eyebrow">Problem</p>
                <h2 className="section-h mt-4">What the system needed to solve</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Operations teams had to read long email threads, PDF documents, registrations, permits, and order notes manually.",
                  "Drivers and employees needed quick answers about orders, routes, rules, pricing, and compliance without waiting for someone to search records.",
                  "External TMS platforms needed a clean way to submit order data and track status programmatically.",
                  "The business needed stronger security, logs, lifecycle notifications, and deployment practices around these AI workflows.",
                ].map((item) => (
                  <div key={item} className="card p-6">
                    <CheckCircle2 className="mb-4 h-5 w-5 text-primary" />
                    <p className="text-sm leading-relaxed text-fg/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" id="work">
          <div className="container-page">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow">Build sequence</p>
              <h2 className="section-h mt-4">What I built, in order</h2>
              <p className="section-sub">
                The work grew from core workflow mapping into AI support, then document automation, then partner APIs, and finally production reliability.
              </p>
            </div>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <article key={item.title} className="card overflow-hidden animate-fade-up" style={{ "--enter-delay": `${index * 45}ms` }}>
                  <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)]">
                    <div className="p-6 sm:p-8 lg:p-10">
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.04em] text-fg sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-fg/72 sm:text-base">{item.text}</p>
                      <ul className="mt-6 space-y-3">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3 text-sm leading-relaxed text-fg/72">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Visual item={item} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="stack">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
              <div>
                <p className="eyebrow">Tech stack</p>
                <h2 className="section-h mt-4">Tools I used to ship it</h2>
                <p className="section-sub">
                  The stack combined backend APIs, multimodal AI, real-time transcription, NLP cleanup, security middleware, and deployment operations.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {stack.map((item) => (
                  <span key={item} className="chip py-2 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" id="impact">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
              <div>
                <p className="eyebrow">Impact</p>
                <h2 className="section-h mt-4">What changed after the build</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Manual order lookup became faster through conversational support agents.",
                  "Document-heavy intake became more consistent through vision-based extraction and normalized payloads.",
                  "Email-heavy front desk work became trackable through an agent-assisted dashboard workflow.",
                  "External partners gained a structured API path for order submission, status polling, and callbacks.",
                  "Security improved through API keys, OTP, CAPTCHA, callback secrets, rate limits, and client activation controls.",
                  "Operations gained better auditability through structured logs, lifecycle metadata, and saved pipeline step outputs.",
                ].map((item) => (
                  <div key={item} className="card p-6">
                    <p className="text-sm leading-relaxed text-fg/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Visual({ item }) {
  if (item.imagePair) {
    return (
      <div className="grid gap-4 border-t border-border bg-bg/45 p-4 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:p-6">
        {item.imagePair.map((image) => (
          <div key={image.src} className="relative min-h-[420px] overflow-hidden rounded-[1.35rem] border border-border bg-surface/70">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 50vw, 360px" className="object-contain" />
          </div>
        ))}
      </div>
    );
  }

  if (item.image) {
    return (
      <div className="border-t border-border bg-bg/45 p-4 lg:border-l lg:border-t-0 lg:p-6">
        <div className="relative aspect-[16/10] min-h-[300px] overflow-hidden rounded-[1.35rem] border border-border bg-surface/70">
          <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 1024px) 100vw, 620px" className="object-contain" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-border bg-bg/45 p-6 lg:border-l lg:border-t-0 lg:p-10">
      <div className="grid h-full min-h-[260px] place-items-center rounded-[1.35rem] border border-border bg-surface/55 p-8 text-center">
        <div>
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-fg/68">
            Backend and automation work: no public screenshot shown here because the original evidence includes private operational details.
          </p>
        </div>
      </div>
    </div>
  );
}