export const roles = ["AI Engineer", "Full Stack Developer", "Agentic AI Builder"];

export const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:hello@luckypatil.dev" },
];

export const techStack = [
  { name: "React", color: "#61DAFB" },
  { name: "Python", color: "#3776AB" },
  { name: "Node.js", color: "#3C873A" },
  { name: "MongoDB", color: "#47A248" },
  { name: "LangGraph", color: "#A855F7" },
  { name: "OpenAI", color: "#22D3EE" },
  { name: "FastAPI", color: "#009688" },
  { name: "Docker", color: "#2496ED" },
  { name: "Git", color: "#F05032" },
  { name: "TensorFlow", color: "#FF6F00" },
];

export const techExpertise: Record<string, string> = {
  React: "Building performant, animated interfaces with component-driven architecture.",
  Python: "The backbone of every agent, API, and ML pipeline I ship.",
  "Node.js": "Event-driven services and real-time APIs at scale.",
  MongoDB: "Flexible document storage for fast-moving product data.",
  LangGraph: "Orchestrating multi-agent AI workflows with state and memory.",
  OpenAI: "LLM integration, prompt engineering, and tool-calling agents.",
  FastAPI: "High-performance Python APIs with async I/O and typed contracts.",
  Docker: "Reproducible environments from dev to production.",
  Git: "Clean history, disciplined branching, zero regrets.",
  TensorFlow: "Training and deploying custom ML models end to end.",
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  tags: string[];
  challenge: string;
  solution: string;
  stack: string[];
  impact: string[];
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "agritwin",
    name: "AgriTwin",
    tagline: "AI-powered agricultural supply chain digital twin",
    tags: ["Multi-Agent AI", "FastAPI", "React", "PostgreSQL"],
    challenge:
      "India's agri supply chain spans five disconnected roles — farmers, FPOs, transporters, storage operators, and buyers — with no shared source of truth on crop movement, quality, or pricing.",
    solution:
      "A digital twin platform mirroring the physical supply chain in real time, coordinated by seven specialized AI agents that forecast demand, optimize routing, and flag quality risk across every role's dashboard.",
    stack: ["FastAPI", "React", "PostgreSQL", "Redis", "Docker Compose", "LangGraph"],
    impact: [
      "5 role-specific dashboards unified on one live data layer",
      "7 autonomous AI agents handling forecasting, routing & quality checks",
      "Full CRUD parity across Farmer, FPO, Transporter & Storage roles",
    ],
    gradient: "from-blue via-purple to-cyan",
  },
  {
    slug: "krishiment",
    name: "Krishiment",
    tagline: "Farmer-facing crop intelligence platform",
    tags: ["RAG", "NLP", "Regional Languages"],
    challenge:
      "Farmers needed crop guidance in their own language, delivered in a form they could actually act on in the field — not a generic chatbot.",
    solution:
      "A retrieval-augmented assistant trained on regional agricultural knowledge, supporting Hindi, Marathi, and English with voice-first interaction for low-literacy accessibility.",
    stack: ["Python", "RAG", "FastAPI", "React", "Whisper"],
    impact: [
      "48 crop categories covered across major Indian staples",
      "3 languages supported with reliable voice input/output",
      "Rebuilt query matching to eliminate default-answer misfires",
    ],
    gradient: "from-purple via-cyan to-blue",
  },
  {
    slug: "ai-job-agent",
    name: "AI Job Automation Agent",
    tagline: "Autonomous agent for end-to-end job applications",
    tags: ["Agentic AI", "Automation", "LLM"],
    challenge:
      "Job seekers lose hours to repetitive, low-signal application work — tailoring resumes, filling forms, tracking status — across dozens of postings a week.",
    solution:
      "A LangGraph-orchestrated agent that reads postings, tailors application material, fills forms autonomously, and maintains a live status tracker with human-in-the-loop approval gates.",
    stack: ["LangGraph", "OpenAI", "Python", "Playwright"],
    impact: [
      "Cut manual application time significantly per posting",
      "Human-approval checkpoints preserved control over every submission",
      "Structured tracker replaced spreadsheet-based status chasing",
    ],
    gradient: "from-cyan via-blue to-purple",
  },
  {
    slug: "smart-onion-storage",
    name: "Smart Onion Storage System",
    tagline: "IoT-driven storage monitoring to cut post-harvest loss",
    tags: ["IoT", "Sensors", "Predictive Alerts"],
    challenge:
      "Onion storage in India suffers heavy post-harvest loss from unmonitored temperature and humidity swings, especially in smaller storage facilities.",
    solution:
      "A sensor network feeding a predictive model that flags spoilage risk before it happens, with SMS-based alerts for operators without smartphone access.",
    stack: ["Python", "IoT Sensors", "TensorFlow", "SMS Gateway"],
    impact: [
      "Early-warning alerts ahead of visible spoilage onset",
      "SMS-first design for low-connectivity storage facilities",
      "Model tuned specifically for onion-storage humidity thresholds",
    ],
    gradient: "from-blue via-cyan to-purple",
  },
  {
    slug: "portfolio-ai-assistant",
    name: "Portfolio AI Assistant",
    tagline: "An embedded agent that answers questions about this portfolio",
    tags: ["Conversational AI", "Embeddings"],
    challenge:
      "Static portfolios can't answer specific questions a recruiter or collaborator actually has — they just scroll and hope.",
    solution:
      "A lightweight embedded assistant with retrieval over my project and experience data, so visitors can ask direct questions and get direct answers.",
    stack: ["OpenAI", "Vector Search", "FastAPI", "React"],
    impact: [
      "Turns a static page into a queryable source of truth",
      "Grounded strictly in my real project & experience data",
      "Sub-second response on common recruiter questions",
    ],
    gradient: "from-purple via-blue to-cyan",
  },
];

