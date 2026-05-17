// ============================================================
// PORTFOLIO DATA — Update this file with your actual content
// ============================================================

export const personalInfo = {
    name: "Imad",
    fullName: "Imad",
    role: "AI Engineer & Freelancer",
    tagline: "Full-Stack Dev • AI Engineer • AI Agents • Automations • Freelancer",
    avatarInitials: "IM",
    email: "your.email@example.com",
    resumeUrl: "/resume.pdf",
};

export const heroData = {
    greeting: "Hey, I'm Imad",
    role: "AI Engineer & Freelancer",
    description:
        "I build AI agents, automations, and full-stack AI solutions — from idea to production. Whether it's a custom GPT agent, workflow automation, or an end-to-end AI product, I ship it fast.",
    highlights: [
        { text: "AI Agents & Automations", link: null },
        { text: "Full-Stack AI Builder", link: null },
        { text: "Freelancer", link: null },
    ],
    twitterBtn: {
        label: "Connect with me",
        subLabel: "Follow for AI insights",
        url: "#", // Update with your X/Twitter link
    },
};

export const featuredPost = {
    label: "Featured",
    title: "Building AI Agents That Actually Work",
    description:
        "A deep dive into how I approach building production-ready AI agents — from architecture to deployment and everything in between.",
    link: "/blogs/building-ai-agents",
    slug: "building-ai-agents",
};

export const socialLinks = [
    { name: "X (Twitter)", url: "#", icon: "twitter" },
    { name: "LinkedIn", url: "#", icon: "linkedin" },
    { name: "GitHub", url: "#", icon: "github" },
    { name: "Medium", url: "#", icon: "medium" },
    { name: "Instagram", url: "#", icon: "instagram" },
];

export const navLinks = [
    { name: "Home", path: "/", icon: "home" },
    { name: "Experience", path: "/experience", icon: "briefcase" },
    { name: "Projects", path: "/projects", icon: "code" },
    { name: "Blogs", path: "/blogs", icon: "edit" },
    { name: "About", path: "/about", icon: "user" },
    { name: "Contact", path: "/contact", icon: "mail" },
];

export const experienceData = {
    title: "Changelog from my journey",
    subtitle:
        "Here's a timeline of my professional journey — building AI agents, automations, and full-stack solutions.",
    timeline: [
        {
            date: "2024 - Present",
            role: "Freelance AI Engineer",
            company: "Self-Employed",
            companyUrl: null,
            points: [
                "Building custom AI agents and automation solutions for clients globally",
                "Developing end-to-end AI products — from LLM-powered chatbots to workflow automations",
                "Specializing in AI agent architectures, RAG systems, and multi-agent frameworks",
            ],
            tags: ["AI Agents", "LangChain", "OpenAI", "Python", "React", "Node.js"],
        },
        {
            date: "2023 - 2024",
            role: "AI Developer",
            company: "Company Name",
            companyUrl: "#",
            points: [
                "Built AI-powered solutions for enterprise clients",
                "Developed RAG pipelines and LLM-based applications",
                "Integrated AI models into production workflows",
            ],
            tags: ["Python", "LLMs", "RAG", "FastAPI", "Docker"],
        },
        {
            date: "2021 - 2023",
            role: "Full-Stack Developer",
            company: "Company Name",
            companyUrl: "#",
            points: [
                "Led frontend and backend development for web applications",
                "Built scalable APIs and responsive user interfaces",
                "Worked with modern frameworks and cloud infrastructure",
            ],
            tags: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"],
        },
    ],
};

