import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Linkedin,
  Sparkles,
  FileSpreadsheet,
  Network,
  Tag,
  BookOpen,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
} from "lucide-react";
import styles from "./TracxnPage.module.css";

export const metadata = {
  title: "Tracxn × Imad — AI Strategic Roadmap for Private Market Intelligence",
  description:
    "A strategic engineering roadmap exploring where custom AI agent architectures can optimize Tracxn's data ingestion pipelines, scale taxonomy mapping, and unlock new subscriber value.",
};

const stats = [
  { value: "7.1M+", label: "companies tracked globally" },
  { value: "291K+", label: "investors in the network" },
  { value: "1.6M+", label: "funding rounds documented" },
  { value: "50+", label: "countries covered" },
];

const opportunities = [
  {
    icon: FileSpreadsheet,
    title: "Multi-Modal Cap Table & Financial Statement Ingestion",
    problem: "Private company filings, pitch decks, and investor reports arrive in highly unstructured formats—non-searchable PDFs, cell-merged Excel files, and low-res document scans. Analysts spend hours manually transcribing capitalization tables and balance sheets, and simple OCR tools consistently fail on complex tabular structures.",
    solution: "A Human-in-the-Loop Vision-Language Agent. Deploy a specialized multimodal parser fine-tuned on corporate financial layout structures. The agent parses tables, extracts equity round distributions, validates internal mathematical consistency (e.g., share totals mapping back to the cap table), and highlights discrepancy flags in a side-by-side verification interface. Analysts review and approve the structured JSON output with a single click.",
    impact: "Reduces data ingestion cycle times by 80% while creating a robust, verifiable audit trail that flags mathematical errors directly at source."
  },
  {
    icon: Network,
    title: "Graph-Based Cross-Border Entity Resolution",
    problem: "Startups register across multiple jurisdictions and operate under different names. A company might incorporate as a German GmbH, register a Delaware holding company, and announce funding under a consumer-facing brand name. Identifying these duplicates and mapping their financial relationships manually is slow, leading to fragmented database records.",
    solution: "A Neural Entity Disambiguation Engine. This engine automatically clusters news items, corporate registry feeds, and funding announcements. By constructing a graph representation of founders, co-founders, early investors, and postal addresses, the system runs contrastive entity-resolution models to calculate merge probabilities. It maps these entities into a single, unified global corporate tree.",
    impact: "Prevents duplicate profiles, maps corporate families across border changes automatically, and ensures high-fidelity historical transaction data."
  },
  {
    icon: Tag,
    title: "Self-Expanding Taxonomy via Semantic Clustering",
    problem: "The rapid pace of tech innovation makes manual taxonomy curation a constant race. When new sectors emerge (e.g., DePIN, GPU Orchestration, AI agents), analysts must notice the pattern, define the sector boundaries, and scan thousands of profiles to add tags. Clients looking for early-stage signals often find out-of-date sector categorizations.",
    solution: "Semi-Supervised Semantic Drift Detection. An AI agent continuously analyzes startup landing pages, product descriptions, and press releases. It identifies clusters of emerging technical keywords that fail to map to the existing 55,000+ business sub-models. The system proposes new taxonomy nodes with draft definitions and tags candidate companies, exposing these recommendations to sector leads via an automated curation pipeline.",
    impact: "Keeps Tracxn's Market Taxonomy ahead of the curve, creating new sector maps in days rather than months, and enabling first-mover research publishing."
  },
  {
    icon: BookOpen,
    title: "Sub-Model Grounded Due Diligence Memo Generator",
    problem: "Tracxn subscribers (VCs, PE funds, and CorpDev teams) spend a significant amount of time exporting data to build internal investment briefs, competitive landscapes, and sector profiles. They use Tracxn to source data, but must leave the platform to synthesize it into actionable intelligence.",
    solution: "An On-Platform Grounded Synthesis Agent. Integrate an LLM-powered drafting assistant for premium subscribers. Users can input a research prompt (e.g., 'Draft a 3-page brief on seed-stage AI safety tools in Europe with IIT cofounders'). The assistant runs targeted queries against the Tracxn database, extracts structured metrics, and generates a fully cited, formal PDF memo. Every metric cited maps directly to a clickable Tracxn company profile to prevent hallucinations.",
    impact: "Significantly increases subscriber session duration and platform stickiness, shifting Tracxn from a raw database to a core productivity tool."
  }
];

