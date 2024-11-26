import React from 'react';
import { Terminal as TerminalIcon, Minus, X, Square } from 'lucide-react';

const TerminalHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-b border-[#00ff99]/20 pb-2 mb-4">
      <div className="flex items-center gap-2 text-[#00ff99]">
        <TerminalIcon size={16} />
        <span className="text-sm">terminal</span>
      </div>
      <div className="flex gap-2">
        <button className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <button className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <button className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
    </div>
  );
};

export default TerminalHeader;