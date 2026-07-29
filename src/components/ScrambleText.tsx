import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+-.";

type ScrambleTextProps = {
  text: string;
  className?: string;
  duration?: number;
  stepMs?: number;
  triggerKey?: number;
};

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function scramble(text: string, resolvedCount: number) {
  return text
    .split("")
    .map((char, index) => {
      if (char === " ") return " ";
      if (index < resolvedCount) return char;
      return randomChar();
    })
    .join("");
}

function makeInitialScramble(text: string) {
  return text
    .split("")
    .map((char) => (char === " " ? " " : randomChar()))
    .join("");
}

export function ScrambleText({
  text,
  className,
  duration = 1000,
  stepMs = 42,
  triggerKey = 0,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const characterCount = useMemo(
    () => text.replace(/\s/g, "").length,
    [text],
  );
  const style = {
    "--scramble-chars": characterCount,
  } as CSSProperties;

  useEffect(() => {
    if (triggerKey === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplayText(text);
      return;
    }

    let frame = 0;

    setDisplayText(makeInitialScramble(text));
    setIsAnimating(true);

    const interval = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(1, (frame * stepMs) / duration);
      const resolvedCount = Math.floor(progress * text.length);
      const shouldResolve = progress >= 1;
      setDisplayText(shouldResolve ? text : scramble(text, resolvedCount));

      if (shouldResolve) {
        setIsAnimating(false);
        window.clearInterval(interval);
      }
    }, stepMs);

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [duration, stepMs, text, triggerKey]);

  return (
    <span
      className={className}
      data-scrambling={isAnimating}
      style={style}
    >
      {displayText}
    </span>
  );
}
