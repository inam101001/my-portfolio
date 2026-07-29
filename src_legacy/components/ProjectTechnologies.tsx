import React from "react";

interface ProjectTechnologiesProps {
  technologies: string[];
}

const ProjectTechnologies: React.FC<ProjectTechnologiesProps> = ({
  technologies,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 bg-[#1a1a1a] text-[#00ff99] text-sm rounded-full border border-[#00ff99]/20"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

export default ProjectTechnologies;
