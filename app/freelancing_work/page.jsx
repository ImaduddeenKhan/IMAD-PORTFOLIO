import Image from "next/image";
import Link from "next/link";
import { getPublicPortfolio } from "@/lib/site-data";
import WhatsAppFab from "@/components/portfolio/WhatsAppFab";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Heavy-Haul AI Solutions — Imad Khan",
  description:
    "An in-depth look at 12+ AI-powered systems I built for the heavy-haul transportation industry — from agentic email automation to RAG knowledge platforms.",
};

/* ─── narrative data ─── */

const chapterIntro = {
  badge: "The Industry",
  title: "Heavy-haul transportation is a world of permits, regulations, and relentless coordination.",
  body: [
    "The company I worked with operates across all 50 U.S. states in the oversize and heavy-haul transportation industry. Every time a large truck carries an oversized load between states, it needs permits that comply with each state's unique transportation regulations.",
    "The business manages the entire permitting process and also handles dispatch operations for carriers moving loads across the country. It's a domain where a single missed detail — a wrong state, an expired permit, a misread load dimension — can cost thousands of dollars.",
    "When I started transforming their operation, much of the work was manual: reading long email threads, reviewing PDF documents by hand, copying data between systems, and relying on institutional knowledge that lived only in people's heads.",
    "I was brought in to change that.",
  ],
};

const systemSummary = [
  { name: "Front Desk Email Automation", problem: "Hundreds of emails requiring manual review", solution: "Multi-agent classification & context pipeline" },
  { name: "TMS Integration API", problem: "Manual order entry from external partners", solution: "Secure REST API & developer registration portal" },
  { name: "Document Extraction Suite", problem: "Repetitive data entry from complex PDFs", solution: "Vision-language extraction for 5 document types" },
  { name: "Order Information Assistant", problem: "Time lost searching DBs for order status", solution: "NLP chat assistant with real-time data access" },
  { name: "Voice Recording Platform", problem: "Valuable operational knowledge lost post-call", solution: "Multi-channel active voice recording & transcription" },
  { name: "Transcript Processing", problem: "Raw voice transcripts were noisy and unusable", solution: "NLP pipeline to clean and structure text for AI" },
  { name: "RAG Knowledge System", problem: "Tribal knowledge was unsearchable", solution: "RAG search platform over organizational data" },
  { name: "AI Interview & Training", problem: "Repeated operational errors costing money", solution: "AI post-incident investigator & training generator" },
  { name: "Email Drafting Assistant", problem: "Writing repetitive replies without context", solution: "AI assistant drafts replies using thread history" },
  { name: "Route Auto-Approval", problem: "Manual approval for identical past routes", solution: "Historical pattern matching for auto-approval" },
  { name: "Estimator Agent", problem: "Inaccurate or limited cost estimation", solution: "Enhanced accuracy & usability of estimator bot" },
  { name: "Customer Portals", problem: "Lack of professional customer-facing UI", solution: "Designed marketing & secure registration portals" }
];

