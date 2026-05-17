import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiExternalLink, FiGithub } from 'react-icons/fi';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Footer from '../components/Footer';

export default function Projects() {
    const { projects } = usePortfolioData();
    const [projectImages, setProjectImages] = useState({});

    useEffect(() => {
        // Fetch uploaded project images from backend
        fetch('/api/projects/images')
            .then((res) => res.json())
            .then((data) => setProjectImages(data.images || {}))
            .catch(() => {}); // Silently fail if backend is not running
    }, []);

    return (
        <div className="page-container">
            <h1 className="page-title">Projects</h1>
            <p className="page-subtitle">
                Production and experimental products — from AI agents to full-stack apps.
            </p>

            <div className="projects-grid">
                {projects.map((project) => {
                    const imageUrl =
                        project.image || projectImages[project.id] || null;

                    return (
                        <div key={project.id} className="project-card">
                            <Link to={`/projects/${project.id}`}>
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
                            </Link>
                            <div className="project-card-body">
                                <div className="project-card-header">
                                    <Link to={`/projects/${project.id}`}>
                                        <h3 className="project-card-title">{project.title}</h3>
                                    </Link>
                                    {project.featured && (
                                        <FiStar
                                            className="project-card-star"
                                            size={14}
                                            fill="#eab308"
                                        />
                                    )}
                                </div>
                                {project.stats && (
                                    <p style={{ fontSize: '0.75rem', color: '#71717a', marginBottom: '6px', fontWeight: 500 }}>
                                        {project.stats}
                                    </p>
                                )}
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
                                <div className="project-card-actions">
                                    {project.visitUrl && (
                                        <a
                                            href={project.visitUrl}
                                            className="project-btn project-btn-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Visit <FiExternalLink size={12} />
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            className="project-btn project-btn-secondary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            GitHub <FiGithub size={12} />
                                        </a>
                                    )}
                                    {project.blogUrl && (
                                        <Link
                                            to={project.blogUrl}
                                            className="project-btn project-btn-secondary"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Blog
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Footer />
        </div>
    );
}
