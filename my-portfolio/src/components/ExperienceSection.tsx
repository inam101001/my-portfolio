import React from 'react';

interface ExperienceItemProps {
  period: string;
  title: string;
  company: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ period, title, company }) => (
  <div className="bg-[#1a1a1a] p-6 rounded-lg relative">
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
        Passionate developer with a track record of creating innovative solutions
        and delivering high-quality software products.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExperienceItem
          period="2022 - Present"
          title="Full Stack Developer"
          company="Tech Solutions Inc."
        />
        <ExperienceItem
          period="Summer 2021"
          title="Front-End Developer Intern"
          company="Web Design Studio"
        />
        <ExperienceItem
          period="2020 - 2021"
          title="Freelance Web Developer"
          company="E-commerce Startup"
        />
        <ExperienceItem
          period="2019 - 2020"
          title="Teaching Assistant"
          company="Tech Academy"
        />
      </div>
    </div>
  );
};

export default ExperienceSection;