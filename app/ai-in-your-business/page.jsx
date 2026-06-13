import Link from "next/link";
import { ArrowUpRight, Sparkles, ArrowLeft, MessageCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { DOMAIN_INDEX } from "@/lib/domains";
import ThemeModeToggle from "@/components/portfolio/ThemeModeToggle";
import { getPublicPortfolio } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI in Your Business — Imaduddeen Khan",
  description:
    "I help 22 industries automate workflows, cut costs, and save hours with custom AI solutions. Pick your industry and see the real plan.",
};

export default async function AIInYourBusinessPage() {
  const portfolio = await getPublicPortfolio().catch(() => null);
  const initialMode =
    portfolio?.theme?.preset === "light" || portfolio?.theme?.preset === "minimal"
      ? "light"
      : "dark";
  const name = portfolio?.personalInfo?.fullName || "Imad Khan";

  return (
    <div className="min-h-screen">
      {/* ─── Top Nav ─── */}
      <header className="topnav-bar">
        <Link
          href="/"
          className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-fg/60 transition-colors hover:text-fg"
        >
          {name}
        </Link>
        <div className="flex items-center gap-3">
          <ThemeModeToggle initialMode={initialMode} compact />
          <Link
            href="/"
            className="topnav-menu-btn"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Portfolio
          </Link>
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-28 pb-16">
          <div className="container-page">
            <div className="mx-auto max-w-4xl text-center">
              <p className="eyebrow justify-center animate-fade-up">
                <Sparkles className="h-3.5 w-3.5" /> AI consulting
              </p>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.04em] leading-[0.9] animate-fade-up" style={{ "--enter-delay": "80ms" }}>
                I help 22 industries get their hours and rupees back.
              </h1>
              <p className="mt-8 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-fg/65 animate-fade-up" style={{ "--enter-delay": "160ms" }}>
                Pick the industry closest to yours below. Each page is a real plan — 15 workflows,
                the math behind the savings, a one-time build cost, a monthly run cost, and a
                WhatsApp button to talk to me directly.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ "--enter-delay": "240ms" }}>
                <a
                  href="#industries"
                  className="btn-primary px-8 py-4 text-base"
                >
                  Explore Industries
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats row ─── */}
        <section className="section-shell">
          <div className="container-page">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {[
                { value: "22", label: "Industries covered" },
                { value: "15", label: "Workflows per plan" },
                { value: "₹0", label: "Consultation fee" },
                { value: "<2min", label: "WhatsApp response" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="card p-6 text-center animate-fade-up"
                  style={{ "--enter-delay": `${i * 70}ms` }}
                >
                  <div className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.05em]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.16em] text-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Industry Grid ─── */}
        <section className="section-shell" id="industries">
          <div className="container-page">
            <div className="mb-12 max-w-3xl">
              <p className="eyebrow">Select your industry</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.04em] leading-[0.95] mt-4">
                Every plan is built around your real workflows.
              </h2>
              <p className="section-sub">
                No generic AI advice. Each page has specific automations, exact costs, and a
                direct line to start building.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DOMAIN_INDEX.map((d, index) => {
                const Icon = Icons[d.heroIcon] || Icons.Sparkles;
                return (
                  <Link
                    key={d.slug}
                    href={`/${d.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex flex-col gap-3 p-6 transition-all duration-500 hover:-translate-y-1 animate-fade-up"
                    style={{
                      borderColor: `${d.palette.c1}33`,
                      background: `linear-gradient(135deg, ${d.palette.c1}0F 0%, ${d.palette.c2}0A 100%)`,
                      "--enter-delay": `${index * 40}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{
                          background: `${d.palette.c1}1A`,
                          color: d.palette.c1,
                        }}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-fg/40 transition-colors group-hover:text-fg" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-fg">
                        {d.label}
                      </h3>
                      <p className="mt-0.5 text-xs uppercase tracking-wider text-fg/50">
                        {d.audience}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-fg/70 flex-1">
                      {d.oneLiner}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs font-semibold tracking-wide text-fg/60">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: d.palette.accent }}
                      />
                      See the 15-workflow plan
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case study CTA section removed — case study accessible only via direct URL */}

        {/* ─── Footer ─── */}
        <footer className="section-shell">
          <div className="container-page text-center">
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} {name}. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
