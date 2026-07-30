import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { DevOpsInfinityScene } from "../artifacts/devops-infinity/DevOpsInfinityScene";
import { devOpsLifecycle } from "../artifacts/devops-infinity/devopsLifecycle";
import { motionTokens } from "../../motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProcessArchive() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activePhase, setActivePhase] = useState(0);
  const reducedMotion = useReducedMotion();
  const phase = devOpsLifecycle[activePhase];

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !pinnedRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 6}`,
        pin: pinnedRef.current,
        pinSpacing: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
      triggerRef.current = trigger;

      return () => {
        triggerRef.current = null;
      };
    },
    {
      scope: sectionRef,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  );

  const handlePhaseChange = useCallback((index: number) => {
    setActivePhase((current) => (current === index ? current : index));
  }, []);

  const jumpToPhase = (index: number) => {
    if (reducedMotion) {
      document
        .getElementById(`reduced-phase-${index}`)
        ?.scrollIntoView({ block: "center" });
      return;
    }

    const trigger = triggerRef.current;
    if (!trigger) return;
    const progress = index / (devOpsLifecycle.length - 1);
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "smooth",
    });
  };

  if (reducedMotion) {
    return (
      <section
        id="process"
        className="process-archive process-archive-reduced page-shell"
        aria-labelledby="process-title"
      >
        <div className="process-reduced-heading">
          <h2 id="process-title">Eight handoffs. One readable system.</h2>
          <p>
            The full lifecycle remains available without scroll pinning or
            spatial movement.
          </p>
        </div>
        <div className="process-reduced-list">
          {devOpsLifecycle.map((item, index) => (
            <article id={`reduced-phase-${index}`} key={item.id}>
              <span>{item.command}</span>
              <h3>{item.label}</h3>
              <p>{item.summary}</p>
              <ul aria-label={`${item.label} tools`}>
                {item.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-archive"
      aria-labelledby="process-title"
    >
      <div ref={pinnedRef} className="process-machine">
        <div className="process-heading">
          <h2 id="process-title">Eight handoffs. One readable system.</h2>
          <p>
            Scroll through the magnetic route from planning to production
            telemetry.
          </p>
        </div>

        <DevOpsInfinityScene
          progressRef={progressRef}
          onPhaseChange={handlePhaseChange}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            className={`process-phase is-${phase.panelSide}`}
            key={phase.id}
            initial={{
              opacity: 0,
              filter: "blur(4px)",
              transform: "translateY(12px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transform: "translateY(0px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(2px)",
              transform: "translateY(-6px)",
            }}
            transition={{
              duration: motionTokens.duration.fast,
              ease: motionTokens.easing.smooth,
            }}
          >
            <span>{phase.command}</span>
            <h3>{phase.label}</h3>
            <p>{phase.summary}</p>
            <ul aria-label={`${phase.label} tools`}>
              {phase.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>

        <nav className="process-phase-nav" aria-label="Delivery lifecycle">
          {devOpsLifecycle.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={index === activePhase ? "is-active" : ""}
              aria-current={index === activePhase ? "step" : undefined}
              aria-label={`View ${item.label} phase`}
              onClick={() => jumpToPhase(index)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
