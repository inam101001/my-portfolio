import React, { useState, useEffect } from "react";
import TerminalHeader from "./TerminalHeader";

interface TerminalProps {
  command: string;
  output: string[];
}

const Terminal: React.FC<TerminalProps> = ({ command, output }) => {
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentIndex < output.length) {
      const timer = setTimeout(() => {
        setDisplayedOutput((prev) => [...prev, output[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, output]);

  const renderLine = (line: string) => {
    if (line.startsWith("$")) {
      return <span className="text-[#00ff99]">{line}</span>;
    }
    return line;
  };

  return (
    <div className="bg-black/80 backdrop-blur-sm border border-[#00ff99] rounded-lg p-4 font-mono text-sm w-full max-w-2xl">
      <TerminalHeader />
      <div className="text-gray-300 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[#00ff99]">guest@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <span className="ml-2">{command}</span>
        </div>
        {displayedOutput.map((line, index) => (
          <div key={index} className="ml-4 text-gray-300">
            {renderLine(line)}
          </div>
        ))}
        <div className="inline-block ml-4 h-4 w-2 bg-[#00ff99] animate-pulse" />
      </div>
    </div>
  );
};

export default Terminal;
