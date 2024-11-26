import React, { useState } from 'react';
import AboutNav from './AboutNav';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import AboutMeSection from './AboutMeSection';

const AboutSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState('experience');

  const renderContent = () => {
    switch (activeSection) {
      case 'experience':
        return <ExperienceSection />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsSection />;
      case 'about':
        return <AboutMeSection />;
      default:
        return <ExperienceSection />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <AboutNav activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default AboutSection;