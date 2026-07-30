import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statement =
  "The interface is only the last frame. The real work is every handoff behind it.";

export function ScrollStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const words = gsap.utils.toArray<HTMLElement>(".statement-word");
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
          end: "bottom 42%",
          scrub: true,
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  );

  return (
    <section ref={sectionRef} className="scroll-statement page-shell">
      <p>
        {statement.split(" ").map((word, index) => (
          <span className="statement-word" key={`${word}-${index}`}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
