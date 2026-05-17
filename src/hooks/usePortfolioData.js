import { useState, useEffect } from 'react';
import {
  heroData,
  featuredPost,
  projectsData,
  blogsData,
  experienceData as staticExperienceData,
  aboutData as staticAboutData,
  contactData as staticContactData,
} from '../data/portfolioData';

const API_URL = '/api/content';

// Module-level cache — data is fetched once across all components
let _cache = null;
let _fetchPromise = null;

function fetchContent() {
  if (_cache) return Promise.resolve(_cache);
  if (_fetchPromise) return _fetchPromise;

  _fetchPromise = fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      _cache = data;
      return data;
    })
    .catch((err) => {
      console.warn('Portfolio API unavailable, using static data:', err.message);
      _fetchPromise = null; // allow retry on next mount
      return null;
    });

  return _fetchPromise;
}

/**
 * Custom hook: fetches portfolio data from /api/content with a
 * module-level cache. Falls back to static portfolioData.js when
 * the API is unreachable or returns empty sections.
 */
export function usePortfolioData() {
  const [apiData, setApiData] = useState(_cache);
  const [loading, setLoading] = useState(!_cache);

  useEffect(() => {
    let cancelled = false;
    fetchContent().then((data) => {
      if (!cancelled) {
        setApiData(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Merge API data with static fallbacks ──────────────────

  // Projects
  const projects =
    apiData?.projects?.length > 0 ? apiData.projects : projectsData;

  // Blogs
  const blogs =
    apiData?.blogs?.length > 0 ? apiData.blogs : blogsData;

  // Experience — API stores a flat array; wrap in the static shape
  const experience = {
    ...staticExperienceData,
    timeline:
      apiData?.experience?.length > 0
        ? apiData.experience
        : staticExperienceData.timeline,
  };

  // About — merge API fields but keep sections from static
  const apiAbout = apiData?.about || {};
  const hasApiAbout = Object.keys(apiAbout).length > 0;
  const about = hasApiAbout
    ? {
        ...staticAboutData,
        name: apiAbout.name || staticAboutData.name,
        tagline: apiAbout.tagline || staticAboutData.tagline,
        skills:
          typeof apiAbout.skills === 'string'
            ? apiAbout.skills.split(',').map((s) => s.trim()).filter(Boolean)
            : apiAbout.skills || staticAboutData.skills,
      }
    : staticAboutData;

  // Contact — merge, keep twitterBtn from static
  const apiContact = apiData?.contact || {};
  const hasApiContact = Object.keys(apiContact).length > 0;
  const contact = hasApiContact
    ? { ...staticContactData, ...apiContact }
    : staticContactData;

  return {
    // Always from static (not admin-managed)
    heroData,
    featuredPost,
    // Dynamic with static fallback
    projects,
    blogs,
    experience,
    about,
    contact,
    // Meta
    loading,
    isFromApi: !!apiData,
  };
}
