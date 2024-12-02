import React from "react";
import ProjectSlider from "./ProjectSlider";
import { ProjectData } from "../types/project";

const ProjectsSection: React.FC = () => {
  const projects: ProjectData[] = [
    {
      id: "01",
      title: "E-Commerce Platform",
      description:
        "A full-featured online shopping platform with real-time inventory management.",
      technologies: ["Next.js", "Tailwind.css", "Node.js"],
      image:
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1280",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "02",
      title: "Interior Design Portfolio",
      description:
        "Modern portfolio website for an interior design studio showcasing their work.",
      technologies: ["React", "Styled Components", "Firebase"],
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1280",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "03",
      title: "Task Management App",
      description:
        "Collaborative task management platform with real-time updates.",
      technologies: ["Vue.js", "Express", "MongoDB"],
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1280",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white">
          Featured Projects
        </h2>
        <ProjectSlider projects={projects} />
      </div>
    </section>
  );
};

export default ProjectsSection;
