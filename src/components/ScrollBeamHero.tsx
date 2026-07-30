import { useEffect, useRef, useState } from "react";
import { ScrambleText } from "./ScrambleText";
import { TerminalReveal } from "./TerminalReveal";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, value: number) =>
  start + (end - start) * value;

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

type Thread = {
  x: number;
  z: number;
  length: number;
  alpha: number;
  width: number;
};

const threads: Thread[] = Array.from({ length: 72 }, (_, index) => {
  const side = index % 2 === 0 ? -1 : 1;
  const lane = Math.floor(index / 2);
  return {
    x: side * (0.08 + ((lane * 0.073) % 0.86)),
    z: (index * 0.137) % 1,
    length: 0.16 + ((index * 0.041) % 0.42),
    alpha: 0.16 + ((index * 0.019) % 0.34),
    width: index % 9 === 0 ? 1.8 : 1,
  };
});

function drawScene(canvas: HTMLCanvasElement, progress: number) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
  const targetWidth = Math.floor(width * ratio);
  const targetHeight = Math.floor(height * ratio);

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const zoom = easeOutCubic(smoothstep(0.45, 1, progress));
  const horizon = height * (0.72 - zoom * 0.1);
  const vanishingX = width * 0.5;
  const floorY = height + 56;
  const landingY = horizon;
  const beamX = vanishingX;
  const beamTop = -height * 0.12;
  const descent = easeOutCubic(smoothstep(0.06, 0.54, progress));
  const approach = smoothstep(0.36, 0.54, progress);
  const impact = smoothstep(0.52, 0.64, progress);
  const beamHeadY = lerp(beamTop, landingY, descent);

  const background = context.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, "#001407");
  background.addColorStop(0.48, "#000803");
  background.addColorStop(1, "#000000");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(
    vanishingX,
    landingY,
    0,
    vanishingX,
    landingY,
    width * (0.1 + approach * 0.22 + zoom * 0.22),
  );
  glow.addColorStop(0, `rgba(238, 255, 240, ${approach * 0.32 + impact * 0.48})`);
  glow.addColorStop(0.08, `rgba(24, 255, 104, ${approach * 0.22 + impact * 0.34})`);
  glow.addColorStop(0.36, `rgba(24, 255, 104, ${approach * 0.08 + impact * 0.12})`);
  glow.addColorStop(1, "rgba(24, 255, 104, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.62 * (1 - zoom * 0.45);
  for (let i = 0; i < 34; i += 1) {
    const t = i / 33;
    const x = vanishingX + (t - 0.5) * width * 1.5;
    context.strokeStyle = `rgba(24, 255, 104, ${0.06 + t * 0.04})`;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(vanishingX, horizon);
    context.lineTo(x, floorY);
    context.stroke();
  }

  for (let i = 0; i < 28; i += 1) {
    const y = horizon + Math.pow(i / 27, 1.85) * (floorY - horizon);
    const distanceFade = 1 - clamp((y - height * 0.93) / (height * 0.18));
    context.strokeStyle = `rgba(24, 255, 104, ${(0.055 + i * 0.004) * distanceFade})`;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();

  context.save();
  context.globalCompositeOperation = "lighter";
  threads.forEach((thread, index) => {
    const depth = (thread.z + progress * 0.42) % 1;
    const perspective = 0.22 + depth * depth * 1.18;
    const x = vanishingX + thread.x * width * perspective * (1 + zoom * 0.38);
    const y = height * (0.02 + depth * 0.68);
    const lineLength = height * thread.length * (0.55 + depth);
    const opacity = thread.alpha * (1 - zoom * 0.58);

    context.strokeStyle = `rgba(24, 255, 104, ${opacity})`;
    context.shadowColor = "rgba(24, 255, 104, 0.8)";
    context.shadowBlur = index % 8 === 0 ? 16 : 7;
    context.lineWidth = thread.width;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, Math.min(y + lineLength, landingY - 12));
    context.stroke();
  });
  context.restore();

  const beamAlpha = (0.32 + descent * 0.68) * (1 - zoom * 0.28);
  context.save();
  context.globalCompositeOperation = "lighter";
  const beamGradient = context.createLinearGradient(beamX, beamTop, beamX, beamHeadY);
  beamGradient.addColorStop(0, `rgba(24, 255, 104, ${0.06 * beamAlpha})`);
  beamGradient.addColorStop(0.56, `rgba(24, 255, 104, ${0.86 * beamAlpha})`);
  beamGradient.addColorStop(1, `rgba(238, 255, 240, ${0.96 * beamAlpha})`);
  context.strokeStyle = beamGradient;
  context.shadowColor = "rgba(24, 255, 104, 0.95)";
  context.shadowBlur = 24 + progress * 18;
  context.lineCap = "round";
  context.lineWidth = 4 + progress * 2;
  context.beginPath();
  context.moveTo(beamX, beamTop);
  const controlOneY = lerp(beamTop, beamHeadY, 0.34);
  const controlTwoY = lerp(beamTop, beamHeadY, 0.72);
  context.bezierCurveTo(
    beamX + Math.sin(progress * Math.PI) * 7,
    controlOneY,
    beamX - Math.sin(progress * Math.PI * 0.7) * 4,
    controlTwoY,
    beamX,
    beamHeadY,
  );
  context.stroke();

  const headGlow = context.createRadialGradient(
    beamX,
    beamHeadY,
    0,
    beamX,
    beamHeadY,
    8 + descent * 20,
  );
  headGlow.addColorStop(0, `rgba(238, 255, 240, ${0.92 * beamAlpha})`);
  headGlow.addColorStop(0.22, `rgba(24, 255, 104, ${0.52 * beamAlpha})`);
  headGlow.addColorStop(1, "rgba(24, 255, 104, 0)");
  context.fillStyle = headGlow;
  context.fillRect(beamX - 80, beamHeadY - 80, 160, 160);

  if (impact > 0) {
    const waveOne = impact;
    const waveTwo = clamp((impact - 0.34) / 0.66);
    context.lineWidth = 1.5;
    context.shadowBlur = 26;

    context.strokeStyle = `rgba(236, 255, 240, ${0.44 * (1 - waveOne) + 0.18})`;
    context.beginPath();
    context.ellipse(
      beamX,
      landingY,
      width * (0.035 + waveOne * 0.22),
      height * (0.006 + waveOne * 0.038),
      0,
      0,
      Math.PI * 2,
    );
    context.stroke();

    if (waveTwo > 0) {
      context.strokeStyle = `rgba(24, 255, 104, ${0.28 * (1 - waveTwo)})`;
      context.beginPath();
      context.ellipse(
        beamX,
        landingY,
        width * (0.12 + waveTwo * 0.28),
        height * (0.018 + waveTwo * 0.045),
        0,
        0,
        Math.PI * 2,
      );
      context.stroke();
    }
  }
  context.restore();
}

