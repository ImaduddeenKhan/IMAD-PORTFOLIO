import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  ClipboardCheck,
  DatabaseZap,
  FileSearch,
  GitBranch,
  KeyRound,
  Layers3,
  Mail,
  MessageSquareText,
  Network,
  Route,
  Search,
  ShieldCheck,
  Truck,
  Workflow,
} from "lucide-react";
import styles from "./ArangoHeavyHaulPage.module.css";

export const metadata = {
  title: "Arango x Heavy Haul: Contextual AI for Oversize Transportation",
  description:
    "A blog-style draft showing how Arango AutoGraph, GraphRAG, Ada, and graph database capabilities can support a heavy-haul transportation company.",
};

const sources = [
  {
    label: "Arango for AI",
    href: "https://arango.ai/arango-for-ai/",
  },
  {
    label: "AutoGraph documentation",
    href: "https://docs.arango.ai/agentic-ai-suite/autograph/",
  },
  {
    label: "Ada AI Digital Assistant",
    href: "https://docs.arango.ai/agentic-ai-suite/ada/",
  },
  {
    label: "Graph Visualizer",
    href: "https://docs.arango.ai/platform-suite/graph-visualizer/",
  },
  {
    label: "Supply Chain use case",
    href: "https://arango.ai/use-cases/supply-chain/",
  },
  {
    label: "GraphRAG use case",
    href: "https://arango.ai/use-cases/hybrid-graphrag/",
  },
];

const heroMetrics = [
  { value: "50", label: "states with different permit logic" },
  { value: "12+", label: "AI and workflow systems shipped" },
  { value: "5", label: "document families automated" },
  { value: "1", label: "context layer for agents and operators" },
];

const arangoLayers = [
  {
    icon: GitBranch,
    title: "AutoGraph",
    eyebrow: "Knowledge modeling",
    body:
      "AutoGraph can turn permits, registrations, rate confirmations, order records, emails, and transcripts into domain-aware knowledge partitions. For heavy haul, that means the ontology starts to reflect the real language of the business: loads, axle groups, escorts, state restrictions, route stops, carrier documents, and permit exceptions.",
  },
  {
    icon: Search,
    title: "Deep Search and GraphRAG",
    eyebrow: "Retrieval pipeline",
    body:
      "A dispatcher rarely asks a one-hop question. They ask whether a load can move tonight, through a specific state, with a specific trailer, under a specific permit. Relationship-aware retrieval can combine semantic search with graph traversal so the answer is grounded in both documents and operational context.",
  },
  {
    icon: DatabaseZap,
    title: "ArangoDB multimodel",
    eyebrow: "Data foundation",
    body:
      "Orders can stay document-shaped, relationships can stay graph-shaped, regulations can be indexed for search, and embeddings can support semantic retrieval. The point is not to replace every operational system. It is to give AI one governed place to understand how the work connects.",
  },
  {
    icon: Bot,
    title: "Ada and AQLizer",
    eyebrow: "Human access",
    body:
      "Operations leaders should not need to write graph queries to ask operational questions. Ada gives teams a conversational way to inspect data, generate AQL, build charts, and turn complex connected data into something a dispatcher, permit specialist, or manager can actually use.",
  },
];

const graphNodes = [
  { className: styles.nodeOrder, label: "Order", icon: ClipboardCheck },
  { className: styles.nodeRoute, label: "Route", icon: Route },
  { className: styles.nodePermit, label: "Permit", icon: FileSearch },
  { className: styles.nodeCarrier, label: "Carrier", icon: Truck },
  { className: styles.nodeReg, label: "State rule", icon: ShieldCheck },
  { className: styles.nodeDocs, label: "Documents", icon: BookOpen },
  { className: styles.nodeEmail, label: "Email thread", icon: Mail },
  { className: styles.nodeVoice, label: "Voice knowledge", icon: MessageSquareText },
];

