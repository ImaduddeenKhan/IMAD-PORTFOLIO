import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import { DOMAIN_INDEX } from "@/lib/domains";

export default function AIForBusiness() {
  return (
    <section
      id="ai-in-your-business"
      className="section-shell"
      aria-labelledby="ai-in-your-business-heading"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <Sparkles className="h-3.5 w-3.5" /> AI in your business
          </p>
          <h2 id="ai-in-your-business-heading" className="section-h">
            I help 22 industries get their hours and rupees back.
          </h2>
          <p className="section-sub">
            Pick the one closest to your business. Each page is a real plan — 15
            workflows, the math behind the savings, a one-time build cost, a
            monthly run cost, and a WhatsApp button to talk to me directly.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAIN_INDEX.map((d) => {
            const Icon = Icons[d.heroIcon] || Icons.Sparkles;
            return (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="card group flex flex-col gap-3 p-5 transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: `${d.palette.c1}33`,
                  background: `linear-gradient(135deg, ${d.palette.c1}0F 0%, ${d.palette.c2}0A 100%)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: `${d.palette.c1}1A`,
                      color: d.palette.c1,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-fg/40 transition-colors group-hover:text-fg" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-fg">
                    {d.label}
                  </h3>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-fg/50">
                    {d.audience}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-fg/70">
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

        <div className="mt-10 text-center">
          <Link
            href="/heavyhaul-ai"
            className="btn-outline inline-flex items-center gap-2"
          >
            Or read the full HeavyHaul AI case study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
