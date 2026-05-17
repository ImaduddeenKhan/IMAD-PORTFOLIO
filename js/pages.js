// ============================================================
// PAGES — Render functions for each page
// ============================================================
import {
    heroData, featuredPost, projectsData, blogsData,
    experienceData, aboutData, contactData, socialLinks
} from './data.js';

// ─── SVG Icons ───
const icons = {
    arrowRight: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    arrowLeft: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    externalLink: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
    github: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    chevronRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    twitter: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
};

// ─── Utility: escape HTML ───
function esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ═══════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════
export function renderHome() {
    const featuredProjects = projectsData.filter(p => p.featured).slice(0, 4);

    return `
    <div class="page-container" id="page-home">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-top">
                <div class="hero-text">
                    <h1 class="hero-greeting">${esc(heroData.greeting)} <span class="hero-wave">👋</span></h1>
                    <h2 class="hero-role">${esc(heroData.role)}</h2>
                </div>
                <div class="hero-dp-wrapper">
                    <img src="public/profile-placeholder.png" alt="Imad — AI Engineer" class="hero-dp" />
                    <div class="hero-dp-glow"></div>
                </div>
            </div>

            ${heroData.twitterBtn.url !== '#' ? `
            <a href="${esc(heroData.twitterBtn.url)}" class="hero-twitter-btn" target="_blank" rel="noopener noreferrer">
                ${icons.twitter}
                <span>${esc(heroData.twitterBtn.label)}</span>
            </a>` : ''}

            <p class="hero-description">${esc(heroData.description)}</p>

            <div class="hero-highlights">
                ${heroData.highlights.map((item, idx) => `
                    <span class="hero-highlight-item reveal-item" style="animation-delay: ${idx * 0.1}s">
                        ${item.link ? `<a href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(item.text)}</a>` : esc(item.text)}
                    </span>
                `).join('')}
            </div>
        </section>

        <!-- Featured Blog Card -->
        <a href="${esc(featuredPost.link)}" class="featured-card tilt-card" data-nav>
            <div class="featured-card-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"></div>
            <div class="featured-card-content">
                <span class="featured-card-label">${esc(featuredPost.label)}</span>
                <h3 class="featured-card-title">${esc(featuredPost.title)}</h3>
                <p class="featured-card-desc">${esc(featuredPost.description)}</p>
                <span class="featured-card-link">Read more ${icons.arrowRight}</span>
            </div>
        </a>

        <!-- Featured Projects -->
        ${featuredProjects.length > 0 ? `
        <section>
            <div class="section-header">
                <h2 class="section-title">Featured Projects</h2>
                <a href="#/projects" class="section-view-all" data-nav>View all ${icons.arrowRight}</a>
            </div>
            <div class="projects-grid">
                ${featuredProjects.map((project, idx) => renderProjectCard(project, idx)).join('')}
            </div>
        </section>` : ''}

        <!-- CTA -->
        <a href="#/contact" class="cta-banner magnetic-btn" data-nav>
            Reach out ${icons.arrowRight}
        </a>

        ${renderFooter()}
    </div>`;
}

