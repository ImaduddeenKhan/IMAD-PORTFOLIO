"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

/* ─── Icon components ─── */
function ProblemIcon() {
  return (
    <svg className="fw-tile-problem-icon" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  );
}

function SolutionIcon() {
  return (
    <svg className="fw-tile-solution-icon" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── Fallback images for tiles without images ─── */
const FALLBACK_IMAGES = [
  "/case-studies/freelancing/fl-email-dashboard.png",
  "/case-studies/freelancing/fl-api-documentation.png",
  "/case-studies/freelancing/fl-customer-portal.png",
  "/case-studies/freelancing/fl-ai-assistant.png",
  "/case-studies/freelancing/fl-recording-platform.png",
  "/case-studies/freelancing/fl-api-portal.png",
];

function getTileImage(project, index) {
  if (project.image) return project.image;
  if (project.imagePair && project.imagePair[0]) return project.imagePair[0].src;
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

/* ─── Summary data for tiles ─── */
const tileSummaries = [
  { problem: "Hundreds of emails requiring manual review", solution: "Multi-agent classification & context pipeline" },
  { problem: "Manual order entry from external partners", solution: "Secure REST API & developer registration portal" },
  { problem: "Repetitive data entry from complex PDFs", solution: "Vision-language extraction for 5 document types" },
  { problem: "Time lost searching DBs for order status", solution: "NLP chat assistant with real-time data access" },
  { problem: "Valuable operational knowledge lost post-call", solution: "Multi-channel active voice recording & transcription" },
  { problem: "Raw voice transcripts were noisy and unusable", solution: "NLP pipeline to clean and structure text for AI" },
  { problem: "Tribal knowledge was unsearchable", solution: "RAG search platform over organizational data" },
  { problem: "Repeated operational errors costing money", solution: "AI post-incident investigator & training generator" },
  { problem: "Writing repetitive replies without context", solution: "AI assistant drafts replies using thread history" },
  { problem: "Manual approval for identical past routes", solution: "Historical pattern matching for auto-approval" },
  { problem: "Inaccurate or limited cost estimation", solution: "Enhanced accuracy & usability of estimator bot" },
  { problem: "Lack of professional customer-facing UI", solution: "Designed marketing & secure registration portals" },
];

/* ═══════════════════════════════════════════════════════════════════
   DETAIL PANEL — Full project information overlay
   ═══════════════════════════════════════════════════════════════════ */

function DetailPanel({ project, onClose }) {
  const panelRef = useRef(null);

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.classList.add("fw-overlay-open");
    return () => document.body.classList.remove("fw-overlay-open");
  }, []);

  /* Scroll panel to top when project changes */
  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [project]);

  if (!project) return null;

  return (
    <div className="fw-detail-overlay fw-detail-overlay--active" role="dialog" aria-modal="true">
      <div className="fw-detail-backdrop" onClick={onClose} />
      <div className="fw-detail-panel" ref={panelRef}>
        {/* Close button */}
        <div className="fw-detail-close">
          <button className="fw-detail-close-btn" onClick={onClose} aria-label="Close detail panel">
            <CloseIcon />
          </button>
        </div>

        {/* Header */}
        <div className="fw-detail-header">
          <div className="fw-detail-header-top">
            <span className="fw-detail-num">{project.num}</span>
            <span className="fw-detail-category">{project.category}</span>
          </div>
          <h3 className="fw-detail-title">{project.title}</h3>
        </div>

        {/* Body */}
        <div className="fw-detail-body">
          {/* Narrative */}
          {project.narrative && (
            <p className="fw-detail-narrative">{project.narrative}</p>
          )}

          {/* Approach */}
          {project.approach && (
            <div className="fw-detail-approach">
              <div className="fw-detail-approach-accent" />
              <div className="fw-detail-approach-content">
                <span className="fw-detail-approach-label">My Approach</span>
                <p className="fw-detail-approach-text">{project.approach}</p>
              </div>
            </div>
          )}

          {/* Details Timeline */}
          {project.details && project.details.length > 0 && (
            <div className="fw-detail-timeline">
              <div className="fw-detail-timeline-line" />
              {project.details.map((d) => (
                <div key={d.label} className="fw-detail-timeline-item">
                  <div className="fw-detail-timeline-marker">
                    <span className="fw-detail-timeline-dot" />
                  </div>
                  <div>
                    <span className="fw-detail-timeline-label">{d.label}</span>
                    <p className="fw-detail-timeline-text">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technical block */}
          {project.technical && (
            <div className="fw-detail-technical">
              <div className="fw-detail-technical-bar">
                <span className="fw-detail-technical-dot fw-detail-technical-dot--r" />
                <span className="fw-detail-technical-dot fw-detail-technical-dot--y" />
                <span className="fw-detail-technical-dot fw-detail-technical-dot--g" />
                <span className="fw-detail-technical-title">Technical Detail</span>
              </div>
              <div className="fw-detail-technical-body">{project.technical}</div>
            </div>
          )}

          {/* Challenge */}
          {project.challenge && (
            <div className="fw-detail-challenge">
              <span className="fw-detail-challenge-icon">⚡</span>
              <div className="fw-detail-challenge-body">
                <span className="fw-detail-challenge-label">Key Challenge</span>
                <p className="fw-detail-challenge-text">{project.challenge}</p>
              </div>
            </div>
          )}

          {/* Single Image */}
          {project.image && (
            <div className="fw-detail-image-wrap">
              <Image
                src={project.image}
                alt={project.imageAlt || project.title}
                width={800}
                height={500}
                quality={90}
                style={{ width: "100%", height: "auto" }}
              />
              {project.imageCaption && (
                <div className="fw-detail-image-caption">{project.imageCaption}</div>
              )}
            </div>
          )}

          {/* Image Pair */}
          {project.imagePair && (
            <div className="fw-detail-image-pair">
              {project.imagePair.map((img) => (
                <div key={img.src} className="fw-detail-image-wrap">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={375}
                    quality={90}
                    style={{ width: "100%", height: "auto" }}
                  />
                  {img.caption && (
                    <div className="fw-detail-image-caption">{img.caption}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN SHOWCASE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function ProjectShowcase({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const isTouchDevice = useRef(false);

  /* Detect touch device */
  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(hover: none)").matches;
  }, []);

  /* Click / tap opens the detail panel */
  const handleOpen = useCallback((project) => {
    setActiveProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <>
      <div className="fw-showcase-grid">
        {projects.map((project, idx) => (
          <div
            key={project.num}
            className="fw-tile"
            onClick={() => handleOpen(project)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen(project);
              }
            }}
          >
            {/* Background Image */}
            <div className="fw-tile-img-wrap">
              <Image
                src={getTileImage(project, idx)}
                alt={project.imageAlt || project.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={75}
                className="fw-tile-img"
              />
            </div>

            {/* Gradient overlay */}
            <div className="fw-tile-gradient" />

            {/* Project number */}
            <span className="fw-tile-num">{project.num}</span>

            {/* Content */}
            <div className="fw-tile-content">
              <span className="fw-tile-category">{project.category}</span>

              <div className="fw-tile-problem">
                <ProblemIcon />
                <span className="fw-tile-problem-text">
                  {tileSummaries[idx]?.problem || project.narrative?.slice(0, 60) + "…"}
                </span>
              </div>

              <div className="fw-tile-solution">
                <SolutionIcon />
                <span className="fw-tile-solution-text">
                  {tileSummaries[idx]?.solution || project.approach?.slice(0, 60) + "…"}
                </span>
              </div>

              <div className="fw-tile-hint">
                <span>Click to explore</span>
                <ArrowIcon />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Overlay */}
      {activeProject && (
        <DetailPanel project={activeProject} onClose={handleClose} />
      )}
    </>
  );
}
