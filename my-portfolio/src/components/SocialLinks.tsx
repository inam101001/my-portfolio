import React from 'react';
import { Github, Linkedin, Youtube, Twitter } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-4 mt-6">
      <a
        href="#"
        className="w-10 h-10 border border-[#00ff99] rounded-full flex items-center justify-center hover:bg-[#00ff99]/10 transition-colors"
      >
        <Github size={18} className="text-[#00ff99]" />
      </a>
      <a
        href="#"
        className="w-10 h-10 border border-[#00ff99] rounded-full flex items-center justify-center hover:bg-[#00ff99]/10 transition-colors"
      >
        <Linkedin size={18} className="text-[#00ff99]" />
      </a>
      <a
        href="#"
        className="w-10 h-10 border border-[#00ff99] rounded-full flex items-center justify-center hover:bg-[#00ff99]/10 transition-colors"
      >
        <Youtube size={18} className="text-[#00ff99]" />
      </a>
      <a
        href="#"
        className="w-10 h-10 border border-[#00ff99] rounded-full flex items-center justify-center hover:bg-[#00ff99]/10 transition-colors"
      >
        <Twitter size={18} className="text-[#00ff99]" />
      </a>
    </div>
  );
};

export default SocialLinks;