const useCases = [
  {
    icon: Mail,
    title: "Front desk intake that understands the whole thread",
    body:
      "In the internship work, the front desk system monitored emails, classified real customer requests, retrieved prior conversations, and assembled order context before a human touched the case. With Arango underneath, every email could attach itself to the order, carrier, document, route, and historical exception it references.",
    arango:
      "AutoGraph models the relationship between message, sender, order, load, document, and previous resolution. GraphRAG retrieves the right context instead of the nearest text chunk.",
    image: "/case-studies/heavyhaul-ai/frontdesk-full.png",
    imageAlt: "Front desk intake dashboard for heavy-haul operations",
  },
  {
    icon: FileSearch,
    title: "Document intelligence with lineage, not loose extraction",
    body:
      "Permits, truck registrations, trailer registrations, certificates of insurance, IFTA documents, and rate confirmations are not just files. They are evidence. A heavy-haul company needs to know what was extracted, which source produced it, where it was used, and whether it still applies.",
    arango:
      "Arango can preserve the extracted fields as documents, connect them to graph entities, and make every AI answer traceable back to the source document and relationship path.",
    image: "/case-studies/heavyhaul-ai/truck-form.webp",
    imageAlt: "Truck registration extraction form",
  },
  {
    icon: MessageSquareText,
    title: "Tribal knowledge becomes institutional memory",
    body:
      "The Discord recording and transcript pipeline captured operational expertise that usually disappears after a call ends: why a permit was rejected, how a tricky state handles dimensions, which route pattern created a problem, or how a senior dispatcher thinks through an edge case.",
    arango:
      "AutoGraph can cluster transcripts by natural knowledge domains, then Deep Search can retrieve the specific operational lesson when a similar order appears again.",
    image: "/case-studies/heavyhaul-ai/discord-bot.png",
    imageAlt: "Discord recording bot used for knowledge capture",
  },
  {
    icon: Route,
    title: "Route approvals that explain themselves",
    body:
      "Historical route reuse is valuable, but auto-approval should not be a black box. When a system says a route is safe to reuse, the operations team should see the previous successful moves, the permit conditions, the equipment profile, and the differences that still need review.",
    arango:
      "Graph traversal can connect origin, destination, state segments, permit history, vehicle configuration, load dimensions, and exception records into an explainable approval path.",
  },
  {
    icon: Truck,
    title: "Order assistants that reason across operations",
    body:
      "The order assistant built during the internship answered questions about routes, payments, load specs, restrictions, and legal context. In Arango, that assistant can become more reliable because order data, documents, regulations, and conversations are connected before the model responds.",
    arango:
      "AQLizer and GraphRAG can translate plain English questions into structured graph and document retrieval over the same contextual data foundation.",
    image: "/case-studies/heavyhaul-ai/order-bot.png",
    imageAlt: "Order information assistant for heavy-haul operations",
  },
  {
    icon: KeyRound,
    title: "TMS partners get a cleaner integration surface",
    body:
      "The TMS API work created a structured path for external systems to submit orders, contacts, carrier details, stops, dimensions, and documents. Arango could make that integration smarter by immediately connecting incoming payloads to existing carriers, prior orders, known documents, and compliance rules.",
    arango:
      "Contextual Data Access through APIs, native drivers, and MCP tools lets agentic workflows use the same governed context that operational applications use.",
    image: "/case-studies/heavyhaul-ai/tms-api-docs.png",
    imageAlt: "TMS API documentation with examples",
  },
];

const blueprintSteps = [
  {
    number: "01",
    title: "Ingest the operating record",
    body:
      "Start with the systems already doing the work: order database, TMS API submissions, Gmail, uploaded documents, Discord transcripts, route history, estimator prompts, and state regulation references.",
  },
  {
    number: "02",
    title: "Let AutoGraph discover the domain shape",
    body:
      "Heavy haul has natural clusters: permitting, vehicle credentials, load geometry, customer communication, route history, incident training, and state-specific compliance. Each deserves a retrieval strategy tuned to its complexity.",
  },
  {
    number: "03",
    title: "Use graph where relationships matter",
    body:
      "Model the entities that operators already think in: order, load, truck, trailer, axle group, carrier, customer, route segment, state, permit, document, email, transcript, exception, and approval.",
  },
  {
    number: "04",
    title: "Use GraphRAG for questions that cross boundaries",
    body:
      "A question like, \"Can this load move through Ohio tonight?\" needs dimensions, route, state rules, permit status, escort requirements, historical exceptions, and source evidence. That is a graph problem wearing a chat interface.",
  },
  {
    number: "05",
    title: "Expose context to people and agents",
    body:
      "Dispatchers need dashboards. Managers need analytics. Agents need MCP tools and APIs. Permit specialists need source traces. Ada and the Graph Visualizer give humans a way to inspect and trust the connected picture.",
  },
];

const blogIdeas = [
  "How AutoGraph turns heavy-haul permits, emails, and transcripts into an AI-ready knowledge graph",
  "Why oversize-load compliance is a GraphRAG problem, not a chatbot problem",
  "From tribal knowledge to institutional memory: building a searchable operations brain for transportation teams",
  "Using ArangoDB to connect orders, carriers, equipment, routes, permits, and documents in one contextual model",
  "Designing an AI front desk for logistics: email classification, thread memory, and human-in-the-loop routing",
  "A practical graph model for heavy-haul route approvals and permit exceptions",
  "How Ada could help dispatchers ask operational questions without writing AQL",
  "Building traceable document intelligence for rate confirmations, COIs, registrations, permits, and IFTA forms",
  "What a TMS integration API becomes when every payload lands inside a contextual data layer",
  "The heavy-haul AI maturity curve: from automation scripts to governed agentic workflows",
];

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={styles.externalLink}>
      {children}
      <ArrowRight aria-hidden="true" size={14} />
    </a>
  );
}

