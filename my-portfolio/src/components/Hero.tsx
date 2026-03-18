import React, { useEffect, useState } from "react";
import Terminal from "./Terminal";
import Stats from "./Stats";
import SocialLinks from "./SocialLinks";
import ThreeOrb from "./ThreeOrb";
import { Download, ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="container mx-auto px-4 flex flex-col justify-center min-h-screen pt-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center mb-10">
        <div
          className={`lg:col-span-5 space-y-5 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-[#00ff99]" />
            <span className="text-[#00ff99] font-mono text-sm tracking-[0.2em] uppercase">
              DevOps Engineer
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold font-sans leading-tight">
            Hello, I'm
            <br />
            <span
              className="text-[#00ff99]"
              style={{
                textShadow:
                  "0 0 30px rgba(0,255,153,0.4), 0 0 80px rgba(0,255,153,0.15)",
              }}
            >
              Inam Ul Haq
            </span>
          </h1>

          <div className="text-[#00ff99] font-mono text-lg md:text-xl py-1">
             "Turning 'It works on my machine' into 'It works in production'."
          </div>

          <p className="text-gray-500 font-mono text-[13px] md:text-sm max-w-md leading-relaxed">
            Infrastructure as Code enthusiast specializing in automating deployment
            pipelines, container orchestration, and multi-cloud solutions on AWS and GCP.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/InamUlHaq_CV.pdf"
              download="InamUlHaq_CV.pdf"
              id="download-cv-btn"
              className="glow-btn group relative inline-flex items-center gap-2.5 px-6 py-2.5
                         bg-[#00ff99] text-black font-bold font-mono text-sm rounded-full
                         hover:bg-[#00ff99]/90 transition-all duration-300
                         shadow-[0_0_20px_rgba(0,255,153,0.3)] hover:shadow-[0_0_35px_rgba(0,255,153,0.5)]
                         hover:scale-105 active:scale-95"
            >
              <Download size={16} />
              Download CV
            </a>
            <a
              href="#contact"
              id="contact-hero-btn"
              className="inline-flex items-center gap-2.5 px-6 py-2.5
                         border border-[#00ff99]/40 text-[#00ff99] font-mono text-sm rounded-full
                         hover:border-[#00ff99] hover:bg-[#00ff99]/08 transition-all duration-300
                         hover:shadow-[0_0_20px_rgba(0,255,153,0.15)] hover:scale-105"
            >
              Get In Touch
            </a>
          </div>

          <SocialLinks />
        </div>

        <div
          className={`lg:col-span-2 flex items-center justify-center transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="w-full h-64 lg:h-72 relative" aria-hidden="true">
            <ThreeOrb />
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full blur-xl"
              style={{ background: "rgba(0,255,153,0.25)" }}
            />
          </div>
        </div>

        <div
          className={`lg:col-span-5 transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
                    <Terminal
            command="ssh inam-cloud-instance"
            output={[
              "Connection established. Session: persistent",
              "Welcome to Inam's DevOps workspace (v3.2.0)",
              "",
              "$ fetch --profile --expertise",
              "Analyzing cloud vitals... [OK]",
              "Gathering technical profile...",
              "Progress: [################] 100%",
              "",
              "CORE INFRASTRUCTURE:",
              "→ Cloud & Platform : AWS, Google Cloud",
              "→ Orchestration    : Kubernetes (EKS/GKE), Docker",
              "→ CI/CD Automation : Jenkins, GitHub Actions, ArgoCD",
              "→ Infrastructure   : Terraform, Ansible, Bash",
              "",
              "SYSTEMS & DEVELOPMENT:",
              "→ Observability    : Prometheus, Grafana, CloudWatch",
              "→ Stack Essentials : Node.js, TypeScript, NestJS",
              "→ Environments     : Linux (Ubuntu, Debian), Windows",
              "",
              "STATUS: Operational & Ready to Scale.",
            ]}
          />

        </div>
      </div>

      <div
        className={`transition-all duration-1000 delay-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Stats />
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#00ff99] transition-colors group"
          aria-label="Scroll to about"
        >
          <span className="text-xs font-mono tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">SCROLL</span>
          <ChevronDown
            size={20}
            className="animate-bounce text-[#00ff99]/60 group-hover:text-[#00ff99]"
          />
        </a>
      </div>
    </div>
  );
};

export default Hero;