export type Project = {
  id: string;
  shortName: string;
  title: string;
  description: string;
  proof: string[];
  technologies: string[];
  stages: string[];
  liveUrl?: string;
  githubUrl: string;
};

export type SystemGroup = {
  id: string;
  name: string;
  tools: string[];
};

export const projects: Project[] = [
  {
    id: "banking",
    shortName: "Banking",
    title: "Microservices Banking Application",
    description:
      "An event-driven banking platform deployed on Kubernetes with four FastAPI services, GitOps delivery, security scanning, and production observability.",
    proof: ["4 FastAPI services", "17+ Kubernetes pods", "GitHub Actions + ArgoCD"],
    technologies: [
      "Kubernetes",
      "FastAPI",
      "Docker",
      "RabbitMQ",
      "PostgreSQL",
      "Trivy",
      "Prometheus",
      "Grafana",
      "Nginx",
    ],
    stages: ["Source", "Build", "Scan", "GitOps", "Cluster", "Observe"],
    githubUrl: "https://github.com/inam101001",
  },
  {
    id: "portfolio",
    shortName: "Portfolio",
    title: "Personal Portfolio - AWS Infrastructure",
    description:
      "A React portfolio backed by container delivery, Terraform-managed AWS infrastructure, HTTPS, automated verification, and a provisioned monitoring stack.",
    proof: ["Docker multi-stage build", "Terraform-managed AWS", "Prometheus + Grafana"],
    technologies: [
      "React",
      "TypeScript",
      "Docker",
      "Terraform",
      "AWS",
      "GitHub Actions",
      "Trivy",
      "Prometheus",
      "Grafana",
      "Nginx",
    ],
    stages: ["Build", "Scan", "Push", "Deploy", "Verify"],
    liveUrl: "https://inamulhaq.site",
    githubUrl: "https://github.com/inam101001/my-portfolio",
  },
  {
    id: "mistle",
    shortName: "Mistle",
    title: "Mistle - Online Diagram Design Tool",
    description:
      "A GoJS-powered diagramming app built on Next.js, containerized with a multi-stage Docker build and shipped through GitHub Actions to Google Cloud Run.",
    proof: ["Next.js + GoJS", "Docker multi-stage build", "GitHub Actions CI"],
    technologies: [
      "Next.js",
      "TypeScript",
      "GoJS",
      "Docker",
      "GitHub Actions",
      "Docker Hub",
      "Google Cloud Run",
      "MongoDB",
    ],
    stages: ["Source", "Package", "Ship", "Observe"],
    liveUrl: "https://mistle-1rft.vercel.app/",
    githubUrl: "https://github.com/inam101001/Mistle",
  },
];

export const systemGroups: SystemGroup[] = [
  {
    id: "cloud",
    name: "Cloud",
    tools: ["AWS", "GCP", "EC2", "EKS", "ECR", "S3", "CloudFront", "Route 53"],
  },
  {
    id: "delivery",
    name: "Delivery",
    tools: ["GitHub Actions", "Jenkins", "ArgoCD", "Trivy"],
  },
  {
    id: "containers",
    name: "Containers + IaC",
    tools: ["Docker", "Kubernetes", "Terraform", "Ansible"],
  },
  {
    id: "observability",
    name: "Observability",
    tools: ["Prometheus", "Grafana", "CloudWatch", "ELK"],
  },
  {
    id: "backend",
    name: "Backend + Data",
    tools: ["TypeScript", "Python", "Node.js", "NestJS", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    id: "network",
    name: "Network + Security",
    tools: ["Nginx", "DNS", "SSL/TLS", "VPC", "Security Groups", "IAM"],
  },
];

export type WorkRecord = {
  role: string;
  company: string;
  location?: string;
  period: string;
  areas?: { title: string; body: string }[];
};

export const workHistory: WorkRecord[] = [
  {
    role: "Software Engineer - Backend & DevOps",
    company: "Binomical LLC",
    location: "Remote",
    period: "July 2024 - April 2025",
    areas: [
      {
        title: "Backend",
        body: "Designed REST APIs with NestJS and TypeScript for production workloads.",
      },
      {
        title: "Delivery",
        body: "Built CI/CD pipelines with Jenkins and GitHub webhooks.",
      },
      {
        title: "Security",
        body: "Implemented JWT authentication and authorization practices.",
      },
      {
        title: "Operations",
        body: "Managed deployments, database performance, and service health.",
      },
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "KaiRiz Cyber Technologies (SMC-Private) Limited",
    period: "January 2024 - June 2024",
    areas: [
      {
        title: "Frontend",
        body: "Built responsive React interfaces for an internal security-tooling dashboard.",
      },
      {
        title: "Backend",
        body: "Developed REST endpoints in Node.js and Express for auth and data ingestion.",
      },
      {
        title: "Integration",
        body: "Wired dashboard views to live API data and internal authentication flows.",
      },
      {
        title: "Delivery",
        body: "Shipped features through staged environments under senior engineer review.",
      },
    ],
  },
];

export const education = [
  {
    degree: "MSc in Web & Data Science",
    institution: "Universität Koblenz",
    period: "April 2025 - present",
    location: "Koblenz, Germany",
  },
  {
    degree: "BS in Computer Science",
    institution: "University of Gujrat",
    period: "November 2020 - June 2024",
    location: "Gujrat, Pakistan",
  },
];

export const primaryTools = [
  "TypeScript",
  "Python",
  "Docker",
  "Kubernetes",
  "Terraform",
  "GitHub Actions",
  "Prometheus",
  "Grafana",
];