export const projectsData = [
    {
        id: "ai-agent-builder",
        title: "AI Agent Builder",
        description:
            "A platform for building and deploying custom AI agents with memory, tools, and multi-step reasoning capabilities.",
        stats: "Production Ready",
        status: "active",
        tags: ["AI", "Agents", "LangChain", "Python"],
        featured: true,
        visitUrl: "#",
        githubUrl: "#",
        blogUrl: "/blogs/building-ai-agents",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        image: null, // Will be populated from backend uploads
    },
    {
        id: "automation-engine",
        title: "Automation Engine",
        description:
            "End-to-end workflow automation platform — connects APIs, processes data, and triggers actions autonomously.",
        stats: "50+ Workflows Automated",
        status: "active",
        tags: ["Automation", "Python", "APIs", "n8n"],
        featured: true,
        visitUrl: "#",
        githubUrl: "#",
        blogUrl: null,
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        image: null,
    },
    {
        id: "rag-chatbot",
        title: "RAG Chatbot",
        description:
            "Retrieval-Augmented Generation chatbot that answers questions from your own documents with high accuracy.",
        stats: "99% Accuracy",
        status: "active",
        tags: ["RAG", "LLM", "Vector DB", "FastAPI"],
        featured: false,
        visitUrl: "#",
        githubUrl: "#",
        blogUrl: "/blogs/rag-chatbot-guide",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        image: null,
    },
    {
        id: "ai-content-generator",
        title: "AI Content Generator",
        description:
            "AI-powered content creation tool that generates blog posts, social media content, and marketing copy.",
        stats: "1K+ Content Pieces Generated",
        status: "active",
        tags: ["AI", "GPT", "Content", "SaaS"],
        featured: false,
        visitUrl: "#",
        githubUrl: "#",
        blogUrl: null,
        gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
        image: null,
    },
    {
        id: "smart-scraper",
        title: "Smart Scraper",
        description:
            "Intelligent web scraping tool with AI-powered data extraction and automatic schema detection.",
        stats: "10K+ Pages Scraped",
        status: "active",
        tags: ["Python", "Scraping", "AI", "Data"],
        featured: false,
        visitUrl: null,
        githubUrl: "#",
        blogUrl: null,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        image: null,
    },
    {
        id: "voice-ai-assistant",
        title: "Voice AI Assistant",
        description:
            "Voice-enabled AI assistant that can process spoken queries, execute tasks, and provide intelligent responses.",
        stats: "Real-time Processing",
        status: "active",
        tags: ["Voice AI", "Whisper", "GPT", "Python"],
        featured: false,
        visitUrl: "#",
        githubUrl: "#",
        blogUrl: null,
        gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        image: null,
    },
];

export const blogsData = [
    {
        slug: "building-ai-agents",
        title: "Building AI Agents That Actually Work",
        description:
            "A deep dive into how I approach building production-ready AI agents — from architecture to deployment.",
        date: "Mar 2025",
        views: "2K+",
        content: `
      <h2>Why Most AI Agents Fail</h2>
      <p>The AI agent landscape is exploding, but most agents built today are demos — not products. They work in controlled environments but break down in production. Here's what I've learned from building agents that actually ship.</p>
      
      <h2>Architecture Matters</h2>
      <p>The key to building reliable AI agents is starting with a solid architecture. This means separating concerns — the reasoning engine, tool execution layer, and memory system should all be modular and independently testable.</p>
      
      <h3>The Core Components</h3>
      <ul>
        <li><strong>Reasoning Engine:</strong> The brain of your agent. Use chain-of-thought prompting with structured outputs.</li>
        <li><strong>Tool Layer:</strong> Define clear interfaces for each tool. Every tool should be idempotent when possible.</li>
        <li><strong>Memory System:</strong> Combine short-term (conversation) and long-term (vector store) memory for context.</li>
      </ul>

      <h2>Production Considerations</h2>
      <p>When moving from prototype to production, focus on error handling, rate limiting, cost optimization, and observability. Log every agent decision for debugging.</p>
      
      <p>The agents I build for clients follow these principles, and the difference in reliability is night and day compared to naive implementations.</p>
    `,
    },
    {
        slug: "rag-chatbot-guide",
        title: "The Complete Guide to Building RAG Chatbots",
        description:
            "Everything you need to know about building Retrieval-Augmented Generation chatbots that give accurate answers from your data.",
        date: "Feb 2025",
        views: "1.5K+",
        content: `
      <h2>What is RAG?</h2>
      <p>Retrieval-Augmented Generation (RAG) combines the power of large language models with your own data. Instead of relying solely on the model's training data, RAG retrieves relevant documents and uses them to generate accurate, grounded responses.</p>
      
      <h2>Building Your Pipeline</h2>
      <p>A production RAG system needs three key components: document ingestion, vector search, and response generation. Each needs careful optimization.</p>
      
      <h3>Document Ingestion</h3>
      <p>Chunk your documents intelligently. Don't just split by character count — use semantic chunking that respects document structure.</p>
      
      <h3>Vector Search</h3>
      <p>Choose the right embedding model and vector database for your use case. Consider hybrid search (combining vector and keyword search) for better recall.</p>
      
      <h2>Evaluation & Iteration</h2>
      <p>Build an evaluation pipeline early. Test with real queries and measure retrieval quality, answer accuracy, and faithfulness to source documents.</p>
    `,
    },
    {
        slug: "ai-automation-freelancing",
        title: "How I Built a Freelance Business Around AI Automations",
        description:
            "My journey from developer to AI freelancer — the tools, strategies, and lessons learned along the way.",
        date: "Jan 2025",
        views: "3K+",
        content: `
      <h2>The Opportunity</h2>
      <p>Every business has repetitive tasks that AI can handle. From customer support to data processing, the demand for AI automation is massive and growing.</p>
      
      <h2>My Service Stack</h2>
      <p>I offer three core services: custom AI agents, workflow automations, and AI-powered tools. Each addresses a different client need and price point.</p>
      
      <h3>Finding Clients</h3>
      <p>The best clients come from demonstrating value. I share my work publicly, write about my process, and let the results speak for themselves.</p>
      
      <h2>Lessons Learned</h2>
      <ul>
        <li>Start with the problem, not the technology</li>
        <li>Always deliver a working prototype fast</li>
        <li>Document everything for handoff</li>
        <li>Build relationships, not just projects</li>
      </ul>
    `,
    },
    {
        slug: "llm-prompt-engineering",
        title: "Practical Prompt Engineering for Production Apps",
        description:
            "Battle-tested prompt engineering techniques that I use daily when building AI-powered applications.",
        date: "Dec 2024",
        views: "1.8K+",
        content: `
      <h2>Beyond Basic Prompting</h2>
      <p>Production prompt engineering is about consistency, reliability, and cost efficiency — not just getting a cool output once.</p>
      
      <h2>Techniques That Work</h2>
      <p>Use structured outputs (JSON mode), few-shot examples, chain of thought, and system prompts that clearly define the model's role and constraints.</p>

      <h2>Testing Prompts</h2>
      <p>Build a test suite for your prompts. Run them against edge cases and measure output quality. Prompts are code — treat them that way.</p>
    `,
    },
    {
        slug: "multi-agent-systems",
        title: "Designing Multi-Agent Systems",
        description:
            "How to orchestrate multiple AI agents to work together on complex tasks — patterns and pitfalls.",
        date: "Nov 2024",
        views: "1.2K+",
        content: `
      <h2>When Single Agents Aren't Enough</h2>
      <p>Some tasks are too complex for a single agent. Multi-agent systems let you decompose problems and have specialized agents collaborate.</p>
      
      <h2>Communication Patterns</h2>
      <p>Agents can communicate through shared state, message passing, or a central orchestrator. Each pattern has tradeoffs in complexity and reliability.</p>

      <h2>Real-World Example</h2>
      <p>I recently built a multi-agent system for a client that handles document processing, analysis, and report generation. Three specialized agents work together, each handling what they do best.</p>
    `,
    },
    {
        slug: "full-stack-ai-tools",
        title: "The Full-Stack AI Developer's Toolkit",
        description:
            "Every tool, library, and service I use to build AI products — from development to deployment.",
        date: "Oct 2024",
        views: "2.5K+",
        content: `
      <h2>Development Tools</h2>
      <p>My core stack: Python for AI/ML, React for frontends, FastAPI for APIs, and Docker for deployment.</p>
      
      <h2>AI/ML Libraries</h2>
      <p>LangChain for agents, OpenAI API for LLMs, Pinecone for vector search, and Weights & Biases for experiment tracking.</p>

      <h2>Infrastructure</h2>
      <p>I deploy on AWS (Lambda + ECS), use Vercel for frontends, and manage databases with Supabase. Monitoring with Langsmith.</p>
    `,
    },
];

