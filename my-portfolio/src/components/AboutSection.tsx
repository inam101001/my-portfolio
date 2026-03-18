import React, { useState } from "react";
import AboutNav from "./AboutNav";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import AboutMeSection from "./AboutMeSection";
import ScrollReveal from "./ScrollReveal";

const AboutSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState("experience");

  const renderContent = () => {
    switch (activeSection) {
      case "experience": return <ExperienceSection />;
      case "education": return <EducationSection />;
      case "skills": return <SkillsSection />;
      case "about": return <AboutMeSection />;
      default: return <ExperienceSection />;
    }
  };

  return (
    <div className="py-8">
      {/* Section header */}
      <ScrollReveal>
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-8 bg-[#00ff99]" />
            <span className="text-[#00ff99] font-mono text-xs tracking-[0.2em] uppercase">About</span>
          </div>
          <h2 className="text-4xl font-bold text-white">
            Who I{" "}
            <span className="text-[#00ff99]">Am</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-2">
            // a developer who cares about the details
          </p>
        </div>
      </ScrollReveal>

      <div className="flex flex-col md:flex-row gap-6 xl:gap-10">
        <ScrollReveal direction="left">
          <AboutNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </ScrollReveal>

        <div className="flex-1 min-w-0">
          <ScrollReveal direction="right" key={activeSection}>
            {renderContent()}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
