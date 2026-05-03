import { SectionHeader } from "./SectionHeader";

export default function Experience({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="experience" title="Experience" subtitle="My professional journey." />
      <div className="space-y-5">
        {items.map((e, index) => (
          <div key={e.id} className="card p-6 sm:p-7 animate-fade-up" style={{ animationDelay: `${index * 90}ms` }}>
            <div className="grid gap-5 lg:grid-cols-[11rem_minmax(0,1fr)] lg:items-start">
              <div>
                <div className="eyebrow mb-2">Timeline</div>
                <div className="font-display text-2xl tracking-[-0.05em]">{e.date}</div>
                {e.location && <div className="mt-2 text-sm text-muted">{e.location}</div>}
              </div>
              <div>
                <div className="font-display font-semibold text-2xl tracking-[-0.04em]">{e.role}</div>
                <div className="mt-1.5 text-sm text-fg/78">
                  {e.companyUrl ? (
                    <a href={e.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {e.company}
                    </a>
                  ) : (
                    e.company
                  )}
                </div>
                {e.points?.length > 0 && (
                  <ul className="mt-4 space-y-2.5 text-sm text-fg/70 list-disc pl-5 max-w-3xl">
                    {e.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
                {e.tags?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
