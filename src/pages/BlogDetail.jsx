import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { blogsData } from '../data/portfolioData';
import Footer from '../components/Footer';

export default function BlogDetail() {
    const { slug } = useParams();
    const blog = blogsData.find((b) => b.slug === slug);

    if (!blog) {
        return (
            <div className="page-container">
                <h1 className="page-title">Blog post not found</h1>
                <Link to="/blogs" className="blog-detail-back">
                    <FiArrowLeft size={14} /> Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="blog-detail">
                <div className="blog-detail-header">
                    <Link to="/blogs" className="blog-detail-back">
                        <FiArrowLeft size={14} /> Back to Blogs
                    </Link>
                    <h1 className="blog-detail-title">{blog.title}</h1>
                    <div className="blog-detail-meta">
                        <span>{blog.date}</span>
                        {blog.views && <span>•</span>}
                        {blog.views && <span>{blog.views} Views</span>}
                    </div>
                </div>

                <div
                    className="blog-detail-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <Footer />
            </div>
        </div>
    );
}
