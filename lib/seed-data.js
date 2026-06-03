/**
 * Seed content for Imad's portfolio.
 * Used by `npm run seed`. Edit freely — this is just default data.
 */

export const imadSeed = {
  published: true,
  theme: {
    preset: "minimal",
    primaryColor: "#1b1d20",
    accentColor: "#c08457",
    fontSans: "dm-sans",
    fontDisplay: "space-grotesk",
    layout: "sidebar",
  },
  personalInfo: {
    fullName: "Imaduddeen Khan",
    role: "AI Engineer",
    tagline: "AI Engineer • Full-Stack Builder • Building production AI agents & automations",
    location: "Delhi, India",
    email: "aiwithimad@gmail.com",
    phone: "+91 9125197678",
    avatar: null,
  },
  hero: {
    greeting: "Hey, I'm Imad",
    headline: "I build AI Solutions that actually ship.",
    description:
      "Shipped 15+ AI Solutions Running in production. Give Me a Business Problem, I'll Build the AI Solution. Top 100 Global Finalist at Google Solution Challenge 2025 and IEEE R10 winner.",
    introVideoUrl: "https://youtube.com/shorts/gKZUWgf2lIo?feature=share",
    ctaLabel: "View my work",
    ctaUrl: "#projects",
  },
  socials: [
    { platform: "github", url: "https://github.com/ImaduddeenKhan" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/imadkhan-datascience" },
    { platform: "twitter", url: "https://x.com/AiWith56327" },
    { platform: "medium", url: "https://medium.com/@aiwithimad" },
    { platform: "email", url: "mailto:aiwithimad@gmail.com" },
  ],
  skills: [
    { id: "lang", category: "Languages", items: ["Python", "C", "C++", "SQL", "JavaScript"] },
    { id: "data", category: "Data & Visualization", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI"] },
    {
      id: "ai",
      category: "AI / ML / GenAI",
      items: [
        "Scikit-learn",
        "TensorFlow",
        "PyTorch",
        "NLP",
        "LangGraph",
        "Transformers",
        "RAG",
        "AI Agents",
        "WebRTC",
      ],
    },
    {
      id: "cloud",
      category: "Cloud & Deployment",
      items: ["AWS (S3, SageMaker, Bedrock, Lambda)", "GCP", "Docker", "Supabase", "FastAPI"],
    },
  ],
  experience: [
    {
      id: "sizh",
      date: "Dec 2025 – Present",
      role: "AI Developer Intern",
      company: "SIZH IT Solutions Pvt Ltd.",
      companyUrl: null,
      location: "Noida, India",
      points: [
        "Developed an intelligent AI Solutions for a heavy-haul company to automate real-time order management and customer support.",
        "Engineered backend automation scripts for complex supply chain workflows, slashing end-to-end order creation time from 1.5 minutes down to 16 seconds.",
        "Led AI feature development for a CA-focused SaaS — automated solution to parse raw bills and auto-populate Tally ERP records.",
      ],
      tags: ["AI Agents", "NLP", "Automation", "Python", "FastAPI"],
    },
    {
      id: "expertmind",
      date: "Jun 2025 – Aug 2025",
      role: "AI/ML Intern",
      company: "Expertmind Technologies LLP",
      companyUrl: null,
      location: "Bilaspur, India",
      points: [
        "Designed the AI/ML architecture for an upcoming YouTube-style edtech platform.",
        "Built a personalized recommendation system to enhance content delivery, learner engagement, and platform intelligence.",
      ],
      tags: ["Recommendation Systems", "ML", "Python", "EdTech"],
    },
    {
      id: "zetheta",
      date: "Mar 2025 – Jun 2025",
      role: "AI Chatbot Engineer Intern",
      company: "ZeTheta Algorithms Pvt. Ltd.",
      companyUrl: null,
      location: "Mumbai, India",
      points: [
        "Developed a full-fledged RAG-based AI chatbot trained on financial data using LLMs, delivering accurate responses to domain-specific queries.",
        "Built a Retrieval Augmented Generation pipeline for domain-specific financial data, improving user knowledge discovery and information accuracy.",
      ],
      tags: ["RAG", "LLMs", "Chatbot", "Financial AI", "Python"],
    },
  ],
  education: [
    {
      id: "ggu",
      degree: "B.Tech in Information Technology",
      institution: "School of Studies of Engineering and Technology — GGU",
      date: "Nov 2022 – May 2026",
      location: "Bilaspur, India",
      description:
        "Relevant Coursework: AI, Machine Learning, Cyber Security, Compiler Design, Cloud Computing, DBMS, Computer Networks, OOPs, DSA, TOC, Python for Data Science, Numerical Analysis, Edge Computing.",
    },
  ],
  projects: [
    {
      id: "nextgen-techxtools",
      title: "NextGen TechxTools — Strategic AI Tech Planner",
      description:
        "First-of-its-kind AI tool that automates the 'Discovery Phase' for startups by recommending modern, cost-effective tech stacks.",
      longDescription:
        "Conceptualized and built a hybrid retrieval and search engine to fetch and compare curated vs. real-time tech solutions with high confidence scores. Designed a high-concurrency FastAPI backend that delivers tailored architectural blueprints in under 2 seconds for 50+ concurrent users.",
      tags: ["AI Agents", "FastAPI", "Hybrid Search", "RAG", "Python"],
      status: "active",
      featured: true,
      githubUrl: "https://github.com/ImaduddeenKhan",
      liveDemoUrl: "",
      youtubeUrl: "https://youtu.be/-sQnW4iusEo",
      thumbnail: null,
      screenshots: [],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "rag-qa",
      title: "RAG Q&A — Document Intelligence & Search System",
      description:
        "Retrieval-Augmented Generation system for intelligent document Q&A — reduces information retrieval time from hours to seconds.",
      longDescription:
        "Engineered a Hybrid Search (BM25 + Semantic) pipeline with a Cross-Encoder Re-ranker and Corrective RAG (CRAG) logic to improve retrieval accuracy by 45%.",
      tags: ["RAG", "BM25", "Cross-Encoder", "CRAG", "LLM"],
      status: "active",
      featured: true,
      githubUrl: "https://github.com/ImaduddeenKhan",
      liveDemoUrl: "",
      youtubeUrl: "https://youtu.be/hLg5YWUW4NE",
      thumbnail: null,
      screenshots: [],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: "human-interest-predictor",
      title: "Human Interest Predictor — Career Recommendation Model",
      description:
        "Psychometric AI/ML test that suggests ideal careers and reduces mismatch-driven burnout. 90% top-3 suggestion relevance.",
      longDescription:
        "Engineered a hybrid ML model (XGBoost + K-Means) analyzing 100+ user traits to generate career reports. Reduced report generation time by 40% using ReportLab + GCP, scaling to 50+ monthly users with <200ms latency.",
      tags: ["XGBoost", "K-Means", "GCP", "ReportLab", "Career AI"],
      status: "active",
      featured: true,
      githubUrl: "https://github.com/ImaduddeenKhan",
      liveDemoUrl: "",
      youtubeUrl: "https://youtu.be/QTc7-ak782o",
      thumbnail: null,
      screenshots: [],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ],
  building: [
    {
      id: "nextgen-techxtools-startup",
      name: "PreClaw",
      tagline: "Turn your app idea into a build-ready plan — architecture, prompts, and the right tools.",
      status: "live",
      url: "https://preclaw.imadkhan.me/",
      videoUrl: "https://youtu.be/-sQnW4iusEo",
      logo: null,
      description:
        "Describe your app idea in plain English — PreClaw designs the cost-efficient architecture. | Generates structured, multi-part prompts you can feed directly into Cursor or Lovable. | Prevents over-engineering by recommending lighter, free open-source alternatives over heavy infrastructure. | Stops random technology choices that AI builders make when you describe ideas without context. | Equips you with structural precision so every coding decision is intentional, not arbitrary.",
    },
    {
      id: "career-compass",
      name: "Career Compass",
      tagline: "AI-powered career guidance, jobs, and upskilling for Indian youth.",
      status: "live",
      url: "https://careercompass.imadkhan.me/",
      videoUrl: "https://youtu.be/QTc7-ak782o",
      logo: null,
      description:
        "Built for 10th/12th pass students, unskilled youth, and learners without easy career support. | Combines psychometric AI guidance, career mapping, college paths, upskilling, and local job discovery. | Keeps the experience free, simple, and action-oriented for young people making real career decisions.",
    },
  ],
  certifications: [],
  achievements: [
    {
      id: "google-solution",
      title: "Top 100 Global Finalist — Google Solution Challenge 2025",
      description:
        "Led a 4-member team to build a UN SDG-aligned AI career guidance platform, selected from 100,000+ teams globally.",
      date: "2025",
    },
    {
      id: "ieee-r10",
      title: "Winner — IEEE R10 ACEI Idea Pitching Competition 2025",
      description:
        "Led a startup team to win the regional finals; qualified for the Asia Round and advancing toward representing the venture at GITEX Dubai 2025.",
      date: "2025",
    },
  ],
  languages: [
    { id: "en", name: "English", level: "Fluent" },
    { id: "hi", name: "Hindi", level: "Native" },
    { id: "ur", name: "Urdu", level: "Conversational" },
  ],
  hobbies: [
    { id: "business", name: "Interested in business and building business intuition", icon: "sparkles" },
    { id: "learning-business", name: "Learning how strong businesses grow and scale", icon: "pen" },
    { id: "understanding-business", name: "Understanding business models, markets, and strategy", icon: "crown" },
  ],
  resumeUrl: "https://drive.google.com/file/d/1b5Em1jhAEkbsEHetb8kD2HQRSbzMaisc/view?usp=sharing",
  contactEmail: "aiwithimad@gmail.com",
  contactMessage:
    "If you're building with AI, need an AI agent, automation, or just want to chat — drop a message.",
  seo: {
    title: "Imaduddeen Khan — AI Engineer",
    description:
      "AI Engineer building production-ready AI agents, RAG systems, and automations. Google Solution Challenge Top 100 Finalist.",
    ogImage: null,
  },
};
