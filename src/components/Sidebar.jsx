import { NavLink } from 'react-router-dom';
import {
    FiHome, FiBriefcase, FiCode, FiEdit3, FiUser, FiMail,
    FiExternalLink, FiMenu, FiX
} from 'react-icons/fi';
import {
    FaXTwitter, FaLinkedinIn, FaGithub, FaMedium, FaInstagram
} from 'react-icons/fa6';
import { navLinks, socialLinks } from '../data/portfolioData';

const iconMap = {
    home: FiHome,
    briefcase: FiBriefcase,
    code: FiCode,
    edit: FiEdit3,
    user: FiUser,
    mail: FiMail,
};

const socialIconMap = {
    twitter: FaXTwitter,
    linkedin: FaLinkedinIn,
    github: FaGithub,
    medium: FaMedium,
    instagram: FaInstagram,
};

export default function Sidebar({ isOpen, onToggle }) {
    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                className="mobile-menu-toggle"
                onClick={onToggle}
                aria-label="Toggle menu"
            >
                {isOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Overlay for mobile */}
            <div
                className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={onToggle}
            />

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Brand Logo */}
                <div className="sidebar-brand">
                    <div className="sidebar-brand-icon">
                        <span className="brand-ai">AI</span>
                    </div>
                    <div className="sidebar-brand-text">
                        <h3>AI with Imad</h3>
                        <p>AI Engineer & Freelancer</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    <ul className="sidebar-nav-list">
                        {navLinks.map((link) => {
                            const Icon = iconMap[link.icon];
                            return (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        end={link.path === '/'}
                                        className={({ isActive }) =>
                                            `sidebar-nav-link ${isActive ? 'active' : ''}`
                                        }
                                        onClick={() => isOpen && onToggle()}
                                    >
                                        <span className="nav-icon">
                                            {Icon && <Icon />}
                                        </span>
                                        {link.name}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Social Links */}
                <div className="sidebar-connect">
                    <p className="sidebar-connect-title">Connect</p>
                    <ul className="sidebar-social-list">
                        {socialLinks.map((social) => {
                            const SocialIcon = socialIconMap[social.icon];
                            return (
                                <li key={social.name}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="sidebar-social-link"
                                    >
                                        <span className="social-icon">
                                            {SocialIcon && <SocialIcon size={14} />}
                                            {social.name}
                                        </span>
                                        <FiExternalLink className="external-icon" />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>
        </>
    );
}