export const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "FastAPI", level: 93 },
      { name: "Node.js", level: 82 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 78 },
    ],
  },
  {
    name: "AI",
    skills: [
      { name: "LangGraph / Agents", level: 90 },
      { name: "RAG Systems", level: 88 },
      { name: "LLM Integration", level: 91 },
      { name: "TensorFlow", level: 75 },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "Docker", level: 86 },
      { name: "CI/CD", level: 80 },
      { name: "AWS", level: 74 },
      { name: "Git", level: 94 },
    ],
  },
];

export const experience = [
  {
    period: "2025 — Present",
    role: "Founder & Lead Engineer",
    org: "AgriTwin",
    description:
      "Architecting a multi-agent digital twin platform for agricultural supply chains, spanning five stakeholder roles and seven autonomous AI agents.",
  },
  {
    period: "2024 — 2025",
    role: "AI & Full Stack Developer",
    org: "Krishiment",
    description:
      "Built a multilingual RAG-based farming assistant from zero to production, covering 48 crops across Hindi, Marathi, and English.",
  },
  {
    period: "2023 — 2024",
    role: "Full Stack Developer",
    org: "Independent Projects",
    description:
      "Shipped automation agents and IoT-integrated systems, focused on real-world impact for underserved users.",
  },
  {
    period: "2022 — 2023",
    role: "Machine Learning Intern",
    org: "AgTech Research Lab",
    description:
      "Researched predictive models for post-harvest crop loss, laying the groundwork for later production systems.",
  },
];

export const achievements = [
  { number: 5, suffix: "+", label: "Hackathons Placed" },
  { number: 48, suffix: "", label: "Crops Modeled in Krishiment" },
  { number: 7, suffix: "", label: "AI Agents in AgriTwin" },
  { number: 3, suffix: "", label: "Languages Supported" },
];

export const testimonials = [
  {
    quote:
      "Lucky turned a vague agricultural data problem into a working multi-agent system faster than I thought possible.",
    name: "Priya Deshmukh",
    role: "Product Lead, AgTech Collective",
  },
  {
    quote:
      "The attention to real farmer needs — language, voice, offline reliability — set this apart from typical AI demos.",
    name: "Rohan Kulkarni",
    role: "Agricultural Extension Officer",
  },
  {
    quote:
      "Clean architecture, no shortcuts. The kind of engineer you hand a hard problem to and stop worrying about it.",
    name: "Ananya Rao",
    role: "Engineering Manager",
  },
  {
    quote:
      "Rare mix of ML depth and product sense. AgriTwin's agent design is genuinely thoughtful, not just impressive on paper.",
    name: "Dev Sharma",
    role: "AI Researcher",
  },
];
