import React, { useState, useEffect } from "react";

interface TerminalProps {
  command: string;
  output: string[];
}

const TerminalLine: React.FC<{ line: string; index: number }> = ({ line, index }) => {
  if (line === '') return <div className="h-2" key={index} />;

  if (line.startsWith('$')) {
    return (
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[#00ff99] font-bold font-mono">{line}</span>
      </div>
    );
  }

  if (line.startsWith('→')) {
    return (
      <div className="flex items-center gap-2 ml-2">
        <span className="text-[#00ff99]">→</span>
        <span className="text-gray-300 font-mono text-xs">{line.slice(1).trim()}</span>
      </div>
    );
  }

  if (line.startsWith('-')) {
    return (
      <div className="ml-4 text-gray-400 font-mono text-xs">
        <span className="text-[#00ff99]/60 mr-2">–</span>
        {line.slice(1).trim()}
      </div>
    );
  }

  return (
    <div className="ml-2 text-gray-300 font-mono text-xs">{line}</div>
  );
};

const Terminal: React.FC<TerminalProps> = ({ command, output }) => {
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typedCommand, setTypedCommand] = useState('');
  const [isTypingCommand, setIsTypingCommand] = useState(true);

  // Type the command first
  useEffect(() => {
    if (typedCommand.length < command.length) {
      const t = setTimeout(() => {
        setTypedCommand(command.slice(0, typedCommand.length + 1));
      }, 60);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => setIsTypingCommand(false), 300);
    }
  }, [typedCommand, command]);

  // Then type the output
  useEffect(() => {
    if (!isTypingCommand && currentIndex < output.length) {
      const delay = output[currentIndex] === '' ? 50 : 80;
      const timer = setTimeout(() => {
        setDisplayedOutput((prev) => [...prev, output[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, output, isTypingCommand]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-window scanline w-full max-w-2xl">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#00ff99]/15">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#00ff99]/80 hover:bg-[#00ff99] transition-colors cursor-pointer" />
        </div>
        <span className="text-[#00ff99]/50 text-xs font-mono tracking-widest">
          ⬡ terminal
        </span>
        <div className="w-16" />
      </div>

      {/* Body */}
      <div className="p-5 space-y-1.5 text-sm min-h-[260px]">
        {/* Prompt line */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#00ff99] font-bold font-mono">inam</span>
          <span className="text-gray-500 font-mono">@portfolio</span>
          <span className="text-gray-600 font-mono">:</span>
          <span className="text-blue-400 font-mono">~</span>
          <span className="text-gray-500 font-mono">$</span>
          <span className="text-white font-mono ml-1">{typedCommand}</span>
          {isTypingCommand && (
            <span
              className="inline-block w-2 h-4 bg-[#00ff99] ml-0.5"
              style={{ opacity: showCursor ? 1 : 0 }}
            />
          )}
        </div>

        {/* Output */}
        <div className="space-y-0.5 pt-1">
          {displayedOutput.map((line, i) => (
            <TerminalLine key={i} line={line} index={i} />
          ))}
        </div>

        {/* Trailing cursor */}
        {!isTypingCommand && currentIndex >= output.length && (
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[#00ff99] font-bold font-mono">inam</span>
            <span className="text-gray-500 font-mono">@portfolio</span>
            <span className="text-gray-600 font-mono">:</span>
            <span className="text-blue-400 font-mono">~</span>
            <span className="text-gray-500 font-mono">$</span>
            <span
              className="inline-block w-2 h-4 bg-[#00ff99] ml-1"
              style={{ opacity: showCursor ? 1 : 0 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
