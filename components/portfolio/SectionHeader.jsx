export function SectionHeader({ id, title, subtitle, children }) {
  return (
    <div id={id} className="scroll-mt-24 mb-8 sm:mb-10 flex items-end justify-between flex-wrap gap-4 animate-fade-up">
      <div className="space-y-3">
        <div className="eyebrow">Selected section</div>
        <h2 className="section-h">{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
