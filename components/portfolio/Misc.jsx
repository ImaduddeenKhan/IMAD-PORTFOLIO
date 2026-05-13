import { Download, FileText } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export default function Resume({ resumeUrl, name }) {
  if (!resumeUrl) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="resume" title="Resume" subtitle="Download my full CV." />
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="card motion-card p-6 inline-flex items-center gap-4"
      >
        <div className="h-14 w-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center border border-border">
          <FileText className="h-6 w-6 text-fg" />
        </div>
        <div className="flex-1">
          <div className="font-display text-xl tracking-[-0.03em]">{name ? `${name} — Resume.pdf` : "Resume.pdf"}</div>
          <div className="text-xs text-muted mt-1">Open the latest resume in Google Drive</div>
        </div>
        <Download className="h-5 w-5 text-muted" />
      </a>
    </section>
  );
}

export function About({ personalInfo }) {
  if (!personalInfo?.tagline && !personalInfo?.location && !personalInfo?.email) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="about" title="About" />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
        <div className="card motion-card p-7 sm:p-8 animate-fade-up">
          {personalInfo.tagline && <p className="font-display text-2xl sm:text-3xl tracking-[-0.05em] leading-[1.12] text-fg/92">{personalInfo.tagline}</p>}
          <p className="mt-5 text-sm text-fg/70 leading-relaxed max-w-2xl">
            I build portfolio-grade products with strong product taste, careful visual polish, and engineering discipline focused on real outcomes.
          </p>
        </div>
        <div className="card motion-card p-6 sm:p-7 space-y-4 animate-fade-up" style={{ "--enter-delay": "100ms" }}>
          {personalInfo.location && (
            <div>
              <div className="eyebrow mb-2">Location</div>
              <div className="text-sm text-fg/78">{personalInfo.location}</div>
            </div>
          )}
          {personalInfo.email && (
            <div>
              <div className="eyebrow mb-2">Contact</div>
              <a href={`mailto:${personalInfo.email}`} className="text-sm text-fg/78 hover:text-fg transition-colors break-all">
                {personalInfo.email}
              </a>
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <div className="eyebrow mb-2">Phone</div>
              <div className="text-sm text-fg/78">{personalInfo.phone}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
