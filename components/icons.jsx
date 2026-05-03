import {
  FaGithub, FaLinkedin, FaTwitter, FaMedium, FaInstagram, FaYoutube,
  FaGlobe, FaEnvelope, FaDribbble, FaBehance, FaStackOverflow,
} from "react-icons/fa6";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  x: FaTwitter,
  medium: FaMedium,
  instagram: FaInstagram,
  youtube: FaYoutube,
  email: FaEnvelope,
  mail: FaEnvelope,
  website: FaGlobe,
  dribbble: FaDribbble,
  behance: FaBehance,
  stackoverflow: FaStackOverflow,
};

export function PlatformIcon({ platform, className = "h-4 w-4" }) {
  const key = String(platform || "").toLowerCase();
  const Icon = ICONS[key] || FaGlobe;
  return <Icon className={className} aria-hidden="true" />;
}

export const SOCIAL_PLATFORMS = Object.keys(ICONS);
