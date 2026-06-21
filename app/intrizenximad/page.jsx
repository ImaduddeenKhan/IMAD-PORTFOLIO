import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Linkedin,
  Sparkles,
  Users,
  Brain,
  BarChart3,
  FileSearch,
  Bot,
  ShieldCheck,
  Zap,
  Target,
} from "lucide-react";
import styles from "./IntrizenPage.module.css";

export const metadata = {
  title: "Intrizen × Imad — AI for Human-Centered HR Transformation",
  description:
    "How applied AI can strengthen SuccessFactors implementations, improve employee experiences, and give Intrizen's clients measurable operational leverage.",
};

/* ── Data ── */

const stats = [
  { value: "1.5M+", label: "daily users across client systems" },
  { value: "$2.9B", label: "annual payroll processed" },
  { value: "100M+", label: "daily HR transactions" },
];

const opportunities = [
  {
    icon: FileSearch,
    title: "Intelligent Configuration Validation",
    body: `Every SuccessFactors rollout carries configuration debt. Business rules defined during design workshops get interpreted, re-interpreted, and eventually implemented across dozens of XML templates and permission role matrices. The gap between what was agreed in the conference room and what actually runs in production is where most post-go-live tickets originate.`,
    note: `I'd build a validation layer that reads your configuration exports and compares them against the design specification — flagging discrepancies, orphaned rules, and permission conflicts before they reach UAT. Not a general-purpose AI tool, but a purpose-built agent that understands SuccessFactors config structure.`,
  },
  {
    icon: Users,
    title: "Employee Experience Analysis at Scale",
    body: `Intrizen's work with American Airlines showed what happens when you get the employee experience right: application times dropped from 45 minutes to 10 minutes, and candidate volume grew 250%. But measuring experience quality across a full SuccessFactors suite — Recruiting, Onboarding, Performance, Learning, Compensation — typically requires survey data and a lot of manual correlation.`,
    note: `Natural language analysis of employee feedback, help desk tickets, and task abandonment patterns can surface exactly where the friction lives — which module, which step, which user population. This turns "employees are frustrated" into "new hires in APAC abandon onboarding at the direct deposit step because the form doesn't pre-populate bank codes."`,
  },
  {
    icon: Brain,
    title: "Knowledge Continuity for Long-Running Programs",
    body: `A multi-phased SuccessFactors transformation can span two or three years. People rotate. Consultants transition. The decisions made in Phase 1 — why a particular compensation rule was designed a certain way, why a specific integration pattern was chosen over the SAP standard — live in people's heads, in Confluence pages nobody reads, or in email threads that get archived.`,
    note: `A structured knowledge layer can capture decisions, rationale, and trade-offs as the program runs — making them searchable and traceable for future phases. When someone in Phase 3 asks "why does the German payroll integration work this way?", the answer comes from the actual decision record, not from someone's memory.`,
  },
  {
    icon: BarChart3,
    title: "Predictive Workforce Analytics for Client Advisory",
    body: `Intrizen positions itself as a trusted advisor that anticipates future needs. The 1.5 million daily users across client systems generate patterns that can inform advisory conversations: which departments are seeing unusual attrition signals, where compensation structures are falling behind market benchmarks, which learning programs correlate with internal mobility.`,
    note: `The value isn't in building dashboards — it's in building the analytical models that surface insights advisors can bring to quarterly business reviews. This turns managed services from reactive support into proactive strategy.`,
  },
];

const deepDive = [
  {
    icon: Bot,
    title: "Consultant-Facing Assistants That Know the Client",
    body: `The operational knowledge of a SuccessFactors consultant is enormous — module-specific configurations, client-specific business rules, SAP release notes, patch histories, integration quirks. An assistant trained on the project's actual documentation, configuration, and decision history can reduce the time consultants spend searching for context by orders of magnitude.`,
    note: `This isn't a generic chatbot bolted onto SharePoint. It's a retrieval system grounded in the project's real artifacts — design documents, configuration workbooks, test scripts, and meeting notes — with citations back to the source material.`,
  },
  {
    icon: ShieldCheck,
    title: "Compliance Drift Detection",
    body: `Regulated industries require that HR systems behave consistently with documented policies. But SuccessFactors configurations evolve — someone changes a workflow rule here, adjusts a permission role there — and over time the system drifts from its compliance baseline. Annual audits catch this, but by then the remediation is expensive and disruptive.`,
    note: `Continuous monitoring that compares the live configuration against the compliance baseline and flags material deviations as they happen — not once a year. For clients in aviation, insurance, and financial services, this alone can justify the investment.`,
  },
];

const approach = [
  {
    number: "01",
    title: "Identify the real constraint",
    body: "Every AI opportunity starts with a genuine operational problem. I don't propose solutions looking for problems — I start with the workflow that's actually costing time, creating risk, or limiting advisory value.",
  },
  {
    number: "02",
    title: "Build a working proof of concept",
    body: "Not a slide deck. A functional prototype that works against real data structures, demonstrates measurable improvement, and gives the team something concrete to evaluate in days, not months.",
  },
  {
    number: "03",
    title: "Design for the existing stack",
    body: "Intrizen's clients run on SAP. Solutions need to integrate cleanly with SuccessFactors APIs, BTP services, and existing data governance. I build within the ecosystem, not beside it.",
  },
];

