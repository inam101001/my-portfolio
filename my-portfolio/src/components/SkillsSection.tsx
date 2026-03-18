import React, { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface Skill {
  name: string;
  icon: string;
  level: number;
  category: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  active: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, active }) => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setBarWidth(skill.level), index * 60 + 200);
      return () => clearTimeout(t);
    }
  }, [active, skill.level, index]);

  return (
    <ScrollReveal direction="up" delay={index * 50}>
      <div className="glass-card p-4 group">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-[#00ff99]/15 group-hover:border-[#00ff99]/40 transition-all duration-300 p-1.5">
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium truncate">{skill.name}</span>
              <span className="text-[#00ff99]/60 text-xs font-mono ml-2 shrink-0">{skill.level}%</span>
            </div>
            {/* Skill bar */}
            <div className="mt-1.5 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full skill-bar-fill transition-all duration-1000 ease-out"
                style={{
                  width: `${barWidth}%`,
                  background: "linear-gradient(90deg, #00cc7a, #00ff99)",
                }}
              />
            </div>
          </div>
        </div>
        <span className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">{skill.category}</span>
      </div>
    </ScrollReveal>
  );
};

const SkillsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const skills: Skill[] = [
    // CLOUD/DEVOPS
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", level: 85, category: "Cloud" },
    { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", level: 80, category: "Cloud" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 90, category: "DevOps" },
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", level: 82, category: "DevOps" },
    { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", level: 88, category: "Infrastructure" },
    { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", level: 85, category: "CI/CD" },
    { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 92, category: "CI/CD" },
    { name: "ArgoCD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg", level: 75, category: "DevOps" },
    { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg", level: 80, category: "Monitoring" },
    { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg", level: 82, category: "Visualization" },
    // LANGUAGES & FEED
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 88, category: "Language" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 85, category: "Language" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 88, category: "Backend" },
    { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", level: 80, category: "Backend" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: 78, category: "Database" },
  ];

  return (
    <div ref={ref}>
      <h2 className="text-3xl font-bold mb-2 section-heading">Technical Arsenal</h2>
      <p className="text-gray-500 font-mono text-xs mt-3 mb-8 tracking-wide">
        // prioritizing reliable automation and cloud-native architecture
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} active={active} />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
