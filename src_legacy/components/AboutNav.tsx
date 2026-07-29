import React from 'react';
import { Briefcase, GraduationCap, Cpu, User } from 'lucide-react';

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-mono
      transition-all duration-300 text-left group
      ${isActive
        ? 'bg-[#00ff99] text-black font-bold shadow-[0_0_20px_rgba(0,255,153,0.25)]'
        : 'glass-panel text-gray-400 hover:text-[#00ff99] hover:border-[#00ff99]/30'
      }
    `}
  >
    <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "" : "text-[#00ff99]/60"}`}>
      {icon}
    </span>
    {label}
    {isActive && (
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black" />
    )}
  </button>
);

interface AboutNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AboutNav: React.FC<AboutNavProps> = ({ activeSection, onSectionChange }) => {
  const items = [
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Cpu size={16} /> },
    { id: 'about', label: 'About Me', icon: <User size={16} /> },
  ];

  return (
    <div className="space-y-2 w-full md:w-52 lg:w-56 shrink-0">
      {items.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          isActive={activeSection === item.id}
          onClick={() => onSectionChange(item.id)}
        />
      ))}
    </div>
  );
};

export default AboutNav;