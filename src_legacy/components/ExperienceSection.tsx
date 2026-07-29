import React from "react";
import ScrollReveal from "./ScrollReveal";
import { MapPin, Calendar } from "lucide-react";

interface ExperienceItemProps {
  period: string;
  title: string;
  company: string;
  location?: string;
  description?: string;
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  period,
  title,
  company,
  location,
  description,
  index,
}) => (
  <ScrollReveal direction="up" delay={index * 100}>
    <div className="glass-card p-6 group h-full">
      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-2 text-[#00ff99]/70 text-xs font-mono">
          <Calendar size={12} />
          <span>{period}</span>
        </div>
        {location && (
          <div className="flex items-center gap-1 text-gray-600 text-xs font-mono">
            <MapPin size={11} />
            <span>{location}</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ff99] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[#00ff99]/60 font-mono text-sm mb-2">{company}</p>
      {description && (
        <p className="text-gray-500 font-mono text-[11px] leading-relaxed mt-2 border-l border-[#00ff99]/10 pl-3">
          {description}
        </p>
      )}

      <div className="mt-4 h-px bg-gradient-to-r from-[#00ff99]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  </ScrollReveal>
);

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      period: "July 2024 – April 2025",
      title: "Software Engineer – Backend & DevOps",
      company: "Binomical LLC",
      location: "Remote",
      description:
        "Built and maintained CI/CD pipelines using Jenkins and GitHub webhooks. Deployed containerized applications on GCP using Docker and Cloud Run. Integrated AI-powered automation using LLM APIs.",
    },
    {
      period: "Summer 2023",
      title: "Web Developer Intern",
      company: "KaiRiz Cyber Technologies",
      location: "Pakistan",
      description:
        "Developed responsive front-end interfaces with React and contributed to backend microservices in a cybersecurity product environment.",
    },
    {
      period: "2022 – 2023",
      title: "Freelance Web Developer",
      company: "E-commerce Startup",
      location: "Remote",
      description:
        "Delivered full-stack e-commerce solutions with performance optimization and Stripe payment integrations.",
    },
    {
      period: "2022 – 2023",
      title: "Teaching Assistant",
      company: "University of Gujrat",
      location: "Gujrat, Pakistan",
      description:
        "Mentored students in lab sessions for data structures and algorithms, reviewing over 60 student projects.",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 section-heading">Experience</h2>
      <p className="text-gray-500 font-mono text-sm mb-8 mt-3">
        // production automation and code infrastructure
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences.map((exp, i) => (
          <ExperienceItem key={i} {...exp} index={i} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
