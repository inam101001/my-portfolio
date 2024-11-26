import React from 'react';
import { Code2, User, Briefcase, Mail } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black border border-[#00ff99] rounded-full px-6 py-3 z-50">
      <ul className="flex items-center gap-8">
        <li>
          <a href="#home" className="text-[#00ff99] hover:text-white transition-colors">
            <Code2 size={20} />
          </a>
        </li>
        <li>
          <a href="#about" className="text-[#00ff99] hover:text-white transition-colors">
            <User size={20} />
          </a>
        </li>
        <li>
          <a href="#projects" className="text-[#00ff99] hover:text-white transition-colors">
            <Briefcase size={20} />
          </a>
        </li>
        <li>
          <a href="#contact" className="text-[#00ff99] hover:text-white transition-colors">
            <Mail size={20} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;