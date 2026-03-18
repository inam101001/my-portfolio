import React, { useEffect, useRef } from 'react';

const BinaryRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 14;
    let columns = Math.floor(window.innerWidth / fontSize);
    let drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100);
    let speeds: number[] = Array(columns).fill(0).map(() => 0.5 + Math.random() * 0.8);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      
      const newDrops = Array(columns).fill(0).map((_, i) => (drops[i] !== undefined ? drops[i] : Math.random() * -100));
      const newSpeeds = Array(columns).fill(0).map((_, i) => (speeds[i] !== undefined ? speeds[i] : 0.5 + Math.random() * 0.8));
      
      drops = newDrops;
      speeds = newSpeeds;
    };

    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノXYZ-{}[]?+=&@#%';

    const draw = () => {
      // Clear with very subtle persistence
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono"`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Bright leader
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ff99';
        ctx.fillText(text, x, y);

        // Trail - handled by the fade effect
        ctx.fillStyle = '#00ff99';
        ctx.shadowBlur = 0;
        ctx.fillText(text, x, y - fontSize);

        drops[i] += speeds[i];

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
      }
    };

    const intervalId = setInterval(draw, 40);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.18, zIndex: 0 }}
    />
  );
};

export default BinaryRain;