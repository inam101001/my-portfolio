import React from "react";
import ProjectSlider from "./ProjectSlider";
import { ProjectData } from "../types/project";

const ProjectsSection: React.FC = () => {
  const projects: ProjectData[] = [
    {
      id: '01',
      title: 'Mistle',
      description:
        'Mistle is an online diagram design tool built using the GoJS library. Offers a user-friendly interface for efficient diagram creation. Utilizes React, TailwindCSS, and GoJS on the client-side. Uses Node, NextJS, and MongoDB on the server-side.',
      technologies: ['Next.js', 'Tailwind.css', 'Node.js', 'GoJS', 'MongoDB'],
      image: '/mistle.jpg',
      liveUrl: 'https://mistle-1rft.vercel.app/',
      githubUrl: 'https://github.com/inam101001/Mistle',
    },
    {
      id: '02',
      title: 'RS Calibration',
      description:
        'RS Calibration is a company that provides calibration services for various instruments. It is built using React, Next.js, Tailwind.css, and Email.js.',
      technologies: ['React', 'Next.js', 'Tailwind.css', 'Email.js'],
      image: '/rscalibration.jpg',
      liveUrl: 'https://www.rscalibration.com.au/',
      githubUrl: 'https://github.com/inam101001/rs-calibration',
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
