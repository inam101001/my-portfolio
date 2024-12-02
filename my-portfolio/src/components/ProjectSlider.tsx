import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { ProjectData } from "../types/project";
import ProjectTechnologies from "./ProjectTechnologies";

interface ProjectSliderProps {
  projects: ProjectData[];
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="text-[#00ff99] text-8xl font-bold opacity-20">
            {currentProject.id}
          </div>
          <h3 className="text-3xl font-bold text-white">
            {currentProject.title}
          </h3>
          <p className="text-gray-400">{currentProject.description}</p>

          <ProjectTechnologies technologies={currentProject.technologies} />

          <div className="flex gap-4">
            <a
              href={currentProject.liveUrl}
              className="flex items-center gap-2 text-[#00ff99] hover:text-white transition-colors"
            >
              <ExternalLink size={20} />
              <span>Live Preview</span>
            </a>
            <a
              href={currentProject.githubUrl}
              className="flex items-center gap-2 text-[#00ff99] hover:text-white transition-colors"
            >
              <Github size={20} />
              <span>View Code</span>
            </a>
          </div>
        </div>

        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg border-2 border-[#00ff99]/20">
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      <div className="w-1/2 flex gap-2 absolute bottom-0 left-0 mb-0.5">
        <button
          onClick={prevSlide}
          className="w-full p-2 bg-[#00ff99] text-black hover:bg-[#00cc7a] transition-colors rounded-lg"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-full p-2 bg-[#00ff99] text-black hover:bg-[#00cc7a] transition-colors rounded-lg flex justify-between items-center"
        >
          <span></span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProjectSlider;
