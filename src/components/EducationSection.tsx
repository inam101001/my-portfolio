import React from "react";
import ScrollReveal from "./ScrollReveal";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

interface EducationItemProps {
  degree: string;
  institution: string;
  field?: string;
  period: string;
  location: string;
  index: number;
}

const EducationItem: React.FC<EducationItemProps> = ({
  degree,
  institution,
  field,
  period,
  location,
  index,
}) => (
  <ScrollReveal direction="up" delay={index * 150}>
    <div className="glass-card p-6 relative overflow-hidden group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-[#00ff99]/70 text-xs font-mono">
          <Calendar size={12} />
          <span>{period}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 text-xs font-mono">
          <MapPin size={11} />
          <span>{location}</span>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00ff99] transition-colors duration-300">
          {degree}
        </h3>
        {field && (
          <p className="text-gray-400 font-mono text-[11px] mb-1">{field}</p>
        )}
        <p className="text-[#00ff99]/50 font-mono text-xs">{institution}</p>
      </div>

      <GraduationCap
        size={80}
        className="absolute bottom-[-10px] right-[-10px] text-[#00ff99]/03 -rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none"
      />
    </div>
  </ScrollReveal>
);

const EducationSection: React.FC = () => {
  const education = [
    {
      degree: "MSc in Web & Data Science",
      institution: "Universität Koblenz",
      field: "Advanced Analytics & Cloud Systems",
      period: "April 2025 – Ongoing",
      location: "Koblenz, Germany",
    },
    {
      degree: "BS in Computer Science",
      institution: "University of Gujrat",
      field: "Software Engineering & Algorithms",
      period: "Nov 2020 – June 2024",
      location: "Gujrat, Pakistan",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 section-heading">Education</h2>
      <p className="text-gray-500 font-mono text-sm mb-8 mt-3">
        // academic foundation in cloud and data
      </p>

      <div className="space-y-4 max-w-2xl">
        {education.map((edu, i) => (
          <EducationItem key={i} {...edu} index={i} />
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