const projects = [
  {
    num: "01",
    title: "AI-Powered Front Desk Email Automation",
    category: "Multi-Agent System",
    accent: "orange",
    narrative: "The company receives hundreds of emails daily — customers requesting permits, carriers sending documents, brokers asking for quotes. Employees had to manually read through lengthy email threads, figure out what was relevant, and piece together context from scattered conversations. It was one of the biggest time drains in the organization.",
    approach: "I designed a multi-agent system using LangGraph with five coordinated AI agents working together in a pipeline.",
    details: [
      { label: "Agent 1", text: "Email monitoring and classification — continuously watches the inbox, determines if a message belongs to an existing thread, whether it's a real customer request or marketing noise." },
      { label: "Agents 2–5", text: "Context retrieval and order intelligence — search Gmail for previous conversations, pull the last related threads, extract order references, fetch details from internal databases, and assemble complete context." },
    ],
    challenge: "One of the biggest challenges was accurately classifying permit requests. Many emails discuss permits without actually placing orders. I analyzed communication patterns and designed custom classification logic to distinguish between the two.",
    image: "/case-studies/freelancing/fl-email-dashboard.png",
    imageAlt: "Front Desk Dashboard showing intake pipeline stages",
    imageCaption: "The front desk dashboard — showing reported intakes, order building status, and ready-for-routing queues.",
  },
  {
    num: "02",
    title: "TMS Integration API",
    category: "API Engineering",
    accent: "black",
    narrative: "External Transportation Management Systems needed a clean way to submit order data programmatically. Without an API, partners had to send emails or make phone calls — a process that didn't scale.",
    approach: "I designed a complete integration API that allows external TMS platforms to send load information, rate confirmations, and supporting documents directly into the company's system.",
    details: [
      { label: "Architecture", text: "One primary endpoint that accepts structured order data with nested payloads for contacts, carrier info, truck/trailer data, route stops, commodity dimensions, and document references." },
      { label: "Developer Experience", text: "I created AI-friendly API documentation that developers can copy directly into tools like Claude Code or GitHub Copilot to rapidly integrate with minimal friction." },
      { label: "Security", text: "Token-based authentication generated through the company website, with CAPTCHA protection and email OTP verification before key provisioning." },
    ],
    imagePair: [
      { src: "/case-studies/freelancing/fl-api-documentation.png", alt: "API documentation page", caption: "The API docs I designed — with code samples for easy integration." },
      { src: "/case-studies/freelancing/fl-api-portal.png", alt: "TMS registration portal", caption: "Self-service API registration page with OTP email verification." },
    ],
  },
  {
    num: "03",
    title: "Intelligent Document Extraction Suite",
    category: "Document Intelligence",
    accent: "cream",
    narrative: "The permitting team spent hours every day manually reviewing uploaded documents — permits, registrations, rate confirmations, insurance certificates — and typing information into internal systems. It was repetitive, error-prone, and a bottleneck for the entire workflow.",
    approach: "I built an AI-powered extraction system that handles five different document types, each with its own extraction logic and validation pipeline.",
    details: [
      { label: "Permit Extraction", text: "Automatically pulls permit details from uploaded documents, dramatically reducing manual data entry time." },
      { label: "Vehicle & Trailer Data", text: "Automated extraction pipelines for truck and trailer registration documents, including VIN decoding and enrichment." },
      { label: "Rate Confirmation", text: "Identifies and extracts key shipment and pricing information directly from RateCon documents." },
      { label: "COI & IFTA", text: "Extraction modules for Certificate of Insurance and International Fuel Tax Agreement documents for compliance workflows." },
    ],
    technical: "Rendered PDFs into images and sent them to vision-language models with document-specific prompts. Processed multiple document URLs in parallel using ThreadPoolExecutor, then merged extracted values into normalized payloads.",
  },
  {
    num: "04",
    title: "Intelligent Order Information Assistant",
    category: "AI Agent",
    accent: "orange",
    narrative: "Drivers, dispatchers, and internal teams constantly needed quick answers about specific orders — route details, payment status, load specifications, restrictions. Previously, someone had to manually search through database records to find answers.",
    approach: "I built an AI assistant that takes an order number and retrieves everything about that order, combining real-time data retrieval with regulatory knowledge.",
    details: [
      { label: "Capabilities", text: "Users can ask natural language questions like 'What route is assigned to this order?', 'Has payment been received?', 'Can this load travel through a specific state at night?'" },
      { label: "Intelligence", text: "The assistant combines order data with transportation regulations, legal documents, and compliance resources to provide context-aware answers — not just data lookups." },
    ],
    image: "/case-studies/freelancing/fl-ai-assistant.png",
    imageAlt: "Order information AI assistant chat interface",
    imageCaption: "The Heavy Haul AI assistant — users enter an order token and ask questions naturally.",
    imageSize: "small",
  },
  {
    num: "05",
    title: "Enterprise Voice Recording Platform",
    category: "Knowledge Capture",
    accent: "black",
    narrative: "Voice comms are the primary communication channel in this organization. Dispatchers, permit specialists, and operational teams collaborate there daily. But all that valuable knowledge — how to handle edge cases, which states have tricky rules, how experienced employees solve problems — was just disappearing after conversations ended.",
    approach: "I built a custom recording platform from scratch that captures voice conversations, transcribes them, and stores them for future use.",
    details: [
      { label: "Smart Recording", text: "Records only when users are actively speaking, minimizing unnecessary storage consumption." },
      { label: "Multilingual", text: "Supports Spanish and multiple other languages — critical for this workforce." },
      { label: "Storage", text: "Automatically generates transcripts and stores them in organized shared drives." },
    ],
    challenge: "API rate limits can restrict recording bots. I solved this by designing a multi-bot architecture with 10 coordinated recording bots, enabling simultaneous recording across multiple channels.",
    image: "/case-studies/freelancing/fl-recording-platform.png",
    imageAlt: "Voice recording platform dashboard",
    imageCaption: "The recording platform dashboard for monitoring active voice captures and transcripts.",
    imageSize: "small",
  },
  {
    num: "06",
    title: "Transcript Processing Pipeline",
    category: "NLP Engineering",
    accent: "cream",
    narrative: "Raw voice transcripts are messy. People interrupt each other, go off-topic, use slang, switch between languages. To make this data useful for AI systems, I needed a serious cleanup pipeline.",
    approach: "I designed a multi-stage processing pipeline that transforms noisy conversations into structured, AI-consumable knowledge.",
    details: [
      { label: "Processing", text: "Uses spaCy English and Spanish models for language-aware text processing — removing noise, normalizing formatting, organizing into structured chunks." },
      { label: "Scale", text: "I specifically selected batch APIs for large-scale processing because it reduces operational costs significantly compared to standard API usage." },
      { label: "Output", text: "The final output is transformed into a question-answering format that downstream AI systems can consume directly." },
    ],
  },
  {
    num: "07",
    title: "RAG Knowledge System",
    category: "Knowledge Platform",
    accent: "orange",
    narrative: "All this captured and cleaned knowledge needed to be searchable. When a new employee has a question about a specific state's regulations, they shouldn't have to wait for a senior colleague — they should be able to ask the system.",
    approach: "I built a Retrieval-Augmented Generation (RAG) platform that makes the processed knowledge base searchable and accessible to the entire organization.",
    details: [
      { label: "Technical Stack", text: "Knowledge indexing, retrieval optimization, reranking implementation, BM25 experimentation and evaluation, and search quality testing." },
      { label: "Goal", text: "Preserve the expertise of experienced employees and make it instantly available — turning tribal knowledge into institutional knowledge." },
    ],
  },
  {
    num: "08",
    title: "AI Employee Interview & Training System",
    category: "Learning System",
    accent: "black",
    narrative: "In the permitting industry, even small operational mistakes can result in significant financial penalties. The company needed a way to learn from errors systematically — not just blame people, but actually understand why mistakes happen and prevent them from recurring.",
    approach: "I developed an AI-powered system that conducts automated post-incident investigations and transforms findings into training material.",
    details: [
      { label: "Investigation", text: "When an employee makes an error, the system receives details about the mistake, conducts an AI-driven interview asking contextual questions, and collects explanations." },
      { label: "Output", text: "Generates a structured summary, then transforms findings into training videos, knowledge-sharing content, and interactive quizzes." },
    ],
  },
  {
    num: "09",
    title: "AI Email Reply Drafting Assistant",
    category: "Productivity Tool",
    accent: "cream",
    narrative: "Customer support teams were spending significant time crafting responses to similar questions over and over. Each reply required context from previous interactions — which meant searching through email history before even starting to write.",
    approach: "I built an AI-powered drafting assistant that generates contextual email replies by analyzing conversation history.",
    details: [
      { label: "Workflow", text: "Receives incoming email → searches prior interactions → retrieves last 10 relevant threads → cleans signatures → generates contextual draft." },
      { label: "Human Oversight", text: "The system never sends emails automatically. It creates drafts that employees review before sending — AI augmentation, not replacement." },
    ],
  },
  {
    num: "10",
    title: "Route Auto-Approval Enhancement",
    category: "Automation",
    accent: "orange",
    narrative: "Every transport route needed manual approval — even routes that had been successfully used dozens of times before. I built improvements to reduce this unnecessary workload.",
    approach: "Enhanced the existing route approval system to recognize historical patterns and auto-approve proven routes.",
    details: [
      { label: "Logic", text: "The system checks if the same origin-destination combination has been used previously. If a match exists, historical route information and maps are reused." },
      { label: "Auto-Approval", text: "Routes that have been successfully used multiple times can be automatically approved, with human review always available for edge cases." },
    ],
  },
  {
    num: "11",
    title: "Estimator Agent Improvements",
    category: "AI Enhancement",
    accent: "black",
    narrative: "The company had an AI-powered Estimator Agent that helps users understand transportation costs and regulations. I optimized its accuracy.",
    approach: "Focused on improving system accuracy, usability, and overall performance of the estimator tool.",
    details: [
      { label: "Features", text: "Users enter load dimensions and receive cost estimates, ask about regulations and permits, understand route-specific restrictions, and learn about transportation laws." },
    ],
  },
  {
    num: "12",
    title: "Frontend Development & Customer Portals",
    category: "Full-Stack",
    accent: "cream",
    narrative: "Beyond backend and AI systems, the company needed polished customer-facing interfaces. I designed and built several frontend experiences from scratch.",
    approach: "Created marketing pages, registration portals, customer onboarding flows, and workflow-related user interfaces.",
    details: [
      { label: "Scope", text: "Marketing pages, registration portals with reCAPTCHA, customer onboarding pages, and workflow-related UI — all designed to feel professional and trustworthy." },
    ],
    image: "/case-studies/freelancing/fl-customer-portal.png",
    imageAlt: "Customer registration page",
    imageCaption: "A high-end customer registration and onboarding portal with integrated security checks.",
  },
];

