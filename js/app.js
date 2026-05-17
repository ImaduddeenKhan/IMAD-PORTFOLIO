// ============================================================
// APP — Router, Theme Toggle, Mouse Tracker, Animations
// ============================================================
import { navLinks, socialLinks, personalInfo } from './data.js';
import {
    renderHome, renderExperience, renderProjects, renderProjectDetail,
    renderBlogs, renderBlogDetail, renderAbout, renderContact
} from './pages.js';

// ─── SVG Icons for sidebar ───
const sidebarIcons = {
    home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    briefcase: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    code: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    edit: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
    externalLink: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
};

const socialIconMap = {
    twitter: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    linkedin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    github: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    medium: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>',
    instagram: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
};

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    buildSidebar();
    initTheme();
    initMouseTracker();
    initCursorGlow();
    initRouter();
    initContactForm();
});

// ═══════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════
function buildSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('sidebar-overlay');

    // Brand
    const brandHTML = `
        <div class="sidebar-brand">
            <div class="sidebar-brand-icon"><span class="brand-ai">AI</span></div>
            <div class="sidebar-brand-text">
                <h3>AI with Imad</h3>
                <p>AI Engineer & Freelancer</p>
            </div>
        </div>
    `;

    // Nav links
    const navHTML = `
        <nav class="sidebar-nav">
            <ul class="sidebar-nav-list">
                ${navLinks.map(link => `
                    <li>
                        <a href="${link.path}" class="sidebar-nav-link" data-nav data-path="${link.path}">
                            <span class="nav-icon">${sidebarIcons[link.icon] || ''}</span>
                            ${link.name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </nav>
    `;

    // Theme toggle
    const themeHTML = `
        <div class="sidebar-theme-toggle">
            <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle dark mode">
                <span class="theme-icon-sun">${sidebarIcons.sun}</span>
                <span class="theme-icon-moon">${sidebarIcons.moon}</span>
                <span class="theme-toggle-slider"></span>
            </button>
        </div>
    `;

    // Social links
    const socialHTML = `
        <div class="sidebar-connect">
            <p class="sidebar-connect-title">Connect</p>
            <ul class="sidebar-social-list">
                ${socialLinks.map(social => `
                    <li>
                        <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="sidebar-social-link">
                            <span class="social-icon">
                                ${socialIconMap[social.icon] || ''}
                                ${social.name}
                            </span>
                            ${sidebarIcons.externalLink}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    sidebar.innerHTML = brandHTML + navHTML + themeHTML + socialHTML;

    // Mobile toggle
    mobileToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('open');
        overlay.classList.toggle('visible', isOpen);
        mobileToggle.innerHTML = isOpen ? sidebarIcons.close : sidebarIcons.menu;
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        mobileToggle.innerHTML = sidebarIcons.menu;
    });
}

function updateActiveNav(path) {
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
        const linkPath = link.getAttribute('data-path');
        const isActive = (path === '/' && linkPath === '#/') ||
                         (path !== '/' && linkPath === '#' + path) ||
                         (path !== '/' && linkPath.startsWith('#') && path.startsWith(linkPath.replace('#', '')));
        
        // More precise matching
        let active = false;
        const cleanLinkPath = linkPath.replace('#', '') || '/';
        if (cleanLinkPath === '/') {
            active = path === '/';
        } else {
            active = path.startsWith(cleanLinkPath);
        }
        
        link.classList.toggle('active', active);
    });

    // Close mobile sidebar
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        mobileToggle.innerHTML = sidebarIcons.menu;
    }
}

// ═══════════════════════════════════════════
// ROUTER — Hash-based
// ═══════════════════════════════════════════
function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    // Delegate navigation clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-nav]');
        if (link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                // hash navigation handled automatically
            }
        }
    });
}

function handleRoute() {
    const hash = window.location.hash || '#/';
    const path = hash.replace('#', '') || '/';
    const mainContent = document.getElementById('main-content');

    // Fade out
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(12px)';

    setTimeout(() => {
        let html = '';

        if (path === '/') {
            html = renderHome();
        } else if (path === '/experience') {
            html = renderExperience();
        } else if (path === '/projects') {
            html = renderProjects();
        } else if (path.startsWith('/projects/')) {
            const id = path.replace('/projects/', '');
            html = renderProjectDetail(id);
        } else if (path === '/blogs') {
            html = renderBlogs();
        } else if (path.startsWith('/blogs/')) {
            const slug = path.replace('/blogs/', '');
            html = renderBlogDetail(slug);
        } else if (path === '/about') {
            html = renderAbout();
        } else if (path === '/contact') {
            html = renderContact();
        } else {
            html = renderHome();
        }

        mainContent.innerHTML = html;

        // Fade in
        requestAnimationFrame(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        });

        updateActiveNav(path);
        initTiltCards();
        initScrollReveal();
        initContactForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
}

// ═══════════════════════════════════════════
// DARK MODE
// ═══════════════════════════════════════════
function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    // Listen for toggle after sidebar is built
    setTimeout(() => {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        }
    }, 0);
}

// ═══════════════════════════════════════════
// MOUSE TRACKER — Cursor Glow Effect
// ═══════════════════════════════════════════
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// ═══════════════════════════════════════════
// MOUSE TRACKER — Canvas Particle Trail
// ═══════════════════════════════════════════
function initMouseTracker() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0, mouseY = 0;
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Spawn particles on move
        for (let i = 0; i < 2; i++) {
            particles.push({
                x: mouseX + (Math.random() - 0.5) * 10,
                y: mouseY + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                life: 1,
                decay: 0.01 + Math.random() * 0.02,
                size: 1.5 + Math.random() * 2.5,
                hue: 240 + Math.random() * 40,
            });
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles = particles.filter(p => p.life > 0);

        // Keep particles manageable
        if (particles.length > 150) {
            particles = particles.slice(-150);
        }

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const alpha = p.life * 0.6;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = isDark
                ? `hsla(${p.hue}, 80%, 70%, ${alpha})`
                : `hsla(${p.hue}, 60%, 50%, ${alpha * 0.5})`;
            ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// ═══════════════════════════════════════════
// TILT CARDS — 3D perspective on hover
// ═══════════════════════════════════════════
function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ═══════════════════════════════════════════
// SCROLL REVEAL — Intersection Observer
// ═══════════════════════════════════════════
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-item').forEach(el => {
        observer.observe(el);
    });
}

// ═══════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusEl = document.getElementById('form-status');
        const submitBtn = document.getElementById('contact-submit');

        statusEl.style.display = 'flex';
        statusEl.className = 'form-status loading';
        statusEl.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate sending (replace with actual endpoint like Supabase Edge Function)
        setTimeout(() => {
            statusEl.className = 'form-status success';
            statusEl.textContent = '✓ Message sent! I\'ll get back to you soon.';
            submitBtn.disabled = false;
            form.reset();

            setTimeout(() => {
                statusEl.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}
