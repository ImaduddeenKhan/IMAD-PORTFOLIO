import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiCode, FiEdit3, FiBriefcase, FiUser, FiMail, FiLogOut,
    FiPlus, FiTrash2, FiSave, FiImage, FiYoutube, FiX
} from 'react-icons/fi';

const API = '/api/admin';

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    };
}

function getAuthHeaders() {
    return {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    };
}

// ─── Tabs ─────────────────────────────────────────────────
const TABS = [
    { id: 'projects', label: 'Projects', icon: FiCode },
    { id: 'blogs', label: 'Blogs', icon: FiEdit3 },
    { id: 'experience', label: 'Experience', icon: FiBriefcase },
    { id: 'about', label: 'About', icon: FiUser },
    { id: 'contact', label: 'Contact', icon: FiMail },
];

// ─── Project Editor ───────────────────────────────────────
function ProjectEditor({ project, onSave, onDelete, onCancel }) {
    const [form, setForm] = useState({
        id: '', title: '', description: '', stats: '', status: 'active',
        tags: '', featured: false, visitUrl: '', githubUrl: '', blogUrl: '',
        youtubeUrl: '', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        ...project,
        tags: Array.isArray(project?.tags) ? project.tags.join(', ') : (project?.tags || ''),
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('project_id', form.id || 'temp');
        try {
            const res = await fetch('/api/admin/upload-image', {
                method: 'POST', headers: getAuthHeaders(), body: fd,
            });
            const data = await res.json();
            if (data.url) {
                setForm(f => ({ ...f, image: data.url }));
                setThumbnail(data.url);
            }
        } catch (err) { console.error(err); }
        setUploading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...form,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        });
    };

    return (
        <div className="admin-editor">
            <div className="admin-editor-header">
                <h3>{project?.id ? 'Edit Project' : 'New Project'}</h3>
                <button className="admin-icon-btn" onClick={onCancel}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-row">
                    <div className="form-group">
                        <label className="form-label">Project ID (slug)</label>
                        <input className="form-input" name="id" value={form.id} onChange={handleChange} required placeholder="my-project" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input className="form-input" name="title" value={form.title} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} required />
                </div>
                <div className="admin-form-row">
                    <div className="form-group">
                        <label className="form-label">Stats</label>
                        <input className="form-input" name="stats" value={form.stats} onChange={handleChange} placeholder="e.g., 1K+ Users" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select className="form-input" name="status" value={form.status} onChange={handleChange}>
                            <option value="active">Active</option>
                            <option value="archived">Archived</option>
                            <option value="wip">Work in Progress</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Tags (comma separated)</label>
                    <input className="form-input" name="tags" value={form.tags} onChange={handleChange} placeholder="AI, Python, React" />
                </div>
                <div className="admin-form-row">
                    <div className="form-group">
                        <label className="form-label">Visit URL</label>
                        <input className="form-input" name="visitUrl" value={form.visitUrl} onChange={handleChange} placeholder="https://..." />
                    </div>
                    <div className="form-group">
                        <label className="form-label">GitHub URL</label>
                        <input className="form-input" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="form-group">
                        <label className="form-label">Blog URL</label>
                        <input className="form-input" name="blogUrl" value={form.blogUrl} onChange={handleChange} placeholder="/blogs/my-blog" />
                    </div>
                    <div className="form-group">
                        <label className="form-label"><FiYoutube style={{ verticalAlign: 'middle' }} /> YouTube URL</label>
                        <input className="form-input" name="youtubeUrl" value={form.youtubeUrl || ''} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Gradient CSS</label>
                    <input className="form-input" name="gradient" value={form.gradient} onChange={handleChange} />
                </div>
                <div className="admin-form-row" style={{ alignItems: 'center' }}>
                    <label className="admin-checkbox">
                        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                        <span>Featured project</span>
                    </label>
                </div>

                {/* Thumbnail Upload */}
                <div className="form-group">
                    <label className="form-label"><FiImage style={{ verticalAlign: 'middle' }} /> Thumbnail / Image</label>
                    <div className="admin-thumbnail-area">
                        {(form.image || thumbnail) && (
                            <img src={form.image || thumbnail} alt="thumbnail" className="admin-thumbnail-preview" />
                        )}
                        <label className="admin-upload-btn">
                            <FiImage size={14} /> {uploading ? 'Uploading...' : 'Upload Image'}
                            <input type="file" accept="image/*" onChange={handleThumbnailUpload} hidden />
                        </label>
                    </div>
                </div>

                <div className="admin-form-actions">
                    <button type="submit" className="admin-save-btn"><FiSave size={14} /> Save Project</button>
                    {project?.id && (
                        <button type="button" className="admin-delete-btn" onClick={() => onDelete(project.id)}>
                            <FiTrash2 size={14} /> Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

// ─── Blog Editor ──────────────────────────────────────────
function BlogEditor({ blog, onSave, onDelete, onCancel }) {
    const [form, setForm] = useState({
        slug: '', title: '', description: '', date: '', views: '', content: '',
        ...blog,
    });
    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => { e.preventDefault(); onSave(form); };

    return (
        <div className="admin-editor">
            <div className="admin-editor-header">
                <h3>{blog?.slug ? 'Edit Blog' : 'New Blog'}</h3>
                <button className="admin-icon-btn" onClick={onCancel}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-row">
                    <div className="form-group">
                        <label className="form-label">Slug</label>
                        <input className="form-input" name="slug" value={form.slug} onChange={handleChange} required placeholder="my-blog-post" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input className="form-input" name="title" value={form.title} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} required style={{ minHeight: '60px' }} />
                </div>
                <div className="admin-form-row">
                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <input className="form-input" name="date" value={form.date} onChange={handleChange} placeholder="Mar 2025" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Views</label>
                        <input className="form-input" name="views" value={form.views} onChange={handleChange} placeholder="2K+" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Content (HTML)</label>
                    <textarea className="form-textarea" name="content" value={form.content} onChange={handleChange} style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '0.8rem' }} />
                </div>
                <div className="admin-form-actions">
                    <button type="submit" className="admin-save-btn"><FiSave size={14} /> Save Blog</button>
                    {blog?.slug && <button type="button" className="admin-delete-btn" onClick={() => onDelete(blog.slug)}><FiTrash2 size={14} /> Delete</button>}
                </div>
            </form>
        </div>
    );
}

