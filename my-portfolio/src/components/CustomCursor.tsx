import React, { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          scale: isPointer ? "1.5" : "1",
        }}
      />
      <div
        className="cursor-ring"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          scale: isPointer ? "1.5" : "1",
        }}
      />
    </>
  );
};

export default CustomCursor;
