import React, { useState, useEffect, Suspense } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Loader2, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectData } from "../types/project";
import ProjectArchitecture from "./ProjectArchitecture";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectSliderProps {
  projects: ProjectData[];
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [diagramIndex, setDiagramIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isZoomed, setIsZoomed] = useState(false);

  const current = projects[currentIndex];
  const currentDiagram = current.diagrams[diagramIndex];

  // Reset diagram index when project changes
  useEffect(() => {
    setDiagramIndex(0);
  }, [currentIndex]);

  const transitionProject = (newIndex: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 350);
  };

  const nextDiagram = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDiagramIndex((prev) => (prev + 1) % current.diagrams.length);
  };

  const prevDiagram = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDiagramIndex((prev) => (prev - 1 + current.diagrams.length) % current.diagrams.length);
  };

  const nextProject = () => transitionProject((currentIndex + 1) % projects.length, "next");
  const prevProject = () => transitionProject((currentIndex - 1 + projects.length) % projects.length, "prev");

  return (
    <div className="relative">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start
          transition-all duration-350
          ${isAnimating
            ? direction === "next"
              ? "opacity-0 translate-x-4"
              : "opacity-0 -translate-x-4"
            : "opacity-100 translate-x-0"
          }
        `}
      >
        {/* Info Side - 4 Columns */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-[#00ff99]/20 text-6xl font-bold font-mono leading-none select-none">
              {current.id}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00ff99]/30 to-transparent" />
          </div>

          <h3 className="text-3xl font-bold text-white min-h-[4rem] flex items-center leading-tight">
            {current.title}
          </h3>

          <p className="text-gray-400 font-mono text-[13px] leading-relaxed max-w-lg border-l-2 border-[#00ff99]/10 pl-4 py-1">
            {current.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {current.technologies.slice(0, 6).map((tech) => (
              <span key={tech} className="tech-tag text-[9px] uppercase font-mono">{tech}</span>
            ))}
            {current.technologies.length > 6 && (
                <span className="tech-tag text-[9px] uppercase font-mono opacity-50">+{current.technologies.length - 6} more</span>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            <a
              href={current.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-xs font-mono bg-[#00ff99] text-black font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,153,0.3)] transition-all"
            >
              <Github size={14} /> Repository
            </a>
            <a
              href={current.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-xs font-mono border border-[#00ff99]/40 text-[#00ff99] flex items-center gap-2 hover:bg-[#00ff99]/10 transition-all"
            >
              <ExternalLink size={14} /> Live
            </a>
          </div>

          {/* Project List Pagination (The dots at bottom left) */}
          <div className="flex items-center gap-2 pt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => transitionProject(i, i > currentIndex ? "next" : "prev")}
                className={`h-1 transition-all duration-300 ${
                  i === currentIndex ? "w-12 bg-[#00ff99]" : "w-3 bg-[#00ff99]/20"
                } rounded-full`}
              />
            ))}
          </div>
        </div>

        {/* Diagram Playlist Side - 8 Columns */}
        <div className="lg:col-span-8 space-y-4">
          <div 
            onClick={() => setIsZoomed(true)}
            className="relative group aspect-video bg-black/60 rounded-2xl border border-[#00ff99]/10 overflow-hidden cursor-zoom-in group shadow-2xl"
          >
            {/* Diagram Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-center">
              <div>
                <span className="text-[#00ff99] font-mono text-[10px] uppercase tracking-widest block opacity-70">
                  Blueprint {diagramIndex + 1}/{current.diagrams.length}
                </span>
                <span className="text-white font-mono text-xs font-bold uppercase tracking-tight">
                  {currentDiagram?.title}
                </span>
              </div>
              <div className="flex items-center gap-2 group-hover:opacity-100 opacity-0 transition-opacity">
                <div className="p-1.5 rounded-md bg-black/50 border border-[#00ff99]/30 text-[#00ff99]">
                  <Maximize2 size={14} />
                </div>
                <span className="text-[#00ff99] font-mono text-[10px] uppercase">Zoom Architecture</span>
              </div>
            </div>

            {/* Sub-Navigation (Diagram Playlist Controls) */}
            {current.diagrams.length > 1 && (
              <>
                <button 
                  onClick={prevDiagram}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-[#00ff99]/20 text-[#00ff99] hover:bg-[#00ff99] hover:text-black z-20 transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextDiagram}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-[#00ff99]/20 text-[#00ff99] hover:bg-[#00ff99] hover:text-black z-20 transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 size={24} className="text-[#00ff99] animate-spin" />
              </div>
            }>
              <div className="w-full h-full transition-transform duration-500 hover:scale-[1.02]">
                <ProjectArchitecture type={currentDiagram?.type || 'general'} />
              </div>
            </Suspense>

            {/* Hover Instruction Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-gray-400 font-mono text-[10px] leading-relaxed">
                    {currentDiagram?.description || "// detailed technical layout version 2.0"}
                </p>
            </div>
          </div>

          {/* Diagram Playlist Thumbnails/Dots */}
          <div className="flex justify-center gap-3 items-center">
                {current.diagrams.map((diag, idx) => (
                    <button
                        key={diag.id}
                        onClick={() => setDiagramIndex(idx)}
                        className={`px-3 py-1 font-mono text-[10px] uppercase transition-all border rounded-md ${
                            idx === diagramIndex 
                            ? "bg-[#00ff99] text-black border-[#00ff99] font-bold shadow-[0_0_10px_rgba(0,255,153,0.3)]" 
                            : "text-gray-500 border-white/10 hover:border-[#00ff99]/50 hover:text-white"
                        }`}
                    >
                        {idx + 1}. {diag.title.split(' ')[0]}
                    </button>
                ))}
          </div>
        </div>
      </div>

      {/* Main Navigation (Arrows below) */}
      <div className="flex gap-4 mt-12 justify-center lg:justify-start lg:pl-[33%]">
        <button
          onClick={prevProject}
          className="p-4 rounded-2xl glass-card text-gray-400 hover:text-[#00ff99] hover:border-[#00ff99]/50 transition-all hover:scale-105"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={nextProject}
          className="px-8 py-4 rounded-2xl bg-[#00ff99] text-black font-bold flex items-center gap-4 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,153,0.4)]"
        >
          Next Project <ArrowRight size={20} />
        </button>
      </div>

      {/* High-Resolution Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-7xl bg-black/40 border border-[#00ff99]/20 rounded-3xl overflow-hidden p-2 lg:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsZoomed(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/50 border border-[#00ff99]/30 text-[#00ff99] hover:bg-[#ef4444] hover:text-white z-50 transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="mb-6 border-b border-[#00ff99]/10 pb-4">
                <h4 className="text-[#00ff99] font-mono text-xs uppercase tracking-widest mb-1">Detailed Technical Blueprint</h4>
                <h2 className="text-white text-3xl font-bold uppercase tracking-tight">{currentDiagram.title}</h2>
              </div>

              <div className="h-[70vh] w-full bg-[#030712] rounded-xl overflow-hidden shadow-inner border border-[#00ff99]/5 relative group/modal">
                 <ProjectArchitecture type={currentDiagram.type} />
                 
                 {/* Modal Playlist Navigation */}
                 {current.diagrams.length > 1 && (
                    <>
                        <button 
                        onClick={prevDiagram}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/80 border border-[#00ff99]/40 text-[#00ff99] hover:bg-[#00ff99] hover:text-black transition-all z-[60]"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button 
                        onClick={nextDiagram}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/80 border border-[#00ff99]/40 text-[#00ff99] hover:bg-[#00ff99] hover:text-black transition-all z-[60]"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectSlider;
