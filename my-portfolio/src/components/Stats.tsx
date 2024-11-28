import React from "react";

interface StatItemProps {
  value: string | number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="text-4xl md:text-5xl font-bold text-white mb-2">
      {value}
    </span>
    <span className="text-sm text-gray-400 font-mono">{label}</span>
  </div>
);

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border border-[#00ff99]/20 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
      <StatItem value="12" label="Years of experience" />
      <StatItem value="26" label="Projects completed" />
      <StatItem value="8" label="Technologies mastered" />
      <StatItem value="500+" label="Code commits" />
    </div>
  );
};

export default Stats;