const designPrinciples = [
  {
    icon: Database,
    title: "Database Grounding",
    body: "AI models must not operate in isolation. In private markets, accuracy is everything. All generative systems must be strictly grounded in Tracxn's structured master DB, with direct citations and verification links for every output."
  },
  {
    icon: Layers,
    title: "Analyst-in-the-Loop Loop",
    body: "We do not aim for fully autonomous data entry. The goal is to design workflows where AI proposes structured drafts and runs mathematical audits, while human analysts retain the final decision-making power."
  },
  {
    icon: Cpu,
    title: "Cost & Token Efficiency",
    body: "Processing millions of domains requires smart model routing. We route simple classification tasks to lighter models, utilizing state-of-the-art frontier models only for high-value reasoning, such as cap table parsing."
  }
];

export default function TracxnPage() {
  return (
    <main className={styles.page}>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />

        <nav className={styles.nav}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft aria-hidden="true" size={16} />
            <span>Imad Khan</span>
          </Link>
          <span className={styles.navBadge}>Tracxn × Imad</span>
        </nav>

        <div className={styles.heroInner}>
          <div className={styles.heroLabel}>
            <Sparkles aria-hidden="true" size={14} />
            Prepared for Neeraj Chopra &amp; the Tracxn Engineering Team
          </div>

          <h1>
            AI architectures designed to scale <span>private market intelligence</span>.
          </h1>

          <p className={styles.heroSub}>
            Tracxn is the benchmark platform for private market data. This page outlines a highly practical technical roadmap where targeted AI integrations can optimize data pipelines, automate complex taxonomies, and enhance core workflows for your analysts and institutional clients.
          </p>

          <div className={styles.heroActions}>
            <a href="#opportunities" className={styles.btnPrimary}>
              View AI Opportunities
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a href="#architecture" className={styles.btnSecondary}>
              Engineering Approach
            </a>
          </div>
        </div>

        <div className={styles.statBar} aria-label="Tracxn platform metrics">
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Strategic Context ── */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.sectionInner}>
          <span className={styles.eyebrow}>The Opportunity Landscape</span>
          <h2>Human-in-the-loop automation at 10x scale.</h2>

          <div className={styles.contextGrid}>
            <aside className={styles.contextAside}>
              <p>
                In private markets, data quality is the ultimate competitive advantage. Pure scraping creates noise; pure manual analysis doesn't scale.
              </p>
            </aside>

            <div className={styles.prose}>
              <p>
                Tracxn’s core strength lies in its human-in-the-loop architecture. By combining automated web scanning across thousands of data feeds with specialized analyst teams, you achieve a level of data cleanliness that pure algorithms cannot match.
              </p>
              <p>
                However, manual review is also the primary constraint on horizontal growth. As the number of global companies grows, manual Cap Table transcription, sector taxonomy tagging, and entity deduplication create growing operational backlogs.
              </p>
              <p>
                The next frontier for Tracxn isn't replacing the analyst. Instead, it is building custom agentic layers that act as cognitive leverage. By automating the repetitive steps of ingestion, clustering, and draft creation, analysts transition from data entry specialists to high-velocity system curators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Opportunities ── */}
      <section
        className={`${styles.section} ${styles.sectionLight}`}
        id="opportunities"
      >
        <div className={styles.sectionInner}>
          <span className={styles.eyebrow}>Deep Dive Proposals</span>
          <h2>Four high-impact AI opportunities for Tracxn.</h2>
          <p className={styles.sectionLead}>
            These specific recommendations focus on high-friction workflows inside Tracxn's operational pipeline and user experience.
          </p>

          <div className={styles.cardGrid}>
            {opportunities.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={styles.card}>
                  <div className={styles.cardIcon}>
                    <Icon aria-hidden="true" size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p><strong>The Challenge:</strong> {item.problem}</p>
                  <div className={styles.cardNote}>
                    <strong>Proposed AI Solution</strong>
                    <p>{item.solution}</p>
                  </div>
                  <p style={{ marginTop: "1rem", fontSize: "0.92rem" }}>
                    <strong>CTO Impact:</strong> {item.impact}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Integration & Engineering Approach ── */}
      <section
        className={`${styles.section} ${styles.sectionDark}`}
        id="architecture"
      >
        <div className={styles.sectionInner}>
          <span className={styles.eyebrowOrange}>Architectural Guardrails</span>
          <h2>How we build: Grounded, secure, and cost-effective.</h2>
          <p className={styles.sectionLead}>
            Implementing AI in production databases containing millions of financial records requires strict engineering discipline. These are the principles I apply to enterprise pipelines.
          </p>

          <div className={styles.stepGrid}>
            {designPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title} className={styles.step}>
                  <div className={styles.stepNum} style={{ background: "var(--blue-curious)", marginBottom: "1rem" }}>
                    <Icon aria-hidden="true" size={16} style={{ color: "#fff" }} />
                  </div>
                  <h3 style={{ color: "var(--navy-bunting)" }}>{principle.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.94rem" }}>{principle.body}</p>
                </article>
              );
            })}
          </div>

          <div className={styles.contextGrid} style={{ marginTop: "4rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "3rem" }}>
            <aside className={styles.contextAside}>
              <p style={{ color: "#fff" }}>Deployment & Integration</p>
            </aside>
            <div className={styles.prose}>
              <p>
                These AI engines are designed to be deployed as stateless service microservices. They plug directly into Tracxn's existing ingestion queues (such as RabbitMQ or Kafka) and sit in front of the master databases.
              </p>
              <p>
                By building dedicated parser pipelines, we keep LLM API token usage to a minimum. We leverage structured output generation (using JSON schemas and instructor frameworks) to enforce type safety, and cache embedding mappings locally to prevent redundant compute costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call to Action / Pitch ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div>
            <span className={styles.eyebrow}>Let's build</span>
            <h2>Let's demonstrate this with a working prototype.</h2>
            <p>
              The best engineering discussions are grounded in working code, not slides. I am ready to build a functional proof-of-concept for any of these pipelines—such as a multimodal Cap Table parser or an automated semantic clustering pipeline—using real data structures to prove out the efficiency gains.
            </p>
            <div className={styles.ctaTags}>
              <span>
                <CheckCircle2 aria-hidden="true" size={14} style={{ color: "#4da6ff" }} />
                Vision-Language Parsers
              </span>
              <span>
                <CheckCircle2 aria-hidden="true" size={14} style={{ color: "#4da6ff" }} />
                Graph Entity Matching
              </span>
              <span>
                <CheckCircle2 aria-hidden="true" size={14} style={{ color: "#4da6ff" }} />
                Dynamic Taxonomy Clustering
              </span>
            </div>
          </div>

          <div className={styles.ctaCard}>
            <h3>Imaduddeen Khan</h3>
            <p>
              AI Systems Engineer — Specialized in developing high-throughput multi-modal ingestion pipelines, structured RAG architectures, and custom entity-resolution agents.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="mailto:aiwithimad@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <Mail aria-hidden="true" size={16} />
                aiwithimad@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/imadkhan-ai-ml"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin aria-hidden="true" size={16} />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <p>
          Prepared for{" "}
          <a
            href="https://tracxn.com"
            target="_blank"
            rel="noreferrer"
          >
            Tracxn Technologies
          </a>{" "}
          · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
