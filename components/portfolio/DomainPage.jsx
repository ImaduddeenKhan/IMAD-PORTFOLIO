import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  IndianRupee,
  Sparkles,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import * as Icons from "lucide-react";
import ThemeModeToggle from "@/components/portfolio/ThemeModeToggle";
import WhatsAppFab from "@/components/portfolio/WhatsAppFab";
import DomainHeroArt from "@/components/portfolio/DomainHeroArt";
import { getPublicPortfolio } from "@/lib/site-data";

export const dynamic = "force-dynamic";

const inrFmt = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function formatINR(n) {
  return `₹${inrFmt.format(Math.round(n))}`;
}

function formatLakh(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return formatINR(n);
}

export default async function DomainPage({ domain }) {
  const portfolio = await getPublicPortfolio().catch(() => null);
  const initialMode =
    portfolio?.theme?.preset === "light" || portfolio?.theme?.preset === "minimal"
      ? "light"
      : "dark";
  const name = portfolio?.personalInfo?.fullName || "Imad Khan";

  const HeroIcon = Icons[domain.heroIcon] || Icons.Sparkles;

  // Aggregate totals
  const totals = domain.tasks.reduce(
    (acc, t) => {
      acc.tradHours += t.traditional.hoursPerMonth || 0;
      acc.aiHours += t.ai.hoursPerMonth || 0;
      acc.tradCost += t.traditional.monthlyCost || 0;
      acc.aiCost += t.ai.monthlyCost || 0;
      return acc;
    },
    { tradHours: 0, aiHours: 0, tradCost: 0, aiCost: 0 }
  );
  const monthlySavings = totals.tradCost - totals.aiCost;
  const annualSavings = monthlySavings * 12;
  const hoursSavedMonth = totals.tradHours - totals.aiHours;
  const pctSavings = totals.tradCost
    ? Math.round((monthlySavings / totals.tradCost) * 100)
    : 0;

  const waText = encodeURIComponent(
    `Hi Imad, I came from your ${domain.label} page. I'd like to discuss AI automation for my business.`
  );
  const waHref = `https://wa.me/919125197678?text=${waText}`;

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
          <a href="#tasks" className="topnav-menu-btn">
            See the 15 wins <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative flex min-h-[92vh] items-end overflow-hidden pt-28">
          <div className="container-page pb-12 sm:pb-16 lg:pb-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
              <div className="max-w-4xl">
                <p className="eyebrow animate-fade-up">For {domain.audience}</p>
                <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.4rem]">
                  {domain.headline}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-fg/72 sm:text-lg">
                  {domain.subheadline}
                </p>

                {/* Hook stat strip */}
                <div className="mt-8 inline-flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-border bg-surface/70 p-4 shadow-[0_18px_50px_rgb(0_0_0_/_0.08)]">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: `${domain.palette.accent}22`, color: domain.palette.accent }}
                  >
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-2xl font-semibold tracking-[-0.04em]">
                      {formatLakh(annualSavings)} / year saved
                    </div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      typical {domain.label.toLowerCase()} setup · math shown below
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Talk to Imad on WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href="#tasks" className="btn-outline">See the 15 automations</a>
                  <Link href="/heavyhaul-ai" className="btn-outline">
                    Live case study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {domain.chips.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <DomainHeroArt Icon={HeroIcon} palette={domain.palette} />
                <p className="mt-3 text-center text-[11px] uppercase tracking-[0.22em] text-muted">
                  Built & shipped by {name} — same engineer behind the heavy-haul AI platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PAIN — psychological agitation */}
        <section className="section-shell" id="pain">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1fr]">
              <div>
                <p className="eyebrow">If this sounds like your week</p>
                <h2 className="section-h mt-4">{domain.painHeadline}</h2>
                <p className="section-sub">
                  Read it honestly. If even three of these hit, you are bleeding hours and money you will never get back.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {domain.painPoints.map((p) => (
                  <div key={p} className="card p-6">
                    <div
                      className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ background: `${domain.palette.c1}22`, color: domain.palette.c1 }}
                    >
                      <Clock className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-relaxed text-fg/80">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="section-shell">
          <div className="container-page">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Hours wasted today",
                  value: `${Math.round(totals.tradHours)} hrs`,
                  hint: "team time / month",
                  icon: Clock,
                },
                {
                  label: "Hours after AI",
                  value: `${Math.round(totals.aiHours)} hrs`,
                  hint: `${Math.round(hoursSavedMonth)} hrs returned`,
                  icon: Zap,
                },
                {
                  label: "Monthly cost saved",
                  value: formatLakh(monthlySavings),
                  hint: `${pctSavings}% reduction`,
                  icon: TrendingDown,
                },
                {
                  label: "Annual savings",
                  value: formatLakh(annualSavings),
                  hint: "compounds every year",
                  icon: IndianRupee,
                },
              ].map((m) => (
                <div key={m.label} className="card p-6">
                  <div
                    className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background: `${domain.palette.accent}1f`,
                      color: domain.palette.accent,
                    }}
                  >
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                    {m.value}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                    {m.label}
                  </div>
                  <div className="mt-1 text-xs text-fg/55">{m.hint}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TASKS — the 15 */}
        <section className="section-shell" id="tasks">
          <div className="container-page">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow">The {domain.tasks.length} automations</p>
              <h2 className="section-h mt-4">
                Traditional way → AI way, with the math on the table
              </h2>
              <p className="section-sub">
                Every line item below is a real workflow I have built or could ship inside 2–6 weeks. The numbers use realistic Indian SMB rates ({formatINR(domain.assumedRate)}/hr loaded). Adjust to your scale — the ratio holds.
              </p>
            </div>

            <div className="space-y-5">
              {domain.tasks.map((task, idx) => {
                const TaskIcon = Icons[task.icon] || Icons.Sparkles;
                const saved = (task.traditional.monthlyCost || 0) - (task.ai.monthlyCost || 0);
                const savedHrs = (task.traditional.hoursPerMonth || 0) - (task.ai.hoursPerMonth || 0);
                return (
                  <article
                    key={task.title}
                    className="card overflow-hidden animate-fade-up"
                    style={{ "--enter-delay": `${idx * 35}ms` }}
                  >
                    <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)]">
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                            style={{
                              background: `${domain.palette.c1}22`,
                              color: domain.palette.c1,
                            }}
                          >
                            <TaskIcon className="h-5 w-5" />
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                            {String(idx + 1).padStart(2, "0")} · {task.tag}
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-[1.7rem]">
                          {task.title}
                        </h3>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl border border-border bg-bg/40 p-4">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fg/50">
                              Traditional way
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-fg/75">
                              {task.traditional.how}
                            </p>
                            <ul className="mt-3 space-y-1.5 text-xs text-fg/65">
                              <li>• Time: <strong>{task.traditional.timeText}</strong></li>
                              <li>• Volume: {task.traditional.volumeText}</li>
                              <li>• Total: <strong>{task.traditional.hoursPerMonth} hrs / month</strong></li>
                            </ul>
                          </div>
                          <div
                            className="rounded-2xl border p-4"
                            style={{
                              borderColor: `${domain.palette.accent}55`,
                              background: `${domain.palette.accent}10`,
                            }}
                          >
                            <div
                              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                              style={{ color: domain.palette.accent }}
                            >
                              AI way (what I build)
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-fg/80">
                              {task.ai.how}
                            </p>
                            <ul className="mt-3 space-y-1.5 text-xs text-fg/70">
                              <li>• Time: <strong>{task.ai.timeText}</strong></li>
                              <li>• Human in loop: {task.ai.humanLoop}</li>
                              <li>• Total: <strong>{task.ai.hoursPerMonth} hrs / month</strong></li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface/60 p-4 text-sm">
                          <CheckCircle2 className="h-5 w-5" style={{ color: domain.palette.accent }} />
                          <span className="text-fg/80">
                            <strong>Saves {savedHrs} hrs</strong> & <strong>{formatINR(saved)}</strong> every month —{" "}
                            <span className="text-fg/55">
                              ({task.traditional.hoursPerMonth} hrs × {formatINR(domain.assumedRate)} → {task.ai.hoursPerMonth} hrs × {formatINR(domain.assumedRate)} + {formatINR(task.ai.toolCost || 0)} tools)
                            </span>
                          </span>
                        </div>
                      </div>

                      <div
                        className="border-t border-border p-6 lg:border-l lg:border-t-0"
                        style={{
                          background: `linear-gradient(160deg, ${domain.palette.c1}10, ${domain.palette.c2}10)`,
                        }}
                      >
                        <div className="flex h-full flex-col justify-between gap-5">
                          <div>
                            <div className="eyebrow">What you'll feel</div>
                            <p className="mt-3 text-base leading-relaxed text-fg/85">
                              {task.feels}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <Stat
                              big={`${task.traditional.hoursPerMonth}h`}
                              small="manual / mo"
                              tone="muted"
                            />
                            <Stat
                              big={`${task.ai.hoursPerMonth}h`}
                              small="with AI / mo"
                              tone={domain.palette.accent}
                            />
                            <Stat
                              big={formatINR(task.traditional.monthlyCost)}
                              small="costs you now"
                              tone="muted"
                            />
                            <Stat
                              big={formatINR(saved)}
                              small="back in your pocket"
                              tone={domain.palette.accent}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL ROI BAND */}
        <section className="section-shell" id="roi">
          <div className="container-page">
            <div
              className="overflow-hidden rounded-[2rem] border border-border p-8 sm:p-12"
              style={{
                background: `linear-gradient(135deg, ${domain.palette.c1}28, ${domain.palette.c2}1c, ${domain.palette.accent}22)`,
              }}
            >
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div>
                  <p className="eyebrow">The honest math</p>
                  <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                    {formatLakh(annualSavings)} back every year. <br />
                    {Math.round(hoursSavedMonth * 12)} hours your team gets to live again.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-fg/75">
                    Add a one-time build of <strong>{formatLakh(domain.buildCost)}</strong> and a small monthly run-cost of <strong>{formatINR(domain.monthlyRun)}</strong> for tools. Payback shows up in <strong>{Math.max(1, Math.round((domain.buildCost / Math.max(1, monthlySavings))))} months</strong>. Everything after that is profit.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      WhatsApp Imad now <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <Link href="/" className="btn-outline">
                      See Imad's portfolio
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <BigStat label="One-time build" value={formatLakh(domain.buildCost)} />
                  <BigStat label="Monthly run-cost" value={formatINR(domain.monthlyRun)} />
                  <BigStat
                    label="Monthly savings"
                    value={formatLakh(monthlySavings)}
                    accent={domain.palette.accent}
                  />
                  <BigStat
                    label="Payback period"
                    value={`${Math.max(1, Math.round(domain.buildCost / Math.max(1, monthlySavings)))} mo`}
                    accent={domain.palette.accent}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="section-shell" id="trust">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-start">
              <div>
                <p className="eyebrow">Why people remember Imad</p>
                <h2 className="section-h mt-4">You'll be hiring an engineer who already shipped this.</h2>
                <p className="section-sub">
                  The same systems described above — agentic workflows, document extraction, voice agents, secure APIs, deployment — are running today inside a logistics company I built for. Not slides. Production.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: ShieldCheck, t: "Production-grade systems", d: "13 modules, real users, real money flowing through them — see the heavy-haul case study." },
                  { icon: Sparkles, t: "Industry-aware design", d: "Workflows are designed around how your domain actually moves, not generic ChatGPT wrappers." },
                  { icon: Zap, t: "Fast turnaround", d: "First working slice in 7–14 days, full build in 2–6 weeks for most workflows." },
                  { icon: CheckCircle2, t: "Honest pricing", d: "Fixed-scope quotes. You see the calculation, the build cost, and the payback month before signing." },
                ].map((b) => (
                  <div key={b.t} className="card p-6">
                    <div
                      className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full"
                      style={{
                        background: `${domain.palette.c1}1c`,
                        color: domain.palette.c1,
                      }}
                    >
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div className="font-display text-lg font-semibold tracking-[-0.03em]">{b.t}</div>
                    <p className="mt-2 text-sm leading-relaxed text-fg/72">{b.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section className="section-shell">
          <div className="container-page text-center">
            <p className="eyebrow">Next step is small</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Send one WhatsApp. Get a free workflow audit.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-fg/70">
              I'll look at one painful workflow in your business and tell you, in writing, what it would take to automate it. No deck, no obligation.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp +91 91251 97678
              </a>
              <Link href="/" className="btn-outline">Back to {name}'s portfolio</Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted">
              Built by {name} · AI Automation Engineer
            </p>
          </div>
        </section>
      </main>

      <WhatsAppFab domainLabel={domain.label} />
    </div>
  );
}

function Stat({ big, small, tone }) {
  const isAccent = tone && tone !== "muted";
  return (
    <div
      className="rounded-2xl border border-border bg-surface/70 px-3 py-3"
      style={isAccent ? { borderColor: `${tone}66` } : {}}
    >
      <div
        className="font-display text-xl font-semibold tracking-[-0.03em]"
        style={isAccent ? { color: tone } : {}}
      >
        {big}
      </div>
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">{small}</div>
    </div>
  );
}

function BigStat({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/80 p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
        {label}
      </div>
      <div
        className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
        style={accent ? { color: accent } : {}}
      >
        {value}
      </div>
    </div>
  );
}
