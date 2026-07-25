import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const SocialLinks: React.FC = () => {
  const links = [
    {
      icon: <Github size={18} />,
      href: "https://github.com/inam101001",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/iaminam/",
      label: "LinkedIn",
    },
  ];

  return (
    <div className="flex gap-3 mt-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="w-10 h-10 glass-card rounded-full flex items-center justify-center
                     text-[#00ff99]/70 hover:text-[#00ff99]
                     hover:border-[#00ff99]/60 hover:shadow-[0_0_14px_rgba(0,255,153,0.25)]
                     transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;