const techStack = [
  { category: "Backend & APIs", items: ["Python", "Flask", "MongoDB", "REST APIs", "Gunicorn"] },
  { category: "AI & NLP", items: ["Google Gemini", "Groq LLMs", "LangGraph", "spaCy", "RAG", "BM25"] },
  { category: "Real-Time & Voice", items: ["WebSockets", "Deepgram", "LiveKit", "Node.js"] },
  { category: "Infrastructure", items: ["Docker", "PM2", "SMTP", "Google Drive API", "Cloud Deployments"] },
];

/* ─── helper components ─── */

function SectionNumber({ num }) {
  return (
    <span className="cs-section-num">{num}</span>
  );
}

function ProjectImage({ src, alt, caption, size }) {
  return (
    <figure className={`cs-figure ${size === "small" ? "cs-figure--small" : ""}`}>
      <div className="cs-figure-frame">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={750}
          quality={90}
          className="cs-figure-img"
        />
      </div>
      {caption && <figcaption className="cs-figcaption">{caption}</figcaption>}
    </figure>
  );
}

function ProjectImagePair({ images }) {
  return (
    <div className="cs-figure-pair">
      {images.map((img) => (
        <figure key={img.src} className="cs-figure cs-figure--paired">
          <div className="cs-figure-frame">
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={500}
              quality={90}
              className="cs-figure-img"
            />
          </div>
          {img.caption && <figcaption className="cs-figcaption">{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

/* ─── main page ─── */

export default async function FreelanceCaseStudy() {
  const portfolio = await getPublicPortfolio().catch(() => null);
  const name = portfolio?.personalInfo?.fullName || "Imad Khan";
  const whatsappPhone = "919125197678";
  const emailAddress = "aiwithimad@gmail.com";
  
  const whatsappMsg = encodeURIComponent("Hi Imad, I came from your freelancing portfolio. I'd like to discuss AI automation for my heavy-haul company.");
  const emailSubject = encodeURIComponent("AI Automation Inquiry from Your Portfolio");
  const emailBody = encodeURIComponent("Hi Imad,\n\nI came from your website and I'm interested in your AI services for my heavy-haul permit company.\n\nHere's what I need help with:\n\n");

  return (
    <div className="cs-page">
      <WhatsAppFab domainLabel="freelancing work" />
      
      {/* ── Minimal header ── */}
      <header className="cs-header">
        <Link href="/" className="cs-header-home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span>{name}</span>
        </Link>
        <span className="cs-header-label">Freelance Portfolio</span>
      </header>

      <main>
        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section className="cs-hero">
          <div className="cs-hero-inner">
            <div className="cs-hero-overline">
              <span className="cs-hero-dot" />
              Freelance AI Engineer · Heavy-Haul Permits · 12+ Production Systems
            </div>
            <h1 className="cs-hero-title">
              I build <span className="cs-hero-title-em">AI systems</span> that eliminate manual work for heavy-haul permit companies.
            </h1>
            <p className="cs-hero-subtitle">
              From multi-agent email automation to enterprise knowledge platforms — I've transformed manual logistics operations into intelligent, scalable systems. I know the permits industry, and I know how to automate it.
            </p>
            <div className="cs-hero-meta">
              <div className="cs-hero-meta-item">
                <span className="cs-hero-meta-label">Role</span>
                <span className="cs-hero-meta-value">Freelance AI Engineer</span>
              </div>
              <div className="cs-hero-meta-divider" />
              <div className="cs-hero-meta-item">
                <span className="cs-hero-meta-label">Domain</span>
                <span className="cs-hero-meta-value">Heavy-Haul Permits</span>
              </div>
              <div className="cs-hero-meta-divider" />
              <div className="cs-hero-meta-item">
                <span className="cs-hero-meta-label">Systems Delivered</span>
                <span className="cs-hero-meta-value">12+ Production Apps</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12 animate-fade-up" style={{ animationDelay: '0.45s' }}>
              <a href="#work" className="cs-btn-primary" style={{ background: 'var(--cs-fg)' }}>
                See the systems I built
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#contact" className="px-6 py-3 rounded-full border border-gray-300 hover:border-gray-500 transition-colors text-sm font-semibold text-gray-800">
                Let's talk →
              </a>
            </div>
          </div>
          <div className="cs-hero-scroll-hint">
            <span>Scroll to read</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </div>
        </section>

        {/* ═══════════════════════ INDUSTRY CONTEXT ═══════════════════════ */}
        <section className="cs-section cs-section--intro">
          <div className="cs-container">
            <div className="cs-intro-grid">
              <div className="cs-intro-badge-col">
                <span className="cs-badge">{chapterIntro.badge}</span>
              </div>
              <div className="cs-intro-content">
                <h2 className="cs-intro-title">{chapterIntro.title}</h2>
                {chapterIntro.body.map((para, i) => (
                  <p key={i} className={`cs-body ${i === chapterIntro.body.length - 1 ? "cs-body--emphasis" : ""}`}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ IMPACT BANNER ═══════════════════════ */}
        <section className="cs-impact-banner">
          <div className="cs-container">
            <div className="cs-impact-grid">
              {[
                { value: "85%", label: "Time Saved on Intake" },
                { value: "120k+", label: "Est. Annual ROI ($)" },
                { value: "12+", label: "Systems Delivered" },
                { value: "<2min", label: "Email Processing Time" },
              ].map((stat) => (
                <div key={stat.label} className="cs-impact-stat">
                  <span className="cs-impact-value">{stat.value}</span>
                  <span className="cs-impact-label">{stat.label}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-white font-playfair text-2xl font-semibold mb-2">Want to take the next step?</h3>
                <p className="text-white/70 text-sm max-w-md">Let's discuss how we can build similar AI solutions to automate your operations and save your team hundreds of hours.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <a 
                  href={`https://wa.me/${whatsappPhone}?text=${whatsappMsg}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cs-contact-btn-whatsapp text-sm py-2 px-6"
                >
                  <svg viewBox="0 0 32 32" className="h-4 w-4 mr-2" aria-hidden="true"><path fill="currentColor" d="M19.11 17.21c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.91-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.86-2.05-.23-.55-.46-.48-.62-.49l-.53-.01a1.02 1.02 0 0 0-.74.34c-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32Zm-4.95 6.76h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.21-3.67.96.98-3.58-.23-.37a9.69 9.69 0 0 1-1.49-5.18C4.45 8.86 8.85 4.46 14.17 4.46a9.6 9.6 0 0 1 6.84 2.84 9.6 9.6 0 0 1 2.83 6.85c0 5.32-4.4 9.72-9.68 9.72Zm8.25-17.97A11.55 11.55 0 0 0 14.17 2.5C7.76 2.5 2.49 7.77 2.49 14.18c0 2.05.54 4.05 1.55 5.81L2.4 26.5l6.66-1.74a11.66 11.66 0 0 0 5.11 1.3h.01c6.41 0 11.68-5.27 11.68-11.68a11.62 11.62 0 0 0-3.45-8.38Z"/></svg>
                  WhatsApp
                </a>
                <a 
                  href={`mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`}
                  className="cs-contact-btn-email text-sm py-2 px-6"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ PROJECTS ═══════════════════════ */}
        <section className="cs-section" id="work">
          <div className="cs-container">
            <div className="cs-chapter-header">
              <span className="cs-badge">The Work</span>
              <h2 className="cs-chapter-title">Systems I've Built.</h2>
              <p className="cs-chapter-sub">
                Each project below addressed a real operational pain point in the heavy-haul industry. These are the kinds of systems I can build for your company.
              </p>
            </div>
            
            <div className="mb-24 animate-fade-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-[var(--cs-border)] flex-grow"></div>
                <h3 className="font-playfair text-xl font-medium tracking-tight text-[var(--cs-fg)] uppercase tracking-widest text-xs">Summary of Systems</h3>
                <div className="h-px bg-[var(--cs-border)] flex-grow"></div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[var(--cs-border)] shadow-sm bg-[var(--cs-bg)]">
                <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal border-collapse">
                  <thead>
                    <tr className="bg-[var(--cs-fg)] text-[var(--cs-bg)]">
                      <th className="px-6 py-4 font-semibold tracking-wide border-b border-white/10 w-1/4">Name of Solution</th>
                      <th className="px-6 py-4 font-semibold tracking-wide border-b border-white/10 border-l border-white/10 w-1/3">The Problem</th>
                      <th className="px-6 py-4 font-semibold tracking-wide border-b border-white/10 border-l border-white/10">Solution I Built</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--cs-border)] text-[var(--cs-fg)]/80">
                    {systemSummary.map((sys, idx) => (
                      <tr key={idx} className="hover:bg-black/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-[var(--cs-fg)] border-r border-[var(--cs-border)]">{sys.name}</td>
                        <td className="px-6 py-4 border-r border-[var(--cs-border)] text-[var(--cs-fg)]/70">{sys.problem}</td>
                        <td className="px-6 py-4">{sys.solution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {projects.map((project, idx) => (
            <article
              key={project.num}
              className={`cs-project cs-project--${project.accent}`}
              id={`project-${project.num}`}
            >
              <div className="cs-container">
                {/* ── Project header with accent line ── */}
                <div className="cs-project-header">
                  <div className="cs-project-header-inner">
                    <div className="cs-project-num-block">
                      <span className="cs-project-num-line" />
                      <SectionNumber num={project.num} />
                      <span className="cs-project-num-line" />
                    </div>
                    <div className="cs-project-meta">
                      <span className="cs-project-category">{project.category}</span>
                      <h3 className="cs-project-title">{project.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="cs-project-body">
                  {/* ── Narrative column ── */}
                  <div className="cs-project-narrative">
                    <p className="cs-body cs-body--lead">{project.narrative}</p>

                    {/* Approach — editorial pullquote style */}
                    {project.approach && (
                      <div className="cs-approach-v2">
                        <div className="cs-approach-v2-accent" />
                        <div className="cs-approach-v2-content">
                          <span className="cs-label-tag">My Approach</span>
                          <p className="cs-approach-v2-text">{project.approach}</p>
                        </div>
                      </div>
                    )}

                    {/* Details — connected timeline */}
                    {project.details && (
                      <div className="cs-timeline">
                        <div className="cs-timeline-line" />
                        {project.details.map((d, i) => (
                          <div key={d.label} className="cs-timeline-item">
                            <div className="cs-timeline-marker">
                              <span className="cs-timeline-dot" />
                            </div>
                            <div className="cs-timeline-content">
                              <span className="cs-timeline-label">{d.label}</span>
                              <p className="cs-timeline-text">{d.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technical — terminal-inspired block */}
                    {project.technical && (
                      <div className="cs-terminal">
                        <div className="cs-terminal-bar">
                          <span className="cs-terminal-dot cs-terminal-dot--red" />
                          <span className="cs-terminal-dot cs-terminal-dot--yellow" />
                          <span className="cs-terminal-dot cs-terminal-dot--green" />
                          <span className="cs-terminal-title">Technical Detail</span>
                        </div>
                        <div className="cs-terminal-body">
                          <span className="cs-terminal-prompt">$</span>
                          <p className="cs-terminal-text">{project.technical}</p>
                        </div>
                      </div>
                    )}

                    {/* Challenge — dramatic editorial callout */}
                    {project.challenge && (
                      <div className="cs-callout">
                        <div className="cs-callout-glow" />
                        <div className="cs-callout-inner">
                          <div className="cs-callout-icon-wrap">
                            <span className="cs-callout-icon">⚡</span>
                          </div>
                          <div className="cs-callout-body">
                           <span className="cs-label-tag cs-label-tag--warm">Key Challenge</span>
                            <p className="cs-callout-text">{project.challenge}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Visual column ── */}
                  {project.image && (
                    <div className="cs-project-visual">
                      <ProjectImage
                        src={project.image}
                        alt={project.imageAlt}
                        caption={project.imageCaption}
                        size={project.imageSize}
                      />
                    </div>
                  )}

                  {project.imagePair && (
                    <div className="cs-project-visual cs-project-visual--full">
                      <ProjectImagePair images={project.imagePair} />
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ═══════════════════════ TECH STACK ═══════════════════════ */}
        <section className="cs-section cs-section--stack" id="stack">
          <div className="cs-container">
            <div className="cs-chapter-header">
              <span className="cs-badge">Tech Stack</span>
              <h2 className="cs-chapter-title">The tools I use to build these systems.</h2>
            </div>
            <div className="cs-stack-grid">
              {techStack.map((group) => (
                <div key={group.category} className="cs-stack-group">
                  <h4 className="cs-stack-category">{group.category}</h4>
                  <div className="cs-stack-items">
                    {group.items.map((item) => (
                      <span key={item} className="cs-stack-chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ IMPACT SECTION ═══════════════════════ */}
        <section className="cs-section cs-section--reflection" id="impact">
          <div className="cs-container">
            <div className="cs-chapter-header">
              <span className="cs-badge">The Results</span>
              <h2 className="cs-chapter-title">What changes when these systems go live.</h2>
            </div>
            <div className="cs-reflection-grid">
              <div className="cs-reflection-col">
                <h4 className="cs-reflection-heading">Operational Improvements</h4>
                <ul className="cs-reflection-list">
                  <li>Manual order lookup becomes faster through conversational AI support agents.</li>
                  <li>Document-heavy intake becomes more consistent through vision-based extraction.</li>
                  <li>Email-heavy front desk work becomes trackable through an agent-assisted dashboard.</li>
                  <li>External partners gain a structured API path for order submission and tracking.</li>
                  <li>Security is elevated through proper API keys, OTP, CAPTCHA, and rate limiting.</li>
                  <li>Organizational knowledge is preserved and made searchable for the entire team.</li>
                </ul>
              </div>
              <div className="cs-reflection-col">
                <h4 className="cs-reflection-heading">My Commitment</h4>
                <ul className="cs-reflection-list">
                  <li>I build production AI systems, not just prototypes — with proper error handling, logging, and deployment.</li>
                  <li>I design multi-agent architectures only when they actually help, avoiding unnecessary complexity.</li>
                  <li>I focus on shipping features that real operations teams can depend on every single day.</li>
                  <li>I communicate technical solutions clearly to non-technical stakeholders.</li>
                  <li>I build full-stack applications end-to-end — from database design to polished frontend interfaces.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ CONTACT CTA ═══════════════════════ */}
        <section className="cs-contact-section" id="contact">
          <div className="cs-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to automate your permit operations?</h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                I've built 12+ AI systems for a heavy-haul company just like yours. Let's discuss what I can build for you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href={`https://wa.me/${whatsappPhone}?text=${whatsappMsg}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cs-contact-btn-whatsapp w-full sm:w-auto"
                >
                  <svg viewBox="0 0 32 32" className="h-6 w-6 mr-2" aria-hidden="true"><path fill="currentColor" d="M19.11 17.21c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.91-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.86-2.05-.23-.55-.46-.48-.62-.49l-.53-.01a1.02 1.02 0 0 0-.74.34c-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32Zm-4.95 6.76h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.21-3.67.96.98-3.58-.23-.37a9.69 9.69 0 0 1-1.49-5.18C4.45 8.86 8.85 4.46 14.17 4.46a9.6 9.6 0 0 1 6.84 2.84 9.6 9.6 0 0 1 2.83 6.85c0 5.32-4.4 9.72-9.68 9.72Zm8.25-17.97A11.55 11.55 0 0 0 14.17 2.5C7.76 2.5 2.49 7.77 2.49 14.18c0 2.05.54 4.05 1.55 5.81L2.4 26.5l6.66-1.74a11.66 11.66 0 0 0 5.11 1.3h.01c6.41 0 11.68-5.27 11.68-11.68a11.62 11.62 0 0 0-3.45-8.38Z"/></svg>
                  Message me on WhatsApp
                </a>
                
                <span className="cs-contact-divider text-white/40 font-medium">OR</span>
                
                <a 
                  href={`mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`}
                  className="cs-contact-btn-email w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Send me an Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ CLOSING ═══════════════════════ */}
        <section className="cs-closing">
          <div className="cs-container">
            <div className="cs-closing-content">
              <p className="cs-closing-quote">
                "The best AI systems aren't impressive demos — they're the ones that fit naturally into how your team already works."
              </p>
              <div className="cs-closing-cta mt-8">
                <Link href="/" className="cs-btn-primary">
                  View My Full Portfolio
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
              <p className="cs-closing-name mt-8 text-lg">— {name}, Freelance AI Engineer</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
