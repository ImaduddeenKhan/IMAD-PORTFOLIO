import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Footer from '../components/Footer';

export default function Blogs() {
    const { blogs } = usePortfolioData();
    return (
        <div className="page-container">
            <h1 className="page-title">Pensieve</h1>
            <p className="page-subtitle">
                Technical blogs and practical notes on AI engineering, agents, automations, and building products.
            </p>

            <div className="blogs-grid">
                {blogs.map((blog) => (
                    <Link
                        to={`/blogs/${blog.slug}`}
                        key={blog.slug}
                        className="blog-card"
                    >
                        <div className="blog-card-content">
                            <h3 className="blog-card-title">{blog.title}</h3>
                            <p className="blog-card-desc">{blog.description}</p>
                            <div className="blog-card-meta">
                                <span className="blog-card-date">{blog.date}</span>
                                {blog.views && (
                                    <span className="blog-card-views">{blog.views} Views</span>
                                )}
                            </div>
                        </div>
                        <FiChevronRight className="blog-card-arrow" />
                    </Link>
                ))}
            </div>

            <Footer />
        </div>
    );
}
