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
        "Architected and deployed an event-driven microservices platform on Kubernetes (KIND) with 4 FastAPI services and 17+ pods. Implemented GitOps CI/CD pipeline using GitHub Actions and ArgoCD with automated Docker builds and Trivy security scanning. Deployed full observability stack with Prometheus and Grafana for metrics collection.",
      technologies: ["FastAPI", "Kubernetes", "Docker", "ArgoCD", "GitHub Actions", "Prometheus", "Grafana", "RabbitMQ", "PostgreSQL"],
      image: "", // We'll use 3D artifact instead
      liveUrl: "https://github.com/inam101001", // Default to GitHub if no specific URL
      githubUrl: "https://github.com/inam101001",
    },
    {
      id: "02",
      title: "Mistle – Online Diagrams Design Tool (Academic)",
      description:
        "Containerized a Next.js application using Docker and deployed on AWS EC2 with nginx reverse proxy configuration. Built CI/CD pipeline using GitHub Actions for automated testing, building, and zero-downtime deployments. Provisioned cloud infrastructure using Terraform IaC for AWS services (EC2, Route 53, CloudFront, ACM).",
      technologies: ["Next.js", "Docker", "AWS", "Terraform", "GitHub Actions", "Prometheus", "Grafana"],
      image: "",
      liveUrl: "https://mistle-1rft.vercel.app/",
      githubUrl: "https://github.com/inam101001/Mistle",
    },
    {
      id: "03",
      title: "Personal Portfolio – AWS Infrastructure",
      description:
        "Deployed a React application with Jenkins CI/CD pipeline on AWS, achieving automated 2-minute deployment cycles. Implemented Infrastructure as Code using Terraform to provision and manage AWS services (S3, CloudFront, Route 53, EC2, ACM). Configured CloudWatch monitoring with SNS alerting for proactive incident response.",
      technologies: ["React", "AWS", "Terraform", "Jenkins", "CloudWatch", "CloudFront", "S3", "Route 53"],
      image: "",
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
            DevOps & Cloud{" "}
            <span className="text-[#00ff99]">Projects</span>
          </h2>
          <p className="text-gray-500 font-mono text-xs mt-3 tracking-wide">
            // practical implementations of scalable infrastructure and automation
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
