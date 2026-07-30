export type ProjectRecord = {
  id: string;
  slug: "banking" | "mistle" | "portfolio";
  title: string;
  summary: string;
  outcome: string;
  stack: string[];
  repository: string;
  live?: string;
  image?: string;
};

export type ExperienceRecord = {
  period: string;
  role: string;
  company: string;
  location: string;
  detail: string;
};

export const projects: ProjectRecord[] = [
  {
    id: "MOA-PRJ-001",
    slug: "banking",
    title: "Microservices Banking Platform",
    summary:
      "An event-driven banking platform running four FastAPI services across Kubernetes, with GitOps delivery, security scanning, and full observability.",
    outcome: "Traceable, self-healing delivery",
    stack: [
      "Kubernetes",
      "ArgoCD",
      "RabbitMQ",
      "Prometheus",
      "Terraform",
    ],
    repository: "https://github.com/inam101001",
  },
  {
    id: "MOA-PRJ-002",
    slug: "mistle",
    title: "Mistle Diagram Platform",
    summary:
      "A containerized Next.js product deployed to AWS EC2 behind Nginx, Route 53, CloudFront, and ACM, provisioned with Terraform and shipped through GitHub Actions.",
    outcome: "Automated cloud delivery",
    stack: ["AWS", "Docker", "Terraform", "GitHub Actions", "Grafana"],
    repository: "https://github.com/inam101001/Mistle",
    live: "https://mistle-1rft.vercel.app/",
    image: "/mistle.jpg",
  },
  {
    id: "MOA-PRJ-003",
    slug: "portfolio",
    title: "Portfolio Delivery System",
    summary:
      "A production pipeline for this portfolio using multi-stage Docker builds, Trivy auditing, Terraform-managed AWS infrastructure, and monitored Nginx delivery.",
    outcome: "Infrastructure and app released together",
    stack: ["React", "AWS", "Trivy", "Docker", "CloudFront"],
    repository: "https://github.com/inam101001/my-portfolio",
    live: "https://inamulhaq.dev",
  },
];

export const experiences: ExperienceRecord[] = [
  {
    period: "07.2024 — 04.2025",
    role: "Software Engineer, Backend & DevOps",
    company: "Binomical LLC",
    location: "Remote",
    detail:
      "Built Jenkins and GitHub webhook pipelines, deployed containerized applications to Google Cloud Run, and integrated LLM-powered automation.",
  },
  {
    period: "Summer 2023",
    role: "Web Developer Intern",
    company: "KaiRiz Cyber Technologies",
    location: "Pakistan",
    detail:
      "Built responsive React interfaces and contributed to backend microservices in a cybersecurity product environment.",
  },
  {
    period: "2022 — 2023",
    role: "Freelance Web Developer",
    company: "E-commerce startup",
    location: "Remote",
    detail:
      "Delivered full-stack commerce systems with performance optimization and Stripe payment integrations.",
  },
  {
    period: "2022 — 2023",
    role: "Teaching Assistant",
    company: "University of Gujrat",
    location: "Gujrat, Pakistan",
    detail:
      "Mentored data structures and algorithms labs and reviewed more than 60 student projects.",
  },
];

export const education = [
  {
    period: "04.2025 — ongoing",
    degree: "MSc Web & Data Science",
    institution: "Universität Koblenz",
    location: "Koblenz, Germany",
  },
  {
    period: "11.2020 — 06.2024",
    degree: "BS Computer Science",
    institution: "University of Gujrat",
    location: "Gujrat, Pakistan",
  },
];

export const operationSignals = [
  "git push",
  "build",
  "test",
  "trivy scan",
  "package",
  "provision",
  "deploy",
  "health check",
  "observe",
];
