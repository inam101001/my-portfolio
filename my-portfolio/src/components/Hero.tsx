import React from "react";
import Terminal from "./Terminal";
import Stats from "./Stats";
import SocialLinks from "./SocialLinks";
import { Download } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="container mx-auto px-4 h-full flex flex-col justify-center">
      {/* Introduction and Terminal Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
        {/* Introduction */}
        <div>
          <h2 className="text-gray-400 mb-2 font-mono">Software Developer</h2>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Hello I'm
            <br />
            <span className="text-[#00ff99]">Inam Ul Haq</span>
          </h1>
          <p className="text-gray-400 max-w-xl">
            I excel at crafting elegant digital experiences and I am proficient
            in various programming languages and technologies.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-2 border border-[#00ff99] text-[#00ff99] rounded-full hover:bg-[#00ff99]/10 transition-colors flex items-center gap-2">
              <Download size={18} />
              DOWNLOAD CV
            </button>
          </div>

          <SocialLinks />
        </div>

        {/* Terminal */}
        <Terminal
          command="cat introduction.txt"
          output={[
            "$ whoami",
            "Full Stack Developer specializing in:",
            "- Frontend Development (React, Vue, Angular)",
            "- Backend Development (Node.js, Python, Java)",
            "- DevOps & Cloud Architecture",
            "",
            "$ skills --list",
            "→ JavaScript/TypeScript",
            "→ React/Next.js",
            "→ Node.js/Express",
            "→ MongoDB/PostgreSQL",
            "→ AWS/Docker",
          ]}
        />
      </div>

      {/* Stats Row */}
      <Stats />
    </div>
  );
};

export default Hero;
