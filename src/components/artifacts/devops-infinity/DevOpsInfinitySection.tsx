import { useCallback, useRef, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { DevOpsInfinityScene } from "./DevOpsInfinityScene";
import { devOpsLifecycle } from "./devopsLifecycle";
import { motionTokens } from "../../../motion";

export function DevOpsInfinitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const [activePhase, setActivePhase] = useState(0);
  const reducedMotion = useReducedMotion();
  const phase = devOpsLifecycle[activePhase];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    progressRef.current = progress;
  });

  const handlePhaseChange = useCallback((index: number) => {
    setActivePhase((current) => (current === index ? current : index));
  }, []);

  const jumpToPhase = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollable = section.offsetHeight - window.innerHeight;
    const phaseProgress = index / (devOpsLifecycle.length - 1);
    window.scrollTo({
      top: sectionTop + scrollable * phaseProgress,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="devops-infinity-section"
      aria-label="DevOps lifecycle and toolset"
    >
      <div className="devops-infinity-sticky">
        <DevOpsInfinityScene
          progressRef={progressRef}
          onPhaseChange={handlePhaseChange}
        />

        <div className="devops-infinity-heading">
          <span>02 / Continuous delivery</span>
          <h2>One lifecycle. No broken handoffs.</h2>
        </div>

        <AnimatePresence mode="sync" initial={false}>
          <motion.article
            className={`devops-phase-detail is-${phase.panelSide}`}
            key={phase.id}
            aria-live="polite"
            style={{ "--phase-y": phase.panelY } as CSSProperties}
            initial={{
              opacity: 0,
              x: reducedMotion
                ? 0
                : phase.panelSide === "right"
                  ? motionTokens.distance.panel
                  : -motionTokens.distance.panel,
              y: reducedMotion ? 0 : motionTokens.distance.text,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: reducedMotion
                ? 0
                : phase.panelSide === "right"
                  ? -motionTokens.distance.text
                  : motionTokens.distance.text,
              y: reducedMotion ? 0 : -8,
            }}
            transition={{
              duration: reducedMotion
                ? motionTokens.duration.fast
                : motionTokens.duration.normal,
              ease: motionTokens.easing.smooth,
            }}
          >
            <motion.div
              className="devops-phase-command"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.duration.fast }}
            >
              <span aria-hidden="true">$</span> {phase.command}
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionTokens.duration.normal,
                delay: reducedMotion ? 0 : 0.04,
                ease: motionTokens.easing.smooth,
              }}
            >
              {phase.label}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionTokens.duration.normal,
                delay: reducedMotion ? 0 : 0.08,
                ease: motionTokens.easing.smooth,
              }}
            >
              {phase.summary}
            </motion.p>
            <motion.ul
              aria-label={`${phase.label} tools`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reducedMotion ? 0 : 0.045,
                    delayChildren: reducedMotion ? 0 : 0.12,
                  },
                },
              }}
            >
              {phase.tools.map((tool) => (
                <motion.li
                  key={tool}
                  variants={{
                    hidden: { opacity: 0, y: reducedMotion ? 0 : 7 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: motionTokens.duration.fast,
                        ease: motionTokens.easing.smooth,
                      },
                    },
                  }}
                >
                  {tool}
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>
        </AnimatePresence>

        <nav className="devops-phase-nav" aria-label="DevOps lifecycle phases">
          {devOpsLifecycle.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={index === activePhase ? "is-active" : ""}
              onClick={() => jumpToPhase(index)}
              aria-current={index === activePhase ? "step" : undefined}
              aria-label={`View ${item.label} phase`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
