import React from 'react';

interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-3 px-6 text-left transition-colors ${
      isActive 
        ? 'bg-[#00ff99] text-black' 
        : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'
    } rounded-md`}
  >
    {label}
  </button>
);

interface AboutNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AboutNav: React.FC<AboutNavProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="space-y-2 w-64">
      <NavItem
        label="Experience"
        isActive={activeSection === 'experience'}
        onClick={() => onSectionChange('experience')}
      />
      <NavItem
        label="Education"
        isActive={activeSection === 'education'}
        onClick={() => onSectionChange('education')}
      />
      <NavItem
        label="Skills"
        isActive={activeSection === 'skills'}
        onClick={() => onSectionChange('skills')}
      />
      <NavItem
        label="About me"
        isActive={activeSection === 'about'}
        onClick={() => onSectionChange('about')}
      />
    </div>
  );
};

export default AboutNav;