export const aboutData = {
    name: "Imad",
    tagline:
        "Full-Stack Dev • AI Engineer • AI Agents • Automations • Freelancer",
    skills: [
        "Python",
        "React",
        "AI Agents",
        "LangChain",
        "OpenAI",
        "Node.js",
        "FastAPI",
        "RAG",
    ],
    sections: [
        {
            title: "Who I Am",
            content:
                "Hello! I'm Imad — an AI Engineer and Freelancer passionate about building intelligent solutions that solve real problems. I specialize in AI agents, automations, and full-stack AI products.",
        },
        {
            title: "What I Do",
            content:
                "I build AI agents, workflow automations, and end-to-end AI solutions for businesses. As a freelancer, I work with clients to turn fuzzy ideas into production-ready AI products — fast. From RAG chatbots to multi-agent systems, I ship things that work.",
        },
        {
            title: "My Approach",
            content:
                "I believe in shipping fast, iterating quickly, and building for real users. Every project starts with understanding the problem deeply, then finding the simplest AI-powered solution that delivers value.",
        },
        {
            title: "AI & Freelancing",
            content:
                "Beyond development, I work as a freelancer building custom AI agents, automations, and AI-related solutions for businesses globally. If you need an AI agent that actually works in production, let's talk.",
        },
    ],
};

export const contactData = {
    title: "Contact",
    subtitle:
        "If you're building with AI, need an AI agent, automation, or just want to chat about AI — reach out!",
    twitterBtn: {
        label: "Connect with me",
        subLabel: "Follow for AI insights",
        url: "#", // Update with your X/Twitter link
    },
};
