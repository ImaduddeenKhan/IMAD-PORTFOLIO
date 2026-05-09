import Image from "next/image";
import { youtubeId } from "@/lib/utils";
import { ArrowRight, CirclePlay } from "lucide-react";
import { PlatformIcon } from "@/components/icons";

const DEFAULT_INTRO_VIDEO = "https://youtu.be/DB3D-mtWR0c";

export default function Hero({ hero, personalInfo, socials = [] }) {
  const introVideoId =
    youtubeId(hero?.introVideoUrl) || youtubeId(DEFAULT_INTRO_VIDEO);
  const introThumb = introVideoId
    ? `https://i.ytimg.com/vi/${introVideoId}/hqdefault.jpg`
    : null;
  const avatar = personalInfo.avatar || "/Imad_Hero Image.png";
  const nameParts = (personalInfo?.fullName || "Imad Khan").split(" ");
  const firstName = nameParts[0] || "IMAD";
  const lastName = nameParts.slice(1).join(" ") || "KHAN";
  const roleWords = (personalInfo?.role || "AI Engineer").split(" ");

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* ─── Three-column hero grid ─── */}
        <div className="hero-grid">
          {/* LEFT COLUMN — role, greeting, description, CTAs, socials */}
          <div className="hero-left">
            {/* Large role text */}
            <div className="hero-role-text animate-fade-up">
              {roleWords.map((w, i) => (
                <span key={i}>{w.toUpperCase()}</span>
              ))}
            </div>

            {/* Greeting */}
            {hero?.greeting && (
              <p
                className="hero-greeting animate-fade-up"
                style={{ "--enter-delay": "100ms" }}
              >
                {hero.greeting}
              </p>
            )}

            {/* Description */}
            {(hero?.description || personalInfo?.tagline) && (
              <p
                className="hero-desc animate-fade-up"
                style={{ "--enter-delay": "180ms" }}
              >
                {hero?.description || personalInfo.tagline}
              </p>
            )}

            {/* CTA Buttons */}
            <div
              className="hero-ctas animate-fade-up"
              style={{ "--enter-delay": "260ms" }}
            >
              {hero?.ctaLabel && hero?.ctaUrl && (
                <a href={hero.ctaUrl} className="btn-primary">
                  {hero.ctaLabel} <ArrowRight className="h-4 w-4" />
                </a>
              )}
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="btn-outline"
                >
                  Let&apos;s talk
                </a>
              )}
            </div>

            {/* Social icons */}
            {socials.length > 0 && (
              <div
                className="hero-socials animate-fade-up"
                style={{ "--enter-delay": "340ms" }}
              >
                {socials.slice(0, 6).map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="hero-social-icon"
                  >
                    <PlatformIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* CENTER COLUMN — Large portrait photo */}
          <div className="hero-center animate-fade-up" style={{ "--enter-delay": "120ms" }}>
            <div className="hero-photo-wrapper">
              <div className="hero-photo-glow" aria-hidden="true" />
              <Image
                src={avatar}
                alt={personalInfo?.fullName || "Portrait"}
                width={520}
                height={680}
                priority
                className="hero-photo"
              />
            </div>
          </div>

          {/* RIGHT COLUMN — Name + intro video */}
          <div className="hero-right">
            {/* Large name text */}
            <div className="hero-name-text animate-fade-up" style={{ "--enter-delay": "80ms" }}>
              <span>{firstName.toUpperCase()}</span>
              <span>{lastName.toUpperCase()}</span>
            </div>

            {/* Intro video card */}
            {introThumb && (
              <div
                className="hero-video-card card motion-card animate-fade-up"
                style={{ "--enter-delay": "200ms" }}
              >
                <div className="motion-media relative overflow-hidden rounded-[1.4rem] aspect-video bg-bg">
                  <Image
                    src={introThumb}
                    alt="My Intro"
                    fill
                    sizes="(max-width: 1024px) 90vw, 380px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.25)] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <CirclePlay className="h-7 w-7 text-fg" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 px-4 pb-4">
                    <p className="text-[0.6rem] uppercase tracking-[0.22em] text-white/55 mb-0.5">
                      Watch
                    </p>
                    <p className="text-sm font-display font-semibold tracking-[-0.02em] text-white leading-tight">
                      My Intro
                    </p>
                  </div>
                  <a
                    href={hero?.introVideoUrl || DEFAULT_INTRO_VIDEO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                    aria-label="Watch intro video on YouTube"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
