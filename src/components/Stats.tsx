import React from "react";

interface StatItemProps {
  number: number;
  label: string;
  description: string;
  suffix?: string;
}

const StatItem: React.FC<StatItemProps> = ({ number, label, description, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = number;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, number]);

  return (
    <div ref={ref} className="glass-card p-6 flex flex-col items-center justify-center text-center group cursor-default">
      <div className="flex items-center gap-1">
        <span className="text-4xl md:text-5xl font-bold font-mono text-white group-hover:text-[#00ff99] transition-colors">
          {count}
        </span>
        <span className="text-2xl font-bold text-[#00ff99]">{suffix}</span>
      </div>
      
      {/* Glow dot indicator */}
      <div className="relative mt-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff99] shadow-[0_0_10px_#00ff99]" />
        <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#00ff99] animate-ping opacity-75" />
      </div>
      
      <div className="text-sm text-[#00ff99]/80 font-mono mt-1 mb-1">{label}</div>
      <div className="text-[10px] text-gray-500 font-mono mt-2 tracking-tight leading-tight hidden sm:block">
        {description}
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  const data = [
    { number: 2, label: "Years Experience", description: "Cloud & Dev Ops", suffix: "+" },
    { number: 10, label: "Project Completed", description: "Production Ready", suffix: "+" },
    { number: 5, label: "Technologies", description: "Stack Expertise", suffix: "+" },
    { number: 200, label: "Code Commits", description: "GitHub Activity", suffix: "+" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <StatItem key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Stats;