// ═══════════════════════════════════════════
// EXPERIENCE PAGE
// ═══════════════════════════════════════════
export function renderExperience() {
    return `
    <div class="page-container" id="page-experience">
        <h1 class="page-title">Experience</h1>
        <p class="page-subtitle">${esc(experienceData.subtitle)}</p>

        <div class="timeline">
            ${experienceData.timeline.map((item, idx) => `
                <div class="timeline-item reveal-item" style="animation-delay: ${idx * 0.12}s">
                    <p class="timeline-date">${esc(item.date)}</p>
                    <h3 class="timeline-role">${esc(item.role)}</h3>
                    ${item.companyUrl && item.companyUrl !== '#' ? `
                        <a href="${esc(item.companyUrl)}" class="timeline-company" target="_blank" rel="noopener noreferrer">${esc(item.company)}</a>
                    ` : `<p class="timeline-company">${esc(item.company)}</p>`}
                    <ul class="timeline-points">
                        ${item.points.map(point => `<li>${esc(point)}</li>`).join('')}
                    </ul>
                    <div class="timeline-tags">
                        ${item.tags.map(tag => `<span class="timeline-tag">${esc(tag)}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="experience-actions">
            <a href="/resume.pdf" target="_blank" class="project-btn project-btn-primary">View Full Resume</a>
            <a href="#/contact" class="cta-banner" data-nav style="margin-top: 0">Reach out ${icons.arrowRight}</a>
        </div>

        ${renderFooter()}
    </div>`;
}

// ═══════════════════════════════════════════
// PROJECTS PAGE
// ═══════════════════════════════════════════
export function renderProjects() {
    return `
    <div class="page-container" id="page-projects">
        <h1 class="page-title">Projects</h1>
        <p class="page-subtitle">Production and experimental products — from AI agents to full-stack apps.</p>

        <div class="projects-grid">
            ${projectsData.map((project, idx) => renderProjectCard(project, idx, true)).join('')}
        </div>

        ${renderFooter()}
    </div>`;
}

// ═══════════════════════════════════════════
// PROJECT DETAIL PAGE
// ═══════════════════════════════════════════
export function renderProjectDetail(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) {
        return `
        <div class="page-container">
            <h1 class="page-title">Project not found</h1>
            <a href="#/projects" class="project-detail-back" data-nav>${icons.arrowLeft} Back to Projects</a>
        </div>`;
    }

    return `
    <div class="page-container" id="page-project-detail">
        <div class="project-detail">
            <a href="#/projects" class="project-detail-back" data-nav>${icons.arrowLeft} Back to Projects</a>

            <div class="project-detail-header">
                ${project.image
                    ? `<img src="${esc(project.image)}" alt="${esc(project.title)}" class="project-detail-image" />`
                    : `<div class="project-detail-image" style="background: ${project.gradient}"></div>`}
                <h1 class="project-detail-title">${esc(project.title)}</h1>
                ${project.stats ? `<p class="project-detail-stats">${esc(project.stats)}</p>` : ''}
                <p class="project-detail-desc">${esc(project.description)}</p>

                <div class="project-card-tags" style="margin-bottom: 20px">
                    ${project.tags.map(tag => `<span class="project-tag">${esc(tag)}</span>`).join('')}
                </div>

                <div class="project-detail-actions">
                    ${project.visitUrl ? `<a href="${esc(project.visitUrl)}" class="project-btn project-btn-primary" target="_blank" rel="noopener noreferrer">Visit ${icons.externalLink}</a>` : ''}
                    ${project.githubUrl ? `<a href="${esc(project.githubUrl)}" class="project-btn project-btn-secondary" target="_blank" rel="noopener noreferrer">GitHub ${icons.github}</a>` : ''}
                    ${project.blogUrl ? `<a href="${esc(project.blogUrl)}" class="project-btn project-btn-secondary" data-nav>Read Blog Post</a>` : ''}
                </div>
            </div>

            ${renderFooter()}
        </div>
    </div>`;
}

// ═══════════════════════════════════════════
// BLOGS PAGE
// ═══════════════════════════════════════════
export function renderBlogs() {
    return `
    <div class="page-container" id="page-blogs">
        <h1 class="page-title">Pensieve</h1>
        <p class="page-subtitle">Technical blogs and practical notes on AI engineering, agents, automations, and building products.</p>

        <div class="blogs-grid">
            ${blogsData.map((blog, idx) => `
                <a href="#/blogs/${esc(blog.slug)}" class="blog-card tilt-card reveal-item" data-nav style="animation-delay: ${idx * 0.08}s">
                    <div class="blog-card-content">
                        <h3 class="blog-card-title">${esc(blog.title)}</h3>
                        <p class="blog-card-desc">${esc(blog.description)}</p>
                        <div class="blog-card-meta">
                            <span class="blog-card-date">${esc(blog.date)}</span>
                            ${blog.views ? `<span class="blog-card-views">${esc(blog.views)} Views</span>` : ''}
                        </div>
                    </div>
                    ${icons.chevronRight}
                </a>
            `).join('')}
        </div>

        ${renderFooter()}
    </div>`;
}

// ═══════════════════════════════════════════
// BLOG DETAIL PAGE
// ═══════════════════════════════════════════
export function renderBlogDetail(slug) {
    const blog = blogsData.find(b => b.slug === slug);
    if (!blog) {
        return `
        <div class="page-container">
            <h1 class="page-title">Blog post not found</h1>
            <a href="#/blogs" class="blog-detail-back" data-nav>${icons.arrowLeft} Back to Blogs</a>
        </div>`;
    }

    return `
    <div class="page-container" id="page-blog-detail">
        <div class="blog-detail">
            <div class="blog-detail-header">
                <a href="#/blogs" class="blog-detail-back" data-nav>${icons.arrowLeft} Back to Blogs</a>
                <h1 class="blog-detail-title">${esc(blog.title)}</h1>
                <div class="blog-detail-meta">
                    <span>${esc(blog.date)}</span>
                    ${blog.views ? `<span>•</span><span>${esc(blog.views)} Views</span>` : ''}
                </div>
            </div>

            <div class="blog-detail-content">
                ${blog.content}
            </div>

            ${renderFooter()}
        </div>
    </div>`;
}

// ═══════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════
export function renderAbout() {
    return `
    <div class="page-container" id="page-about">
        <div class="about-section">
            <div class="about-header">
                <div class="about-avatar">${aboutData.name.charAt(0)}</div>
                <div class="about-header-info">
                    <h1>${esc(aboutData.name)}</h1>
                    <p>${esc(aboutData.tagline)}</p>
                </div>
            </div>

            <div class="about-skills">
                ${aboutData.skills.map((skill, idx) => `
                    <span class="about-skill-tag reveal-item" style="animation-delay: ${idx * 0.05}s">${esc(skill)}</span>
                `).join('')}
            </div>

            ${aboutData.sections.map((section, idx) => `
                <div class="about-block reveal-item" style="animation-delay: ${idx * 0.1}s">
                    <h4>${esc(section.title)}</h4>
                    <p>${esc(section.content)}</p>
                </div>
            `).join('')}

            <a href="#/contact" class="cta-banner magnetic-btn" data-nav>Get in Touch ${icons.arrowRight}</a>
        </div>

        ${renderFooter()}
    </div>`;
}

// ═══════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════
export function renderContact() {
    return `
    <div class="page-container" id="page-contact">
        <div class="contact-section">
            <h1>${esc(contactData.title)}</h1>
            <h2>${esc(contactData.subtitle)}</h2>

            ${contactData.twitterBtn.url !== '#' ? `
            <a href="${esc(contactData.twitterBtn.url)}" class="hero-twitter-btn" target="_blank" rel="noopener noreferrer">
                ${icons.twitter}
                <span>${esc(contactData.twitterBtn.label)}</span>
            </a>` : ''}

            <div style="margin-top: 32px">
                <h3 class="section-title">Send a Message</h3>
                <form class="contact-form" id="contact-form">
                    <div class="form-group">
                        <label for="contact-name" class="form-label">Name</label>
                        <input type="text" id="contact-name" name="name" class="form-input" placeholder="Your name" required />
                    </div>
                    <div class="form-group">
                        <label for="contact-email" class="form-label">Email</label>
                        <input type="email" id="contact-email" name="email" class="form-input" placeholder="you@example.com" required />
                    </div>
                    <div class="form-group">
                        <label for="contact-message" class="form-label">Message</label>
                        <textarea id="contact-message" name="message" class="form-textarea" placeholder="Tell me about your project..." required></textarea>
                    </div>

                    <div id="form-status" class="form-status" style="display: none"></div>

                    <button type="submit" class="form-submit magnetic-btn" id="contact-submit">
                        Send Message ${icons.arrowRight}
                    </button>
                </form>
            </div>
        </div>

        ${renderFooter()}
    </div>`;
}

// ═══════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════

function renderProjectCard(project, idx, showActions = false) {
    return `
    <div class="project-card tilt-card reveal-item" style="animation-delay: ${idx * 0.08}s">
        <a href="#/projects/${esc(project.id)}" data-nav>
            ${project.image
                ? `<img src="${esc(project.image)}" alt="${esc(project.title)}" class="project-card-image" loading="lazy" />`
                : `<div class="project-card-image" style="background: ${project.gradient}"></div>`}
        </a>
        <div class="project-card-body">
            <div class="project-card-header">
                <a href="#/projects/${esc(project.id)}" data-nav>
                    <h3 class="project-card-title">${esc(project.title)}</h3>
                </a>
                ${project.featured ? `<span class="project-card-star">${icons.star}</span>` : ''}
            </div>
            ${project.stats ? `<p class="project-card-stats">${esc(project.stats)}</p>` : ''}
            <div class="project-card-status ${project.status}">
                <span class="status-dot"></span>
                ${esc(project.status)}
            </div>
            <p class="project-card-desc">${esc(project.description)}</p>
            <div class="project-card-tags">
                ${project.tags.map(tag => `<span class="project-tag">${esc(tag)}</span>`).join('')}
            </div>
            ${showActions ? `
            <div class="project-card-actions">
                ${project.visitUrl ? `<a href="${esc(project.visitUrl)}" class="project-btn project-btn-primary" target="_blank" rel="noopener noreferrer">Visit ${icons.externalLink}</a>` : ''}
                ${project.githubUrl ? `<a href="${esc(project.githubUrl)}" class="project-btn project-btn-secondary" target="_blank" rel="noopener noreferrer">GitHub ${icons.github}</a>` : ''}
                ${project.blogUrl ? `<a href="${esc(project.blogUrl)}" class="project-btn project-btn-secondary" data-nav>Blog</a>` : ''}
            </div>` : ''}
        </div>
    </div>`;
}

function renderFooter() {
    return `
    <footer class="footer">
        <div class="footer-content">
            <p>Built by <strong>Imad</strong> — AI Engineer & Freelancer</p>
            <div class="footer-links">
                ${socialLinks.filter(s => s.url !== '#').map(social => `
                    <a href="${esc(social.url)}" target="_blank" rel="noopener noreferrer" class="footer-link" aria-label="${esc(social.name)}">${esc(social.name)}</a>
                `).join('')}
            </div>
        </div>
    </footer>`;
}
