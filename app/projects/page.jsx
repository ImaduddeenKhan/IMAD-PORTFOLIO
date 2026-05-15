import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Projects from "@/components/portfolio/Projects";
import { getPublicPortfolio } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Projects · Imaduddeen Khan",
  description:
    "A complete catalogue of AI products, agents, RAG systems and full-stack apps shipped by Imaduddeen Khan.",
  alternates: { canonical: "/projects" },
};

export default async function AllProjectsPage() {
  const portfolio = await getPublicPortfolio();
  if (!portfolio) notFound();

  return (
    <div className="min-h-screen">
      <header className="topnav-bar">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-fg/60 hover:text-fg transition-colors"
        >
          {portfolio.personalInfo.fullName}
        </Link>
        <Link href="/" className="topnav-menu-btn">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
        </Link>
      </header>

      <main className="container-page pt-28 pb-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Selected work</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-[-0.04em]">
            All projects
          </h1>
          <p className="mt-4 text-fg/70 text-lg leading-relaxed">
            Every AI product, automation and full-stack app I&apos;ve shipped — RAG systems,
            agents, voice bots, document intelligence, dashboards and more.
          </p>
        </div>

        <div className="mt-10">
          <Projects
            projects={portfolio.projects || []}
            sharedVideoUrl={portfolio.hero?.introVideoUrl}
            limit={null}
            showExploreAll={false}
          />
        </div>
      </main>
    </div>
  );
}
