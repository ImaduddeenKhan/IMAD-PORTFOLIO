"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Instagram,
  Sparkles,
  Globe,
  Brain,
  Bike,
  Camera,
  ExternalLink,
  Heart,
  Star,
} from "lucide-react";

export default function Hobbies() {
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

  return (
    <section className="hobbies-section">
      {/* Deep colorful gradient background */}
      <div className="hobbies-bg" aria-hidden="true">
        <div className="hobbies-glow hobbies-glow--1" />
        <div className="hobbies-glow hobbies-glow--2" />
        <div className="hobbies-glow hobbies-glow--3" />
        <div className="hobbies-glow hobbies-glow--4" />
        <div className="hobbies-glow hobbies-glow--5" />
        <div className="hobbies-glow hobbies-glow--6" />
      </div>

      {/* Inner container */}
      <div className="hobbies-inner">
        {/* Section Header */}
        <div id="hobbies" className="scroll-mt-24 hobbies-header animate-fade-up">
          <div className="hobbies-badge">
            <Heart className="w-3.5 h-3.5" />
            <span>The person behind the code</span>
          </div>
          <h2 className="hobbies-title">
            Beyond the{" "}
            <span className="hobbies-title-gradient">Portfolio</span>
          </h2>
          <p className="hobbies-subtitle">
            Life is too colorful to keep in black and white. Here&apos;s a
            glimpse into who I really am.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="hobbies-grid">
          {/* Left Column — Content */}
          <div className="hobbies-content">
            {/* Card 1: Documenting My Journey */}
            <div
              className="hobbies-card hobbies-card--journey animate-fade-up"
              style={{ "--enter-delay": "100ms" }}
            >
              <div className="hobbies-card-accent hobbies-card-accent--coral" />
              <div className="hobbies-card-icon hobbies-card-icon--coral">
                <Camera className="w-5 h-5" />
              </div>
              <div className="hobbies-card-body">
                <h3 className="hobbies-card-title">Documenting My Journey</h3>
                <p className="hobbies-card-text">
                  I am documenting my journey on Instagram — capturing moments,
                  lessons, and the raw process of growing every single day.
                </p>
                <a
                  href="https://www.instagram.com/journeyofkhan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hobbies-link hobbies-link--coral"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@journeyofkhan</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>
                <p className="hobbies-card-text" style={{ marginTop: "0.75rem" }}>
                  I took on a{" "}
                  <strong className="hobbies-strong">707-day challenge</strong>{" "}
                  with seven personal commitments. It&apos;s about discipline,
                  consistency, and proving to myself that I can show up every
                  single day.
                </p>
                <a
                  href="https://www.instagram.com/p/DR-lBLODcuE/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hobbies-link hobbies-link--amber"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>The 707-Day Challenge</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>
              </div>
            </div>

            {/* Card 2: AI Beyond the Surface */}
            <div
              className="hobbies-card hobbies-card--ai animate-fade-up"
              style={{ "--enter-delay": "200ms" }}
            >
              <div className="hobbies-card-accent hobbies-card-accent--violet" />
              <div className="hobbies-card-icon hobbies-card-icon--violet">
                <Brain className="w-5 h-5" />
              </div>
              <div className="hobbies-card-body">
                <h3 className="hobbies-card-title">
                  Exploring AI Beyond the Surface
                </h3>
                <p className="hobbies-card-text">
                  I am deeply focused on understanding AI and how it can be
                  applied in real-world businesses. Recently, I have started
                  working seriously on{" "}
                  <strong className="hobbies-highlight--glow">PRECLAW</strong>,
                  and I will soon begin working on another exciting tool as
                  well.
                </p>
              </div>
            </div>

            {/* Card 3: Exploring the World */}
            <div
              className="hobbies-card hobbies-card--explore animate-fade-up"
              style={{ "--enter-delay": "300ms" }}
            >
              <div className="hobbies-card-accent hobbies-card-accent--teal" />
              <div className="hobbies-card-icon hobbies-card-icon--teal">
                <Globe className="w-5 h-5" />
              </div>
              <div className="hobbies-card-body">
                <h3 className="hobbies-card-title">Exploring the World</h3>
                <p className="hobbies-card-text">
                  I want to explore the world because God has created so many
                  beautiful things, and I believe it is our responsibility to
                  appreciate them. I enjoy meeting people from different
                  cultures, learning from them, having conversations, and most
                  importantly, trying their local food.
                </p>
                <div className="hobbies-bike-note">
                  <Bike className="w-4 h-4 shrink-0" />
                  <p className="hobbies-card-text" style={{ marginTop: 0 }}>
                    I am also passionate about bike rides, although my mother
                    still does not allow me to go on long rides.
                  </p>
                </div>
              </div>
            </div>

            {/* Signature line */}
            <div
              className="hobbies-signature animate-fade-up"
              style={{ "--enter-delay": "400ms" }}
            >
              <span className="hobbies-signature-text">
                That is who I am —{" "}
                <span className="hobbies-signature-name">Imad</span>
              </span>
            </div>
          </div>

          {/* Right Column — Photo Mosaic */}
          <div
            className="hobbies-mosaic animate-fade-up"
            style={{ "--enter-delay": "150ms" }}
          >
            {/* Explore - Larger photo */}
            <div
              className="hobbies-photo hobbies-photo--explore"
              onMouseEnter={() => setHoveredPhoto("explore")}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <Image
                src="/hobbies/explore.jpg"
                alt="Exploring the unseen — silhouette against sunset sky"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className={`hobbies-photo-img ${hoveredPhoto === "explore" ? "hobbies-photo-img--active" : ""}`}
              />
              <div className="hobbies-photo-overlay hobbies-photo-overlay--teal">
                <span className="hobbies-photo-label">Explore</span>
              </div>
              <div className="hobbies-photo-ring hobbies-photo-ring--teal" />
            </div>

            {/* Mountain - Smaller */}
            <div
              className="hobbies-photo hobbies-photo--mountain"
              onMouseEnter={() => setHoveredPhoto("mountain")}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <Image
                src="/hobbies/mountain.jpeg"
                alt="Standing on mountain top at twilight"
                fill
                sizes="(max-width: 768px) 50vw, 170px"
                className={`hobbies-photo-img ${hoveredPhoto === "mountain" ? "hobbies-photo-img--active" : ""}`}
              />
              <div className="hobbies-photo-overlay hobbies-photo-overlay--violet">
                <span className="hobbies-photo-label">Wander</span>
              </div>
              <div className="hobbies-photo-ring hobbies-photo-ring--violet" />
            </div>

            {/* Beach - Smaller */}
            <div
              className="hobbies-photo hobbies-photo--beach"
              onMouseEnter={() => setHoveredPhoto("beach")}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <Image
                src="/hobbies/beach.jpg"
                alt="Walking on the beach with waves"
                fill
                sizes="(max-width: 768px) 50vw, 170px"
                className={`hobbies-photo-img ${hoveredPhoto === "beach" ? "hobbies-photo-img--active" : ""}`}
              />
              <div className="hobbies-photo-overlay hobbies-photo-overlay--coral">
                <span className="hobbies-photo-label">Beach</span>
              </div>
              <div className="hobbies-photo-ring hobbies-photo-ring--coral" />
            </div>

            {/* Speaking */}
            <div
              className="hobbies-photo hobbies-photo--speaking"
              onMouseEnter={() => setHoveredPhoto("speaking")}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <Image
                src="/hobbies/speaking.jpg"
                alt="Speaking at an event with microphone"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className={`hobbies-photo-img ${hoveredPhoto === "speaking" ? "hobbies-photo-img--active" : ""}`}
              />
              <div className="hobbies-photo-overlay hobbies-photo-overlay--amber">
                <span className="hobbies-photo-label">Express</span>
              </div>
              <div className="hobbies-photo-ring hobbies-photo-ring--amber" />
            </div>
          </div>
        </div>

        {/* ── Closing Quote Section ── */}
        <div className="hobbies-closing animate-fade-up" style={{ "--enter-delay": "500ms" }}>
          <div className="hobbies-closing-divider" />
          <div className="hobbies-quote-wrapper">
            <Star className="hobbies-quote-star hobbies-quote-star--left" />
            <blockquote className="hobbies-quote">
              <span className="hobbies-quote-line">
                &ldquo;No matter how the day unfolds,
              </span>
              <span className="hobbies-quote-line hobbies-quote-line--glow">
                always go to bed with a grateful heart.&rdquo;
              </span>
            </blockquote>
            <Star className="hobbies-quote-star hobbies-quote-star--right" />
          </div>
          <p className="hobbies-thanks">
            <Heart className="w-4 h-4 hobbies-thanks-heart" />
            <span>Thank you for reading — it truly means a lot.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
