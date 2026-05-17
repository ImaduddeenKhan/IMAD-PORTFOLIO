import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Footer from '../components/Footer';

export default function Home() {
    const { heroData, featuredPost, projects } = usePortfolioData();
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);
    const [projectImages, setProjectImages] = useState({});

    useEffect(() => {
        fetch('/api/projects/images')
            .then((res) => res.json())
            .then((data) => setProjectImages(data.images || {}))
            .catch(() => {});
    }, []);

    return (
        <div className="page-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-top">
                    <div className="hero-text">
                        <h1 className="hero-greeting">{heroData.greeting} <span className="hero-wave">👋</span></h1>
                        <h2 className="hero-role">{heroData.role}</h2>
                    </div>
                    <div className="hero-dp-wrapper">
                        <img
                            src="/profile-placeholder.png"
                            alt="Imad — AI Engineer"
                            className="hero-dp"
                        />
                        <div className="hero-dp-glow" />
                    </div>
                </div>

                {heroData.twitterBtn.url !== '#' && (
                    <a
                        href={heroData.twitterBtn.url}
                        className="hero-twitter-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaXTwitter size={16} />
                        <span>{heroData.twitterBtn.label}</span>
                    </a>
                )}

                <p className="hero-description">{heroData.description}</p>

                <div className="hero-highlights">
                    {heroData.highlights.map((item, idx) => (
                        <span key={idx} className="hero-highlight-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                            {item.link ? (
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.text}
                                </a>
                            ) : (
                                item.text
                            )}
                        </span>
                    ))}
                </div>
            </section>

            {/* Featured Blog Card */}
            <Link to={featuredPost.link} className="featured-card">
                <div
                    className="featured-card-image"
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                />
                <div className="featured-card-content">
                    <span className="featured-card-label">{featuredPost.label}</span>
                    <h3 className="featured-card-title">{featuredPost.title}</h3>
                    <p className="featured-card-desc">{featuredPost.description}</p>
                    <span className="featured-card-link">
                        Read more <FiArrowRight size={14} />
                    </span>
                </div>
            </Link>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Projects</h2>
                        <Link to="/projects" style={{ fontSize: '0.875rem', color: 'var(--text-link)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            View all <FiArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="projects-grid">
                        {featuredProjects.map((project, idx) => {
                            const imageUrl =
                                project.image || projectImages[project.id] || null;

                            return (
                                <Link
                                    to={`/projects/${project.id}`}
                                    key={project.id}
                                    className="project-card"
                                    style={{ animationDelay: `${idx * 0.08}s` }}
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={project.title}
                                            className="project-card-image"
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div
                                            className="project-card-image"
                                            style={{ background: project.gradient }}
                                        />
                                    )}
                                    <div className="project-card-body">
                                        <div className="project-card-header">
                                            <h3 className="project-card-title">{project.title}</h3>
                                            {project.featured && (
                                                <FiStar className="project-card-star" size={14} />
                                            )}
                                        </div>
                                        <div className={`project-card-status ${project.status}`}>
                                            <span className="status-dot" />
                                            {project.status}
                                        </div>
                                        <p className="project-card-desc">{project.description}</p>
                                        <div className="project-card-tags">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="project-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* CTA */}
            <Link to="/contact" className="cta-banner">
                Reach out <FiArrowRight size={14} />
            </Link>

            <Footer />
        </div>
    );
}
