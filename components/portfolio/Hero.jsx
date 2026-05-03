import Image from "next/image";
import { youtubeEmbedUrl } from "@/lib/utils";
import { ArrowRight, CirclePlay, Mail, MapPin, Sparkles } from "lucide-react";

export default function Hero({ hero, personalInfo }) {
  const embed = youtubeEmbedUrl(hero?.introVideoUrl);
  const initials = (personalInfo?.fullName || "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const highlights = [
    { label: "Focus", value: personalInfo?.role || "AI Engineer", icon: Sparkles },
    { label: "Based in", value: personalInfo?.location, icon: MapPin },
    { label: "Reach me", value: personalInfo?.email, icon: Mail },
  ].filter((item) => item.value);

  return (
    <section id="home" className="pt-4 pb-12 sm:pt-8 sm:pb-16">
      <div className="grid gap-6 xl:gap-8 lg:grid-cols-[minmax(0,1.08fr)_24rem] xl:grid-cols-[minmax(0,1.04fr)_27rem] items-start">
        <div className="card motion-card relative overflow-hidden p-7 sm:p-10 xl:p-12">
          <div
            className="hero-accent absolute right-0 top-0 h-48 w-48 -translate-y-12 translate-x-10 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="eyebrow animate-fade-up">Independent portfolio</div>
            {hero?.greeting && (
              <p className="mt-4 text-sm text-muted animate-fade-up" style={{ "--enter-delay": "80ms" }}>
                {hero.greeting}
              </p>
            )}
            <h1
              className="mt-4 font-display text-[clamp(3.2rem,8vw,6.5rem)] font-semibold tracking-[-0.06em] leading-[0.92] animate-fade-up"
              style={{ "--enter-delay": "140ms" }}
            >
              {hero?.headline || personalInfo.role || personalInfo.fullName}
            </h1>
            {(hero?.description || personalInfo.tagline) && (
              <p
                className="mt-6 max-w-2xl text-base sm:text-lg text-fg/74 leading-relaxed animate-fade-up"
                style={{ "--enter-delay": "220ms" }}
              >
                {hero?.description || personalInfo.tagline}
              </p>
            )}
            {(hero?.ctaLabel || personalInfo.email) && (
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ "--enter-delay": "300ms" }}>
                {hero?.ctaLabel && hero?.ctaUrl && (
                  <a href={hero.ctaUrl} className="btn-primary">
                    {hero.ctaLabel} <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="btn-outline">
                    Let&apos;s talk
                  </a>
                )}
              </div>
            )}

            {highlights.length > 0 && (
              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="motion-card rounded-[1.6rem] border border-border bg-surface/72 px-4 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.05)] animate-fade-up"
                      style={{ "--enter-delay": `${380 + index * 90}ms` }}
                    >
                      <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-[0.2em]">
                        <Icon className="h-3.5 w-3.5" />
                        {item.label}
                      </div>
                      <div className="mt-3 text-sm sm:text-[0.95rem] leading-relaxed text-fg/80">{item.value}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 lg:sticky lg:top-8">
          <div className="card motion-card p-4 sm:p-5 animate-fade-up" style={{ "--enter-delay": "220ms" }}>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <div className="eyebrow">Profile panel</div>
                <div className="mt-2 font-display text-xl tracking-[-0.04em]">{personalInfo.fullName}</div>
              </div>
              <span className="chip">Open for work</span>
            </div>
            <div className="motion-media relative overflow-hidden rounded-[1.8rem] border border-border bg-[radial-gradient(circle_at_top,_rgb(var(--accent)/0.16),_transparent_34%),linear-gradient(180deg,_rgb(var(--surface)),_rgb(var(--bg)))] aspect-[4/5]">
              {personalInfo.avatar ? (
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.fullName || "Portrait"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="profile-shell relative flex h-40 w-40 items-center justify-center rounded-full border border-fg/10 bg-surface/90 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
                    <div className="absolute inset-3 rounded-full border border-dashed border-border animate-float-soft" />
                    <span className="font-display text-5xl tracking-[-0.08em]">{initials}</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/88 to-transparent px-6 pb-6 pt-20">
                <p className="eyebrow text-fg/55">Current role</p>
                <p className="mt-2 text-lg font-display tracking-[-0.03em]">{personalInfo.role || personalInfo.fullName}</p>
                {personalInfo.tagline && <p className="mt-2 text-sm text-fg/68 leading-relaxed">{personalInfo.tagline}</p>}
              </div>
            </div>
          </div>

          {embed && (
            <div className="card motion-card p-4 sm:p-5 animate-fade-up" style={{ "--enter-delay": "320ms" }}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <div className="eyebrow">Intro video</div>
                  <p className="mt-2 text-sm text-fg/70">Personal YouTube intro for your portfolio hero.</p>
                </div>
                {hero?.introVideoUrl && (
                  <a href={hero.introVideoUrl} target="_blank" rel="noopener noreferrer" className="chip">
                    <CirclePlay className="h-3.5 w-3.5 mr-1" /> YouTube
                  </a>
                )}
              </div>
              <div className="motion-media relative aspect-video overflow-hidden rounded-[1.6rem] border border-border bg-bg">
                <iframe
                  src={embed}
                  title="Intro video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