export default function IntrizenPage() {
  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />

        <nav className={styles.nav}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft aria-hidden="true" size={16} />
            <span>Imad Khan</span>
          </Link>
          <span className={styles.navBadge}>Intrizen × Imad</span>
        </nav>

        <div className={styles.heroInner}>
          <div className={styles.heroLabel}>
            <Sparkles aria-hidden="true" size={14} />
            Prepared for Jonathan Haberkorn &amp; the Intrizen team
          </div>

          <h1>
            AI that makes <span>SuccessFactors transformations</span> measurably
            better.
          </h1>

          <p className={styles.heroSub}>
            Intrizen already delivers exceptional HR technology transformations
            for the world's largest organizations. This page explores where
            applied AI — built by someone who understands both the technology and
            the domain — can amplify that work and create new value for your
            clients.
          </p>

          <div className={styles.heroActions}>
            <a href="#opportunities" className={styles.btnPrimary}>
              See the opportunities
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a href="#approach" className={styles.btnSecondary}>
              How I work
            </a>
          </div>
        </div>

        <div className={styles.statBar} aria-label="Intrizen platform metrics">
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Context ── */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.sectionInner}>
          <span className={styles.eyebrow}>Why this matters now</span>
          <h2>Every SuccessFactors implementation creates AI surface area.</h2>

          <div className={styles.contextGrid}>
            <aside className={styles.contextAside}>
              <p>
                The question isn't whether AI belongs in HR technology. The
                question is where it creates genuine leverage — and where it's
                just noise.
              </p>
            </aside>

            <div className={styles.prose}>
              <p>
                When Intrizen deploys SuccessFactors for a Fortune 500 client,
                the implementation touches every dimension of the employee
                lifecycle — recruiting, onboarding, performance, compensation,
                learning, succession, and payroll. Each of these modules generates
                configuration complexity, integration requirements, change
                management overhead, and post-go-live support demand.
              </p>
              <p>
                The teams doing this work are exceptional. But they're operating
                under real constraints: project timelines that don't flex,
                clients who expect faster delivery every year, consultant
                expertise that's difficult to scale, and a growing mandate from
                every client to "do something with AI" without clear direction on
                what that should be.
              </p>
              <p>
                The opportunity isn't to replace any of the human expertise that
                makes Intrizen's work effective. It's to build focused tools that
                make that expertise go further — reduce the repetitive work, catch
                problems earlier, preserve institutional knowledge, and give
                advisors better data for the conversations that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Opportunities ── */}
      <section
        className={`${styles.section} ${styles.sectionLight}`}
        id="opportunities"
      >
        <div className={styles.sectionInner}>
          <span className={styles.eyebrow}>
            Where AI creates real value
          </span>
          <h2>Four opportunities grounded in how Intrizen actually works.</h2>
          <p className={styles.sectionLead}>
            These aren't theoretical AI applications. Each one maps to a real
            operational challenge in large-scale SuccessFactors programs — the
            kind of work Intrizen does every day.
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
                  <p>{item.body}</p>
                  <div className={styles.cardNote}>
                    <strong>What I'd build</strong>
                    <p>{item.note}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Deep dive ── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionInner}>
          <span className={styles.eyebrowLight}>Going deeper</span>
          <h2>
            Two more ideas that could change how your consultants work.
          </h2>
          <p className={styles.sectionLead}>
            These target the internal operations of a SuccessFactors consultancy
            — not just the client deliverables, but how the delivery team itself
            operates.
          </p>

          <div className={styles.cardGrid}>
            {deepDive.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={styles.card}>
                  <div className={styles.cardIcon}>
                    <Icon aria-hidden="true" size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className={styles.cardNote}>
                    <strong>What I'd build</strong>
                    <p>{item.note}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section
        className={`${styles.section} ${styles.sectionWhite}`}
        id="approach"
      >
        <div className={styles.sectionInner}>
          <span className={styles.eyebrow}>How I work</span>
          <h2>Start with the problem. Ship something real. Iterate.</h2>
          <p className={styles.sectionLead}>
            I've built production AI systems for transportation companies,
            automated document intelligence pipelines, and shipped RAG-powered
            knowledge assistants. Here's how I approach new work.
          </p>

          <div className={styles.stepGrid}>
            {approach.map((step) => (
              <article key={step.number} className={styles.step}>
                <span className={styles.stepNum}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div>
            <span className={styles.eyebrowLight}>Let's talk</span>
            <h2>
              I'd love to explore what applied AI looks like inside Intrizen's
              practice.
            </h2>
            <p>
              The best conversations start with a real problem. If any of these
              ideas resonated — or if there's a workflow challenge I haven't
              mentioned — I'd welcome the chance to dig in and show what I can
              build.
            </p>
            <div className={styles.ctaTags}>
              <span>
                <Zap aria-hidden="true" size={14} />
                SuccessFactors AI
              </span>
              <span>
                <Target aria-hidden="true" size={14} />
                Production-ready systems
              </span>
              <span>
                <ShieldCheck aria-hidden="true" size={14} />
                Enterprise-grade
              </span>
            </div>
          </div>

          <div className={styles.ctaCard}>
            <h3>Imaduddeen Khan</h3>
            <p>
              AI Engineer — Building production AI systems, RAG pipelines, and
              intelligent agents for enterprise workflows.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="mailto:aiwithimad@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <Mail aria-hidden="true" size={16} />
                imaduddeen.work@gmail.com
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
            href="https://intrizen.com"
            target="_blank"
            rel="noreferrer"
          >
            Intrizen
          </a>{" "}
          · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