export function ScrollBeamHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastScrambleAtRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [scrambleKey, setScrambleKey] = useState(0);

  const triggerScramble = () => {
    const now = performance.now();
    if (now - lastScrambleAtRef.current < 1150) return;
    lastScrambleAtRef.current = now;
    setScrambleKey((key) => key + 1);
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const maxScroll = Math.max(rect.height - window.innerHeight, 1);
      const nextProgress = clamp(Math.abs(Math.min(rect.top, 0)) / maxScroll);

      setProgress(nextProgress);

      if (canvasRef.current) {
        drawScene(canvasRef.current, nextProgress);
      }
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const terminalProgress = smoothstep(0.6, 0.96, progress);
  const introOpacity = 1 - smoothstep(0.2, 0.48, progress);
  const scrollPromptOpacity = 1 - smoothstep(0.08, 0.26, progress);

  return (
    <section ref={sectionRef} className="scroll-hero" aria-label="Portfolio introduction">
      <div className="scroll-hero-sticky">
        <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />

        <div
          className="hero-copy"
          onFocus={triggerScramble}
          onMouseEnter={triggerScramble}
          onPointerEnter={triggerScramble}
          onPointerMove={triggerScramble}
          style={{ opacity: introOpacity }}
        >
          <h1
            className="scramble-hover-zone"
            onFocus={triggerScramble}
            onMouseEnter={triggerScramble}
            onPointerEnter={triggerScramble}
            onPointerMove={triggerScramble}
            tabIndex={0}
          >
            <ScrambleText
              className="hero-title-scramble"
              text="Inam Ul Haq"
              duration={1050}
              triggerKey={scrambleKey}
            />
            <span className="hero-tagline">
              <ScrambleText
                text="DevOps engineer building systems that stay alive."
                duration={1050}
                triggerKey={scrambleKey}
              />
            </span>
          </h1>
          <p>
            Cloud infrastructure, CI/CD automation, Kubernetes, observability,
            and AI-assisted operations built for production.
          </p>
          <div className="hero-actions">
            <a href="#work">Inspect systems</a>
            <a href="#contact">Open a channel</a>
          </div>
        </div>

        <div className="scroll-instruction" style={{ opacity: scrollPromptOpacity }}>
          <span>Scroll</span>
          <span className="scroll-track" />
        </div>

        <TerminalReveal progress={terminalProgress} />
      </div>
    </section>
  );
}
