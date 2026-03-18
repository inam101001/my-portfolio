import React from "react";
import ProjectSlider from "./ProjectSlider";
import { ProjectData } from "../types/project";
import ScrollReveal from "./ScrollReveal";

const ProjectsSection: React.FC = () => {
  const projects: ProjectData[] = [
    {
      id: "01",
      title: "Microservices Banking Application",
      description:
        "Architected and deployed an event-driven microservices platform on Kubernetes (KIND) with 4 FastAPI services and 17+ pods. Implemented GitOps CI/CD pipeline using GitHub Actions and ArgoCD with automated Docker builds and Trivy security scanning.",
      technologies: ["Kubernetes", "Docker", "ArgoCD", "GitHub Actions", "Prometheus", "Grafana", "RabbitMQ", "PostgreSQL", "Terraform"],
      diagrams: [
        { id: "arch-1", title: "Cloud Infrastructure & Routing", type: "banking_architecture", description: "Path-based routing with NGINX Ingress and Service discovery on KIND." },
        { id: "pipe-1", title: "Continuous Delivery (CI)", type: "banking_pipeline", description: "Smart builds, Docker image tags, and Trivy security scanning via GitHub Actions." },
        { id: "ops-1",  title: "GitOps State Sync (CD)", type: "banking_gitops", description: "Continuous Deployment using ArgoCD for self-healing and zero-downtime rollouts." },
        { id: "mon-1",  title: "Observability Stack", type: "banking_monitoring", description: "Distributed tracing, Prometheus metrics collection, and Grafana visualization." }
      ],
      liveUrl: "https://github.com/inam101001",
      githubUrl: "https://github.com/inam101001",
    },
    {
      id: "02",
      title: "Mistle– Online Diagrams Design Tool (Academic)",
      description:
        "Containerized Next.js application using Docker builds and deployed on AWS EC2 with nginx reverse proxy configuration. Built CI/CD pipeline using GitHub Actions for automated testing, building, and zero-downtime deployments. Provisioned cloud infrastructure using Terraform IaC for AWS resources (EC2, Route 53, CloudFront, ACM).",
      technologies: ["Next.js", "Docker", "AWS", "Terraform", "GitHub Actions", "Prometheus", "Grafana", "Nginx"],
      diagrams: [
        { id: "mistle-1", title: "Full DevOps Lifecycle", type: "mistle_lifecycle", description: "End-to-end automation from Source Control to Production monitoring." },
        { id: "mistle-2", title: "AWS Cloud Infrastructure", type: "mistle_aws", description: "Highly available routing via Route 53 and CloudFront with ACM SSL termination." },
        { id: "mistle-3", title: "CI/CD Pipeline Flow", type: "mistle_pipeline", description: "Multi-stage Docker builds and automated SSH-triggered deployment cycles." },
        { id: "mistle-4", title: "Monitoring & Observability", type: "mistle_monitoring", description: "Prometheus metrics collection from app, server, and proxy with Grafana dashboards." }
      ],
      liveUrl: "https://mistle-1rft.vercel.app/",
      githubUrl: "https://github.com/inam101001/Mistle",
    },
    {
      id: "03",
      title: "Personal Portfolio – AWS CI/CD",
      description:
        "Deployed a React application with Jenkins CI/CD pipeline on AWS. Implemented Infrastructure as Code using Terraform to provision CloudFront, Route 53, and S3.",
      technologies: ["React", "AWS", "Terraform", "Jenkins", "CloudWatch"],
      diagrams: [
        { id: "aws-2", title: "Portfolio Pipeline", type: "aws_infra" }
      ],
      liveUrl: "https://inamulhaq.dev",
      githubUrl: "https://github.com/inam101001/rs-calibration",
    },
  ];

  return (
    <div className="py-8">
      <ScrollReveal>
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8 bg-[#00ff99]" />
            <span className="text-[#00ff99] font-mono text-xs tracking-[0.2em] uppercase">Impact</span>
          </div>
          <h2 className="text-4xl font-bold text-white">
            <span className="text-[#00ff99]">Projects</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs mt-3 tracking-wide">
            // architecture, infrastructure & automation
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <ProjectSlider projects={projects} />
      </ScrollReveal>
    </div>
  );
};

export default ProjectsSection;
