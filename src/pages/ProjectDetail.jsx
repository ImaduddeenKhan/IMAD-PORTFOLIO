import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import { projectsData } from '../data/portfolioData';
import Footer from '../components/Footer';

export default function ProjectDetail() {
    const { id } = useParams();
    const project = projectsData.find((p) => p.id === id);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        // Fetch project image from backend
        fetch('/api/projects/images')
            .then((res) => res.json())
            .then((data) => {
                if (data.images && data.images[id]) {
                    setImageUrl(data.images[id]);
                }
            })
            .catch(() => {});
    }, [id]);

    if (!project) {
        return (
            <div className="page-container">
                <h1 className="page-title">Project not found</h1>
                <Link to="/projects" className="project-detail-back">
                    <FiArrowLeft size={14} /> Back to Projects
                </Link>
            </div>
        );
    }

    const displayImage = project.image || imageUrl;

    return (
        <div className="page-container">
            <div className="project-detail">
                <Link to="/projects" className="project-detail-back">
                    <FiArrowLeft size={14} /> Back to Projects
                </Link>

                <div className="project-detail-header">
                    {displayImage ? (
                        <img
                            src={displayImage}
                            alt={project.title}
                            className="project-detail-image"
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <div
                            className="project-detail-image"
                            style={{ background: project.gradient }}
                        />
                    )}
                    <h1 className="project-detail-title">{project.title}</h1>
                    {project.stats && (
                        <p className="project-detail-stats">{project.stats}</p>
                    )}
                    <p className="project-detail-desc">{project.description}</p>

                    <div className="project-card-tags" style={{ marginBottom: '20px' }}>
                        {project.tags.map((tag) => (
                            <span key={tag} className="project-tag">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="project-detail-actions">
                        {project.visitUrl && (
                            <a
                                href={project.visitUrl}
                                className="project-btn project-btn-primary"
                                target="_blank"
                                rel="noopener noreferrer"
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
                            >
                                GitHub <FiGithub size={12} />
                            </a>
                        )}
                        {project.blogUrl && (
                            <Link to={project.blogUrl} className="project-btn project-btn-secondary">
                                Read Blog Post
                            </Link>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
