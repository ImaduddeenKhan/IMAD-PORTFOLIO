import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Footer from '../components/Footer';

export default function Experience() {
    const { experience: experienceData } = usePortfolioData();
    return (
        <div className="page-container">
            <h1 className="page-title">Experience</h1>
            <p className="page-subtitle">{experienceData.subtitle}</p>

            <div className="timeline">
                {experienceData.timeline.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                        <p className="timeline-date">{item.date}</p>
                        <h3 className="timeline-role">{item.role}</h3>
                        {item.companyUrl ? (
                            <a
                                href={item.companyUrl}
                                className="timeline-company"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.company}
                            </a>
                        ) : (
                            <p className="timeline-company">{item.company}</p>
                        )}
                        <ul className="timeline-points">
                            {item.points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                        <div className="timeline-tags">
                            {item.tags.map((tag) => (
                                <span key={tag} className="timeline-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <a
                    href="/resume.pdf"
                    target="_blank"
                    className="project-btn project-btn-primary"
                >
                    View Full Resume
                </a>
                <Link to="/contact" className="cta-banner" style={{ marginTop: 0 }}>
                    Reach out <FiArrowRight size={14} />
                </Link>
            </div>

            <Footer />
        </div>
    );
}
