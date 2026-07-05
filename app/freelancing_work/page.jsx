import { getPublicPortfolio } from "@/lib/site-data";
import FreelancingPage from "@/components/portfolio/freelancing/FreelancingPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI Automation for Your Business — Imad Khan | Freelance AI Engineer",
  description:
    "I build custom AI systems that automate manual operations — multi-agent email pipelines, document extraction, RAG knowledge platforms, and production-grade software. 12+ systems delivered.",
  openGraph: {
    title: "AI Automation for Your Business — Imad Khan",
    description:
      "Freelance AI Engineer building production-grade automation systems. 12+ AI systems delivered for the heavy-haul transportation industry.",
    type: "website",
  },
};

/* ─── narrative data (preserved from original) ─── */

const projects = [
  {
    num: "01",
    title: "AI-Powered Front Desk Email Automation",
    category: "Multi-Agent System",
    accent: "orange",
    narrative: "The company receives hundreds of emails daily — customers requesting permits, carriers sending documents, brokers asking for quotes. Employees had to manually read through lengthy email threads, figure out what was relevant, and piece together context from scattered conversations. It was one of the biggest time drains in the organization.",
    approach: "I designed a multi-agent system using LangGraph with five coordinated AI agents working together in a pipeline.",
    details: [
      { label: "Agent 1", text: "Email monitoring and classification — continuously watches the inbox, determines if a message belongs to an existing thread, whether it's a real customer request or marketing noise." },
      { label: "Agents 2–5", text: "Context retrieval and order intelligence — search Gmail for previous conversations, pull the last related threads, extract order references, fetch details from internal databases, and assemble complete context." },
    ],
    challenge: "One of the biggest challenges was accurately classifying permit requests. Many emails discuss permits without actually placing orders. I analyzed communication patterns and designed custom classification logic to distinguish between the two.",
    image: "/case-studies/freelancing/fl-email-dashboard.png",
    imageAlt: "Front Desk Dashboard showing intake pipeline stages",
    imageCaption: "The front desk dashboard — showing reported intakes, order building status, and ready-for-routing queues.",
  },
  {
    num: "02",
    title: "TMS Integration API",
    category: "API Engineering",
    accent: "black",
    narrative: "External Transportation Management Systems needed a clean way to submit order data programmatically. Without an API, partners had to send emails or make phone calls — a process that didn't scale.",
    approach: "I designed a complete integration API that allows external TMS platforms to send load information, rate confirmations, and supporting documents directly into the company's system.",
    details: [
      { label: "Architecture", text: "One primary endpoint that accepts structured order data with nested payloads for contacts, carrier info, truck/trailer data, route stops, commodity dimensions, and document references." },
      { label: "Developer Experience", text: "I created AI-friendly API documentation that developers can copy directly into tools like Claude Code or GitHub Copilot to rapidly integrate with minimal friction." },
      { label: "Security", text: "Token-based authentication generated through the company website, with CAPTCHA protection and email OTP verification before key provisioning." },
    ],
    imagePair: [
      { src: "/case-studies/freelancing/fl-api-documentation.png", alt: "API documentation page", caption: "The API docs I designed — with code samples for easy integration." },
      { src: "/case-studies/freelancing/fl-api-portal.png", alt: "TMS registration portal", caption: "Self-service API registration page with OTP email verification." },
    ],
  },
  {
    num: "03",
    title: "Intelligent Document Extraction Suite",
    category: "Document Intelligence",
    accent: "cream",
    narrative: "The permitting team spent hours every day manually reviewing uploaded documents — permits, registrations, rate confirmations, insurance certificates — and typing information into internal systems. It was repetitive, error-prone, and a bottleneck for the entire workflow.",
    approach: "I built an AI-powered extraction system that handles five different document types, each with its own extraction logic and validation pipeline.",
    details: [
      { label: "Permit Extraction", text: "Automatically pulls permit details from uploaded documents, dramatically reducing manual data entry time." },
      { label: "Vehicle & Trailer Data", text: "Automated extraction pipelines for truck and trailer registration documents, including VIN decoding and enrichment." },
      { label: "Rate Confirmation", text: "Identifies and extracts key shipment and pricing information directly from RateCon documents." },
      { label: "COI & IFTA", text: "Extraction modules for Certificate of Insurance and International Fuel Tax Agreement documents for compliance workflows." },
    ],
    technical: "Rendered PDFs into images and sent them to vision-language models with document-specific prompts. Processed multiple document URLs in parallel using ThreadPoolExecutor, then merged extracted values into normalized payloads.",
  },
  {
    num: "04",
    title: "Intelligent Order Information Assistant",
    category: "AI Agent",
    accent: "orange",
    narrative: "Drivers, dispatchers, and internal teams constantly needed quick answers about specific orders — route details, payment status, load specifications, restrictions. Previously, someone had to manually search through database records to find answers.",
    approach: "I built an AI assistant that takes an order number and retrieves everything about that order, combining real-time data retrieval with regulatory knowledge.",
    details: [
      { label: "Capabilities", text: "Users can ask natural language questions like 'What route is assigned to this order?', 'Has payment been received?', 'Can this load travel through a specific state at night?'" },
      { label: "Intelligence", text: "The assistant combines order data with transportation regulations, legal documents, and compliance resources to provide context-aware answers — not just data lookups." },
    ],
    image: "/case-studies/freelancing/fl-ai-assistant.png",
    imageAlt: "Order information AI assistant chat interface",
    imageCaption: "The Heavy Haul AI assistant — users enter an order token and ask questions naturally.",
    imageSize: "small",
  },
  {
    num: "05",
    title: "Enterprise Voice Recording Platform",
    category: "Knowledge Capture",
    accent: "black",
    narrative: "Voice comms are the primary communication channel in this organization. Dispatchers, permit specialists, and operational teams collaborate there daily. But all that valuable knowledge — how to handle edge cases, which states have tricky rules, how experienced employees solve problems — was just disappearing after conversations ended.",
    approach: "I built a custom recording platform from scratch that captures voice conversations, transcribes them, and stores them for future use.",
    details: [
      { label: "Smart Recording", text: "Records only when users are actively speaking, minimizing unnecessary storage consumption." },
      { label: "Multilingual", text: "Supports Spanish and multiple other languages — critical for this workforce." },
      { label: "Storage", text: "Automatically generates transcripts and stores them in organized shared drives." },
    ],
    challenge: "API rate limits can restrict recording bots. I solved this by designing a multi-bot architecture with 10 coordinated recording bots, enabling simultaneous recording across multiple channels.",
    image: "/case-studies/freelancing/fl-recording-platform.png",
    imageAlt: "Voice recording platform dashboard",
    imageCaption: "The recording platform dashboard for monitoring active voice captures and transcripts.",
    imageSize: "small",
  },
  {
    num: "06",
    title: "Transcript Processing Pipeline",
    category: "NLP Engineering",
    accent: "cream",
    narrative: "Raw voice transcripts are messy. People interrupt each other, go off-topic, use slang, switch between languages. To make this data useful for AI systems, I needed a serious cleanup pipeline.",
    approach: "I designed a multi-stage processing pipeline that transforms noisy conversations into structured, AI-consumable knowledge.",
    details: [
      { label: "Processing", text: "Uses spaCy English and Spanish models for language-aware text processing — removing noise, normalizing formatting, organizing into structured chunks." },
      { label: "Scale", text: "I specifically selected batch APIs for large-scale processing because it reduces operational costs significantly compared to standard API usage." },
      { label: "Output", text: "The final output is transformed into a question-answering format that downstream AI systems can consume directly." },
    ],
  },
  {
    num: "07",
    title: "RAG Knowledge System",
    category: "Knowledge Platform",
    accent: "orange",
    narrative: "All this captured and cleaned knowledge needed to be searchable. When a new employee has a question about a specific state's regulations, they shouldn't have to wait for a senior colleague — they should be able to ask the system.",
    approach: "I built a Retrieval-Augmented Generation (RAG) platform that makes the processed knowledge base searchable and accessible to the entire organization.",
    details: [
      { label: "Technical Stack", text: "Knowledge indexing, retrieval optimization, reranking implementation, BM25 experimentation and evaluation, and search quality testing." },
      { label: "Goal", text: "Preserve the expertise of experienced employees and make it instantly available — turning tribal knowledge into institutional knowledge." },
    ],
  },
  {
    num: "08",
    title: "AI Employee Interview & Training System",
    category: "Learning System",
    accent: "black",
    narrative: "In the permitting industry, even small operational mistakes can result in significant financial penalties. The company needed a way to learn from errors systematically — not just blame people, but actually understand why mistakes happen and prevent them from recurring.",
    approach: "I developed an AI-powered system that conducts automated post-incident investigations and transforms findings into training material.",
    details: [
      { label: "Investigation", text: "When an employee makes an error, the system receives details about the mistake, conducts an AI-driven interview asking contextual questions, and collects explanations." },
      { label: "Output", text: "Generates a structured summary, then transforms findings into training videos, knowledge-sharing content, and interactive quizzes." },
    ],
  },
  {
    num: "09",
    title: "AI Email Reply Drafting Assistant",
    category: "Productivity Tool",
    accent: "cream",
    narrative: "Customer support teams were spending significant time crafting responses to similar questions over and over. Each reply required context from previous interactions — which meant searching through email history before even starting to write.",
    approach: "I built an AI-powered drafting assistant that generates contextual email replies by analyzing conversation history.",
    details: [
      { label: "Workflow", text: "Receives incoming email → searches prior interactions → retrieves last 10 relevant threads → cleans signatures → generates contextual draft." },
      { label: "Human Oversight", text: "The system never sends emails automatically. It creates drafts that employees review before sending — AI augmentation, not replacement." },
    ],
  },
  {
    num: "10",
    title: "Route Auto-Approval Enhancement",
    category: "Automation",
    accent: "orange",
    narrative: "Every transport route needed manual approval — even routes that had been successfully used dozens of times before. I built improvements to reduce this unnecessary workload.",
    approach: "Enhanced the existing route approval system to recognize historical patterns and auto-approve proven routes.",
    details: [
      { label: "Logic", text: "The system checks if the same origin-destination combination has been used previously. If a match exists, historical route information and maps are reused." },
      { label: "Auto-Approval", text: "Routes that have been successfully used multiple times can be automatically approved, with human review always available for edge cases." },
    ],
  },
  {
    num: "11",
    title: "Estimator Agent Improvements",
    category: "AI Enhancement",
    accent: "black",
    narrative: "The company had an AI-powered Estimator Agent that helps users understand transportation costs and regulations. I optimized its accuracy.",
    approach: "Focused on improving system accuracy, usability, and overall performance of the estimator tool.",
    details: [
      { label: "Features", text: "Users enter load dimensions and receive cost estimates, ask about regulations and permits, understand route-specific restrictions, and learn about transportation laws." },
    ],
  },
  {
    num: "12",
    title: "Frontend Development & Customer Portals",
    category: "Full-Stack",
    accent: "cream",
    narrative: "Beyond backend and AI systems, the company needed polished customer-facing interfaces. I designed and built several frontend experiences from scratch.",
    approach: "Created marketing pages, registration portals, customer onboarding flows, and workflow-related user interfaces.",
    details: [
      { label: "Scope", text: "Marketing pages, registration portals with reCAPTCHA, customer onboarding pages, and workflow-related UI — all designed to feel professional and trustworthy." },
    ],
    image: "/case-studies/freelancing/fl-customer-portal.png",
    imageAlt: "Customer registration page",
    imageCaption: "A high-end customer registration and onboarding portal with integrated security checks.",
  },
];

