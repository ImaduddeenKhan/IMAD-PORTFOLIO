import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Footer from '../components/Footer';

export default function About() {
    const { about: aboutData } = usePortfolioData();
    return (
        <div className="page-container">
            <div className="about-section">
                <div className="about-header">
                    <div className="about-avatar">{aboutData.name.charAt(0)}</div>
                    <div className="about-header-info">
                        <h1>{aboutData.name}</h1>
                        <p>{aboutData.tagline}</p>
                    </div>
                </div>

                <div className="about-skills">
                    {aboutData.skills.map((skill) => (
                        <span key={skill} className="about-skill-tag">
                            {skill}
                        </span>
                    ))}
                </div>

                {aboutData.sections.map((section, idx) => (
                    <div key={idx} className="about-block">
                        <h4>{section.title}</h4>
                        <p>{section.content}</p>
                    </div>
                ))}

                <Link to="/contact" className="cta-banner">
                    Get in Touch <FiArrowRight size={14} />
                </Link>
            </div>

            <Footer />
        </div>
    );
}
