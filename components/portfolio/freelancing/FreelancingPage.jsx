"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectShowcase from "@/components/portfolio/ProjectShowcase";
import WhatsAppFab from "@/components/portfolio/WhatsAppFab";
import "./FreelancingPage.css";

/* ═══════════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
   ═══════════════════════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = root.querySelectorAll(".fl-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════════
   MARQUEE BANNER
   ═══════════════════════════════════════════════════════════════════ */
function MarqueeBanner() {
  const items = [
    "Available for Freelance",
    "AI Automation",
    "Multi-Agent Systems",
    "Full-Stack Development",
    "Document Intelligence",
    "RAG Systems",
    "Custom AI Solutions",
    "Enterprise Software",
  ];

  return (
    <div className="fl-marquee">
      <div className="fl-marquee-track">
        {/* Duplicate for seamless loop */}
        {[0, 1].map((batch) => (
          <div className="fl-marquee-content" key={batch}>
            {items.map((item) => (
              <span className="fl-marquee-item" key={`${batch}-${item}`}>
                <span className="fl-marquee-dot" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════════════ */
function Header({ name }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "My Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Stack", href: "#stack" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNav = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header className="fl-header">
                        <Link href="/" className="fl-logo">
          <div className="fl-logo-k">
            {/* SVG letter K — vertical spine + two diagonal arms */}
            <svg viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="fl-logo-k-svg">
              {/* Vertical spine */}
              <rect x="0" y="0" width="8" height="36" rx="2" fill="var(--fl-accent)" />
              {/* Upper arm — goes from middle to top-right */}
              <polygon points="8,18 8,12 24,0 24,8" fill="var(--fl-gold)" />
              {/* Lower arm — goes from middle to bottom-right */}
              <polygon points="8,18 8,24 24,36 24,28" fill="var(--fl-gold)" />
            </svg>
          </div>
        </Link>

        <nav className="fl-nav">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="fl-nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="fl-nav-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile fullscreen nav */}
      <div className={`fl-mobile-nav ${mobileOpen ? "active" : ""}`}>
        <button
          className="fl-mobile-nav-close"
          onClick={handleNav}
          aria-label="Close navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={handleNav}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════
   "AI in YOUR BUSINESS" ANIMATED BANNER
   ═══════════════════════════════════════════════════════════════════ */
function YourBusinessMattersBanner() {
  return (
    <div className="fl-ybm-banner">
      <h2 className="fl-ybm-animated-text">AI IN YOUR BUSINESS</h2>
    </div>
  );
}

function Hero() {
  return (
    <section className="fl-hero">
      <div className="fl-cyber-pattern" />
      <div className="fl-container">
        <div className="fl-hero-grid">
                              <div className="fl-hero-text">
            <p className="fl-hero-intro" style={{ color: 'var(--fl-accent)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '1.15rem' }}>Hi, my name is Imad.</p>
            <h1 className="fl-hero-title">
              I BUILD <span style={{ color: 'var(--fl-accent)' }}>AI</span><br />
              THAT <span style={{ color: 'var(--fl-gold)' }}>WORKS.</span>
            </h1>
            <p className="fl-hero-subtitle">
              I&apos;m a Freelance AI Engineer who builds custom automation systems,
              multi-agent pipelines, and production-grade software that eliminates manual work
              and scales your operations.
            </p>
            <a href="#contact" className="fl-hero-cta">
              Start a project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>


          <div className="fl-hero-visual">
            <div className="fl-hero-img-main">
              {/* Neo-brutalist Shield Background */}
              <svg className="fl-hero-shield-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 4,35 Q 4,20 19,20 L 81,20 Q 96,20 96,35 L 96,80 L 50,96 L 4,80 Z" fill="var(--fl-accent)" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
              </svg>

              <div className="fl-hero-img-clipper">
                <Image
                  src="/Imad_Hero Image.png"
                  alt="AI Engineer Imad Khan Hero Image"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  style={{ objectFit: "contain", objectPosition: "bottom center", filter: "grayscale(100%) contrast(1.1) brightness(1.05)", transform: "scale(1.4)", transformOrigin: "bottom center" }}
                />
              </div>

              {/* Neo-Brutalist Badges — inside img-main so they stay close */}
              {/* Badge 1: AI / Data Icon (Left edge of shield) */}
              <div className="fl-neo-badge fl-badge-ai">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              
              {/* Badge 2: "Imad" name tag (Top right, near head) */}
              <div className="fl-neo-badge fl-badge-cursor">
                <span>Imad</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="fl-badge-cursor-arrow">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
              
              {/* Badge 3: Eye / View Icon (Right edge) */}
              <div className="fl-neo-badge fl-badge-eye">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              
              {/* Badge 4: Available for Freelance (Bottom edge of shield) */}
              <div className="fl-neo-badge fl-badge-status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="fl-neo-check">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Available for Freelance</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════════════════════════ */
function Stats() {
  const stats = [
    { value: "85%", label: "Time Saved on Intake" },
    { value: "$120k+", label: "Est. Annual ROI" },
    { value: "12+", label: "Systems Delivered" },
    { value: "<2min", label: "Email Processing" },
  ];

  return (
    <section className="fl-stats">
      <div className="fl-container">
        <div className="fl-stats-grid fl-reveal-stagger">
          {stats.map((s) => (
            <div key={s.label} className="fl-stat fl-reveal">
              <div className="fl-stat-value">{s.value}</div>
              <div className="fl-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SERVICES (REDESIGNED)
   ═══════════════════════════════════════════════════════════════════ */
function Services({ onOpenService }) {
  const coreServices = [
    {
      id: 'automation',
      tag: 'SYS-01 · AUTOMATION',
      title: 'AI Workflow Automation',
      desc: 'Automations that run your front desk, follow-ups, and repetitive admin — without another hire.',
    },
    {
      id: 'knowledge',
      tag: 'SYS-02 · KNOWLEDGE',
      title: 'RAG Knowledge Systems',
      desc: 'Every past chat, transcript, and support ticket, turned into a layer that answers instantly from your own data.',
    },
    {
      id: 'voice',
      tag: 'SYS-03 · VOICE',
      title: 'AI Voice Calling Agents',
      desc: 'A phone line that never misses a call — takes bookings, runs feedback calls, and logs every conversation.',
    },
    {
      id: 'chat',
      tag: 'SYS-04 · CHAT',
      title: 'AI Website Chatbots',
      desc: 'A chatbot wired into your real listings, docs, or database — not a script it forgot to read.',
    },
    {
      id: 'custom',
      tag: 'SYS-05 · CUSTOM',
      title: 'Custom Solutions',
      desc: 'Bring the problem you can\'t name yet. We scope it, build it, and ship something that runs on its own.',
    },
  ];

  const [reTab, setReTab] = useState('re-1');
  const [ccTab, setCcTab] = useState('cc-1');

  return (
    <section className="fl-services-catalog" id="services">
      <div className="fl-catalog-inner">
        <div className="fl-services-eyebrow fl-reveal">Service Catalog · aiwithimad</div>
        <h2 className="fl-services-headline fl-reveal">
          Five systems, built once.<br />Running <em>every day</em> after.
        </h2>
        <p className="fl-services-lede fl-reveal">
          Every engagement starts from the same five building blocks — combined and customized to the job, then handed over as a system that keeps working without you in the loop.
        </p>

        <div className="fl-grid5 fl-reveal-stagger">
          {coreServices.map((s) => (
            <div 
              key={s.id} 
              className="fl-sys-card fl-reveal"
              onClick={() => onOpenService({ type: 'core', ...s })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onOpenService({ type: 'core', ...s }); }}
            >
              <span className="fl-bracket tl"></span><span className="fl-bracket br"></span>
              <div className="fl-sys-tag">{s.tag}</div>
              <h4 className="fl-sys-title">{s.title}</h4>
              <p className="fl-sys-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="fl-sig-eyebrow fl-services-eyebrow fl-reveal">Signature Builds</div>
        <h3 className="fl-sig-headline fl-reveal">Two systems we&apos;ve packaged end to end</h3>

        <div className="fl-panels fl-reveal-stagger">
          
          {/* PANEL A: REAL ESTATE */}
          <div className="fl-panel fl-reveal">
            <div className="fl-panel-header">
              <div className="fl-panel-code">BUILD-A</div>
              <div className="fl-panel-badge">🔥 Most Demanded</div>
            </div>
            <h4 className="fl-panel-title">Real Estate AI Suite</h4>
            <p className="fl-panel-sub">For agents and brokerages who lose deals to slow follow-up, not bad listings.</p>

            <div className="fl-packages">
              {/* Package 1 */}
              <div className="fl-package-card">
                <div className="fl-package-top">
                  <h5 className="fl-package-title">Lead Capture Pro</h5>
                  <span className="fl-package-for">For 1–5 agents</span>
                </div>
                <p className="fl-package-desc">24/7 AI voice receptionist & website chatbot that catches every missed lead and qualifies them instantly.</p>
                <button 
                  className="fl-package-cta"
                  onClick={(e) => { e.stopPropagation(); onOpenService({ type: 'bundle', id: 'real-estate', package: 'pro' }); }}
                >
                  View Details & Pricing <span className="fl-arrow">→</span>
                </button>
              </div>

              {/* Package 2 */}
              <div className="fl-package-card">
                <div className="fl-package-top">
                  <h5 className="fl-package-title">Full Deal Assistant</h5>
                  <span className="fl-package-for">For growing teams</span>
                </div>
                <p className="fl-package-desc">Everything in Pro, plus AI meeting companions, automated follow-ups, and smart lead scoring in your CRM.</p>
                <button 
                  className="fl-package-cta"
                  onClick={(e) => { e.stopPropagation(); onOpenService({ type: 'bundle', id: 'real-estate', package: 'full' }); }}
                >
                  View Details & Pricing <span className="fl-arrow">→</span>
                </button>
              </div>
            </div>

            <div className="fl-addon-label">Add-ons, sold standalone</div>
            <div className="fl-chips">
              <span className="fl-chip">CRM integration</span>
              <span className="fl-chip">WhatsApp lead nurture</span>
              <span className="fl-chip">Virtual tour booking</span>
            </div>
          </div>

          {/* PANEL B: CONTENT STUDIO */}
          <div className="fl-panel fl-reveal">
            <div className="fl-panel-header">
              <div className="fl-panel-code">BUILD-B</div>
              <div className="fl-panel-badge">🚀 High Growth</div>
            </div>
            <h4 className="fl-panel-title">Automated Content Studio</h4>
            <p className="fl-panel-sub">Two ways in, depending on whether you&apos;re already on camera or starting fresh.</p>

            <div className="fl-packages">
              {/* Package 1 */}
              <div className="fl-package-card">
                <div className="fl-package-top">
                  <h5 className="fl-package-title">Clone Track</h5>
                  <span className="fl-package-for">For active creators</span>
                </div>
                <p className="fl-package-desc">We clone your exact voice, pacing, and scripting style to produce new content faster than you can record.</p>
                <button 
                  className="fl-package-cta"
                  onClick={(e) => { e.stopPropagation(); onOpenService({ type: 'bundle', id: 'content-studio', package: 'clone' }); }}
                >
                  View Details & Pricing <span className="fl-arrow">→</span>
                </button>
              </div>

              {/* Package 2 */}
              <div className="fl-package-card">
                <div className="fl-package-top">
                  <h5 className="fl-package-title">Niche Builder Track</h5>
                  <span className="fl-package-for">For busy founders</span>
                </div>
                <p className="fl-package-desc">A fully automated faceless production system — scripting, voice generation, editing, and thumbnails.</p>
                <button 
                  className="fl-package-cta"
                  onClick={(e) => { e.stopPropagation(); onOpenService({ type: 'bundle', id: 'content-studio', package: 'niche' }); }}
                >
                  View Details & Pricing <span className="fl-arrow">→</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="fl-cta-strip fl-reveal">
          <div className="fl-cta-text">Have a problem that doesn't fit a tile? <span>Tell us anyway.</span></div>
          <a href="#contact" className="fl-cta-btn">Get a Free AI Audit</a>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURED PROJECTS
   ═══════════════════════════════════════════════════════════════════ */
function FeaturedProjects({ projects, onOpenProject }) {
  /* Take first 4 projects with images for featured layout */
  const featured = projects.filter(
    (p) => p.image || (p.imagePair && p.imagePair.length > 0)
  ).slice(0, 4);

  return (
    <section className="fl-featured" id="work">
      <div className="fl-container">
        <h2 className="fl-section-title fl-reveal">Featured projects</h2>
        {featured.map((project) => {
          const imgSrc = project.image || project.imagePair?.[0]?.src;
          return (
            <div key={project.num} className="fl-featured-project fl-reveal">
              <div className="fl-featured-text">
                <div className="fl-featured-tags">
                  <span className="fl-featured-tag">{project.category}</span>
                  <span className="fl-featured-tag">System {project.num}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.narrative}</p>
                <button
                  className="fl-featured-cta"
                  onClick={() => onOpenProject(project)}
                >
                  See full case study
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {imgSrc && (
                <div
                  className="fl-featured-image"
                  onClick={() => onOpenProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onOpenProject(project);
                  }}
                >
                  <Image
                    src={imgSrc}
                    alt={project.imageAlt || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OTHER PROJECTS — Grid
   ═══════════════════════════════════════════════════════════════════ */

const FALLBACK_IMAGES = [
  "/case-studies/freelancing/fl-email-dashboard.png",
  "/case-studies/freelancing/fl-api-documentation.png",
  "/case-studies/freelancing/fl-customer-portal.png",
  "/case-studies/freelancing/fl-ai-assistant.png",
  "/case-studies/freelancing/fl-recording-platform.png",
  "/case-studies/freelancing/fl-api-portal.png",
];

function OtherProjects({ projects, onOpenProject }) {
  /* Remaining projects that aren't featured */
  const featured = projects.filter(
    (p) => p.image || (p.imagePair && p.imagePair.length > 0)
  ).slice(0, 4);
  const featuredNums = new Set(featured.map((p) => p.num));
  const others = projects.filter((p) => !featuredNums.has(p.num));

  if (others.length === 0) return null;

  return (
    <section className="fl-other-projects">
      <div className="fl-container">
        <h2 className="fl-section-title fl-reveal">Other projects</h2>
        <div className="fl-projects-grid fl-reveal-stagger">
          {others.map((project, idx) => {
            const imgSrc =
              project.image ||
              project.imagePair?.[0]?.src ||
              FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];

            return (
              <div
                key={project.num}
                className="fl-project-card fl-reveal"
                onClick={() => onOpenProject(project)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenProject(project);
                  }
                }}
              >
                <div className="fl-project-card-img">
                  <Image
                    src={imgSrc}
                    alt={project.imageAlt || project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="fl-project-card-body">
                  <div className="fl-project-card-category">{project.category}</div>
                  <h4>{project.title}</h4>
                  <div className="fl-project-card-hint">
                    <span>View case study</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TECH STACK
   ═══════════════════════════════════════════════════════════════════ */
function TechStack({ techStack }) {
  return (
    <section className="fl-stack" id="stack">
      <div className="fl-container">
        <h2 className="fl-section-title fl-reveal">My AI Engineering Toolkit</h2>
        <div className="fl-stack-grid fl-reveal-stagger">
          {techStack.map((group) => (
            <div key={group.category} className="fl-stack-group fl-reveal">
              <h4>{group.category}</h4>
              <p className="fl-stack-group-desc">{group.description}</p>
              <div className="fl-stack-items">
                {group.items.map((item) => (
                  <div key={item.name} className="fl-stack-item">
                    <div className="fl-stack-item-icon">
                      {item.icon ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={item.icon} alt={`${item.name} logo`} />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m13 2-2 9h9l-11 11 2-9H2l11-11z" />
                        </svg>
                      )}
                    </div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════ */
function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);

  const faqs = [
    {
      q: "What kind of AI systems do you build?",
      a: "I build production-grade AI automation systems — multi-agent email pipelines, document extraction systems, RAG knowledge platforms, AI assistants, and custom chatbots. Everything I build is designed to run reliably in production, not just as a demo.",
    },
    {
      q: "What's your typical project timeline?",
      a: "Most projects take 4–8 weeks from kickoff to deployment. Complex multi-system projects (like the 12-system heavy-haul engagement) can span several months. I always provide a clear timeline estimate before starting.",
    },
    {
      q: "How do you price projects?",
      a: "I work on a project-based pricing model with clear deliverables. After understanding your needs, I provide a fixed-price proposal so you know exactly what you're investing. No surprise bills.",
    },
    {
      q: "What industries have you worked in?",
      a: "My deepest expertise is in heavy-haul transportation and logistics, where I've built 12+ production AI systems. However, the patterns I've developed — email automation, document extraction, knowledge systems — transfer well to any operations-heavy industry.",
    },
    {
      q: "Do you work with international clients?",
      a: "Yes. I work with clients globally and am comfortable with async communication across time zones. My current clients are US-based, and I maintain overlap hours for real-time collaboration.",
    },
    {
      q: "What makes your approach different?",
      a: "I build systems that your team can actually use daily — not flashy demos that fall apart in production. I focus on reliability, proper error handling, human oversight, and designs that fit naturally into existing workflows.",
    },
    {
      q: "Can you work with my existing tech stack?",
      a: "Absolutely. I've integrated with a wide range of systems — Gmail APIs, CRMs, TMS platforms, Slack, custom databases. I'll adapt to your stack rather than forcing you to change it.",
    },
    {
      q: "Do you offer ongoing support after delivery?",
      a: "Yes. I provide a handoff period with documentation and support. For clients who need ongoing iteration, I offer maintenance retainers. The goal is for your team to be self-sufficient, but I'm available when needed.",
    },
  ];

  const toggle = useCallback(
    (idx) => setActiveIdx((prev) => (prev === idx ? null : idx)),
    []
  );

  return (
    <section className="fl-faq" id="faq">
      <div className="fl-container">
        <div className="fl-faq-layout">
          <div className="fl-reveal">
            <h2 className="fl-faq-heading">
              FREQUENTLY<br />
              ASKED<br />
              QUESTIONS
            </h2>
          </div>
          <div className="fl-faq-list fl-reveal">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className={`fl-faq-item ${activeIdx === idx ? "active" : ""}`}
              >
                <button className="fl-faq-question" onClick={() => toggle(idx)}>
                  <span>{item.q}</span>
                  <span className="fl-faq-toggle" />
                </button>
                <div className="fl-faq-answer">
                  <div className="fl-faq-answer-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════════ */
function Contact({ whatsappPhone, emailAddress, whatsappMsg, emailSubject, emailBody }) {
  return (
    <section className="fl-contact" id="contact">
      <div className="fl-container">
        <div className="fl-contact-layout">
          <div className="fl-reveal">
            <h2 className="fl-contact-title">Tell me about your project</h2>
            <p className="fl-contact-desc">
              Any project starts with understanding. If you have a manual process that&apos;s eating
              your team&apos;s time, I can probably automate it. After the inquiry, I&apos;ll reply
              within 1–2 business days with a preliminary plan or questions for more details.
            </p>

            <div className="fl-contact-info-label">Email me at</div>
            <a href={`mailto:${emailAddress}`} className="fl-contact-email">{emailAddress}</a>

            <div className="fl-contact-socials">
              <a
                href="https://www.linkedin.com/in/imadkhan-ai-ml"
                target="_blank"
                rel="noopener noreferrer"
                className="fl-contact-social"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/ImaduddeenKhan"
                target="_blank"
                rel="noopener noreferrer"
                className="fl-contact-social"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="fl-contact-ctas fl-reveal">
            <a
              href={`https://wa.me/${whatsappPhone}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fl-contact-cta-card fl-contact-cta-card--whatsapp"
            >
              <div className="fl-contact-cta-icon">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path fill="currentColor" d="M19.11 17.21c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.91-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.86-2.05-.23-.55-.46-.48-.62-.49l-.53-.01a1.02 1.02 0 0 0-.74.34c-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32Zm-4.95 6.76h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.21-3.67.96.98-3.58-.23-.37a9.69 9.69 0 0 1-1.49-5.18C4.45 8.86 8.85 4.46 14.17 4.46a9.6 9.6 0 0 1 6.84 2.84 9.6 9.6 0 0 1 2.83 6.85c0 5.32-4.4 9.72-9.68 9.72Zm8.25-17.97A11.55 11.55 0 0 0 14.17 2.5C7.76 2.5 2.49 7.77 2.49 14.18c0 2.05.54 4.05 1.55 5.81L2.4 26.5l6.66-1.74a11.66 11.66 0 0 0 5.11 1.3h.01c6.41 0 11.68-5.27 11.68-11.68a11.62 11.62 0 0 0-3.45-8.38Z" />
                </svg>
              </div>
              <div className="fl-contact-cta-text">
                <h4>Message me on WhatsApp</h4>
                <p>Usually respond within a few hours</p>
              </div>
            </a>

            <a
              href={`mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`}
              className="fl-contact-cta-card fl-contact-cta-card--email"
            >
              <div className="fl-contact-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="fl-contact-cta-text">
                <h4>Send me an Email</h4>
                <p>For detailed project descriptions</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CLOSING + FOOTER
   ═══════════════════════════════════════════════════════════════════ */
function ClosingAndFooter({ name }) {
  return (
    <>
      <section className="fl-closing">
        <div className="fl-container fl-reveal">
          <p className="fl-closing-quote">
            &ldquo;The best AI systems aren&apos;t impressive demos — they&apos;re the ones
            that fit naturally into how your team already works.&rdquo;
          </p>
          <p className="fl-closing-name">— {name}, Freelance AI Engineer</p>
          <Link href="/" className="fl-closing-link">
            View My Full Portfolio
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <footer className="fl-footer">
        <div className="fl-container">
          <div className="fl-footer-inner">
            <span className="fl-footer-copy">© {new Date().getFullYear()} {name}. All rights reserved.</span>
            <span className="fl-footer-role">Freelance AI Engineer</span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DETAIL PANEL (reusing ProjectShowcase's DetailPanel logic)
   We import ProjectShowcase which has its own detail overlay.
   But since we want a custom flow, we'll reuse its DetailPanel.
   ═══════════════════════════════════════════════════════════════════ */

/* Inline detail panel for this page to avoid tight coupling */
function DetailPanel({ project, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.add("fl-overlay-open");
    return () => document.body.classList.remove("fl-overlay-open");
  }, []);

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [project]);

  if (!project) return null;

  return (
    <div className="fw-detail-overlay fw-detail-overlay--active" role="dialog" aria-modal="true">
      <div className="fw-detail-backdrop" onClick={onClose} />
      <div className="fw-detail-panel" ref={panelRef}>
        <div className="fw-detail-close">
          <button className="fw-detail-close-btn" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="fw-detail-header">
          <div className="fw-detail-header-top">
            <span className="fw-detail-num">{project.num}</span>
            <span className="fw-detail-category">{project.category}</span>
          </div>
          <h3 className="fw-detail-title">{project.title}</h3>
        </div>

        <div className="fw-detail-body">
          {project.narrative && <p className="fw-detail-narrative">{project.narrative}</p>}

          {project.approach && (
            <div className="fw-detail-approach">
              <div className="fw-detail-approach-accent" />
              <div className="fw-detail-approach-content">
                <span className="fw-detail-approach-label">My Approach</span>
                <p className="fw-detail-approach-text">{project.approach}</p>
              </div>
            </div>
          )}

          {project.details?.length > 0 && (
            <div className="fw-detail-timeline">
              <div className="fw-detail-timeline-line" />
              {project.details.map((d) => (
                <div key={d.label} className="fw-detail-timeline-item">
                  <div className="fw-detail-timeline-marker">
                    <span className="fw-detail-timeline-dot" />
                  </div>
                  <div>
                    <span className="fw-detail-timeline-label">{d.label}</span>
                    <p className="fw-detail-timeline-text">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {project.technical && (
            <div className="fw-detail-technical">
              <div className="fw-detail-technical-bar">
                <span className="fw-detail-technical-dot fw-detail-technical-dot--r" />
                <span className="fw-detail-technical-dot fw-detail-technical-dot--y" />
                <span className="fw-detail-technical-dot fw-detail-technical-dot--g" />
                <span className="fw-detail-technical-title">Technical Detail</span>
              </div>
              <div className="fw-detail-technical-body">{project.technical}</div>
            </div>
          )}

          {project.challenge && (
            <div className="fw-detail-challenge">
              <span className="fw-detail-challenge-icon">⚡</span>
              <div className="fw-detail-challenge-body">
                <span className="fw-detail-challenge-label">Key Challenge</span>
                <p className="fw-detail-challenge-text">{project.challenge}</p>
              </div>
            </div>
          )}

          {project.image && (
            <div className="fw-detail-image-wrap">
              <Image
                src={project.image}
                alt={project.imageAlt || project.title}
                width={800}
                height={500}
                quality={90}
                style={{ width: "100%", height: "auto" }}
              />
              {project.imageCaption && (
                <div className="fw-detail-image-caption">{project.imageCaption}</div>
              )}
            </div>
          )}

          {project.imagePair && (
            <div className="fw-detail-image-pair">
              {project.imagePair.map((img) => (
                <div key={img.src} className="fw-detail-image-wrap">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={375}
                    quality={90}
                    style={{ width: "100%", height: "auto" }}
                  />
                  {img.caption && (
                    <div className="fw-detail-image-caption">{img.caption}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SERVICE POPUP MODAL
   ═══════════════════════════════════════════════════════════════════ */
function ServicePopup({ service, onClose, whatsappPhone, emailAddress }) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.add("fl-overlay-open");
    return () => document.body.classList.remove("fl-overlay-open");
  }, []);

  if (!service) return null;

  // Use Case Content Definitions
  const serviceContent = {
    'automation': {
      label: 'Applications & Use Cases',
      list: [
        'Automated email sorting, classification & routing',
        'Follow-up reminders when clients go quiet',
        'Invoice processing & matching',
        'Appointment scheduling & booking confirmations',
        'Lead qualification from web forms & emails',
        'CRM data entry & updates (no more copy-pasting)',
        'Social media posting schedules',
        'Report generation & distribution',
        'Employee onboarding task automation'
      ]
    },
    'knowledge': {
      label: 'Applications & Use Cases',
      list: [
        'Internal company wiki that actually answers questions',
        'Customer support knowledge base — instant answers from your own docs',
        'Policy & procedure lookup for employees',
        'Product catalog search with natural language',
        'Past project/case search for reference',
        'FAQ automation from existing documents',
        'Training material retrieval & quiz generation',
        'Contract clause search & comparison'
      ]
    },
    'voice': {
      label: 'Applications & Use Cases',
      list: [
        '24/7 receptionist — never miss a call again',
        'Appointment booking & confirmation calls',
        'Lead qualification calls (budget, timeline, requirements)',
        'Customer feedback & satisfaction surveys',
        'Payment reminder calls',
        'Order status update calls',
        'After-hours emergency routing',
        'Multi-language support (English, Spanish, Urdu, Hindi)'
      ]
    },
    'chat': {
      label: 'Applications & Use Cases',
      list: [
        'Answer visitor questions from your real data (not generic scripts)',
        'Product/service recommendations based on visitor needs',
        'Lead capture with qualification questions',
        'Appointment/demo booking directly in chat',
        'Order tracking & status updates',
        'FAQ handling with smart escalation to human',
        'Multi-language support',
        'Handoff to WhatsApp or email when needed'
      ]
    },
    'custom': {
      label: 'What We Can Build',
      list: [
        'Bring any problem — we\'ll scope and build it',
        'Data extraction from messy documents (PDFs, images, scans)',
        'API integrations between your existing tools',
        'Dashboard & reporting systems',
        'Workflow optimization & process automation',
        'AI-powered data analysis & insights',
        'Custom internal tools for your team',
        'Anything that&apos;s eating your team&apos;s time — we can probably automate it'
      ]
    }
  };

  const getWhatsAppMsg = () => {
    let msg = "Hi Imad, I'm interested in your AI services.";
    if (service.type === 'core') {
      msg = `Hi Imad, I'm interested in ${service.title} for my business.`;
    } else if (service.id === 'real-estate') {
      msg = `Hi Imad, I'm interested in the Real Estate AI Suite.`;
    } else if (service.id === 'content-studio') {
      msg = `Hi Imad, I'm interested in the Automated Content Studio.`;
    }
    return encodeURIComponent(msg);
  };

  const getEmailSubject = () => {
    let sub = "AI Automation Inquiry";
    if (service.type === 'core') {
      sub = `Inquiry: ${service.title}`;
    } else if (service.id === 'real-estate') {
      sub = `Inquiry: Real Estate AI Suite`;
    } else if (service.id === 'content-studio') {
      sub = `Inquiry: Automated Content Studio`;
    }
    return encodeURIComponent(sub);
  };

  return (
    <div className="fl-service-popup-overlay" onClick={onClose}>
      <div className="fl-service-popup" ref={popupRef} onClick={(e) => e.stopPropagation()}>
        <button className="fl-service-popup-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {service.type === 'core' && (
          <>
            <div className="fl-service-popup-header">
              <div className="fl-service-popup-tag">{service.tag}</div>
              <h3 className="fl-service-popup-title">{service.title}</h3>
            </div>
            <div className="fl-service-popup-body">
              <div className="fl-service-popup-label">{serviceContent[service.id].label}</div>
              <ul className="fl-service-popup-list">
                {serviceContent[service.id].list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {service.type === 'bundle' && service.id === 'real-estate' && (
          <>
            <div className="fl-service-popup-header">
              <div className="fl-service-popup-tag">BUILD-A</div>
              <h3 className="fl-service-popup-title">Real Estate AI Suite</h3>
            </div>
            <div className="fl-service-popup-body">
              <div className="fl-service-popup-label">Lead Capture Pro (1-5 Agents)</div>
              <ul className="fl-service-popup-list">
                <li>24/7 AI voice receptionist that catches missed calls and qualifies the caller — name, budget, area, timeline</li>
                <li>Every lead dropped straight into your CRM or spreadsheet</li>
                <li>Voice + text website chatbot answering real listing questions from your own data</li>
                <li>Instant lead alerts by SMS, email, or WhatsApp</li>
                <li>Automatic follow-up if a lead goes quiet for 24–48 hours</li>
              </ul>
              
              <div className="fl-service-popup-label" style={{ marginTop: '2rem' }}>Full Deal Assistant (Growing Brokerages)</div>
              <ul className="fl-service-popup-list">
                <li>Everything in Lead Capture Pro, plus:</li>
                <li>AI meeting companion — listens to showings and calls, writes the summary and objections straight into your CRM</li>
                <li>Automated follow-up call scheduling after every meeting</li>
                <li>Lead scoring that separates serious buyers from browsers</li>
                <li>Multi-language support for diverse client bases</li>
                <li>Objection handling trained on your own top agent's calls</li>
                <li>A dashboard tracking calls, conversions, and channel performance</li>
              </ul>

              <div className="fl-service-popup-label" style={{ marginTop: '2rem' }}>Available Add-ons</div>
              <div className="fl-chips">
                <span className="fl-chip">CRM integration</span>
                <span className="fl-chip">WhatsApp lead nurture</span>
                <span className="fl-chip">Automated drip campaigns</span>
                <span className="fl-chip">Virtual tour booking assistant</span>
                <span className="fl-chip">Post-closing review & referral bot</span>
                <span className="fl-chip">RAG listing-match engine</span>
              </div>
            </div>
          </>
        )}

        {service.type === 'bundle' && service.id === 'content-studio' && (
          <>
            <div className="fl-service-popup-header">
              <div className="fl-service-popup-tag">BUILD-B</div>
              <h3 className="fl-service-popup-title">Automated Content Studio</h3>
            </div>
            <div className="fl-service-popup-body">
              <div className="fl-service-popup-label">Clone Track</div>
              <p className="fl-track-desc" style={{ color: 'var(--fl-fg)', marginBottom: '2rem' }}>
                For creators who already post and have an audience. We study your existing videos — your scripts, delivery, pacing, the way you actually talk — and build a system that keeps producing new content in <strong>your exact voice</strong>, at a pace your posting schedule alone couldn&apos;t hit.
              </p>
              
              <div className="fl-service-popup-label">Niche Builder Track</div>
              <p className="fl-track-desc" style={{ color: 'var(--fl-fg)' }}>
                For founders too busy to start from zero. Pick a niche. We study the creators already winning in it, then build a fully automated production system around it — scripting, ElevenLabs voice, thumbnails, editing, all tuned to look 100% human. If you'd rather stay off-camera entirely, that's built in too.
              </p>
            </div>
          </>
        )}

        <div className="fl-service-popup-cta">
          <a 
            href={`https://wa.me/${whatsappPhone}?text=${getWhatsAppMsg()}`}
            target="_blank" rel="noopener noreferrer"
            className="fl-popup-btn fl-popup-btn--whatsapp"
          >
            <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" d="M19.11 17.21c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.91-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.86-2.05-.23-.55-.46-.48-.62-.49l-.53-.01a1.02 1.02 0 0 0-.74.34c-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32Zm-4.95 6.76h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.21-3.67.96.98-3.58-.23-.37a9.69 9.69 0 0 1-1.49-5.18C4.45 8.86 8.85 4.46 14.17 4.46a9.6 9.6 0 0 1 6.84 2.84 9.6 9.6 0 0 1 2.83 6.85c0 5.32-4.4 9.72-9.68 9.72Zm8.25-17.97A11.55 11.55 0 0 0 14.17 2.5C7.76 2.5 2.49 7.77 2.49 14.18c0 2.05.54 4.05 1.55 5.81L2.4 26.5l6.66-1.74a11.66 11.66 0 0 0 5.11 1.3h.01c6.41 0 11.68-5.27 11.68-11.68a11.62 11.62 0 0 0-3.45-8.38Z" />
            </svg>
            Get a Quote on WhatsApp
          </a>
          <a 
            href={`mailto:${emailAddress}?subject=${getEmailSubject()}`}
            className="fl-popup-btn fl-popup-btn--email"
          >
            Send an Email
          </a>
        </div>
      </div>


    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function FreelancingPage({
  name,
  projects,
  techStack,
  whatsappPhone,
  emailAddress,
  whatsappMsg,
  emailSubject,
  emailBody,
}) {
  const pageRef = useScrollReveal();
  const [activeProject, setActiveProject] = useState(null);
  const [activeService, setActiveService] = useState(null);

  const handleOpenProject = useCallback((project) => {
    setActiveProject(project);
  }, []);

  const handleCloseProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <div className="fl-page" ref={pageRef}>
      <WhatsAppFab domainLabel="freelancing work" />

      <MarqueeBanner />
      <Header name={name} />
      <YourBusinessMattersBanner />

      <main>
        <Hero />
        <Stats />
        <Services onOpenService={setActiveService} />
        <FeaturedProjects projects={projects} onOpenProject={handleOpenProject} />
        <OtherProjects projects={projects} onOpenProject={handleOpenProject} />
        <TechStack techStack={techStack} />
        <FAQ />
        <Contact
          whatsappPhone={whatsappPhone}
          emailAddress={emailAddress}
          whatsappMsg={whatsappMsg}
          emailSubject={emailSubject}
          emailBody={emailBody}
        />
        <ClosingAndFooter name={name} />
      </main>

      {activeProject && (
        <DetailPanel project={activeProject} onClose={handleCloseProject} />
      )}

      {activeService && (
        <ServicePopup 
          service={activeService} 
          onClose={() => setActiveService(null)} 
          whatsappPhone={whatsappPhone}
          emailAddress={emailAddress}
        />
      )}
    </div>
  );
}
