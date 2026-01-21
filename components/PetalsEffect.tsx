
import React, { useEffect, useRef } from 'react';

const PetalsEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    interface Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      angle: number;
      spin: number;
    }

    const particles: Particle[] = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 15 + 5,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 0.5;
        p.angle += p.spin;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#FFC0CB'; // Light Pink
        
        // Draw Heart
        ctx.beginPath();
        const s = p.size / 2;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s, -s, -s * 2, s / 2, 0, s * 1.5);
        ctx.bezierCurveTo(s * 2, s / 2, s, -s, 0, 0);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default PetalsEffect;
