import React from "react";

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] text-[#00ff99] px-3 py-1 rounded text-sm border border-[#00ff99]/20 whitespace-nowrap">
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] border-r border-b border-[#00ff99]/20 rotate-45" />
      {text}
    </div>
  );
};

export default Tooltip;