// ─── Experience Editor ─────────────────────────────────────
function ExperienceEditor({ item, index, onSave, onDelete, onCancel }) {
    const [form, setForm] = useState({
        date: '', role: '', company: '', companyUrl: '',
        points: '', tags: '',
        ...item,
        points: Array.isArray(item?.points) ? item.points.join('\n') : (item?.points || ''),
        tags: Array.isArray(item?.tags) ? item.tags.join(', ') : (item?.tags || ''),
    });
    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...form,
            points: form.points.split('\n').filter(Boolean),
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }, index);
    };

    return (
        <div className="admin-editor">
            <div className="admin-editor-header">
                <h3>{index !== undefined ? 'Edit Experience' : 'New Experience'}</h3>
                <button className="admin-icon-btn" onClick={onCancel}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-row">
                    <div className="form-group">
                        <label className="form-label">Date Range</label>
                        <input className="form-input" name="date" value={form.date} onChange={handleChange} required placeholder="2024 - Present" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <input className="form-input" name="role" value={form.role} onChange={handleChange} required />
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="form-group">
                        <label className="form-label">Company</label>
                        <input className="form-input" name="company" value={form.company} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Company URL</label>
                        <input className="form-input" name="companyUrl" value={form.companyUrl || ''} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Bullet Points (one per line)</label>
                    <textarea className="form-textarea" name="points" value={form.points} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Tags (comma separated)</label>
                    <input className="form-input" name="tags" value={form.tags} onChange={handleChange} />
                </div>
                <div className="admin-form-actions">
                    <button type="submit" className="admin-save-btn"><FiSave size={14} /> Save</button>
                    {index !== undefined && <button type="button" className="admin-delete-btn" onClick={() => onDelete(index)}><FiTrash2 size={14} /> Delete</button>}
                </div>
            </form>
        </div>
    );
}

