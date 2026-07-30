import { useRef, type CSSProperties, type PointerEvent } from "react";

type ProjectVisualProps = {
  kind: "banking" | "mistle" | "portfolio";
  image?: string;
  alt?: string;
};

const labels = {
  banking: ["INGRESS", "SERVICES", "QUEUE", "DATA", "OBSERVE"],
  mistle: ["SOURCE", "BUILD", "EC2", "EDGE", "METRICS"],
  portfolio: ["COMMIT", "SCAN", "REGISTRY", "DEPLOY", "HEALTH"],
};

const nodes = [
  [80, 220],
  [300, 92],
  [300, 348],
  [520, 220],
  [662, 118],
  [662, 322],
];

export function ProjectVisual({ kind, image, alt = "" }: ProjectVisualProps) {
  const visualRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const visual = visualRef.current;
    if (!visual || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
    visual.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
  };

  const resetTilt = () => {
    visualRef.current?.style.removeProperty("--tilt-x");
    visualRef.current?.style.removeProperty("--tilt-y");
  };

  return (
    <div
      ref={visualRef}
      className={`project-visual project-visual-${kind}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      aria-hidden={image ? undefined : true}
    >
      {image ? <img src={image} alt={alt} loading="lazy" /> : null}
      <div className="topology-plane">
        <svg viewBox="0 0 720 440" role="img" aria-label={`${kind} system topology`}>
          <defs>
            <linearGradient id={`route-${kind}`} x1="0" x2="1">
              <stop offset="0" stopColor="#38d8d0" />
              <stop offset="1" stopColor="#54f28f" />
            </linearGradient>
          </defs>
          <path className="topology-route route-a" d="M80 220 C190 220 190 92 300 92 S410 220 520 220 610 118 662 118" />
          <path className="topology-route route-b" d="M80 220 C190 220 190 348 300 348 S410 220 520 220 610 322 662 322" />
          <path className="topology-route route-c" d="M300 92 L300 348 M520 220 L520 322" />
          {nodes.map(([x, y], index) => (
            <g key={`${x}-${y}`} className={`topology-node node-${index}`}>
              <circle cx={x} cy={y} r="12" />
              <circle cx={x} cy={y} r="4" />
            </g>
          ))}
        </svg>
        <div className="topology-labels">
          {labels[kind].map((label, index) => (
            <span key={label} style={{ "--label-index": index } as CSSProperties}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="visual-status">
        <span>LIVE TOPOLOGY</span>
        <i aria-hidden="true" />
      </div>
    </div>
  );
}
