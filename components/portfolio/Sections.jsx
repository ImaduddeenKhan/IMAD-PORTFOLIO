import { SectionHeader } from "./SectionHeader";

export default function Skills({ groups = [] }) {
  if (!groups.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="skills" title="Skills" subtitle="Tools & tech I work with." />
      <div className="grid sm:grid-cols-2 gap-5">
        {groups.map((g, index) => (
          <div key={g.id} className="card p-6 sm:p-7 animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="eyebrow">Capability</div>
              <div className="text-xs text-muted">{String(index + 1).padStart(2, "0")}</div>
            </div>
            <div className="font-display text-2xl tracking-[-0.04em] mb-4">{g.category}</div>
            <div className="flex flex-wrap gap-2.5">
              {g.items?.map((it) => (
                <span key={it} className="chip">{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Education({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="education" title="Education" />
      <div className="space-y-4">
        {items.map((e, index) => (
          <div key={e.id} className="card p-6 sm:p-7 animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
            <div className="grid gap-4 lg:grid-cols-[11rem_minmax(0,1fr)]">
              <div className="text-sm text-muted">{e.date}{e.location ? ` · ${e.location}` : ""}</div>
              <div>
                <div className="font-display font-semibold text-2xl tracking-[-0.04em]">{e.degree}</div>
                <div className="text-sm text-fg/80 mt-1.5">{e.institution}</div>
                {e.description && <p className="mt-4 text-sm text-fg/70 leading-relaxed max-w-3xl">{e.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Achievements({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="achievements" title="Achievements" />
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((a, index) => (
          <div key={a.id} className="card p-6 animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className="font-display font-semibold text-xl tracking-[-0.04em]">{a.title}</div>
              {a.date && <div className="text-xs text-muted">{a.date}</div>}
            </div>
            {a.description && <p className="mt-3 text-sm text-fg/70 leading-relaxed">{a.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Certifications({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="certifications" title="Certifications" />
      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map((c) => (
          <li key={c.id} className="card p-5 flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg tracking-[-0.03em]">{c.name}</div>
              <div className="text-xs text-muted mt-0.5">
                {[c.issuer, c.date].filter(Boolean).join(" · ")}
              </div>
            </div>
            {c.url && (
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-outline shrink-0 text-xs px-3 py-2">
                View
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Languages({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="languages" title="Languages" />
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((l, index) => (
          <div key={l.id} className="card px-5 py-4 animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
            <div className="font-display text-lg tracking-[-0.03em]">{l.name}</div>
            {l.level && <div className="text-xs text-muted">{l.level}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Hobbies({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="section-shell">
      <SectionHeader id="hobbies" title="Hobbies" />
      <div className="flex flex-wrap gap-3">
        {items.map((h, index) => (
          <span key={h.id} className="chip text-sm py-2 px-4 animate-fade-up" style={{ animationDelay: `${index * 50}ms` }}>{h.name}</span>
        ))}
      </div>
    </section>
  );
}
