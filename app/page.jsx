import { notFound } from "next/navigation";
import TopNav from "@/components/portfolio/TopNav";
import Hero from "@/components/portfolio/Hero";
import Building from "@/components/portfolio/Building";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Skills, {
  Education,
  Achievements,
  Certifications,
  Languages,
  Hobbies,
} from "@/components/portfolio/Sections";
import Resume, { About } from "@/components/portfolio/Misc";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import { getPublicPortfolio } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const portfolio = await getPublicPortfolio().catch(() => null);
  if (!portfolio) {
    return { title: "Portfolio unavailable" };
  }

  const title = portfolio.seo?.title || `${portfolio.personalInfo.fullName} — ${portfolio.personalInfo.role || "Portfolio"}`;
  const description = portfolio.seo?.description || portfolio.personalInfo.tagline || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: portfolio.seo?.ogImage ? [portfolio.seo.ogImage] : undefined,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const portfolio = await getPublicPortfolio();
  if (!portfolio) notFound();
  const initialMode = portfolio.theme?.preset === "light" || portfolio.theme?.preset === "minimal" ? "light" : "dark";

  const sections = [
    { id: "home", label: "Home", show: true },
    { id: "about", label: "About", show: !!portfolio.personalInfo?.tagline },
    { id: "building", label: "Building", show: portfolio.building?.length > 0 },
    { id: "projects", label: "Projects", show: portfolio.projects?.length > 0 },
    { id: "experience", label: "Experience", show: portfolio.experience?.length > 0 },
    { id: "education", label: "Education", show: portfolio.education?.length > 0 },
    { id: "skills", label: "Skills", show: portfolio.skills?.length > 0 },
    { id: "achievements", label: "Achievements", show: portfolio.achievements?.length > 0 },
    { id: "certifications", label: "Certifications", show: portfolio.certifications?.length > 0 },
    { id: "languages", label: "Languages", show: portfolio.languages?.length > 0 },
    { id: "hobbies", label: "Hobbies", show: portfolio.hobbies?.length > 0 },
    { id: "resume", label: "Resume", show: !!portfolio.resumeUrl },
    { id: "contact", label: "Contact", show: !!portfolio.contactEmail },
  ].filter((section) => section.show);

  return (
    <div className="min-h-screen">
      <TopNav portfolio={portfolio} sections={sections} initialMode={initialMode} />
      <main>
        <Hero hero={portfolio.hero} personalInfo={portfolio.personalInfo} socials={portfolio.socials} resumeUrl={portfolio.resumeUrl} />
        <div className="container-page py-6 sm:py-8 lg:py-10">
          <About personalInfo={portfolio.personalInfo} />
          <Building items={portfolio.building} sharedVideoUrl={portfolio.hero?.introVideoUrl} />
          <Projects projects={portfolio.projects} sharedVideoUrl={portfolio.hero?.introVideoUrl} />
          <Experience items={portfolio.experience} />
          <Education items={portfolio.education} />
          <Skills groups={portfolio.skills} />
          <Achievements items={portfolio.achievements} />
          <Certifications items={portfolio.certifications} />
          <Languages items={portfolio.languages} />
          <Hobbies items={portfolio.hobbies} />
          <Resume resumeUrl={portfolio.resumeUrl} name={portfolio.personalInfo.fullName} />
          <Contact contactEmail={portfolio.contactEmail} contactMessage={portfolio.contactMessage} />
          <Footer portfolio={portfolio} />
        </div>
      </main>
    </div>
  );
}
