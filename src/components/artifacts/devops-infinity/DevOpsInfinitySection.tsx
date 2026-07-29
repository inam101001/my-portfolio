import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { DevOpsInfinityScene } from "./DevOpsInfinityScene";
import { devOpsLifecycle } from "./devopsLifecycle";

export function DevOpsInfinitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const [activePhase, setActivePhase] = useState(0);
  const phase = devOpsLifecycle[activePhase];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    progressRef.current = progress;
  });

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const section = sectionRef.current;
      if (!section || event.defaultPrevented || event.ctrlKey || !event.deltaY) {
        return;
      }

      const sectionTop =
        window.scrollY + section.getBoundingClientRect().top;
      const sectionEnd =
        sectionTop + section.offsetHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const direction = Math.sign(event.deltaY);
      const normalizedDelta =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? event.deltaY * window.innerHeight
            : event.deltaY;

      if (
        direction > 0 &&
        currentScroll < sectionTop &&
        currentScroll + normalizedDelta >= sectionTop
      ) {
        event.preventDefault();
        window.scrollTo({
          top: sectionTop,
          left: window.scrollX,
          behavior: "instant",
        });
        return;
      }

      const isPinned =
        currentScroll >= sectionTop - 1 && currentScroll <= sectionEnd + 1;
      const isLeaving =
        (direction < 0 && currentScroll <= sectionTop + 1) ||
        (direction > 0 && currentScroll >= sectionEnd - 1);

      if (!isPinned || isLeaving) return;

      event.preventDefault();
      const maxDelta = window.innerHeight * 0.34;
      window.scrollBy({
        top: Math.max(-maxDelta, Math.min(maxDelta, normalizedDelta)),
        left: 0,
        behavior: "instant",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

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
          <span>Continuous delivery system</span>
          <h2>One lifecycle. No broken handoffs.</h2>
        </div>

        <article
          className={`devops-phase-detail is-${phase.panelSide}`}
          key={phase.id}
          aria-live="polite"
        >
          <div className="devops-phase-command">
            <span aria-hidden="true">$</span> {phase.command}
          </div>
          <h3>{phase.label}</h3>
          <p>{phase.summary}</p>
          <ul aria-label={`${phase.label} tools`}>
            {phase.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </article>

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
