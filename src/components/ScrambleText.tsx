import { useEffect, useRef, useState, type CSSProperties } from "react";

type ScrambleTextProps = {
  lines: string[];
  className?: string;
  style?: CSSProperties;
};

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01";
const SCRAMBLE_DURATION_MS = 650;
const FLICKER_INTERVAL_MS = 45;

function scrambleChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function ScrambleText({ lines, className, style }: ScrambleTextProps) {
  const [displayLines, setDisplayLines] = useState(lines);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    const start = performance.now();
    let lastFlicker = 0;
    let flickerChars = lines.map((line) => line.split("").map(scrambleChar));

    const tick = (now: number) => {
      const rawProgress = Math.min((now - start) / SCRAMBLE_DURATION_MS, 1);
      const progress = easeOutCubic(rawProgress);

      if (now - lastFlicker >= FLICKER_INTERVAL_MS) {
        lastFlicker = now;
        flickerChars = lines.map((line) => line.split("").map(scrambleChar));
      }

      setDisplayLines(
        lines.map((line, lineIndex) =>
          line
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              const revealAt = index / line.length;
              return progress > revealAt ? char : flickerChars[lineIndex][index];
            })
            .join(""),
        ),
      );

      if (rawProgress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayLines(lines);
        setIsScrambling(false);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  return (
    <h1
      className={isScrambling ? `${className ?? ""} is-scrambling`.trim() : className}
      style={style}
      onMouseEnter={handleMouseEnter}
    >
      {displayLines.map((line, index) => (
        <span className="scramble-line" key={index}>
          {line}
          {index < displayLines.length - 1 && <br />}
        </span>
      ))}
    </h1>
  );
}
