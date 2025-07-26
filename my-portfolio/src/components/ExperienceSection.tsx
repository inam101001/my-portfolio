import React from "react";

interface ExperienceItemProps {
  period: string;
  title: string;
  company: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  period,
  title,
  company,
}) => (
  <div className="p-6 rounded-lg relative bg-black/50 backdrop-blur-sm border border-[#00ff99]/20">
    <div className="text-[#00ff99] mb-2">{period}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{company}</p>
  </div>
);

const ExperienceSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">My experience</h2>
      <p className="text-gray-400 mb-8">
        Passionate developer with a track record of creating innovative
        solutions and delivering high-quality software products.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExperienceItem
          period="2024 - 2025"
          title="Backend Developer"
          company="Binomical LLC"
        />
        <ExperienceItem
          period="Summer 2023"
          title="Web Developer Intern"
          company="KaiRiz Cyber Technologies"
        />
        <ExperienceItem
          period="2022 - 2023"
          title="Freelance Web Developer"
          company="E-commerce Startup"
        />
        <ExperienceItem
          period="2022 - 2023"
          title="Teaching Assistant"
          company="University of Gujrat"
        />
      </div>
    </div>
  );
};

export default ExperienceSection;
