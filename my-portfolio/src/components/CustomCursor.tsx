import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[10000] hidden lg:block"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        // Small transition for the label but not for the hotspot is better
      }}
    >
      {/* Target Marker (Hotspot) - Centered Exactly on Pointer */}
      <div 
        className={`absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#00ff99] shadow-[0_0_8px_#00ff99] 
          ${isPointer ? 'scale-[1.8]' : 'scale-100'} 
          ${isClicking ? 'scale-[0.85]' : ''} 
          transition-transform duration-150`}
      />

      {/* Label Text - Offset from Hotspot */}
      <div className="ml-4 flex items-center gap-1 font-mono text-[9px] text-[#00ff99] bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#00ff99]/20 whitespace-nowrap">
        <span className="opacity-70">root@inam:~$</span>
        <span className={`w-1 h-2 bg-[#00ff99] animate-pulse`} />
      </div>

      {/* Click Visual */}
      {isClicking && (
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-[#00ff99]/40 animate-ping" />
      )}
    </div>
  );
};

export default CustomCursor;
