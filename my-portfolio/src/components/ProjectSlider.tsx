import React, { useState, useEffect, Suspense } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Loader2 } from "lucide-react";
import { ProjectData } from "../types/project";
import ProjectArtifact from "./ProjectArtifact";

interface ProjectSliderProps {
  projects: ProjectData[];
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const transition = (newIndex: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 350);
  };

  const nextSlide = () =>
    transition((currentIndex + 1) % projects.length, "next");
  const prevSlide = () =>
    transition((currentIndex - 1 + projects.length) % projects.length, "prev");

  const current = projects[currentIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex]);

  return (
    <div className="relative">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-center
          transition-all duration-350
          ${isAnimating
            ? direction === "next"
              ? "opacity-0 translate-x-4"
              : "opacity-0 -translate-x-4"
            : "opacity-100 translate-x-0"
          }
        `}
        style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }}
      >
        {/* Info Side */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-[#00ff99]/20 text-6xl font-bold font-mono leading-none select-none">
              {current.id}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00ff99]/30 to-transparent" />
          </div>

          <h3 className="text-3xl font-bold text-white min-h-[4rem] flex items-center">{current.title}</h3>

          <p className="text-gray-400 font-mono text-[13px] leading-relaxed max-w-lg border-l-2 border-[#00ff99]/10 pl-4 py-1">
            {current.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {current.technologies.map((tech) => (
              <span key={tech} className="tech-tag text-[10px] uppercase font-mono">{tech}</span>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            <a
              href={current.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono
                         bg-[#00ff99] text-black font-bold
                         hover:bg-[#00ff99]/90 hover:shadow-[0_0_20px_rgba(0,255,153,0.35)]
                         transition-all duration-300 hover:scale-105"
            >
              <ExternalLink size={14} />
              Visit Deployment
            </a>
            <a
              href={current.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono
                         border border-[#00ff99]/35 text-[#00ff99]
                         hover:border-[#00ff99] hover:bg-[#00ff99]/08
                         transition-all duration-300 hover:scale-105"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-2 pt-4">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => transition(i, i > currentIndex ? "next" : "prev")}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-10 bg-[#00ff99]"
                    : "w-3 bg-[#00ff99]/25 hover:bg-[#00ff99]/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3D Visual Side */}
        <div className="relative group min-h-[400px]">
          <Suspense fallback={
            <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-black/40 rounded-2xl border border-[#00ff99]/10">
              <Loader2 size={24} className="text-[#00ff99] animate-spin" />
            </div>
          }>
            <ProjectArtifact type={current.title} />
          </Suspense>
          
          <div className="absolute top-4 right-4 text-[#00ff99]/40 font-mono text-[10px] tracking-widest uppercase rotate-90 origin-right pointer-events-none">
            3D Artifact System v1.0
          </div>
        </div>
      </div>

      {/* Arrow Navigation */}
      <div className="flex gap-2 mt-8">
        <button
          onClick={prevSlide}
          className="p-3 rounded-xl glass-card hover:border-[#00ff99]/60 hover:text-[#00ff99]
                     text-gray-400 transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-xl bg-[#00ff99] text-black
                     hover:bg-[#00ff99]/90 hover:shadow-[0_0_20px_rgba(0,255,153,0.3)]
                     transition-all duration-300 hover:scale-105"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProjectSlider;
