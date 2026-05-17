import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('admin_token', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.detail || 'Invalid credentials');
            }
        } catch {
            setError('Could not connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-login-icon">
                        <FiLock size={24} />
                    </div>
                    <h1>Admin Access</h1>
                    <p>Sign in to manage your portfolio content</p>
                </div>

                <form onSubmit={handleLogin} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="admin-user" className="form-label">Username</label>
                        <div className="admin-input-wrapper">
                            <FiUser className="admin-input-icon" />
                            <input
                                id="admin-user"
                                type="text"
                                className="form-input admin-input"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="admin-pass" className="form-label">Password</label>
                        <div className="admin-input-wrapper">
                            <FiLock className="admin-input-icon" />
                            <input
                                id="admin-pass"
                                type="password"
                                className="form-input admin-input"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="admin-error">{error}</div>
                    )}

                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'} <FiArrowRight size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
}