function GraphModel() {
  return (
    <div className={styles.graphModel} aria-label="Graph model for heavy-haul transportation context">
      <div className={styles.graphLines} aria-hidden="true" />
      {graphNodes.map((node) => {
        const Icon = node.icon;
        return (
          <div key={node.label} className={`${styles.graphNode} ${node.className}`}>
            <Icon aria-hidden="true" size={18} />
            <span>{node.label}</span>
          </div>
        );
      })}
      <div className={styles.graphCenter}>
        <Network aria-hidden="true" size={24} />
        <span>Contextual Data Layer</span>
      </div>
    </div>
  );
}

export default function ArangoHeavyHaulPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/case-studies/heavyhaul-ai/frontdesk-full.png"
          alt="Heavy-haul AI front desk dashboard"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <header className={styles.nav}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft aria-hidden="true" size={16} />
            <span>Imad Khan</span>
          </Link>
          <span className={styles.navMark}>Arango x Heavy Haul</span>
        </header>

        <div className={styles.heroContent}>
          <p className={styles.kicker}>Blog post draft for Diego Mendez Romero</p>
          <h1>Heavy-haul AI needs more than a chatbot. It needs business context.</h1>
          <p className={styles.heroLead}>
            A heavy-haul transportation company lives inside relationships: orders connect to loads, loads
            connect to equipment, equipment connects to permits, permits connect to state rules, and every
            exception hides in an email thread, a PDF, or a dispatcher conversation. Arango is built for that
            kind of connected reality.
          </p>
          <div className={styles.heroActions}>
            <a href="#article" className={styles.primaryAction}>
              Read the draft
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a href="#ideas" className={styles.secondaryAction}>
              10 more ideas
            </a>
          </div>
        </div>

        <div className={styles.metricDock} aria-label="Heavy-haul AI context metrics">
          {heroMetrics.map((metric) => (
            <div key={metric.label} className={styles.metricItem}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.introBand} id="article">
        <div className={styles.articleGrid}>
          <aside className={styles.articleAside}>
            <span className={styles.asideLabel}>Point of view</span>
            <p>
              The opportunity is not to sprinkle AI over logistics. It is to give AI the same connected
              operating picture that great dispatchers and permit specialists build in their heads.
            </p>
          </aside>
          <article className={styles.prose}>
            <p>
              Heavy-haul transportation looks simple from the outside: move an oversized load from point A
              to point B. Inside the operation, it is a living web of constraints. A single shipment can
              involve customer instructions, commodity dimensions, truck and trailer credentials, permit
              documents, escort requirements, route restrictions, payment status, state-by-state rules,
              weather windows, holiday movement limits, and years of institutional memory about what
              actually happens on the road.
            </p>
            <p>
              During my internship with a U.S. heavy-haul transportation company, I worked on AI systems
              across that operating web: a front desk email automation pipeline, a TMS integration API,
              document extraction for multiple credential types, an order information assistant, Discord
              voice recording and transcript processing, a RAG knowledge system, estimator improvements,
              and route auto-approval logic. The common lesson was blunt: the model is rarely the hard
              part. The hard part is context.
            </p>
            <p>
              That is where Arango's AI Services and graph database capabilities become especially
              interesting. Arango's Contextual Data Platform brings graph, vector, document, key-value, and
              search together in one governed foundation. AutoGraph can help generate the domain structure.
              Deep Search and GraphRAG can retrieve across relationships. Ada can make connected data
              explorable in natural language. The result is not a smarter chatbot sitting beside operations.
              It is an AI-ready operating layer that understands how the business actually fits together.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.contextSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kickerDark}>Why heavy haul is graph-shaped</p>
          <h2>Every operational question is a relationship question.</h2>
          <p>
            A permit answer is not only in a permit PDF. It might be in the route, the load dimensions, the
            truck configuration, a state restriction, a previous order, and a conversation where someone
            solved the same edge case last month.
          </p>
        </div>
        <GraphModel />
      </section>

      <section className={styles.layersSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kickerDark}>The Arango fit</p>
          <h2>From fragmented logistics data to a contextual AI layer.</h2>
          <p>
            The goal is not another isolated AI tool. The goal is a reusable foundation that every assistant,
            dashboard, API workflow, and human operator can query.
          </p>
        </div>
        <div className={styles.layerGrid}>
          {arangoLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <article key={layer.title} className={styles.layerCard}>
                <div className={styles.iconBox}>
                  <Icon aria-hidden="true" size={20} />
                </div>
                <span>{layer.eyebrow}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.useCasesSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kickerDark}>Applied to the internship work</p>
          <h2>Six high-value workflows Arango could strengthen.</h2>
          <p>
            These examples map directly to the heavy-haul systems I built or improved. Arango's role is to
            make each workflow more connected, explainable, and reusable across the company.
          </p>
        </div>

        <div className={styles.useCaseList}>
          {useCases.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`${styles.useCase} ${!item.image ? styles.useCasePlain : ""}`}
              >
                <div className={styles.useCaseText}>
                  <div className={styles.useCaseTopline}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Icon aria-hidden="true" size={18} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className={styles.arangoNote}>
                    <strong>How Arango helps</strong>
                    <p>{item.arango}</p>
                  </div>
                </div>
                {item.image && (
                  <figure className={styles.useCaseFigure}>
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={980}
                      height={640}
                      sizes="(min-width: 900px) 42vw, 100vw"
                      className={styles.useCaseImage}
                    />
                  </figure>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.blueprintSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kickerDark}>Implementation blueprint</p>
          <h2>A practical path from today's tools to an Arango-powered context layer.</h2>
          <p>
            The strongest architecture would not ask operators to change everything on day one. It would
            connect the current work, preserve provenance, and let AI use the context as it becomes ready.
          </p>
        </div>
        <div className={styles.blueprintGrid}>
          {blueprintSteps.map((step) => (
            <article key={step.number} className={styles.blueprintStep}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.operatorSection}>
        <div className={styles.operatorContent}>
          <p className={styles.kicker}>What the operator gets</p>
          <h2>Answers with evidence, not just confidence.</h2>
          <p>
            In heavy haul, a confident answer can still be expensive if it is wrong. The useful assistant is
            the one that can say: here is the recommendation, here are the records I used, here is the
            relationship path, and here is what still needs a human decision.
          </p>
          <div className={styles.operatorChecks}>
            <span>
              <ShieldCheck aria-hidden="true" size={16} />
              Governed access
            </span>
            <span>
              <Workflow aria-hidden="true" size={16} />
              Traceable workflows
            </span>
            <span>
              <Layers3 aria-hidden="true" size={16} />
              One reusable context layer
            </span>
          </div>
        </div>
        <div className={styles.queryPanel} aria-label="Example heavy-haul questions">
          <div className={styles.queryHeader}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.queryBody}>
            <p>Can order HH-2047 move through Pennsylvania tonight with this trailer?</p>
            <p>Show the permit, route segment, load dimensions, prior exceptions, and source documents.</p>
            <p>What changed since the last similar move?</p>
          </div>
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className={styles.closingGrid}>
          <div>
            <p className={styles.kickerDark}>Draft conclusion</p>
            <h2>For heavy-haul companies, contextual AI is not optional polish. It is operational leverage.</h2>
          </div>
          <div className={styles.proseCompact}>
            <p>
              The companies that win in heavy-haul transportation will not be the ones with the flashiest AI
              demos. They will be the ones that turn their messy operational reality into a connected,
              governed, explainable knowledge layer.
            </p>
            <p>
              Arango's AI Services make that practical. AutoGraph can organize the knowledge. ArangoDB can
              keep graph, document, vector, and search data together. Deep Search can retrieve across the
              relationships that matter. Ada can let humans explore the system without becoming database
              specialists.
            </p>
            <p>
              Heavy haul is not a generic logistics problem. It is a relationship-dense, regulation-heavy,
              document-rich, exception-driven business. That is exactly the kind of environment where
              graph-native contextual AI can move from impressive to indispensable.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.ideasSection} id="ideas">
        <div className={styles.sectionHeader}>
          <p className={styles.kickerDark}>Extra points</p>
          <h2>10 additional blog post ideas for Arango and heavy-haul AI.</h2>
        </div>
        <div className={styles.ideasGrid}>
          {blogIdeas.map((idea, index) => (
            <article key={idea} className={styles.ideaCard}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{idea}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sourcesSection}>
        <div className={styles.sourcesInner}>
          <div>
            <p className={styles.kickerDark}>Research sources</p>
            <h2>Official Arango material used for this draft.</h2>
          </div>
          <div className={styles.sourceLinks}>
            {sources.map((source) => (
              <ExternalLink key={source.href} href={source.href}>
                {source.label}
              </ExternalLink>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