// ─── Simple Key-Value Editor (About / Contact) ────────────
function SimpleEditor({ data, onSave, fields }) {
    const [form, setForm] = useState({ ...data });
    const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }));
    const handleSubmit = (e) => { e.preventDefault(); onSave(form); };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            {fields.map(f => (
                <div key={f.key} className="form-group">
                    <label className="form-label">{f.label}</label>
                    {f.type === 'textarea' ?
                        <textarea className="form-textarea" value={form[f.key] || ''} onChange={e => handleChange(f.key, e.target.value)} />
                        : <input className="form-input" value={form[f.key] || ''} onChange={e => handleChange(f.key, e.target.value)} />
                    }
                </div>
            ))}
            <button type="submit" className="admin-save-btn"><FiSave size={14} /> Save Changes</button>
        </form>
    );
}


// ─── Main Dashboard ───────────────────────────────────────
export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState({
        projects: [], blogs: [], experience: [], about: {}, contact: {},
    });
    const [editing, setEditing] = useState(null); // { type, item, index }
    const [msg, setMsg] = useState('');

    useEffect(() => {
        // Verify auth
        const token = localStorage.getItem('admin_token');
        if (!token) { navigate('/admin'); return; }

        // Fetch all data
        fetch(`${API}/data`, { headers: getHeaders() })
            .then(r => { if (r.status === 401) { navigate('/admin'); return null; } return r.json(); })
            .then(d => { if (d) setData(d); })
            .catch(() => navigate('/admin'));
    }, [navigate]);

    const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

    const saveItem = async (type, item, index) => {
        try {
            const res = await fetch(`${API}/${type}`, {
                method: 'POST', headers: getHeaders(),
                body: JSON.stringify({ item, index }),
            });
            if (res.ok) {
                const updated = await res.json();
                setData(d => ({ ...d, ...updated }));
                setEditing(null);
                showMsg(`${type} saved successfully!`);
            }
        } catch (err) { showMsg('Error saving'); }
    };

    const deleteItem = async (type, id) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API}/${type}/${id}`, {
                method: 'DELETE', headers: getHeaders(),
            });
            if (res.ok) {
                const updated = await res.json();
                setData(d => ({ ...d, ...updated }));
                setEditing(null);
                showMsg(`Deleted successfully`);
            }
        } catch (err) { showMsg('Error deleting'); }
    };

    const logout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-left">
                    <div className="sidebar-brand-icon" style={{ width: 32, height: 32, fontSize: '0.65rem' }}>
                        <span className="brand-ai">AI</span>
                    </div>
                    <h1>Admin Dashboard</h1>
                </div>
                <button className="admin-logout-btn" onClick={logout}>
                    <FiLogOut size={14} /> Logout
                </button>
            </header>

            {/* Success message */}
            {msg && <div className="admin-toast">{msg}</div>}

            <div className="admin-body">
                {/* Tabs */}
                <nav className="admin-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => { setActiveTab(tab.id); setEditing(null); }}
                        >
                            <tab.icon size={14} /> {tab.label}
                        </button>
                    ))}
                </nav>

                {/* Content */}
                <div className="admin-content">
                    {/* ── Projects Tab ─── */}
                    {activeTab === 'projects' && !editing && (
                        <>
                            <div className="admin-section-header">
                                <h2>Projects ({data.projects?.length || 0})</h2>
                                <button className="admin-add-btn" onClick={() => setEditing({ type: 'projects' })}>
                                    <FiPlus size={14} /> Add Project
                                </button>
                            </div>
                            <div className="admin-list">
                                {(data.projects || []).map(p => (
                                    <div key={p.id} className="admin-list-item" onClick={() => setEditing({ type: 'projects', item: p })}>
                                        <div className="admin-list-item-color" style={{ background: p.gradient }} />
                                        <div className="admin-list-item-info">
                                            <strong>{p.title}</strong>
                                            <span>{p.tags?.join(', ')}</span>
                                        </div>
                                        {p.featured && <span className="admin-badge">Featured</span>}
                                        {p.youtubeUrl && <FiYoutube size={14} style={{ color: '#ef4444' }} />}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {activeTab === 'projects' && editing?.type === 'projects' && (
                        <ProjectEditor
                            project={editing.item || {}}
                            onSave={(item) => saveItem('projects', item)}
                            onDelete={(id) => deleteItem('projects', id)}
                            onCancel={() => setEditing(null)}
                        />
                    )}

                    {/* ── Blogs Tab ─── */}
                    {activeTab === 'blogs' && !editing && (
                        <>
                            <div className="admin-section-header">
                                <h2>Blogs ({data.blogs?.length || 0})</h2>
                                <button className="admin-add-btn" onClick={() => setEditing({ type: 'blogs' })}>
                                    <FiPlus size={14} /> Add Blog
                                </button>
                            </div>
                            <div className="admin-list">
                                {(data.blogs || []).map(b => (
                                    <div key={b.slug} className="admin-list-item" onClick={() => setEditing({ type: 'blogs', item: b })}>
                                        <div className="admin-list-item-info">
                                            <strong>{b.title}</strong>
                                            <span>{b.date} · {b.views} views</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {activeTab === 'blogs' && editing?.type === 'blogs' && (
                        <BlogEditor
                            blog={editing.item || {}}
                            onSave={(item) => saveItem('blogs', item)}
                            onDelete={(slug) => deleteItem('blogs', slug)}
                            onCancel={() => setEditing(null)}
                        />
                    )}

                    {/* ── Experience Tab ─── */}
                    {activeTab === 'experience' && !editing && (
                        <>
                            <div className="admin-section-header">
                                <h2>Experience ({data.experience?.length || 0})</h2>
                                <button className="admin-add-btn" onClick={() => setEditing({ type: 'experience' })}>
                                    <FiPlus size={14} /> Add Entry
                                </button>
                            </div>
                            <div className="admin-list">
                                {(data.experience || []).map((item, idx) => (
                                    <div key={idx} className="admin-list-item" onClick={() => setEditing({ type: 'experience', item, index: idx })}>
                                        <div className="admin-list-item-info">
                                            <strong>{item.role}</strong>
                                            <span>{item.company} · {item.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {activeTab === 'experience' && editing?.type === 'experience' && (
                        <ExperienceEditor
                            item={editing.item || {}}
                            index={editing.index}
                            onSave={(item, idx) => saveItem('experience', item, idx)}
                            onDelete={(idx) => deleteItem('experience', idx)}
                            onCancel={() => setEditing(null)}
                        />
                    )}

                    {/* ── About Tab ─── */}
                    {activeTab === 'about' && (
                        <>
                            <h2 style={{ marginBottom: 16 }}>About Page Settings</h2>
                            <SimpleEditor
                                data={data.about || {}}
                                onSave={(item) => saveItem('about', item)}
                                fields={[
                                    { key: 'name', label: 'Name', type: 'text' },
                                    { key: 'tagline', label: 'Tagline', type: 'text' },
                                    { key: 'skills', label: 'Skills (comma separated)', type: 'text' },
                                ]}
                            />
                        </>
                    )}

                    {/* ── Contact Tab ─── */}
                    {activeTab === 'contact' && (
                        <>
                            <h2 style={{ marginBottom: 16 }}>Contact Page Settings</h2>
                            <SimpleEditor
                                data={data.contact || {}}
                                onSave={(item) => saveItem('contact', item)}
                                fields={[
                                    { key: 'title', label: 'Title', type: 'text' },
                                    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
                                ]}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
