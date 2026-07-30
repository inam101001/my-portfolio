import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const punchHoles = Array.from({ length: 15 }, (_, index) => index);

function MagneticReel() {
  return (
    <svg
      className="magnetic-reel-svg"
      viewBox="0 0 720 720"
      role="img"
      aria-label="Abstract magnetic tape reel"
    >
      <circle className="reel-shadow" cx="360" cy="370" r="304" />
      <circle className="reel-rim" cx="360" cy="350" r="304" />
      <circle className="reel-face" cx="360" cy="350" r="278" />
      <g className="reel-cutouts">
        <circle cx="360" cy="172" r="76" />
        <circle cx="529" cy="295" r="76" />
        <circle cx="464" cy="494" r="76" />
        <circle cx="256" cy="494" r="76" />
        <circle cx="191" cy="295" r="76" />
      </g>
      <circle className="reel-hub-ring" cx="360" cy="350" r="93" />
      <circle className="reel-hub" cx="360" cy="350" r="56" />
      <circle className="reel-pin" cx="360" cy="350" r="19" />
      <g className="reel-fasteners">
        <circle cx="360" cy="263" r="7" />
        <circle cx="443" cy="323" r="7" />
        <circle cx="411" cy="420" r="7" />
        <circle cx="309" cy="420" r="7" />
        <circle cx="277" cy="323" r="7" />
      </g>
    </svg>
  );
}

export function MagneticHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const reelRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : 104],
  );
  const tapeProgress = useTransform(scrollYProgress, [0, 0.85], [0.42, 1]);

  return (
    <section
      ref={sectionRef}
      className="magnetic-hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-card-field">
        <div className="punch-rail" aria-hidden="true">
          {punchHoles.map((hole) => (
            <i key={hole} />
          ))}
        </div>

        <motion.div
          className="hero-copy-archive"
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          animate={{ opacity: 1, transform: "translateY(0)" }}
          transition={{
            duration: reducedMotion ? 0.1 : 0.62,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1 id="hero-title">Inam Ul Haq</h1>
          <p className="hero-thesis">
            I build the systems{" "}
            <span className="inline-tape-window" aria-hidden="true">
              <i />
              <b />
              <i />
            </span>{" "}
            between commit and production.
          </p>
          <p className="hero-summary">
            DevOps engineering across cloud infrastructure, CI/CD automation,
            Kubernetes, observability, and production operations.
          </p>
          <div className="hero-actions">
            <a className="action-primary" href="#work">
              Inspect the work
              <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a className="action-secondary" href="#contact">
              Start a conversation
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <div className="hero-card-meta" aria-label="Profile details">
          <span>DevOps / Cloud / Automation</span>
          <span>Koblenz, Germany</span>
          <span>Available for opportunities</span>
        </div>

        <span className="card-serial" aria-hidden="true">
          MOA / PERSONNEL / IUH-1999
        </span>
      </div>

      <div className="hero-machine-field" aria-hidden="true">
        <div className="machine-screw screw-a" />
        <div className="machine-screw screw-b" />
        <div className="machine-screw screw-c" />
        <div className="machine-screw screw-d" />

        <motion.div
          className="hero-reel"
          style={{ rotate: reelRotation }}
        >
          <MagneticReel />
        </motion.div>

        <svg className="hero-tape-path" viewBox="0 0 820 420">
          <motion.path
            d="M 390 4 C 390 108 425 134 510 154 C 650 188 668 298 590 335 C 470 392 326 300 202 348 C 138 372 76 366 6 340"
            style={{ pathLength: tapeProgress }}
          />
        </svg>

        <div className="tape-guide guide-a" />
        <div className="tape-guide guide-b" />
        <div className="machine-readout">
          <span>REEL / IUH-01</span>
          <strong>2400 FT</strong>
          <small>ARCHIVE READY</small>
        </div>
        <div className="orange-register" />
      </div>
    </section>
  );
}