const techStack = [
  {
    category: "AI & Foundation Models",
    description: "The cognitive engines I use to power intelligent systems.",
    items: [
      { name: "OpenAI", icon: null },
      { name: "Anthropic Claude", icon: null },
      { name: "Google Gemini", icon: null },
      { name: "Groq", icon: null },
      { name: "Hugging Face", icon: null },
    ],
  },
  {
    category: "AI Engineering & Agents",
    description: "Frameworks for building multi-agent and RAG pipelines.",
    items: [
      { name: "LangChain", icon: null },
      { name: "LangGraph", icon: null },
      { name: "LlamaIndex", icon: null },
      { name: "Vector DBs (Pinecone, Chroma)", icon: null },
      { name: "NLP & spaCy", icon: null },
    ],
  },
  {
    category: "Backend & Data",
    description: "Robust architecture for high-throughput operations.",
    items: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    category: "Frontend & Infrastructure",
    description: "Client portals and production deployments.",
    items: [
      { name: "React / Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
    ],
  },
];

/* ─── main page ─── */

export default async function FreelanceCaseStudy() {
  const portfolio = await getPublicPortfolio().catch(() => null);
  const name = portfolio?.personalInfo?.fullName || "Imad Khan";
  const whatsappPhone = "919125197678";
  const emailAddress = "aiwithimad@gmail.com";

  const whatsappMsg = encodeURIComponent(
    "Hi Imad, I came from your freelancing portfolio. I'd like to discuss AI automation for my business."
  );
  const emailSubject = encodeURIComponent("AI Automation Inquiry from Your Portfolio");
  const emailBody = encodeURIComponent(
    "Hi Imad,\n\nI came from your website and I'm interested in your AI services.\n\nHere's what I need help with:\n\n"
  );

  return (
    <FreelancingPage
      name={name}
      projects={projects}
      techStack={techStack}
      whatsappPhone={whatsappPhone}
      emailAddress={emailAddress}
      whatsappMsg={whatsappMsg}
      emailSubject={emailSubject}
      emailBody={emailBody}
    />
  );
}
