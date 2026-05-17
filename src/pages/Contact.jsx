import { useState } from 'react';
import { FiArrowRight, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Footer from '../components/Footer';

export default function Contact() {
    const { contact: contactData } = usePortfolioData();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'
    const [statusMsg, setStatusMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const body = new FormData();
            body.append('name', formData.name);
            body.append('email', formData.email);
            body.append('message', formData.message);

            const res = await fetch('/api/contact', {
                method: 'POST',
                body,
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setStatusMsg(data.message || 'Message sent!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setStatusMsg(data.detail || 'Something went wrong.');
            }
        } catch {
            setStatus('error');
            setStatusMsg('Could not connect to server. Please try again later.');
        }

        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <div className="page-container">
            <div className="contact-section">
                <h1>{contactData.title}</h1>
                <h2>{contactData.subtitle}</h2>

                {contactData.twitterBtn.url !== '#' && (
                    <a
                        href={contactData.twitterBtn.url}
                        className="hero-twitter-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaXTwitter size={16} />
                        <span>{contactData.twitterBtn.label}</span>
                    </a>
                )}

                <div style={{ marginTop: '32px' }}>
                    <h3 className="section-title">Send a Message</h3>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="contact-name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="contact-name"
                                name="name"
                                className="form-input"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="contact-email"
                                name="email"
                                className="form-input"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-message" className="form-label">
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                className="form-textarea"
                                placeholder="Tell me about your project..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {status && (
                            <div
                                className={`form-status ${status}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    marginBottom: '12px',
                                    background:
                                        status === 'success'
                                            ? 'rgba(34, 197, 94, 0.1)'
                                            : status === 'error'
                                            ? 'rgba(239, 68, 68, 0.1)'
                                            : 'rgba(59, 130, 246, 0.1)',
                                    color:
                                        status === 'success'
                                            ? '#22c55e'
                                            : status === 'error'
                                            ? '#ef4444'
                                            : '#3b82f6',
                                }}
                            >
                                {status === 'success' && <FiCheck size={16} />}
                                {status === 'error' && <FiAlertCircle size={16} />}
                                {status === 'loading' ? 'Sending...' : statusMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="form-submit"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}{' '}
                            <FiArrowRight size={14} />
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
